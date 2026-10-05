/**
 * EarthGlobe — live WebGL Earth centered on Saudi Arabia (24°N, 45°E)
 * with a looping day/night cycle and drifting clouds. Spins in from a few
 * extra turns and eases to a stop at that framing on mount (skipped under
 * prefers-reduced-motion, like the rest of the animation).
 *
 * Needs three static textures (all public domain), any format the browser
 * can decode into an <img> (this site uses AVIF):
 *   earth-day     NASA Blue Marble Next Generation (recolored)
 *   earth-clouds  Natural Earth III cloud map (Tom Patterson)
 *   earth-lights  NASA "Earth at Night"
 *
 * Usage:
 *   <EarthGlobe
 *     dayUrl="https://static.igem.wiki/.../earth-day.avif"
 *     cloudsUrl="https://static.igem.wiki/.../earth-clouds.avif"
 *     lightsUrl="https://static.igem.wiki/.../earth-lights.avif"
 *     fallbackSrc="https://static.igem.wiki/.../your-existing-earth.webp"
 *     style={{ width: 'min(72vh, 86vw)', aspectRatio: '1', borderRadius: '50%', overflow: 'hidden' }}
 *   />
 *
 * The texture host must send Access-Control-Allow-Origin (required for
 * WebGL to read cross-origin images) — confirmed iGEM's static.igem.wiki
 * CDN does this automatically once a browser sends an Origin header.
 *
 * A parent can nudge the camera via a ref, imperatively rather than as a
 * prop so a scroll handler can drive it every frame without round-tripping
 * through React state:
 *   ref.current.setScrollLon(radians)  // orbit around the polar axis
 *   ref.current.setRoll(radians)       // roll around the view axis (tilt)
 * `LAT0`/`LON0` and `projectGlobe` are also exported so a caller can keep an
 * HTML overlay (like a sparkle marking a city) locked onto the same point
 * on the globe as scrollLon changes — see Home.jsx's `.sparkle`. There's no
 * equivalent helper for `roll` since nothing currently needs one; add it the
 * same way (rotate the projected (x,y) by -roll) if that changes.
 */
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

const VS = `#version 300 es
in vec2 p; out vec2 v;
void main(){ v = p; gl_Position = vec4(p, 0.0, 1.0); }`;

const FS = `#version 300 es
precision highp float;
in vec2 v; out vec4 o;
uniform sampler2D uDay, uCloud, uLight;
uniform vec2 uRes; uniform float uR;
uniform vec3 uSunW, uSunV;        // sun direction, world and view space
uniform float uLat0, uLon0, uDays, uRoll;
const float PI = 3.14159265;

float hash(float n){ return fract(sin(n * 127.1 + 11.7) * 43758.5453); }

vec4 samp(sampler2D t, vec2 uv, vec2 dx, vec2 dy){ return textureGrad(t, uv, dx, dy); }

// Wrap-safe derivatives for longitude seams
vec2 wd(vec2 d){ return vec2(d.x - floor(d.x + 0.5), d.y); }

float clouds(float lat, float lon, vec2 dx, vec2 dy){
  float windE = -cos(3.0 * lat);
  float num = 0.0, den = 0.0;
  for (int i = 0; i < 3; i++){
    float ph = fract(uDays + float(i) / 3.0);
    float base = hash(float(i) * 7.0 + 3.0) * 2.0 * PI;
    float drift = windE * (ph - 0.5) * 0.36;
    vec2 uv = vec2((lon - drift + base + PI) / (2.0 * PI), (PI * 0.5 - lat) / PI);
    float w = sin(PI * ph); w *= w; w *= w; w *= w;
    num += w * samp(uCloud, uv, dx * 1.3, dy * 1.3).r;
    den += w;
  }
  float c = pow(clamp((num / den - 0.07) * 1.25, 0.0, 1.0), 0.75);  // clear sky stays clear
  return mix(c, 0.5, smoothstep(1.25, 1.45, abs(lat)));
}

void main(){
  vec2 px = v * 0.5 * uRes;
  vec2 q = px / uR;                           // unit-disk coords, y up
  float rho = length(q);
  float aa = 1.5 / uR;
  vec3 col = vec3(0.0);

  // limb glow outside the disk
  vec2 limbN = rho > 0.0 ? q / rho : vec2(0.0);
  float limbLit = smoothstep(-0.35, 0.45, dot(limbN, uSunV.xy) + uSunV.z * 0.35);
  float glow = exp(-max(rho - 1.0, 0.0) / 0.013) * (0.3 + 0.7 * limbLit);
  vec3 glowC = vec3(0.50, 0.54, 1.0) * 0.55 * glow;

  if (rho < 1.0 + aa){
    float r = min(rho, 1.0);
    float z = sqrt(max(1.0 - r * r, 0.0));
    vec3 N = vec3(q, z);                        // sphere shape/specular normal — rotation-invariant, uses raw q
    // uRoll rotates which texel maps to each screen pixel (a camera "roll"
    // around the view axis) without touching N/limb/edge above, which only
    // depend on rho = |q| and are unaffected by this rotation.
    float rc = cos(uRoll), rs = sin(uRoll);
    vec2 qr = vec2(q.x * rc - q.y * rs, q.x * rs + q.y * rc);
    float c = asin(r), sc = sin(c), cc = cos(c);
    float lat = asin(cc * sin(uLat0) + (rho > 0.0 ? qr.y * sc * cos(uLat0) / rho : 0.0));
    float lon = uLon0 + atan(qr.x * sc, rho * cos(uLat0) * cc - qr.y * sin(uLat0) * sc);

    vec2 uv = vec2((lon + PI) / (2.0 * PI), (PI * 0.5 - lat) / PI);
    vec2 dx = wd(dFdx(uv)), dy = wd(dFdy(uv));

    vec3 surf = samp(uDay, uv, dx, dy).rgb;
    float cl = clouds(lat, lon, dx, dy);

    vec3 W = vec3(cos(lat) * cos(lon), cos(lat) * sin(lon), sin(lat));
    float ndl = dot(W, uSunW);
    float day = smoothstep(-0.30, 0.55, ndl);       // wide, soft twilight band

    // ocean sun glint
    float ocean = clamp((surf.b - max(surf.r, surf.g)) * 8.0, 0.0, 1.0);
    vec3 H = normalize(uSunV + vec3(0.0, 0.0, 1.0));
    float spec = pow(max(dot(N, H), 0.0), 70.0) * ocean * (1.0 - cl) * smoothstep(-0.05, 0.2, ndl);

    vec3 lit = mix(surf * (1.0 - 0.3 * cl), vec3(0.95, 0.94, 1.0), cl);
    vec3 nightAmb = vec3(0.18, 0.15, 0.29);       // earthshine-like floor so the dark side stays readable
    lit = lit * mix(nightAmb, vec3(1.0), day) + vec3(1.0, 0.95, 0.85) * spec * 0.45;

    // city lights on the night side
    float night = smoothstep(0.12, -0.28, ndl);
    float cities = samp(uLight, uv, dx, dy).r;
    lit += vec3(1.0, 0.72, 0.42) * cities * night * (1.0 - 0.85 * cl) * 0.9;

    // atmosphere: extinction plus in-scattered haze, warmer near the terminator
    float path = 1.0 / max(z, 0.03);
    float tau = 0.06;
    float sky = smoothstep(-0.35, 0.45, ndl);
    vec3 hazeC = mix(vec3(0.95, 0.45, 0.2), vec3(0.55, 0.58, 1.0), smoothstep(-0.15, 0.4, ndl));
    vec3 haze = (1.0 - exp(-tau * 1.3 * path)) * hazeC * clamp(sky * 1.1 + 0.12, 0.0, 1.0);
    lit = lit * exp(-tau * path) + haze * 0.9;

    float edge = clamp((1.0 - rho) / aa + 0.5, 0.0, 1.0);
    col = mix(glowC, lit, edge);
  } else {
    col = glowC;
  }
  col = pow(clamp(col, 0.0, 1.0), vec3(1.0 / 1.05));
  o = vec4(col, 1.0);
}`;

export const LAT0 = (24 * Math.PI) / 180;
export const LON0 = (45 * Math.PI) / 180;
const SUN_LAT = (8 * Math.PI) / 180;
// Fraction of the canvas's half-width the rendered disk actually fills —
// mirrors the shader's own `uR = min(w,h)*0.5*DISK_FILL`, so an HTML overlay
// using `projectGlobe` below lines up with the rendered globe exactly.
export const DISK_FILL = 0.985;
// View basis (east, north, toward-viewer) for a camera centered at (lat0,
// lon0) — a function rather than a fixed constant because the intro spin
// below sweeps the camera's longitude before it settles on LON0.
function viewBasis(lat0, lon0) {
  const E = [-Math.sin(lon0), Math.cos(lon0), 0];
  const N = [-Math.sin(lat0) * Math.cos(lon0), -Math.sin(lat0) * Math.sin(lon0), Math.cos(lat0)];
  const C = [Math.cos(lat0) * Math.cos(lon0), Math.cos(lat0) * Math.sin(lon0), Math.sin(lat0)];
  return { E, N, C };
}
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

// Forward orthographic projection: where a (lat, lon) point on the sphere
// lands in the shader's unit-disk coords (x right, y up) for a camera
// centered at (lat0, lon0) — the inverse of the lat/lon lookup the fragment
// shader does per-pixel. Returns null if the point is on the far side.
export function projectGlobe(lat0, lon0, lat, lon) {
  const dlon = lon - lon0;
  const cosC = Math.sin(lat0) * Math.sin(lat) + Math.cos(lat0) * Math.cos(lat) * Math.cos(dlon);
  if (cosC < 0) return null;
  const x = Math.cos(lat) * Math.sin(dlon);
  const y = Math.cos(lat0) * Math.sin(lat) - Math.sin(lat0) * Math.cos(lat) * Math.cos(dlon);
  return { x, y };
}
const clamp01 = (x) => Math.max(0, Math.min(1, x));
const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

// On load, the globe spins in less than one extra turn and eases to a stop
// at (LAT0, LON0) instead of appearing already settled.
const INTRO_SPIN_TURNS = 0.6;
const INTRO_SPIN_SECONDS = 2.6;

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous'; // required for WebGL; the host must send CORS headers
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Could not load ${src}`));
    img.src = src;
  });
}

const EarthGlobe = forwardRef(function EarthGlobe({
  dayUrl,
  cloudsUrl,
  lightsUrl,
  fallbackSrc,
  period = 32,           // seconds per full day/night loop (also paces cloud drift)
  onSettled,             // called once, when the intro spin eases to a stop
  className,
  style,
  ariaLabel = 'Animated Earth centered on Saudi Arabia, cycling through day and night',
}, ref) {
  const canvasRef = useRef(null);
  const [failed, setFailed] = useState(false);
  // Ref rather than an effect dependency — Home.jsx passes an inline
  // callback, and re-running this effect would tear down and recreate the
  // whole WebGL context on every render.
  const onSettledRef = useRef(onSettled);
  onSettledRef.current = onSettled;
  // Additional camera longitude (radians) from a scroll-driven spin, and a
  // camera "roll" (radians, rotation around the view axis — an axis tilt)
  // — both set imperatively by the parent so a scroll handler can update
  // them every frame without going through React state/re-render.
  const scrollLonRef = useRef(0);
  const rollRef = useRef(0);
  useImperativeHandle(ref, () => ({
    setScrollLon(rad) { scrollLonRef.current = rad; },
    setRoll(rad) { rollRef.current = rad; },
  }), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas && canvas.getContext('webgl2', { antialias: false, alpha: false });
    if (!gl) { setFailed(true); onSettledRef.current?.(); return undefined; }

    let disposed = false;
    let raf = 0;
    let visible = true;
    let elapsed = 0;       // seconds of animation actually shown (pauses off-screen)
    let last = null;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
      return s;
    };

    let prog, U;
    try {
      prog = gl.createProgram();
      gl.attachShader(prog, compile(gl.VERTEX_SHADER, VS));
      gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FS));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
    } catch (e) {
      console.error('EarthGlobe:', e);
      setFailed(true);
      onSettledRef.current?.();
      return undefined;
    }
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    U = Object.fromEntries(
      ['uDay', 'uCloud', 'uLight', 'uRes', 'uR', 'uSunW', 'uSunV', 'uLat0', 'uLon0', 'uDays', 'uRoll']
        .map((n) => [n, gl.getUniformLocation(prog, n)])
    );
    gl.uniform1f(U.uLat0, LAT0);

    const upload = (img, unit, single) => {
      const t = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
      const f = single ? gl.LUMINANCE : gl.RGB;
      gl.texImage2D(gl.TEXTURE_2D, 0, f, f, gl.UNSIGNED_BYTE, img);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      const aniso = gl.getExtension('EXT_texture_filter_anisotropic');
      if (aniso) gl.texParameterf(gl.TEXTURE_2D, aniso.TEXTURE_MAX_ANISOTROPY_EXT, 8);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
      gl.viewport(0, 0, w, h);
    };

    // Camera longitude for a given amount of visible animation time: starts
    // INTRO_SPIN_TURNS short of the current target and eases in to it. The
    // target itself tracks scrollLonRef, so once the intro's done this just
    // follows scroll directly (and if the user scrolls mid-intro, the spin
    // eases toward wherever the target has moved to).
    const introLon = (t) => {
      const target = LON0 + scrollLonRef.current;
      return target - INTRO_SPIN_TURNS * 2 * Math.PI * (1 - easeOutQuart(clamp01(t / INTRO_SPIN_SECONDS)));
    };

    const draw = (phase, viewLon) => {
      resize();
      const lon = (45 - 360 * phase) * Math.PI / 180; // sun moves east to west
      const s = [Math.cos(SUN_LAT) * Math.cos(lon), Math.cos(SUN_LAT) * Math.sin(lon), Math.sin(SUN_LAT)];
      const { E, N, C } = viewBasis(LAT0, viewLon);
      gl.uniform3fv(U.uSunW, s);
      gl.uniform3fv(U.uSunV, [dot(s, E), dot(s, N), dot(s, C)]);
      gl.uniform1f(U.uLon0, viewLon);
      gl.uniform1f(U.uRoll, rollRef.current);
      gl.uniform1f(U.uDays, phase);
      gl.uniform2f(U.uRes, canvas.width, canvas.height);
      gl.uniform1f(U.uR, Math.min(canvas.width, canvas.height) * 0.5 * DISK_FILL);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    let settled = false;
    const maybeNotifySettled = (t) => {
      if (!settled && t >= INTRO_SPIN_SECONDS) {
        settled = true;
        onSettledRef.current?.();
      }
    };

    const tick = (now) => {
      if (disposed) return;
      if (last !== null && visible) elapsed += Math.min((now - last) / 1000, 0.1);
      last = now;
      draw((elapsed / period) % 1, introLon(elapsed));
      maybeNotifySettled(elapsed);
      raf = visible ? requestAnimationFrame(tick) : 0;
    };

    // Pause while scrolled out of view
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf && !reduceMotion && !disposed) { last = null; raf = requestAnimationFrame(tick); }
    });
    // Redraw on size changes even when not animating
    const ro = new ResizeObserver(() => { if (!raf && !disposed) draw((elapsed / period) % 1, introLon(elapsed)); });

    const onLost = (e) => { e.preventDefault(); setFailed(true); onSettledRef.current?.(); };
    canvas.addEventListener('webglcontextlost', onLost);

    Promise.all([loadImage(dayUrl), loadImage(cloudsUrl), loadImage(lightsUrl)])
      .then(([day, clouds, lights]) => {
        if (disposed) return;
        upload(day, 0, false);
        upload(clouds, 1, true);
        upload(lights, 2, true);
        gl.uniform1i(U.uDay, 0);
        gl.uniform1i(U.uCloud, 1);
        gl.uniform1i(U.uLight, 2);
        if (reduceMotion) { draw(0, LON0); onSettledRef.current?.(); } // still frame, no spin: noon over Arabia
        else raf = requestAnimationFrame(tick);
        io.observe(canvas);
        ro.observe(canvas);
      })
      .catch((e) => { console.error('EarthGlobe:', e); if (!disposed) { setFailed(true); onSettledRef.current?.(); } });

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener('webglcontextlost', onLost);
    };
  }, [dayUrl, cloudsUrl, lightsUrl, period]);

  if (failed && fallbackSrc) {
    return <img src={fallbackSrc} alt={ariaLabel} className={className}
                style={{ display: 'block', objectFit: 'cover', ...style }} />;
  }
  return (
    <canvas ref={canvasRef} role="img" aria-label={ariaLabel} className={className}
            style={{ display: 'block', background: '#000', ...style }} />
  );
});

export default EarthGlobe;

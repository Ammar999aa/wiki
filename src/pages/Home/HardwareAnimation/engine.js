// Nadia's SHIHAB fluid-system animation (hardware_animation_final_2.html),
// moved from a standalone full-window page into a box on the landing page.
// The renderer, camera path, timeline and captions are hers, unchanged.
// What changed in the move:
// - the model is the fetched .glb (see HardwareAnimation.jsx) instead of an
//   inline base64 <script>;
// - captions, progress and the play/camera buttons are React's job: this
//   reports state through `onFrame` and is driven through the returned
//   controls, instead of reaching into the page by element id;
// - the mouse-wheel zoom is gone, since on a scrolling page it swallowed the
//   reader's scroll; drag to orbit (right-drag or shift-drag to pan) stays;
// - the capture-mode hooks on window are gone;
// - destroy() releases everything it created.
import FLOW from "./flowPaths";

export const DURATION = 80; // seconds, one full loop

// [start, end, title, text]
export const CAPTIONS = [
  [0, 4, "The full system", "Bioreactor, filtration unit, four-channel syringe pumps, buffer bottles, affinity chromatography column and collection vessels, laid out in the carry case."],
  [4, 9, "1. Bioreactor runs", "The stirred bioreactor keeps the culture mixed."],
  [9, 15, "2. Bioreactor to filtration", "Culture leaves a lid port through a luer-lock and tube to the three-module filtration unit."],
  [15, 24, "3. Drawing up the buffers", "All four syringes retract and draw buffer from their own buffer bottles."],
  [24, 34, "4. Buffer 1: equilibration", "Dispensed through the hub, down the column, all the way to waste."],
  [34, 44, "5. Buffer 2: wash", "Dispensed through the hub, down the column, all the way to waste."],
  [44, 54, "6. Filtrate through the column", "Filtrate from the filtration unit enters the second column inlet, then passes to waste."],
  [54, 64, "7. Buffer 3: elution", "Dispensed through the column into the collection vial."],
  [64, 74, "8. Buffer 4: reconstitution", "Dispensed through the column to waste."],
  [74, 80, "SHIHAB fluid system", "KAUST iGEM 2026"],
];

const clamp01 = (u) => Math.min(1, Math.max(0, u));
const sm = (u) => u * u * (3 - 2 * u);
const ease = (u) => sm(clamp01(u));

// ---- shaders
const VS =
  "attribute vec3 p;attribute vec3 n;attribute vec2 t;uniform mat4 mvp;uniform mat4 mv;uniform mat4 mdl;varying vec3 vn;varying vec3 vp;varying vec2 vt;void main(){vn=mat3(mv)*(mat3(mdl)*n);vec4 wp=mdl*vec4(p,1.);vp=(mv*wp).xyz;vt=t;gl_Position=mvp*wp;}";
const FS =
  "precision mediump float;varying vec3 vn;varying vec3 vp;varying vec2 vt;uniform vec4 col;uniform float met;uniform float rough;uniform float useTex;uniform sampler2D tex;" +
  "void main(){vec3 N=normalize(vn);if(!gl_FrontFacing)N=-N;vec3 V=normalize(-vp);vec4 c=col;if(useTex>.5)c=texture2D(tex,vt);" +
  "vec3 L1=normalize(vec3(.4,.8,.6)),L2=normalize(vec3(-.6,.3,-.5));float d=max(dot(N,L1),0.)*.75+max(dot(N,L2),0.)*.25;" +
  "float hemi=.45+.25*N.y;vec3 H=normalize(L1+V);float sp=pow(max(dot(N,H),0.),mix(8.,90.,1.-rough))*mix(.15,.9,met);" +
  "vec3 base=c.rgb*(1.-met*.45);vec3 rgb=base*(hemi+d)+vec3(sp)*(met>.5?c.rgb:vec3(1.))+met*c.rgb*.5*(.6+.4*N.y);gl_FragColor=vec4(rgb,c.a);}";

// ---- math
function persp(f, a, n, fa) {
  const t = 1 / Math.tan(f / 2), m = new Float32Array(16);
  m[0] = t / a; m[5] = t; m[10] = (fa + n) / (n - fa); m[11] = -1; m[14] = (2 * fa * n) / (n - fa);
  return m;
}
function mul(a, b) {
  const o = new Float32Array(16);
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 4; j++) {
      let s = 0;
      for (let k = 0; k < 4; k++) s += a[k * 4 + j] * b[i * 4 + k];
      o[i * 4 + j] = s;
    }
  return o;
}
function look(e, c, u) {
  let z = [e[0] - c[0], e[1] - c[1], e[2] - c[2]], l = Math.hypot(z[0], z[1], z[2]);
  z = z.map((v) => v / l);
  let x = [u[1] * z[2] - u[2] * z[1], u[2] * z[0] - u[0] * z[2], u[0] * z[1] - u[1] * z[0]];
  l = Math.hypot(x[0], x[1], x[2]);
  x = x.map((v) => v / l);
  const y = [z[1] * x[2] - z[2] * x[1], z[2] * x[0] - z[0] * x[2], z[0] * x[1] - z[1] * x[0]];
  return new Float32Array([
    x[0], y[0], z[0], 0, x[1], y[1], z[1], 0, x[2], y[2], z[2], 0,
    -(x[0] * e[0] + x[1] * e[1] + x[2] * e[2]), -(y[0] * e[0] + y[1] * e[1] + y[2] * e[2]), -(z[0] * e[0] + z[1] * e[1] + z[2] * e[2]), 1,
  ]);
}
function ident() {
  return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
}
// M = T(pv)*R*S*T(-pv), R,S 3x3 col-major arrays
function aboutPivot(pv, S, R) {
  const m = ident(), A = [];
  for (let i = 0; i < 3; i++) {
    A.push([]);
    for (let j = 0; j < 3; j++) {
      let v = 0;
      for (let k = 0; k < 3; k++) v += R[k * 3 + i] * S[j * 3 + k];
      A[i].push(v);
    }
  }
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) m[j * 4 + i] = A[i][j];
  for (let i = 0; i < 3; i++) m[12 + i] = pv[i] - (A[i][0] * pv[0] + A[i][1] * pv[1] + A[i][2] * pv[2]);
  return m;
}
function trans(x, y, z) {
  const m = ident();
  m[12] = x; m[13] = y; m[14] = z;
  return m;
}
const I3 = [1, 0, 0, 0, 1, 0, 0, 0, 1];

// ---- camera keys: [t, az, el, dist, target mm]
const CT = FLOW.ctr;
const W = (x, y, z) => [(x - CT[0]) / 1000, (y - CT[1]) / 1000, (z - CT[2]) / 1000];
const K = [[0, -0.7, 0.5, 1.55, 94, 120, -112], [4, -1.2, 0.45, 1.5, 94, 120, -112], [6, -1.9, 0.3, 1.05, 80, 210, -333], [9, -3.0, 0.3, 0.85, 80, 210, -333], [11.5, -1.5708, 0.05, 0.32, 90, 293, -164], [14, -1.5708, 0.05, 0.27, 90, 293, -164], [16, -1.0, 0.45, 1.0, 60, 100, 0], [23, -1.0, 0.45, 1.0, 60, 100, 0], [25, -1.3, 0.45, 1.0, -60, 100, 60], [28.5, -0.5, 0.5, 1.0, -20, 230, 250], [32, 0.6, 0.35, 1.0, 150, 110, 285], [35, -1.3, 0.45, 1.0, -60, 100, 60], [38.5, -0.5, 0.5, 1.0, -20, 230, 250], [42, 0.6, 0.35, 1.0, 150, 110, 285], [44, 1.2, 0.35, 1.5, 40, 250, 120], [49, 0.9, 0.35, 1.2, 60, 200, 285], [52, 0.6, 0.35, 1.0, 150, 110, 285], [55, -1.3, 0.45, 1.0, -60, 100, 60], [58.5, -0.5, 0.5, 1.0, -20, 230, 250], [62, 0.6, 0.35, 0.9, 85, 70, 285], [65, -1.3, 0.45, 1.0, -60, 100, 60], [68.5, -0.5, 0.5, 1.0, -20, 230, 250], [72, 0.6, 0.35, 1.0, 150, 110, 285], [74, -0.7, 0.5, 1.55, 94, 120, -112], [80, -2.6, 0.5, 1.7, 94, 120, -112]].map((k) => {
  const w = W(k[4], k[5], k[6]);
  return { t: k[0], az: k[1], el: k[2], d: k[3], x: w[0], y: w[1], z: w[2] };
});
function camAt(t) {
  let i = 0;
  while (i < K.length - 2 && t > K[i + 1].t) i++;
  const a = K[i], b = K[i + 1];
  const u = sm(clamp01((t - a.t) / (b.t - a.t)));
  const L = (p, q) => p + (q - p) * u;
  return { az: L(a.az, b.az), el: L(a.el, b.el), dist: L(a.d, b.d), tx: L(a.x, b.x), ty: L(a.y, b.y), tz: L(a.z, b.z) };
}

// ---- timeline
const P0 = FLOW.pumps.map((q) => q.p);
const PUSH = [24, 34, 54, 64];
function stopX(i, t) {
  const p = P0[i];
  if (t < 16) return p;
  const x = p + (88 - p) * ease((t - 16) / 7);
  if (t < PUSH[i]) return x;
  return 88 + (16 - 88) * ease((t - PUSH[i]) / 5);
}
function nodeMat(d, t) {
  const n = d.nm;
  let m = /^pusher(\d)$/.exec(n);
  if (m) { const i = +m[1]; return trans((stopX(i, t) - P0[i]) / 1000, 0, 0); }
  m = /^fill(\d)$/.exec(n);
  if (m) { const i = +m[1], len = Math.max(1, stopX(i, t) - 6.5); return aboutPivot(d.ex.pivot, [len, 0, 0, 0, 1, 0, 0, 0, 1], I3); }
  if (n === "rotor") {
    const th = ((Math.min(t, 4) * 60 + Math.max(0, Math.min(t, 15) - 4) * 240 + Math.max(0, t - 15) * 90) * Math.PI) / 180;
    const c = Math.cos(th), s = Math.sin(th);
    return aboutPivot(d.ex.pivot, I3, [c, 0, -s, 0, 1, 0, s, 0, c]);
  }
  if (n === "vfill") { const f = 12 * ease((t - 60.5) / 4); return aboutPivot(d.ex.pivot, [1, 0, 0, 0, f, 0, 0, 0, 1], I3); }
  if (n === "wfill") {
    const f2 = 7 * ease((t - 30) / 4) + 7 * ease((t - 40) / 4) + 7 * ease((t - 50) / 4) + 7 * ease((t - 70) / 4);
    return aboutPivot(d.ex.pivot, [1, 0, 0, 0, f2, 0, 0, 0, 1], I3);
  }
  return null;
}

// ---- flow particles
function withLengths(pts) {
  const c = [0];
  for (let i = 1; i < pts.length; i++) c.push(c[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1], pts[i][2] - pts[i - 1][2]));
  return { p: pts, c, L: c[c.length - 1] };
}
const PATHS = {};
Object.keys(FLOW.paths).forEach((k) => { PATHS[k] = withLengths(FLOW.paths[k]); });
const rev = (k) => withLengths(PATHS[k].p.slice().reverse());
function at(o, u) {
  let i = 1;
  while (i < o.c.length - 1 && o.c[i] < u) i++;
  const f = clamp01((u - o.c[i - 1]) / Math.max(1e-9, o.c[i] - o.c[i - 1]));
  const a = o.p[i - 1], b = o.p[i];
  return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f];
}
const AMB = [1, 0.72, 0.15], PALE = [0.98, 0.86, 0.45], BLU = [0.4, 0.75, 1];
const STREAMS = [];
const stream = (o, t0, t1, col, v) => STREAMS.push({ o, t0, t1, col, v: v || 0.16 });
stream(PATHS.bio_in, 9, 14.5, AMB);
["0_0", "0_1", "1_0", "1_1"].forEach((k, i) => stream(rev("buf_" + k), 16 + i * 0.2, 22.5, BLU, 0.2));
function dispense(k, t0, sink) {
  stream(PATHS["hub_" + k], t0, t0 + 5, BLU, 0.2);
  stream(PATHS.col_in, t0 + 0.5, t0 + 5.5, BLU, 0.2);
  stream(PATHS.col_out, t0 + 4, t0 + 8, BLU, 0.14);
  stream(PATHS[sink], t0 + 4.5, t0 + 9, BLU, 0.12);
}
dispense("0_0", 24, "to_waste");
dispense("0_1", 34, "to_waste");
stream(PATHS.filt_out, 44, 49, PALE, 0.2);
stream(PATHS.col_out, 48, 52, PALE, 0.14);
stream(PATHS.to_waste, 48.5, 53, PALE, 0.12);
dispense("1_0", 54, "to_vial");
dispense("1_1", 64, "to_waste");
const GAP = 0.0075;
function particles(t) {
  const out = [];
  STREAMS.forEach((s) => {
    if (t < s.t0) return;
    for (let k = 0; k < 400; k++) {
      const te = s.t0 + (k * GAP) / s.v;
      if (te > s.t1) break;
      const u = (t - te) * s.v;
      if (u < 0) break;
      if (u > s.o.L) continue;
      out.push({ x: at(s.o, u), c: s.col });
    }
  });
  return out;
}

export function captionAt(t) {
  return CAPTIONS.find((x) => t >= x[0] && t < x[1]) || null;
}

/**
 * Starts the animation on `cv`, a <canvas> sized by CSS.
 * glb: ArrayBuffer of the model. onFrame(t, auto) runs after each drawn frame.
 * Returns null if WebGL is unavailable, else
 * { setPlaying(bool), restart(), setAuto(bool), destroy() }.
 */
export function startFluidAnimation(cv, glb, { playing: startPlaying = true, onFrame, onAutoChange } = {}) {
  const gl = cv.getContext("webgl", { antialias: true, alpha: false });
  if (!gl) return null;
  gl.getExtension("OES_element_index_uint");

  // ---- GLB parse
  const buf = new Uint8Array(glb);
  const dv = new DataView(buf.buffer), jl = dv.getUint32(12, true);
  const json = JSON.parse(new TextDecoder().decode(buf.subarray(20, 20 + jl)));
  const bo = 20 + jl + 8;
  function accData(a) {
    const v = json.bufferViews[a.bufferView], n = { SCALAR: 1, VEC2: 2, VEC3: 3 }[a.type];
    const off = bo + (v.byteOffset || 0) + (a.byteOffset || 0);
    const C = { 5126: Float32Array, 5125: Uint32Array }[a.componentType];
    return new C(buf.buffer.slice(buf.byteOffset + off, buf.byteOffset + off + a.count * n * C.BYTES_PER_ELEMENT));
  }

  // ---- GL setup
  const shaders = [];
  function sh(t, s) {
    const o = gl.createShader(t);
    gl.shaderSource(o, s);
    gl.compileShader(o);
    shaders.push(o);
    return o;
  }
  const pr = gl.createProgram();
  gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS));
  gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS));
  gl.linkProgram(pr);
  gl.useProgram(pr);
  const L = { p: gl.getAttribLocation(pr, "p"), n: gl.getAttribLocation(pr, "n"), t: gl.getAttribLocation(pr, "t") };
  const U = {};
  ["mvp", "mv", "mdl", "col", "met", "rough", "useTex", "tex"].forEach((k) => { U[k] = gl.getUniformLocation(pr, k); });
  const buffers = [];
  function mkbuf(type, data) {
    const b = gl.createBuffer();
    gl.bindBuffer(type, b);
    gl.bufferData(type, data, gl.STATIC_DRAW);
    buffers.push(b);
    return b;
  }

  let tex = null, texUrl = null;
  const texImg = json.images && json.images[0];
  if (texImg) {
    const v = json.bufferViews[texImg.bufferView];
    const blob = new Blob([buf.slice(bo + (v.byteOffset || 0), bo + (v.byteOffset || 0) + v.byteLength)], { type: "image/png" });
    const im = new Image();
    im.onload = () => {
      if (destroyed) return;
      tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, im);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    };
    texUrl = URL.createObjectURL(blob);
    im.src = texUrl;
  }

  const draws = [];
  json.nodes.forEach((nd) => {
    json.meshes[nd.mesh].primitives.forEach((pm) => {
      const mat = json.materials[pm.material], pb = mat.pbrMetallicRoughness, idx = accData(json.accessors[pm.indices]);
      const P = accData(json.accessors[pm.attributes.POSITION]), N = accData(json.accessors[pm.attributes.NORMAL]);
      const T = pm.attributes.TEXCOORD_0 !== undefined ? accData(json.accessors[pm.attributes.TEXCOORD_0]) : null;
      draws.push({
        nm: nd.name, ex: nd.extras || null,
        p: mkbuf(gl.ARRAY_BUFFER, P), n: mkbuf(gl.ARRAY_BUFFER, N), t: T ? mkbuf(gl.ARRAY_BUFFER, T) : null,
        i: mkbuf(gl.ELEMENT_ARRAY_BUFFER, idx), cnt: idx.length,
        col: pb.baseColorFactor || [1, 1, 1, 1], met: pb.metallicFactor || 0,
        rough: pb.roughnessFactor === undefined ? 0.5 : pb.roughnessFactor,
        tex: !!pb.baseColorTexture, blend: mat.alphaMode === "BLEND",
      });
    });
  });
  draws.sort((a, b) => a.blend - b.blend);

  // sphere mesh for the flow particles
  const sph = (() => {
    const v = [], n = [], ix = [], NS = 12, NT = 8;
    for (let i = 0; i <= NT; i++) {
      const ph = (Math.PI * i) / NT;
      for (let j = 0; j <= NS; j++) {
        const th = (2 * Math.PI * j) / NS, x = Math.sin(ph) * Math.cos(th), y = Math.cos(ph), z = Math.sin(ph) * Math.sin(th);
        v.push(x, y, z);
        n.push(x, y, z);
      }
    }
    for (let i = 0; i < NT; i++)
      for (let j = 0; j < NS; j++) {
        const a = i * (NS + 1) + j, b = a + NS + 1;
        ix.push(a, b, a + 1, b, b + 1, a + 1);
      }
    return { p: mkbuf(gl.ARRAY_BUFFER, new Float32Array(v)), n: mkbuf(gl.ARRAY_BUFFER, new Float32Array(n)), i: mkbuf(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(ix)), cnt: ix.length };
  })();

  // ---- state + controls
  const cam = { az: -0.7, el: 0.5, dist: 3.2, tx: 0, ty: 0.12, tz: 0 };
  let auto = true, playing = startPlaying, T = 0, destroyed = false;
  const setAuto = (v) => {
    auto = v;
    onAutoChange?.(v);
  };

  let drag = null;
  const pts = {};
  const onDown = (e) => {
    cv.setPointerCapture(e.pointerId);
    pts[e.pointerId] = [e.clientX, e.clientY];
    drag = { btn: e.button };
    if (auto) setAuto(false);
  };
  const onMove = (e) => {
    if (!pts[e.pointerId]) return;
    const dx = e.clientX - pts[e.pointerId][0], dy = e.clientY - pts[e.pointerId][1];
    pts[e.pointerId] = [e.clientX, e.clientY];
    if (drag && (drag.btn === 2 || e.shiftKey)) {
      const s = cam.dist * 0.0016, ca = Math.cos(cam.az), sa = Math.sin(cam.az);
      cam.tx -= dx * ca * s;
      cam.tz += dx * sa * s;
      cam.ty += dy * s;
    } else {
      cam.az -= dx * 0.007;
      cam.el = Math.max(-1.2, Math.min(1.5, cam.el + dy * 0.007));
    }
  };
  const onUp = (e) => { delete pts[e.pointerId]; };
  const onMenu = (e) => e.preventDefault();
  cv.addEventListener("pointerdown", onDown);
  cv.addEventListener("pointermove", onMove);
  cv.addEventListener("pointerup", onUp);
  cv.addEventListener("pointercancel", onUp);
  cv.addEventListener("contextmenu", onMenu);

  function resize() {
    const d = Math.min(window.devicePixelRatio || 1, 2), w = Math.round(cv.clientWidth * d), h = Math.round(cv.clientHeight * d);
    if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
  }
  function bindDraw(d, mdl) {
    gl.depthMask(!d.blend);
    gl.uniform4fv(U.col, d.col);
    gl.uniform1f(U.met, d.met);
    gl.uniform1f(U.rough, d.rough);
    gl.uniform1f(U.useTex, d.tex && tex ? 1 : 0);
    gl.uniformMatrix4fv(U.mdl, false, mdl);
    if (d.tex && tex) { gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, tex); }
    gl.bindBuffer(gl.ARRAY_BUFFER, d.p); gl.enableVertexAttribArray(L.p); gl.vertexAttribPointer(L.p, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, d.n); gl.enableVertexAttribArray(L.n); gl.vertexAttribPointer(L.n, 3, gl.FLOAT, false, 0, 0);
    if (d.t) { gl.bindBuffer(gl.ARRAY_BUFFER, d.t); gl.enableVertexAttribArray(L.t); gl.vertexAttribPointer(L.t, 2, gl.FLOAT, false, 0, 0); }
    else { gl.disableVertexAttribArray(L.t); gl.vertexAttrib2f(L.t, 0, 0); }
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, d.i);
    gl.drawElements(gl.TRIANGLES, d.cnt, gl.UNSIGNED_INT, 0);
  }
  function render(t) {
    if (auto) Object.assign(cam, camAt(t));
    resize();
    gl.viewport(0, 0, cv.width, cv.height);
    gl.clearColor(0.039, 0.039, 0.153, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    const ce = Math.cos(cam.el);
    const eye = [cam.tx + cam.dist * ce * Math.sin(cam.az), cam.ty + cam.dist * Math.sin(cam.el), cam.tz + cam.dist * ce * Math.cos(cam.az)];
    const mv = look(eye, [cam.tx, cam.ty, cam.tz], [0, 1, 0]), pm = persp(0.7, cv.width / cv.height, 0.01, 10), mvp = mul(pm, mv);
    gl.uniformMatrix4fv(U.mv, false, mv);
    gl.uniformMatrix4fv(U.mvp, false, mvp);
    gl.uniform1i(U.tex, 0);
    const id = ident();
    draws.forEach((d) => { if (!d.blend) bindDraw(d, (d.ex || /^pusher/.test(d.nm) ? nodeMat(d, t) : null) || id); });
    // particles (opaque, before blended tubes so they show through)
    gl.depthMask(true);
    gl.uniform1f(U.met, 0);
    gl.uniform1f(U.rough, 0.3);
    gl.uniform1f(U.useTex, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, sph.p); gl.enableVertexAttribArray(L.p); gl.vertexAttribPointer(L.p, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, sph.n); gl.enableVertexAttribArray(L.n); gl.vertexAttribPointer(L.n, 3, gl.FLOAT, false, 0, 0);
    gl.disableVertexAttribArray(L.t); gl.vertexAttrib2f(L.t, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sph.i);
    particles(t).forEach((q) => {
      const m = ident();
      m[0] = m[5] = m[10] = 0.0032;
      m[12] = q.x[0]; m[13] = q.x[1]; m[14] = q.x[2];
      gl.uniformMatrix4fv(U.mdl, false, m);
      gl.uniform4f(U.col, q.c[0], q.c[1], q.c[2], 1);
      gl.drawElements(gl.TRIANGLES, sph.cnt, gl.UNSIGNED_INT, 0);
    });
    draws.forEach((d) => { if (d.blend) bindDraw(d, (d.ex || /^pusher/.test(d.nm) ? nodeMat(d, t) : null) || id); });
    onFrame?.(t, auto);
  }

  // Only draws while the canvas is on screen.
  let vis = true;
  const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting; });
  io.observe(cv);
  let last = performance.now(), raf = 0, rendered = false, size = "";
  function frame(now) {
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    if (vis) {
      // Paused on the auto camera, nothing changes between frames unless the
      // box is resized (e.g. fullscreen), so skip those frames; a free camera
      // keeps drawing so dragging still works while paused.
      if (playing) { T += dt; if (T > DURATION) T = 0; }
      const s = cv.clientWidth + "x" + cv.clientHeight;
      if (playing || !auto || !rendered || s !== size) { render(T); rendered = true; size = s; }
    }
    raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);

  return {
    setPlaying(v) { playing = v; },
    restart() { T = 0; playing = true; setAuto(true); },
    setAuto(v) { setAuto(v); rendered = false; },
    destroy() {
      destroyed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      cv.removeEventListener("pointerdown", onDown);
      cv.removeEventListener("pointermove", onMove);
      cv.removeEventListener("pointerup", onUp);
      cv.removeEventListener("pointercancel", onUp);
      cv.removeEventListener("contextmenu", onMenu);
      if (texUrl) URL.revokeObjectURL(texUrl);
      buffers.forEach((b) => gl.deleteBuffer(b));
      if (tex) gl.deleteTexture(tex);
      shaders.forEach((s) => gl.deleteShader(s));
      gl.deleteProgram(pr);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    },
  };
}

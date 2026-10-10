import LineChart from "./LineChart";
import {
  GROWTH_POINTS,
  growthFit,
  PH_POINTS,
  TEMP_POINTS,
  TEMP_SETPOINT,
} from "../data";

// The three "Experimental validation" figures. Their captions (Figures
// 28–30) live in hardware.md right after each chart's slot, like every
// other figure caption on the page.

const range = (from, to, step) => {
  const out = [];
  for (let v = from; v <= to + 1e-9; v += step)
    out.push(Math.round(v * 100) / 100);
  return out;
};

const tempXMax = Math.ceil(TEMP_POINTS[TEMP_POINTS.length - 1][0] / 60);

export function TempChart() {
  return (
    <div className="panel">
      <LineChart
        points={TEMP_POINTS}
        xOf={(p) => p[0] / 60}
        xDomain={[0, tempXMax]}
        yDomain={[15, 40]}
        xTicks={range(0, tempXMax, 10)}
        yTicks={range(15, 40, 5)}
        xLabel="Time (min)"
        yLabel="Temperature (°C)"
        setpoint={{ y: TEMP_SETPOINT, label: `Setpoint ${TEMP_SETPOINT} °C` }}
        tip={(p) => (
          <>
            Time <b>{(p[0] / 60).toFixed(1)} min</b>
            <br />
            Temperature <b>{p[1].toFixed(2)} °C</b>
          </>
        )}
        ariaLabel="Line chart of the full temperature profile at a 36 degrees C setpoint: the water heats steadily from about 18 degrees C and reaches 36 degrees C after about 34 minutes, then holds at the setpoint until the end of the roughly 51-minute run."
      />
    </div>
  );
}

export function PhChart() {
  return (
    <div className="panel">
      <LineChart
        points={PH_POINTS}
        xDomain={[0, 30]}
        yDomain={[3.5, 7.5]}
        xTicks={range(0, 30, 5)}
        yTicks={range(3.5, 7.5, 0.5)}
        yTickFormat={(v) => v.toFixed(1)}
        xLabel="Time (min)"
        yLabel="pH"
        dotR={3.2}
        tip={(p) => (
          <>
            Time <b>{p[0].toFixed(1)} min</b>
            <br />
            pH <b>{p[1].toFixed(2)}</b>
          </>
        )}
        ariaLabel="Line chart of the pH sensor response over 30 minutes: pH is steady at about 6.4, drops to about 5.5 at 5 minutes and to about 4.1 at 15 minutes after acid additions, then rises to about 6.8 at about 24 minutes after base is added."
      />
    </div>
  );
}

export function GrowthChart() {
  return (
    <div className="panel">
      <LineChart
        points={GROWTH_POINTS}
        xDomain={[0, 10]}
        yDomain={[0, 0.5]}
        xTicks={range(0, 10, 2)}
        yTicks={range(0, 0.5, 0.1)}
        yTickFormat={(v) => v.toFixed(1)}
        xLabel="Time (h)"
        yLabel="OD₆₀₀"
        fit={growthFit}
        dotR={4.5}
        tip={(p) => (
          <>
            Time <b>{p[0]} h</b>
            <br />
            OD₆₀₀ <b>{p[1].toFixed(4)}</b>
          </>
        )}
        ariaLabel="Line chart of E. coli growth in the SHIHAB bioreactor: OD600 rises from about 0.01 at 0 hours in a sigmoidal curve to about 0.49 at 10 hours."
      />
      <details className="details">
        <summary className="details-summary">View data table</summary>
        <div className="details-body">
          <div className="caption">
            <strong>
              Table 4. OD₆₀₀ rose from about 0.01 to about 0.49 over 10 hours
            </strong>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Time (h)</th>
                  <th>OD₆₀₀</th>
                </tr>
              </thead>
              <tbody>
                {GROWTH_POINTS.map(([t, od]) => (
                  <tr key={t}>
                    <td>{t}</td>
                    <td>{od.toFixed(4)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </details>
    </div>
  );
}

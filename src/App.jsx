import LiquidGlassFilter from "./LiquidGlassFilter";
import LiquidGlass from "./LiquidGlass";
import "./App.css";

export default function App() {
  return (
    <div className="page">
      {/* SVG filter MUST be mounted */}
      <LiquidGlassFilter />

      {/* Example glass component */}
      <LiquidGlass>
        <div style={{ padding: "40px", color: "white" }}>
          Liquid Glass Content
        </div>
      </LiquidGlass>
    </div>
  );
}

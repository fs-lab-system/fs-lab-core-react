import { NavLink } from "react-router-dom";

export function Navigation() {
  return (
    <nav className="global-nav">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/feature-snapshot-dashboard">
        Feature Snapshots Dashboard
      </NavLink>
      <NavLink to="/ai-analysis">AI Analysis</NavLink>
      <NavLink to="/small-experiments">Small Experiments</NavLink>
      <NavLink to="/about">About</NavLink>
    </nav>
  );
}

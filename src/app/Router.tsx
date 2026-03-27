import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { SmallExperiments } from "../pages/experiments/SmallExperiments";
import { FeatureSnapshotsDashboard } from "../pages/FeatureSnapshotDashboard";
import { NotFound } from "../pages/NotFound";
import { About } from "../pages/About";
import AIAnalysis from "../pages/AIAnalysis";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/small-experiments" element={<SmallExperiments />} />
      <Route
        path="/feature-snapshot-dashboard"
        element={<FeatureSnapshotsDashboard />}
      />
      <Route path="/ai-analysis" element={<AIAnalysis />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

import { useEffect, useState } from "react";
import { fetchLatestAnalysis } from "../services/ai";
import ReactMarkdown from "react-markdown";

/* nice headers */
function formatModelName(model: string) {
  return model.charAt(0).toUpperCase() + model.slice(1);
}

/* Date */
function formatDate(ts: string) {
  return new Date(ts).toLocaleString();
}

/* ICONS */
function getModelIcon(model: string) {
  switch (model) {
    case "llama":
      return "🧠";
    case "mistral":
      return "⚡";
    default:
      return "🤖";
  }
}

function formatNumber(n: number) {
  return n.toFixed(2);
}

export default function AIAnalysis() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const result = await fetchLatestAnalysis();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      }
    }

    load();
  }, []);

  if (error) return <div>❌ Error: {error}</div>;
  if (!data) return <div>⏳ Loading...</div>;

  const sortedServiceMetrics = [...(data.aggregatedSnapshots || [])].sort(
    (a, b) => a.avg_p50_latency_s - b.avg_p50_latency_s,
  );

  return (
    <div>
      <section>
        <h2>🤖 AI Analysis</h2>

        <p className="ai-timestamp">Generated: {formatDate(data.timestamp)}</p>

        <div className="ai-grid">
          {/* either render whats inside data or nothing if empty */}
          {Object.entries(data.analyses || {}).map(([model, text]) => (
            <div key={model} className="ai-card">
              <h3>
                {getModelIcon(model)} {formatModelName(model)}
              </h3>
              <ReactMarkdown>{text as string}</ReactMarkdown>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>📊 Service Metrics</h2>
        {sortedServiceMetrics.length > 0 && (
          <p className="ai-meta">
            🧪 Sample Size: {sortedServiceMetrics[0].sample_size}
          </p>
        )}

        <div className="metrics-grid">
          {sortedServiceMetrics.map((s: any) => (
            <div key={s.service} className="ai-card">
              <h3>⚙️ {s.service}</h3>

              <div className="metric-row">
                <span>⚡ p50 latency</span>
                <strong>{formatNumber(s.avg_p50_latency_s)}</strong>
              </div>

              <div className="metric-row">
                <span>📈 p95 latency</span>
                <strong>{formatNumber(s.avg_p95_latency_s)}</strong>
              </div>

              <div className="metric-row">
                <span>🚨 p99 latency</span>
                <strong>{formatNumber(s.avg_p99_latency_s)}</strong>
              </div>

              {/** 
              <div className="metric-row">
                <span>📉 stability score</span>
                <strong>{formatNumber(s.stability_score)}</strong>
              </div>*/}

              <div className="metric-row">
                <span>🔀 Latency Spread p50</span>
                <strong>{s.range_p50_latency_s}</strong>
              </div>

              <div className="metric-row">
                <span>✅ avg. success rate</span>
                <strong>{(s.avg_success_rate * 100).toFixed(1)}%</strong>
              </div>
            </div>
          ))}
          {sortedServiceMetrics.length === 0 && <p>No metrics available</p>}
        </div>
      </section>
    </div>
  );
}

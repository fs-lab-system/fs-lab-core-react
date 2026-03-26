import { useQuery } from "@tanstack/react-query";
import type { FeatureSnapshot } from "../lib/queries/snapshots";
import { fetchFeatureSnapshots } from "../lib/queries/snapshots";
import { QueryState } from "../components/common/QueryState";

import { FeatureSnapshotsTable } from "../components/tables/FeatureSnapshotsTable";
import { LatencyChart } from "../components/charts/LatencyChart";
import { useState } from "react";

export function FeatureSnapshotsDashboard() {
  /*
  state management
  init snapshotData variable (not null)
  fetch or chace if page is mounted
  refresh for manual refresh
  */
  const {
    data = [],
    isLoading,
    error,
    refetch,
  } = useQuery<FeatureSnapshot[], Error>({
    queryKey: ["featureSnapshots"],
    queryFn: fetchFeatureSnapshots,
    staleTime: 5 * 60 * 1000 /* 5 min Chace */,
  });

  const METRICS = [
    { key: "p50_latency_s", label: "p50 Latency" },
    { key: "p95_latency_s", label: "p95 Latency" },
    { key: "p99_latency_s", label: "p99 Latency" },
  ] as const;

  /* SELECTION STATE */
  const [selectedMetrics, setSelectedMetrics] = useState(
    METRICS.map((metric) => metric.key),
  );

  return (
    <div className="dashboard">
      <h1>Feature Snapshots Dashboard</h1>

      <section className="table">
        <h3>Snapshot Table</h3>
        <button onClick={() => refetch()} disabled={isLoading}>
          Refresh
        </button>
        <br />
        <br />

        <QueryState isLoading={isLoading} error={error} data={data}>
          <FeatureSnapshotsTable data={data} />
        </QueryState>
      </section>

      <section className="charts">
        <h3>Latency Overview</h3>

        {/* SELECTION */}
        <div className="chart-controls">
          {METRICS.map((metric) => (
            <label key={metric.key}>
              <input
                type="checkbox"
                checked={selectedMetrics.includes(metric.key)}
                onChange={() => {
                  {
                    /* prev = metric before change */
                  }
                  setSelectedMetrics((prev) => {
                    const isSelected = prev.includes(metric.key);
                    {
                      /* if metric is selected remove, else add 
                      remove: select all metrics except the filterd one */
                    }
                    if (isSelected) {
                      return prev.filter((element) => element !== metric.key);
                    } else {
                      return [...prev, metric.key];
                    }
                  });
                }}
              />
              {metric.label}
            </label>
          ))}
        </div>

        {/* DIAGRAMMS */}
        <QueryState isLoading={isLoading} error={error} data={data}>
          {METRICS.filter((metric) => selectedMetrics.includes(metric.key)).map(
            (metric) => (
              <LatencyChart
                key={metric.key}
                data={data}
                metric={metric.key}
                title={metric.label}
              />
            ),
          )}
        </QueryState>
      </section>
    </div>
  );
}

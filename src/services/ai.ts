const API_BASE = "https://ai-analysis-worker.t-a-d.workers.dev";

export async function fetchLatestAnalysis() {
  try {
    const res = await fetch(`${API_BASE}/kv-latest`);

    if (!res.ok) {
      throw new Error(`API failed: ${res.status}`);
    }

    const json = await res.json();
    return json;
  } catch (err) {
    console.error("fetchLatestAnalysis ERROR:", err);
    throw err; // wichtig → damit React es behandeln kann
  }
}

export async function runAnalysis(snapshotId: string) {
  const res = await fetch(`${API_BASE}/api/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ snapshotId }),
  });

  if (!res.ok) {
    throw new Error(`Analysis failed: ${res.status}`);
  }

  return res.json();
}

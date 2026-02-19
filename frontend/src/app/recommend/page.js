"use client";

import { useState } from "react";

export default function Recommend() {
  const [result, setResult] = useState("Click to test API");

  const testRecommend = () => {
    fetch("http://127.0.0.1:8000/api/recommend/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        moods: ["happy", "love"],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setResult(JSON.stringify(data, null, 2));
      })
      .catch((err) => {
        setResult("ERROR: " + err.message);
      });
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>Movie Recommendation Test</h1>

      <button onClick={testRecommend}>Get Recommendation</button>

      <pre style={{ marginTop: 20 }}>{result}</pre>
    </main>
  );
}

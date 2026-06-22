import React, { useEffect, useState } from "react";

export default function TorusWireframe() {
  const [angleX, setAngleX] = useState(0.8);
  const [angleY, setAngleY] = useState(0.6);

  // Slow rotation simulation
  useEffect(() => {
    let animationFrameId: number;
    const animate = () => {
      setAngleX((prev) => (prev + 0.003) % (Math.PI * 2));
      setAngleY((prev) => (prev + 0.002) % (Math.PI * 2));
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const R = 90; // Major radius
  const r = 40;  // Minor radius
  const uSteps = 24; // segments around major ring
  const vSteps = 12; // segments around minor tube

  // Projection logic
  const project = (x: number, y: number, z: number) => {
    // Rotate around X
    const cosX = Math.cos(angleX);
    const sinX = Math.sin(angleX);
    const y1 = y * cosX - z * sinX;
    const z1 = y * sinX + z * cosX;

    // Rotate around Y
    const cosY = Math.cos(angleY);
    const sinY = Math.sin(angleY);
    const x2 = x * cosY + z1 * sinY;
    const z2 = -x * sinY + z1 * cosY;

    // Center in 400x400 container
    const scale = 1.3;
    const screenX = 200 + x2 * scale;
    const screenY = 200 + y1 * scale;
    return { x: screenX, y: screenY };
  };

  const ringPaths: string[] = [];
  const tubePaths: string[] = [];

  // Generate u-rings (circles around the main torus hole)
  for (let uIdx = 0; uIdx < uSteps; uIdx++) {
    const u = (uIdx / uSteps) * Math.PI * 2;
    const cosU = Math.cos(u);
    const sinU = Math.sin(u);

    let pathPoints: string[] = [];
    for (let vIdx = 0; vIdx <= vSteps; vIdx++) {
      const v = (vIdx / vSteps) * Math.PI * 2;
      const cosV = Math.cos(v);
      const sinV = Math.sin(v);

      const x = (R + r * cosV) * cosU;
      const y = (R + r * cosV) * sinU;
      const z = r * sinV;

      const pt = project(x, y, z);
      pathPoints.push(`${vIdx === 0 ? "M" : "L"} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`);
    }
    ringPaths.push(pathPoints.join(" "));
  }

  // Generate v-tubes (circles wrapping around the tube)
  for (let vIdx = 0; vIdx < vSteps; vIdx++) {
    const v = (vIdx / vSteps) * Math.PI * 2;
    const cosV = Math.cos(v);
    const sinV = Math.sin(v);

    let pathPoints: string[] = [];
    for (let uIdx = 0; uIdx <= uSteps; uIdx++) {
      const u = (uIdx / uSteps) * Math.PI * 2;
      const cosU = Math.cos(u);
      const sinU = Math.sin(u);

      const x = (R + r * cosV) * cosU;
      const y = (R + r * cosV) * sinU;
      const z = r * sinV;

      const pt = project(x, y, z);
      pathPoints.push(`${uIdx === 0 ? "M" : "L"} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`);
    }
    tubePaths.push(pathPoints.join(" "));
  }

  return (
    <svg viewBox="0 0 400 400" className="w-full h-full max-w-[320px] md:max-w-[400px] select-none pointer-events-none">
      <defs>
        <linearGradient id="torusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#818cf8" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#6366f1" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      {/* Draw structural grid lines */}
      <g>
        {ringPaths.map((d, idx) => (
          <path
            key={`ring-${idx}`}
            d={d}
            fill="none"
            stroke="url(#torusGrad)"
            strokeWidth="0.8"
            opacity={0.35 + (idx % 2 === 0 ? 0.15 : 0)}
          />
        ))}
        {tubePaths.map((d, idx) => (
          <path
            key={`tube-${idx}`}
            d={d}
            fill="none"
            stroke="url(#torusGrad)"
            strokeWidth="0.8"
            opacity={0.35 + (idx % 2 === 0 ? 0.15 : 0)}
          />
        ))}
      </g>
    </svg>
  );
}

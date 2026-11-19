"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import AppShell from "../../components/AppShell";
import { showcaseCards, type CardKey } from "../showcase-data";

export default function ShowcaseDetailPage() {
  const params = useParams<{ key: string }>();
  const key = params.key as CardKey;
  const card = showcaseCards.find((item) => item.key === key) ?? showcaseCards[0];
  const [activeStep, setActiveStep] = useState(0);
  const visualRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveStep((current) => (current + 1) % card.details.flow.length);
    }, 1800);
    return () => window.clearInterval(timer);
  }, [card.details.flow.length]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const visual = visualRef.current;
    if (!canvas || !visual) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let animationFrame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const resize = () => {
      const bounds = visual.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(bounds.width * ratio);
      canvas.height = Math.round(bounds.height * ratio);
      canvas.style.width = `${bounds.width}px`;
      canvas.style.height = `${bounds.height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const handlePointer = (event: PointerEvent) => {
      const bounds = visual.getBoundingClientRect();
      pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
      visual.style.setProperty("--tilt-x", `${pointerY * -3.5}deg`);
      visual.style.setProperty("--tilt-y", `${pointerX * 5.5}deg`);
    };

    const resetPointer = () => {
      pointerX = 0;
      pointerY = 0;
      visual.style.setProperty("--tilt-x", "0deg");
      visual.style.setProperty("--tilt-y", "0deg");
    };

    const draw = () => {
      const bounds = visual.getBoundingClientRect();
      context.clearRect(0, 0, bounds.width, bounds.height);

      const cx = bounds.width * (0.5 + pointerX * 0.018);
      const cy = bounds.height * 0.54;
      const horizon = bounds.height * 0.68;

      context.save();
      context.globalCompositeOperation = "lighter";

      for (let i = 0; i < 26; i++) {
        const seed = i * 91.73;
        const speed = (frame + seed) * 0.006;
        const angle = seed + speed;
        const radius = 60 + ((i * 29) % Math.max(140, bounds.width * 0.38));
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle * 0.7) * radius * 0.34;
        const alpha = 0.18 + (Math.sin(speed * 3 + i) + 1) * 0.18;
        context.fillStyle = `rgba(91, 255, 189, ${alpha})`;
        context.beginPath();
        context.arc(x, y, i % 5 === 0 ? 2.2 : 1.2, 0, Math.PI * 2);
        context.fill();
      }

      for (let i = 0; i < 7; i++) {
        const progress = ((frame * (0.0028 + i * 0.00012) + i * 0.14) % 1);
        const startX = cx - bounds.width * 0.28;
        const startY = horizon - i * 2;
        const endX = cx + bounds.width * 0.28;
        const endY = horizon - i * 2;
        const x = startX + (endX - startX) * progress;

        context.strokeStyle = i % 2 === 0 ? "rgba(52, 211, 153, .32)" : "rgba(56, 189, 248, .24)";
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(startX, startY);
        context.bezierCurveTo(cx - 40, cy - 70, cx + 40, cy + 20, endX, endY);
        context.stroke();

        context.fillStyle = i % 2 === 0 ? "#86efac" : "#7dd3fc";
        context.shadowBlur = 14;
        context.shadowColor = context.fillStyle;
        context.beginPath();
        context.arc(x, startY + Math.sin(progress * Math.PI) * -38, 2.5, 0, Math.PI * 2);
        context.fill();
        context.shadowBlur = 0;
      }

      frame++;
      animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(visual);
    visual.addEventListener("pointermove", handlePointer);
    visual.addEventListener("pointerleave", resetPointer);
    draw();

    return () => {
      observer.disconnect();
      visual.removeEventListener("pointermove", handlePointer);
      visual.removeEventListener("pointerleave", resetPointer);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <AppShell pageTitle={`${card.title} - Backend Mode`}>
      <main className="detail-page">
        <nav className="detail-breadcrumb" aria-label="Breadcrumb">
          <Link href="/backend">Backend Mode</Link>
          <span>›</span>
          <b>{card.title}</b>
        </nav>

        <header className="detail-hero">
          <div className="detail-hero-copy">
            <span className={`detail-status status-${card.status.toLowerCase().replaceAll(" ", "-")}`}>
              {card.status}
            </span>
            <p className="showcase-kicker">{card.technology}</p>
            <h1><span>{card.icon}</span> {card.title}</h1>
            <p>{card.description}</p>
          </div>
          <div className="detail-orb" aria-hidden="true">
            <span className="orb-ring ring-one" />
            <span className="orb-ring ring-two" />
            <span className="orb-core">{card.icon}</span>
          </div>
        </header>

        <section className="layer-workspace" aria-label="Interactive component visualization">
          <div className="layer-visual holo-visual" ref={visualRef}>
            <canvas ref={canvasRef} className="holo-particle-canvas" aria-hidden="true" />
            <div className="holo-space" aria-hidden="true">
              <div className="holo-floor" />
              <div className="holo-core">
                <span className="holo-core-icon">{card.icon}</span>
                <span className="holo-core-pulse" />
              </div>
              <div className="holo-orbit orbit-a"><i /></div>
              <div className="holo-orbit orbit-b"><i /></div>
              <div className="holo-orbit orbit-c"><i /></div>
              <div className="holo-scanner" />
            </div>
            {card.details.flow.map((step, index) => (
              <button
                type="button"
                key={step}
                className={`layer-node ${activeStep === index ? "active" : ""} layer-node-${index + 1}`}
                onClick={() => setActiveStep(index)}
                style={{ "--node-index": index } as React.CSSProperties}
              >
                <span className="node-number">0{index + 1}</span>
                <span className="node-label">{step}</span>
              </button>
            ))}
            <div className="layer-beams" aria-hidden="true">
              {card.details.flow.slice(0, -1).map((_, index) => (
                <span key={index} className={`beam beam-${index + 1}`} />
              ))}
            </div>
          </div>

          <aside className="layer-inspector">
            <p>Active layer</p>
            <h2>{card.details.flow[activeStep]}</h2>
            <div className="inspector-progress">
              {card.details.flow.map((step, index) => (
                <button
                  type="button"
                  key={step}
                  aria-label={`Show layer ${index + 1}: ${step}`}
                  className={activeStep === index ? "active" : ""}
                  onClick={() => setActiveStep(index)}
                />
              ))}
            </div>
            <p className="inspector-copy">
              {card.details.usage[activeStep] ??
                "This layer represents a verified implementation step in the AgriProfit repository."}
            </p>
          </aside>
        </section>

        <section className="detail-info-grid">
          <article>
            <p>What AgriProfit uses</p>
            <h2>{card.details.purpose}</h2>
          </article>
          <article>
            <p>How this implementation works in the project</p>
            <h2>{card.details.how}</h2>
          </article>
        </section>

        <section className="project-usage-grid">
          {card.details.usage.map((item, index) => (
            <article key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{item}</p>
            </article>
          ))}
        </section>

        <section className="detail-bottom-grid">
          <article className="detail-files">
            <p>Actual implementation files</p>
            <div>
              {card.details.files.map((file) => <code key={file}>{file}</code>)}
            </div>
            <p className="detail-example-label">Practical example</p>
            <h3>{card.details.example}</h3>
          </article>
          <article className="detail-code">
            <div className="code-topbar">
              <span />
              <span />
              <span />
              <b>Repository example</b>
            </div>
            <pre><code>{card.details.snippet}</code></pre>
          </article>
        </section>

        <Link href="/backend" className="detail-back-button">← Return to component layers</Link>
      </main>
    </AppShell>
  );
}

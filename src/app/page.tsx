"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import MedoraLogo from "./components/MedoraLogo";

/* ═══════════════════════════════════════════════════
   MEDORA AI — COMPREHENSIVE LANDING PAGE
   Theme: Light Theme (white/gray)
   Font: Montserrat (Black for headings)
   Animations: CSS IntersectionObserver for smooth fade-up
═══════════════════════════════════════════════════ */

// A reusable hook for scroll animations
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function RevealSection({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const CAPABILITIES = [
  {
    id: "ReportLens",
    title: "Understand every detail.",
    highlight: "extracts critical information",
    desc: "Your medical reports shouldn't read like a foreign language. ReportLens extracts critical information from PDFs and converts it into structured, understandable data. Gain immediate clarity over complex medical jargon.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <circle cx="10" cy="13" r="2" />
        <line x1="11.5" y1="14.5" x2="15" y2="18" />
      </svg>
    ),
    color: "#ec4899", // pink
    align: "left",
  },
  {
    id: "LabLens",
    title: "Track your biomarkers.",
    highlight: "highlights unusual values",
    desc: "Lab results are a window into your health. LabLens explains results in both simple and technical terms, highlights unusual values, and generates informed questions for your next clinic visit.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3H15" />
        <path d="M10 3V14L4 21H20L14 14V3" />
        <path d="M5.5 19L11 11" />
      </svg>
    ),
    color: "#0ea5e9", // blue
    align: "right",
  },
  {
    id: "ScanSpeak",
    title: "See the unseen.",
    highlight: "explains observed visual features",
    desc: "Medical images hold crucial insights. ScanSpeak analyzes your diagnostic images and explains observed visual features in plain English, empowering you without providing automated medical diagnosis.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
    color: "#f59e0b", // amber
    align: "left",
  },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ background: "#ffffff", color: "#111827", minHeight: "100vh", overflowX: "hidden" }}>

      {/* ─── GLOBAL STYLES FOR ANIMATIONS ─────────── */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes waveLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes waveRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}} />

      {/* ─── NAVBAR ─────────────────────────────── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 5%", height: "64px",
        background: scrolled ? "rgba(200, 34, 70, 0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: 32, height: 32, background: "#fff", borderRadius: "8px",
            display: "flex", alignItems: "center", justifyContent: "center", padding: "6px",
          }}>
            <MedoraLogo size={20} color="#C82246" />
          </div>
          <span style={{ fontSize: "18px", fontWeight: 900, letterSpacing: "-0.5px", color: "#fff", fontFamily: "var(--font-montserrat)" }}>
            MEDORA AI
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "36px" } as React.CSSProperties}>
          {["Capabilities", "Architecture", "Safety"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`}
              style={{
                color: "rgba(255,255,255,0.8)", fontSize: "14px", textDecoration: "none", fontWeight: 600,
                transition: "color 0.2s"
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
            >{l}</a>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button style={{
            padding: "8px 24px", borderRadius: "999px",
            background: "transparent",
            color: "#fff", fontWeight: 600, fontSize: "14px",
            border: "1px solid rgba(255,255,255,0.3)", cursor: "pointer",
          }}>
            For Clinicians
          </button>
          <Link href="/dashboard" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "8px 24px", borderRadius: "999px",
            background: "#fff", // White button on red background
            color: "#C82246", fontWeight: 700, fontSize: "14px",
            textDecoration: "none",
          }}>
            Launch Interface
          </Link>
        </div>
      </nav>

      {/* ─── HERO (CODEX WAVE + APPLE LAYOUT) ──────── */}
      <section style={{
        position: "relative", minHeight: "100vh", background: "#C82246",
        display: "flex", alignItems: "center",
        padding: "100px 5% 150px", zIndex: 1, overflow: "hidden"
      }}>

        {/* Smooth Sine Waves matching Codex aesthetic */}
        <div style={{ position: 'absolute', bottom: -2, left: 0, width: '100%', height: '250px', overflow: 'hidden', zIndex: 0, pointerEvents: "none" }}>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{
            position: 'absolute', bottom: 0, left: 0, width: '200%', height: '100%',
            animation: 'waveLeft 12s linear infinite'
          }}>
            <path d="M0,60 Q150,120 300,60 T600,60 T900,60 T1200,60 L1200,120 L0,120 Z" fill="rgba(255,255,255,0.15)" />
          </svg>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{
            position: 'absolute', bottom: 0, left: 0, width: '200%', height: '75%',
            animation: 'waveRight 16s linear infinite'
          }}>
            <path d="M0,60 Q150,120 300,60 T600,60 T900,60 T1200,60 L1200,120 L0,120 Z" fill="rgba(255,255,255,0.3)" />
          </svg>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{
            position: 'absolute', bottom: 0, left: 0, width: '200%', height: '40%',
            animation: 'waveLeft 8s linear infinite'
          }}>
            <path d="M0,60 Q150,120 300,60 T600,60 T900,60 T1200,60 L1200,120 L0,120 Z" fill="#ffffff" />
          </svg>
        </div>

        <div style={{
          display: "flex", width: "100%", maxWidth: "1400px", margin: "0 auto",
          alignItems: "center", justifyContent: "space-between", gap: "40px",
          flexWrap: "wrap", position: "relative", zIndex: 10
        }}>
          {/* Left Text Block */}
          <div style={{ flex: "1 1 500px", maxWidth: "650px" }}>
            <RevealSection delay={0.1}>
              <h1 style={{
                fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif',
                fontSize: "clamp(52px, 5.5vw, 80px)",
                fontWeight: 600,
                lineHeight: "1.05",
                letterSpacing: "-1.5px",
                color: "rgb(255, 255, 255)",
                margin: "0 0 28px 0",
              }}>
                Clarity over your health data.
              </h1>
            </RevealSection>

            <RevealSection delay={0.2}>
              <p style={{
                fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif',
                fontSize: "clamp(18px, 1.8vw, 24px)",
                fontWeight: 500,
                lineHeight: "1.55",
                color: "rgba(255, 255, 255, 0.75)",
                marginBottom: "48px",
                maxWidth: "560px",
              }}>
                A multimodal healthcare AI system that helps you understand, organize, and communicate your medical information — while keeping all diagnostic decisions{" "}<span style={{ color: "rgba(255,255,255,1)", fontWeight: 600 }}>with your doctor.</span>
              </p>
            </RevealSection>

            <RevealSection delay={0.3}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                <button style={{
                  padding: "18px 40px", borderRadius: "999px",
                  background: "#ffffff", color: "#C82246",
                  fontSize: "16px", fontWeight: 800, cursor: "pointer",
                  border: "none", boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                }}>
                  Explore the System
                </button>
                <button style={{
                  padding: "18px 40px", borderRadius: "999px",
                  background: "rgba(255,255,255,0.1)", backdropFilter: "blur(4px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "#ffffff", fontSize: "16px", fontWeight: 600, cursor: "pointer",
                }}>
                  Read the Whitepaper
                </button>
              </div>
            </RevealSection>
          </div>

          {/* Right Empty Space for Product Images */}
          <div style={{ flex: "1 1 500px", minHeight: "500px", display: "flex", alignItems: "center", justifyItems: "center" }}>
            <RevealSection delay={0.4} className="w-full h-full flex items-center justify-center">
              <div style={{
                width: "100%", maxWidth: "500px", aspectRatio: "4/5",
                background: "rgba(255,255,255,0.1)", borderRadius: "32px",
                border: "2px dashed rgba(255,255,255,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#ffffff", fontWeight: 600, fontSize: "18px", backdropFilter: "blur(4px)"
              }}>
                [ Product Image Placeholder ]
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ─── ALTERNATING FEATURES (APPLE STYLE) ────── */}
      <section id="capabilities" style={{ padding: "120px 5%", background: "#ffffff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "160px" }}>

          {CAPABILITIES.map((cap, index) => {
            const isLeft = cap.align === "left";
            return (
              <div key={cap.id} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                gap: "64px", flexDirection: isLeft ? "row" : "row-reverse", flexWrap: "wrap"
              }}>

                {/* Text Block */}
                <div style={{ flex: "1 1 400px", maxWidth: "500px" }}>
                  <RevealSection>
                    {/* Icon */}
                    <div style={{
                      width: 56, height: 56, borderRadius: "50%",
                      background: cap.color + "15", color: cap.color,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      marginBottom: "24px", border: `2px solid ${cap.color}30`
                    }}>
                      {cap.icon}
                    </div>

                    {/* Title */}
                    <h2 style={{
                      fontFamily: "var(--font-montserrat)", fontSize: "clamp(40px, 5vw, 56px)",
                      fontWeight: 900, color: "#111827", letterSpacing: "-1.5px",
                      marginBottom: "24px", lineHeight: 1.1
                    }}>
                      {cap.title}
                    </h2>

                    {/* Description */}
                    <p style={{ fontSize: "20px", color: "#4b5563", lineHeight: 1.5, fontWeight: 500 }}>
                      {cap.desc.split(cap.highlight).map((part, i, arr) => (
                        <span key={i}>
                          {part}
                          {i !== arr.length - 1 && (
                            <span style={{ color: cap.color, fontWeight: 600 }}>
                              {cap.highlight}
                            </span>
                          )}
                        </span>
                      ))}
                    </p>
                  </RevealSection>
                </div>

                {/* Empty Image Space */}
                <div style={{ flex: "1 1 400px", minHeight: "400px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <RevealSection delay={0.2} className="w-full">
                    <div style={{
                      width: "100%", aspectRatio: "1/1", maxWidth: "500px",
                      background: "#f9fafb", borderRadius: "32px",
                      border: "1px solid #e5e7eb",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#9ca3af", fontWeight: 600, fontSize: "16px",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.02)"
                    }}>
                      [ Image Space for {cap.id} ]
                    </div>
                  </RevealSection>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* ─── SAFETY / ARCHITECTURE CTA ──────────────── */}
      <section id="safety" style={{ padding: "120px 5%", background: "#fdfdfd", borderTop: "1px solid #f3f4f6" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <RevealSection>
            <h2 style={{
              fontFamily: "var(--font-montserrat)", fontSize: "clamp(36px, 5vw, 48px)",
              fontWeight: 900, color: "#111827", letterSpacing: "-1px", marginBottom: "24px"
            }}>
              Understanding over diagnosis.
            </h2>
          </RevealSection>

          <RevealSection delay={0.1}>
            <p style={{ fontSize: "20px", color: "#4b5563", lineHeight: 1.6, marginBottom: "40px", fontWeight: 500 }}>
              Medora AI uses an advanced Router to orchestrate specialized agents, ensuring all requests are fact-checked via <span style={{ color: "#10b981", fontWeight: 600 }}>strict clinical evidence layers</span>. Emergency situations trigger immediate escalation guidance.
            </p>
          </RevealSection>

          <RevealSection delay={0.2}>
            <div style={{ display: "flex", justifyContent: "center", gap: "24px", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "16px", fontWeight: 600, color: "#111827" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                No automated diagnosis
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "16px", fontWeight: 600, color: "#111827" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                Complete privacy control
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "16px", fontWeight: 600, color: "#111827" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                RAG Evidence Layer
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────── */}
      <footer style={{ background: "#f9fafb", padding: "80px 5%", borderTop: "1px solid rgba(0,0,0,0.05)", textAlign: "center" }}>
        <RevealSection>
          <h2 style={{ fontFamily: "var(--font-montserrat)", fontSize: "32px", fontWeight: 900, color: "#111827", marginBottom: "32px" }}>
            Ready to empower your health?
          </h2>
          <button style={{
            padding: "16px 40px", borderRadius: "999px",
            background: "#e11d48", color: "#fff",
            fontSize: "16px", fontWeight: 700, cursor: "pointer",
            border: "none", boxShadow: "0 10px 20px rgba(225,29,72,0.2)",
            marginBottom: "48px"
          }}>
            Launch Medora AI
          </button>
        </RevealSection>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "24px", flexWrap: "wrap", borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: "40px" }}>
          <span style={{ fontSize: "14px", color: "#6b7280", fontWeight: 500 }}>© 2026 Medora Health. All rights reserved.</span>
          <div style={{ display: "flex", gap: "16px" }}>
            {["Privacy Policy", "Terms of Service", "Clinical Evidence", "Contact"].map(link => (
              <a key={link} href="#" style={{ fontSize: "14px", color: "#6b7280", textDecoration: "none", fontWeight: 500 }}>{link}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

import { useCallback, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { AnimatePresence, motion } from "motion/react";
import * as THREE from "three";

type Project = {
  id: string;
  number: string;
  title: string;
  category: string;
  status: string;
  description: string;
  tags: string[];
};

const projects: Project[] = [
  {
    id: "portfolio",
    number: "01",
    title: "Personal Portfolio",
    category: "DIGITAL ENGINEERING",
    status: "IN DEVELOPMENT",
    description:
      "A futuristic engineering portfolio combining interactive 3D visuals, motion design, technical storytelling and a responsive interface.",
    tags: ["React", "Three.js", "TypeScript", "Motion"],
  },
  {
    id: "cad",
    number: "02",
    title: "CAD Design Lab",
    category: "MECHANICAL DESIGN",
    status: "PLANNED",
    description:
      "A planned collection of mechanical drawings, component models and design experiments developed throughout my engineering studies.",
    tags: ["AutoCAD", "3D Modelling", "Technical Drawing"],
  },
  {
    id: "cnc",
    number: "03",
    title: "CNC Workflow",
    category: "MANUFACTURING",
    status: "PLANNED",
    description:
      "A future learning project exploring CNC machining concepts, tool paths, G-code, M-code and manufacturing workflows.",
    tags: ["CNC", "G-code", "Manufacturing"],
  },
];

const skills = [
  {
    number: "01",
    title: "Mechanical Design",
    detail: "CAD · Technical Drawing",
    level: "LEARNING",
  },
  {
    number: "02",
    title: "CNC Technology",
    detail: "G-code · M-code",
    level: "LEARNING",
  },
  {
    number: "03",
    title: "Thermal Systems",
    detail: "Refrigeration · HVAC",
    level: "STUDYING",
  },
  {
    number: "04",
    title: "3D Engineering",
    detail: "Modelling · Visualization",
    level: "EXPLORING",
  },
  {
    number: "05",
    title: "Web Technology",
    detail: "React · TypeScript",
    level: "BUILDING",
  },
  {
    number: "06",
    title: "Problem Solving",
    detail: "Analysis · Iteration",
    level: "DEVELOPING",
  },
];

function Reactor() {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.12;
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        state.pointer.y * 0.18,
        0.035,
      );
      group.current.rotation.z = THREE.MathUtils.lerp(
        group.current.rotation.z,
        -state.pointer.x * 0.15,
        0.035,
      );
    }

    if (core.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.7) * 0.055;
      core.current.scale.setScalar(pulse);
    }

    if (ring.current) {
      ring.current.rotation.x += delta * 0.08;
      ring.current.rotation.y -= delta * 0.11;
    }
  });

  return (
    <>
      <ambientLight intensity={0.45} />
      <pointLight position={[3, 2, 3]} intensity={12} color="#57eaff" />
      <pointLight position={[-3, -2, -1]} intensity={9} color="#ff6b35" />

      <group ref={group}>
        <mesh ref={core}>
          <icosahedronGeometry args={[1.15, 2]} />
          <meshStandardMaterial
            color="#102c3c"
            emissive="#087d9d"
            emissiveIntensity={1.6}
            metalness={0.85}
            roughness={0.22}
            wireframe
          />
        </mesh>

        <mesh>
          <icosahedronGeometry args={[0.75, 1]} />
          <meshStandardMaterial
            color="#07131c"
            emissive="#ff6338"
            emissiveIntensity={1.7}
            metalness={0.8}
            roughness={0.2}
            wireframe
          />
        </mesh>

        <mesh>
          <sphereGeometry args={[0.39, 32, 32]} />
          <meshBasicMaterial color="#a4f6ff" />
        </mesh>

        <group ref={ring}>
          <mesh rotation={[0.8, 0.2, 0.3]}>
            <torusGeometry args={[1.55, 0.012, 12, 160]} />
            <meshBasicMaterial color="#65eaff" />
          </mesh>
          <mesh rotation={[1.3, 0.5, 0.8]}>
            <torusGeometry args={[1.8, 0.009, 12, 160]} />
            <meshBasicMaterial color="#ff7046" />
          </mesh>
          <mesh rotation={[0.3, 1.1, 0.1]}>
            <torusGeometry args={[1.35, 0.008, 12, 160]} />
            <meshBasicMaterial color="#338bff" />
          </mesh>
        </group>

        <Float speed={2.5} rotationIntensity={1.4} floatIntensity={0.8}>
          <mesh position={[1.75, 0.8, 0.1]}>
            <octahedronGeometry args={[0.19, 0]} />
            <meshStandardMaterial
              color="#ff7952"
              emissive="#ff542b"
              emissiveIntensity={1.4}
            />
          </mesh>
        </Float>

        <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1}>
          <mesh position={[-1.7, -0.65, 0.4]}>
            <octahedronGeometry args={[0.14, 0]} />
            <meshStandardMaterial
              color="#5cecff"
              emissive="#16a8c6"
              emissiveIntensity={1.8}
            />
          </mesh>
        </Float>
      </group>

      <Stars radius={45} depth={25} count={900} factor={2.4} fade speed={0.7} />
    </>
  );
}

function CinematicLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 1450;
    let frame = 0;

    const tick = (now: number) => {
      const next = Math.min(100, Math.round(((now - start) / duration) * 100));
      setProgress(next);

      if (next < 100) {
        frame = requestAnimationFrame(tick);
      } else {
        window.setTimeout(onComplete, 250);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onComplete]);

  return (
    <motion.div
      className="boot-screen"
      exit={{ opacity: 0, scale: 1.03, filter: "blur(12px)" }}
      transition={{ duration: 0.65 }}
    >
      <div className="boot-grid" />
      <div className="boot-content">
        <div className="boot-logo">
          TH<span>.</span>
        </div>
        <div className="boot-kicker">PERSONAL ENGINEERING INTERFACE</div>
        <div className="boot-title">
          INITIALIZING<span>_</span>
        </div>
        <div className="boot-progress">
          <motion.div animate={{ width: `${progress}%` }} />
        </div>
        <div className="boot-bottom">
          <span>SYSTEM STARTUP</span>
          <span>{String(progress).padStart(3, "0")}%</span>
        </div>
      </div>
      <div className="boot-corner">TH / 001</div>
    </motion.div>
  );
}

function SystemHUD() {
  const [diagnostic, setDiagnostic] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(
      () => setDiagnostic((value) => (value + 1) % 4),
      1800,
    );
    return () => window.clearInterval(timer);
  }, []);

  const messages = [
    "CORE STABILITY: NOMINAL",
    "MOTION ENGINE: ACTIVE",
    "VISUAL SYSTEM: ONLINE",
    "INTERFACE: OPERATIONAL",
  ];

  return (
    <div className="advanced-hud" aria-label="Visual system status">
      <div className="hud-side hud-left">
        <span className="hud-label">ENGINEERING OS</span>
        <span className="hud-value">TH / 001</span>
        <span className="hud-divider" />
        <span className="hud-label">SYSTEM CHECK</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={messages[diagnostic]}
            className="hud-message"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
          >
            {messages[diagnostic]}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="hud-reticle" aria-hidden="true">
        <span />
        <i />
      </div>

      <div className="hud-side hud-right">
        <span className="hud-label">REACTOR STATUS</span>
        <span className="hud-value cyan">ONLINE</span>
        <div className="hud-equalizer" aria-hidden="true">
          {Array.from({ length: 18 }, (_, i) => (
            <span
              key={i}
              style={{
                height: `${8 + ((i * 13 + diagnostic * 7) % 27)}px`,
                animationDelay: `${i * 35}ms`,
              }}
            />
          ))}
        </div>
        <span className="hud-label">LIVE INTERFACE MONITOR</span>
      </div>
    </div>
  );
}

function SoundEngineButton({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      className={`sound-engine-button ${enabled ? "sound-enabled" : ""}`}
      onClick={onToggle}
      aria-pressed={enabled}
      title={enabled ? "Turn interface sounds off" : "Turn interface sounds on"}
    >
      <span className="sound-icon">{enabled ? "♫" : "♪"}</span>
      <span>{enabled ? "SOUND ON" : "SOUND OFF"}</span>
      <span className="sound-indicator" />
    </button>
  );
}

function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div className="section-label">
      <span>{number}</span>
      <span className="section-line" />
      <span>{children}</span>
    </div>
  );
}

function RatingWidget() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("th-portfolio-rating");

    if (saved) {
      const value = Number(saved);

      if (value >= 1 && value <= 5) {
        setRating(value);
        setSubmitted(true);
      }
    }
  }, []);

  const submitRating = () => {
    if (rating < 1 || rating > 5) return;

    window.localStorage.setItem("th-portfolio-rating", String(rating));
    setSubmitted(true);
  };

  return (
    <section className="rating-section">
      <div className="rating-panel">
        <div className="rating-orbit" aria-hidden="true" />

        <div className="section-label">
          <span>06</span>
          <span className="section-line" />
          <span>VISITOR FEEDBACK</span>
        </div>

        <h2>
          RATE THE
          <span> EXPERIENCE.</span>
        </h2>

        <p className="rating-description">
          Explored the interface? Share your experience by selecting a star
          rating.
        </p>

        <div
          className="rating-stars"
          role="group"
          aria-label="Rate this portfolio from 1 to 5 stars"
          onMouseLeave={() => setHoverRating(0)}
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={`rating-star ${
                star <= (hoverRating || rating) ? "star-active" : ""
              }`}
              onMouseEnter={() => setHoverRating(star)}
              onFocus={() => setHoverRating(star)}
              onBlur={() => setHoverRating(0)}
              onClick={() => {
                setRating(star);
                setSubmitted(false);
              }}
              aria-label={`${star} out of 5 stars`}
              aria-pressed={rating === star}
            >
              ★
            </button>
          ))}
        </div>

        <div className="rating-caption">
          {rating === 0
            ? "SELECT YOUR RATING"
            : [
                "",
                "NEEDS IMPROVEMENT",
                "FAIR EXPERIENCE",
                "GOOD EXPERIENCE",
                "GREAT EXPERIENCE",
                "EXCEPTIONAL EXPERIENCE",
              ][hoverRating || rating]}
        </div>

        <button
          type="button"
          className="rating-submit"
          disabled={rating === 0}
          onClick={submitRating}
        >
          {submitted ? "RATING SAVED ✓" : "SUBMIT RATING ↗"}
        </button>

        <div className="rating-footnote">
          {submitted
            ? `YOUR RATING: ${rating}/5 · SAVED ON THIS DEVICE`
            : "YOUR FEEDBACK HELPS GUIDE FUTURE IMPROVEMENTS"}
        </div>
      </div>
    </section>
  );
}

function Interface() {
  const [bootComplete, setBootComplete] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [clock, setClock] = useState("--:--:--");
  const [scrollProgress, setScrollProgress] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);

  const finishBoot = useCallback(() => setBootComplete(true), []);

  useEffect(() => {
    const updateClock = () => {
      setClock(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Dhaka",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    };

    updateClock();
    const timer = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(
        scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0,
      );
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        void audioContextRef.current.close();
      }
    };
  }, []);

  const playUiSound = useCallback(
    (frequency = 520) => {
      if (!soundOn) return;

      try {
        const AudioContextClass = window.AudioContext;
        if (!AudioContextClass) return;

        const context = audioContextRef.current ?? new AudioContextClass();
        audioContextRef.current = context;

        void context.resume().then(() => {
          const oscillator = context.createOscillator();
          const gain = context.createGain();

          oscillator.type = "sine";
          oscillator.frequency.setValueAtTime(frequency, context.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(
            Math.max(120, frequency * 0.65),
            context.currentTime + 0.09,
          );

          gain.gain.setValueAtTime(0.0001, context.currentTime);
          gain.gain.exponentialRampToValueAtTime(
            0.04,
            context.currentTime + 0.01,
          );
          gain.gain.exponentialRampToValueAtTime(
            0.0001,
            context.currentTime + 0.12,
          );

          oscillator.connect(gain);
          gain.connect(context.destination);
          oscillator.start();
          oscillator.stop(context.currentTime + 0.13);
        });
      } catch {
        // Sound is optional; the website works without it.
      }
    },
    [soundOn],
  );

  const toggleSound = useCallback(() => {
    const next = !soundOn;
    setSoundOn(next);

    if (next) {
      try {
        const AudioContextClass = window.AudioContext;
        if (!AudioContextClass) return;

        const context = audioContextRef.current ?? new AudioContextClass();
        audioContextRef.current = context;

        void context.resume().then(() => {
          const oscillator = context.createOscillator();
          const gain = context.createGain();

          oscillator.type = "sine";
          oscillator.frequency.value = 660;
          gain.gain.value = 0.025;

          oscillator.connect(gain);
          gain.connect(context.destination);
          oscillator.start();
          oscillator.stop(context.currentTime + 0.08);
        });
      } catch {
        // Audio is optional.
      }
    } else if (audioContextRef.current) {
      void audioContextRef.current.suspend();
    }
  }, [soundOn]);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText("taqdirulhassan12@gmail.com");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
      playUiSound(780);
    } catch {
      window.location.href = "mailto:taqdirulhassan12@gmail.com";
    }
  }, [playUiSound]);

  const navigateTo = (id: string) => {
    setMenuOpen(false);
    playUiSound(430);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap');

        :root {
          font-family: 'Space Grotesk', sans-serif;
          color: #eaf3f8;
          background: #06090d;
          font-synthesis: none;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          --bg: #06090d;
          --panel: #0a1118;
          --line: rgba(151, 199, 220, .15);
          --muted: #81919e;
          --cyan: #68e8ff;
          --orange: #ff7952;
          --mono: 'DM Mono', monospace;
        }

        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; scroll-padding-top: 90px; }
        body { margin: 0; min-width: 320px; background: var(--bg); }
        body, button, a { font-family: 'Space Grotesk', sans-serif; }
        button, a { -webkit-tap-highlight-color: transparent; }
        button { color: inherit; }
        a { color: inherit; text-decoration: none; }
        button:focus-visible, a:focus-visible {
          outline: 2px solid var(--cyan); outline-offset: 4px;
        }
        ::selection { background: var(--cyan); color: #061016; }

        .portfolio-shell {
          min-height: 100vh; overflow: clip; position: relative;
          background:
            radial-gradient(ellipse at 74% 15%, rgba(12, 91, 115, .12), transparent 34%),
            radial-gradient(ellipse at 10% 70%, rgba(255, 104, 65, .045), transparent 30%),
            var(--bg);
        }
        .portfolio-shell::before {
          content: ''; pointer-events: none; position: fixed; inset: 0; z-index: 40;
          opacity: .11; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.92' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.18'/%3E%3C/svg%3E");
        }
        .grid-background {
          position: absolute; inset: 0 0 auto; height: 100%; pointer-events: none;
          opacity: .24;
          background-image: linear-gradient(rgba(116, 177, 201, .055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(116, 177, 201, .055) 1px, transparent 1px);
          background-size: 58px 58px;
          mask-image: linear-gradient(to bottom, black, transparent 90%);
        }
        .scroll-meter {
          height: 2px; position: fixed; inset: 0 auto auto 0; z-index: 100;
          background: linear-gradient(90deg, var(--orange), var(--cyan));
          box-shadow: 0 0 12px rgba(104, 232, 255, .7);
        }
        .topbar {
          height: 78px; padding: 0 5.5%; display: flex; align-items: center;
          justify-content: space-between; gap: 22px; position: relative; z-index: 60;
          border-bottom: 1px solid var(--line); background: rgba(6, 9, 13, .83);
          backdrop-filter: blur(18px);
        }
        .brand { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
        .brand-mark {
          width: 38px; height: 38px; display: grid; place-items: center;
          border: 1px solid rgba(104,232,255,.5); color: var(--cyan);
          font-weight: 700; font-size: 15px; letter-spacing: -1px;
          position: relative; background: rgba(104,232,255,.04);
        }
        .brand-mark::after {
          content: ''; position: absolute; width: 5px; height: 5px;
          background: var(--orange); right: -3px; top: -3px;
        }
        .brand-name { font-size: 12px; font-weight: 700; letter-spacing: 2px; }
        .brand-sub { color: var(--muted); font: 9px var(--mono); letter-spacing: 1.5px; margin-top: 4px; }
        .top-nav { display: flex; align-items: center; gap: clamp(15px, 2.6vw, 36px); }
        .top-nav button, .mobile-nav button {
          border: 0; padding: 10px 0; color: #a9b6c0; font: 10px var(--mono);
          letter-spacing: 1px; background: transparent; cursor: pointer; transition: color .2s;
        }
        .top-nav button:hover, .mobile-nav button:hover { color: var(--cyan); }
        .top-right { display: flex; align-items: center; gap: 15px; }
        .top-status { display: flex; align-items: center; gap: 8px; color: #a6c2ca; font: 9px var(--mono); white-space: nowrap; }
        .status-dot { width: 6px; height: 6px; background: #6fffc1; border-radius: 50%; box-shadow: 0 0 10px #6fffc1; animation: status-pulse 1.7s infinite; }
        .sound-engine-button {
          display: flex; align-items: center; gap: 7px; padding: 8px 10px;
          border: 1px solid var(--line); background: rgba(255,255,255,.02);
          font: 9px var(--mono); letter-spacing: .7px; cursor: pointer;
          color: #b5c5cd; white-space: nowrap; transition: all .25s;
        }
        .sound-engine-button:hover, .sound-enabled { border-color: rgba(104,232,255,.5); color: var(--cyan); }
        .sound-icon { font-size: 14px; }
        .sound-indicator { width: 5px; height: 5px; border-radius: 50%; background: #53616a; }
        .sound-enabled .sound-indicator { background: var(--cyan); box-shadow: 0 0 9px var(--cyan); }
        .menu-toggle { display: none; border: 1px solid var(--line); background: transparent; padding: 9px 12px; cursor: pointer; font: 10px var(--mono); }
        .mobile-nav { display: none; }

        .advanced-hud {
          max-width: 1400px; margin: 0 auto; padding: 18px 5.5% 0;
          display: flex; align-items: center; justify-content: space-between; gap: 20px;
          position: relative; z-index: 2;
        }
        .hud-side { display: flex; flex-direction: column; gap: 6px; min-width: 180px; }
        .hud-label { font: 8px var(--mono); letter-spacing: 1.6px; color: #667d8a; }
        .hud-value { font: 11px var(--mono); color: #e1edf2; letter-spacing: 1.4px; }
        .hud-value.cyan { color: var(--cyan); }
        .hud-divider { height: 1px; width: 46px; background: var(--line); margin: 3px 0; }
        .hud-message { font: 9px var(--mono); color: var(--orange); min-height: 12px; }
        .hud-reticle { width: 40px; height: 40px; position: relative; opacity: .65; flex-shrink: 0; }
        .hud-reticle::before, .hud-reticle::after {
          content: ''; position: absolute; inset: 5px; border: 1px solid rgba(104,232,255,.4); border-radius: 50%;
        }
        .hud-reticle::after { inset: 12px; border-color: rgba(255,121,82,.8); }
        .hud-reticle span { position: absolute; width: 100%; height: 1px; background: var(--line); top: 50%; }
        .hud-reticle i { position: absolute; height: 100%; width: 1px; background: var(--line); left: 50%; }
        .hud-equalizer { height: 29px; display: flex; align-items: center; gap: 3px; }
        .hud-equalizer span { width: 3px; min-height: 3px; background: var(--cyan); opacity: .7; animation: equalizer 1.2s ease-in-out infinite alternate; }

        .hero {
          max-width: 1400px; margin: 0 auto; padding: clamp(50px, 7vw, 96px) 5.5% 88px;
          display: grid; grid-template-columns: minmax(0, 1.04fr) minmax(300px, .96fr);
          align-items: center; gap: clamp(24px, 4vw, 70px); position: relative;
          min-height: 650px; overflow: visible;
        }
        .hero-copy { min-width: 0; position: relative; z-index: 3; padding: 12px 0 25px; }
        .eyebrow { display: flex; align-items: center; gap: 11px; color: var(--cyan); font: 10px var(--mono); letter-spacing: 2px; margin-bottom: 28px; }
        .eyebrow-line { width: 30px; height: 1px; background: var(--orange); }
        .hero h1 {
          font-size: clamp(42px, 6.1vw, 88px); line-height: .99; letter-spacing: -.075em;
          font-weight: 600; margin: 0; max-width: 760px; overflow-wrap: normal;
        }
        .hero h1 .muted-line { display: block; color: #778792; }
        .hero h1 .highlight-line { display: block; color: var(--cyan); text-shadow: 0 0 34px rgba(104,232,255,.13); }
        .hero-description { max-width: 490px; margin: 27px 0 0; color: #91a2ad; font-size: 14px; line-height: 1.9; }
        .hero-description strong { color: #dce8ee; font-weight: 500; }
        .hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 32px; }
        .button-primary, .button-secondary {
          min-height: 47px; display: inline-flex; align-items: center; justify-content: center;
          gap: 13px; padding: 0 18px; font: 10px var(--mono); letter-spacing: 1px;
          cursor: pointer; transition: transform .25s, border-color .25s, background .25s;
        }
        .button-primary { background: var(--cyan); color: #061016; border: 1px solid var(--cyan); font-weight: 500; }
        .button-primary:hover { transform: translateY(-3px); background: #b3f5ff; }
        .button-secondary { border: 1px solid rgba(173,206,219,.25); background: rgba(255,255,255,.02); color: #e2edf2; }
        .button-secondary:hover { transform: translateY(-3px); border-color: var(--cyan); }
        .button-arrow { font-size: 16px; }
        .hero-meta { display: flex; flex-wrap: wrap; gap: 25px; margin-top: 43px; padding-top: 20px; border-top: 1px solid var(--line); }
        .meta-item { display: flex; flex-direction: column; gap: 7px; }
        .meta-label { font: 8px var(--mono); color: #657985; letter-spacing: 1.3px; }
        .meta-value { font: 11px var(--mono); color: #d0dce2; }
        .hero-visual {
          position: relative; width: 100%; min-width: 0; min-height: 430px;
          height: clamp(390px, 43vw, 590px); display: grid; place-items: center;
          overflow: visible; isolation: isolate;
        }
        .reactor-canvas { position: absolute; inset: 0; z-index: 2; cursor: grab; }
        .reactor-canvas:active { cursor: grabbing; }
        .reactor-glow {
          position: absolute; width: 70%; aspect-ratio: 1; border-radius: 50%;
          background: radial-gradient(circle, rgba(29,134,163,.2), rgba(10,38,52,.08) 40%, transparent 72%);
          filter: blur(14px); z-index: 0; animation: glow-breathe 4s ease-in-out infinite;
        }
        .reactor-orbit {
          position: absolute; width: 82%; aspect-ratio: 1; border-radius: 50%;
          border: 1px solid rgba(104,232,255,.11); transform: rotate(-23deg) scaleY(.57);
          z-index: 1; box-shadow: 0 0 45px rgba(44,170,198,.035);
        }
        .reactor-orbit::before, .reactor-orbit::after {
          content: ''; position: absolute; inset: 9%; border: 1px dashed rgba(255,121,82,.22); border-radius: 50%;
        }
        .reactor-orbit::after { inset: -8%; border-color: rgba(104,232,255,.1); }
        .visual-corner { position: absolute; z-index: 4; font: 8px var(--mono); color: #6f8996; letter-spacing: 1.4px; }
        .visual-corner.top-left { top: 9%; left: 0; }
        .visual-corner.top-right { top: 9%; right: 0; text-align: right; }
        .visual-corner.bottom-left { bottom: 7%; left: 0; }
        .visual-corner.bottom-right { bottom: 7%; right: 0; text-align: right; }
        .visual-corner strong { display: block; color: var(--cyan); font-size: 11px; font-weight: 400; margin-top: 7px; }
        .visual-scanline { position: absolute; z-index: 3; top: 12%; bottom: 12%; left: 50%; width: 1px; background: linear-gradient(transparent, rgba(104,232,255,.25), transparent); }
        .scroll-hint { position: absolute; bottom: 24px; left: 5.5%; display: flex; align-items: center; gap: 12px; color: #6c7d87; font: 9px var(--mono); letter-spacing: 1.3px; }
        .scroll-hint span { display: block; width: 38px; height: 1px; background: var(--orange); }

        .ticker { overflow: hidden; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); background: rgba(255,255,255,.015); }
        .ticker-track { display: flex; width: max-content; animation: ticker-scroll 32s linear infinite; }
        .ticker:hover .ticker-track { animation-play-state: paused; }
        .ticker-item { padding: 19px 28px; display: flex; align-items: center; gap: 25px; font: 10px var(--mono); letter-spacing: 2px; color: #94a7b1; white-space: nowrap; }
        .ticker-item i { width: 5px; height: 5px; background: var(--orange); transform: rotate(45deg); }

        .content-section { max-width: 1400px; padding: 110px 5.5%; margin: 0 auto; position: relative; }
        .section-label { display: flex; align-items: center; gap: 12px; font: 10px var(--mono); color: var(--cyan); letter-spacing: 1.6px; }
        .section-label > span:first-child { color: var(--orange); }
        .section-line { height: 1px; width: 35px; background: var(--line); }
        .section-heading-row { display: flex; align-items: flex-end; justify-content: space-between; gap: 30px; margin: 22px 0 44px; }
        .section-heading { font-size: clamp(32px, 5vw, 59px); line-height: 1.06; letter-spacing: -.065em; font-weight: 500; margin: 0; }
        .section-heading em { color: #778792; font-style: normal; }
        .section-intro { max-width: 350px; margin: 0 0 4px; color: var(--muted); font-size: 12px; line-height: 1.85; }

        .profile-grid { display: grid; grid-template-columns: minmax(0, .82fr) minmax(0, 1.18fr); gap: 48px; align-items: stretch; }
        .profile-card {
          min-height: 390px; position: relative; overflow: hidden; border: 1px solid var(--line);
          background: radial-gradient(ellipse at 50% 40%, rgba(20,107,130,.18), transparent 60%), #091118;
          display: flex; align-items: center; justify-content: center;
        }
        .profile-card::before { content: ''; position: absolute; inset: 13px; border: 1px solid rgba(104,232,255,.12); pointer-events: none; }
        .profile-card::after { content: ''; position: absolute; width: 240px; height: 240px; border: 1px dashed rgba(104,232,255,.2); border-radius: 50%; animation: orbit-spin 32s linear infinite; }
        .profile-placeholder { position: relative; z-index: 2; text-align: center; }
        .profile-placeholder .profile-initials {
          width: 155px; height: 155px; border-radius: 50%; display: grid; place-items: center;
          border: 1px solid rgba(104,232,255,.4); margin: 0 auto 22px;
          color: var(--cyan); font-size: 48px; font-weight: 600; letter-spacing: -5px;
          background: radial-gradient(circle at 35% 25%, rgba(104,232,255,.13), rgba(4,13,20,.9) 70%);
          box-shadow: 0 0 55px rgba(104,232,255,.08), inset 0 0 30px rgba(104,232,255,.04);
        }
        .profile-placeholder p { color: #9cabb4; font: 9px var(--mono); letter-spacing: 1.5px; }
        .profile-photo { width: 100%; height: 100%; min-height: 390px; object-fit: cover; position: absolute; inset: 0; z-index: 1; }
        .profile-photo-overlay { position: absolute; inset: 0; z-index: 2; background: linear-gradient(0deg, rgba(5,10,14,.82), transparent 65%); pointer-events: none; }
        .profile-photo-label { position: absolute; bottom: 32px; left: 30px; z-index: 3; font: 9px var(--mono); color: var(--cyan); letter-spacing: 1.4px; }
        .profile-photo-label strong { display: block; font: 22px 'Space Grotesk', sans-serif; color: white; letter-spacing: -.5px; margin-top: 7px; }
        .profile-details { padding: 12px 0; display: flex; flex-direction: column; justify-content: center; }
        .profile-details h3 { margin: 0; font-size: clamp(26px, 3vw, 39px); letter-spacing: -.055em; font-weight: 500; }
        .profile-role { color: var(--cyan); font: 10px var(--mono); letter-spacing: 1.4px; margin-top: 12px; }
        .profile-bio { max-width: 590px; color: #93a2ac; font-size: 13px; line-height: 1.95; margin: 25px 0; }
        .profile-facts { display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid var(--line); }
        .fact { padding: 18px 10px 18px 0; border-bottom: 1px solid var(--line); }
        .fact-label { color: #6f828e; font: 9px var(--mono); letter-spacing: 1.2px; }
        .fact-value { margin-top: 8px; color: #dce7ec; font-size: 12px; }

        .skills-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); border-top: 1px solid var(--line); border-left: 1px solid var(--line); }
        .skill-card { min-height: 185px; padding: 25px; border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); background: rgba(255,255,255,.012); transition: background .3s, transform .3s; }
        .skill-card:hover { background: rgba(104,232,255,.045); transform: translateY(-3px); }
        .skill-top { display: flex; justify-content: space-between; gap: 10px; font: 9px var(--mono); color: var(--orange); }
        .skill-status { color: #6c8994; }
        .skill-card h3 { font-size: 17px; font-weight: 500; letter-spacing: -.4px; margin: 34px 0 8px; }
        .skill-card p { color: var(--muted); font-size: 11px; margin: 0; }
        .skill-progress { margin-top: 23px; height: 2px; background: #17232c; overflow: hidden; }
        .skill-progress span { display: block; width: var(--progress, 55%); height: 100%; background: linear-gradient(90deg, var(--orange), var(--cyan)); }

        .projects-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 15px; }
        .project-card {
          min-width: 0; padding: 0; text-align: left; cursor: pointer; border: 1px solid var(--line);
          background: linear-gradient(145deg, rgba(15,27,36,.9), rgba(7,12,17,.96));
          transition: transform .3s, border-color .3s, box-shadow .3s; overflow: hidden;
        }
        .project-card:hover { transform: translateY(-7px); border-color: rgba(104,232,255,.55); box-shadow: 0 16px 45px rgba(0,0,0,.2); }
        .project-art { height: 210px; position: relative; overflow: hidden; display: grid; place-items: center; background: radial-gradient(circle at 50% 50%, rgba(31,117,139,.18), transparent 58%); border-bottom: 1px solid var(--line); }
        .project-art::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(104,232,255,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(104,232,255,.055) 1px, transparent 1px); background-size: 25px 25px; }
        .project-number { position: absolute; top: 17px; left: 17px; color: var(--orange); font: 10px var(--mono); }
        .project-open { position: absolute; top: 14px; right: 14px; width: 28px; height: 28px; display: grid; place-items: center; border: 1px solid var(--line); color: var(--cyan); font-size: 15px; }
        .project-symbol { position: relative; z-index: 1; width: 100px; height: 100px; display: grid; place-items: center; border: 1px solid rgba(104,232,255,.36); color: var(--cyan); font: 36px var(--mono); transform: rotate(45deg); transition: transform .5s; }
        .project-symbol span { transform: rotate(-45deg); }
        .project-card:hover .project-symbol { transform: rotate(135deg) scale(1.06); }
        .project-card:nth-child(2) .project-symbol { border-color: rgba(255,121,82,.45); color: var(--orange); border-radius: 50%; }
        .project-card:nth-child(3) .project-symbol { border-style: dashed; }
        .project-info { padding: 23px 22px 24px; }
        .project-category { color: #8195a1; font: 9px var(--mono); letter-spacing: 1px; }
        .project-info h3 { font-size: 21px; font-weight: 500; margin: 12px 0 9px; letter-spacing: -.6px; }
        .project-info p { color: var(--muted); font-size: 11px; line-height: 1.8; min-height: 40px; margin: 0; }
        .project-footer { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 22px; padding-top: 14px; border-top: 1px solid var(--line); }
        .project-status { font: 8px var(--mono); color: var(--cyan); letter-spacing: .8px; }
        .project-view { color: #8fa2ac; font: 9px var(--mono); }

        .timeline { border-top: 1px solid var(--line); }
        .timeline-item { display: grid; grid-template-columns: 100px 1fr 150px; gap: 25px; padding: 25px 0; border-bottom: 1px solid var(--line); align-items: start; }
        .timeline-number { color: var(--orange); font: 11px var(--mono); }
        .timeline-item h3 { font-size: 18px; font-weight: 500; margin: 0 0 7px; }
        .timeline-item p { font-size: 11px; line-height: 1.8; color: var(--muted); margin: 0; max-width: 520px; }
        .timeline-state { justify-self: end; font: 9px var(--mono); color: var(--cyan); letter-spacing: 1px; }

        .contact-panel { position: relative; padding: clamp(30px, 6vw, 72px); border: 1px solid rgba(104,232,255,.22); background: radial-gradient(ellipse at 100% 0%, rgba(21,103,128,.16), transparent 48%), #091117; overflow: hidden; }
        .contact-panel::after { content: 'TH'; position: absolute; right: -15px; bottom: -100px; color: rgba(104,232,255,.035); font-size: clamp(180px, 27vw, 340px); font-weight: 700; letter-spacing: -.12em; pointer-events: none; }
        .contact-panel h2 { max-width: 730px; font-size: clamp(38px, 6.8vw, 82px); line-height: 1.02; letter-spacing: -.075em; font-weight: 500; margin: 24px 0; position: relative; z-index: 1; }
        .contact-panel h2 span { color: var(--cyan); }
        .contact-panel > p { max-width: 480px; color: var(--muted); font-size: 13px; line-height: 1.9; position: relative; z-index: 1; }
        .contact-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 30px; position: relative; z-index: 1; }
        .contact-email { display: flex; flex-wrap: wrap; gap: 14px; align-items: center; margin-top: 28px; color: #a4b7c0; font: 11px var(--mono); position: relative; z-index: 1; }
        .contact-email button { border: 0; border-bottom: 1px solid rgba(104,232,255,.4); background: transparent; color: var(--cyan); font: 9px var(--mono); padding: 4px 0; cursor: pointer; }

        .footer { max-width: 1400px; margin: 0 auto; padding: 28px 5.5%; display: flex; justify-content: space-between; gap: 20px; align-items: center; border-top: 1px solid var(--line); color: #758793; font: 9px var(--mono); letter-spacing: .6px; }
        .footer strong { color: #d5e3e9; font-weight: 400; }
        .footer-right { display: flex; gap: 20px; flex-wrap: wrap; }

        .project-modal-backdrop { position: fixed; inset: 0; z-index: 120; display: grid; place-items: center; padding: 20px; background: rgba(2,5,8,.82); backdrop-filter: blur(12px); }
        .project-modal { width: min(580px, 100%); position: relative; border: 1px solid rgba(104,232,255,.35); background: #091118; padding: clamp(24px, 5vw, 42px); box-shadow: 0 25px 100px rgba(0,0,0,.5); animation: modal-edge-glow 3s ease-in-out infinite; }
        .modal-close { position: absolute; top: 16px; right: 16px; width: 34px; height: 34px; border: 1px solid var(--line); background: transparent; cursor: pointer; color: var(--cyan); font-size: 18px; }
        .modal-number { font: 10px var(--mono); color: var(--orange); letter-spacing: 1.5px; }
        .project-modal h2 { font-size: clamp(28px, 5vw, 42px); font-weight: 500; letter-spacing: -.06em; margin: 18px 0 12px; }
        .project-modal > p { font-size: 13px; line-height: 1.9; color: #9aabb5; }
        .modal-tags { display: flex; gap: 8px; flex-wrap: wrap; margin: 22px 0 30px; }
        .modal-tags span { border: 1px solid var(--line); padding: 8px 10px; color: var(--cyan); font: 9px var(--mono); }
        .modal-note { color: #71848f; font: 9px var(--mono); line-height: 1.8; }

        .boot-screen { position: fixed; inset: 0; z-index: 200; display: grid; place-items: center; background: #05080c; }
        .boot-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(104,232,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(104,232,255,.06) 1px, transparent 1px); background-size: 48px 48px; mask-image: radial-gradient(ellipse, black, transparent 75%); }
        .boot-content { width: min(340px, calc(100% - 48px)); position: relative; }
        .boot-logo { font-size: 68px; font-weight: 700; letter-spacing: -8px; color: #eaf3f8; }
        .boot-logo span { color: var(--cyan); }
        .boot-kicker { margin-top: 14px; color: #7f9aa7; font: 9px var(--mono); letter-spacing: 2px; }
        .boot-title { margin-top: 48px; font: 13px var(--mono); letter-spacing: 2px; color: #e3eef2; }
        .boot-title span { color: var(--orange); animation: blink .7s steps(2) infinite; }
        .boot-progress { height: 2px; margin-top: 15px; background: #18252d; }
        .boot-progress > div { height: 100%; background: linear-gradient(90deg, var(--orange), var(--cyan)); box-shadow: 0 0 14px rgba(104,232,255,.6); }
        .boot-bottom { display: flex; justify-content: space-between; margin-top: 10px; color: #71858f; font: 9px var(--mono); }
        .boot-bottom span:last-child { color: var(--cyan); }
        .boot-corner { position: absolute; bottom: 24px; right: 26px; color: #61727c; font: 9px var(--mono); letter-spacing: 1px; }

        @keyframes status-pulse { 0%,100% { opacity: 1; } 50% { opacity: .35; } }
        @keyframes equalizer { from { transform: scaleY(.3); opacity: .35; } to { transform: scaleY(1); opacity: .9; } }
        @keyframes glow-breathe { 0%,100% { opacity: .55; transform: scale(.92); } 50% { opacity: 1; transform: scale(1.07); } }
        @keyframes orbit-spin { to { transform: rotate(360deg); } }
        @keyframes ticker-scroll { to { transform: translateX(-50%); } }
        @keyframes blink { to { opacity: 0; } }
        @keyframes modal-edge-glow { 0%,100% { box-shadow: 0 25px 100px rgba(0,0,0,.5), 0 0 0 rgba(104,232,255,0); } 50% { box-shadow: 0 25px 100px rgba(0,0,0,.5), 0 0 28px rgba(104,232,255,.07); } }

        @media (min-width: 1500px) {
          .hero h1 { font-size: 90px; }
        }
        @media (max-width: 1000px) {
          .top-status { display: none; }
          .hero { grid-template-columns: minmax(0, 1fr) minmax(270px, .85fr); gap: 18px; }
          .hero h1 { font-size: clamp(42px, 6vw, 68px); }
          .hero-visual { height: 430px; min-height: 350px; }
          .skills-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .profile-grid { gap: 30px; }
          .project-art { height: 175px; }
          .project-info { padding: 19px 17px; }
        }
        @media (max-width: 720px) {
          .topbar { height: 68px; padding: 0 5%; }
          .top-nav { display: none; }
          .menu-toggle { display: block; }
          .mobile-nav { display: flex; flex-direction: column; gap: 2px; padding: 8px 5% 15px; position: relative; z-index: 59; background: rgba(6,9,13,.97); border-bottom: 1px solid var(--line); }
          .mobile-nav button { text-align: left; padding: 12px 0; }
          .brand-sub { font-size: 8px; }
          .sound-engine-button { padding: 8px; gap: 5px; }
          .sound-engine-button > span:nth-child(2) { font-size: 8px; }
          .advanced-hud { padding: 15px 5% 0; }
          .hud-side { min-width: 0; }
          .hud-right .hud-label:last-child { display: none; }
          .hud-reticle { width: 30px; height: 30px; }
          .hero { display: flex; flex-direction: column; align-items: stretch; gap: 10px; padding: 62px 5% 75px; min-height: auto; }
          .hero-copy { padding: 0; }
          .eyebrow { margin-bottom: 23px; font-size: 9px; }
          .hero h1 { font-size: clamp(43px, 11.2vw, 76px); line-height: 1.02; letter-spacing: -.07em; }
          .hero-description { font-size: 13px; margin-top: 21px; }
          .hero-actions { margin-top: 25px; }
          .hero-meta { margin-top: 30px; gap: 18px; }
          .hero-visual { width: 100%; height: min(96vw, 430px); min-height: 300px; margin-top: 10px; }
          .scroll-hint { left: 5%; bottom: 20px; }
          .content-section { padding: 76px 5%; }
          .section-heading-row { flex-direction: column; align-items: flex-start; gap: 15px; margin-bottom: 30px; }
          .section-intro { max-width: 500px; }
          .profile-grid { grid-template-columns: 1fr; gap: 28px; }
          .profile-card { min-height: 340px; }
          .profile-photo { min-height: 340px; }
          .profile-placeholder .profile-initials { width: 130px; height: 130px; font-size: 40px; }
          .skills-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .skill-card { min-height: 165px; padding: 18px 15px; }
          .skill-card h3 { font-size: 15px; margin-top: 28px; }
          .projects-grid { grid-template-columns: 1fr; gap: 14px; }
          .project-art { height: 205px; }
          .project-info p { min-height: 0; }
          .timeline-item { grid-template-columns: 38px 1fr; gap: 12px; }
          .timeline-state { grid-column: 2; justify-self: start; }
          .contact-panel { padding: 30px 22px; }
          .contact-panel h2 { font-size: clamp(39px, 10vw, 65px); }
          .footer { padding: 23px 5%; align-items: flex-start; flex-direction: column; }
        }
        @media (max-width: 390px) {
          .brand-name { font-size: 10px; letter-spacing: 1.4px; }
          .brand-mark { width: 32px; height: 32px; }
          .brand { gap: 8px; }
          .top-right { gap: 8px; }
          .sound-engine-button > span:nth-child(2) { display: none; }
          .hero h1 { font-size: 42px; }
          .hero-meta { gap: 13px; }
          .meta-label { font-size: 7px; }
          .meta-value { font-size: 10px; }
          .hud-label { font-size: 7px; }
          .hud-message { font-size: 7px; }
          .skills-grid { grid-template-columns: 1fr; }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
        }
          
.rating-section {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 5.5% 100px;
}

.rating-panel {
  position: relative;
  overflow: hidden;
  padding: clamp(28px, 5vw, 60px);
  text-align: center;
  border: 1px solid rgba(104, 232, 255, 0.22);
  background:
    radial-gradient(ellipse at 50% 0%, rgba(22, 115, 145, 0.15), transparent 65%),
    #081017;
}

.rating-orbit {
  position: absolute;
  width: 280px;
  height: 280px;
  left: 50%;
  top: 50%;
  border: 1px solid rgba(104, 232, 255, 0.07);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  animation: orbit-spin 35s linear infinite;
}

.rating-panel .section-label {
  justify-content: center;
  position: relative;
}

.rating-panel h2 {
  position: relative;
  margin: 25px 0 12px;
  font-size: clamp(30px, 5.5vw, 58px);
  font-weight: 500;
  letter-spacing: -0.065em;
}

.rating-panel h2 span {
  color: var(--cyan);
}

.rating-description {
  position: relative;
  max-width: 450px;
  margin: 0 auto;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.8;
}

.rating-stars {
  position: relative;
  display: flex;
  justify-content: center;
  gap: clamp(5px, 2vw, 16px);
  margin: 28px 0 12px;
}

.rating-star {
  border: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.025);
  width: clamp(42px, 8vw, 62px);
  height: clamp(42px, 8vw, 62px);
  color: #52636e;
  font-size: clamp(23px, 4vw, 32px);
  cursor: pointer;
  transition:
    color 0.2s,
    background 0.2s,
    border-color 0.2s,
    transform 0.2s,
    box-shadow 0.2s;
}

.rating-star:hover {
  transform: translateY(-4px) scale(1.05);
}

.rating-star.star-active {
  color: var(--cyan);
  background: rgba(104, 232, 255, 0.09);
  border-color: rgba(104, 232, 255, 0.5);
  text-shadow: 0 0 18px rgba(104, 232, 255, 0.65);
  box-shadow: inset 0 0 18px rgba(104, 232, 255, 0.04);
}

.rating-caption {
  position: relative;
  min-height: 16px;
  margin: 16px 0 23px;
  color: var(--orange);
  font: 9px var(--mono);
  letter-spacing: 1.5px;
}

.rating-submit {
  position: relative;
  min-height: 45px;
  padding: 0 24px;
  border: 1px solid var(--cyan);
  background: var(--cyan);
  color: #061016;
  font: 10px var(--mono);
  letter-spacing: 1px;
  cursor: pointer;
  transition: transform 0.2s, background 0.2s;
}

.rating-submit:hover:not(:disabled) {
  transform: translateY(-3px);
  background: #b4f6ff;
}

.rating-submit:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.rating-footnote {
  position: relative;
  margin-top: 20px;
  color: #71858f;
  font: 8px var(--mono);
  letter-spacing: 0.7px;
}

@media (max-width: 720px) {
  .rating-section {
    padding: 0 5% 75px;
  }

  .rating-panel {
    padding: 30px 16px;
  }
}

/* ===== FUTURISTIC NEON CURSOR ===== */
.custom-cursor {
  position: fixed;
  left: -100px;
  top: -100px;
  width: 34px;
  height: 34px;
  border: 1px solid rgba(104, 232, 255, 0.9);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 99999;
  box-shadow:
    0 0 10px rgba(104, 232, 255, 0.25),
    inset 0 0 10px rgba(104, 232, 255, 0.08);
  transition:
    width 0.18s ease,
    height 0.18s ease,
    border-color 0.18s ease,
    box-shadow 0.18s ease;
}

.custom-cursor-dot {
  position: absolute;
  width: 5px;
  height: 5px;
  left: 50%;
  top: 50%;
  border-radius: 50%;
  background: #68e8ff;
  box-shadow: 0 0 12px #68e8ff;
  transform: translate(-50%, -50%);
}



@media (hover: none), (pointer: coarse) {
  .custom-cursor {
    display: none;
  }
}





      `}</style>

      <AnimatePresence>
        {!bootComplete && <CinematicLoader onComplete={finishBoot} />}
      </AnimatePresence>

      <div className="portfolio-shell">
        <div className="grid-background" aria-hidden="true" />
        <div className="scroll-meter" style={{ width: `${scrollProgress}%` }} />

        <header className="topbar">
          <a
            className="brand"
            href="#home"
            onClick={() => playUiSound(450)}
            aria-label="Back to home"
          >
            <span className="brand-mark">TH.</span>
            <span>
              <span className="brand-name">TAQDIRUL HASSAN</span>
              <span className="brand-sub">MECHANICAL ENGINEERING</span>
            </span>
          </a>

          <nav className="top-nav" aria-label="Main navigation">
            <button onClick={() => navigateTo("home")}>HOME / 00</button>
            <button onClick={() => navigateTo("profile")}>PROFILE / 01</button>
            <button onClick={() => navigateTo("skills")}>SKILLS / 02</button>
            <button onClick={() => navigateTo("projects")}>
              PROJECTS / 03
            </button>
            <button onClick={() => navigateTo("contact")}>CONTACT / 04</button>
          </nav>

          <div className="top-right">
            <SoundEngineButton enabled={soundOn} onToggle={toggleSound} />
            <div className="top-status">
              <span className="status-dot" /> SYSTEM ONLINE
            </div>
            <button
              className="menu-toggle"
              onClick={() => setMenuOpen((value) => !value)}
              aria-expanded={menuOpen}
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? "CLOSE −" : "MENU +"}
            </button>
          </div>
        </header>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              className="mobile-nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              aria-label="Mobile navigation"
            >
              <button onClick={() => navigateTo("home")}>HOME / 00</button>
              <button onClick={() => navigateTo("profile")}>
                PROFILE / 01
              </button>
              <button onClick={() => navigateTo("skills")}>SKILLS / 02</button>
              <button onClick={() => navigateTo("projects")}>
                PROJECTS / 03
              </button>
              <button onClick={() => navigateTo("contact")}>
                CONTACT / 04
              </button>
            </motion.nav>
          )}
        </AnimatePresence>

        <SystemHUD />

        <main>
          <section className="hero" id="home">
            <motion.div
              className="hero-copy"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <div className="eyebrow">
                <span className="eyebrow-line" />
                MECHANICAL ENGINEERING STUDENT
              </div>

              <h1>
                <span className="muted-line">ENGINEERING</span>
                <span>THE NEXT</span>
                <span className="highlight-line">
                  FRONTIER<span style={{ color: "var(--orange)" }}>.</span>
                </span>
              </h1>

              <p className="hero-description">
                Exploring the intersection of{" "}
                <strong>mechanical engineering</strong>, emerging technology and
                digital creativity. Learning, building and turning ambitious
                ideas into real projects.
              </p>

              <div className="hero-actions">
                <button
                  className="button-primary magnetic"
                  onClick={() => navigateTo("projects")}
                >
                  EXPLORE MY WORK <span className="button-arrow">↗</span>
                </button>
                <button
                  className="button-secondary"
                  onClick={() => navigateTo("profile")}
                >
                  DISCOVER MY PROFILE <span className="button-arrow">↓</span>
                </button>
              </div>

              <div className="hero-meta">
                <div className="meta-item">
                  <span className="meta-label">LOCAL TIME / DHAKA</span>
                  <span className="meta-value">{clock} UTC+06</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">CURRENT MISSION</span>
                  <span className="meta-value">LEARN → DESIGN → BUILD</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">PORTFOLIO VERSION</span>
                  <span className="meta-value">V. 03 / 2026</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="hero-visual"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.25 }}
              aria-label="Interactive 3D reactor visualization"
            >
              <div className="reactor-glow" />
              <div className="reactor-orbit" />
              <div className="visual-scanline" />
              <div className="visual-corner top-left">
                FIG. 001<strong>CORE / X-01</strong>
              </div>
              <div className="visual-corner top-right">
                INTERACTIVE<strong>3D ENGINE</strong>
              </div>
              <div className="visual-corner bottom-left">
                ROTATION: ACTIVE<strong>FIELD ONLINE</strong>
              </div>
              <div className="visual-corner bottom-right">
                TH SYSTEM<strong>EST. 2026</strong>
              </div>
              <Canvas
                className="reactor-canvas"
                camera={{ position: [0, 0, 5.6], fov: 42 }}
                dpr={[1, 1.7]}
                gl={{ antialias: true, alpha: true }}
              >
                <Reactor />
              </Canvas>
            </motion.div>

            <div className="scroll-hint">
              <span /> SCROLL TO EXPLORE
            </div>
          </section>

          <div className="ticker" aria-label="Areas of interest">
            <div className="ticker-track">
              {[0, 1].map((copy) => (
                <div className="ticker-item" key={copy}>
                  <span>MECHANICAL ENGINEERING</span>
                  <i />
                  <span>COMPUTER-AIDED DESIGN</span>
                  <i />
                  <span>CNC TECHNOLOGY</span>
                  <i />
                  <span>3D VISUALIZATION</span>
                  <i />
                  <span>THERMAL SYSTEMS</span>
                  <i />
                  <span>CREATIVE DEVELOPMENT</span>
                  <i />
                </div>
              ))}
            </div>
          </div>

          <section className="content-section" id="profile">
            <SectionLabel number="01">PERSONAL PROFILE</SectionLabel>
            <div className="section-heading-row">
              <h2 className="section-heading">
                THE MIND
                <br />
                <em>BEHIND THE MACHINE.</em>
              </h2>
              <p className="section-intro">
                An engineering student driven by curiosity, practical learning
                and the challenge of creating something better with every
                iteration.
              </p>
            </div>

            <div className="profile-grid">
              <motion.div
                className="profile-card"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65 }}
              >
                <img
                  className="profile-photo"
                  src="/prangon25.jpg"
                  alt="Taqdirul Hassan"
                />
                <div className="profile-photo-overlay" />
                <div className="profile-photo-label">
                  ENGINEER IN PROGRESS
                  <strong>TAQDIRUL HASSAN</strong>
                </div>
              </motion.div>

              <motion.div
                className="profile-details"
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65 }}
              >
                <h3>Taqdirul Hassan</h3>
                <div className="profile-role">
                  MECHANICAL ENGINEERING STUDENT
                </div>
                <p className="profile-bio">
                  I am building my foundation in mechanical engineering while
                  exploring CAD, CNC technology, thermal systems and digital
                  experiences. This portfolio documents my learning journey,
                  experiments and projects as I progress toward becoming a
                  capable engineer.
                </p>

                <div className="profile-facts">
                  <div className="fact">
                    <div className="fact-label">DISCIPLINE</div>
                    <div className="fact-value">Mechanical Engineering</div>
                  </div>
                  <div className="fact">
                    <div className="fact-label">CURRENT FOCUS</div>
                    <div className="fact-value">
                      Skills & Practical Learning
                    </div>
                  </div>
                  <div className="fact">
                    <div className="fact-label">INTERESTS</div>
                    <div className="fact-value">CAD · CNC · 3D Design</div>
                  </div>
                  <div className="fact">
                    <div className="fact-label">MINDSET</div>
                    <div className="fact-value">Learn by Building</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          <section className="content-section" id="skills">
            <SectionLabel number="02">SKILLS & DEVELOPMENT</SectionLabel>
            <div className="section-heading-row">
              <h2 className="section-heading">
                BUILT THROUGH
                <br />
                <em>CONTINUOUS LEARNING.</em>
              </h2>
              <p className="section-intro">
                These are my current learning areas, not a claim of professional
                mastery. The goal is to turn each topic into practical
                experience.
              </p>
            </div>

            <div className="skills-grid">
              {skills.map((skill, index) => (
                <motion.article
                  className="skill-card"
                  key={skill.number}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                >
                  <div className="skill-top">
                    <span>{skill.number} / MODULE</span>
                    <span className="skill-status">{skill.level}</span>
                  </div>
                  <h3>{skill.title}</h3>
                  <p>{skill.detail}</p>
                  <div className="skill-progress">
                    <span
                      style={
                        {
                          "--progress": `${38 + index * 7}%`,
                        } as React.CSSProperties
                      }
                    />
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="content-section" id="projects">
            <SectionLabel number="03">SELECTED PROJECTS</SectionLabel>
            <div className="section-heading-row">
              <h2 className="section-heading">
                IDEAS INTO
                <br />
                <em>ENGINEERED EXPERIENCES.</em>
              </h2>
              <p className="section-intro">
                Explore current work and planned engineering experiments. Select
                any card to view its details.
              </p>
            </div>

            <div className="projects-grid">
              {projects.map((project, index) => (
                <motion.button
                  type="button"
                  className="project-card"
                  key={project.id}
                  onClick={() => {
                    playUiSound(720);
                    setActiveProject(project);
                  }}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{ duration: 0.5, delay: index * 0.09 }}
                  whileTap={{ scale: 0.985 }}
                >
                  <div className="project-art">
                    <span className="project-number">
                      PROJECT / {project.number}
                    </span>
                    <span className="project-open">↗</span>
                    <div className="project-symbol">
                      <span>
                        {index === 0 ? "TH" : index === 1 ? "◇" : "G"}
                      </span>
                    </div>
                  </div>
                  <div className="project-info">
                    <div className="project-category">{project.category}</div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-footer">
                      <span className="project-status">{project.status}</span>
                      <span className="project-view">VIEW DETAILS ↗</span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </section>

          <section className="content-section" id="journey">
            <SectionLabel number="04">ENGINEERING ROADMAP</SectionLabel>
            <div className="section-heading-row">
              <h2 className="section-heading">
                THE NEXT
                <br />
                <em>ITERATION.</em>
              </h2>
              <p className="section-intro">
                A roadmap for steadily building real skills, documenting
                progress and turning learning into practical work.
              </p>
            </div>

            <div className="timeline">
              <motion.div
                className="timeline-item"
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="timeline-number">PHASE / 01</div>
                <div>
                  <h3>Build the Fundamentals</h3>
                  <p>
                    Strengthen core mechanical engineering subjects, technical
                    drawing and problem-solving skills.
                  </p>
                </div>
                <div className="timeline-state">IN PROGRESS</div>
              </motion.div>
              <motion.div
                className="timeline-item"
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="timeline-number">PHASE / 02</div>
                <div>
                  <h3>Develop Practical Projects</h3>
                  <p>
                    Apply learning through CAD practice, CNC concepts,
                    documentation and small engineering projects.
                  </p>
                </div>
                <div className="timeline-state">UP NEXT</div>
              </motion.div>
              <motion.div
                className="timeline-item"
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="timeline-number">PHASE / 03</div>
                <div>
                  <h3>Industry Experience</h3>
                  <p>
                    Work toward internships, workshops, professional
                    collaboration and a stronger technical portfolio.
                  </p>
                </div>
                <div className="timeline-state">FUTURE GOAL</div>
              </motion.div>
            </div>
          </section>

          <section className="content-section" id="contact">
            <div className="contact-panel">
              <SectionLabel number="05">OPEN CHANNEL</SectionLabel>
              <h2>
                HAVE AN IDEA?
                <br />
                <span>LET'S BUILD IT.</span>
              </h2>
              <p>
                Interested in engineering, technology, creative projects or
                learning together? Send me a message and let's start a
                conversation.
              </p>
              <div className="contact-actions">
                <a
                  className="button-primary"
                  href="mailto:taqdirulhassan12@gmail.com"
                  onClick={() => playUiSound(620)}
                >
                  SEND AN EMAIL <span className="button-arrow">↗</span>
                </a>
                <button
                  className="button-secondary magnetic"
                  onClick={copyEmail}
                >
                  {copied ? "EMAIL COPIED ✓" : "COPY EMAIL ADDRESS"}
                </button>
              </div>
              <div className="contact-email">
                <span>taqdirulhassan12@gmail.com</span>
                <span>·</span>
                <span>RESPONSE CHANNEL / EMAIL</span>
              </div>
            </div>
          </section>
          <RatingWidget />
        </main>

        <footer className="footer">
          <div>
            © 2026 <strong>TAQDIRUL HASSAN</strong> · BUILT WITH CURIOSITY.
          </div>
          <div className="footer-right">
            <span>MECHANICAL ENGINEERING</span>
            <span>TH / 001</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              style={{
                border: 0,
                background: "transparent",
                color: "var(--cyan)",
                cursor: "pointer",
                font: "inherit",
              }}
            >
              BACK TO TOP ↑
            </button>
          </div>
        </footer>

        <AnimatePresence>
          {activeProject && (
            <motion.div
              className="project-modal-backdrop"
              role="presentation"
              onClick={() => setActiveProject(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="project-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="project-modal-title"
                onClick={(event) => event.stopPropagation()}
                initial={{ opacity: 0, y: 25, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.98 }}
                transition={{ duration: 0.25 }}
              >
                <button
                  className="modal-close"
                  aria-label="Close project details"
                  onClick={() => setActiveProject(null)}
                >
                  ×
                </button>
                <div className="modal-number">
                  PROJECT / {activeProject.number} — {activeProject.category}
                </div>
                <h2 id="project-modal-title">{activeProject.title}</h2>
                <p>{activeProject.description}</p>
                <div className="modal-tags">
                  {activeProject.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="modal-note">
                  STATUS: {activeProject.status}
                  <br />
                  PROJECT DETAILS WILL GROW AS THE WORK PROGRESSES.
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default function App() {
  return <Interface />;
}

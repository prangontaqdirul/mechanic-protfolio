import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, Stars, OrbitControls } from "@react-three/drei";
import { motion, useMotionValue, useSpring } from "motion/react";
import * as THREE from "three";

const skills = [
  { name: "Mechanical Design", level: 86, code: "SYS.01" },
  { name: "AutoCAD 2D", level: 78, code: "SYS.02" },
  { name: "CNC Programming", level: 65, code: "SYS.03" },
  { name: "HTML / CSS", level: 82, code: "SYS.04" },
  { name: "Problem Solving", level: 90, code: "SYS.05" },
  { name: "Engineering Analysis", level: 74, code: "SYS.06" },
];

const projects = [
  {
    id: "PRJ-001",
    title: "Mechanical Portfolio",
    type: "DIGITAL EXPERIENCE",
    description:
      "An interactive engineering portfolio combining futuristic interface design, motion graphics and a 3D visual environment.",
    status: "ONLINE",
    number: "01",
  },
  {
    id: "PRJ-002",
    title: "CNC Learning Lab",
    type: "MANUFACTURING",
    description:
      "A learning concept focused on G-code, M-code, machine operations and precision manufacturing workflows.",
    status: "IN DEVELOPMENT",
    number: "02",
  },
  {
    id: "PRJ-003",
    title: "Engineering Concepts",
    type: "MECHANICAL SYSTEMS",
    description:
      "A growing collection of mechanical design ideas, CAD experiments and practical engineering concepts.",
    status: "RESEARCH",
    number: "03",
  },
];

function Reactor() {
  const core = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const ringC = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (core.current) {
      core.current.rotation.x += delta * 0.22;
      core.current.rotation.y += delta * 0.45;
      core.current.rotation.z += delta * 0.12;
    }
    if (ringA.current) {
      ringA.current.rotation.x += delta * 0.3;
      ringA.current.rotation.y += delta * 0.22;
    }
    if (ringB.current) {
      ringB.current.rotation.x -= delta * 0.18;
      ringB.current.rotation.y += delta * 0.32;
    }
    if (ringC.current) {
      ringC.current.rotation.z += delta * 0.25;
      ringC.current.rotation.x += delta * 0.12;
    }
    state.camera.position.x = THREE.MathUtils.damp(
      state.camera.position.x,
      state.pointer.x * 0.35,
      2,
      delta,
    );
    state.camera.position.y = THREE.MathUtils.damp(
      state.camera.position.y,
      state.pointer.y * 0.25,
      2,
      delta,
    );
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 3]} intensity={18} color="#00f5ff" />
      <pointLight position={[-3, -2, -2]} intensity={12} color="#7c3cff" />
      <pointLight position={[0, 0, 2]} intensity={7} color="#ffffff" />

      <Float speed={1.5} rotationIntensity={0.35} floatIntensity={0.55}>
        <mesh ref={core}>
          <icosahedronGeometry args={[0.9, 2]} />
          <meshStandardMaterial
            color="#071b32"
            emissive="#00d9ff"
            emissiveIntensity={1.5}
            metalness={0.9}
            roughness={0.16}
            wireframe
          />
        </mesh>

        <mesh scale={0.58}>
          <icosahedronGeometry args={[1, 2]} />
          <meshStandardMaterial
            color="#00eaff"
            emissive="#00cfff"
            emissiveIntensity={2.8}
            metalness={0.8}
            roughness={0.15}
          />
        </mesh>

        <mesh ref={ringA} rotation={[0.7, 0.2, 0.4]}>
          <torusGeometry args={[1.35, 0.014, 12, 120]} />
          <meshBasicMaterial color="#00eeff" />
        </mesh>

        <mesh ref={ringB} rotation={[1.2, 0.6, 0.1]}>
          <torusGeometry args={[1.58, 0.009, 12, 120]} />
          <meshBasicMaterial color="#9b65ff" />
        </mesh>

        <mesh ref={ringC} rotation={[0.3, 1.1, 0.8]}>
          <torusGeometry args={[1.82, 0.006, 8, 120]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.65} />
        </mesh>

        <mesh position={[1.35, 0.55, 0]}>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[-1.4, -0.35, 0.3]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshBasicMaterial color="#00f5ff" />
        </mesh>
      </Float>

      <Sparkles count={90} scale={4.5} size={2} speed={0.35} color="#00eaff" />
      <Stars radius={35} depth={18} count={450} factor={2} fade />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.4}
      />
    </>
  );
}

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const duration = 1800;
    const timer = window.setInterval(() => {
      const value = Math.min(
        100,
        Math.round(((Date.now() - start) / duration) * 100),
      );
      setProgress(value);
      if (value >= 100) {
        window.clearInterval(timer);
        window.setTimeout(onComplete, 350);
      }
    }, 25);

    return () => window.clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="loading-screen"
      exit={{ opacity: 0, scale: 1.04, filter: "blur(12px)" }}
      transition={{ duration: 0.6 }}
    >
      <div className="loader-logo">
        TH<span>.</span>
      </div>
      <div className="loader-eyebrow">PERSONAL SYSTEM INITIALIZATION</div>
      <div className="loader-track">
        <motion.div
          className="loader-fill"
          animate={{ width: `${progress}%` }}
        />
      </div>
      <div className="loader-meta">
        <span>LOADING INTERFACE</span>
        <span>{progress}%</span>
      </div>
      <div className="loader-coordinates">23°41' N / 89°22' E</div>
    </motion.div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [clock, setClock] = useState("--:--:--");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const [copied, setCopied] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, { stiffness: 110, damping: 20 });
  const smoothY = useSpring(cursorY, { stiffness: 110, damping: 20 });

  const email = "taqdirulhassan12@gmail.com";

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
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMouse = (event: MouseEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      setMouseX((event.clientX / window.innerWidth - 0.5) * 2);
      setMouseY((event.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", onMouse);
    return () => window.removeEventListener("mousemove", onMouse);
  }, [cursorX, cursorY]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    document.querySelectorAll(".reveal").forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [loading]);

  const closeLoader = () => setLoading(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="portfolio-shell">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

        :root {
          --bg:#05070c; --panel:#0a101b; --cyan:#00eaff;
          --purple:#9b5cff; --white:#eaf7ff; --muted:#8493a7;
          --line:rgba(0,234,255,.17);
        }
        *{box-sizing:border-box}
        html{scroll-behavior:smooth;scroll-padding-top:90px}
        body{margin:0;background:var(--bg);color:var(--white);font-family:'Space Grotesk',sans-serif}
        body::selection{background:var(--cyan);color:#000}
        button,a{font:inherit}
        button{cursor:pointer}
        a{color:inherit;text-decoration:none}
        .portfolio-shell{min-height:100vh;overflow:hidden;position:relative;background:
          radial-gradient(ellipse at 75% 8%,rgba(0,130,190,.12),transparent 35%),
          radial-gradient(ellipse at 10% 40%,rgba(96,43,170,.09),transparent 35%),#05070c}
        .portfolio-shell:before{content:"";position:fixed;inset:0;pointer-events:none;z-index:2;opacity:.11;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.2'/%3E%3C/svg%3E")}
        .grid-bg{position:fixed;inset:0;z-index:0;pointer-events:none;background-image:linear-gradient(rgba(0,234,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(0,234,255,.045) 1px,transparent 1px);background-size:54px 54px;mask-image:linear-gradient(to bottom,black,transparent 85%);animation:grid-drift 24s linear infinite}
        @keyframes grid-drift{to{background-position:54px 54px}}
        .scanline{position:fixed;left:0;right:0;top:-30%;height:20%;z-index:3;pointer-events:none;background:linear-gradient(transparent,rgba(0,234,255,.035),transparent);animation:scan 10s linear infinite}
        @keyframes scan{to{top:120%}}
        .loading-screen{position:fixed;inset:0;z-index:1000;background:#05070c;display:flex;align-items:center;justify-content:center;flex-direction:column;padding:24px}
        .loader-logo{font:900 68px Orbitron;color:white;letter-spacing:-5px;text-shadow:0 0 30px #00eaff66}
        .loader-logo span{color:var(--cyan)}
        .loader-eyebrow,.loader-meta,.loader-coordinates{font:10px Orbitron;letter-spacing:2px;color:var(--muted)}
        .loader-eyebrow{margin-top:24px}
        .loader-track{width:min(330px,80vw);height:2px;background:#172536;margin-top:24px;overflow:hidden}
        .loader-fill{height:100%;background:var(--cyan);box-shadow:0 0 16px var(--cyan)}
        .loader-meta{width:min(330px,80vw);display:flex;justify-content:space-between;margin-top:12px;font-size:9px}
        .loader-coordinates{position:absolute;bottom:30px;font-size:9px}
        .top-progress{position:fixed;z-index:101;top:0;left:0;height:2px;background:var(--cyan);box-shadow:0 0 12px var(--cyan)}
        .navbar{height:78px;position:fixed;z-index:100;top:0;left:0;right:0;padding:0 7%;display:flex;align-items:center;justify-content:space-between;background:rgba(5,7,12,.75);backdrop-filter:blur(18px);border-bottom:1px solid rgba(0,234,255,.1)}
        .brand{font:800 22px Orbitron;letter-spacing:-1px}
        .brand span{color:var(--cyan)}
        .brand small{font:9px Orbitron;color:var(--muted);letter-spacing:2px;display:block;margin-top:4px}
        .nav-links{display:flex;gap:30px;align-items:center}
        .nav-links button,.mobile-nav button{background:none;border:0;color:#a7b5c5;font-size:12px;transition:.25s}
        .nav-links button:hover,.mobile-nav button:hover{color:var(--cyan);text-shadow:0 0 12px #00eaff77}
        .nav-contact{border:1px solid var(--line)!important;padding:11px 17px!important;color:var(--cyan)!important}
        .menu-toggle{display:none;background:none;border:1px solid var(--line);color:var(--cyan);padding:8px 12px}
        .mobile-nav{position:absolute;top:78px;left:0;right:0;padding:18px 7%;background:rgba(5,7,12,.97);border-bottom:1px solid var(--line);display:flex;flex-direction:column;gap:18px}
        .mobile-nav button{text-align:left}
        .status-strip{position:fixed;z-index:80;left:20px;top:45%;writing-mode:vertical-rl;transform:rotate(180deg);font:9px Orbitron;letter-spacing:2px;color:#647589;display:flex;align-items:center;gap:10px}
        .status-dot{width:6px;height:6px;border-radius:50%;background:#00ffad;box-shadow:0 0 12px #00ffad;display:inline-block}
        .side-index{position:fixed;z-index:80;right:20px;top:45%;writing-mode:vertical-rl;font:9px Orbitron;letter-spacing:2px;color:#647589}
        .hero{min-height:100vh;position:relative;z-index:1;padding:140px 10% 75px;display:grid;grid-template-columns:1.1fr .9fr;align-items:center;gap:30px}
        .hero-copy{position:relative;z-index:4}
        .eyebrow{font:10px Orbitron;letter-spacing:3px;color:var(--cyan);display:flex;align-items:center;gap:12px;margin-bottom:25px}
        .eyebrow:before{content:"";width:30px;height:1px;background:var(--cyan);box-shadow:0 0 10px var(--cyan)}
        .hero h1{font:800 clamp(44px,7.2vw,94px)/.99 Orbitron;letter-spacing:-5px;margin:0;max-width:800px}
        .hero h1 .line{display:block}
        .hero h1 .outline{color:transparent;-webkit-text-stroke:1px var(--cyan);text-shadow:0 0 35px #00eaff15}
        .hero h1 .glow{color:var(--cyan);text-shadow:0 0 30px #00eaff55,0 0 80px #00eaff22}
        .hero-desc{font-size:15px;line-height:1.9;color:#91a1b4;max-width:510px;margin:28px 0 30px}
        .hero-desc strong{color:#eaf7ff;font-weight:500}
        .hero-actions{display:flex;gap:13px;flex-wrap:wrap}
        .btn{position:relative;overflow:hidden;border:1px solid var(--line);background:rgba(0,234,255,.04);color:var(--cyan);padding:15px 20px;font:10px Orbitron;letter-spacing:1px;transition:transform .3s,box-shadow .3s,border-color .3s}
        .btn:before{content:"";position:absolute;top:0;left:-130%;width:70%;height:100%;transform:skewX(-20deg);background:linear-gradient(90deg,transparent,#00eaff33,transparent);transition:left .7s}
        .btn:hover:before{left:150%}
        .btn:hover{transform:translateY(-4px);border-color:var(--cyan);box-shadow:0 8px 30px #00eaff18,0 0 18px #00eaff13}
        .btn.primary{background:var(--cyan);color:#031016;font-weight:800;box-shadow:0 0 25px #00eaff22}
        .hero-stats{display:flex;gap:30px;margin-top:42px;padding-top:23px;border-top:1px solid rgba(255,255,255,.08);max-width:480px}
        .stat strong{display:block;font:700 22px Orbitron;color:#fff}
        .stat span{display:block;font-size:9px;letter-spacing:1px;color:var(--muted);margin-top:7px}
        .hero-visual{height:510px;position:relative;display:flex;align-items:center;justify-content:center;transform:translate3d(var(--mx,0),var(--my,0),0);transition:transform .3s ease-out}
        .reactor-canvas{position:absolute;inset:0}
        .reactor-frame{position:absolute;inset:8%;border:1px solid rgba(0,234,255,.13);clip-path:polygon(0 0,35% 0,35% 2px,100% 0,100% 100%,65% 100%,65% calc(100% - 2px),0 100%)}
        .reactor-frame:before,.reactor-frame:after{content:"";position:absolute;width:50px;height:50px;border:1px solid var(--cyan);opacity:.6}
        .reactor-frame:before{top:-1px;left:-1px;border-right:0;border-bottom:0}
        .reactor-frame:after{right:-1px;bottom:-1px;border-left:0;border-top:0}
        .reactor-label{position:absolute;font:9px Orbitron;letter-spacing:1px;color:#71859b}
        .reactor-label.top{top:5%;left:10%}
        .reactor-label.bottom{bottom:5%;right:10%;text-align:right}
        .reactor-core-label{position:absolute;bottom:16%;left:50%;transform:translateX(-50%);font:9px Orbitron;letter-spacing:2px;color:var(--cyan);white-space:nowrap}
        .corner{position:absolute;width:7px;height:7px;border:1px solid var(--cyan)}
        .corner.a{top:20%;left:10%}.corner.b{top:20%;right:10%}.corner.c{bottom:20%;left:10%}.corner.d{bottom:20%;right:10%}
        .floating-chip{position:absolute;padding:12px 14px;background:rgba(7,15,26,.88);border:1px solid var(--line);backdrop-filter:blur(10px);font:9px Orbitron;color:#b5c7d9;box-shadow:0 10px 35px #0005;animation:float-chip 5s ease-in-out infinite}
        .floating-chip strong{display:block;color:var(--cyan);font-size:12px;margin-bottom:5px}
        .floating-chip.one{top:19%;right:-1%}.floating-chip.two{bottom:20%;left:-2%;animation-delay:-2s}
        @keyframes float-chip{50%{transform:translateY(-12px)}}
        .section{position:relative;z-index:1;padding:115px 10%;scroll-margin-top:80px}
        .section-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:25px;margin-bottom:48px}
        .section-kicker{font:10px Orbitron;letter-spacing:3px;color:var(--cyan);margin-bottom:15px}
        .section-title{font:700 clamp(30px,4.4vw,54px)/1.1 Orbitron;letter-spacing:-2px;margin:0}
        .section-title span{color:var(--cyan)}
        .section-note{font-size:12px;color:var(--muted);max-width:270px;line-height:1.7}
        .about-grid{display:grid;grid-template-columns:.8fr 1.2fr;gap:22px}
        .glass-card{background:linear-gradient(135deg,rgba(15,28,43,.85),rgba(7,12,20,.9));border:1px solid rgba(0,234,255,.14);position:relative;overflow:hidden}
        .glass-card:before{content:"";position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--cyan),transparent);opacity:.5}
        .identity-card{padding:32px;min-height:300px}
        .identity-symbol{width:75px;height:75px;border:1px solid var(--cyan);display:grid;place-items:center;font:800 24px Orbitron;color:var(--cyan);box-shadow:inset 0 0 25px #00eaff0b,0 0 25px #00eaff10;margin-bottom:25px}
        .identity-card h3{font:600 23px Orbitron;margin:0 0 9px}
        .identity-card p{color:var(--muted);font-size:13px;line-height:1.7}
        .identity-tags{display:flex;gap:8px;flex-wrap:wrap;margin-top:22px}
        .tag{font:9px Orbitron;letter-spacing:.7px;padding:8px 10px;border:1px solid var(--line);color:#9eb0c2}
        .about-copy{padding:34px}
        .micro-label{font:9px Orbitron;letter-spacing:2px;color:var(--cyan)}
        .about-copy h3{font:600 23px Orbitron;line-height:1.45;margin:18px 0}
        .about-copy p{font-size:13px;line-height:1.95;color:#8e9daf}
        .data-row{display:flex;justify-content:space-between;gap:20px;border-top:1px solid rgba(255,255,255,.07);padding:13px 0;font-size:11px}
        .data-row span:first-child{color:#6e8197}.data-row span:last-child{color:#dce9f6;text-align:right}
        .skills-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:15px}
        .skill-card{padding:23px;background:rgba(9,16,27,.8);border:1px solid rgba(255,255,255,.075);transition:transform .35s,border-color .35s,background .35s}
        .skill-card:hover{transform:translateY(-7px);border-color:#00eaff66;background:#0c1926}
        .skill-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:22px}
        .skill-code{font:9px Orbitron;color:#64788e}
        .skill-percent{font:12px Orbitron;color:var(--cyan)}
        .skill-card h3{font-size:13px;font-weight:500;margin:0 0 20px}
        .skill-track{height:3px;background:#1a2735;overflow:hidden}
        .skill-fill{height:100%;background:linear-gradient(90deg,#6045ff,var(--cyan));box-shadow:0 0 12px #00eaff55}
        .skill-footer{display:flex;justify-content:space-between;margin-top:12px;color:#64788e;font:8px Orbitron;letter-spacing:1px}
        .project-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
        .project-card{min-height:330px;padding:25px;background:linear-gradient(160deg,rgba(14,24,38,.92),rgba(5,9,16,.95));border:1px solid rgba(0,234,255,.12);position:relative;overflow:hidden;transition:transform .35s,border-color .35s,box-shadow .35s}
        .project-card:hover{transform:translateY(-8px);border-color:#00eaff77;box-shadow:0 20px 60px #0007,0 0 30px #00eaff09}
        .project-card:after{content:"";position:absolute;inset:0;background:linear-gradient(115deg,transparent 35%,#00eaff09 50%,transparent 65%);transform:translateX(-120%);transition:transform .8s}
        .project-card:hover:after{transform:translateX(120%)}
        .project-number{font:10px Orbitron;color:var(--cyan)}
        .project-art{height:105px;margin:24px 0;display:flex;align-items:center;justify-content:center;position:relative;border:1px solid rgba(0,234,255,.09);background:radial-gradient(circle,#00eaff0d,transparent 70%)}
        .project-orbit{width:65px;height:65px;border:1px solid #00eaff88;border-radius:50%;display:grid;place-items:center;position:relative;animation:orbit-spin 12s linear infinite}
        .project-orbit:before{content:"";position:absolute;width:90px;height:35px;border:1px solid #8e5cff88;border-radius:50%;transform:rotate(55deg)}
        .project-orbit:after{content:"";position:absolute;width:90px;height:35px;border:1px solid #00eaff66;border-radius:50%;transform:rotate(-55deg)}
        .project-orbit span{font:14px Orbitron;color:var(--cyan);text-shadow:0 0 15px var(--cyan)}
        @keyframes orbit-spin{to{transform:rotate(360deg)}}
        .project-type{font:8px Orbitron;letter-spacing:1.5px;color:#8294a8}
        .project-card h3{font:600 18px Orbitron;margin:11px 0}
        .project-card p{font-size:12px;line-height:1.8;color:#8393a6}
        .project-status{display:inline-flex;align-items:center;gap:7px;margin-top:12px;font:8px Orbitron;color:var(--cyan);letter-spacing:1px}
        .project-status:before{content:"";width:5px;height:5px;border-radius:50%;background:var(--cyan);box-shadow:0 0 8px var(--cyan)}
        .contact-panel{padding:clamp(25px,5vw,60px);display:grid;grid-template-columns:1.2fr .8fr;gap:40px;background:radial-gradient(ellipse at 90% 20%,#00eaff0c,transparent 40%),#080e17;border:1px solid var(--line);position:relative}
        .contact-panel h3{font:700 clamp(28px,4vw,47px)/1.2 Orbitron;letter-spacing:-2px;margin:17px 0}
        .contact-panel p{font-size:13px;color:#8c9daf;line-height:1.8;max-width:460px}
        .contact-links{display:flex;flex-direction:column;justify-content:center;gap:12px}
        .contact-link{display:flex;justify-content:space-between;align-items:center;gap:15px;padding:17px;border:1px solid rgba(255,255,255,.09);background:#ffffff03;transition:.25s;color:#b4c4d5;font-size:12px}
        .contact-link:hover{border-color:var(--cyan);color:var(--cyan);transform:translateX(4px)}
        .contact-link span:last-child{font:10px Orbitron;color:var(--cyan)}
        .rating-box{max-width:700px;margin:0 auto;padding:35px;text-align:center;background:rgba(9,16,27,.82);border:1px solid var(--line)}
        .rating-box h3{font:600 22px Orbitron;margin:15px 0}
        .rating-box p{font-size:12px;color:var(--muted)}
        .stars-row{display:flex;justify-content:center;gap:12px;margin:24px 0}
        .star-button{border:0;background:none;color:#26394b;font-size:31px;padding:3px;transition:transform .2s,color .2s,text-shadow .2s}
        .star-button.active{color:#00eaff;text-shadow:0 0 20px #00eaff77}
        .star-button:hover{transform:scale(1.25) rotate(-5deg)}
        .rating-submit{border:1px solid var(--line);background:#00eaff0c;color:var(--cyan);padding:12px 20px;font:10px Orbitron;letter-spacing:1px}
        .rating-submit:hover{background:var(--cyan);color:#041016}
        .rating-thanks{font:11px Orbitron;color:var(--cyan);margin-top:15px}
        .footer{position:relative;z-index:1;padding:30px 10%;border-top:1px solid rgba(255,255,255,.07);display:flex;justify-content:space-between;align-items:center;gap:20px;color:#6e8195;font-size:10px}
        .footer-brand{font:12px Orbitron;color:#c9d8e6}
        .footer-brand span{color:var(--cyan)}
        .reveal{opacity:0;transform:translateY(28px);filter:blur(4px);transition:opacity .8s ease,transform .8s ease,filter .8s ease}
        .reveal.revealed{opacity:1;transform:translateY(0);filter:blur(0)}
        .custom-cursor{position:fixed;top:0;left:0;width:24px;height:24px;border:1px solid #00eaff99;border-radius:50%;pointer-events:none;z-index:200;transform:translate(-50%,-50%);mix-blend-mode:screen}
        .cursor-dot{position:fixed;top:0;left:0;width:4px;height:4px;border-radius:50%;background:var(--cyan);pointer-events:none;z-index:201;transform:translate(-50%,-50%)}
        .sound-toggle{position:fixed;bottom:20px;right:20px;z-index:90;background:#07101b;border:1px solid var(--line);color:var(--cyan);padding:10px 12px;font:9px Orbitron;letter-spacing:1px}
        @media(max-width:1000px){
          .hero{padding-left:8%;padding-right:8%;grid-template-columns:1fr 1fr}
          .hero h1{font-size:clamp(43px,7vw,70px)}
          .hero-visual{height:420px}
          .skills-grid{grid-template-columns:repeat(2,1fr)}
          .project-grid{grid-template-columns:repeat(2,1fr)}
          .project-card:last-child{grid-column:span 2}
          .status-strip,.side-index{display:none}
        }
        @media(max-width:700px){
          .navbar{height:68px;padding:0 6%}
          .nav-links{display:none}.menu-toggle{display:block}
          .mobile-nav{top:68px}
          .hero{padding:125px 7% 65px;grid-template-columns:1fr;gap:5px}
          .hero h1{font-size:clamp(43px,12vw,76px);letter-spacing:-3px}
          .hero-desc{font-size:13px;margin-top:22px}
          .hero-stats{gap:20px;margin-top:30px}
          .stat strong{font-size:18px}.stat span{font-size:8px}
          .hero-visual{height:350px;margin-top:5px}
          .floating-chip.one{right:0}.floating-chip.two{left:0}
          .section{padding:80px 7%}
          .section-heading{align-items:flex-start;flex-direction:column;margin-bottom:32px}
          .section-note{max-width:100%}
          .about-grid{grid-template-columns:1fr}
          .identity-card,.about-copy{padding:25px}
          .skills-grid{grid-template-columns:1fr}
          .project-grid{grid-template-columns:1fr}
          .project-card:last-child{grid-column:auto}
          .project-card{min-height:300px}
          .contact-panel{grid-template-columns:1fr;gap:25px;padding:27px}
          .footer{padding:25px 7%;flex-direction:column;align-items:flex-start}
          .custom-cursor,.cursor-dot{display:none}
          .sound-toggle{bottom:12px;right:12px}
        }
        @media(prefers-reduced-motion:reduce){
          *,*:before,*:after{animation-duration:.01ms!important;animation-iteration-count:1!important;scroll-behavior:auto!important;transition-duration:.01ms!important}
        }
      `}</style>

      <div className="grid-bg" />
      <div className="scanline" />
      <div className="top-progress" style={{ width: `${scrollProgress}%` }} />

      {!loading && (
        <>
          <motion.div
            className="custom-cursor"
            style={{ x: smoothX, y: smoothY }}
          />
          <motion.div
            className="cursor-dot"
            style={{ x: cursorX, y: cursorY }}
          />
        </>
      )}

      {loading && <LoadingScreen onComplete={closeLoader} />}

      <header className="navbar">
        <a className="brand" href="#home" onClick={() => setMenuOpen(false)}>
          TH<span>.</span>
          <small>ENGINEERING / PORTFOLIO</small>
        </a>

        <nav className="nav-links">
          <button onClick={() => scrollTo("home")}>HOME</button>
          <button onClick={() => scrollTo("about")}>ABOUT</button>
          <button onClick={() => scrollTo("skills")}>SKILLS</button>
          <button onClick={() => scrollTo("projects")}>PROJECTS</button>
          <button className="nav-contact" onClick={() => scrollTo("contact")}>
            LET'S CONNECT ↗
          </button>
        </nav>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? "CLOSE ×" : "MENU ☰"}
        </button>

        {menuOpen && (
          <nav className="mobile-nav">
            {["home", "about", "skills", "projects", "contact"].map((id) => (
              <button key={id} onClick={() => scrollTo(id)}>
                {id.toUpperCase()}
              </button>
            ))}
          </nav>
        )}
      </header>

      <div className="status-strip">
        <span className="status-dot" /> ALL SYSTEMS OPERATIONAL
      </div>
      <div className="side-index">LOCAL TIME {clock} / UTC+06</div>

      <main>
        <section className="hero" id="home">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, x: -45, filter: "blur(8px)" }}
            animate={loading ? {} : { opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.15 }}
          >
            <div className="eyebrow">MECHANICAL ENGINEERING STUDENT</div>
            <h1>
              <span className="line">DESIGN.</span>
              <span className="line outline">ENGINEER.</span>
              <span className="line glow">
                CREATE<span style={{ color: "#fff" }}>.</span>
              </span>
            </h1>
            <p className="hero-desc">
              Exploring the intersection of{" "}
              <strong>mechanical engineering</strong>, precision design and
              emerging technology. Turning ideas into systems, concepts into
              prototypes, and curiosity into capability.
            </p>
            <div className="hero-actions">
              <button
                className="btn primary"
                onClick={() => scrollTo("projects")}
              >
                EXPLORE MY WORK ↗
              </button>
              <button className="btn" onClick={() => scrollTo("about")}>
                DISCOVER PROFILE ↓
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <strong>
                  01<span style={{ color: "#00eaff" }}>+</span>
                </strong>
                <span>FEATURED PROJECT</span>
              </div>
              <div className="stat">
                <strong>06</strong>
                <span>CORE SKILL AREAS</span>
              </div>
              <div className="stat">
                <strong>∞</strong>
                <span>IDEAS TO EXPLORE</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="hero-visual"
            style={{
              ["--mx" as string]: `${mouseX * 8}px`,
              ["--my" as string]: `${mouseY * 8}px`,
            }}
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={loading ? {} : { opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.25 }}
          >
            <div className="reactor-frame" />
            <span className="reactor-label top">CORE ENGINE / 001</span>
            <span className="reactor-label bottom">
              POWER SOURCE: CURIOSITY
            </span>
            <span className="corner a" />
            <span className="corner b" />
            <span className="corner c" />
            <span className="corner d" />
            <div className="reactor-canvas">
              <Canvas camera={{ position: [0, 0, 5], fov: 43 }}>
                <Reactor />
              </Canvas>
            </div>

            {/* <div className="portrait-hologram">
              <img src="/" alt="Taqdirul Hassan portrait"/>
              <span className="portrait-label">IDENTITY VERIFIED / TH-01</span>
            </div> */}

            <div className="floating-chip one">
              <strong>98.7%</strong>
              SYSTEM STABILITY
            </div>
            <div className="floating-chip two">
              <strong>ONLINE</strong>
              CREATIVE ENGINE
            </div>
            <div className="reactor-core-label">◈ QUANTUM DESIGN SYSTEM ◈</div>
          </motion.div>
        </section>

        <section className="section" id="about">
          <div className="section-heading reveal">
            <div>
              <div className="section-kicker">01 / IDENTITY FILE</div>
              <h2 className="section-title">
                ABOUT <span>ME</span>
              </h2>
            </div>
            <p className="section-note">
              A student mindset. An engineer's curiosity. A future built through
              consistent learning and practical experimentation.
            </p>
          </div>

          <div className="about-grid">
            <motion.div
              className="identity-card glass-card reveal"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.25 }}
            >
              <div className="identity-symbol">
                TH<span style={{ color: "#fff" }}>.</span>
              </div>
              <div className="micro-label">PERSONAL PROFILE / 001</div>
              <h3>Taqdirul Hassan</h3>
              <p>Mechanical Engineering Student</p>
              <div className="identity-tags">
                <span className="tag">ENGINEERING</span>
                <span className="tag">CAD / CAM</span>
                <span className="tag">TECHNOLOGY</span>
              </div>
            </motion.div>

            <div className="about-copy glass-card reveal">
              <div className="micro-label">MISSION STATEMENT</div>
              <h3>
                Build knowledge. Design solutions. Engineer a better future.
              </h3>
              <p>
                I am developing my foundation in mechanical engineering while
                exploring computer-aided design, manufacturing technology and
                digital tools. My goal is to combine practical engineering
                knowledge with modern technical skills and keep learning through
                projects, experimentation and real-world challenges.
              </p>
              <div className="data-row">
                <span>EDUCATION</span>
                <span>Diploma in Mechanical Engineering</span>
              </div>
              <div className="data-row">
                <span>FOCUS</span>
                <span>Design / Manufacturing / CAD</span>
              </div>
              <div className="data-row">
                <span>WORK MODE</span>
                <span>LEARN · BUILD · IMPROVE</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="skills">
          <div className="section-heading reveal">
            <div>
              <div className="section-kicker">02 / CAPABILITY MATRIX</div>
              <h2 className="section-title">
                SKILL <span>SET</span>
              </h2>
            </div>
            <p className="section-note">
              A snapshot of my current learning journey. Progress levels are
              self-assessments, not formal certifications.
            </p>
          </div>

          <div className="skills-grid">
            {skills.map((skill, index) => (
              <motion.div
                className="skill-card reveal"
                key={skill.code}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
              >
                <div className="skill-top">
                  <span className="skill-code">{skill.code} / CAPABILITY</span>
                  <span className="skill-percent">{skill.level}%</span>
                </div>
                <h3>{skill.name}</h3>
                <div className="skill-track">
                  <motion.div
                    className="skill-fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.15 + index * 0.07 }}
                  />
                </div>
                <div className="skill-footer">
                  <span>LEARNING PROGRESS</span>
                  <span>ACTIVE</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="section" id="projects">
          <div className="section-heading reveal">
            <div>
              <div className="section-kicker">03 / PROJECT ARCHIVE</div>
              <h2 className="section-title">
                SELECTED <span>WORK</span>
              </h2>
            </div>
            <p className="section-note">
              Concepts, experiments and projects from my evolving engineering
              and technology journey.
            </p>
          </div>

          <div className="project-grid">
            {projects.map((project, index) => (
              <motion.article
                className="project-card reveal"
                key={project.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.1 }}
                whileHover={{ y: -7 }}
              >
                <div className="project-number">
                  {project.id} / {project.number}
                </div>
                <div className="project-art">
                  <div className="project-orbit">
                    <span>TH</span>
                  </div>
                </div>
                <div className="project-type">{project.type}</div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-status">{project.status}</div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="section" id="contact">
          <div className="section-heading reveal">
            <div>
              <div className="section-kicker">04 / OPEN CONNECTION</div>
              <h2 className="section-title">
                LET'S <span>CONNECT</span>
              </h2>
            </div>
            <p className="section-note">
              Have an idea, a collaboration opportunity or an engineering topic
              to discuss? Let's start a conversation.
            </p>
          </div>

          <div className="contact-panel reveal">
            <div>
              <div className="micro-label">CONNECTION PROTOCOL / READY</div>
              <h3>Every great project starts with a conversation.</h3>
              <p>
                I'm open to connecting with fellow students, engineering
                enthusiasts, developers and people who enjoy building useful
                things. Reach out through email to get in touch.
              </p>
              <button className="btn primary" onClick={copyEmail}>
                {copied ? "EMAIL COPIED ✓" : "COPY EMAIL ADDRESS ↗"}
              </button>
            </div>
            <div className="contact-links">
              <a className="contact-link" href={`mailto:${email}`}>
                <span>EMAIL</span>
                <span>OPEN ↗</span>
              </a>
              <a
                className="contact-link"
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
              >
                <span>GITHUB / CODE</span>
                <span>VISIT ↗</span>
              </a>
              <a
                className="contact-link"
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
              >
                <span>LINKEDIN / NETWORK</span>
                <span>VISIT ↗</span>
              </a>
            </div>
          </div>
        </section>

        <section className="section" id="rating">
          <div className="section-heading reveal">
            <div>
              <div className="section-kicker">05 / USER FEEDBACK</div>
              <h2 className="section-title">
                RATE THE <span>EXPERIENCE</span>
              </h2>
            </div>
            <p className="section-note">
              Your feedback helps improve this digital experience.
            </p>
          </div>

          <div className="rating-box reveal">
            <div className="micro-label">INTERFACE FEEDBACK TERMINAL</div>
            <h3>How was your experience?</h3>
            <p>Select a rating from one to five stars.</p>
            <div
              className="stars-row"
              role="radiogroup"
              aria-label="Rate portfolio"
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  className={`star-button ${(hoverRating || rating) >= value ? "active" : ""}`}
                  key={value}
                  onClick={() => {
                    setRating(value);
                    setSubmitted(false);
                  }}
                  onMouseEnter={() => setHoverRating(value)}
                  onMouseLeave={() => setHoverRating(0)}
                  aria-label={`${value} star${value > 1 ? "s" : ""}`}
                  aria-checked={rating === value}
                  role="radio"
                >
                  ★
                </button>
              ))}
            </div>
            <button
              className="rating-submit"
              onClick={() => rating > 0 && setSubmitted(true)}
            >
              SUBMIT FEEDBACK ↗
            </button>
            {submitted && (
              <motion.div
                className="rating-thanks"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                THANK YOU — YOUR {rating}-STAR RATING IS SELECTED.
              </motion.div>
            )}
            <p style={{ fontSize: 10, marginTop: 18 }}>
              Demo interaction only. Ratings are not stored on a server.
            </p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand">
          TH<span>.</span> / ENGINEERING PORTFOLIO
        </div>
        <div>DESIGNED TO EXPLORE · BUILT TO EVOLVE</div>
        <div>© {new Date().getFullYear()} TAQDIRUL HASSAN</div>
      </footer>

      <button
        className="sound-toggle"
        onClick={() => setSoundOn((value) => !value)}
        title="Toggle visual system status"
      >
        {soundOn ? "◉ SYSTEM ON" : "◌ SYSTEM IDLE"}
      </button>
    </div>
  );
}

export default App;

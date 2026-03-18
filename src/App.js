import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Stars, Sparkles, Float } from '@react-three/drei';
import gsap from 'gsap';
import './App.css';

const apps = [
    {
        id: "scamslap",
        title: "ScamSlap",
        subtitle: "// ANTI-FRAUD BOT",
        description: "Async AI detection engine bypassing Meta's 20s timeout. Identifies deepfakes in real-time.",
        color: "#ff3366",
        url: "https://denis-furtuna.github.io/ScamSlap-bot/",
        tech: ["Python", "FastAPI", "Meta API"]
    },
    {
        id: "focusreader",
        title: "Focus Reader",
        subtitle: "// RSVP ENGINE",
        description: "High-performance reading tool. Smart Auto-Format Engine (Regex) enabling 1000+ WPM.",
        color: "#00ffcc",
        url: "https://denis-furtuna.github.io/Focus-Reader/",
        tech: ["C#", "XAML", "Regex"]
    },
    {
        id: "roadtech",
        title: "ROAD TECH",
        subtitle: "// INFINITE_KNOWLEDGE",
        description: "An infinitely scalable 16-bit educational RPG. Extracts data via Wikipedia API & Groq AI.",
        color: "#FF8800",
        url: "https://denis-furtuna.github.io/RoadTech/",
        tech: ["Godot 4", "FastAPI", "Groq AI"]
    },
    {
        id: "speedmath",
        title: "SpeedMath",
        subtitle: "// COMPETITIVE LOGIC",
        description: "1v1 math duel with dynamic difficulty algorithms. Graded 10/10.",
        color: "#ffcc00",
        url: "https://denis-furtuna.github.io/SpeedMath/",
        tech: ["C#", ".NET", "WinForms"]
    }
];

// Reacție a camerei 3D la coordonatele globale
function CameraRig({ mouseGlobalRef }) {
    useFrame((state) => {
        const mx = mouseGlobalRef.current[0];
        const my = mouseGlobalRef.current[1];
        state.camera.position.lerp({ x: (mx * 3), y: (my * 3), z: 8 }, 0.05);
        state.camera.lookAt(0, 0, 0);
    });
    return null;
}

const CyberCore = () => {
    const coreRef = useRef();

    useFrame(({ clock }) => {
        coreRef.current.rotation.x = clock.getElapsedTime() * 0.15;
        coreRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    });

    return (
        <Float speed={2.5} rotationIntensity={2} floatIntensity={3}>
            <Sphere ref={coreRef} args={[2.2, 64, 64]}>
                <MeshDistortMaterial
                    color="#2a0066"
                    attach="material"
                    distort={0.5}
                    speed={3}
                    roughness={0.2}
                    metalness={1}
                    emissive="#6600cc"
                    emissiveIntensity={1.5}
                    wireframe={true}
                />
            </Sphere>
        </Float>
    );
};

const App = () => {
    const uiRef = useRef(null);
    const gridRef = useRef(null);
    const cardsRef = useRef([]);
    const mouseGlobalRef = useRef([0, 0]);

    useEffect(() => {
        // Animația brutală de lansare
        const ctx = gsap.context(() => {
            gsap.fromTo(".glitch-title",
                { y: -100, opacity: 0, scale: 0.8 },
                { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "elastic.out(1, 0.5)" }
            );

            gsap.fromTo(".sys-status",
                { opacity: 0, x: -50 },
                { opacity: 1, x: 0, duration: 1, delay: 0.5, ease: "power3.out" }
            );

            gsap.fromTo(".glass-card",
                { y: 150, opacity: 0, rotationX: 15 },
                { y: 0, opacity: 1, rotationX: 0, duration: 1.2, stagger: 0.15, ease: "back.out(1.2)", delay: 0.4 }
            );
        }, uiRef);

        // Radarul global pentru 3D și Efectul de Mărire (Mac Dock)
        const handleGlobalMouseMove = (e) => {
            // 1. Hrănim gaura neagră 3D cu coordonate
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -(e.clientY / window.innerHeight) * 2 + 1;
            mouseGlobalRef.current = [x, y];

            // 2. Executăm matematica de mărire pentru carduri
            if (!cardsRef.current.length) return;

            cardsRef.current.forEach((card) => {
                if (!card) return;
                const rect = card.getBoundingClientRect();
                const cardCenterX = rect.left + rect.width / 2;
                const cardCenterY = rect.top + rect.height / 2;

                const distX = e.clientX - cardCenterX;
                const distY = e.clientY - cardCenterY;
                const distance = Math.sqrt(distX * distX + distY * distY);

                const proximity = 300;
                const baseScale = 1.0;
                const maxScale = 1.2; // Zoom controlat, puternic, dar nu sparge ecranul

                let scale = baseScale;
                if (distance < proximity) {
                    const intensity = 1 - (distance / proximity);
                    scale = baseScale + (maxScale - baseScale) * intensity;
                }

                gsap.to(card, {
                    scale: scale,
                    duration: 0.15,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            });
        };

        const handleMouseLeave = () => {
            cardsRef.current.forEach((card) => {
                if (card) {
                    gsap.to(card, { scale: 1.0, duration: 0.4, ease: "back.out(1.5)", overwrite: "auto" });
                }
            });
        };

        window.addEventListener('mousemove', handleGlobalMouseMove);
        document.body.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            ctx.revert();
            window.removeEventListener('mousemove', handleGlobalMouseMove);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div className="master-container">
            <div className="canvas-container">
                <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                    <color attach="background" args={['#020005']} />
                    <ambientLight intensity={0.4} />
                    <pointLight position={[10, 10, 10]} intensity={2} color="#9933ff" />
                    <CameraRig mouseGlobalRef={mouseGlobalRef} />
                    <CyberCore />
                    <Sparkles count={200} scale={15} size={10} speed={0.4} opacity={0.5} color="#00ffcc" />
                    <Stars radius={100} depth={50} count={7000} factor={5} saturation={1} fade speed={2} />
                </Canvas>
            </div>

            <div className="ui-overlay" ref={uiRef}>
                <header className="header-section">
                    <h1 className="glitch-title">DENIS_FURTUNA</h1>
                    <p className="sys-status">[ ALGORITHMIC SUPERIORITY DEPLOYED ]</p>
                </header>

                <main className="grid-deployment" ref={gridRef}>
                    {apps.map((app, index) => (
                        <a
                            key={app.id}
                            href={app.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-card"
                            style={{ "--theme": app.color }}
                            ref={el => cardsRef.current[index] = el}
                        >
                            <div className="card-glow"></div>
                            <div className="card-content">
                                <div className="card-header">
                                    <h2>{app.title}</h2>
                                    <span className="subtitle">{app.subtitle}</span>
                                </div>
                                <p className="description">{app.description}</p>
                                <div className="tech-stack">
                                    {app.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                                </div>
                                <div className="action-bar">
                                    <span className="launch-text">INITIATE //</span>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                </div>
                            </div>
                        </a>
                    ))}
                </main>
            </div>
        </div>
    );
};

export default App;

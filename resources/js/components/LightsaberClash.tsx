import { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { playClashSound } from '@/lib/audio';

interface Spark {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    life: number;
    maxLife: number;
    isStreak?: boolean;
    angle?: number;
}

interface ContactFlash {
    id: number;
    active: boolean;
}

// --- SVG Lightsaber Blade ---
function JediBlade({ active }: { active: boolean }) {
    return (
        <svg
            width="14"
            height="260"
            viewBox="0 0 14 260"
            className="origin-bottom"
            style={{
                display: 'block',
                opacity: active ? 1 : 0,
                height: active ? '260px' : '0px',
                transition: 'height 0.55s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease',
                willChange: 'height, opacity, filter',
                filter: active
                    ? 'drop-shadow(0 0 6px #00d4ff) drop-shadow(0 0 18px rgba(0,212,255,0.6)) drop-shadow(0 0 40px rgba(0,212,255,0.25))'
                    : 'none',
            }}
        >
            <defs>
                <linearGradient id="jedi-blade-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                    <stop offset="12%" stopColor="#ffffff" stopOpacity="0.9" />
                    <stop offset="35%" stopColor="#00d4ff" stopOpacity="1" />
                    <stop offset="75%" stopColor="#0099cc" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#005577" stopOpacity="0.95" />
                </linearGradient>
                {/* Core white hot line */}
                <linearGradient id="jedi-core-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="transparent" stopOpacity="0" />
                    <stop offset="8%" stopColor="#ffffff" stopOpacity="0.95" />
                    <stop offset="50%" stopColor="#e0f8ff" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#c0eeff" stopOpacity="0.4" />
                </linearGradient>
            </defs>
            {/* Outer glow layer */}
            <rect x="1" y="0" width="12" height="260" rx="6" fill="url(#jedi-blade-grad)" />
            {/* Core hot-white center */}
            <rect x="4.5" y="8" width="5" height="252" rx="2.5" fill="url(#jedi-core-grad)" />
        </svg>
    );
}

function SithBlade({ active }: { active: boolean }) {
    return (
        <svg
            width="14"
            height="260"
            viewBox="0 0 14 260"
            className="origin-bottom"
            style={{
                display: 'block',
                opacity: active ? 1 : 0,
                height: active ? '260px' : '0px',
                transition: 'height 0.55s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease',
                willChange: 'height, opacity, filter',
                filter: active
                    ? 'drop-shadow(0 0 6px #ff2d2d) drop-shadow(0 0 18px rgba(255,45,45,0.6)) drop-shadow(0 0 40px rgba(255,45,45,0.25))'
                    : 'none',
            }}
        >
            <defs>
                <linearGradient id="sith-blade-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                    <stop offset="12%" stopColor="#ffffff" stopOpacity="0.9" />
                    <stop offset="35%" stopColor="#ff2d2d" stopOpacity="1" />
                    <stop offset="75%" stopColor="#cc1111" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#770000" stopOpacity="0.95" />
                </linearGradient>
                <linearGradient id="sith-core-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="transparent" stopOpacity="0" />
                    <stop offset="8%" stopColor="#ffffff" stopOpacity="0.95" />
                    <stop offset="50%" stopColor="#ffe0e0" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#ffcccc" stopOpacity="0.4" />
                </linearGradient>
            </defs>
            <rect x="1" y="0" width="12" height="260" rx="6" fill="url(#sith-blade-grad)" />
            <rect x="4.5" y="8" width="5" height="252" rx="2.5" fill="url(#sith-core-grad)" />
        </svg>
    );
}

// --- Metallic Hilt ---
function JediHilt() {
    return (
        <div className="relative flex-shrink-0" style={{ width: '22px', height: '64px', willChange: 'transform' }}>
            <div
                className="absolute inset-0 rounded-sm"
                style={{
                    background: 'linear-gradient(90deg, #3a3a3a 0%, #6e6e6e 35%, #c8c8c8 50%, #6e6e6e 65%, #2e2e2e 100%)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15)',
                }}
            />
            {/* Grip rings */}
            {[10, 22, 34].map((top) => (
                <div
                    key={top}
                    className="absolute left-0 right-0"
                    style={{
                        top: `${top}px`,
                        height: '3px',
                        background: 'linear-gradient(90deg, #1a1a1a 0%, #555 40%, #1a1a1a 100%)',
                    }}
                />
            ))}
            {/* Activation button (blue) */}
            <div
                className="absolute"
                style={{
                    top: '46px',
                    right: '3px',
                    width: '5px',
                    height: '7px',
                    borderRadius: '2px',
                    background: 'radial-gradient(circle at 40% 30%, #60d4ff, #0099cc)',
                    boxShadow: '0 0 6px rgba(0,212,255,0.8)',
                }}
            />
            {/* Pommel */}
            <div
                className="absolute bottom-0 left-0 right-0"
                style={{ height: '8px', borderRadius: '0 0 3px 3px', background: '#1a1a1a' }}
            />
        </div>
    );
}

function SithHilt() {
    return (
        <div className="relative flex-shrink-0" style={{ width: '22px', height: '64px', willChange: 'transform' }}>
            <div
                className="absolute inset-0 rounded-sm"
                style={{
                    background: 'linear-gradient(90deg, #2a2a2a 0%, #555 30%, #999 50%, #555 70%, #1a1a1a 100%)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.08)',
                }}
            />
            {/* Crossguard vents (Kylo-ren inspired) */}
            {[8, 20, 34, 46].map((top) => (
                <div
                    key={top}
                    className="absolute left-0 right-0"
                    style={{ top: `${top}px`, height: '2px', background: '#0d0d0d' }}
                />
            ))}
            {/* Red crystal indicator */}
            <div
                className="absolute"
                style={{
                    top: '28px',
                    left: '3px',
                    width: '4px',
                    height: '6px',
                    borderRadius: '1px',
                    background: 'radial-gradient(circle at 40% 30%, #ff6060, #990000)',
                    boxShadow: '0 0 6px rgba(255,45,45,0.9)',
                }}
            />
            <div
                className="absolute bottom-0 left-0 right-0"
                style={{ height: '6px', borderRadius: '0 0 3px 3px', background: '#0d0d0d' }}
            />
        </div>
    );
}

// ============================================================
// Main Component
// ============================================================
export default function LightsaberClash() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [leftActive, setLeftActive] = useState(true);
    const [rightActive, setRightActive] = useState(true);
    const [isClashing, setIsClashing] = useState(true);
    const [flashKey, setFlashKey] = useState(0);
    const [isMuted, setIsMuted] = useState(() => {
        if (typeof window !== 'undefined') {
            return sessionStorage.getItem('audioConsent') !== 'true';
        }
        return true;
    });

    const audioCtxRef = useRef<AudioContext | null>(null);
    const leftHumOscRef = useRef<OscillatorNode | null>(null);
    const rightHumOscRef = useRef<OscillatorNode | null>(null);
    const mainGainRef = useRef<GainNode | null>(null);
    const sparksRef = useRef<Spark[]>([]);
    const animIdRef = useRef<number>(0);
    const isClashingRef = useRef(isClashing);
    const isMutedRef = useRef(isMuted);

    // Keep refs in sync
    useEffect(() => { isClashingRef.current = isClashing; }, [isClashing]);
    useEffect(() => { isMutedRef.current = isMuted; }, [isMuted]);

    // ── Audio ──────────────────────────────────────────────
    const initAudio = useCallback(() => {
        if (audioCtxRef.current) return;
        try {
            const Ctx = window.AudioContext || (window as any).webkitAudioContext;
            const ctx = new Ctx();
            audioCtxRef.current = ctx;

            const mainGain = ctx.createGain();
            mainGain.gain.setValueAtTime(isMuted ? 0 : 0.12, ctx.currentTime);
            mainGain.connect(ctx.destination);
            mainGainRef.current = mainGain;

            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(160, ctx.currentTime);
            filter.Q.setValueAtTime(5, ctx.currentTime);
            filter.connect(mainGain);

            const makeHum = (freq: number) => {
                const osc = ctx.createOscillator();
                const g = ctx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(freq, ctx.currentTime);
                g.gain.setValueAtTime(0.8, ctx.currentTime);
                osc.connect(g);
                g.connect(filter);
                osc.start();
                (osc as any).gainNode = g;
                return osc;
            };

            leftHumOscRef.current = makeHum(80);
            rightHumOscRef.current = makeHum(84);
        } catch {
            console.warn('Web Audio not available');
        }
    }, [isMuted]);

    const playIgniteSound = useCallback((isSith: boolean) => {
        if (isMutedRef.current || !audioCtxRef.current) return;
        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') ctx.resume();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(55, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(isSith ? 230 : 310, ctx.currentTime + 0.45);
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.28, ctx.currentTime + 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.55);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.6);
    }, []);

    useEffect(() => {
        if (mainGainRef.current && audioCtxRef.current) {
            mainGainRef.current.gain.setValueAtTime(
                isMuted ? 0 : 0.12,
                audioCtxRef.current.currentTime,
            );
        }
    }, [isMuted]);

    // ── Spark helpers ─────────────────────────────────────
    const spawnSparks = useCallback((x: number, y: number, count: number, intense = false) => {
        // Realistic spark colours: white core, blue-white edges, orange/gold embers
        const colors = [
            '#ffffff', '#ffffff', '#e8f4ff',
            '#60a5fa', '#93c5fd', '#bfdbfe',
            '#fbbf24', '#f97316', '#fed7aa',
        ];
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = intense
                ? Math.random() * 10 + 5
                : Math.random() * 5 + 1.5;
            const isStreak = intense && Math.random() > 0.6;
            sparksRef.current.push({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - (intense ? 2.5 : 1),
                size: isStreak ? Math.random() * 2 + 1 : Math.random() * 2.5 + 0.8,
                color: colors[Math.floor(Math.random() * colors.length)],
                life: 0,
                maxLife: Math.random() * (intense ? 55 : 28) + (intense ? 20 : 10),
                isStreak,
                angle,
            });
        }
    }, []);

    // ── Canvas draw loop ──────────────────────────────────
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx2d = canvas.getContext('2d');
        if (!ctx2d) return;

        // Use physical pixel size for crisp rendering
        const W = 360;
        const H = 360;
        canvas.width = W;
        canvas.height = H;
        const cx = W / 2;
        const cy = H / 2 - 25;

        const draw = () => {
            // Pause if tab hidden (Visibility API)
            if (document.visibilityState === 'hidden') {
                animIdRef.current = requestAnimationFrame(draw);
                return;
            }

            ctx2d.clearRect(0, 0, W, H);

            // Continuous low-intensity sparks while clashing
            if (isClashingRef.current) {
                const burst = Math.random() > 0.55;
                spawnSparks(cx, cy, burst ? 4 : 2, false);
            }

            const sparks = sparksRef.current;
            for (let i = sparks.length - 1; i >= 0; i--) {
                const s = sparks[i];
                s.life++;
                if (s.life >= s.maxLife) { sparks.splice(i, 1); continue; }

                s.x += s.vx;
                s.y += s.vy;
                s.vy += 0.07; // gravity
                s.vx *= 0.98; // air drag

                const alpha = Math.pow(1 - s.life / s.maxLife, 0.8);

                if (s.isStreak) {
                    // Streak spark: draw as short line in direction of motion
                    const len = Math.sqrt(s.vx * s.vx + s.vy * s.vy) * 3;
                    const grad = ctx2d.createLinearGradient(
                        s.x, s.y,
                        s.x - s.vx * 3, s.y - s.vy * 3
                    );
                    grad.addColorStop(0, s.color);
                    grad.addColorStop(1, 'transparent');
                    ctx2d.beginPath();
                    ctx2d.strokeStyle = s.color;
                    ctx2d.globalAlpha = alpha;
                    ctx2d.lineWidth = s.size;
                    ctx2d.lineCap = 'round';
                    ctx2d.moveTo(s.x, s.y);
                    ctx2d.lineTo(s.x - (s.vx / Math.max(len, 1)) * Math.min(len, 12), s.y - (s.vy / Math.max(len, 1)) * Math.min(len, 12));
                    ctx2d.stroke();
                } else {
                    // Round spark particle
                    ctx2d.beginPath();
                    ctx2d.globalAlpha = alpha;
                    ctx2d.fillStyle = s.color;
                    ctx2d.arc(s.x, s.y, s.size, 0, Math.PI * 2);
                    ctx2d.fill();
                }
            }

            ctx2d.globalAlpha = 1;
            animIdRef.current = requestAnimationFrame(draw);
        };

        draw();
        return () => cancelAnimationFrame(animIdRef.current);
    }, [spawnSparks]);

    // ── Clash state ───────────────────────────────────────
    useEffect(() => {
        const clashing = leftActive && rightActive;
        setIsClashing(clashing);

        if (clashing) {
            if (!isMutedRef.current) playClashSound(0.35);
            setFlashKey((k) => k + 1);
            // Big initial burst
            const canvas = canvasRef.current;
            if (canvas) {
                const cx = canvas.width / 2;
                const cy = canvas.height / 2 - 25;
                spawnSparks(cx, cy, 55, true);
            }
        }
    }, [leftActive, rightActive, spawnSparks]);

    // ── Toggle handlers ───────────────────────────────────
    const handleLeftToggle = () => {
        initAudio();
        const next = !leftActive;
        setLeftActive(next);
        if (next) playIgniteSound(false);
    };

    const handleRightToggle = () => {
        initAudio();
        const next = !rightActive;
        setRightActive(next);
        if (next) playIgniteSound(true);
    };

    const triggerManualClash = () => {
        initAudio();
        if (!leftActive || !rightActive) return;
        if (!isMutedRef.current) playClashSound(0.4);
        setFlashKey((k) => k + 1);
        const canvas = canvasRef.current;
        if (canvas) {
            const cx = canvas.width / 2;
            const cy = canvas.height / 2 - 25;
            sparksRef.current = [];
            spawnSparks(cx, cy, 70, true);
        }
    };

    // ── Render ────────────────────────────────────────────
    return (
        <div
            className="relative flex flex-col items-center justify-center p-4 mx-auto force-float select-none"
            style={{ maxWidth: '440px', height: '430px', willChange: 'transform' }}
        >
            {/* Audio toggle */}
            <button
                onClick={() => {
                    initAudio();
                    const next = !isMuted;
                    setIsMuted(next);
                    sessionStorage.setItem('audioConsent', next ? 'false' : 'true');
                }}
                className="absolute top-0 right-2 p-2 rounded-full border border-border bg-card/60 text-muted-foreground hover:text-foreground hover:bg-card transition-colors z-20 cursor-pointer"
                title={isMuted ? 'Enable Lightsaber Sound' : 'Mute Sound'}
            >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-primary" />}
            </button>

            {/* Arena */}
            <div className="relative w-full flex-1 flex items-center justify-center overflow-hidden">

                {/* ── Spark canvas (clickable clash area) ── */}
                <canvas
                    ref={canvasRef}
                    onClick={triggerManualClash}
                    className="absolute z-10 pointer-events-auto cursor-crosshair"
                    style={{ width: '360px', height: '360px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                />

                {/* ── Contact flash rings (re-mount on each clash) ── */}
                {isClashing && (
                    <div
                        key={flashKey}
                        className="absolute z-20 pointer-events-none"
                        style={{
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -66%)',
                        }}
                    >
                        {/* Flash ring 1 — fast white */}
                        <div
                            className="absolute"
                            style={{
                                width: '24px', height: '24px',
                                borderRadius: '50%',
                                background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(220,240,255,0.7) 40%, transparent 70%)',
                                animation: 'clash-flash 0.45s cubic-bezier(0.16,1,0.3,1) forwards',
                                top: '-12px', left: '-12px',
                            }}
                        />
                        {/* Flash ring 2 — slower gold */}
                        <div
                            className="absolute"
                            style={{
                                width: '24px', height: '24px',
                                borderRadius: '50%',
                                background: 'transparent',
                                border: '2px solid rgba(255,232,31,0.8)',
                                animation: 'clash-ring-slow 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
                                top: '-12px', left: '-12px',
                            }}
                        />
                        {/* Flash ring 3 — blue-white, medium */}
                        <div
                            className="absolute"
                            style={{
                                width: '20px', height: '20px',
                                borderRadius: '50%',
                                background: 'transparent',
                                border: '1.5px solid rgba(0,212,255,0.6)',
                                animation: 'clash-ring-slow 0.55s 0.05s cubic-bezier(0.16,1,0.3,1) forwards',
                                top: '-10px', left: '-10px',
                            }}
                        />
                        {/* Core hot-white dot — persists while clashing */}
                        <div
                            className="absolute clash-glow-pulse"
                            style={{
                                width: '10px', height: '10px',
                                borderRadius: '50%',
                                background: 'radial-gradient(circle, #fff 0%, rgba(0,212,255,0.6) 60%, transparent 100%)',
                                boxShadow: '0 0 12px 6px rgba(255,255,255,0.5), 0 0 24px 12px rgba(0,212,255,0.3)',
                                top: '-5px', left: '-5px',
                            }}
                        />
                    </div>
                )}

                {/* ── LEFT LIGHTSABER (Jedi Blue) ── */}
                <div
                    onClick={handleLeftToggle}
                    className={`absolute flex flex-col items-center origin-bottom cursor-pointer z-0 ${
                        isClashing ? 'clash-pushing-jedi' : ''
                    }`}
                    style={{
                        bottom: '8%',
                        left: '8%',
                        transform: isClashing ? undefined : 'rotate(20deg)',
                        transition: isClashing ? undefined : 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        willChange: 'transform',
                        transformOrigin: 'bottom center',
                    }}
                    title="Click to ignite/retract Jedi Saber"
                >
                    <div className={leftActive ? 'blade-flicker' : ''} style={{ transformOrigin: 'bottom center' }}>
                        <JediBlade active={leftActive} />
                    </div>
                    <JediHilt />
                </div>

                {/* ── RIGHT LIGHTSABER (Sith Red) ── */}
                <div
                    onClick={handleRightToggle}
                    className={`absolute flex flex-col items-center origin-bottom cursor-pointer z-0 ${
                        isClashing ? 'clash-pushing-sith' : ''
                    }`}
                    style={{
                        bottom: '8%',
                        right: '8%',
                        transform: isClashing ? undefined : 'rotate(-20deg)',
                        transition: isClashing ? undefined : 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        willChange: 'transform',
                        transformOrigin: 'bottom center',
                    }}
                    title="Click to ignite/retract Sith Saber"
                >
                    <div className={rightActive ? 'blade-flicker' : ''} style={{ transformOrigin: 'bottom center' }}>
                        <SithBlade active={rightActive} />
                    </div>
                    <SithHilt />
                </div>
            </div>

            {/* Labels */}
            <div className="text-center mt-2">
                <p
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{
                        color: isClashing ? 'rgba(255,232,31,0.9)' : 'rgba(240,244,255,0.4)',
                        fontFamily: 'Rajdhani, sans-serif',
                        textShadow: isClashing ? '0 0 8px rgba(255,232,31,0.5)' : 'none',
                        transition: 'color 0.4s, text-shadow 0.4s',
                    }}
                >
                    {isClashing ? '⚡ Benturan Force Terdeteksi!' : 'Ignite pedang untuk memulai benturan'}
                </p>
                <p className="text-[10px] mt-1 select-none" style={{ color: 'rgba(240,244,255,0.3)', fontFamily: 'Rajdhani, sans-serif' }}>
                    Klik pedang untuk menyalakan • Klik titik benturan untuk Force burst
                </p>
            </div>
        </div>
    );
}

import { useEffect, useRef, useState } from 'react';
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
}

export default function LightsaberClash() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    // States for lightsaber ignition and clash
    const [leftActive, setLeftActive] = useState(true);
    const [rightActive, setRightActive] = useState(true);
    const [isClashing, setIsClashing] = useState(true);
    const [isMuted, setIsMuted] = useState(() => {
        if (typeof window !== 'undefined') {
            const consent = sessionStorage.getItem('audioConsent');
            return consent !== 'true';
        }
        return true;
    });

    // Audio node references
    const audioCtxRef = useRef<AudioContext | null>(null);
    const leftHumOscRef = useRef<OscillatorNode | null>(null);
    const rightHumOscRef = useRef<OscillatorNode | null>(null);
    const mainGainRef = useRef<GainNode | null>(null);
    const filterRef = useRef<BiquadFilterNode | null>(null);

    // Canvas spark animation variables
    const sparksRef = useRef<Spark[]>([]);

    // Handle audio initializations
    const initAudio = () => {
        if (audioCtxRef.current) return;

        try {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            const ctx = new AudioContextClass();
            audioCtxRef.current = ctx;

            // Main output gain
            const mainGain = ctx.createGain();
            mainGain.gain.setValueAtTime(isMuted ? 0 : 0.15, ctx.currentTime);
            mainGain.connect(ctx.destination);
            mainGainRef.current = mainGain;

            // Low pass filter to make the hum sound deep and warm
            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(140, ctx.currentTime);
            filter.Q.setValueAtTime(4, ctx.currentTime);
            filter.connect(mainGain);
            filterRef.current = filter;

            // Left hum oscillator
            const oscLeft = ctx.createOscillator();
            oscLeft.type = 'sawtooth';
            oscLeft.frequency.setValueAtTime(80, ctx.currentTime); // Deep hum
            
            const gainLeft = ctx.createGain();
            gainLeft.gain.setValueAtTime(leftActive ? 0.8 : 0, ctx.currentTime);
            
            oscLeft.connect(gainLeft);
            gainLeft.connect(filter);
            oscLeft.start();
            leftHumOscRef.current = oscLeft;

            // Right hum oscillator
            const oscRight = ctx.createOscillator();
            oscRight.type = 'sawtooth';
            oscRight.frequency.setValueAtTime(84, ctx.currentTime); // Slight detune for beating effect
            
            const gainRight = ctx.createGain();
            gainRight.gain.setValueAtTime(rightActive ? 0.8 : 0, ctx.currentTime);
            
            oscRight.connect(gainRight);
            gainRight.connect(filter);
            oscRight.start();
            rightHumOscRef.current = oscRight;

            // Keep reference to gains to adjust on activation
            (oscLeft as any).gainNode = gainLeft;
            (oscRight as any).gainNode = gainRight;

        } catch (e) {
            console.error("Failed to initialize Web Audio API:", e);
        }
    };

    // Play ignition sound
    const playIgniteSound = (isSith: boolean) => {
        if (isMuted || !audioCtxRef.current) return;
        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') ctx.resume();

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(50, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(isSith ? 220 : 300, ctx.currentTime + 0.4);
        
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
    };

    // Play clash sound using the shared audio helper
    const playClash = () => {
        if (isMuted) return;
        playClashSound(0.4);
    };

    // Handle Mute changes
    useEffect(() => {
        if (mainGainRef.current && audioCtxRef.current) {
            mainGainRef.current.gain.setValueAtTime(isMuted ? 0 : 0.15, audioCtxRef.current.currentTime);
        }
    }, [isMuted]);

    // Handle saber states audio gain adjustments
    useEffect(() => {
        if (!audioCtxRef.current) return;

        const ctx = audioCtxRef.current;
        if (leftHumOscRef.current) {
            const node = (leftHumOscRef.current as any).gainNode;
            if (node) {
                node.gain.linearRampToValueAtTime(leftActive ? 0.8 : 0, ctx.currentTime + 0.2);
            }
        }
    }, [leftActive]);

    useEffect(() => {
        if (!audioCtxRef.current) return;

        const ctx = audioCtxRef.current;
        if (rightHumOscRef.current) {
            const node = (rightHumOscRef.current as any).gainNode;
            if (node) {
                node.gain.linearRampToValueAtTime(rightActive ? 0.8 : 0, ctx.currentTime + 0.2);
            }
        }
    }, [rightActive]);

    // Check if clashing conditions are met
    useEffect(() => {
        const clashing = leftActive && rightActive;
        setIsClashing(clashing);

        if (clashing && leftActive && rightActive) {
            playClash();
        }
    }, [leftActive, rightActive]);

    // Spark Canvas Animation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = 300;
        canvas.height = 300;

        let animationId: number;

        const spawnSparks = (x: number, y: number, count: number) => {
            const colors = ['#fff', '#FFE81F', '#ef4444', '#3b82f6', '#10b981'];
            for (let i = 0; i < count; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 5 + 2;
                sparksRef.current.push({
                    x,
                    y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed - 1.5, // drift upwards slightly
                    size: Math.random() * 3 + 1,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    life: 0,
                    maxLife: Math.random() * 30 + 15,
                });
            }
        };

        const drawSparks = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const sparks = sparksRef.current;

            // If clashing, constantly spawn sparks in the center
            if (isClashing) {
                spawnSparks(canvas.width / 2, canvas.height / 2 - 20, Math.random() > 0.5 ? 2 : 1);
            }

            for (let i = sparks.length - 1; i >= 0; i--) {
                const s = sparks[i];
                s.life++;

                if (s.life >= s.maxLife) {
                    sparks.splice(i, 1);
                    continue;
                }

                s.x += s.vx;
                s.y += s.vy;
                s.vy += 0.05; // gravity

                const alpha = 1 - s.life / s.maxLife;

                ctx.beginPath();
                ctx.fillStyle = s.color;
                ctx.globalAlpha = alpha;
                ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
                ctx.fill();
            }
            
            ctx.globalAlpha = 1.0;
            animationId = requestAnimationFrame(drawSparks);
        };

        drawSparks();

        return () => {
            cancelAnimationFrame(animationId);
        };
    }, [isClashing]);

    const handleLeftToggle = () => {
        initAudio();
        const newState = !leftActive;
        setLeftActive(newState);
        if (newState) playIgniteSound(false);
    };

    const handleRightToggle = () => {
        initAudio();
        const newState = !rightActive;
        setRightActive(newState);
        if (newState) playIgniteSound(true);
    };

    const triggerManualClash = () => {
        initAudio();
        if (leftActive && rightActive) {
            playClash();
            // Spawn intensive burst of sparks
            const canvas = canvasRef.current;
            if (canvas) {
                sparksRef.current = []; // clear first
                // spawn 40 sparks
                const colors = ['#fff', '#FFE81F', '#ef4444', '#3b82f6'];
                for (let i = 0; i < 40; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const speed = Math.random() * 8 + 4;
                    sparksRef.current.push({
                        x: canvas.width / 2,
                        y: canvas.height / 2 - 20,
                        vx: Math.cos(angle) * speed,
                        vy: Math.sin(angle) * speed - 2,
                        size: Math.random() * 4 + 1.5,
                        color: colors[Math.floor(Math.random() * colors.length)],
                        life: 0,
                        maxLife: Math.random() * 40 + 20,
                    });
                }
            }
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center p-6 mx-auto mt-10 force-float select-none max-w-lg h-[400px]">
            {/* Audio Toggle */}
            <button
                onClick={() => {
                    initAudio();
                    const newMuted = !isMuted;
                    setIsMuted(newMuted);
                    if (typeof window !== 'undefined') {
                        sessionStorage.setItem('audioConsent', newMuted ? 'false' : 'true');
                    }
                }}
                className="absolute top-0 right-4 p-2 rounded-full border border-border bg-card/60 text-muted-foreground hover:text-foreground hover:bg-card transition-colors z-20 cursor-pointer"
                title={isMuted ? "Enable Lightsaber Sound" : "Mute Sound"}
            >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-primary" />}
            </button>

            {/* Lightsaber Arena */}
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                
                {/* Clash Energy Spark Canvas */}
                <canvas 
                    ref={canvasRef} 
                    onClick={triggerManualClash}
                    className="absolute z-10 w-[300px] h-[300px] pointer-events-auto cursor-pointer"
                />

                {/* Left Lightsaber (Jedi Blue) */}
                <div 
                    onClick={handleLeftToggle}
                    className={`absolute flex flex-col items-center origin-bottom transition-all duration-700 ease-out cursor-pointer z-0
                        ${isClashing 
                            ? 'left-[10%] bottom-[10%] rotate-[45deg] scale-100 hover:scale-105' 
                            : 'left-[25%] bottom-[15%] rotate-[15deg] hover:scale-105'
                        }
                    `}
                    title="Click to ignite/retract Jedi Saber"
                >
                    {/* Glowing Blade */}
                    <div 
                        className={`w-2.5 rounded-t-full transition-all duration-500 origin-bottom
                            ${leftActive ? 'h-64 lightsaber-jedi-glow saber-humming opacity-100' : 'h-0 opacity-0'}
                        `}
                    />
                    {/* Metal Hilt */}
                    <div className="w-4 h-12 rounded-b bg-gradient-to-r from-neutral-400 via-neutral-300 to-neutral-500 border border-neutral-600 shadow-md relative">
                        <div className="absolute top-2 left-0 right-0 h-1 bg-black" />
                        <div className="absolute top-4 left-0 right-0 h-1 bg-black" />
                        <div className="absolute bottom-2 left-1.5 w-1 h-3 rounded-full bg-red-600" />
                        <div className="absolute top-1.5 right-1 w-1 h-1.5 rounded-sm bg-blue-500" />
                    </div>
                </div>

                {/* Right Lightsaber (Sith Red) */}
                <div 
                    onClick={handleRightToggle}
                    className={`absolute flex flex-col items-center origin-bottom transition-all duration-700 ease-out cursor-pointer z-0
                        ${isClashing 
                            ? 'right-[10%] bottom-[10%] rotate-[-45deg] scale-100 hover:scale-105' 
                            : 'right-[25%] bottom-[15%] rotate-[-15deg] hover:scale-105'
                        }
                    `}
                    title="Click to ignite/retract Sith Saber"
                >
                    {/* Glowing Blade */}
                    <div 
                        className={`w-2.5 rounded-t-full transition-all duration-500 origin-bottom
                            ${rightActive ? 'h-64 lightsaber-sith-glow saber-humming opacity-100' : 'h-0 opacity-0'}
                        `}
                    />
                    {/* Metal Hilt */}
                    <div className="w-4 h-12 rounded-b bg-gradient-to-r from-neutral-500 via-neutral-400 to-neutral-600 border border-neutral-700 shadow-md relative">
                        <div className="absolute top-2 left-0 right-0 h-1.5 bg-neutral-900" />
                        <div className="absolute top-5 left-0 right-0 h-1.5 bg-neutral-900" />
                        <div className="absolute bottom-2 left-1.5 w-1.5 h-2 rounded-sm bg-red-600" />
                    </div>
                </div>

                {/* Clash Center Blast Ring */}
                {isClashing && (
                    <div className="absolute w-8 h-8 rounded-full bg-white opacity-80 border-4 border-yellow-400 animate-ping z-10 pointer-events-none" />
                )}
            </div>

            {/* Labels and interactive text */}
            <div className="text-center mt-4">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    {isClashing ? "Benturan Force Terdeteksi!" : "Ignite pedang untuk memulai benturan"}
                </p>
                <p className="text-[10px] text-muted-foreground/60 mt-1 select-none">
                    Klik pedang untuk menyalakan/mematikan • Klik titik benturan untuk memercikkan Force!
                </p>
            </div>
        </div>
    );
}

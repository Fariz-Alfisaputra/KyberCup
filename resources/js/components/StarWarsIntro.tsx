import { Volume2, VolumeX } from 'lucide-react';
import { useEffect, useState } from 'react';
import { playIntroTheme, stopIntroTheme } from '@/lib/audio';

interface StarWarsIntroProps {
    onClose: () => void;
}

type Step = 'consent' | 'pre-crawl' | 'crawl';

export default function StarWarsIntro({ onClose }: StarWarsIntroProps) {
    const [step, setStep] = useState<Step>('consent');
    const [muted, setMuted] = useState(false);

    // Skip helper
    const handleSkip = () => {
        stopIntroTheme();
        onClose();
    };

    // Consent choice handler
    const handleStart = (withSound: boolean) => {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem(
                'audioConsent',
                withSound ? 'true' : 'false',
            );
        }

        if (withSound) {
            setMuted(false);
            setStep('pre-crawl');
        } else {
            setMuted(true);
            setStep('pre-crawl');
        }
    };

    // Stage progression
    useEffect(() => {
        if (step === 'pre-crawl') {
            // Blue text displays for 4.5 seconds, then starts the crawl
            const timer = setTimeout(() => {
                setStep('crawl');
            }, 4500);

            return () => clearTimeout(timer);
        }

        if (step === 'crawl') {
            // Start the music if not muted
            if (!muted) {
                playIntroTheme();
            }

            // Auto-close after crawl finishes (approx 52 seconds)
            const timer = setTimeout(() => {
                handleSkip();
            }, 52000);

            return () => clearTimeout(timer);
        }
    }, [step, muted]);

    // Handle mid-crawl mute toggle
    const handleMuteToggle = () => {
        if (muted) {
            setMuted(false);

            if (typeof window !== 'undefined') {
                sessionStorage.setItem('audioConsent', 'true');
            }

            playIntroTheme();
        } else {
            setMuted(true);

            if (typeof window !== 'undefined') {
                sessionStorage.setItem('audioConsent', 'false');
            }

            stopIntroTheme();
        }
    };

    // Ensure audio stops on unmount
    useEffect(() => {
        return () => {
            stopIntroTheme();
        };
    }, []);

    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#030305] font-sans text-white select-none">
            {/* Ambient Starfield (Independent from main page for performance) */}
            <div className="absolute inset-0 bg-[radial-gradient(1px_1px_at_20px_30px,#fff,rgba(0,0,0,0)),radial-gradient(1.5px_1.5px_at_40px_70px,#fff,rgba(0,0,0,0)),radial-gradient(2px_2px_at_120px_150px,var(--accent-gold-bg),rgba(0,0,0,0)),radial-gradient(1px_1px_at_200px_80px,#fff,rgba(0,0,0,0))] bg-[size:300px_300px] bg-repeat opacity-40" />

            {/* Skip Button (Visible in pre-crawl and crawl states) */}
            {step !== 'consent' && (
                <button
                    onClick={handleSkip}
                    className="absolute top-6 right-6 z-50 cursor-pointer rounded-lg border border-[var(--border-accent)] bg-[var(--bg-hover)] px-4 py-2 text-xs font-bold tracking-widest text-[var(--accent-primary)] transition-all duration-300 hover:bg-[var(--accent-primary)] hover:text-black"
                >
                    LEWATI INTRO
                </button>
            )}

            {/* Audio Toggle (Visible only in crawl state) */}
            {step === 'crawl' && (
                <button
                    onClick={handleMuteToggle}
                    className="absolute top-6 left-6 z-50 cursor-pointer rounded-lg border border-[var(--border-default)] bg-black/40 p-3 text-[var(--accent-primary)] transition-colors hover:bg-black/60 hover:text-[var(--text-primary)]"
                    title={muted ? 'Nyalakan Musik' : 'Senyapkan'}
                >
                    {muted ? (
                        <VolumeX className="h-4 w-4" />
                    ) : (
                        <Volume2 className="h-4 w-4 animate-pulse" />
                    )}
                </button>
            )}

            {/* STEP 1: Consent / Sound selection */}
            {step === 'consent' && (
                <div className="animate-fade-in relative z-10 max-w-md px-6 text-center">
                    <h2 className="mb-8 text-sm font-black tracking-[0.3em] text-[var(--accent-gold)] uppercase">
                        MENGHUBUNGKAN KE HOLONET GALAKSI...
                    </h2>
                    <p className="mb-10 text-xs leading-relaxed tracking-wider text-zinc-400">
                        Untuk pengalaman penuh cinematic galaksi dengan musik
                        synthesizer real-time, silakan pilih masuk dengan suara.
                    </p>
                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <button
                            onClick={() => handleStart(true)}
                            className="w-full cursor-pointer rounded-xl bg-[var(--accent-gold)] px-8 py-3.5 text-xs font-extrabold tracking-widest text-black shadow-[0_0_20px_var(--accent-gold-bg)] transition-all hover:scale-105 hover:shadow-[0_0_30px_var(--accent-gold-bg)] sm:w-auto"
                        >
                            MASUK DENGAN MUSIK
                        </button>
                        <button
                            onClick={() => handleStart(false)}
                            className="w-full cursor-pointer rounded-xl border border-zinc-700 bg-zinc-900/60 px-8 py-3.5 text-xs font-extrabold tracking-widest text-zinc-300 transition-all hover:scale-105 hover:bg-zinc-800 sm:w-auto"
                        >
                            MASUK HENING
                        </button>
                    </div>
                </div>
            )}

            {/* STEP 2: Pre-Crawl "A long time ago..." */}
            {step === 'pre-crawl' && (
                <div className="relative z-10 max-w-lg animate-[fade-in-out_4.2s_ease-in-out_forwards] px-8 text-center">
                    <p className="text-xl leading-relaxed font-medium tracking-wider text-[var(--accent-primary)] drop-shadow-[0_0_10px_var(--accent-primary-glow)]">
                        A long time ago in a galaxy far, far away...
                    </p>
                </div>
            )}

            {/* STEP 3: Main Star Wars Crawl */}
            {step === 'crawl' && (
                <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
                    {/* Yellow Logo Zooming out */}
                    <div className="pointer-events-none absolute z-20 flex animate-[logo-zoom_7s_cubic-bezier(0.12,0.85,0.3,1)_forwards] items-center justify-center select-none">
                        <h1 className="text-7xl font-black tracking-tighter text-[var(--accent-gold)] drop-shadow-[0_0_30px_var(--accent-gold-bg)] select-none sm:text-9xl">
                            KYBER
                            <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.6)]">
                                CUP
                            </span>
                        </h1>
                    </div>

                    {/* Crawl Text Container */}
                    <div className="crawl-perspective pointer-events-none flex h-[70vh] w-full max-w-4xl items-end justify-center select-none">
                        {/* Fade-out Overlay at the top */}
                        <div className="pointer-events-none absolute top-0 right-0 left-0 z-10 h-40 bg-gradient-to-b from-[#030305] via-[#030305]/70 to-transparent" />

                        {/* Crawling Text */}
                        <div className="crawl-scroll w-[75%] text-center text-lg leading-[1.7] font-bold tracking-[0.15em] text-[var(--accent-gold)] select-none sm:w-[60%] sm:text-xl">
                            <p className="mb-2 text-center text-sm font-black tracking-[0.4em] uppercase">
                                EPISODE IV
                            </p>
                            <h2 className="mb-12 text-center text-2xl font-black tracking-[0.2em] uppercase sm:text-3xl">
                                BANGKITNYA SANG JUARA
                            </h2>

                            <p className="mb-8 text-justify">
                                Di tengah kedamaian galaksi, turnamen eSport
                                paling legendaris telah tiba. KYBER CUP
                                mengumpulkan petarung terhebat dari seantero
                                luar angkasa untuk bertanding di arena digital.
                            </p>

                            <p className="mb-8 text-justify">
                                Para Jedi dan Sith meletakkan senjata fisik
                                mereka untuk bertarung menggunakan kelincahan
                                tangan dan kekuatan taktik. Mereka memperebutkan
                                hadiah kredit galaksi melimpah dan gelar Master
                                Arena tertinggi.
                            </p>

                            <p className="mb-8 text-justify">
                                Pilihlah kubumu: JEDI yang menjaga harmoni dan
                                kedamaian, atau SITH yang mendominasi dengan
                                kemarahan dan ambisi. Biarkan kekuatan Force
                                menuntun jemarimu menuju kemenangan mutlak...
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Custom Animations defined inline for portability */}
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in {
                    animation: fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                @keyframes fade-in-out {
                    0% { opacity: 0; }
                    15%, 85% { opacity: 1; }
                    100% { opacity: 0; }
                }
                @keyframes logo-zoom {
                    0% { transform: scale(3.5); opacity: 0; }
                    5% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: scale(0.08); opacity: 0; }
                }
            `}</style>
        </div>
    );
}

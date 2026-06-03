// Web Audio API Star Wars Synthesizer
// Generates lightsaber and cinematic theme sounds dynamically without external audio files.

let audioCtx: AudioContext | null = null;
let activeIntroNodes: { osc: OscillatorNode; gain: GainNode }[] = [];
let introTimeoutIds: number[] = [];

function getAudioContext(): AudioContext {
    if (!audioCtx) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

/**
 * Synthesizes a lightsaber ignition sound.
 * @param theme - 'jedi', 'sith', or 'neutral'
 */
export function playSaberIgnite(theme: 'jedi' | 'sith' | 'neutral'): void {
    try {
        const ctx = getAudioContext();
        const now = ctx.currentTime;

        // 1. Primary Blade Plasma Sound
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const mainGain = ctx.createGain();

        // Wave types based on theme
        if (theme === 'jedi') {
            osc1.type = 'triangle';
            osc2.type = 'sine'; // cleaner, purer tone
        } else if (theme === 'sith') {
            osc1.type = 'sawtooth';
            osc2.type = 'sawtooth'; // highly aggressive buzz
        } else { // neutral
            osc1.type = 'sawtooth';
            osc2.type = 'triangle'; // warm, metallic hybrid
        }

        const startFreq = 40;
        let endFreq = 160;
        if (theme === 'jedi') endFreq = 210;
        if (theme === 'sith') endFreq = 125;
        if (theme === 'neutral') endFreq = 155;

        osc1.frequency.setValueAtTime(startFreq, now);
        osc1.frequency.exponentialRampToValueAtTime(endFreq, now + 0.35);

        osc2.frequency.setValueAtTime(startFreq + 5, now);
        osc2.frequency.exponentialRampToValueAtTime(endFreq + 4, now + 0.38); // Detuned for thickness

        // High frequency hiss on ignition
        const noiseOsc = ctx.createOscillator();
        const noiseGain = ctx.createGain();
        noiseOsc.type = 'triangle';
        noiseOsc.frequency.setValueAtTime(200, now);
        noiseOsc.frequency.exponentialRampToValueAtTime(theme === 'jedi' ? 8000 : 5000, now + 0.15);

        // Lowpass filter settings
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(100, now);
        filter.frequency.exponentialRampToValueAtTime(
            theme === 'jedi' ? 1000 : (theme === 'neutral' ? 750 : 450), 
            now + 0.3
        );
        filter.Q.setValueAtTime(3, now);

        // Main Volume Envelope
        mainGain.gain.setValueAtTime(0, now);
        mainGain.gain.linearRampToValueAtTime(theme === 'jedi' ? 0.25 : 0.35, now + 0.08); // Quick ignition swell
        mainGain.gain.exponentialRampToValueAtTime(0.06, now + 0.5); // Decay to a quiet hum
        mainGain.gain.setValueAtTime(0.06, now + 0.8);
        mainGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2); // Fade out

        // Noise Envelope
        noiseGain.gain.setValueAtTime(0.3, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

        // Connections
        osc1.connect(filter);
        osc2.connect(filter);
        noiseOsc.connect(noiseGain);

        filter.connect(mainGain);
        noiseGain.connect(ctx.destination);
        mainGain.connect(ctx.destination);

        // Start/Stop
        osc1.start(now);
        osc2.start(now);
        noiseOsc.start(now);

        osc1.stop(now + 1.25);
        osc2.stop(now + 1.25);
        noiseOsc.stop(now + 0.25);
    } catch (e) {
        console.warn("Failed to play lightsaber ignition sound:", e);
    }
}


/**
 * Synthesizes a brassy trumpet/synth note.
 */
function playBrassNote(ctx: AudioContext, freq: number, startTime: number, duration: number, volume = 0.25): void {
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gainNode = ctx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'sawtooth';

    // Set frequencies with slight detune
    osc1.frequency.setValueAtTime(freq, startTime);
    osc2.frequency.setValueAtTime(freq * 1.008, startTime); // chorus/brass thickness

    // Filter Envelope (creates the "brass" trumpet attack sweep)
    filter.type = 'lowpass';
    filter.Q.setValueAtTime(2, startTime);
    filter.frequency.setValueAtTime(freq * 1.5, startTime);
    filter.frequency.exponentialRampToValueAtTime(freq * 6, startTime + 0.08); // Sweep up on attack
    filter.frequency.exponentialRampToValueAtTime(freq * 2.5, startTime + duration); // Sweep down on sustain

    // Amplitude Envelope
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.05); // Attack
    gainNode.gain.setValueAtTime(volume, startTime + duration - 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration); // Release

    // Connections
    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Playback
    osc1.start(startTime);
    osc2.start(startTime);

    const stopTime = startTime + duration;
    osc1.stop(stopTime);
    osc2.stop(stopTime);

    activeIntroNodes.push({ osc: osc1, gain: gainNode });
    activeIntroNodes.push({ osc: osc2, gain: gainNode });
}

/**
 * Plays a deep backing chord for majestic feel.
 */
function playBackingChord(ctx: AudioContext, frequencies: number[], startTime: number, duration: number, volume = 0.15): void {
    frequencies.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = 'triangle'; // Warm, deep tone
        osc.frequency.setValueAtTime(freq, startTime);

        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.2); // Slow swell
        gainNode.gain.setValueAtTime(volume, startTime + duration - 0.2);
        gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration);

        activeIntroNodes.push({ osc, gain: gainNode });
    });
}

/**
 * Sequentially schedules and plays the Star Wars intro theme.
 */
export function playIntroTheme(): void {
    try {
        stopIntroTheme(); // Stop any currently playing audio first

        const ctx = getAudioContext();
        const now = ctx.currentTime;

        // Frequencies in Hz
        const Bb1 = 58.27;
        const F1 = 43.65;
        const Bb2 = 116.54;
        const F2 = 87.31;
        const Eb2 = 77.78;
        const G2 = 98.00;
        const D2 = 73.42;
        const C2 = 65.41;

        const Bb3 = 233.08;
        const F4 = 349.23;
        const Eb4 = 311.13;
        const D4 = 293.66;
        const C4 = 261.63;
        const G4 = 392.00;
        const Bb4 = 466.16;
        const F5 = 698.46; // F5

        // Backing Chords schedule (relative to 'now')
        // 0.0s - 4.0s: Bb Major
        playBackingChord(ctx, [Bb1, Bb2, F2], now, 4.0, 0.18);
        // 4.1s - 5.4s: Eb Major
        playBackingChord(ctx, [Eb2, Bb2 / 2, G2], now + 4.1, 1.3, 0.15);
        // 5.5s - 9.5s: Bb Major
        playBackingChord(ctx, [Bb1, Bb2, F2], now + 5.5, 4.0, 0.18);
        // 9.6s - 11.1s: F Major
        playBackingChord(ctx, [F1, C2, F2], now + 9.6, 1.5, 0.15);
        // 11.2s - 14.0s: G Minor
        playBackingChord(ctx, [G2 / 2, D2, G2], now + 11.2, 2.8, 0.15);
        // 14.1s - 15.9s: Eb Major
        playBackingChord(ctx, [Eb2, Bb2 / 2, G2], now + 14.1, 1.8, 0.15);
        // 16.0s - 19.0s: F Major
        playBackingChord(ctx, [F1, C2, F2], now + 16.0, 3.0, 0.15);

        // Fanfare / Melody notes schedule
        // Section A - Part 1
        playBrassNote(ctx, Bb3, now, 0.5, 0.3);
        playBrassNote(ctx, F4, now + 0.6, 0.5, 0.28);
        playBrassNote(ctx, Eb4, now + 1.2, 0.16, 0.25);
        playBrassNote(ctx, D4, now + 1.38, 0.16, 0.25);
        playBrassNote(ctx, C4, now + 1.56, 0.16, 0.25);
        playBrassNote(ctx, Bb4, now + 1.76, 0.5, 0.3);
        playBrassNote(ctx, F4, now + 2.36, 0.25, 0.25);
        playBrassNote(ctx, Eb4, now + 2.65, 0.16, 0.25);
        playBrassNote(ctx, D4, now + 2.83, 0.16, 0.25);
        playBrassNote(ctx, C4, now + 3.01, 0.16, 0.25);
        playBrassNote(ctx, Bb4, now + 3.2, 0.5, 0.3);
        playBrassNote(ctx, F4, now + 3.8, 0.25, 0.25);
        playBrassNote(ctx, Eb4, now + 4.1, 0.16, 0.25);
        playBrassNote(ctx, D4, now + 4.28, 0.16, 0.25);
        playBrassNote(ctx, Eb4, now + 4.46, 0.16, 0.25);
        playBrassNote(ctx, C4, now + 4.66, 0.8, 0.3);

        // Section A - Part 2
        playBrassNote(ctx, Bb3, now + 5.5, 0.5, 0.3);
        playBrassNote(ctx, F4, now + 6.1, 0.5, 0.28);
        playBrassNote(ctx, Eb4, now + 6.7, 0.16, 0.25);
        playBrassNote(ctx, D4, now + 6.88, 0.16, 0.25);
        playBrassNote(ctx, C4, now + 7.06, 0.16, 0.25);
        playBrassNote(ctx, Bb4, now + 7.26, 0.5, 0.3);
        playBrassNote(ctx, F5, now + 7.86, 0.25, 0.25);
        playBrassNote(ctx, Eb4, now + 8.15, 0.16, 0.25);
        playBrassNote(ctx, D4, now + 8.33, 0.16, 0.25);
        playBrassNote(ctx, C4, now + 8.51, 0.16, 0.25);
        playBrassNote(ctx, Bb4, now + 8.7, 0.5, 0.3);
        playBrassNote(ctx, F5, now + 9.3, 0.25, 0.25);
        playBrassNote(ctx, Eb4, now + 9.6, 0.16, 0.25);
        playBrassNote(ctx, D4, now + 9.78, 0.16, 0.25);
        playBrassNote(ctx, Eb4, now + 9.96, 0.16, 0.25);
        playBrassNote(ctx, C4, now + 10.16, 1.0, 0.3);

        // Section B (Lyrical Melody)
        playBrassNote(ctx, G4, now + 11.2, 0.8, 0.28);
        playBrassNote(ctx, G4, now + 12.1, 0.4, 0.25);
        playBrassNote(ctx, Eb4, now + 12.6, 0.4, 0.25);
        playBrassNote(ctx, D4, now + 13.1, 0.4, 0.25);
        playBrassNote(ctx, C4, now + 13.6, 0.4, 0.25);
        playBrassNote(ctx, Bb3, now + 14.1, 0.8, 0.28);
        playBrassNote(ctx, Bb3, now + 15.0, 0.4, 0.25);
        playBrassNote(ctx, D4, now + 15.5, 0.4, 0.25);
        playBrassNote(ctx, C4, now + 16.0, 1.2, 0.28);
        playBrassNote(ctx, F4, now + 17.3, 0.8, 0.28);
        playBrassNote(ctx, F4, now + 18.2, 0.4, 0.25);

    } catch (e) {
        console.warn("Failed to play synthesized space fanfare:", e);
    }
}


/**
 * Stops the intro theme and clears all active synth nodes.
 */
export function stopIntroTheme(): void {
    // Clear timeouts
    introTimeoutIds.forEach((id) => clearTimeout(id));
    introTimeoutIds = [];

    // Fade out and stop active oscillators
    if (audioCtx) {
        const now = audioCtx.currentTime;
        activeIntroNodes.forEach((node) => {
            try {
                // Smooth fade out to prevent clicks/pops
                node.gain.gain.cancelScheduledValues(now);
                node.gain.gain.setValueAtTime(node.gain.gain.value, now);
                node.gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
                node.osc.stop(now + 0.25);
            } catch (e) {
                // already stopped
            }
        });
    }
    activeIntroNodes = [];
}

/**
 * Plays the lightsaber clash sound using the public MP3 asset.
 */
export function playClashSound(volume = 0.4): void {
    if (typeof window === 'undefined') return;
    const consent = sessionStorage.getItem('audioConsent');
    if (consent !== 'true') return;

    try {
        const audio = new Audio('/lightsaber-clash-03.mp3');
        audio.volume = volume;
        audio.play().catch((e) => {
            console.warn("Failed to play lightsaber clash sound:", e);
        });
    } catch (e) {
        console.warn("Error playing clash sound:", e);
    }
}

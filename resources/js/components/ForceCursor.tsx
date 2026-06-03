import { useEffect, useRef, useState } from 'react';
import { useAppearance } from '@/hooks/use-appearance';
import { playClashSound } from '@/lib/audio';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    alpha: number;
    life: number;
    maxLife: number;
}

export default function ForceCursor() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { resolvedAppearance } = useAppearance(); // 'jedi' | 'sith' | 'neutral'
    const isDark = resolvedAppearance === 'sith' || resolvedAppearance === 'neutral';

    // Target coordinates
    const mouseRef = useRef({ x: 0, y: 0 });
    // Smooth interpolated coordinates (lerped)
    const cursorRef = useRef({ x: 0, y: 0 });
    const isVisibleRef = useRef(false);
    const particlesRef = useRef<Particle[]>([]);

    const [isHovering, setIsHovering] = useState(false);

    // Color definitions based on current active theme
    let glowColor = 'rgba(59, 130, 246, 0.9)'; // Jedi Blue (Default)
    let particleColors = ['#3b82f6', '#60a5fa', '#2563eb', '#dbeafe']; // Jedi Blue spectrum

    if (resolvedAppearance === 'sith') {
        glowColor = 'rgba(239, 68, 68, 0.9)'; // Sith Red
        particleColors = ['#ef4444', '#f87171', '#dc2626', '#ffe4e6']; // Sith Red spectrum
    } else if (resolvedAppearance === 'neutral') {
        glowColor = 'rgba(255, 232, 31, 0.95)'; // Smuggler/Intro Yellow
        particleColors = ['#ffe81f', '#facc15', '#eab308', '#fef08a']; // Yellow/Gold spectrum
    }

    useEffect(() => {
        // Only enable custom cursor for devices with fine pointers (mouse)
        const isFinePointer = window.matchMedia('(pointer: fine)').matches;
        if (!isFinePointer) return;

        // Add class to hide default cursor
        document.documentElement.classList.add('custom-cursor-active');

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
            if (!isVisibleRef.current) {
                isVisibleRef.current = true;
                // Instantly snap to first position to avoid jumping
                cursorRef.current.x = e.clientX;
                cursorRef.current.y = e.clientY;
            }
        };

        const handleMouseLeave = () => {
            isVisibleRef.current = false;
        };

        const handleMouseEnter = (e: MouseEvent) => {
            isVisibleRef.current = true;
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
        };

        // Create spark burst on click
        const handleClick = (e: MouseEvent) => {
            playClashSound(0.2); // Play clash sound when clicking (custom cursor sparks)

            const burstCount = 18;
            for (let i = 0; i < burstCount; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 5 + 2;
                particlesRef.current.push({
                    x: e.clientX,
                    y: e.clientY,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    size: Math.random() * 4 + 1.5,
                    color: particleColors[Math.floor(Math.random() * particleColors.length)],
                    alpha: 1.0,
                    life: 0,
                    maxLife: Math.random() * 25 + 15
                });
            }
        };

        // Detect hover on interactive elements
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement | null;
            if (target && (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.tagName === 'SELECT' ||
                target.tagName === 'INPUT' ||
                target.closest('a') ||
                target.closest('button') ||
                target.closest('[role="button"]') ||
                target.classList.contains('cursor-pointer')
            )) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('mouseenter', handleMouseEnter);
        window.addEventListener('click', handleClick);
        window.addEventListener('mouseover', handleMouseOver);

        handleResize();

        // Spawn a trailing particle
        const spawnTrailParticle = (x: number, y: number) => {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 0.6;
            particlesRef.current.push({
                x,
                y,
                vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 0.2,
                vy: Math.sin(angle) * speed - 0.3, // slight upward float
                size: Math.random() * 3 + 1,
                color: particleColors[Math.floor(Math.random() * particleColors.length)],
                alpha: 0.8,
                life: 0,
                maxLife: Math.random() * 20 + 10
            });
        };

        // Render loop
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 1. Update and draw particles
            const particles = particlesRef.current;
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.life++;

                if (p.life >= p.maxLife) {
                    particles.splice(i, 1);
                    continue;
                }

                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.01; // slight gravity
                p.alpha = 1 - p.life / p.maxLife;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.alpha;
                ctx.shadowBlur = 4;
                ctx.shadowColor = p.color;
                ctx.fill();
            }

            // Reset alpha/shadow for main cursor drawing
            ctx.globalAlpha = 1.0;
            ctx.shadowBlur = 0;

            // 2. Draw Lightsaber Cursor if visible
            if (isVisibleRef.current) {
                // Lerp smoothing (creates floaty feeling of the Force)
                const lerpFactor = 0.25;
                cursorRef.current.x += (mouseRef.current.x - cursorRef.current.x) * lerpFactor;
                cursorRef.current.y += (mouseRef.current.y - cursorRef.current.y) * lerpFactor;

                const { x, y } = cursorRef.current;

                // Spawn trails when moving
                const distMoved = Math.hypot(mouseRef.current.x - x, mouseRef.current.y - y);
                if (distMoved > 2 && Math.random() > 0.3) {
                    spawnTrailParticle(x, y);
                }

                // Draw Saber Hilt and Blade
                ctx.save();
                ctx.translate(x, y);

                // Rotate slightly when moving
                const dx = mouseRef.current.x - x;
                const dy = mouseRef.current.y - y;
                const angle = Math.atan2(dy, dx) + Math.PI / 4; // tilt 45deg base
                ctx.rotate(angle);

                // Saber scale changes on hover
                const saberScale = isHovering ? 1.4 : 1.0;
                ctx.scale(saberScale, saberScale);

                // Draw Glow aura
                ctx.shadowBlur = isHovering ? 16 : 10;
                ctx.shadowColor = glowColor;

                // 1. Blade Outer Glow
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(-4, -18); // blade extends up-left
                ctx.lineWidth = isHovering ? 6 : 4.5;
                ctx.lineCap = 'round';
                ctx.strokeStyle = glowColor;
                ctx.stroke();

                // 2. Blade White Core
                ctx.shadowBlur = 0; // reset shadow for core
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(-4, -18);
                ctx.lineWidth = isHovering ? 3 : 2;
                ctx.lineCap = 'round';
                ctx.strokeStyle = '#ffffff';
                ctx.stroke();

                // 3. Draw tiny metallic Hilt
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(1.5, 6);
                ctx.lineWidth = 3.5;
                ctx.lineCap = 'butt';
                ctx.strokeStyle = isDark ? '#4b5563' : '#9ca3af'; // dark metal vs chrome
                ctx.stroke();

                // Small theme-colored activation button on hilt
                ctx.beginPath();
                ctx.arc(0.7, 3, 0.6, 0, Math.PI * 2);
                ctx.fillStyle = resolvedAppearance === 'sith' 
                    ? '#ef4444' 
                    : (resolvedAppearance === 'neutral' ? '#ffe81f' : '#3b82f6');
                ctx.fill();

                ctx.restore();
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('mouseenter', handleMouseEnter);
            window.removeEventListener('click', handleClick);
            window.removeEventListener('mouseover', handleMouseOver);
            document.documentElement.classList.remove('custom-cursor-active');
        };
    }, [resolvedAppearance, isHovering, particleColors, glowColor]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-[9999]"
        />
    );
}


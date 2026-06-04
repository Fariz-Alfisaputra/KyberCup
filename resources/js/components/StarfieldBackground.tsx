import { useEffect, useRef } from 'react';
import { useAppearance } from '@/hooks/use-appearance';

interface Star {
    x: number;
    y: number;
    z: number;
    color: string;
}

interface LightParticle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    hexColor: string;
    alpha: number;
    angle: number;
    speed: number;
}

export default function StarfieldBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { resolvedAppearance } = useAppearance();
    const isDark = resolvedAppearance === 'dark-side';

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        }

        const ctx = canvas.getContext('2d');

        if (!ctx) {
            return;
        }

        let animationFrameId: number;
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        // Mouse position tracking
        const mouse = { x: width / 2, y: height / 2, active: false };

        const handleResize = () => {
            if (!canvas) {
                return;
            }

            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            mouse.active = true;
        };

        const handleMouseLeave = () => {
            mouse.active = false;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        // Dynamic theme color fetching
        const style = getComputedStyle(document.documentElement);
        const accentColor =
            style.getPropertyValue('--accent-primary').trim() || '#185fa5';
        const goldColor =
            style.getPropertyValue('--accent-gold').trim() || '#ffe81f';
        const textColor =
            style.getPropertyValue('--text-primary').trim() || '#ffffff';
        const mutedColor =
            style.getPropertyValue('--text-muted').trim() || '#888888';

        // Helper to convert hex to rgba
        const hexToRgba = (hex: string, alpha: number) => {
            const cleanHex = hex.replace('#', '').trim();
            // Handle shorthand hex like #fff
            let fullHex = cleanHex;

            if (cleanHex.length === 3) {
                fullHex =
                    cleanHex[0] +
                    cleanHex[0] +
                    cleanHex[1] +
                    cleanHex[1] +
                    cleanHex[2] +
                    cleanHex[2];
            }

            const r = parseInt(fullHex.substring(0, 2), 16) || 255;
            const g = parseInt(fullHex.substring(2, 4), 16) || 255;
            const b = parseInt(fullHex.substring(4, 6), 16) || 255;

            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        };

        // Initialize particles/stars
        const maxStars = 180;
        const stars: Star[] = [];
        const starColors = [textColor, goldColor, accentColor, mutedColor];

        for (let i = 0; i < maxStars; i++) {
            stars.push({
                x: Math.random() * width - width / 2,
                y: Math.random() * height - height / 2,
                z: Math.random() * width,
                color: starColors[
                    Math.floor(Math.random() * starColors.length)
                ],
            });
        }

        // Initialize Light Mode particles (Force Dust)
        const maxParticles = 60;
        const particles: LightParticle[] = [];
        const lightColors = [accentColor, goldColor, textColor];

        for (let i = 0; i < maxParticles; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                size: Math.random() * 4 + 2,
                hexColor:
                    lightColors[Math.floor(Math.random() * lightColors.length)],
                alpha: Math.random() * 0.5 + 0.3,
                angle: Math.random() * Math.PI * 2,
                speed: Math.random() * 0.5 + 0.2,
            });
        }

        // Starfield variables
        let speed = 0.8;

        // Render loop
        const draw = () => {
            if (!ctx || !canvas) {
                return;
            }

            // Clear screen
            if (isDark) {
                // Outer space background (pitch black with slight blue tone)
                ctx.fillStyle = 'rgba(3, 3, 5, 0.2)'; // trail effect
                ctx.fillRect(0, 0, width, height);

                // Adjust speed based on mouse distance from center
                if (mouse.active) {
                    const dx = mouse.x - width / 2;
                    const dy = mouse.y - height / 2;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const maxDist = Math.sqrt(
                        (width * width) / 4 + (height * height) / 4,
                    );
                    speed = 0.5 + (dist / maxDist) * 8; // dynamic hyperspace warp speed
                } else {
                    speed = 0.8;
                }

                // Draw Stars
                for (let i = 0; i < maxStars; i++) {
                    const star = stars[i];
                    star.z -= speed;

                    // Reset star if it reaches the viewer
                    if (star.z <= 0) {
                        star.x = Math.random() * width - width / 2;
                        star.y = Math.random() * height - height / 2;
                        star.z = width;
                    }

                    // Project 3D coordinates onto 2D screen
                    const k = 128.0 / star.z;
                    const px = star.x * k + width / 2;
                    const py = star.y * k + height / 2;

                    // If off screen, reset
                    if (px < 0 || px > width || py < 0 || py > height) {
                        star.x = Math.random() * width - width / 2;
                        star.y = Math.random() * height - height / 2;
                        star.z = width;
                        continue;
                    }

                    // Size grows as star gets closer
                    const size = (1 - star.z / width) * 4;

                    // Draw star trail / dot
                    ctx.beginPath();
                    ctx.fillStyle = star.color;
                    ctx.arc(px, py, size, 0, Math.PI * 2);
                    ctx.fill();

                    // Optional: draw star trails at high speeds
                    if (speed > 4) {
                        ctx.beginPath();
                        ctx.strokeStyle = star.color;
                        ctx.lineWidth = size / 2;
                        // Draw line from previous position
                        const prevK = 128.0 / (star.z + speed * 1.5);
                        const prevX = star.x * prevK + width / 2;
                        const prevY = star.y * prevK + height / 2;
                        ctx.moveTo(prevX, prevY);
                        ctx.lineTo(px, py);
                        ctx.stroke();
                    }
                }
            } else {
                // Light mode: Clean, glowing sand or energy dust
                ctx.clearRect(0, 0, width, height);

                // Draw and animate floating Force dust
                for (let i = 0; i < maxParticles; i++) {
                    const p = particles[i];

                    // Gentle float movements using Sine/Cosine wave
                    p.angle += 0.005;
                    p.x += Math.cos(p.angle) * p.speed + p.vx;
                    p.y += Math.sin(p.angle) * p.speed + p.vy;

                    // Boundary checks (wrap around edges)
                    if (p.x < -10) {
                        p.x = width + 10;
                    }

                    if (p.x > width + 10) {
                        p.x = -10;
                    }

                    if (p.y < -10) {
                        p.y = height + 10;
                    }

                    if (p.y > height + 10) {
                        p.y = -10;
                    }

                    // Force push effect: React to mouse position
                    if (mouse.active) {
                        const dx = p.x - mouse.x;
                        const dy = p.y - mouse.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        const maxPushDist = 180;

                        if (dist < maxPushDist) {
                            // Calculate force vector pushing away from mouse
                            const force = (maxPushDist - dist) / maxPushDist;
                            const angle = Math.atan2(dy, dx);
                            // Shift particle position away
                            p.x += Math.cos(angle) * force * 5;
                            p.y += Math.sin(angle) * force * 5;
                        }
                    }

                    // Drawing light floating circles
                    ctx.beginPath();

                    // Create soft glow aura
                    const gradient = ctx.createRadialGradient(
                        p.x,
                        p.y,
                        0,
                        p.x,
                        p.y,
                        p.size * 3,
                    );
                    gradient.addColorStop(0, hexToRgba(p.hexColor, p.alpha));
                    gradient.addColorStop(
                        0.5,
                        hexToRgba(p.hexColor, p.alpha * 0.3),
                    );
                    gradient.addColorStop(1, hexToRgba(p.hexColor, 0));

                    ctx.fillStyle = gradient;
                    ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isDark]);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0 -z-20 h-full w-full transition-all duration-1000"
        />
    );
}

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const RainBackground = () => {
    // Extended array of romantic emojis
    const emojis = ['🌹', '🌸', '💐', '🌺', '❤️', '💖', '🥰', '😍', '✨', '💝', '🦋', '💞'];

    // Generate particles with stable random values
    const particles = useMemo(() => {
        return [...Array(40)].map((_, i) => {
            // Depth factor: 0 (back) to 1 (front)
            const depth = Math.random();

            return {
                id: i,
                emoji: emojis[i % emojis.length],
                // Random horizontal start position (-10% to 110% to cover edges)
                startX: Math.random() * 120 - 10,
                // Random horizontal drift
                endX: Math.random() * 120 - 10,
                // Duration depends on depth (closer items move faster)
                duration: 15 + Math.random() * 15 + (1 - depth) * 10,
                // Delay to stagger starts
                delay: Math.random() * 20,
                // Size: larger for front, smaller for back
                scale: 0.5 + depth * 1.5,
                // Blur: blurrier for back items
                blur: (1 - depth) * 4,
                // Opacity: slightly transparent for back items
                opacity: 0.3 + depth * 0.7,
                // Rotation range
                rotate: Math.random() * 360,
            };
        });
    }, []);

    return (
        <div className="floating-bg" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            pointerEvents: 'none',
            zIndex: 0
        }}>
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    initial={{
                        y: '-10vh',
                        x: `${particle.startX}vw`,
                        opacity: 0,
                        scale: particle.scale,
                        rotate: 0,
                        filter: `blur(${particle.blur}px)`
                    }}
                    animate={{
                        y: '110vh',
                        x: `${particle.endX}vw`,
                        opacity: [0, particle.opacity, particle.opacity, 0],
                        rotate: particle.rotate,
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                        ease: "linear",
                        times: [0, 0.1, 0.9, 1]
                    }}
                    style={{
                        position: 'absolute',
                        willChange: 'transform',
                    }}
                >
                    {particle.emoji}
                </motion.div>
            ))}
        </div>
    );
};

export default RainBackground;

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Easier Difficulty Settings
const GAME_DURATION = 45; // Increased time (was 30)
const WINNING_SCORE = 15; // Reduced score (was 15)
const DROP_SPEED = 20;     // Pixels per frame (Faster!)
const SPAWN_RATE = 500;   // ms between spawns (High density)

const ChocolateGame = ({ onWin }) => {
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
    const [items, setItems] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const containerRef = useRef(null);

    // Game loop for spawning items
    useEffect(() => {
        if (!isPlaying) return;

        const spawnInterval = setInterval(() => {
            const id = Date.now();
            const type = Math.random() > 0.3 ? 'chocolate' : 'bomb'; // 30% chance of bomb

            // Calculate random X position in PERCENTAGE (10% to 90%)
            // This ensures it works on all screen widths without pixel math issues
            const x = Math.random() * 80 + 10;

            setItems(prev => [...prev, { id, x, type, y: -100 }]); // Start above (in %)? Keeping y in pixels for speed consistency or change to vh?
            // Actually, mixing % for X and px for Y is fine. Let's stick to px for Y to keep speed constant.
            // But let's start Y at -100px to be safe.
        }, SPAWN_RATE);

        const timerInterval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    setIsPlaying(false);
                    setGameOver(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            clearInterval(spawnInterval);
            clearInterval(timerInterval);
        };
    }, [isPlaying]);

    // Game loop for moving items
    useEffect(() => {
        if (!isPlaying) return;

        const moveInterval = setInterval(() => {
            setItems(prev => prev
                .map(item => ({ ...item, y: item.y + DROP_SPEED }))
                // Remove items that go off screen (height + padding)
                .filter(item => item.y < (containerRef.current?.offsetHeight || 800) + 100));
        }, 20); // ~50fps

        return () => clearInterval(moveInterval);
    }, [isPlaying]);

    const handleCatch = (id, type) => {
        // Vibrate on mobile if supported
        if (navigator.vibrate) navigator.vibrate(50);

        setItems(prev => prev.filter(item => item.id !== id));
        if (type === 'chocolate') {
            setScore(s => s + 1);
        } else {
            setScore(s => Math.max(0, s - 3)); // Lose 3 points for broccoli
        }
    };

    useEffect(() => {
        if (score >= WINNING_SCORE) {
            setIsPlaying(false);
            onWin();
        }
    }, [score, onWin]);

    const resetGame = () => {
        setIsPlaying(true);
        setScore(0);
        setTimeLeft(GAME_DURATION);
        setItems([]);
        setGameOver(false);
    };

    return (
        <div className="game-area" ref={containerRef}>
            {/* Score & Timer UI */}
            <div className="game-hud">
                <div className="hud-item">
                    Score: {score} / {WINNING_SCORE}
                </div>
                <div className="hud-item">
                    Time: {timeLeft}s
                </div>
            </div>

            {/* Start Screen */}
            {!isPlaying && !gameOver && score < WINNING_SCORE && (
                <div className="game-overlay">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={resetGame}
                        className="btn-start"
                    >
                        Start Game 🍫
                    </motion.button>
                    <div className="text-white mt-6 font-medium px-4 bg-black/30 p-4 rounded-xl backdrop-blur-sm">
                        <p className="mb-2 text-xl">👇 Instructions 👇</p>
                        <ul className="text-left text-lg list-disc pl-6 space-y-1">
                            <li>Tap/Click falling chocolates 🍫</li>
                            <li>Collect <strong>{WINNING_SCORE}</strong> to win!</li>
                            <li>Avoid the broccoli! 🥦</li>
                        </ul>
                    </div>
                </div>
            )}

            {/* Game Over Screen */}
            {gameOver && score < WINNING_SCORE && (
                <div className="game-overlay">
                    <h2 className="text-4xl font-black text-white mb-4 drop-shadow-lg">Time's Up! 😢</h2>
                    <p className="text-xl text-white mb-8">You caught {score} / {WINNING_SCORE} chocolates.</p>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={resetGame}
                        className="btn-start"
                        style={{ background: 'white', color: '#d81b60', border: 'none' }}
                    >
                        Try Again 🔄
                    </motion.button>
                </div>
            )}

            {/* Game Items */}
            <AnimatePresence>
                {items.map(item => (
                    <GameItem
                        key={item.id}
                        item={item}
                        onInteract={() => handleCatch(item.id, item.type)}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

const GameItem = ({ item, onInteract }) => {
    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, top: item.y }} // Directly animate top for position
            exit={{ scale: 0, opacity: 0 }}
            style={{
                position: 'absolute',
                left: `${item.x}%`, // Use PERCENTAGE
                transform: 'translateX(-50%)', // CENTER the item on X
                fontSize: 'clamp(3rem, 15vw, 5rem)', // Even bigger responsive size
                zIndex: 5,
                touchAction: 'none' // Important for mobile touch responsiveness
            }}
            // Handle both mouse and touch events immediately
            onMouseDown={(e) => {
                e.stopPropagation();
                onInteract();
            }}
            onTouchStart={(e) => {
                e.preventDefault(); // Prevent scrolling
                e.stopPropagation();
                onInteract();
            }}
        >
            {item.type === 'chocolate' ? '🍫' : '🥦'}
        </motion.div>
    );
};

export default ChocolateGame;

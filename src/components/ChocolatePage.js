import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ChocolateGame from './ChocolateGame';
import RainBackground from './RainBackground';
import './Chocolate.css'; // Import custom styles

const ChocolatePage = () => {
    const [gameWon, setGameWon] = useState(false);

    return (
        <div className="chocolate-page">
            {/* Background Decor */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="absolute text-4xl animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`
                        }}>
                        ✨
                    </div>
                ))}
            </div>

            <RainBackground emojis={['🍫', '🍬', '🍭', '🧁', '🍪', '🍩', '🤎', '🧡']} />

            <div className="max-w-md w-full z-10 flex flex-col items-center">
                {!gameWon ? (
                    <>
                        <motion.h1
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="chocolate-title"
                        >
                            Happy Chocolate Day! 🍫
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="chocolate-subtitle"
                        >
                            I want to give you something sweet, but you have to earn it first! 😉
                        </motion.p>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="game-container-wrapper"
                        >
                            <ChocolateGame onWin={() => setGameWon(true)} />
                        </motion.div>
                    </>
                ) : (
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="win-card"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, loop: Infinity, ease: "linear" }}
                            className="win-icon"
                        >
                            🎉
                        </motion.div>
                        <h2 className="win-title">YOU WON! 🏆</h2>
                        <p className="win-text">
                            You are officially eligible for <br />
                            <span className="font-bold text-xl px-2 py-1 rounded mx-1" style={{ backgroundColor: '#5d4037', color: '#d7ccc8' }}>ANY CHOCOLATE</span>
                            <br />your heart desires!
                        </p>

                        <div className="highlight-box">
                            <p className="coupon-label">OFFICIAL COUPON</p>
                            <p className="coupon-value">1 FREE CHOCOLATE</p>
                            <p className="text-xs text-yellow-700">Valid Forever • Non-Transferable • With Lots of Love</p>
                        </div>

                        <div className="animate-bounce">
                            <p className="screenshot-text">
                                📸 SCREENSHOT THIS & SEND TO ME! 📸
                            </p>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ChocolatePage;

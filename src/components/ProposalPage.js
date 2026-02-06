import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Stars } from 'lucide-react';
import RainBackground from './RainBackground'; // Import the new component

const ProposalPage = () => {
    const [yesScale, setYesScale] = useState(1);
    const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
    const [accepted, setAccepted] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    // Moves the "No" button to a random position
    const moveNoButton = () => {
        const isMobile = window.innerWidth < 768;
        const range = isMobile ? 50 : 100; // Smaller range for mobile

        const x = Math.random() * (range * 2) - range;
        const y = Math.random() * (range * 2) - range;

        setNoPosition({ x, y });
        setYesScale((prev) => prev + 0.2); // Make YES bigger
    };

    const handleNoClick = () => {
        setShowPopup(true);
        // Hide popup after 3 seconds
        setTimeout(() => setShowPopup(false), 3000);
        moveNoButton();
    };

    const handleYesClick = () => {
        setAccepted(true);
    };

    if (accepted) {
        return (
            <div className="app-container">
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', duration: 0.8 }}
                    className="card"
                >
                    <h1>YAYYYY! 🎉</h1>
                    <p style={{ fontSize: '1.5rem' }}>
                        I knew you would say yes! <br />
                        You are my everything, Trisha! ❤️
                    </p>
                    <div style={{ fontSize: '4rem', marginTop: '20px' }}>
                        💑🌹💖
                    </div>
                </motion.div>
                <RainBackground />
            </div>
        );
    }

    return (
        <div className="app-container">
            <RainBackground />

            <motion.div
                className="card"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1>Will you be my Valentine?</h1>
                <p>There's no one else I'd rather annoy for the rest of my life. 🥺👉👈</p>

                <div className="proposal-container">
                    <motion.button
                        className="btn btn-yes"
                        style={{ scale: yesScale }}
                        whileHover={{ scale: yesScale + 0.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleYesClick}
                    >
                        YES <Stars size={20} style={{ display: 'inline', marginLeft: '5px' }} />
                    </motion.button>

                    <motion.button
                        className="btn btn-no"
                        animate={{ x: noPosition.x, y: noPosition.y }}
                        onHoverStart={moveNoButton}
                        onClick={handleNoClick}
                        onTouchStart={moveNoButton}
                        transition={{ type: 'spring', stiffness: 500, damping: 10, mass: 0.5 }} // Faster movement
                    >
                        No
                    </motion.button>
                </div>

                {showPopup && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: "-50%", x: "-50%" }}
                        animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
                        exit={{ opacity: 0, scale: 0.8, y: "-50%", x: "-50%" }}
                        style={{
                            position: 'fixed', // Fixed works better to center on screen
                            top: '50%',
                            left: '50%',
                            // transform is handled by animate prop for smooth entry
                            background: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(10px)',
                            padding: '2rem',
                            borderRadius: '20px',
                            boxShadow: '0 10px 40px rgba(225, 29, 72, 0.3)',
                            zIndex: 1000,
                            pointerEvents: 'none',
                            width: '90%', // Responsive width
                            maxWidth: '400px', // Max width for desktop
                            textAlign: 'center',
                            border: '2px solid rgba(225, 29, 72, 0.1)',
                        }}
                    >
                        <p style={{ margin: 0, fontWeight: 'bold', color: 'var(--rose-red)', fontSize: '1.2rem', lineHeight: '1.5' }}>
                            bhen ki pakodi chal YES dba chup chap aayi badi 😤
                        </p>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default ProposalPage;

import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import RainBackground from './RainBackground';

const LandingPage = ({ onContinue }) => {
    return (
        <div className="app-container">
            <RainBackground />

            <motion.div
                className="card"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <motion.h1
                    initial={{ y: -50 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                >
                    Happy Rose Day!
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    style={{ fontSize: '1.5rem', lineHeight: '1.6', fontWeight: 500 }}
                >
                    "hey trisha meri SHUGGU MUGGU mela bchha happy Rose day"
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                >
                    <button className="btn btn-primary" onClick={onContinue}>
                        Continue <Heart size={20} style={{ display: 'inline', marginLeft: '8px', fill: 'white' }} />
                    </button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default LandingPage;

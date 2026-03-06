import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navigation = () => {
    const [scrolled, setScrolled] = useState(false);
    const [scrollDir, setScrollDir] = useState('up');
    const [lastY, setLastY] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            setScrolled(y > 80);
            setScrollDir(y > lastY && y > 80 ? 'down' : 'up');
            setLastY(y);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [lastY]);

    const links = ['About', 'Skills', 'Projects', 'AI Lab', 'Contact'];
    const isCollapsed = scrolled && scrollDir === 'down';

    return (
        <div style={{ position: 'fixed', top: 28, left: '50%', transform: 'translateX(-50%)', zIndex: 100 }}>
            <motion.div
                layout
                className="nav-pill"
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15, layout: { type: 'spring', stiffness: 380, damping: 28 } }}
            >
                {/* Avatar – always visible */}
                <motion.img
                    layout
                    src="/aryan.jpg"
                    alt="Aryan Somayajula"
                    style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top center', flexShrink: 0, border: '2px solid var(--border)' }}
                />

                <AnimatePresence mode="popLayout" initial={false}>
                    {isCollapsed ? (
                        /* Collapsed: "Available for work" pill */
                        <motion.div
                            key="collapsed"
                            initial={{ opacity: 0, x: 16 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 16, transition: { duration: 0.15 } }}
                            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                            style={{ display: 'flex', alignItems: 'center', gap: 12, paddingLeft: 14, paddingRight: 6 }}
                        >
                            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)', fontFamily: 'Inter', whiteSpace: 'nowrap', letterSpacing: '-0.01em' }}>
                                Available for work
                            </span>
                            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(0,200,83,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <div className="pulse" />
                            </div>
                        </motion.div>
                    ) : (
                        /* Expanded: full nav */
                        <motion.div
                            key="expanded"
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -16, transition: { duration: 0.15 } }}
                            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                            style={{ display: 'flex', alignItems: 'center', gap: 4, paddingLeft: 16 }}
                        >
                            {links.map(l => (
                                <a key={l} href={`#${l.toLowerCase().replace(' ', '')}`} className="nav-link">{l}</a>
                            ))}
                            <a href="#contact" className="nav-cta" style={{ marginLeft: 8 }}>Hire Me</a>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

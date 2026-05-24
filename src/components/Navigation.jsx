import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const Navigation = ({ onToggleTheme, isDark }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const links = [
        { label: 'About', href: '#about' },
        { label: 'Skills', href: '#skills' },
        { label: 'Experience', href: '#experience' },
        { label: 'Projects', href: '#projects' },
        { label: 'AI Lab', href: '#ailab' },
    ];

    return (
        <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
                padding: '0 clamp(20px, 4vw, 64px)',
                height: 64,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: scrolled ? 'var(--surface)' : 'transparent',
                backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
                WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
                borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
                transition: 'background 0.4s, border-color 0.4s, backdrop-filter 0.4s',
            }}
        >
            {/* Logo / Status */}
            <a href="#home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Bebas Neue', fontSize: 20, letterSpacing: '0.04em', color: 'var(--text-1)',
                }}>
                    ARYAN.
                </div>
                
                {/* Status Indicator */}
                <div style={{ 
                    display: 'flex', alignItems: 'center', gap: 8, 
                    padding: '4px 10px', borderRadius: 100, 
                    background: 'var(--surface-2)', border: '1px solid var(--border)',
                }}>
                    <motion.div 
                        animate={{ opacity: [1, 0.4, 1] }} 
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        style={{ width: 6, height: 6, borderRadius: '50%', background: '#00E5A0', boxShadow: '0 0 8px #00E5A0' }}
                    />
                    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-2)' }}>
                        Available for Work
                    </span>
                </div>
            </a>

            {/* Desktop links */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {links.map(l => (
                    <a key={l.label} href={l.href} className="nav-link" style={{ fontSize: 12, padding: '6px 14px' }}>
                        {l.label}
                    </a>
                ))}
                
                {/* Theme Toggle */}
                <button
                    onClick={onToggleTheme}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-2)',
                        cursor: 'none',
                        marginLeft: 16,
                        padding: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 6,
                        transition: 'color 0.2s, background 0.2s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-1)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-2)'; e.currentTarget.style.background = 'transparent' }}
                    title={isDark ? "Switch to light mode" : "Switch to dark mode"}
                >
                    <span style={{ fontSize: 16 }}>{isDark ? '☀️' : '🌙'}</span>
                </button>

                <a
                    href="#contact"
                    className="nav-cta"
                    style={{ marginLeft: 16, padding: '8px 18px', fontSize: 11, letterSpacing: '0.14em' }}
                >
                    Hire Me
                </a>
            </nav>
        </motion.header>
    );
};

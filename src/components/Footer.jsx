import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, MessageCircle, FileText } from 'lucide-react';

export const Footer = () => {
    const links = [
        { label: 'LinkedIn', icon: <Linkedin size={18} />, href: 'https://www.linkedin.com/in/somayajula-aryan-48852a1b5/' },
        { label: 'GitHub', icon: <Github size={18} />, href: 'https://github.com/aryan597' },
        { label: 'Email', icon: <Mail size={18} />, href: 'mailto:somayajulaaryan@gmail.com' },
        { label: 'Call', icon: <Phone size={18} />, href: 'tel:+447407750520' },
        { label: 'WhatsApp', icon: <MessageCircle size={18} />, href: 'https://wa.me/447407750520' },
    ];

    return (
        <footer style={{
            position: 'relative',
            paddingTop: 100,
            paddingBottom: 40,
            overflow: 'hidden',
            background: 'var(--bg-alt)',
            borderTop: '1px solid var(--border)'
        }}>
            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                
                {/* Top Section: Links & Info */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 40,
                    marginBottom: 80
                }}>
                    
                    {/* Social Links Row */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                        {links.map((l, i) => (
                            <motion.a
                                key={l.label}
                                href={l.href}
                                target={l.href.startsWith('http') ? '_blank' : undefined}
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 10,
                                    padding: '12px 24px',
                                    borderRadius: 100,
                                    border: '1px solid var(--border)',
                                    background: 'var(--surface)',
                                    color: 'var(--text-1)',
                                    fontFamily: 'DM Mono, monospace',
                                    fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.05em',
                                    transition: 'all 0.3s'
                                }}
                                whileHover={{ scale: 1.05, borderColor: 'var(--accent)', background: 'var(--accent-dim)' }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {l.icon} {l.label}
                            </motion.a>
                        ))}
                    </div>

                    {/* Visa Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        style={{
                            maxWidth: 500,
                            padding: '20px 24px',
                            borderRadius: 16,
                            background: 'var(--accent-dim)',
                            border: '1px solid var(--border)'
                        }}
                    >
                        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Right to Work</div>
                        <div style={{ fontSize: 14, color: 'var(--text-1)', lineHeight: 1.6 }}>UK Post-Study Work Visa (Valid Jan 2027)</div>
                        <div style={{ fontSize: 13, color: 'var(--text-2)' }}>Open to Skilled Worker Visa Sponsorship</div>
                    </motion.div>
                </div>

                {/* Giant Typography Button */}
                <motion.a
                    href={`${import.meta.env.BASE_URL}Aryan_Somayajula_CV.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="giant-footer-text"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        display: 'block',
                        textAlign: 'center',
                        textDecoration: 'none',
                        cursor: 'none',
                        position: 'relative',
                        transform: 'translateY(35%)', // Push text down to clip it
                    }}
                >
                    RESUME
                </motion.a>
                
            </div>

            <style>{`
                .giant-footer-text {
                    font-family: 'Bebas Neue', display;
                    font-size: 28vw; /* Massive width-spanning text */
                    line-height: 0.75;
                    color: var(--text-3);
                    letter-spacing: 0.02em;
                    transition: color 0.4s ease, text-shadow 0.4s ease;
                    white-space: nowrap;
                    user-select: none;
                }

                .giant-footer-text:hover {
                    color: var(--accent);
                    text-shadow: 0 0 80px var(--accent-glow);
                }
            `}</style>
        </footer>
    );
};

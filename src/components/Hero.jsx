import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, ArrowDown, Sparkles } from 'lucide-react';

const sw = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const fu = { hidden: { opacity: 0, y: 60 }, show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } } };

/* ── Smooth mouse-tracking 3-D card ─── */
const MagicCard = ({ scrollY }) => {
    const cardRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotX = useSpring(useTransform(mouseY, [-0.5, 0.5], [18, -18]), { stiffness: 180, damping: 24 });
    const rotY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-22, 22]), { stiffness: 180, damping: 24 });
    const glowX = useTransform(mouseX, [-0.5, 0.5], ['5%', '95%']);
    const glowY = useTransform(mouseY, [-0.5, 0.5], ['5%', '95%']);

    // Scroll: card falls away upward, flipping & shrinking
    const photoY = useTransform(scrollY, [0, 900], [0, -820]);
    const photoRotY = useTransform(scrollY, [0, 900], [0, 180]);
    const photoScale = useTransform(scrollY, [0, 700], [1, 0.4]);
    const photoOp = useTransform(scrollY, [220, 650], [1, 0]);

    const onMouseMove = (e) => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (!rect) return;
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    const onMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

    return (
        <motion.div
            style={{
                flexShrink: 0,
                width: 'clamp(280px, 26vw, 380px)',
                zIndex: 50,
                y: photoY, rotateY: photoRotY, scale: photoScale, opacity: photoOp,
                perspective: 1400,
            }}
        >
            {/* Badge OUTSIDE the card — floating above it */}
            <motion.div
                animate={{ y: [0, -12, 0], rotate: [0, 18, -8, 18, 0] }}
                transition={{ y: { duration: 3, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 2.5, repeat: Infinity, repeatDelay: 2 } }}
                style={{
                    position: 'absolute', top: -28, right: -28, zIndex: 60,
                    width: 80, height: 80, borderRadius: '50%',
                    background: 'var(--accent)', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 32,
                    boxShadow: '0 0 0 6px var(--bg), 0 12px 40px var(--accent-glow), 0 0 60px var(--accent-dim)',
                    cursor: 'none',
                }}
            >
                👋
            </motion.div>

            {/* 3-D tilt card */}
            <motion.div
                ref={cardRef}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d', position: 'relative' }}
            >
                {/* Card body */}
                <motion.div style={{
                    borderRadius: 22, overflow: 'hidden',
                    border: 'var(--brutalist-border)',
                    boxShadow: '0 0 0 1px rgba(255,255,255,0.08), 8px 8px 0 var(--border-hard), 0 30px 80px -10px rgba(0,0,0,0.35)',
                    position: 'relative',
                    aspectRatio: '3/4',
                }}>
                    <img src={`${import.meta.env.BASE_URL}aryan.jpg`} alt="Aryan Somayajula"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
                    />

                    {/* Dynamic shine overlay driven by mouse */}
                    <motion.div style={{
                        position: 'absolute', inset: 0, pointerEvents: 'none',
                        background: 'radial-gradient(circle at var(--gx) var(--gy), rgba(255,255,255,0.18) 0%, transparent 60%)',
                        '--gx': glowX, '--gy': glowY,
                        borderRadius: 22,
                    }} />

                    {/* Bottom name chip (translateZ forward) */}
                    <div style={{
                        position: 'absolute', bottom: 16, left: 16, right: 16,
                        background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(12px)',
                        borderRadius: 12, padding: '10px 14px',
                        transform: 'translateZ(30px)',
                        border: '1px solid rgba(255,255,255,0.12)',
                    }}>
                        <div style={{ fontFamily: 'Bebas Neue', fontSize: 18, color: '#fff', letterSpacing: '0.06em' }}>Aryan Somayajula</div>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 2, fontWeight: 500 }}>AI Engineer · London</div>
                    </div>
                </motion.div>

            </motion.div>
        </motion.div>
    );
};

export const Hero = () => {
    const { scrollY } = useScroll();
    const textY = useTransform(scrollY, [0, 600], [0, -120]);
    const textOp = useTransform(scrollY, [0, 460], [1, 0]);

    // Background word parallax (decorative giant text behind everything)
    const bgWordY = useTransform(scrollY, [0, 800], [0, 200]);

    return (
        <section className="hero" id="home" style={{ overflow: 'hidden' }}>
            {/* ── BIG DECORATIVE BACKGROUND TEXT ── */}
            <motion.div
                style={{
                    position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    pointerEvents: 'none', zIndex: 0, overflow: 'hidden',
                    y: bgWordY,
                }}
                aria-hidden
            >
                <span style={{
                    fontFamily: 'Bebas Neue', fontSize: 'clamp(160px, 28vw, 380px)',
                    color: 'transparent',
                    WebkitTextStroke: '1px rgba(91,75,219,0.09)',
                    letterSpacing: '-0.02em', userSelect: 'none', whiteSpace: 'nowrap',
                    lineHeight: 1,
                }}>
                    DATA
                </span>
            </motion.div>

            {/* ── ANIMATED AMBIENT BLOBS ── */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
                {[
                    { w: 700, h: 700, bg: 'radial-gradient(circle, rgba(91,75,219,0.13) 0%, transparent 65%)', t: '-180px', r: '-120px', anim: 'blobA' },
                    { w: 500, h: 500, bg: 'radial-gradient(circle, rgba(232,255,74,0.08) 0%, transparent 65%)', b: '0', l: '-80px', anim: 'blobB' },
                    { w: 350, h: 350, bg: 'radial-gradient(circle, rgba(91,75,219,0.07) 0%, transparent 65%)', b: '25%', r: '10%', anim: 'blobC' },
                ].map((b, i) => (
                    <div key={i} style={{
                        position: 'absolute', width: b.w, height: b.h, borderRadius: '50%',
                        background: b.bg, filter: 'blur(80px)',
                        top: b.t, right: b.r, bottom: b.b, left: b.l,
                        animation: `${b.anim} ${14 + i * 4}s ease-in-out infinite alternate`,
                    }} />
                ))}
                <style>{`
          @keyframes blobA { from{transform:translate(0,0)scale(1)} to{transform:translate(80px,100px)scale(1.15)} }
          @keyframes blobB { from{transform:translate(0,0)scale(1)} to{transform:translate(50px,-70px)scale(1.1)} }
          @keyframes blobC { from{transform:translate(0,0)scale(1)} to{transform:translate(-40px,50px)scale(1.2)} }
        `}</style>
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <motion.div variants={sw} initial="hidden" animate="show">

                    {/* Availability pill */}
                    <motion.div variants={fu} style={{ display: 'flex', justifyContent: 'center', marginBottom: 52 }}>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: 10,
                                padding: '10px 22px', borderRadius: 100,
                                background: 'var(--surface)', border: '1px solid var(--border)',
                                backdropFilter: 'blur(20px)', boxShadow: 'var(--shadow-md)',
                                fontSize: 13, fontWeight: 600, color: 'var(--text-2)',
                            }}
                        >
                            <Sparkles size={14} color="var(--accent)" />
                            Open to Building · Canary Wharf, London
                            <div className="pulse" />
                        </motion.div>
                    </motion.div>

                    {/* ── THREE-COLUMN: DATA | PHOTO | ANALYST ── */}
                    <motion.div variants={fu} style={{ position: 'relative' }}>
                        <div className="hero-content-row">

                            {/* LEFT */}
                            <motion.div style={{ y: textY, opacity: textOp, textAlign: 'right', flex: 'none' }}>
                                <p style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 4 }}>Aryan Somayajula</p>
                                <h1 className="hero-word">DATA</h1>
                            </motion.div>

                            {/* CENTER — magical 3D card */}
                            <MagicCard scrollY={scrollY} />

                            {/* RIGHT */}
                            <motion.div style={{ y: textY, opacity: textOp, flex: 'none' }}>
                                <h1 className="hero-word" style={{ color: 'transparent', WebkitTextStroke: '3px var(--text-1)' }}>ANALYST</h1>
                                <p className="hero-sub" style={{ marginTop: 14, textAlign: 'left' }}>
                                    Building Intelligent<br />Systems From Data.
                                </p>
                            </motion.div>

                        </div>

                        {/* Second row */}
                        <motion.div style={{ textAlign: 'center', marginTop: '-0.06em', y: textY, opacity: textOp }}>
                            <h1 className="hero-word">
                                &amp;&nbsp;<span style={{ color: 'transparent', WebkitTextStroke: '3px var(--text-1)' }}>DEV</span>ELOPER
                            </h1>
                        </motion.div>
                    </motion.div>

                    {/* CTAs */}
                    <motion.div variants={fu} style={{ display: 'flex', gap: 14, justifyContent: 'center', marginTop: 48 }}>
                        <motion.a href="#projects" className="btn btn-accent" whileHover={{ scale: 1.06, boxShadow: '0 20px 60px var(--accent-glow)' }} whileTap={{ scale: 0.97 }}>
                            See My Work <ArrowRight size={18} />
                        </motion.a>
                        <motion.a href="#contact" className="btn btn-outline" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                            Get in Touch
                        </motion.a>
                    </motion.div>

                </motion.div>

                {/* Spinning decorative ring */}
                <motion.div
                    aria-hidden
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    style={{
                        position: 'absolute', top: '12%', left: 'clamp(20px,6vw,80px)',
                        width: 80, height: 80, borderRadius: '50%',
                        border: '1.5px dashed var(--accent)',
                        opacity: 0.3, pointerEvents: 'none',
                    }}
                />
                <motion.div
                    aria-hidden
                    animate={{ rotate: -360 }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                    style={{
                        position: 'absolute', bottom: '18%', right: 'clamp(16px,5vw,60px)',
                        width: 48, height: 48, borderRadius: '50%',
                        border: '2px dashed var(--accent)',
                        opacity: 0.4, pointerEvents: 'none',
                    }}
                />

                {/* Stats bar */}
                <motion.div
                    className="hero-stats"
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.75, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                >
                    {[['15+', 'AI Experiments'], ['10+', 'DS Projects'], ['5+', 'ML Systems'], ['3', 'AI Prototypes']].map(([v, l]) => (
                        <div key={l}>
                            <div className="hero-stat-val">{v}</div>
                            <div className="hero-stat-lbl">{l}</div>
                        </div>
                    ))}
                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                        <ArrowDown size={14} /> Scroll
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

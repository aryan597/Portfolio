import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, CheckCircle2 } from 'lucide-react';

const services = [
    { title: 'LLM & Agentic Systems', desc: 'End-to-end agentic pipelines, RAG architectures, and context engineering for production LLM deployments.' },
    { title: 'Edge AI & Local-First ML', desc: 'Running quantised LLMs and time-series models on constrained hardware — Raspberry Pi, Jetson Orin Nano — with zero cloud dependency.' },
    { title: 'Time-Series & Quantile Forecasting', desc: 'Dual-head quantile regression for energy load forecasting with real-world validation on 7,000+ smart-meter samples.' },
    { title: 'Neuromorphic & Event-Based AI', desc: 'LIF spiking-neuron networks with STDP plasticity for autonomous edge control, simulated and validated on SQLite-persistent synapses.' },
];

const coreSkills = [
    { name: 'LLMs (Phi-3, LLaMA 3, Whisper)', level: 'Expert' },
    { name: 'Time-Series & Quantile Regression', level: 'Expert' },
    { name: 'Neuromorphic Computing (LIF + STDP)', level: 'Advanced' },
    { name: 'Python · PyTorch · FastAPI', level: 'Expert' },
    { name: 'Edge AI · Jetson · Raspberry Pi', level: 'Advanced' },
    { name: 'SQLite · InfluxDB · SQL', level: 'Advanced' },
];

const vp = (delay = 0) => ({
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay },
});

export const About = () => (
    <>
        {/* ═══ WHAT I CAN DO ═══ */}
        <section className="section" id="about" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="container">
                <motion.span className="section-label" {...vp()}>Capabilities</motion.span>
                <div className="about-grid">

                    {/* Left */}
                    <motion.div {...vp(0.05)}>
                        <h2 style={{ fontSize: 'clamp(48px,7vw,80px)', marginBottom: 24 }}>
                            What I<br />Build
                        </h2>
                        <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.85, marginBottom: 48, maxWidth: 420 }}>
                            I design and build LLM-based systems, agentic pipelines, and production ML solutions that turn raw data into intelligent, autonomous software. From model quantisation on edge hardware to full RAG architectures - I own the full lifecycle.
                        </p>
                        <div className="services-list">
                            {services.map((s, i) => (
                                <motion.div key={s.title} className="service-row"
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <div>
                                        <span className="service-title">
                                            <span style={{ color: 'var(--accent)', marginRight: 12 }}>0{i + 1}.</span>
                                            {s.title}
                                        </span>
                                        <p style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 4 }}>{s.desc}</p>
                                    </div>
                                    <ChevronDown size={20} color="var(--text-3)" style={{ flexShrink: 0 }} />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right - glass card (flips in 180°) */}
                    <motion.div
                        initial={{ opacity: 0, rotateY: -180, x: 80 }}
                        whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        style={{ perspective: 1200 }}
                    >
                        <motion.div className="glass" style={{ padding: 40, borderRadius: 24, position: 'relative', overflow: 'hidden' }} whileHover={{ scale: 1.02 }}>
                            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at top left, var(--accent-dim) 0%, transparent 65%)', pointerEvents: 'none' }} />
                            <h3 style={{ fontFamily: 'Bebas Neue', fontSize: 32, marginBottom: 28 }}>Core Technical Skills</h3>
                            {coreSkills.map((sk, i) => (
                                <motion.div key={sk.name}
                                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid var(--border)' }}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.07 }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                        <CheckCircle2 size={16} color="var(--accent)" />
                                        <span style={{ fontFamily: 'Bebas Neue', fontSize: 20, letterSpacing: '0.03em' }}>{sk.name}</span>
                                    </div>
                                    <span className="skill-tag">{sk.level}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>

        {/* ═══ ABOUT ME ═══ */}
        <section className="section" style={{ background: 'var(--bg-alt)', borderTop: '1px solid var(--border)' }}>
            <div className="container">
                <motion.span className="section-label" {...vp()}>The Builder</motion.span>
                <div style={{ maxWidth: 820 }}>
                    <motion.h2 style={{ fontSize: 'clamp(48px,7vw,80px)', marginBottom: 24 }} {...vp(0.05)}>
                        The Mind<br />Behind It
                    </motion.h2>
                    <motion.p style={{ fontSize: 16, color: 'var(--text-2)', lineHeight: 1.9, marginBottom: 20, maxWidth: 700 }} {...vp(0.1)}>
                        I'm Aryan - an AI Engineer with an MSc in Data Science & Analytics (Merit, Royal Holloway, University of London) and hands-on experience building end-to-end LLM-based systems, agentic pipelines, RAG architectures, and production ML solutions.
                    </motion.p>
                    <motion.p style={{ fontSize: 16, color: 'var(--text-2)', lineHeight: 1.9, marginBottom: 40, maxWidth: 700 }} {...vp(0.15)}>
                        Deep expertise in context engineering, semantic extraction from unstructured data, and LLM evaluation. Passionate about applying AI to real-world problems - especially edge-first, privacy-preserving systems that run entirely locally.
                    </motion.p>

                    {/* Stats brutalist grid */}
                    <motion.div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2, marginBottom: 36, border: 'var(--brutalist-border)', background: 'var(--border-hard)', maxWidth: 700 }} {...vp(0.2)}>
                        {[['MSc', 'Merit · Royal Holloway'], ['96%', 'ML Dissertation'], ['3+', 'LLM Pipelines'], ['Edge', 'AI Systems']].map(([v, l]) => (
                            <div key={l} style={{ background: 'var(--bg)', padding: '24px 16px', textAlign: 'center' }}>
                                <div style={{ fontFamily: 'Bebas Neue', fontSize: v.length > 4 ? 32 : 48, color: 'var(--accent)', lineHeight: 1 }}>{v}</div>
                                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-3)', marginTop: 6 }}>{l}</div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Contact info */}
                    <motion.div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginBottom: 36, fontSize: 14, maxWidth: 700 }} {...vp(0.25)}>
                        <div>
                            <div style={{ fontWeight: 700, marginBottom: 3, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-3)' }}>Location</div>
                            <div style={{ color: 'var(--text-2)' }}>London, United Kingdom</div>
                        </div>
                        <div>
                            <div style={{ fontWeight: 700, marginBottom: 3, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-3)' }}>Visa Status</div>
                            <div style={{ color: 'var(--text-2)' }}>Post-Study Work Visa (Jan 2027)</div>
                        </div>
                        <div>
                            <div style={{ fontWeight: 700, marginBottom: 3, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-3)' }}>Sponsorship</div>
                            <div style={{ color: 'var(--text-2)' }}>Open to Skilled Worker Visa</div>
                        </div>
                    </motion.div>

                    <motion.a href="#contact" className="btn btn-outline" {...vp(0.3)}>Let's Talk →</motion.a>
                </div>
            </div>
        </section>
    </>
);

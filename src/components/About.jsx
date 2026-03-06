import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, CheckCircle2, ExternalLink } from 'lucide-react';

const services = [
    { title: 'ML Pipeline Engineering', desc: 'End-to-end pipelines — data ingestion, feature engineering, training, and cloud deployment.' },
    { title: 'AI Product Prototyping', desc: 'Rapidly building intelligent tools: resume analyzers, recommendation systems, generative apps.' },
    { title: 'Data Science & Analytics', desc: 'Python, SQL, Pandas — turning raw data into decisions with visualizations and predictive models.' },
    { title: 'Cloud & MLOps', desc: 'AWS, Docker, GitHub Actions — shipping ML models as scalable, production-ready services.' },
];

const coreSkills = [
    { name: 'Python', level: 'Advanced' },
    { name: 'SQL (MySQL · PostgreSQL)', level: 'Advanced' },
    { name: 'TensorFlow / PyTorch', level: 'Proficient' },
    { name: 'Tableau / Power BI', level: 'Advanced' },
    { name: 'Java / Android SDK', level: 'Intermediate' },
    { name: 'AWS (S3, EC2, Lambda)', level: 'Intermediate' },
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
                            I design and build machine learning systems, AI-powered products, and data pipelines that turn raw information into intelligent software. From model training to deployment — I ship things that work.
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

                    {/* Right — glass card (flips in 180°) */}
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
                <div className="about-grid" style={{ alignItems: 'center' }}>

                    {/* Left — bio */}
                    <motion.div {...vp(0.05)}>
                        <h2 style={{ fontSize: 'clamp(48px,7vw,80px)', marginBottom: 24 }}>The Mind<br />Behind It</h2>
                        <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.9, marginBottom: 20, maxWidth: 480 }}>
                            I'm Aryan — an AI engineer and machine learning builder based in Canary Wharf, London. I hold an MSc in Data Science & Analytics from Royal Holloway, University of London and a BSc in Computer Applications from BIT Mesra.
                        </p>
                        <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.9, marginBottom: 40, maxWidth: 480 }}>
                            I think in systems. I build experiments, ship ML products, and explore how intelligent software can reshape how people work, create, and decide. Every project in this portfolio is a real system with a real ML model behind it.
                        </p>

                        {/* Stats brutalist grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, marginBottom: 36, border: 'var(--brutalist-border)', background: 'var(--border-hard)' }}>
                            {[['3+', 'Years Exp.'], ['10+', 'Projects'], ['2', 'Degrees']].map(([v, l]) => (
                                <div key={l} style={{ background: 'var(--bg)', padding: '24px 16px', textAlign: 'center' }}>
                                    <div style={{ fontFamily: 'Bebas Neue', fontSize: 52, color: 'var(--accent)', lineHeight: 1 }}>{v}</div>
                                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-3)', marginTop: 6 }}>{l}</div>
                                </div>
                            ))}
                        </div>

                        {/* Contact info */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 36, fontSize: 14 }}>
                            <div>
                                <div style={{ fontWeight: 700, marginBottom: 3, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-3)' }}>Phone</div>
                                <div style={{ color: 'var(--text-2)' }}>+44 7407 750520</div>
                            </div>
                            <div>
                                <div style={{ fontWeight: 700, marginBottom: 3, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-3)' }}>Email</div>
                                <div style={{ color: 'var(--text-2)' }}>somayajulaaryan@gmail.com</div>
                            </div>
                            <div>
                                <div style={{ fontWeight: 700, marginBottom: 3, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-3)' }}>Location</div>
                                <div style={{ color: 'var(--text-2)' }}>Canary Wharf, London</div>
                            </div>
                            <div>
                                <div style={{ fontWeight: 700, marginBottom: 3, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-3)' }}>MSc</div>
                                <div style={{ color: 'var(--text-2)' }}>Royal Holloway — Merit</div>
                            </div>
                        </div>

                        <a href="#contact" className="btn btn-outline">Let's Talk →</a>
                    </motion.div>

                    {/* Right — real photo (360° spin on enter) */}
                    <motion.div
                        initial={{ opacity: 0, rotateY: -360 }}
                        whileInView={{ opacity: 1, rotateY: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                        style={{ perspective: 1200 }}
                    >
                        <motion.div
                            style={{
                                borderRadius: 24, overflow: 'hidden',
                                border: 'var(--brutalist-border)',
                                boxShadow: '8px 8px 0 var(--accent), var(--shadow-lg)',
                                aspectRatio: '3/4',
                            }}
                            whileHover={{ scale: 1.02, rotate: -1, transition: { duration: 0.4 } }}
                        >
                            <img
                                src={`${import.meta.env.BASE_URL}aryan.jpg`}
                                alt="Aryan Somayajula"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
                            />
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    </>
);

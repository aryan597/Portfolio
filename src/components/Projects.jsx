import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Cpu, Brain, Mic, Database, Zap, Code, Users } from 'lucide-react';

/*  Project Data (matching exactly 7 repos)  */
const projects = [
    {
        id: 'nestshift',
        title: 'NestShift OS',
        subtitle: 'Privacy-First Agentic Smart Home Platform',
        category: 'LLM / Edge AI',
        desc: 'Privacy-first agentic smart-home platform with dual-head quantile regression forecasting (R²=0.892), NARE neuromorphic STDP event learning, and real LCL smart-meter validation showing 26.4% bill reduction. Targets Jetson Orin Nano edge deployment with zero cloud dependency.',
        longDesc: 'Published academic paper with real-world validation on 7,140 LCL test samples. Dual-head architecture: median head for scheduling (R²=0.892, MAE=0.101 kWh) and Q90 quantile head for spike prediction (R²=0.829). NARE neuromorphic module uses LIF neurons with SQLite-persistent STDP synapses for autonomous appliance control. Hardware BOM targets Jetson Orin Nano 8GB with hub COGS £590–640.',
        tech: ['PyTorch', 'Quantile Regression', 'NARE STDP', 'FastAPI', 'SQLite', 'MQTT', 'Jetson Orin Nano', 'LCL Dataset'],
        icon: <Cpu size={20} />,
        href: 'https://github.com/aryan597/nestshift-os',
        award: 'Flagship Project',
        color: '#5B4BDB',
        size: 'large',
    },
    {
        id: 'covid',
        title: 'COVID-19 Detection',
        subtitle: 'Audio ML MSc Dissertation',
        category: 'ML / Signal Processing',
        desc: 'Developed an ML pipeline combining signal processing feature extraction (MFCCs, spectral features) with Reinforcement Learning and Random Forest classification to achieve 96% accuracy on COVID-19 detection from cough audio.',
        longDesc: 'Full pipeline: audio pre-processing -> MFCC & spectral feature extraction -> feature selection -> RL-guided model optimisation -> Random Forest classifier. Validated on real clinical audio datasets.',
        tech: ['Python', 'Librosa', 'Random Forest', 'Reinforcement Learning', 'MFCCs'],
        icon: <Mic size={20} />,
        href: 'https://github.com/aryan597/COVID-19-Detection-from-Cough-Sounds',
        award: '96% Accuracy',
        color: '#00C853',
        size: 'medium',
    },
    {
        id: 'titanic',
        title: 'Titanic Passenger Survival',
        subtitle: 'Convolutional Neural Network',
        category: 'Deep Learning',
        desc: 'Built a Convolutional Neural Network (CNN) to predict passenger survival on the Titanic based on passenger manifest data and engineered features.',
        longDesc: '',
        tech: ['Python', 'TensorFlow', 'Keras', 'CNN', 'Data Engineering'],
        icon: <Brain size={20} />,
        href: 'https://github.com/aryan597/titanic-passenger-survival-cnn',
        award: null,
        color: '#FF4A8D',
        size: 'medium',
    },
    {
        id: 'churn',
        title: 'Bank Customer Churn',
        subtitle: 'Predictive Analytics Model',
        category: 'Data Science',
        desc: 'End-to-end data analytics and predictive modeling project forecasting bank customer churn using structured customer behavior datasets.',
        longDesc: '',
        tech: ['Python', 'Pandas', 'Scikit-Learn', 'XGBoost', 'Data Viz'],
        icon: <Database size={20} />,
        href: 'https://github.com/aryan597/bank-customer-churn-analytics',
        award: null,
        color: '#E8FF4A',
        size: 'small',
    },
    {
        id: 'baforage',
        title: 'BA Virtual Experience',
        subtitle: 'British Airways Data Analytics',
        category: 'Analytics',
        desc: 'Completed the British Airways virtual experience program, involving customer sentiment analysis and predictive modeling for booking behaviors.',
        longDesc: '',
        tech: ['Python', 'NLP', 'Data Analytics', 'Jupyter'],
        icon: <Zap size={20} />,
        href: 'https://github.com/aryan597/BA-forage',
        award: null,
        color: '#FF6B35',
        size: 'small',
    },
    {
        id: 'grupo',
        title: 'Grupo',
        subtitle: 'Group Collaboration Platform',
        category: 'Software Engineering',
        desc: 'Developed a robust platform for group collaboration and communication, focusing on clean architecture and scalable backend services.',
        longDesc: '',
        tech: ['Java', 'Backend APIs', 'SQL', 'Software Architecture'],
        icon: <Users size={20} />,
        href: 'https://github.com/aryan597/Grupo',
        award: null,
        color: '#8B7AFF',
        size: 'small',
    },
    {
        id: 'portfolioapi',
        title: 'Portfolio Builder API',
        subtitle: 'RESTful Backend Service',
        category: 'Backend / APIs',
        desc: 'Designed and deployed a scalable RESTful API service to dynamically manage and serve portfolio content.',
        longDesc: '',
        tech: ['FastAPI', 'Python', 'REST API', 'Database'],
        icon: <Code size={20} />,
        href: 'https://github.com/aryan597/portfolio-builder-api',
        award: null,
        color: '#00E5A0',
        size: 'small',
    },
];

/*  Project Card  */
const ProjectCard = ({ p, onClick, isActive }) => {
    const isLarge = p.size === 'large';
    const isMedium = p.size === 'medium';

    return (
        <motion.div
            layoutId={`proj-${p.id}`}
            onClick={() => onClick(p)}
            className="proj-bento-card"
            style={{
                gridColumn: isLarge ? 'span 2' : 'span 1',
                gridRow: isLarge ? 'span 2' : isMedium ? 'span 2' : 'span 1',
                '--card-color': p.color,
                cursor: 'none',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 20,
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                backdropFilter: 'blur(20px)',
                boxShadow: 'var(--shadow-md)',
                minHeight: isLarge ? 340 : isMedium ? 260 : 160,
                padding: isLarge ? 36 : 28,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'box-shadow 0.3s, transform 0.3s',
            }}
            whileHover={{ y: -5, boxShadow: `0 32px 80px rgba(0,0,0,0.18), 0 0 0 1px ${p.color}33` }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Top glow bar */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: p.color, borderRadius: '20px 20px 0 0', opacity: 0.8 }} />

            {/* Background ambient */}
            <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: `radial-gradient(circle, ${p.color}18 0%, transparent 70%)`, pointerEvents: 'none' }} />

            {/* Header */}
            <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{
                            width: 42, height: 42, borderRadius: 12,
                            background: `${p.color}18`,
                            border: `1px solid ${p.color}33`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: p.color,
                        }}>
                            {p.icon}
                        </div>
                        <div>
                            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 2 }}>{p.category}</div>
                            {p.award && (
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 10px', borderRadius: 100, background: `${p.color}18`, color: p.color === '#E8FF4A' ? '#7a8500' : p.color, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', border: `1px solid ${p.color}33` }}>
                                    ✦ {p.award}
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Only ONE button linking to the GitHub repo */}
                    <div style={{ display: 'flex', gap: 8 }}>
                        <motion.a
                            href={p.href} target="_blank" rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            style={{ width: 34, height: 34, borderRadius: 10, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-3)' }}
                            whileHover={{ background: p.color, color: '#fff', borderColor: p.color }}
                        >
                            <Github size={15} />
                        </motion.a>
                    </div>
                </div>

                <h3 style={{ fontFamily: 'Bebas Neue', fontSize: isLarge ? 'clamp(32px,4vw,52px)' : 28, letterSpacing: '0.03em', marginBottom: 8, lineHeight: 1 }}>{p.title}</h3>
                <p style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>{p.subtitle}</p>
                <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.75, display: isLarge || isMedium ? 'block' : '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: isLarge || isMedium ? 'visible' : 'hidden' }}>
                    {p.desc}
                </p>

                {(isLarge || isMedium) && p.longDesc && (
                    <p style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.75, marginTop: 12 }}>
                        {p.longDesc}
                    </p>
                )}
            </div>

            {/* Tech tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 16 }}>
                {p.tech.slice(0, isLarge ? 9 : 4).map(t => (
                    <span key={t} style={{
                        padding: '4px 12px', borderRadius: 100, fontSize: 11, fontWeight: 600,
                        background: `${p.color}12`, color: p.color === '#E8FF4A' ? '#7a8500' : p.color,
                        border: `1px solid ${p.color}25`,
                    }}>
                        {t}
                    </span>
                ))}
                {p.tech.length > (isLarge ? 9 : 4) && (
                    <span style={{ padding: '4px 12px', borderRadius: 100, fontSize: 11, fontWeight: 600, background: 'var(--accent-dim)', color: 'var(--accent)' }}>
                        +{p.tech.length - (isLarge ? 9 : 4)}
                    </span>
                )}
            </div>
        </motion.div>
    );
};

export const Projects = () => {
    const [selected, setSelected] = useState(null);

    return (
        <section className="section" id="projects" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="container" style={{ marginBottom: 56 }}>
                <motion.span className="section-label"
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.6 }}
                >Selected Work</motion.span>
                <motion.h2
                    style={{ fontSize: 'clamp(48px,6vw,80px)', marginBottom: 16 }}
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >Systems I've Built</motion.h2>
                <motion.p
                    style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.75, maxWidth: 560, marginBottom: 56 }}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
                >
                    Real systems solving real problems. From local LLM edge agents to high accuracy diagnostic models and production APIs.
                </motion.p>

                {/* Bento Grid */}
                <div className="proj-grid">
                    {projects.map(p => (
                        <ProjectCard key={p.id} p={p} onClick={setSelected} isActive={selected?.id === p.id} />
                    ))}
                </div>

                {/* GitHub CTA */}
                <motion.div
                    style={{ display: 'flex', justifyContent: 'center', marginTop: 48 }}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <motion.a
                        href="https://github.com/aryan597"
                        target="_blank" rel="noopener noreferrer"
                        className="btn btn-outline"
                        whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}
                    >
                        <Github size={18} /> View Profile on GitHub
                    </motion.a>
                </motion.div>
            </div>

            {/* CSS for grid responsive */}
            <style>{`
                @media (max-width: 900px) {
                    .proj-bento-card { grid-column: span 1 !important; grid-row: span 1 !important; }
                }
            `}</style>
        </section>
    );
};

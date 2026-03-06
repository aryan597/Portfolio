import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, ArrowUpRight } from 'lucide-react';

const projects = [
    {
        title: 'Resift',
        subtitle: 'AI Resume Intelligence Platform',
        desc: 'An AI-powered system that analyzes resumes against job descriptions and generates ATS optimization insights. Built to close the gap between candidates and roles.',
        tech: ['Python', 'NLP', 'Machine Learning', 'React'],
        img: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=1400&q=80',
        href: 'https://github.com/somayajulaaryan',
        award: 'Live Product',
    },
    {
        title: 'Opportunista',
        subtitle: 'AI Job Discovery Platform',
        desc: 'A recruitment intelligence platform designed to match candidates with roles using machine learning, automated skill analysis, and job market signals.',
        tech: ['Python', 'React', 'AWS', 'NLP'],
        img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1400&q=80',
        href: 'https://github.com/somayajulaaryan',
        award: null,
    },
    {
        title: 'AI Viral Song Predictor',
        subtitle: 'Music Intelligence System',
        desc: 'Machine learning model that predicts the viral potential of music using audio features, metadata, and cultural trend signals extracted via Librosa.',
        tech: ['Python', 'Librosa', 'Random Forest', 'Scikit-Learn'],
        img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1400&q=80',
        href: 'https://github.com/somayajulaaryan',
        award: null,
    },
    {
        title: 'AI Sci-Fi Video Generator',
        subtitle: 'Generative Media Pipeline',
        desc: 'Experimental generative AI pipeline that converts text prompts into cinematic short videos. Prompt → Image Generation → Motion Animation.',
        tech: ['Python', 'Stable Diffusion', 'ComfyUI', 'FFmpeg'],
        img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80',
        href: 'https://github.com/somayajulaaryan',
        award: 'Experimental',
    },
    {
        title: 'IPL Match Prediction Engine',
        subtitle: 'Sports Analytics System',
        desc: 'Sports analytics system predicting match outcomes using historical cricket data, team composition analysis, and machine learning models trained on 10 years of IPL data.',
        tech: ['Python', 'Scikit-Learn', 'Pandas', 'XGBoost'],
        img: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1400&q=80',
        href: 'https://github.com/somayajulaaryan',
        award: null,
    },
];

const ProjectCard = ({ p, index, total, scrollYProgress }) => {
    const scale = useTransform(scrollYProgress, [index / total, (index + 1) / total], [1, 0.92]);
    const opacity = useTransform(scrollYProgress, [index / total, (index + 1) / total], [1, 0.50]);
    const rotX = useTransform(scrollYProgress, [index / total, (index + 1) / total], [0, 6]);

    return (
        <motion.div
            style={{
                position: 'sticky',
                top: 120 + index * 16,
                scale, opacity, rotateX: rotX,
                transformOrigin: 'top center',
                marginBottom: 40, zIndex: index + 1,
                willChange: 'transform, opacity',
            }}
        >
            <motion.a
                href={p.href} target="_blank" rel="noopener noreferrer"
                className="proj-card"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                style={{ display: 'block', border: 'var(--brutalist-border)', boxShadow: '6px 6px 0 var(--border-hard), var(--shadow-lg)' }}
            >
                <motion.img
                    src={p.img} alt={p.title} loading="lazy" className="proj-img"
                    whileHover={{ scale: 1.04, filter: 'brightness(0.8)', transition: { duration: 0.55 } }}
                    style={{ filter: 'brightness(0.55)' }}
                />
                <div className="proj-overlay">
                    {p.award && (
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 10, padding: '5px 14px', borderRadius: 100, background: 'var(--accent)', color: '#fff', fontSize: 12, fontWeight: 700 }}>
                            ✦ {p.award}
                        </div>
                    )}
                    <h3 className="proj-title">{p.title}</h3>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>{p.subtitle}</p>
                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, maxWidth: 620 }}>{p.desc}</p>
                    <div className="proj-tech">
                        {p.tech.map(t => <span key={t} className="proj-badge">{t}</span>)}
                        <motion.span
                            style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 700, color: 'var(--accent-alt)' }}
                            whileHover={{ x: 4 }}
                        >
                            <Github size={16} /> View <ArrowUpRight size={16} />
                        </motion.span>
                    </div>
                </div>
            </motion.a>
        </motion.div>
    );
};

export const Projects = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

    return (
        <section className="section" id="projects" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="container" style={{ marginBottom: 56 }}>
                <motion.span className="section-label"
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.6 }}
                >Selected Work</motion.span>
                <motion.h2
                    style={{ fontSize: 'clamp(48px,6vw,80px)' }}
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >Systems I've Built</motion.h2>
            </div>
            <div ref={ref} style={{ paddingBottom: '15vh' }}>
                <div className="container" style={{ perspective: 1400 }}>
                    {projects.map((p, i) => (
                        <ProjectCard key={i} p={p} index={i} total={projects.length} scrollYProgress={scrollYProgress} />
                    ))}
                </div>
            </div>
        </section>
    );
};

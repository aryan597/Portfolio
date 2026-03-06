import React from 'react';
import { motion } from 'framer-motion';

const groups = [
    {
        heading: 'Languages',
        items: [
            { name: 'Python', level: 'Advanced' },
            { name: 'SQL', level: 'Advanced' },
            { name: 'Java', level: 'Intermediate' },
            { name: 'R', level: 'Intermediate' },
        ],
    },
    {
        heading: 'ML & Data Science',
        items: [
            { name: 'TensorFlow / PyTorch', level: 'Proficient' },
            { name: 'Scikit-Learn', level: 'Advanced' },
            { name: 'Pandas / NumPy', level: 'Advanced' },
            { name: 'NLP & Feature Engineering', level: 'Intermediate' },
        ],
    },
    {
        heading: 'Visualisation & BI',
        items: [
            { name: 'Tableau', level: 'Advanced' },
            { name: 'Power BI', level: 'Intermediate' },
            { name: 'Matplotlib / Seaborn', level: 'Advanced' },
        ],
    },
    {
        heading: 'Cloud & DevOps',
        items: [
            { name: 'AWS (S3, EC2, Lambda)', level: 'Intermediate' },
            { name: 'Docker', level: 'Intermediate' },
            { name: 'GitHub Actions / CI-CD', level: 'Proficient' },
        ],
    },
    {
        heading: 'Databases',
        items: [
            { name: 'MySQL / PostgreSQL', level: 'Advanced' },
            { name: 'MongoDB', level: 'Intermediate' },
        ],
    },
    {
        heading: 'Frontend & Mobile',
        items: [
            { name: 'Android Studio (Java)', level: 'Intermediate' },
            { name: 'ReactJS / HTML / CSS', level: 'Intermediate' },
            { name: 'REST API Integration', level: 'Proficient' },
        ],
    },
];

export const Skills = () => (
    <section className="section" id="skills" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container">
            <motion.span className="section-label"
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6 }}
            >
                Tech Arsenal
            </motion.span>
            <motion.h2
                style={{ fontSize: 'clamp(48px,6vw,80px)', marginBottom: 64 }}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                The Stack
            </motion.h2>

            <div className="skills-grid">
                {groups.map((g, gi) => (
                    <motion.div key={g.heading}
                        className="glass"
                        style={{ padding: 28, borderRadius: 20 }}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: gi * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        whileHover={{ y: -6, transition: { duration: 0.3 } }}
                    >
                        <h3 style={{ fontFamily: 'Bebas Neue', fontSize: 22, letterSpacing: '0.05em', color: 'var(--accent)', marginBottom: 20 }}>{g.heading}</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {g.items.map((sk, si) => (
                                <motion.div key={sk.name}
                                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: gi * 0.06 + si * 0.05, duration: 0.45 }}
                                >
                                    <span style={{ fontWeight: 600, fontSize: 14, lineHeight: 1.3 }}>{sk.name}</span>
                                    <span className="skill-tag" style={{ flexShrink: 0 }}>{sk.level}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

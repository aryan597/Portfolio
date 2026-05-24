import React from 'react';
import { motion } from 'framer-motion';

const jobs = [
    {
        role: 'Team Lead - Operations',
        company: 'Benugo · Waterloo Station, London',
        date: 'Oct 2024 – Present',
        type: 'work',
        desc: 'Leading operations and a 15+ person team at one of London\'s highest-footfall transport hubs, managing cross-functional delivery, incident response, and real-time resource allocation.',
        bullets: [
            'Drive structured coaching, training, and performance reviews - maintaining high output standards under continuous pressure.',
            'Manage cross-functional delivery, incident response, and real-time resource allocation.',
            'Cultivated leadership skills in high-stakes, fast-paced environments directly applicable to engineering team contexts.',
        ],
    },
    {
        role: 'Android App Developer Intern',
        company: 'Grupo Technologies · Bangalore, India',
        date: 'Aug 2022 – Aug 2023',
        type: 'work',
        desc: 'Built Android applications in Java with REST API integrations and cloud media storage.',
        bullets: [
            'Built Android applications in Java; integrated REST APIs for real-time backend communication.',
            'Implemented AWS S3 for cloud media storage and asset management.',
            'Collaborated with backend engineers to ship production-grade mobile features.',
        ],
    },
    {
        role: 'MSc Data Science & Analytics',
        company: 'Royal Holloway, University of London',
        date: 'Sep 2023 – Sep 2024',
        type: 'edu',
        desc: '',
        bullets: [
            'Merit (2:1) - Machine Learning, NLP, Big Data Processing, Statistical Modelling.',
            'Dissertation: COVID-19 Detection from Cough Sounds using RL & Random Forest - 96% accuracy.',
        ],
    },
    {
        role: 'Bachelor of Computer Applications',
        company: 'Birla Institute of Technology, Mesra, India',
        date: '2020 – 2023',
        type: 'edu',
        desc: '',
        bullets: [
            'Core modules: Python, Java, Kotlin, Data Mining, Cloud Computing, UI/UX, Algorithms.',
        ],
    },
];

export const Experience = () => (
    <section className="section" id="experience" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container">
            <motion.span className="section-label"
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6 }}
            >
                Background
            </motion.span>
            <motion.h2
                style={{ fontSize: 'clamp(48px,6vw,80px)', marginBottom: 72 }}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                Journey So Far
            </motion.h2>

            {jobs.map((j, i) => (
                <motion.div key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.75, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                    style={{ borderLeft: `3px solid ${j.type === 'edu' ? 'var(--accent-alt)' : 'var(--accent)'}`, paddingLeft: 28, borderBottom: 'none', marginBottom: 40, display: 'block', gap: 0 }}
                    whileHover={{ paddingLeft: 36, transition: { duration: 0.3 } }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 6 }}>
                        <div className="exp-role" style={{ fontSize: 'clamp(20px,3vw,30px)' }}>{j.role}</div>
                        <span style={{
                            fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
                            padding: '4px 12px', borderRadius: 100,
                            background: j.type === 'edu' ? 'rgba(232,255,74,0.15)' : 'var(--accent-dim)',
                            color: j.type === 'edu' ? '#7a8500' : 'var(--accent)',
                            border: `1px solid ${j.type === 'edu' ? 'rgba(232,255,74,0.3)' : 'var(--accent-dim)'}`,
                            whiteSpace: 'nowrap',
                        }}>
                            {j.type === 'edu' ? '🎓 Education' : '💼 Work'}
                        </span>
                    </div>
                    <div className="exp-company">{j.company}</div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: j.desc ? 10 : 14 }}>{j.date}</div>
                    {j.desc && (
                        <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.8, marginBottom: 14, maxWidth: 680 }}>{j.desc}</p>
                    )}
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: 7, listStyle: 'none' }}>
                        {j.bullets.map((b, bi) => (
                            <motion.li key={bi} className="exp-bullet"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.45, delay: bi * 0.07 }}
                            >{b}</motion.li>
                        ))}
                    </ul>
                </motion.div>
            ))}
        </div>
    </section>
);

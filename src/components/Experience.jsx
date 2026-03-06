import React from 'react';
import { motion } from 'framer-motion';

const jobs = [
    {
        role: 'AI Product Builder',
        company: 'Stealth AI Projects Lab · London',
        date: '2024 – Present',
        type: 'work',
        desc: 'Designing experimental AI systems and intelligent software products that explore how machine learning can automate decision making and improve digital experiences.',
        bullets: [
            'Building end-to-end ML pipelines from data ingestion to deployment.',
            'Developing AI-powered tools for resume analysis and recruitment intelligence.',
            'Prototyping generative media systems and predictive analytics platforms.',
            'Experimenting with machine learning architectures and product workflows.',
        ],
    },
    {
        role: 'Data & Business Analyst',
        company: 'Grupo Technologies · Bangalore (Remote)',
        date: '2022 – 2023',
        type: 'work',
        desc: 'Worked on real-world business data to uncover insights and design predictive models that improve operational decisions.',
        bullets: [
            'Built machine learning models to predict customer churn and manufacturing flaws.',
            'Developed automated analytics pipelines for stronger B2B networks.',
            'Transformed raw business data into actionable insights — awarded Certificate of Excellence.',
            'Delivered dashboards and predictive reports for key decision makers.',
        ],
    },
    {
        role: 'Frontend Developer Intern',
        company: 'Webingo Infotech · Kolkata, India',
        date: '2022',
        type: 'work',
        desc: 'Developed mobile interfaces and integrated backend services for Android applications.',
        bullets: [
            'Designed Android UI interfaces using Java and XML in Android Studio.',
            'Integrated REST APIs for dynamic data and improved performance.',
            'Delivered multiple app interfaces ahead of schedule — Certificate of Achievement.',
        ],
    },
    {
        role: 'MSc Data Science & Analytics',
        company: 'Royal Holloway, University of London',
        date: 'Sep 2023 – Sep 2024',
        type: 'edu',
        desc: '',
        bullets: [
            'Merit (2:1) — Machine Learning, NLP, Data Visualisation, Big Data Processing.',
            'Dissertation: Predictive analytics for customer behaviour with Scikit-Learn.',
        ],
    },
    {
        role: 'BSc Computer Applications',
        company: 'Birla Institute of Technology, Mesra, India',
        date: 'Graduated 2023',
        type: 'edu',
        desc: '',
        bullets: [
            'Distinction — Python, SQL, Java, Data Mining, Cloud Computing, UI/UX.',
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
                Engineering Journey
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
                            {j.type === 'edu' ? '🎓 Education' : '⚙️ Builder'}
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

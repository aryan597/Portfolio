import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    { q: 'What are your core technical skills?', a: 'SQL, Python (Pandas, NumPy, Scikit-Learn), Tableau, Power BI, Java/Android SDK, AWS S3, and RESTful APIs.' },
    { q: 'Are you currently open to work?', a: 'Yes! I am actively looking for full-time data analyst or mobile developer roles in London.' },
    { q: 'What does your MSc cover?', a: 'My MSc in Data Science & Analytics from Royal Holloway covered machine learning, statistical modelling, business intelligence, and data engineering.' },
    { q: 'Do you have industry experience?', a: 'Yes — I interned at Vodafone Group and also worked in a retail analytics role, building SQL queries and Tableau dashboards for senior leadership.' },
    { q: 'Can you work across data and mobile?', a: 'Absolutely. I bridge both worlds — I analyse data at the backend and build intuitive Android applications on the frontend.' },
];

export const FAQ = () => {
    const [open, setOpen] = useState(null);

    return (
        <section className="section" id="faq" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="container">
                <motion.span
                    className="section-label"
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.6 }}
                >
                    FAQ
                </motion.span>
                <motion.h2
                    style={{ fontSize: 'clamp(48px,6vw,80px)', marginBottom: 64 }}
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    What People Ask
                </motion.h2>

                <div className="faq-list">
                    {faqs.map((f, i) => (
                        <motion.div
                            key={i}
                            className="faq-row"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.65, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
                                {f.q}
                                <div className="faq-icon">
                                    {open === i ? <Minus size={16} /> : <Plus size={16} />}
                                </div>
                            </button>
                            <AnimatePresence>
                                {open === i && (
                                    <motion.div
                                        className="faq-a"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        {f.a}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

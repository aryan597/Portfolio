import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
    { q: 'What is your core technical stack?', a: 'My expertise centers around Python, PyTorch, TensorFlow, and FastAPI for backend ML services. On the edge side, I work with Raspberry Pi/Jetson hardware, MQTT, and local LLMs (Llama-3, Phi-3). I also have strong data engineering foundations using SQL, Pandas, and vector databases.' },
    { q: 'Are you open to full-time roles?', a: 'Yes. I am actively looking for AI Engineer, ML Engineer, and LLM Systems roles based in London. I hold a UK Post-Study Work Visa valid until Jan 2027 and am open to Skilled Worker Visa sponsorship.' },
    { q: 'What did your MSc cover?', a: 'I completed my MSc in Data Science & Analytics (Merit) at Royal Holloway, University of London. The curriculum covered Machine Learning, NLP, Big Data Processing, and Statistical Modelling. My dissertation focused on COVID-19 detection from audio using RL & Random Forests (96% accuracy).' },
    { q: 'Do you have production experience?', a: 'Absolutely. Alongside my academic and independent research, I built the entire backend architecture for NestShift OS, developed live APIs for resume parsing (Resift), and have industry experience managing operations and analytics for leadership teams.' },
];

export const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section className="section" id="faq" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="container">
                <motion.span
                    className="section-label"
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.6 }}
                >
                    Clear Answers
                </motion.span>
                <motion.h2
                    style={{ fontSize: 'clamp(48px,6vw,80px)', marginBottom: 64 }}
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    Frequently Asked
                </motion.h2>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, maxWidth: 800 }}>
                    {faqs.map((f, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                style={{
                                    background: isOpen ? 'var(--accent-dim)' : 'var(--surface)',
                                    border: `1px solid ${isOpen ? 'var(--accent)' : 'var(--border)'}`,
                                    borderRadius: 16,
                                    overflow: 'hidden',
                                    transition: 'background 0.3s, border-color 0.3s'
                                }}
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : i)}
                                    style={{
                                        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                        padding: '24px 32px', background: 'transparent', border: 'none',
                                        color: isOpen ? 'var(--accent)' : 'var(--text-1)',
                                        cursor: 'none', textAlign: 'left',
                                        transition: 'color 0.3s'
                                    }}
                                >
                                    <span style={{ fontFamily: 'Bebas Neue', fontSize: 26, letterSpacing: '0.04em' }}>{f.q}</span>
                                    <motion.div
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        style={{ color: isOpen ? 'var(--accent)' : 'var(--text-3)' }}
                                    >
                                        <ChevronDown size={24} />
                                    </motion.div>
                                </button>
                                
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                            style={{ overflow: 'hidden' }}
                                        >
                                            <div style={{
                                                padding: '0 32px 32px 32px',
                                                color: 'var(--text-2)',
                                                fontSize: 15,
                                                lineHeight: 1.8,
                                                borderTop: '1px solid rgba(255,255,255,0.03)'
                                            }}>
                                                {f.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

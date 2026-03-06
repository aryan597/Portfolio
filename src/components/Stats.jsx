import React from 'react';
import { motion } from 'framer-motion';

const stats = [
    { val: '2+', label: 'Years Experience' },
    { val: '15+', label: 'Technologies' },
    { val: '10+', label: 'Projects Built' },
    { val: 'MSc', label: 'Data Science' },
];

export const Stats = () => (
    <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ paddingTop: 0, paddingBottom: 0 }}>
            <motion.div
                className="stats-grid"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                {stats.map(({ val, label }, i) => (
                    <motion.div
                        key={label}
                        className="stat-cell"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        whileHover={{ y: -4, transition: { duration: 0.25 } }}
                    >
                        <motion.div
                            className="stat-n"
                            initial={{ scale: 0.5, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, delay: 0.1 + i * 0.1, type: 'spring', stiffness: 120 }}
                        >
                            {val}
                        </motion.div>
                        <div className="stat-l">{label}</div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    </section>
);

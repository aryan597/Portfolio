import React from 'react';
import { motion } from 'framer-motion';

export const SectionReveal = ({ children, className = '', id = '' }) => {
    return (
        <motion.section
            id={id}
            className={`py-24 relative ${className}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            {children}
        </motion.section>
    );
};

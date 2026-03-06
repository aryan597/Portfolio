import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, MapPin, Send, Github } from 'lucide-react';
import { useState } from 'react';

const contactLinks = [
    { icon: <Mail size={20} />, label: 'somayajulaaryan@gmail.com', href: 'mailto:somayajulaaryan@gmail.com' },
    { icon: <Phone size={20} />, label: '+44 7407 750520', href: 'tel:+447407750520' },
    { icon: <Linkedin size={20} />, label: 'LinkedIn — Aryan Somayajula', href: 'https://linkedin.com/in/somayajulaaryan' },
    { icon: <Github size={20} />, label: 'GitHub — somayajulaaryan', href: 'https://github.com/somayajulaaryan' },
    { icon: <MapPin size={20} />, label: 'Canary Wharf, Greater London', href: null },
];

export const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [sent, setSent] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => { setSent(false); setForm({ name: '', email: '', message: '' }); }, 3000);
    };

    return (
        <section className="section" id="contact" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="container">
                <motion.span className="section-label"
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.6 }}
                >Get In Touch</motion.span>

                <motion.h2
                    style={{ fontSize: 'clamp(48px,6vw,80px)', marginBottom: 72 }}
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >Let's Work Together</motion.h2>

                <div className="contact-grid">
                    {/* Left */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Real photo — glass card */}
                        <motion.div className="glass"
                            style={{ width: '100%', aspectRatio: '4/3', marginBottom: 32, overflow: 'hidden', borderRadius: 20 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <img src="/aryan.jpg" alt="Aryan Somayajula"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', borderRadius: 18 }}
                            />
                        </motion.div>

                        <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.85, marginBottom: 28, maxWidth: 380 }}>
                            Open to full-time Data Analyst, ML Engineer, and Android Developer roles in London. Let's make something great together.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {contactLinks.map((l, i) => (
                                <motion.a key={i} href={l.href ?? undefined}
                                    target={l.href?.startsWith('http') ? '_blank' : undefined}
                                    rel="noopener noreferrer"
                                    className="contact-row"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.07 }}
                                    style={{ display: 'flex', textDecoration: 'none' }}
                                >
                                    <div className="contact-icon">{l.icon}</div>
                                    <span style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.4 }}>{l.label}</span>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right — form */}
                    <motion.form onSubmit={onSubmit}
                        initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        style={{ display: 'flex', flexDirection: 'column' }}
                    >
                        {/* Decorative glass header */}
                        <motion.div className="glass"
                            style={{ padding: '24px 28px', marginBottom: 32, borderRadius: 16, display: 'flex', alignItems: 'center', gap: 16 }}
                        >
                            <div style={{ width: 52, height: 52, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: 'var(--brutalist-border)' }}>
                                <img src="/aryan.jpg" alt="Aryan" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                            </div>
                            <div>
                                <div style={{ fontFamily: 'Bebas Neue', fontSize: 20 }}>Aryan Somayajula</div>
                                <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>Typically responds within 24 hours</div>
                            </div>
                            <div className="pulse" style={{ marginLeft: 'auto', flexShrink: 0 }} />
                        </motion.div>

                        {[
                            { id: 'name', label: 'Your Name', type: 'text', placeholder: 'Jane Smith' },
                            { id: 'email', label: 'Your Email', type: 'email', placeholder: 'jane@example.com' },
                        ].map(f => (
                            <div key={f.id} className="form-group">
                                <label htmlFor={f.id} className="form-label">{f.label}</label>
                                <input id={f.id} required type={f.type} className="form-control" placeholder={f.placeholder}
                                    value={form[f.id]} onChange={e => setForm({ ...form, [f.id]: e.target.value })} />
                            </div>
                        ))}
                        <div className="form-group">
                            <label htmlFor="message" className="form-label">Message</label>
                            <textarea id="message" required rows={6} className="form-control"
                                placeholder="Tell me about your project or opportunity..."
                                value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                        </div>
                        <motion.button type="submit" className="btn btn-accent"
                            style={{ justifyContent: 'center' }}
                            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                        >
                            {sent ? '✓ Message Sent!' : <><Send size={18} /> Send Message</>}
                        </motion.button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
};

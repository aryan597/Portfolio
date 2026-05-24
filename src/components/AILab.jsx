import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cpu, Zap, Activity } from 'lucide-react';

const PREDEFINED_PROMPTS = [
    { label: "Check System Health", command: "sys_health --verbose", response: "NESTSHIFT OS v2.1.4\nStatus: ONLINE\nEdge LLM: LLaMA-3 (4-bit quantized)\nLatency: 142ms\nMemory Usage: 4.2GB / 8.0GB\nAll sensors operational." },
    { label: "Analyze Churn Data", command: "run_model --target 'customer_churn'", response: "Loading XGBoost model...\nFetching latest user telemetry...\n[✓] Analysis complete.\n\nInsights:\n- 'NumOfProducts' & 'Age' are top predictors.\n- 86% recall achieved on test set.\n- Suggested Action: Deploy retention campaign for users >45yrs." },
    { label: "Optimize Energy", command: "energy_agent optimize --mode aggressive", response: "Executing energy optimization protocol...\n- Non-Intrusive Load Monitoring (NILM) active.\n- Predicted peak tariff: 17:00 - 19:00.\n- Action: Pre-cooling HVAC by 2°C.\n- Action: Shifting EV charge schedule to 02:00.\n[✓] Estimated daily saving: 14%." },
];

export const AILab = () => {
    const [history, setHistory] = useState([
        { type: 'system', text: "Welcome to the Agentic Terminal. Environment initialized." },
        { type: 'system', text: "Type a command or select a quick action below." }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const endRef = useRef(null);

    const runCommand = async (cmd, resp) => {
        if (isTyping) return;
        setIsTyping(true);
        
        // Add user command
        setHistory(prev => [...prev, { type: 'user', text: `> ${cmd}` }]);
        
        // Simulate thinking delay
        await new Promise(r => setTimeout(r, 600));
        
        // Split response into lines for dramatic typing effect
        const lines = resp.split('\n');
        for (let i = 0; i < lines.length; i++) {
            setHistory(prev => [...prev, { type: 'response', text: lines[i] }]);
            await new Promise(r => setTimeout(r, 200 + Math.random() * 200));
        }
        
        setIsTyping(false);
    };

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    return (
        <section className="section" id="ailab" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="container">
                <motion.span className="section-label"
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.6 }}
                >Interactive Demo</motion.span>
                <motion.h2
                    style={{ fontSize: 'clamp(48px,6vw,80px)', marginBottom: 16 }}
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >Agentic Terminal</motion.h2>
                <motion.p
                    style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.75, maxWidth: 560, marginBottom: 56 }}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
                >
                    Experience a simulation of the local LLM agents and data pipelines I build. Select a prompt below to interact with the system.
                </motion.p>

                <div style={{
                    background: '#0a0d14', // Pure dark for terminal feel
                    border: '1px solid var(--border)',
                    borderRadius: 16,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    height: 500,
                    boxShadow: 'var(--shadow-lg)'
                }}>
                    {/* Terminal Header */}
                    <div style={{ 
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                        padding: '12px 20px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)' 
                    }}>
                        <div style={{ display: 'flex', gap: 6 }}>
                            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
                            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
                            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-3)', fontFamily: 'DM Mono, monospace', fontSize: 12 }}>
                            <Terminal size={14} /> root@aryan-edge-node
                        </div>
                    </div>

                    {/* Terminal Window */}
                    <div style={{ 
                        flex: 1, padding: '24px', overflowY: 'auto', 
                        fontFamily: 'DM Mono, monospace', fontSize: 13, lineHeight: 1.6,
                        color: 'var(--text-1)'
                    }}>
                        <AnimatePresence initial={false}>
                            {history.map((h, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    style={{ 
                                        marginBottom: 8,
                                        color: h.type === 'user' ? '#00E5A0' : h.type === 'system' ? 'var(--text-3)' : 'var(--text-1)',
                                        whiteSpace: 'pre-wrap'
                                    }}
                                >
                                    {h.text}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {isTyping && (
                            <motion.div 
                                animate={{ opacity: [1, 0] }} 
                                transition={{ duration: 0.8, repeat: Infinity }}
                                style={{ display: 'inline-block', width: 8, height: 16, background: '#00E5A0', verticalAlign: 'middle', marginTop: 8 }}
                            />
                        )}
                        <div ref={endRef} />
                    </div>

                    {/* Quick Actions */}
                    <div style={{ 
                        padding: '16px', background: 'rgba(255,255,255,0.02)', 
                        borderTop: '1px solid var(--border)', display: 'flex', flexWrap: 'wrap', gap: 10 
                    }}>
                        {PREDEFINED_PROMPTS.map((p, i) => (
                            <button
                                key={i}
                                onClick={() => runCommand(p.command, p.response)}
                                disabled={isTyping}
                                style={{
                                    background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)',
                                    color: 'var(--text-2)', padding: '8px 16px', borderRadius: 8,
                                    fontFamily: 'DM Mono, monospace', fontSize: 11, cursor: isTyping ? 'not-allowed' : 'none',
                                    transition: 'all 0.2s',
                                    opacity: isTyping ? 0.5 : 1
                                }}
                                onMouseEnter={e => { if(!isTyping) { e.currentTarget.style.color = '#00E5A0'; e.currentTarget.style.borderColor = '#00E5A0'; } }}
                                onMouseLeave={e => { if(!isTyping) { e.currentTarget.style.color = 'var(--text-2)'; e.currentTarget.style.borderColor = 'var(--border)'; } }}
                            >
                                $ {p.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

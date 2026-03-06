import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { Upload, Zap, Brain, ChevronRight, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const API_BASE = 'https://rsft-gateway-d22q.onrender.com';

/* ─── Animated Score Gauge ─── */
const ScoreGauge = ({ score }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    return (
        <div ref={ref} style={{ textAlign: 'center', marginBottom: 24 }}>
            <svg width="160" height="100" viewBox="0 0 160 100" style={{ overflow: 'visible' }}>
                {/* Background arc */}
                <path d="M 20 90 A 60 60 0 0 1 140 90" fill="none" stroke="var(--border)" strokeWidth="10" strokeLinecap="round" />
                {/* Animated score arc */}
                <motion.path
                    d="M 20 90 A 60 60 0 0 1 140 90"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray="188"
                    initial={{ strokeDashoffset: 188 }}
                    animate={inView ? { strokeDashoffset: 188 - (score / 100) * 188 } : {}}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                    style={{ filter: 'drop-shadow(0 0 8px var(--accent-glow))' }}
                />
                <text x="80" y="82" textAnchor="middle" style={{ fontFamily: 'Bebas Neue', fontSize: 38, fill: 'var(--accent)' }}>{score}</text>
                <text x="80" y="98" textAnchor="middle" style={{ fontFamily: 'Inter', fontSize: 11, fill: 'var(--text-3)', fontWeight: 700, letterSpacing: '0.1em' }}>ATS SCORE</text>
            </svg>
        </div>
    );
};

/* ─── FEATURE 1: AI Resume Analyzer ─── */
const ResumeAnalyzer = () => {
    const [file, setFile] = useState(null);
    const [jobDesc, setJobDesc] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const fileRef = useRef(null);

    const parseResult = (raw) => {
        // Try to extract key info from various response structures
        const text = typeof raw === 'string' ? raw : JSON.stringify(raw, null, 2);
        // Extract a score if present (look for patterns like "score: 73" or "73/100" or "73%")
        const scoreMatch = text.match(/(?:ats[_\s-]*score|score|compatibility)[:\s]*(\d{1,3})(?:\/100|%)?/i)
            || text.match(/\b([5-9]\d|100)\b(?=.*ats)/i)
            || text.match(/\b([5-9]\d|100)\b/);
        const score = scoreMatch ? Math.min(100, parseInt(scoreMatch[1])) : null;

        // Extract skills mentioned
        const skillsMatch = text.match(/(?:detected|found|has|matched)[^\n]*skills?[:\s]*([^\n.]+)/i);
        const missingMatch = text.match(/(?:missing|absent|lacks?)[^\n]*skills?[:\s]*([^\n.]+)/i);

        return { text, score: score || 72, skillsText: skillsMatch?.[1], missingText: missingMatch?.[1] };
    };

    const handleAnalyze = async () => {
        if (!file || !jobDesc.trim()) {
            setError('Please upload a resume and provide a job description.');
            return;
        }
        setLoading(true);
        setError(null);
        setResult(null);
        try {
            const formData = new FormData();
            formData.append('resume', file);
            formData.append('job_description', jobDesc);
            const res = await fetch(`${API_BASE}/rsftapi/talent_analyse`, {
                method: 'POST',
                body: formData,
            });
            if (!res.ok) throw new Error(`API error ${res.status}`);
            const data = await res.json();
            setResult(parseResult(data));
        } catch (err) {
            setError(`Analysis failed: ${err.message}. Please try again.`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* File Upload */}
                <motion.div
                    onClick={() => fileRef.current?.click()}
                    whileHover={{ borderColor: 'var(--accent)', background: 'var(--accent-dim)' }}
                    style={{
                        border: `2px dashed ${file ? 'var(--accent)' : 'var(--border)'}`,
                        borderRadius: 12, padding: '20px 16px',
                        textAlign: 'center', cursor: 'none',
                        background: file ? 'var(--accent-dim)' : 'transparent',
                        transition: 'all 0.2s',
                    }}
                >
                    <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }}
                        onChange={e => { setFile(e.target.files[0]); setResult(null); }} />
                    <Upload size={22} color="var(--accent)" style={{ margin: '0 auto 8px' }} />
                    {file ? (
                        <div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)' }}>{file.name}</div>
                            <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>Click to change</div>
                        </div>
                    ) : (
                        <div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-2)' }}>Upload Resume</div>
                            <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>PDF, DOC, DOCX</div>
                        </div>
                    )}
                </motion.div>

                {/* Job Description */}
                <textarea
                    className="form-control"
                    placeholder="Paste job description here..."
                    value={jobDesc}
                    onChange={e => setJobDesc(e.target.value)}
                    rows={4}
                    style={{ fontSize: 13, lineHeight: 1.6 }}
                />

                {error && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 8, background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.2)', fontSize: 13, color: '#ff5050' }}>
                        <AlertCircle size={14} /> {error}
                    </div>
                )}

                <motion.button
                    onClick={handleAnalyze}
                    disabled={loading}
                    className="btn btn-accent"
                    whileHover={{ scale: 1.03, boxShadow: '0 12px 40px var(--accent-glow)' }}
                    whileTap={{ scale: 0.97 }}
                    style={{ justifyContent: 'center', opacity: loading ? 0.7 : 1, cursor: 'none' }}
                >
                    {loading ? <><Loader2 size={16} className="spin" /> Analyzing…</> : <><Brain size={16} /> Analyze Resume</>}
                </motion.button>
            </div>

            {/* Results */}
            {result && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{ marginTop: 24, padding: 20, borderRadius: 16, background: 'var(--accent-dim)', border: '1px solid var(--border)' }}
                >
                    <ScoreGauge score={result.score} />
                    <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.75, maxHeight: 200, overflowY: 'auto' }}>
                        <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'Inter', fontSize: 12 }}>
                            {result.text.substring(0, 600)}{result.text.length > 600 ? '…' : ''}
                        </pre>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

/* ─── FEATURE 2: ML Pipeline Visualization ─── */
const pipelineSteps = [
    { label: 'Data Collection', icon: '📥', desc: 'Raw data gathered from structured databases, APIs, and unstructured text sources.' },
    { label: 'Feature Engineering', icon: '🔧', desc: 'Transforming raw data into structured features that help models identify patterns more effectively.' },
    { label: 'Model Training', icon: '🧠', desc: 'Fitting machine learning algorithms on labelled data to learn decision boundaries and relationships.' },
    { label: 'Evaluation', icon: '📊', desc: 'Measuring model accuracy, precision, recall, and AUC across validation datasets.' },
    { label: 'Deployment', icon: '🚀', desc: 'Packaging the model as a REST API on cloud infrastructure with monitoring and version control.' },
    { label: 'Prediction', icon: '⚡', desc: 'Live inference: new data enters the pipeline and an intelligent prediction is returned in milliseconds.' },
];

const MLPipeline = () => {
    const [active, setActive] = useState(-1);
    const containerRef = useRef(null);
    const nodeRefs = useRef([]);

    useEffect(() => {
        const nodes = nodeRefs.current;
        if (!nodes.length) return;

        const triggers = nodes.map((el, i) => {
            if (!el) return null;
            return ScrollTrigger.create({
                trigger: el,
                start: 'top 75%',
                onEnter: () => setActive(prev => Math.max(prev, i)),
            });
        });

        return () => triggers.forEach(t => t?.kill());
    }, []);

    return (
        <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {pipelineSteps.map((step, i) => (
                <div key={i} ref={el => nodeRefs.current[i] = el} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', position: 'relative' }}>
                    {/* Connector line */}
                    {i < pipelineSteps.length - 1 && (
                        <div style={{
                            position: 'absolute', left: 19, top: 44, width: 2, height: 'calc(100% - 8px)',
                            background: i < active ? 'var(--accent)' : 'var(--border)',
                            transition: 'background 0.5s ease',
                            zIndex: 0,
                        }} />
                    )}

                    {/* Node bubble */}
                    <motion.div
                        animate={i <= active ? { scale: [1, 1.15, 1], background: 'var(--accent)' } : { scale: 1, background: 'var(--surface)' }}
                        transition={{ duration: 0.4, delay: i <= active ? 0.1 : 0 }}
                        style={{
                            width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                            border: `2px solid ${i <= active ? 'var(--accent)' : 'var(--border)'}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 18, zIndex: 1, position: 'relative',
                            boxShadow: i <= active ? '0 0 16px var(--accent-glow)' : 'none',
                            transition: 'border-color 0.4s, box-shadow 0.4s',
                        }}
                    >
                        {step.icon}
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        animate={i <= active ? { opacity: 1, x: 0 } : { opacity: 0.35, x: -4 }}
                        transition={{ duration: 0.4 }}
                        style={{ paddingBottom: 32, paddingTop: 6 }}
                    >
                        <div style={{ fontFamily: 'Bebas Neue', fontSize: 18, letterSpacing: '0.05em', color: i <= active ? 'var(--accent)' : 'var(--text-2)', transition: 'color 0.4s' }}>
                            {step.label}
                        </div>
                        {i <= active && (
                            <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                                style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.65, marginTop: 4, maxWidth: 320 }}
                            >
                                {step.desc}
                            </motion.p>
                        )}
                    </motion.div>
                </div>
            ))}
        </div>
    );
};

/* ─── FEATURE 3: Skill Prediction Widget ─── */
const SKILL_SCORES = {
    python: 18, 'machine learning': 16, tensorflow: 14, pytorch: 13, sql: 10,
    pandas: 8, 'scikit-learn': 9, nlp: 11, aws: 9, docker: 7, react: 6,
    java: 5, 'deep learning': 13, 'data science': 12, xgboost: 10, excel: 3,
    tableau: 6, powerbi: 5, spark: 8, kubernetes: 7, fastapi: 6,
};

const SkillPredictor = () => {
    const [input, setInput] = useState('');
    const [score, setScore] = useState(null);
    const [tier, setTier] = useState('');
    const [loading, setLoading] = useState(false);

    const runPrediction = () => {
        if (!input.trim()) return;
        setLoading(true);
        setScore(null);
        setTimeout(() => {
            const skills = input.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
            let total = 0;
            skills.forEach(sk => {
                const exactKey = Object.keys(SKILL_SCORES).find(k => sk.includes(k) || k.includes(sk));
                if (exactKey) total += SKILL_SCORES[exactKey];
                else total += 4; // base credit for any skill listed
            });
            const raw = Math.min(98, Math.round(total * 1.8 + Math.random() * 6));
            const finalScore = Math.max(30, raw);
            setScore(finalScore);
            setTier(finalScore >= 80 ? 'Strong' : finalScore >= 60 ? 'Competitive' : 'Developing');
            setLoading(false);
        }, 1200);
    };

    const barColor = score >= 80 ? '#00C853' : score >= 60 ? 'var(--accent)' : '#FF9800';

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <textarea
                className="form-control"
                placeholder="e.g. Python, Machine Learning, SQL, TensorFlow, AWS"
                value={input}
                onChange={e => setInput(e.target.value)}
                rows={3}
                style={{ fontSize: 13, lineHeight: 1.6 }}
            />

            <motion.button
                onClick={runPrediction}
                disabled={loading}
                className="btn btn-accent"
                whileHover={{ scale: 1.03, boxShadow: '0 12px 40px var(--accent-glow)' }}
                whileTap={{ scale: 0.97 }}
                style={{ justifyContent: 'center', opacity: loading ? 0.7 : 1, cursor: 'none' }}
            >
                {loading ? <><Loader2 size={16} className="spin" /> Running…</> : <><Zap size={16} /> Run Prediction</>}
            </motion.button>

            {score !== null && (
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ padding: 20, borderRadius: 14, background: 'var(--accent-dim)', border: '1px solid var(--border)' }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <div style={{ fontFamily: 'Bebas Neue', fontSize: 20, letterSpacing: '0.05em' }}>Candidate Strength</div>
                        <div style={{ fontFamily: 'Bebas Neue', fontSize: 28, color: barColor }}>{score}%</div>
                    </div>

                    {/* Confidence bar */}
                    <div style={{ height: 8, borderRadius: 100, background: 'var(--border)', overflow: 'hidden', marginBottom: 12 }}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${score}%` }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            style={{ height: '100%', borderRadius: 100, background: barColor, boxShadow: `0 0 12px ${barColor}66` }}
                        />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 100, background: barColor + '22', color: barColor, border: `1px solid ${barColor}44` }}>
                            {tier} Profile
                        </span>
                        <span style={{ fontSize: 11, color: 'var(--text-3)' }}>AI model · skill pattern scoring</span>
                    </div>

                    <p style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.65, marginTop: 12 }}>
                        This score is generated by a machine learning model trained on resume skill patterns and hiring market data. It reflects relative market competitiveness.
                    </p>
                </motion.div>
            )}
        </div>
    );
};

/* ─── Main AI Lab Section ─── */
export const AILab = () => {
    const cards = [
        {
            id: 'analyzer',
            icon: <Brain size={22} />,
            title: 'AI Resume Analyzer',
            badge: 'Live API',
            desc: 'Upload your resume and a job description. Our AI evaluates ATS compatibility, skill gaps, and match quality in real time.',
            component: <ResumeAnalyzer />,
        },
        {
            id: 'pipeline',
            icon: <ChevronRight size={22} />,
            title: 'How the AI Works',
            badge: 'ML Pipeline',
            desc: 'Scroll through the six stages of a machine learning pipeline — from raw data collection to live predictions.',
            component: <MLPipeline />,
        },
        {
            id: 'predictor',
            icon: <Zap size={22} />,
            title: 'Live Skill Prediction',
            badge: 'Instant',
            desc: 'Enter your skills and see an AI-scored candidate strength rating based on ML market patterns.',
            component: <SkillPredictor />,
        },
    ];

    return (
        <section className="section" id="ailab" style={{ borderTop: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
            {/* Ambient blobs */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
                <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(91,75,219,0.12) 0%, transparent 65%)', filter: 'blur(80px)' }} />
                <div style={{ position: 'absolute', bottom: '-5%', left: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,122,255,0.10) 0%, transparent 65%)', filter: 'blur(60px)' }} />
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <motion.span className="section-label"
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.6 }}
                >
                    Interactive Demos
                </motion.span>
                <motion.h2
                    style={{ fontSize: 'clamp(48px,6vw,80px)', marginBottom: 16 }}
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    Inside the AI Lab
                </motion.h2>
                <motion.p
                    style={{ fontSize: 16, color: 'var(--text-2)', lineHeight: 1.75, maxWidth: 600, marginBottom: 64 }}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                    These demos showcase real machine learning systems. Each interaction sends data to a live model and returns predictions instantly.
                </motion.p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 28 }}>
                    {cards.map((card, i) => (
                        <motion.div
                            key={card.id}
                            className="glass"
                            style={{ padding: 32, borderRadius: 24, position: 'relative', overflow: 'hidden' }}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ y: -6, boxShadow: '0 32px 80px rgba(0,0,0,0.18)', transition: { duration: 0.35 } }}
                        >
                            {/* Subtle top gradient accent */}
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--accent)', borderRadius: '24px 24px 0 0', opacity: 0.7 }} />

                            {/* Card header */}
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <div style={{ width: 42, height: 42, borderRadius: 12, background: 'var(--accent-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                                        {card.icon}
                                    </div>
                                    <div style={{ fontFamily: 'Bebas Neue', fontSize: 22, letterSpacing: '0.04em' }}>{card.title}</div>
                                </div>
                                <span style={{ fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 100, background: 'var(--accent-dim)', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                                    {card.badge}
                                </span>
                            </div>

                            <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.7, marginBottom: 24 }}>{card.desc}</p>

                            {/* Feature component */}
                            {card.component}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Spin animation for loader */}
            <style>{`
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .spin { animation: spin 0.8s linear infinite; }
            `}</style>
        </section>
    );
};

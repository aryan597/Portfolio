import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Cursor } from './components/ui/Cursor';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Stats } from './components/Stats';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { AILab } from './components/AILab';
import { ScrollToTop } from './components/ui/ScrollToTop';

function App() {
  const [dark, setDark] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    document.body.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <>
      <Cursor />
      <motion.div className="progress-bar" style={{ scaleX }} />
      <Navigation />

      <main>
        <Hero />
        <About />
        <Skills />
        <Stats />
        <Experience />
        <Projects />
        <AILab />
        <FAQ />
        <Contact />
      </main>

      <footer>
        <div className="container footer">
          <span className="footer-copy">© {new Date().getFullYear()} Aryan Somayajula</span>
          <span className="footer-copy">Built with React · Framer Motion</span>
        </div>
      </footer>

      {/* Cute theme toggle */}
      <motion.div
        className="theme-toggle"
        onClick={() => setDark(d => !d)}
        whileTap={{ scale: 0.9 }}
        title="Toggle dark mode"
      >
        <motion.div
          className="theme-knob"
          animate={{ x: dark ? 22 : 0 }}
          transition={{ type: 'spring', stiffness: 600, damping: 32 }}
        />
      </motion.div>
      {/* Custom Scroll To Top */}
      <ScrollToTop />
    </>
  );
}
export default App;

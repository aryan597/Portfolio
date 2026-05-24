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
import { Footer } from './components/Footer';
import { AILab } from './components/AILab';
import { ScrollToTop } from './components/ui/ScrollToTop';

function App() {
  const [isDark, setIsDark] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    // Our CSS defaults to dark mode tokens. 
    // We toggle the .light class when isDark is false.
    document.body.classList.toggle('light', !isDark);
  }, [isDark]);

  return (
    <>
      <Cursor />
      <motion.div className="progress-bar" style={{ scaleX }} />
      <Navigation onToggleTheme={() => setIsDark(d => !d)} isDark={isDark} />

      <main>
        <Hero />
        <About />
        <Skills />
        <Stats />
        <Experience />
        <Projects />
        <AILab />
        <FAQ />
      </main>

      <Footer />

      <ScrollToTop />
    </>
  );
}
export default App;

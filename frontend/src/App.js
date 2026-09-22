import { useEffect, useState } from "react";
import Lenis from "lenis";
import { AnimatePresence, MotionConfig } from "framer-motion";
import "@/App.css";
import { AppProvider } from "./store";
import { lenisStore } from "./lenis";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Organization from "./components/Organization";
import Skills from "./components/Skills";
import Portfolio from "./components/Portfolio";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

function Site() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenisStore.instance = lenis;
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisStore.instance = null;
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="App min-h-screen overflow-x-clip bg-[var(--bg)] font-body text-[var(--ink)]">
        <AnimatePresence>
          {loading && <Preloader onDone={() => setLoading(false)} />}
        </AnimatePresence>
        <Navbar />
        <main>
          <Hero started={!loading} />
          <About />
          <Education />
          <Experience />
          <Organization />
          <Skills />
          <Portfolio />
          <Achievements />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </MotionConfig>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Site />
    </AppProvider>
  );
}

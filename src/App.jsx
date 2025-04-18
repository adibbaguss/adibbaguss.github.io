import React, { useEffect, useState } from 'react';

import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Experience from './components/Experience/Experience';
import Projects from './components/Projects/Project';
import Educations from './components/Educations/Educations';
// import Social from './components/Social/Sosial';
import Certificates from './components/Certificates/Certificates';
import { Contact } from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import SplashScreen from './components/SplashScreen/SplashScreen';
import AOS from 'aos';

function App() {
  const [ready, setReady] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []); // Added empty dependency array to useEffect

  // useEffect(() => {
  //   // Disable right-click context menu
  //   const disableRightClick = (e) => {
  //     e.preventDefault();
  //   };

  //   document.addEventListener('contextmenu', disableRightClick);

  //   return () => {
  //     document.removeEventListener('contextmenu', disableRightClick);
  //   };
  // }, []);

  const handleSplashFinished = () => {
    setShowSplash(false);
  };

  return (
    <div>
      {showSplash ? (
        <SplashScreen onFinished={handleSplashFinished} />
      ) : (
        <>
          {/* <Header /> */}
          <Hero />

          <div data-aos="fade-up" data-aos-duration="1200">
            <About />
            <Experience />
            <Projects />
            <Educations />
            <Certificates />

            <Contact />
            <Footer />
          </div>
        </>
      )}
    </div>
  );
}

export default App;

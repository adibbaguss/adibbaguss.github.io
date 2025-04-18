import React, { useEffect } from 'react';
import dataJson from '../../data/data.json';
import 'aos/dist/aos.css';
import AOS from 'aos';
import './Hero.css';
import Weather from '../Weather/Weather';
import { motion } from 'framer-motion';

function Hero() {
  //   aos animate
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <section className="lg:h-screen bg-primary-color text-secondary-color items-center justify-center overflow-hidden">

      <div className="lg:absolute lg:bottom-0 relative mt-1">
        <div className="mb-2">
          <Weather />
        </div>
        <img src={dataJson.hero.heroText1} alt="Hero text-1" className="px-2 pb-4 hero-text" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true" data-aos-anchor-placement="top-bottom" loading="lazy" />
        <img src={dataJson.hero.heroText1} alt="Hero text-1" className="px-2 pb-4 hero-text" data-aos="fade-up" data-aos-duration="800" data-aos-once="true" data-aos-anchor-placement="top-bottom" loading="lazy" />
        <img src={dataJson.hero.heroText1} alt="Hero text-1" className="px-2 pb-9 hero-text" data-aos="fade-up" data-aos-duration="600" data-aos-once="true" data-aos-anchor-placement="top-bottom" loading="lazy" />
        <div className="w-full absolute bottom-0 h-full lg:h-screen overflow-hidden" data-aos="zoom-in-up" data-aos-duration="800" data-aos-once="true" data-aos-anchor-placement="top-bottom">
          <motion.img src={dataJson.hero.avatar} alt="avatar" className="h-full mx-auto" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} loading="lazy" />
        </div>

        <div className="absolute bottom-0 w-full h-40" data-aos="fade-up" data-aos-duration="1200" data-aos-once="true" data-aos-anchor-placement="top-bottom">
          <p className="w-full absolute bottom-0 pb-1 font-bold text-center lg:text-3xl md:text-2xl sm:text-1xl">{dataJson.role}</p>
        </div>

        <img src={dataJson.hero.heroText2} alt="Hero text-2" className="absolute bottom-0 px-2 pb-9" data-aos="fade-up" data-aos-duration="600" data-aos-once="true" data-aos-anchor-placement="top-bottom" loading="lazy" />
      </div>
    </section>
  );
}

export default Hero;

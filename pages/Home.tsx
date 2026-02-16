import React from 'react';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import About from '../components/About';
import TechStack from '../components/TechStack';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import SectionHUD from '../components/SectionHUD';
import { scrollToSection } from '../utils/scroll';

const Home = () => {
    return (
        <main>
            <SEO 
                title="Home" 
                description="Bayu Permana - Data Systems Engineer & Full-Stack Developer portfolio." 
            />
            <SectionHUD />
            <Hero scrollToSection={scrollToSection} />
            <About />
            <TechStack />
            <Projects />
            <Contact />
        </main>
    );
};

export default Home;

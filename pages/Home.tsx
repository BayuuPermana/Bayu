import React from 'react';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import About from '../components/About';
import TechStack from '../components/TechStack';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

const Home = () => {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <main>
            <SEO 
                title="Home" 
                description="Bayu Permana - Data Systems Engineer & Full-Stack Developer portfolio." 
            />
            <Hero scrollToSection={scrollToSection} />
            <About />
            <TechStack />
            <Projects />
            <Contact />
        </main>
    );
};

export default Home;

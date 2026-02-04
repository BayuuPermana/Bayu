import React from 'react';
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
            <Hero scrollToSection={scrollToSection} />
            <About />
            <TechStack />
            <Projects />
            <Contact />
        </main>
    );
};

export default Home;

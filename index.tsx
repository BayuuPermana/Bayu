import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Contact from './components/Contact';

const Portfolio = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle scroll effects
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(id);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans selection:bg-purple-500/30">
            <Navigation isScrolled={isScrolled} scrollToSection={scrollToSection} />
            <Hero scrollToSection={scrollToSection} />
            <About />
            <TechStack />
            <Projects />
            <Contact />
        </div>
    );
};

export default Portfolio;
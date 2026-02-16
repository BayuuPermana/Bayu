import React, { useState, useEffect } from 'react';
import { scrollToSection } from '../utils/scroll';

interface NavItem {
    id: string;
    label: string;
}

const navItems: NavItem[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'stack', label: 'Stack' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
];

const SectionHUD: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string>('home');

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-40% 0px -40% 0px', // Trigger when section is roughly in the middle
            threshold: 0
        };

        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, observerOptions);

        navItems.forEach((item) => {
            const element = document.getElementById(item.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-6 items-center">
            {navItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="group relative flex items-center justify-center"
                    aria-label={`Scroll to ${item.label}`}
                >
                    {/* Label */}
                    <span className="absolute right-8 px-2 py-1 rounded bg-gray-900 dark:bg-white text-white dark:text-black text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {item.label}
                    </span>
                    
                    {/* Dot */}
                    <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 border-2 ${
                        activeSection === item.id 
                        ? 'bg-green-500 border-green-500 scale-125' 
                        : 'bg-transparent border-gray-400 dark:border-gray-600 hover:border-green-500'
                    }`} />
                </button>
            ))}
        </div>
    );
};

export default SectionHUD;

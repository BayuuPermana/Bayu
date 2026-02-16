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
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4 items-end">
            {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                    <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className="group flex items-center gap-3 py-1 pl-4 pr-1 transition-all duration-300 rounded-full hover:bg-black/5 dark:hover:bg-white/5"
                        aria-label={`Scroll to ${item.label}`}
                    >
                        <span className={`text-xs font-bold transition-all duration-300 whitespace-nowrap ${
                            isActive 
                            ? 'opacity-100 text-green-500' 
                            : 'opacity-0 group-hover:opacity-60 text-gray-900 dark:text-white'
                        }`}>
                            {item.label}
                        </span>
                        
                        <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 border-2 ${
                            isActive 
                            ? 'bg-green-500 border-green-500 scale-125' 
                            : 'bg-transparent border-gray-400 dark:border-gray-600 group-hover:border-green-500'
                        }`} />
                    </button>
                );
            })}
        </div>
    );
};

export default SectionHUD;

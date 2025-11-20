import React from 'react';
import { Github } from 'lucide-react';

interface NavigationProps {
    isScrolled: boolean;
    scrollToSection: (id: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ isScrolled, scrollToSection }) => {
    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent cursor-pointer" onClick={() => scrollToSection('home')}>
                    Bayuu<span className="text-white">Permana</span>
                </div>
                <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
                    {['Home', 'About', 'Stack', 'Projects', 'Contact'].map((item) => (
                        <button
                            key={item}
                            onClick={() => scrollToSection(item.toLowerCase())}
                            className="hover:text-purple-400 transition-colors uppercase tracking-wider"
                        >
                            {item}
                        </button>
                    ))}
                </div>
                <a
                    href="https://github.com/BayuuPermana"
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-all backdrop-blur-sm border border-white/10 flex items-center gap-2"
                >
                    <Github size={16} />
                    GitHub
                </a>
            </div>
        </nav>
    );
};

export default Navigation;

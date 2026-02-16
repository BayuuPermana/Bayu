import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Github, Sun, Moon, Menu, X } from 'lucide-react';

interface NavigationProps {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ theme, toggleTheme }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location]);

    const navItems = ['Home', 'About', 'Stack', 'Projects', 'Contact'];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md border-b border-gray-200 dark:border-white/5 py-3' : 'bg-transparent py-5'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white" onClick={() => setIsMenuOpen(false)}>
                    Bayuu<span className="text-green-600 dark:text-green-400">Permana</span>
                </Link>
                
                <div className="hidden md:flex gap-8 text-sm font-medium text-gray-500 dark:text-gray-400 items-center">
                    <Link
                        to="/"
                        className={`hover:text-green-500 dark:hover:text-green-400 transition-colors uppercase tracking-wider text-xs ${location.pathname === '/' ? 'text-green-500' : ''}`}
                    >
                        Home
                    </Link>
                    <Link 
                        to="/blog" 
                        className={`hover:text-green-500 dark:hover:text-green-400 transition-colors uppercase tracking-wider text-xs ${location.pathname.startsWith('/blog') ? 'text-green-500' : ''}`}
                    >
                        Blog
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-gray-600 dark:text-gray-400"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                    <a
                        href="https://github.com/BayuuPermana"
                        target="_blank"
                        rel="noreferrer"
                        className="hidden sm:flex px-4 py-1.5 bg-gray-900 dark:bg-white/10 text-white dark:text-white hover:bg-gray-800 dark:hover:bg-white/20 rounded-full text-xs font-medium transition-all backdrop-blur-sm border border-transparent dark:border-white/10 items-center gap-2"
                    >
                        <Github size={14} />
                        <span>GitHub</span>
                    </a>
                    <button className="md:hidden text-gray-600 dark:text-gray-400" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-white/5 py-4 px-6 flex flex-col gap-4">
                    {navItems.map((item) => (
                        <Link
                            key={item}
                            to={`/#${item.toLowerCase()}`}
                            onClick={() => setIsMenuOpen(false)}
                            className="text-left py-2 hover:text-green-500 dark:hover:text-green-400 transition-colors uppercase tracking-wider text-xs font-medium"
                        >
                            {item}
                        </Link>
                    ))}
                    <Link to="/blog" className="py-2 hover:text-green-500 dark:hover:text-green-400 transition-colors uppercase tracking-wider text-xs font-medium" onClick={() => setIsMenuOpen(false)}>Blog</Link>
                </div>
            )}
        </nav>
    );
};

export default Navigation;

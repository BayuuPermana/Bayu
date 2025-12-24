import { Github, Sun, Moon } from 'lucide-react';

interface NavigationProps {
    isScrolled: boolean;
    scrollToSection: (id: string) => void;
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isScrolled, scrollToSection, theme, toggleTheme }) => {
    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md border-b border-gray-200 dark:border-white/5 py-4' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent cursor-pointer" onClick={() => scrollToSection('home')}>
                    Bayuu<span className="text-gray-900 dark:text-white">Permana</span>
                </div>
                <div className="hidden md:flex gap-8 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {['Home', 'About', 'Stack', 'Projects', 'Contact'].map((item) => (
                        <button
                            key={item}
                            onClick={() => scrollToSection(item.toLowerCase())}
                            className="hover:text-green-500 dark:hover:text-green-400 transition-colors uppercase tracking-wider"
                        >
                            {item}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-gray-600 dark:text-gray-400"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <a
                        href="https://github.com/BayuuPermana"
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-2 bg-gray-900 dark:bg-white/10 text-white dark:text-white hover:bg-gray-800 dark:hover:bg-white/20 rounded-full text-sm font-medium transition-all backdrop-blur-sm border border-transparent dark:border-white/10 flex items-center gap-2"
                    >
                        <Github size={16} />
                        <span className="hidden sm:inline">GitHub</span>
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;

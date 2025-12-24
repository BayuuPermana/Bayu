import React from 'react';
import { Sparkles, ExternalLink, ChevronDown } from 'lucide-react';

interface HeroProps {
    scrollToSection: (id: string) => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToSection }) => {
    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
            {/* Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 dark:bg-green-600/20 rounded-full blur-[128px]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[128px]" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-300 text-sm mb-8 animate-fade-in-up">
                    <Sparkles size={14} />
                    <span>Open to Work & Collaboration</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight text-gray-900 dark:text-white">
                    Bridging <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-500 dark:from-green-400 dark:to-blue-300">Data</span> and <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400">Development</span>
                </h1>

                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                    I'm a Data Analyst and Full-Stack Developer passionate about building intelligent applications. I don't just write code; I craft digital experiences backed by insights.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <button onClick={() => scrollToSection('projects')} className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-full hover:scale-105 transition-transform shadow-lg shadow-gray-200 dark:shadow-white/10 w-full md:w-auto">
                        View My Work
                    </button>
                    <button onClick={() => scrollToSection('contact')} className="px-8 py-4 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white font-bold rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-all w-full md:w-auto flex items-center justify-center gap-2">
                        Contact Me <ExternalLink size={16} />
                    </button>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-400 dark:text-gray-500">
                <ChevronDown size={24} />
            </div>
        </section>
    );
};

export default Hero;

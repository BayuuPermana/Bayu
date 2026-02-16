import React from 'react';
import { Mail, Github, Twitter, Instagram } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-24 relative transition-colors duration-300">
            <div className="container mx-auto px-6 max-w-4xl text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-white">Get in Touch</h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
                    Open to technical collaborations and engineering opportunities. If you're looking for a developer with a background in analytical systems and web architecture, let's connect.
                </p>

                <div className="flex flex-col md:flex-row justify-center gap-6 mb-16">
                    <a href="mailto:exp.bayupermana@gmail.com" className="flex items-center justify-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-full font-bold transition-all shadow-sm">
                        <Mail size={20} />
                        Send me an Email
                    </a>
                    <a href="https://github.com/BayuuPermana" className="flex items-center justify-center gap-3 px-8 py-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-full font-bold transition-all hover:bg-gray-50 dark:hover:bg-white/10 shadow-sm">
                        <Github size={20} />
                        Check GitHub
                    </a>
                </div>

                <div className="flex justify-center gap-8 text-gray-400 dark:text-gray-500">
                    <a href="https://x.com/4beyu" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 dark:hover:text-white transition-colors"><Twitter size={24} /></a>
                    <a href="https://instagram.com/bayu_permanayogaa" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 dark:hover:text-white transition-colors"><Instagram size={24} /></a>
                </div>

                <div className="mt-24 pt-8 border-t border-gray-200 dark:border-white/5 text-gray-500 text-sm">
                    © {new Date().getFullYear()} Bayu Permana. Built with React & Tailwind.
                </div>
            </div>
        </section>
    );
};

export default Contact;

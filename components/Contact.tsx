import React from 'react';
import { Mail, Github, Twitter } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-24 relative">
            <div className="container mx-auto px-6 max-w-4xl text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-8">Let's Build Something Amazing</h2>
                <p className="text-xl text-gray-400 mb-12">
                    I'm currently available for freelance work and full-time opportunities. If you have a project that needs a data-driven developer's touch, I'd love to hear from you.
                </p>

                <div className="flex flex-col md:flex-row justify-center gap-6 mb-16">
                    <a href="mailto:exp.bayupermana@gmail.com" className="flex items-center justify-center gap-3 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-bold transition-all">
                        <Mail size={20} />
                        Send me an Email
                    </a>
                    <a href="https://github.com/BayuuPermana" className="flex items-center justify-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full font-bold transition-all">
                        <Github size={20} />
                        Check GitHub
                    </a>
                </div>

                <div className="flex justify-center gap-8 text-gray-500">
                    <a href="https://x.com/4beyu" className="hover:text-white transition-colors"><Twitter size={24} /></a>
                    <a href="https://github.com/BayuuPermana" className="hover:text-white transition-colors"><Github size={24} /></a>
                </div>

                <div className="mt-24 pt-8 border-t border-white/5 text-gray-600 text-sm">
                    © {new Date().getFullYear()} Bayu Permana. Built with React & Tailwind.
                </div>
            </div>
        </section>
    );
};

export default Contact;

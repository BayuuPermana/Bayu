import React from 'react';
import { Code2 } from 'lucide-react';

const About = () => {
    return (
        <section id="about" className="py-24 bg-gray-50/50 dark:bg-black/50 transition-colors duration-300">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="relative group">
                        <div className="relative bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-2xl p-8 md:p-12 shadow-sm">
                            <Code2 className="w-12 h-12 text-green-600 dark:text-green-400 mb-6" />
                            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Technical Hybridity</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                                Engineering at the intersection of analytical rigor and scalable software development. I build systems where data isn't just stored, but actively utilized to drive application logic and user experiences.
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                From architecting workforce analytics platforms like <em>Emp-Dash</em> to implementing environmental monitoring systems, I focus on building resilient, data-aware applications.
                            </p>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Professional Profile</h2>
                        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                            I am <strong className="text-gray-900 dark:text-white">Bayu Permana</strong>, a Software Engineer specialized in bridging the gap between raw data analysis and robust web architecture.
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                            I focus on delivering high-performance Single Page Applications (SPAs) that integrate Python's data ecosystem with modern JavaScript frameworks. My goal is to transform complex datasets into functional, production-ready digital products.
                        </p>

                        <div className="flex gap-12 mt-4">
                            <div>
                                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-1">12+</div>
                                <div className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Repositories</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-1">Top</div>
                                <div className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Pull Shark</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;

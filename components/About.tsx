import React from 'react';
import { Code2 } from 'lucide-react';

const About = () => {
    return (
        <section id="about" className="py-24 bg-gray-50/50 dark:bg-black/50 transition-colors duration-300">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl blur opacity-10 dark:opacity-25 group-hover:opacity-20 dark:group-hover:opacity-50 transition duration-1000"></div>
                        <div className="relative bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-2xl p-8 md:p-12 shadow-xl shadow-gray-200/50 dark:shadow-none">
                            <Code2 className="w-12 h-12 text-green-600 dark:text-green-400 mb-6" />
                            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">The Hybrid Advantage</h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                                In a world where data is the new oil, purely functional apps aren't enough. My background combines the analytical rigor of a <strong>Data Analyst</strong> with the creative engineering of a <strong>Full Stack Developer</strong>.
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                Whether it's building a complex dashboard like <em>Emp-Dash</em> or analyzing environmental metrics in <em>WaterMonitoring</em>, I focus on efficiency, scalability, and user experience.
                            </p>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">About Me</h2>
                        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                            Hello! I'm <strong className="text-gray-900 dark:text-white">Bayu Permana</strong>. I am a learner at heart, constantly exploring new technologies to build useful projects.
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                            Currently working on expanding my portfolio, I specialize in taking raw concepts and turning them into deployed applications. I have a strong proficiency in building robust Single Page Applications (SPAs), blending the Python data ecosystem with the modern JavaScript web stack.
                        </p>

                        <div className="flex gap-4">
                            <div className="px-6 py-4 bg-white dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 text-center shadow-sm dark:shadow-none">
                                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">12+</div>
                                <div className="text-sm text-gray-500 uppercase tracking-wider">Repos</div>
                            </div>
                            <div className="px-6 py-4 bg-white dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 text-center shadow-sm dark:shadow-none">
                                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Top</div>
                                <div className="text-sm text-gray-500 uppercase tracking-wider">Pull Shark</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;

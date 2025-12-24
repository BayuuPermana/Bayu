import React from 'react';
import { ExternalLink, Wallet, Users, Droplets } from 'lucide-react';

const Projects = () => {
    const projects = [
        {
            title: "FinTrack",
            description: "A comprehensive financial tracking application designed to help users manage expenses, visualize income streams, and gain control over their personal economy. Features real-time data visualization and budget forecasting.",
            tags: ["React", "Node.js", "MongoDB", "Finance"],
            icon: <Wallet className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />,
            color: "from-emerald-500/10 dark:from-emerald-500/20 to-teal-500/5"
        },
        {
            title: "Emp-Dash",
            description: "An interactive employee management dashboard streamlining HR processes. Provides workforce analytics, attendance tracking, and performance metrics in a unified, user-friendly interface.",
            tags: ["Vue.js", "Data Viz", "Management"],
            icon: <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
            color: "from-blue-500/10 dark:from-blue-500/20 to-cyan-500/5"
        },
        {
            title: "WaterMonitoring",
            description: "An environmental data analysis project focused on monitoring water quality parameters. Utilizes Python and Jupyter Notebooks to process sensor data and detect anomalies in water ecosystems.",
            tags: ["Jupyter", "Python", "Data Analysis"],
            icon: <Droplets className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />,
            color: "from-cyan-500/10 dark:from-cyan-500/20 to-blue-500/5"
        }
    ];

    return (
        <section id="projects" className="py-24 bg-gray-50/50 dark:bg-[#0f0f0f] transition-colors duration-300">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Featured Projects</h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-xl">
                            A selection of my recent work, ranging from financial tools to data analysis notebooks.
                        </p>
                    </div>
                    <a href="https://github.com/BayuuPermana?tab=repositories" className="text-pink-600 dark:text-pink-400 hover:text-pink-500 dark:hover:text-pink-300 flex items-center gap-2 group font-medium">
                        View all repositories <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <div key={index} className="group relative bg-white dark:bg-[#161616] rounded-2xl overflow-hidden border border-gray-200 dark:border-white/5 hover:border-blue-500/30 dark:hover:border-white/10 transition-all duration-300 hover:-translate-y-2 shadow-xl shadow-gray-200/50 dark:shadow-none">
                            {/* Gradient Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="p-8 relative z-10 h-full flex flex-col">
                                <div className="mb-6 p-3 bg-gray-50 dark:bg-white/5 w-fit rounded-xl border border-gray-100 dark:border-white/10">
                                    {project.icon}
                                </div>

                                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{project.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed flex-grow">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-gray-100 dark:border-white/5">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;

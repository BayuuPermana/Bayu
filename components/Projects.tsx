import React from 'react';
import { ExternalLink, Wallet, Users, Droplets, Layout, Github } from 'lucide-react';
import baritoImage from './img/barito.png';
import waterImage from './img/Water.png';


const Projects = () => {
    const projects = [
        {
            title: "Barito",
            description: "Proposal and project management platform built for streamlined deliverable tracking. Implements a responsive interface for managing stakeholder communications and project lifecycle.",
            tags: ["React", "TypeScript", "Tailwind"],
            icon: <Layout className="w-8 h-8 text-purple-600 dark:text-purple-400" />,
            color: "from-purple-500/10 dark:from-purple-500/20 to-indigo-500/5",
            repoUrl: "https://github.com/BayuuPermana/barito",
            liveUrl: "https://newbarito-proposal.netlify.app/",
            preview: baritoImage
        },
        {
            title: "FinTrack",
            description: "Expense tracking and budget forecasting engine. Built with React and Node.js to provide automated financial reporting and data-driven budget insights.",
            tags: ["React", "Node.js", "MongoDB", "Finance"],
            icon: <Wallet className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />,
            color: "from-emerald-500/10 dark:from-emerald-500/20 to-teal-500/5",
            repoUrl: "https://github.com/BayuuPermana/fintrack"
        },
        {
            title: "Emp-Dash",
            description: "Workforce analytics dashboard designed for HR automation. Integrates attendance tracking and performance metrics into a unified visualization interface.",
            tags: ["Vue.js", "Data Viz", "Management"],
            icon: <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
            color: "from-blue-500/10 dark:from-blue-500/20 to-cyan-500/5",
            repoUrl: "https://github.com/BayuuPermana/emp-dash"
        },
        {
            title: "WaterMonitoring",
            description: "Water quality analysis system utilizing Python for anomaly detection. Analyzes ecological sensor datasets to generate actionable environmental metric reports.",
            tags: ["Jupyter", "Python", "Data Analysis"],
            icon: <Droplets className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />,
            color: "from-cyan-500/10 dark:from-cyan-500/20 to-blue-500/5",
            repoUrl: "https://github.com/BayuuPermana/waterMonitoring",
            preview: waterImage 

        }
    ];

    return (
        <section id="projects" className="py-24 bg-gray-50/50 dark:bg-[#0f0f0f] transition-colors duration-300">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Featured Projects</h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-xl">
                            A selection of recent engineering projects, ranging from financial tools to data analysis systems.
                        </p>
                    </div>
                    <a href="https://github.com/BayuuPermana?tab=repositories" className="text-pink-600 dark:text-pink-400 hover:text-pink-500 dark:hover:text-pink-300 flex items-center gap-2 group font-medium">
                        View all repositories <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {projects.map((project, index) => (
                        <div key={index} className="group relative bg-white dark:bg-[#161616] rounded-2xl overflow-hidden border border-gray-200 dark:border-white/5 hover:border-blue-500/30 dark:hover:border-white/10 transition-all duration-300 hover:-translate-y-2 shadow-xl shadow-gray-200/50 dark:shadow-none flex flex-col">
                            {/* Preview Image */}
                            {project.preview && (
                                <div className="relative h-48 overflow-hidden border-b border-gray-100 dark:border-white/5">
                                    <img 
                                        src={project.preview} 
                                        alt={project.title} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            )}

                            {/* Gradient Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                            <div className="p-8 relative z-10 flex-grow flex flex-col">
                                <div className="mb-6 p-3 bg-gray-50 dark:bg-white/5 w-fit rounded-xl border border-gray-100 dark:border-white/10">
                                    {project.icon}
                                </div>

                                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{project.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed flex-grow">
                                    {project.description}
                                </p>

                                <div className="flex gap-4 mb-6">
                                    {project.repoUrl && (
                                        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                            <Github size={14} /> Repo
                                        </a>
                                    )}
                                    {project.liveUrl && (
                                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                            <ExternalLink size={14} /> Live Site
                                        </a>
                                    )}
                                </div>

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

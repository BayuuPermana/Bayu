import React from 'react';
import { BarChart3, Layout, Database, Smartphone, Terminal } from 'lucide-react';

const TechStack = () => {
    const logos = [
        { name: "Python", slug: "python" },
        { name: "React", slug: "react" },
        { name: "Next.js", slug: "nextdotjs" },
        { name: "Vue.js", slug: "vuedotjs" },
        { name: "TypeScript", slug: "typescript" },
        { name: "Tailwind CSS", slug: "tailwindcss" },
        { name: "Node.js", slug: "nodedotjs" },
        { name: "Bun", slug: "bun" },
        { name: "Rust", slug: "rust" },
        { name: "SQLite", slug: "sqlite" },
        { name: "MongoDB", slug: "mongodb" },
        { name: "Flutter", slug: "flutter" },
        { name: "Tauri", slug: "tauri" },
        { name: "Docker", slug: "docker" },
        { name: "Linux", slug: "linux" },
        { name: "Git", slug: "git" },
    ];

    const skills = {
        "Data & AI": { icon: <BarChart3 className="w-5 h-5" />, items: ["Python", "Jupyter", "Data Analysis", "ComfyUI"] },
        "Frontend": { icon: <Layout className="w-5 h-5" />, items: ["React", "Next.js", "Vue.js", "TypeScript", "Tailwind", "SPA Architecture"] },
        "Backend": { icon: <Database className="w-5 h-5" />, items: ["Node.js", "Express", "Bun", "Rust", "SQLite", "MongoDB"] },
        "Mobile & Desktop": { icon: <Smartphone className="w-5 h-5" />, items: ["Flutter", "React Native", "Tauri"] },
        "DevOps": { icon: <Terminal className="w-5 h-5" />, items: ["Docker", "Git", "n8n", "Linux"] }
    };

    return (
        <section id="stack" className="py-24 relative overflow-hidden transition-colors duration-300">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Technologies & Tools</h2>
                    <p className="text-gray-600 dark:text-gray-400">Core technical proficiencies across the stack</p>
                </div>

                {/* Marquee Section */}
                <div className="mb-20 relative">
                    <div className="flex overflow-hidden group">
                        <div className="flex animate-marquee whitespace-nowrap py-10">
                            {[...logos, ...logos].map((logo, index) => (
                                <div key={index} className="mx-8 flex items-center gap-3 grayscale hover:grayscale-0 transition-all duration-300 group-hover:[animation-play-state:paused]">
                                    <img
                                        src={`https://cdn.simpleicons.org/${logo.slug}`}
                                        alt={logo.name}
                                        className="w-8 h-8 dark:invert opacity-60 hover:opacity-100"
                                    />
                                    <span className="text-gray-400 dark:text-gray-500 font-medium text-lg uppercase tracking-widest">{logo.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Fade Edges */}
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-50 dark:from-black to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-50 dark:from-black to-transparent z-10 pointer-events-none" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(skills).map(([category, data]) => (
                        <div key={category} className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-2xl p-6 hover:border-blue-500/30 transition-all group shadow-sm dark:shadow-none">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-blue-50 dark:bg-white/10 rounded-lg text-blue-600 dark:text-blue-300 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                                    {data.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{category}</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {data.items.map((skill) => (
                                    <span key={skill} className="px-3 py-1 bg-gray-100 dark:bg-black/40 rounded-full text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/5">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechStack;

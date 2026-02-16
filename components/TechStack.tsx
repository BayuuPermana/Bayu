import React from 'react';
import { BarChart3, Layout, Database, Smartphone, Terminal } from 'lucide-react';

const TechStack = () => {
    const skills = [
        {
            category: "Data & AI",
            icon: <BarChart3 className="w-5 h-5" />,
            items: [
                { name: "Python", slug: "python" },
                { name: "Jupyter", slug: "jupyter" },
                { name: "Data Analysis", slug: "simpleanalytics" },
                { name: "ComfyUI", slug: "comfyui" }
            ]
        },
        {
            category: "Frontend",
            icon: <Layout className="w-5 h-5" />,
            items: [
                { name: "React", slug: "react" },
                { name: "Next.js", slug: "nextdotjs" },
                { name: "Vue.js", slug: "vuedotjs" },
                { name: "TypeScript", slug: "typescript" },
                { name: "Tailwind", slug: "tailwindcss" },
                { name: "SPA Architecture", slug: "react" }
            ]
        },
        {
            category: "Backend",
            icon: <Database className="w-5 h-5" />,
            items: [
                { name: "Node.js", slug: "nodedotjs" },
                { name: "Express", slug: "express" },
                { name: "Bun", slug: "bun" },
                { name: "Rust", slug: "rust" },
                { name: "SQLite", slug: "sqlite" },
                { name: "MongoDB", slug: "mongodb" }
            ]
        },
        {
            category: "Platform & Desktop",
            icon: <Smartphone className="w-5 h-5" />,
            items: [
                { name: "Flutter", slug: "flutter" },
                { name: "React Native", slug: "react" },
                { name: "Tauri", slug: "tauri" }
            ]
        },
        {
            category: "DevOps & Tools",
            icon: <Terminal className="w-5 h-5" />,
            items: [
                { name: "Docker", slug: "docker" },
                { name: "Git", slug: "git" },
                { name: "n8n", slug: "n8n" },
                { name: "Linux", slug: "linux" },
                { name: "Vercel", slug: "vercel" }
            ]
        }
    ];

    return (
        <section id="stack" className="py-24 relative overflow-hidden transition-colors duration-300">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Technologies & Tools</h2>
                    <p className="text-gray-600 dark:text-gray-400">Specialized technical ecosystem for modern engineering</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {skills.map((group, groupIdx) => (
                        <div key={groupIdx} className={`bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-2xl p-8 shadow-sm group transition-all duration-300 hover:border-green-500/30 ${groupIdx === 4 ? 'md:col-span-2' : ''}`}>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-2.5 bg-green-50 dark:bg-green-500/10 rounded-xl text-green-600 dark:text-green-400">
                                    {group.icon}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-widest">{group.category}</h3>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {group.items.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-white/10 group/item">
                                        <img
                                            src={`https://cdn.simpleicons.org/${item.slug}`}
                                            alt={item.name}
                                            className="w-6 h-6 dark:invert opacity-60 group-hover/item:opacity-100 transition-opacity"
                                            onError={(e) => (e.currentTarget.style.display = 'none')}
                                        />
                                        <span className="text-gray-500 dark:text-gray-400 font-medium text-sm">{item.name}</span>
                                    </div>
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

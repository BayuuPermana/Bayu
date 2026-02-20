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
        <section id="stack" className="py-12 sm:py-16">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="mb-10 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Tech Stack</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Tools and technologies I use</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {skills.map((group, groupIdx) => (
                        <div key={groupIdx} className={`bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 rounded-xl p-5 ${groupIdx === 4 ? 'md:col-span-2' : ''}`}>
                            <div className="flex items-center gap-2.5 mb-4">
                                <div className="text-gray-500 dark:text-gray-400">
                                    {group.icon}
                                </div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">{group.category}</h3>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {group.items.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                                        <img
                                            src={`https://cdn.simpleicons.org/${item.slug}`}
                                            alt={item.name}
                                            className="w-4 h-4 dark:invert opacity-75"
                                            onError={(e) => (e.currentTarget.style.display = 'none')}
                                        />
                                        <span className="text-gray-700 dark:text-gray-300 text-sm">{item.name}</span>
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

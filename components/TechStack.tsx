import React from 'react';
import { BarChart3, Layout, Database, Smartphone, Terminal } from 'lucide-react';

const TechStack = () => {
    const skills = [
        {
            category: "Data & AI",
            icon: <BarChart3 className="w-5 h-5" />,
            speed: "20s",
            reverse: false,
            items: [
                { name: "Python", slug: "python" },
                { name: "Jupyter", slug: "jupyter" },
                { name: "Pandas", slug: "pandas" },
                { name: "NumPy", slug: "numpy" },
                { name: "PyTorch", slug: "pytorch" },
                { name: "TensorFlow", slug: "tensorflow" }
            ]
        },
        {
            category: "Frontend",
            icon: <Layout className="w-5 h-5" />,
            speed: "25s",
            reverse: true,
            items: [
                { name: "React", slug: "react" },
                { name: "Next.js", slug: "nextdotjs" },
                { name: "Vue.js", slug: "vuedotjs" },
                { name: "TypeScript", slug: "typescript" },
                { name: "Tailwind", slug: "tailwindcss" },
                { name: "Sass", slug: "sass" }
            ]
        },
        {
            category: "Backend",
            icon: <Database className="w-5 h-5" />,
            speed: "22s",
            reverse: false,
            items: [
                { name: "Node.js", slug: "nodedotjs" },
                { name: "Express", slug: "express" },
                { name: "Bun", slug: "bun" },
                { name: "Rust", slug: "rust" },
                { name: "SQLite", slug: "sqlite" },
                { name: "PostgreSQL", slug: "postgresql" }
            ]
        },
        {
            category: "Platform & Desktop",
            icon: <Smartphone className="w-5 h-5" />,
            speed: "28s",
            reverse: true,
            items: [
                { name: "Flutter", slug: "flutter" },
                { name: "Tauri", slug: "tauri" },
                { name: "Electron", slug: "electron" },
                { name: "Android", slug: "android" },
                { name: "iOS", slug: "apple" }
            ]
        },
        {
            category: "DevOps & Tools",
            icon: <Terminal className="w-5 h-5" />,
            speed: "24s",
            reverse: false,
            items: [
                { name: "Docker", slug: "docker" },
                { name: "Linux", slug: "linux" },
                { name: "Git", slug: "git" },
                { name: "n8n", slug: "n8n" },
                { name: "GitHub Actions", slug: "githubactions" },
                { name: "Vercel", slug: "vercel" }
            ]
        }
    ];

    return (
        <section id="stack" className="py-24 relative overflow-hidden transition-colors duration-300">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Technologies & Tools</h2>
                    <p className="text-gray-600 dark:text-gray-400">Independent vertical lanes of specialized expertise</p>
                </div>

                <div className="flex flex-col gap-8">
                    {skills.map((group, groupIdx) => (
                        <div key={groupIdx} className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-3xl p-8 shadow-sm group overflow-hidden relative">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-blue-50 dark:bg-white/10 rounded-xl text-blue-600 dark:text-blue-300">
                                    {group.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-tighter">{group.category}</h3>
                            </div>

                            <div className="relative">
                                <div className="flex overflow-hidden group/marquee">
                                    <div 
                                        className={`flex whitespace-nowrap py-4 ${group.reverse ? 'animate-[marquee_reverse_linear_infinite]' : 'animate-marquee'}`}
                                        style={{ animationDuration: group.speed } as React.CSSProperties}
                                    >
                                        {[...group.items, ...group.items, ...group.items].map((item, idx) => (
                                            <div key={idx} className="mx-12 flex items-center gap-4 grayscale hover:grayscale-0 transition-all duration-300">
                                                <img
                                                    src={`https://cdn.simpleicons.org/${item.slug}`}
                                                    alt={item.name}
                                                    className="w-10 h-10 dark:invert opacity-60 hover:opacity-100 transition-opacity"
                                                />
                                                <span className="text-gray-400 dark:text-gray-500 font-bold text-xl uppercase tracking-[0.2em]">{item.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Inner Fade */}
                                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white dark:from-[#111] to-transparent z-10 pointer-events-none" />
                                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white dark:from-[#111] to-transparent z-10 pointer-events-none" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechStack;

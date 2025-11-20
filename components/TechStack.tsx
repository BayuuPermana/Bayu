import React from 'react';
import { BarChart3, Layout, Database, Smartphone, Terminal } from 'lucide-react';

const TechStack = () => {
    const skills = {
        "Data & AI": { icon: <BarChart3 className="w-5 h-5" />, items: ["Python", "Jupyter", "Data Analysis", "ComfyUI"] },
        "Frontend": { icon: <Layout className="w-5 h-5" />, items: ["React", "Next.js", "Vue.js", "TypeScript", "Tailwind", "SPA Architecture"] },
        "Backend": { icon: <Database className="w-5 h-5" />, items: ["Node.js", "Express", "Bun", "MongoDB", "PHP"] },
        "Mobile": { icon: <Smartphone className="w-5 h-5" />, items: ["Flutter", "React Native"] },
        "DevOps": { icon: <Terminal className="w-5 h-5" />, items: ["Docker", "Git", "n8n", "Linux"] }
    };

    return (
        <section id="stack" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Technologies & Tools</h2>
                    <p className="text-gray-400">My arsenal for building digital products</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(skills).map(([category, data]) => (
                        <div key={category} className="bg-white/5 border border-white/5 rounded-2xl p-6 hover:border-purple-500/30 transition-colors group">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-white/10 rounded-lg text-purple-300 group-hover:text-purple-400 transition-colors">
                                    {data.icon}
                                </div>
                                <h3 className="text-xl font-semibold">{category}</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {data.items.map((skill) => (
                                    <span key={skill} className="px-3 py-1 bg-black/40 rounded-full text-sm text-gray-300 border border-white/5">
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

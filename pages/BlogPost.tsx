import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ChevronLeft, Calendar, Tag } from 'lucide-react';
import CodeBlock from '../components/CodeBlock';

// Use Vite's build-time globbing
const postFiles = import.meta.glob('../posts/*.md', { query: '?raw', eager: true, import: 'default' });

const parseFrontmatter = (content: string) => {
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!match) return { data: {}, content };
    
    const yaml = match[1] || '';
    const data: any = {};
    yaml.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length > 0) {
            let value = valueParts.join(':').trim();
            value = value.replace(/^["'](.*)["']$/, '$1');
            if (value.startsWith('[') && value.endsWith(']')) {
                data[key.trim()] = value.slice(1, -1).split(',').map(v => v.trim().replace(/^["'](.*)["']$/, '$1'));
            } else {
                data[key.trim()] = value;
            }
        }
    });
    
    return { data, content: content.replace(match[0], '').trim() };
};

const BlogPost = () => {
    const { slug } = useParams<{ slug: string }>();
    const fileName = `../posts/${slug}.md`;
    const rawContent = postFiles[fileName];

    if (!rawContent) {
        return <Navigate to="/blog" replace />;
    }

    const { data, content } = parseFrontmatter(rawContent as string);

    return (
        <div className="min-h-screen pt-24 pb-20 px-6">
            <article className="container mx-auto max-w-3xl">
                <Link 
                    to="/blog" 
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green-500 dark:hover:text-green-400 transition-colors mb-8 group"
                >
                    <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Blog
                </Link>

                <header className="mb-12">
                    <div className="flex flex-wrap gap-4 items-center text-sm text-gray-500 dark:text-gray-500 mb-4">
                        <div className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            {new Date(data.date || '2026-01-01').toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </div>
                        {data.tags && (
                            <div className="flex items-center gap-1.5">
                                <Tag size={14} />
                                <div className="flex gap-2">
                                    {data.tags.map((tag: string) => (
                                        <span key={tag}>#{tag}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        {data.title || 'Untitled'}
                    </h1>
                    {data.description && (
                        <p className="text-xl text-gray-600 dark:text-gray-400 italic border-l-4 border-green-500 pl-4">
                            {data.description}
                        </p>
                    )}
                </header>

                <div className="prose prose-lg dark:prose-invert prose-green max-w-none">
                    <ReactMarkdown
                        components={{
                            code({ inline, className, children }: any) {
                                const match = /language-(\w+)/.exec(className || '');
                                return !inline && match ? (
                                    <CodeBlock className={className}>
                                        {children}
                                    </CodeBlock>
                                ) : (
                                    <code className={className}>{children}</code>
                                );
                            }
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                </div>

                <footer className="mt-16 pt-8 border-t border-gray-100 dark:border-white/10">
                    <Link 
                        to="/blog" 
                        className="text-green-500 hover:text-green-600 dark:hover:text-green-400 font-medium"
                    >
                        ← View all posts
                    </Link>
                </footer>
            </article>
        </div>
    );
};

export default BlogPost;

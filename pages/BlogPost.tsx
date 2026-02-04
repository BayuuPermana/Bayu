import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import matter from 'gray-matter';
import { ChevronLeft, Calendar, Tag } from 'lucide-react';

// Use Vite's build-time globbing to fetch all markdown files in the posts directory
const postFiles = import.meta.glob('../posts/*.md', { as: 'raw', eager: true });

const BlogPost = () => {
    const { slug } = useParams<{ slug: string }>();
    
    // Find the file that matches the slug
    const fileName = `../posts/${slug}.md`;
    const rawContent = postFiles[fileName];

    if (!rawContent) {
        return <Navigate to="/blog" replace />;
    }

    const { data, content } = matter(rawContent);

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
                            {new Date(data.date).toLocaleDateString('en-US', {
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
                        {data.title}
                    </h1>
                    {data.description && (
                        <p className="text-xl text-gray-600 dark:text-gray-400 italic border-l-4 border-green-500 pl-4">
                            {data.description}
                        </p>
                    )}
                </header>

                <div className="prose prose-lg dark:prose-invert prose-green max-w-none">
                    <ReactMarkdown>{content}</ReactMarkdown>
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
import React from 'react';
import { Link } from 'react-router-dom';
import matter from 'gray-matter';

// Use Vite's build-time globbing to fetch all markdown files in the posts directory
const postFiles = import.meta.glob('../posts/*.md', { as: 'raw', eager: true });

interface PostMetadata {
    title: string;
    date: string;
    description: string;
    tags?: string[];
    slug: string;
}

const BlogList = () => {
    const posts: PostMetadata[] = Object.entries(postFiles).map(([path, content]) => {
        const { data } = matter(content);
        const slug = path.split('/').pop()?.replace('.md', '') || '';
        return {
            title: data.title || 'Untitled',
            date: data.date || 'No Date',
            description: data.description || '',
            tags: data.tags || [],
            slug,
        };
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="min-h-screen pt-24 pb-12 px-6">
            <div className="container mx-auto max-w-4xl">
                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-4">
                        Blog
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Thoughts, tutorials, and other digital artifacts.
                    </p>
                </header>

                <div className="grid gap-8">
                    {posts.map((post) => (
                        <article 
                            key={post.slug}
                            className="group p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:border-green-500/50 dark:hover:border-green-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/5"
                        >
                            <Link to={`/blog/${post.slug}`} className="block">
                                <div className="flex justify-between items-start mb-2">
                                    <h2 className="text-2xl font-bold group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors">
                                        {post.title}
                                    </h2>
                                    <time className="text-sm text-gray-500 dark:text-gray-500 whitespace-nowrap">
                                        {new Date(post.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </time>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                                    {post.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {post.tags?.map(tag => (
                                        <span 
                                            key={tag}
                                            className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogList;
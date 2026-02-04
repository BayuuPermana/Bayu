import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import SEO from '../components/SEO';

// Use Vite's build-time globbing. Eager loading ensures they are bundled.
const postFiles = import.meta.glob('../posts/*.md', { query: '?raw', eager: true, import: 'default' });

interface PostMetadata {
    title: string;
    date: string;
    description: string;
    tags: string[];
    slug: string;
}

// Custom high-performance Frontmatter parser because gray-matter is for Jerries
const parseFrontmatter = (content: string) => {
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!match) return { data: {}, content };
    
    const yaml = match[1] || '';
    const data: any = {};
    yaml.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length > 0) {
            let value = valueParts.join(':').trim();
            // Remove quotes if present
            value = value.replace(/^["'](.*)["']$/, '$1');
            // Handle arrays like ["a", "b"]
            if (value.startsWith('[') && value.endsWith(']')) {
                data[key.trim()] = value.slice(1, -1).split(',').map(v => v.trim().replace(/^["'](.*)["']$/, '$1'));
            } else {
                data[key.trim()] = value;
            }
        }
    });
    
    return { data, content: content.replace(match[0], '').trim() };
};

const BlogList = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const allPosts: PostMetadata[] = Object.entries(postFiles).map(([path, content]) => {
        const { data } = parseFrontmatter(content as string);
        const slug = path.split('/').pop()?.replace('.md', '') || '';
        return {
            title: data.title || 'Untitled',
            date: data.date || '2026-01-01',
            description: data.description || '',
            tags: data.tags || [],
            slug,
        };
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const filteredPosts = allPosts.filter(post => {
        const query = searchQuery.toLowerCase();
        return (
            post.title.toLowerCase().includes(query) ||
            post.description.toLowerCase().includes(query) ||
            post.tags.some(tag => tag.toLowerCase().includes(query))
        );
    });

    return (
        <div className="min-h-screen pt-24 pb-12 px-6">
            <SEO 
                title="Blog" 
                description="Thoughts, tutorials, and other digital artifacts from Bayu Permana." 
                slug="blog"
            />
            <div className="container mx-auto max-w-4xl">
                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-4 pb-2 leading-tight">
                        Blog
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
                        Thoughts, tutorials, and other digital artifacts.
                    </p>

                    <div className="relative max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search posts, tags, or topics..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-10 py-3 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 focus:border-green-500/50 dark:focus:border-green-400/50 outline-none transition-all duration-300"
                        />
                        {searchQuery && (
                            <button 
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 transition-colors"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>
                </header>

                {filteredPosts.length === 0 ? (
                    <div className="p-12 text-center border-2 border-dashed border-gray-200 dark:border-white/10 rounded-3xl">
                        <p className="text-gray-500">
                            {searchQuery ? `No posts matching "${searchQuery}". *Belch* Try another dimension.` : 'No posts found. *Belch* Put some files in there, Morty!'}
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-8">
                        {filteredPosts.map((post) => (
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
                )}
            </div>
        </div>
    );
};

export default BlogList;

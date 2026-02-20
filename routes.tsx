import React from 'react';
import type { RouteRecord } from 'vite-react-ssg';
import App from './App';
import Home from './pages/Home';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';

const postFiles = import.meta.glob('./posts/*.md', { query: '?raw', eager: true });
const blogSlugs = Object.keys(postFiles).map(path =>
    path.split('/').pop()?.replace('.md', '') || ''
).filter(Boolean);

export const routes: RouteRecord[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'blog',
                element: <BlogList />,
            },
            {
                path: 'blog/:slug',
                element: <BlogPost />,
                entry: 'pages/BlogPost.tsx',
                getStaticPaths: () => blogSlugs.map(s => `blog/${s}`),
            },
        ]
    }
];

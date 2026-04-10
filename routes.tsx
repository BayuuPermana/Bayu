import React from 'react';
import type { RouteRecord } from 'vite-react-ssg';
import App from './App';
import Home from './pages/Home';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import { getAllPostSlugs } from './utils/posts';

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
                getStaticPaths: () => getAllPostSlugs().map(s => `blog/${s}`),
            },
        ]
    }
];

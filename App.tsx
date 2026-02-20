import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';

const App = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('theme');
            return (saved as 'light' | 'dark') || 'dark';
        }
        return 'dark';
    });
    const location = useLocation();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', theme);
            if (theme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    }, [theme]);

    // Handle scroll to hash when navigating
    useEffect(() => {
        if (location.hash && typeof window !== 'undefined') {
            const id = location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        } else if (!location.hash && typeof window !== 'undefined') {
            window.scrollTo(0, 0);
        }
    }, [location.pathname, location.hash]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    return (
        <div className="min-h-screen bg-white transition-colors duration-300 dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 font-sans selection:bg-purple-500/30">
            <Navigation theme={theme} toggleTheme={toggleTheme} />
            <Outlet />
        </div>
    );
};

export default App;

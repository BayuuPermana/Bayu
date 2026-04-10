import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import { useTheme } from './hooks/useTheme';
import { useScrollToHash } from './hooks/useScrollToHash';

const App = () => {
    const { theme, toggleTheme } = useTheme();
    useScrollToHash();

    return (
        <div className="min-h-screen bg-white transition-colors duration-300 dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 font-sans selection:bg-purple-500/30">
            <Navigation theme={theme} toggleTheme={toggleTheme} />
            <Outlet />
        </div>
    );
};

export default App;

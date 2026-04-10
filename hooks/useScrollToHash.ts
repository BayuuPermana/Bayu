import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToHash = () => {
    const location = useLocation();

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
};

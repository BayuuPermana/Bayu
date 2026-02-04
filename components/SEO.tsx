import React, { useEffect } from 'react';

interface SEOProps {
    title: string;
    description: string;
    slug?: string;
    date?: string;
    author?: string;
    image?: string;
    tags?: string[];
}

const SEO: React.FC<SEOProps> = ({ title, description, slug, date, author = "Bayu Permana", image, tags }) => {
    const siteUrl = "https://bayuupermana.github.io/Bayu";
    const fullUrl = slug === 'blog' ? `${siteUrl}/blog` : slug ? `${siteUrl}/blog/${slug}` : siteUrl;
    const defaultImage = `${siteUrl}/og-image.png`; // Fallback image

    useEffect(() => {
        // Update document title
        document.title = `${title} | Bayu Permana`;

        // Update meta tags
        const updateMeta = (name: string, content: string, attr: 'name' | 'property' = 'name') => {
            let el = document.querySelector(`meta[${attr}="${name}"]`);
            if (!el) {
                el = document.createElement('meta');
                el.setAttribute(attr, name);
                document.head.appendChild(el);
            }
            el.setAttribute('content', content);
        };

        updateMeta('description', description);
        updateMeta('og:title', title, 'property');
        updateMeta('og:description', description, 'property');
        updateMeta('og:url', fullUrl, 'property');
        updateMeta('og:type', slug && slug !== 'blog' ? 'article' : 'website', 'property');
        updateMeta('og:image', image || defaultImage, 'property');
        updateMeta('twitter:card', 'summary_large_image');
        updateMeta('twitter:title', title);
        updateMeta('twitter:description', description);

        // Canonical link
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', fullUrl);

        // Schema.org JSON-LD
        const schema: any = {
            "@context": "https://schema.org",
            "@type": slug && slug !== 'blog' ? "BlogPosting" : "WebSite",
            "headline": title,
            "description": description,
            "url": fullUrl,
            "image": image || defaultImage
        };

        if (slug && slug !== 'blog') {
            schema.author = {
                "@type": "Person",
                "name": author
            };
            schema.datePublished = date;
            if (tags) schema.keywords = tags.join(', ');
        }

        const scriptId = 'json-ld-schema';
        let script = document.getElementById(scriptId) as HTMLScriptElement;
        if (!script) {
            script = document.createElement('script');
            script.id = scriptId;
            script.type = 'application/ld+json';
            document.head.appendChild(script);
        }
        script.text = JSON.stringify(schema);

        return () => {
            // Optional: cleanup or leave for SPA persistence
        };
    }, [title, description, fullUrl, date, author, image, slug, tags]);

    return null;
};

export default SEO;
import React from 'react';
import { Head } from 'vite-react-ssg';

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

    const isArticle = !!(slug && slug !== 'blog');

    const schema: any = {
        "@context": "https://schema.org",
        "@type": isArticle ? "BlogPosting" : "WebSite",
        "headline": title,
        "description": description,
        "url": fullUrl,
        "image": image || defaultImage
    };

    if (isArticle) {
        schema.author = {
            "@type": "Person",
            "name": author
        };
        schema.datePublished = date;
        if (tags) schema.keywords = tags.join(', ');
    } else if (slug === undefined) {
        // Homepage schema
        schema["@type"] = "Person";
        schema.name = author;
        schema.url = siteUrl;
        schema.jobTitle = "Software Engineer";
        schema.sameAs = [
            "https://github.com/BayuuPermana",
            "https://x.com/4beyu",
            "https://instagram.com/bayu_permanayogaa"
        ];
    }

    return (
        <Head>
            <title>{`${title} | Bayu Permana`}</title>
            <meta name="description" content={description} />

            {/* OpenGraph */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:type" content={isArticle ? 'article' : 'website'} />
            <meta property="og:image" content={image || defaultImage} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@4beyu" />
            <meta name="twitter:creator" content="@4beyu" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image || defaultImage} />

            {/* Author and Keywords */}
            <meta name="author" content={author} />
            {tags && <meta name="keywords" content={tags.join(', ')} />}

            {/* Canonical Link */}
            <link rel="canonical" href={fullUrl} />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
        </Head>
    );
};

export default SEO;
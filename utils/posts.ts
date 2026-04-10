export interface PostMetadata {
    title: string;
    date: string;
    description: string;
    tags: string[];
    slug: string;
}

export interface Post {
    data: PostMetadata;
    content: string;
    slug: string;
}

// Use Vite's build-time globbing. Eager loading ensures they are bundled.
const postFiles = import.meta.glob('../posts/*.md', { query: '?raw', eager: true, import: 'default' });

// Custom high-performance Frontmatter parser because gray-matter is for Jerries
export const parseFrontmatter = (content: string) => {
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
                data[key.trim()] = value.slice(1, -1).split(',').map((v: string) => v.trim().replace(/^["'](.*)["']$/, '$1'));
            } else {
                data[key.trim()] = value;
            }
        }
    });

    return { data, content: content.replace(match[0], '').trim() };
};

export const getAllPosts = (): Post[] => {
    return Object.entries(postFiles).map(([path, content]) => {
        const slug = path.split('/').pop()?.replace('.md', '') || '';
        const { data, content: markdownContent } = parseFrontmatter(content as string);
        
        return {
            slug,
            data: {
                title: data.title || 'Untitled',
                date: data.date || '2026-01-01',
                description: data.description || '',
                tags: data.tags || [],
                slug
            },
            content: markdownContent
        };
    }).sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());
};

export const getPostBySlug = (slug: string): Post | null => {
    const cleanSlug = slug.replace(/\/$/, '');
    const matchingPath = Object.keys(postFiles).find(path =>
        path.toLowerCase().endsWith(`/${cleanSlug}.md`) ||
        path.toLowerCase().endsWith(`${cleanSlug}.md`)
    );

    if (!matchingPath) return null;

    const rawContent = postFiles[matchingPath];
    const { data, content } = parseFrontmatter(rawContent as string);

    return {
        slug: cleanSlug,
        data: {
            title: data.title || 'Untitled',
            date: data.date || '2026-01-01',
            description: data.description || '',
            tags: data.tags || [],
            slug: cleanSlug
        },
        content
    };
};

export const getAllPostSlugs = (): string[] => {
    return Object.keys(postFiles)
        .map(path => path.split('/').pop()?.replace('.md', '') || '')
        .filter(Boolean);
};

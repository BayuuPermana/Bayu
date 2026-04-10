# Engineering Portfolio — Bayu Permana

Technical showcase of a Software Engineer specializing in the intersection of data systems and full-stack development. Built as a **Static Site Generated (SSG)** portfolio with full SEO pre-rendering, a markdown-powered blog, and a modern premium UI.

🚀 **Live Demo:** [bayuupermana.github.io/Bayu/](https://bayuupermana.github.io/Bayu/)

---

## ✨ Features

- **⚡ Static Site Generation:** Every page (home, blog list, and each blog post) is fully pre-rendered to static HTML at build time via `vite-react-ssg`.
- **🔍 SEO-Ready:** Each page ships with pre-rendered meta tags, Open Graph, Twitter Cards, canonical URLs, and JSON-LD structured data (Person + BlogPosting schemas).
- **📝 Markdown Blog:** File-based blog powered by `import.meta.glob` — drop a `.md` file in `/posts` and it auto-generates a page, a sitemap entry, and full SEO metadata.
- **🎨 Syntax Highlighting:** Code blocks in blog posts rendered with `react-syntax-highlighter` using the VS Code Dark+ theme.
- **🌓 Light & Dark Mode:** Fully dynamic theme switching with `localStorage` persistence.
- **📱 Responsive & Fluid:** Optimized for all screen sizes with a mobile-first approach.
- **🗺️ Auto Sitemap:** `vite-plugin-sitemap` generates `sitemap.xml` at build time.
- **🤖 robots.txt:** Pre-configured crawler directives pointing to the sitemap.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Runtime | [Bun](https://bun.sh/) |
| Framework | [React 18](https://react.dev/) |
| Routing | [React Router DOM v6](https://reactrouter.com/) |
| SSG | [vite-react-ssg](https://github.com/Daydreamer-riri/vite-react-ssg) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Build Tool | [Vite 7](https://vitejs.dev/) |
| Critical CSS | [Beasties](https://github.com/danielroe/beasties) |
| Sitemap | [vite-plugin-sitemap](https://github.com/jbaubree/vite-plugin-sitemap) |
| Icons | [Lucide React](https://lucide.dev/) |
| Markdown | [react-markdown](https://github.com/remarkjs/react-markdown) + remark-gfm |

---

## 🚀 Getting Started

Requires [Bun](https://bun.sh/).

```bash
# Clone
git clone https://github.com/BayuuPermana/Bayu.git
cd Bayu

# Install
bun install

# Dev server
bun run dev

# Production build (SSG)
npx vite-react-ssg build

# Deploy to GitHub Pages
bun run deploy
```

> **Note:** Use `npx vite-react-ssg build` directly for the production build. The `bun run build` alias works too but may suppress SSR error output.

---

## 📁 Project Structure

```
Bayu/
├── main.tsx              # Entry point — ViteReactSSG bootstrap
├── routes.tsx            # Route config with SSG paths
├── App.tsx               # Root layout (Navbar + Outlet)
├── pages/
│   ├── Home.tsx          # Portfolio sections
│   ├── BlogList.tsx      # Blog index with search
│   └── BlogPost.tsx      # Dynamic blog post renderer + getStaticPaths
├── hooks/                # Custom React hooks
│   ├── useTheme.ts       # Theme switching logic
│   └── useScrollToHash.ts# Hash routing and scroll behavior
├── utils/                # Utility functions
│   ├── posts.ts          # Centralized blog post loading & custom frontmatter parser
│   └── scroll.ts         # Scrolling utilities
├── components/
│   ├── SEO.tsx           # <Head /> meta tags + JSON-LD schemas
│   ├── CodeBlock.tsx     # Syntax-highlighted code blocks
│   └── ...               # Hero, About, TechStack, Projects, Contact
├── posts/                # Markdown blog posts (*.md)
├── public/
│   └── robots.txt
└── vite.config.ts        # SSG, sitemap, beasties config
```

---

## ✍️ Adding a Blog Post

Create a new `.md` file in `posts/` with frontmatter:

```markdown
---
title: "Your Post Title"
date: "2026-02-20"
description: "A short description for SEO."
tags: ["tag1", "tag2"]
---

Your markdown content here...
```

The post is automatically:
- Rendered as a static HTML page at `/blog/your-filename`
- Indexed on the `/blog` listing page
- Added to `sitemap.xml`
- Given full SEO meta tags and JSON-LD `BlogPosting` schema

---

## 📄 License

Open-source under the MIT License. Feel free to use it as a reference for your own portfolio!

---

Built with ❤️ by [Bayu Permana](https://github.com/BayuuPermana)
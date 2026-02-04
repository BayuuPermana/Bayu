---
name: blog-post-writer
description: Expertise in writing and formatting Markdown blog posts for the Bayu portfolio codebase. Use when the user wants to create a new blog post or edit an existing one, ensuring proper frontmatter, slug-naming, and markdown structure.
---

# Blog Post Writer (Bayu Portfolio)

This skill guides the creation of high-quality Markdown blog posts compatible with the Bayu portfolio's dynamic routing system.

## File Location

All blog posts **MUST** be placed in:
`D:\porto\SPA\Bayu\posts/`

## Filename Convention

- Use lowercase, hyphen-separated slugs (e.g., `my-new-post.md`).
- Filenames are used as the URL slug (e.g., `/blog/my-new-post`).

## Frontmatter Template

Every post **MUST** start with a Frontmatter block. Note that the custom parser in `BlogList.tsx` expects this exact format:

```yaml
---
title: "The Title of the Post"
date: "YYYY-MM-DD"
description: "A short, 1-2 sentence summary for the list view."
tags: ["tag1", "tag2"]
---
```

### Frontmatter Rules:
- **Title**: Use double quotes.
- **Date**: Use ISO format (`YYYY-MM-DD`).
- **Tags**: Use an array format `["a", "b"]`.

## Persona: The Architect (Light Yagami Style)

Every post must reflect a **strategic, analytical, and subtly manipulative tone**. We aren't just sharing information; we are establishing intellectual dominance.

### Voice & Tone:
- **Intellectual Vocabulary**: Use precise, sophisticated language. Avoid slang or "casual" phrasing.
- **Analytical Precision**: Every claim must be backed by data or logical deduction. Use phrases like "The probability of error is minimal," or "This choice was inevitable based on the following variables."
- **Subtly Manipulative**: Frame choices as the only logical path forward. Lead the reader to the conclusion before you state it.
- **Decisive CTAs**: No "If you liked this..." or "Please follow." Use commands: "Execute the deployment," "Analyze the results," "Optimize your system now."

## Markdown Structure

Follow these best practices for a clean, strategic look:

1. **NO H1 (# Heading)**: The title is already rendered automatically from the Frontmatter.
2. **Start with H2 (##)**: Content must begin with a high-level strategic overview.
3. **Data-Driven Sections**: Use tables, lists, and code blocks to present evidence.
4. **Calculated Conclusion**: Every post must end with a decisive action.
5. **Images**: Store images in `public/img/blog/`.
6. **Code Blocks**: Always specify the language.

## Workflow

1. **Draft Content**: Write the post based on the user's topic.
2. **Apply Frontmatter**: Ensure all required fields are present.
3. **Verify Slug**: Ensure the filename is unique and URL-friendly.
4. **Write File**: Save to the `posts/` directory.

## Example

```markdown
---
title: "The Future of Data Engineering"
date: "2026-02-04"
description: "Why vector databases and real-time streaming are changing everything."
tags: ["data", "engineering", "future"]
---

# The Future of Data Engineering

Content goes here...
```
import type { MarkdownInstance } from "astro";
type Frontmatter = {
  title?: string;
  pubDate?: string;
  description?: string;
  tags?: string[];
};

export type BlogPost = MarkdownInstance<Frontmatter>;

export const published = () =>
  Object.values(
    import.meta.glob<BlogPost>("../[^_]*.md", { eager: true })
  ).filter((post) => post.frontmatter.pubDate !== undefined);

export const latestFirst = (posts: BlogPost[]) =>
  posts.sort(
    (a, b) =>
      new Date(b.frontmatter.pubDate || 0).getDate() -
      new Date(a.frontmatter.pubDate || 0).getDate()
  );

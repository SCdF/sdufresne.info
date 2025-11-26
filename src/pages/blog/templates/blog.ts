import type { MarkdownInstance } from "astro";
type Frontmatter = {
  title?: string;
  pubDate?: string;
  description?: string;
  tags?: string[];
};

export type BlogPost = MarkdownInstance<Frontmatter>;

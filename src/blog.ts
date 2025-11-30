import { getCollection, type CollectionEntry } from "astro:content";

const allBlogPosts = await getCollection("blog");

export const published = () =>
  Object.values(allBlogPosts).filter((post) => post.data.pubDate !== undefined);

export const latestFirst = (posts: CollectionEntry<"blog">[]) =>
  posts.sort((a, b) => b.data.pubDate.getDate() - a.data.pubDate.getDate());

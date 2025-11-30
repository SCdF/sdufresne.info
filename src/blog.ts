import { getCollection, type CollectionEntry, z } from "astro:content";

export const BlogSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
});

export type BlogSchema = z.infer<typeof BlogSchema>;

export const published = async () =>
  (await getCollection("blog")).sort(
    (a, b) =>
      b.data?.pubDate?.getDate() || 0 - (a.data?.pubDate?.getDate() || 0)
  );

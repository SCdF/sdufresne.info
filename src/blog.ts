import { getCollection, type CollectionEntry } from "astro:content";
import { z } from "astro/zod";

const Published = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
});
const Unpublished = Published.partial();
export type Published = z.infer<typeof Published>;
export type Unpublished = z.infer<typeof Unpublished>;

export const BlogSchema = z.union([Unpublished, Published]);
export type BlogSchema = z.infer<typeof BlogSchema>;

type PublishedEntry = CollectionEntry<"blog"> & {
  data: Published;
};

export const isPublished = (
  entry: CollectionEntry<"blog">
): entry is PublishedEntry => entry.data.pubDate instanceof Date;

export const published = async () =>
  (await getCollection("blog"))
    .filter(isPublished)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

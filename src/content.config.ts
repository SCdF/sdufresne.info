import { defineCollection } from "astro:content";
import * as slugifyLib from "slugify";
import { glob } from "astro/loaders";
import { BlogSchema } from "./blog";
import { date } from "./utils";

const slugify = (s: string) =>
  slugifyLib.default(s, { lower: true, trim: true });

const blog = defineCollection({
  loader: glob({
    pattern: "*.md",
    base: "src/blog",
    generateId: (options) => {
      const data = options.data;

      const titlePart = options.entry.split(".md")[0];

      if (data.pubDate instanceof Date) {
        return slugify(`${date(data.pubDate)}-${titlePart}`);
      } else {
        return `draft/${slugify(titlePart)}`;
      }
    },
  }),
  schema: BlogSchema,
});

export const collections = { blog };

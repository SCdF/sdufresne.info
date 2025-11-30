import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { BlogSchema } from "./blog";
import { date } from "./utils";

const blog = defineCollection({
  loader: glob({
    pattern: "[^_]*.md",
    base: "src/blog",
    generateId: (options) => {
      const data = options.data as BlogSchema;

      const titlePart = options.entry.split(".md")[0].replaceAll(" ", "-");

      return `${date(data.pubDate)}-${titlePart}`;
    },
  }),
  schema: BlogSchema,
});

export const collections = { blog };

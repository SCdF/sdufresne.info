import { defineCollection, z } from "astro:content";
import slugify from "slugify";
import { glob } from "astro/loaders";
import { BlogSchema } from "./blog";
import { date } from "./utils";

const blog = defineCollection({
  loader: glob({
    pattern: "[^_]*.md",
    base: "src/blog",
    generateId: (options) => {
      const data = options.data as BlogSchema;

      const titlePart = slugify(options.entry.split(".md")[0], {
        lower: true,
        trim: true,
      });

      return `${date(data.pubDate)}-${titlePart}`;
    },
  }),
  schema: BlogSchema,
});

export const collections = { blog };

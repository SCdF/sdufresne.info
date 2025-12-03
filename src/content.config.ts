import { defineCollection } from "astro:content";
import slugify from "slugify";
import { glob } from "astro/loaders";
import { BlogSchema } from "./blog";
import { date } from "./utils";

const blog = defineCollection({
  loader: glob({
    pattern: "*.md",
    base: "src/blog",
    generateId: (options) => {
      const data = options.data;

      const datePart =
        data.pubDate instanceof Date ? date(data.pubDate) : `DRAFT`;

      const titlePart = options.entry.split(".md")[0];

      const slug = slugify(`${datePart}-${titlePart}`, {
        lower: true,
        trim: true,
      });

      return slug;
    },
  }),
  schema: BlogSchema,
});

export const collections = { blog };

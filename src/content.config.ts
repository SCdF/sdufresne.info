import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { BlogSchema } from "./blog";

const blog = defineCollection({
  loader: glob({ pattern: "[^_]*.md", base: "src/blog" }),
  schema: BlogSchema,
});

export const collections = { blog };

import rss from "@astrojs/rss";
import { published } from "../blog";

export async function GET(context) {
  const blog = await published();
  return rss({
    title: `Stefan du Fresne's Blog`,
    description:
      "Blog of Stefan du Fresne, software developer aka software engineer aka code craftsman aka software imagineer",
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.id}`,
    })),
  });
}

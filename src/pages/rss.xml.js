import rss from "@astrojs/rss";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";

import { published } from "../blog";

const parser = new MarkdownIt();

export async function GET(context) {
  const blog = await published();
  return rss({
    title: `Stefan du Fresne's Blog`,
    description:
      "Blog of Stefan du Fresne, software developer aka software engineer aka code craftsman aka software imagineer",
    site: context.site,
    items: blog.map((post) => ({
      link: `/blog/${post.id}`,
      content: sanitizeHtml(parser.render(post.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      }),
      ...post.data,
    })),
  });
}

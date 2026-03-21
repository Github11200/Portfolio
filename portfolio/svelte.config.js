import path from "node:path";
import { fileURLToPath } from "node:url";
import { mdsvex, escapeSvelte } from "mdsvex";
import { createHighlighter } from "shiki";
import adapter from "@sveltejs/adapter-vercel";
import relativeImages from "mdsvex-relative-images";
import rehypeKatexSvelte from 'rehype-katex-svelte';
import remarkMath from 'remark-math';

const theme = "github-light";
const highlighter = await createHighlighter({
	themes: [theme],
	langs: ["javascript", "typescript", "c", "c++"],
});

const addCodeBlockStyles = (html) => {
	return html.replace(
		/<pre class="shiki[^"]*" style="([^"]*)"/,
		(_match, existingStyles) =>
			`<pre class="shiki ${theme}" style="${existingStyles}; background-color: var(--muted); color: var(--foreground); padding: calc(var(--spacing) * 4); border-radius: var(--radius-lg); border: 1px solid var(--border); overflow-x: auto;"`,
	);
};

const dirname = path.resolve(fileURLToPath(import.meta.url), "../");

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({}),
	},
	extensions: [".svelte", ".md"],
	preprocess: [
		mdsvex({
			extensions: [".md"],
			layout: {
				mds: path.join(dirname, "./src/routes/blog/_layout.svelte"),
			},
			highlight: {
				highlighter: async (code, lang = "text") => {
					const rawHtml = highlighter.codeToHtml(code, {
						lang,
						theme,
					});
          const html = escapeSvelte(addCodeBlockStyles(rawHtml));
					return html;
				},
			},
      remarkPlugins: [remarkMath, relativeImages],
      rehypePlugins: [rehypeKatexSvelte],
    }),
	],
};

export default config;

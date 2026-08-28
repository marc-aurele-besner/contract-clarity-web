import adapter from '@sveltejs/adapter-vercel'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		prerender: {
			// /auth/* routes are served by the @auth/sveltekit handle hook at
			// runtime, not by SvelteKit route files. The prerender crawler
			// discovers them via links in the layout (e.g. /auth/signin) but
			// cannot fetch them statically. Ignore those expected 404s so the
			// build can complete.
			handleHttpError: ({ path }) => {
				if (path.startsWith('/auth/')) return
			}
		}
	}
}

export default config

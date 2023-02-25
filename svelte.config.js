import adapter from '@sveltejs/adapter-vercel'
import { vitePreprocess } from '@sveltejs/kit/vite'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({ runtime: 'edge' }),
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				// ignore deliberate link to shiny 404 page
				if (path === '/not-found' && referrer === '/blog/how-we-built-our-404-page') {
					return
				}

				// otherwise fail the build
				throw new Error(message)
			},
			handleMissingId: ({ path, referrer }) => {
				// ignore deliberate link to shiny 404 page
				if (path === '/not-found' && referrer === '/blog/how-we-built-our-404-page') {
					return
				}

				// otherwise fail the build
				throw new Error(`Missing id for ${path} referenced from ${referrer}`)
			}
		}
	},

	vitePlugins: {
		experimental: {
			inspector: true
		}
	}
}

export default config

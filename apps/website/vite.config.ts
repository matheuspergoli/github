import tailwindcss from "@tailwindcss/vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import { nitro } from "nitro/vite"
import { defineConfig } from "vite"

export default defineConfig({
	resolve: {
		tsconfigPaths: true
	},
	plugins: [
		nitro(),
		tailwindcss(),
		tanstackStart({
			router: {
				quoteStyle: "double",
				routeToken: "layout"
			},
			prerender: {
				enabled: true,
				crawlLinks: true
			}
		}),
		viteReact()
	]
})

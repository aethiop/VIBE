import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
const moduleExclude = (match) => {
	const m = (id) => id.indexOf(match) > -1;
	return {
		name: `exclude-${match}`,
		resolveId(id) {
			if (m(id)) return id;
		},
		load(id) {
			if (m(id)) return `export default {}`;
		},
	};
};
export default defineConfig({
	optimizeDeps: {
		include: [
			"gun",
			"iris-lib",
			"gun/gun",
			"gun/sea",
			"gun/lib/then",
			"gun/lib/webrtc",
			"gun/lib/radix",
			"gun/lib/radisk",
			"gun/lib/store",
			"gun/lib/rindexed",
		],
	},

	plugins: [vue(), moduleExclude("text-encoding")],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "/src"),
		},
	},
});

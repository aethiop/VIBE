module.exports = {
	purge: ["./src/**/*.html", "./src/**/*.js"],
	darkMode: false, // or 'media' or 'class'
	backdropFilter: {
		none: "none",
		blur: "blur(20px)",
	},
	variants: {
		extend: {
			animation: ["hover", "focus"],
		},
	},
	plugins: [require("tailwindcss-filters")],
};

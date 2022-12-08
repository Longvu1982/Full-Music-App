module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "var(--primary-color)",
				secondary: "var(--secondary-color)",
				third: "var(--third-color)",
				title_color: "var(--title-color)",
				light_title_color: "var(--light-title-color)",
				lighter_text_color: "var(--lighter-text-color)",
				border_color: "var(--border-color)",
			},
			backgroundColor: {
				primary: "var(--primary-color)",
				secondary: "var(--secondary-color)",
				title_color: "var(--title-color)",
				light_title_color: "var(--light-title-color)",
				lighter_text_color: "var(--lighter-text-color)",
				border_color: "var(--border-color)",
				third: "var(--third-color)",
			},
		},
		boxShadow: {
			insetContainer: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
		}
	},
	plugins: [
		function ({ addVariant }) {
			addVariant('child', '& > *');
			addVariant('child-hover', '& > *:hover');
		},
		require('@tailwindcss/line-clamp')
	],
};

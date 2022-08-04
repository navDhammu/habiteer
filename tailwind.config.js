const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				blueGray: '#031E30',
				primary: '#1D9BF0',
			},
			fontFamily: {
				inter: ['Inter', 'sans-serif'],
			},
		},
	},
	variants: {
		extend: {
			opacity: ['disabled'],
		},
	},
	plugins: [],
};

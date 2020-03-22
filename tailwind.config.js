const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
	theme: {
		extend:{
			fontFamily: {
				'inter': ['Inter', ...defaultTheme.fontFamily.sans],
			},
			borderRadius: {
				'xl': '19px',
				'2xl': '24px',
			},
			margin: {
				'xs': '7px',
			},
		},
	},
	variants : {},
	plugins  : []
};

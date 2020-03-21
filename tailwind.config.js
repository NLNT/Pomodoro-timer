const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
	theme: {
		extend:{
			fontFamily: {
				'inter': ['Inter', ...defaultTheme.fontFamily.sans],
			}
		},
	},
	variants : {},
	plugins  : []
};

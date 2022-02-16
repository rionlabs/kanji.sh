const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    mode: 'jit',
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        fontFamily: {
            sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
            serif: ['Quicksand', ...defaultTheme.fontFamily.serif]
        },
        extend: {}
    },
    plugins: []
};

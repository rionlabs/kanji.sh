const path = require('path');
const defaultTheme = require('tailwindcss/defaultTheme');

/**
 * @type {import('tailwindcss').Config}
 */
const tailwindCssConfig = {
    mode: 'jit',
    content: [
        path.join(__dirname, 'app/**/*.{js,ts,jsx,tsx,mdx}'),
        path.join(__dirname, 'pages/**/*.{js,ts,jsx,tsx,mdx}'),
        path.join(__dirname, 'src/**/*.{js,ts,jsx,tsx,mdx}')
    ],
    theme: {
        fontFamily: {
            sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
            serif: ['Quicksand', ...defaultTheme.fontFamily.serif]
        },
        container: {
            center: true,
            padding: {
                DEFAULT: '2rem',
                sm: '2rem',
                lg: '2rem',
                xl: '2rem',
                '2xl': '2rem'
            }
        },
        extend: {
            aspectRatio: {
                A4: '210 / 297'
            }
        }
    },
    plugins: [require('@tailwindcss/typography'), require('daisyui')],
    daisyui: {
        logs: true,
        themes: [
            {
                light: {
                    'base-100': '#DFE0EC',
                    primary: '#db5ea9',
                    secondary: '#d1f23e',
                    accent: '#a2d3f9',
                    neutral: '#181925',
                    info: '#3DA7C7',
                    success: '#2AA78C',
                    warning: '#EFB95D',
                    error: '#F3587C'
                }
            }
        ]
    }
};

export default tailwindCssConfig;

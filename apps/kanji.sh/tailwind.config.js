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
                sm: '3rem',
                lg: '4rem'
            }
        },
        extend: {
            aspectRatio: {
                A4: '210 / 297'
            },
            gridTemplateRows: {
                sandwich: 'auto 1fr auto'
            }
        }
    },
    plugins: [require('@tailwindcss/typography'), require('daisyui')],
    daisyui: {
        logs: true,
        themes: [
            {
                light: {
                    primary: '#3730A3',
                    'primary-content': '#ffffff',
                    secondary: '#D1F23E',
                    secondaryContent: '#ffffff',
                    accent: '#A2D3F9',
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

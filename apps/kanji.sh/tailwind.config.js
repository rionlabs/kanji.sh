const path = require('path');
const defaultTheme = require('tailwindcss/defaultTheme');

/**
 * @type {import('tailwindcss').Config}
 */
const tailwindCssConfig = {
    darkMode: 'class',
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
                DEFAULT: '1.5rem',
                sm: '2rem',
                md: '3rem',
                lg: '4rem'
            }
        },
        extend: {
            colors: {
                current: 'currentColor',
                jlpt: '#1A7EC3',
                grade: 'rgb(92, 159, 79)',
                wanikani: 'rgb(0, 170, 255)',
                frequency: 'rgb(13, 37, 66)',
                kanjigarden: 'rgb(226, 80, 109)'
            },
            aspectRatio: {
                A4: '210 / 297'
            },
            gridTemplateRows: {
                sandwich: 'auto 1fr auto'
            },
            aria: {
                invalid: 'invalid="true"'
            }
        }
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/container-queries'),
        require('daisyui')
    ],
    daisyui: {
        themes: [
            {
                light: {
                    primary: '#3730A3',
                    'primary-content': '#ffffff',
                    secondary: '#D1F23E',
                    'secondary-content': '#ffffff',
                    accent: '#A2D3F9',
                    'accent-content': '#A2D3F9',
                    neutral: '#2e3338',
                    'neutral-content': '#d9d9e0',
                    'base-100': '#ffffff',
                    'base-200': '#f2f2f2',
                    'base-300': '#e6e6e6',
                    'base-content': '#2b333b',
                    info: '#00bfff',
                    'info-content': '#002633',
                    success: '#00ff99',
                    'success-content': '#003322',
                    warning: '#ffaa00',
                    'warning-content': '#ffaa00',
                    error: '#ff0000',
                    'error-content': '#330000'
                },
                dark: {
                    primary: '#3730A3',
                    'primary-content': '#ffffff',
                    secondary: '#D1F23E',
                    'secondary-content': '#ffffff',
                    accent: '#A2D3F9',
                    'accent-content': '#A2D3F9',
                    neutral: '#2e3338',
                    'neutral-content': '#b3b8cc',
                    'base-100': '#24282e',
                    'base-200': '#212427',
                    'base-300': '#1e2020',
                    'base-content': '#b3b8cc',
                    info: '#00bfff',
                    'info-content': '#002633',
                    success: '#00ff99',
                    'success-content': '#003322',
                    warning: '#ffaa00',
                    'warning-content': '#332200',
                    error: '#ff0000',
                    'error-content': '#330000'
                }
            }
        ]
    }
};

export default tailwindCssConfig;

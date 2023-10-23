import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
    mode: 'jit',
    content: ['./app/**/*.{js,ts,jsx,tsx}', './app/**/*.mdx'],
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
                'A4': '210 / 297'
            }
        }
    },
    plugins: [require("@tailwindcss/typography"), require("daisyui")],
    daisyui: {
        logs: true,
        themes: [
            {
                light: {
                    "primary": "#db5ea9",
                    "secondary": "#d1f23e",
                    "accent": "#a2d3f9",
                    "neutral": "#181925",
                    "base-100": "#DFE0EC",
                    "info": "#3DA7C7",
                    "success": "#2AA78C",
                    "warning": "#EFB95D",
                    "error": "#F3587C",
                },
            },
        ],
    }
} satisfies Config;


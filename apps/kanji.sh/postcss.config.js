const path = require('path');

module.exports = {
    plugins: {
        autoprefixer: {},
        tailwindcss: {
            config: path.join(__dirname, 'tailwind.config.js')
        },
        'postcss-import': {},
        'tailwindcss/nesting': {}
    }
};

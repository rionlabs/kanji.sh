const path = require('path');

module.exports = {
    plugins: {
        autoprefixer: {},
        'postcss-import': {},
        tailwindcss: {
            config: path.join(__dirname, 'tailwind.config.js')
        }
    }
};

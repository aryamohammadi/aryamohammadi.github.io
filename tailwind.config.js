/** Build the stylesheet with:
 *  npx -y tailwindcss@3.4.17 -c tailwind.config.js -i tailwind.input.css -o css/tailwind.css --minify
 */
module.exports = {
    content: ['./index.html', './js/main.js'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#d4af37', // Elegant gold
                'primary-light': '#e5c558',
                'primary-dark': '#b8941f',
            }
        }
    }
};

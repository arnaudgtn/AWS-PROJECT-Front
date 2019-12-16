const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    plugins: [
        new Dotenv()
    ],
    optimization: { minimize: false },
    entry: './assets/js/vm.js',
    output: {
        filename: 'api_url.js',
        path: path.resolve(__dirname, 'dist'),
    },
};

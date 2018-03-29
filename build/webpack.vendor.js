const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        vendor: ['react', 'react-dom'],
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'dll/[name]_dll.js',
        library: '_dll_[name]',
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '../dist/dll', 'manifest.json'),
            name: '_dll_[name]',
        }),
    ]
};
var path = require("path");

module.exports = {
    context: path.join(__dirname),
    entry: './app.tsx',
    output: {
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loaders: [
                    'babel'
                ]
            },
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|bower_components)/,
                loaders: [
                    'ts-loader'
                ]
            }
        ]
    },
    resolve: {
        root: path.resolve('.'),
        extensions: ["", ".js", ".jsx", ".ts", ".tsx"]
    }
}
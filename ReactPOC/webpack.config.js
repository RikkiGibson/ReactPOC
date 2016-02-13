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
                    'babel?presets=es2015',
                    'ts-loader'
                ]
            },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.styl$/, loader: "style-loader!css-loader!stylus-loader" }
        ]
    },
    resolve: {
        root: path.resolve('.'),
        extensions: ["", ".js", ".jsx", ".ts", ".tsx"]
    }
}
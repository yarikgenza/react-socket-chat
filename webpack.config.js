var path = require('path')


module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.js$/, loaders: ['babel'], include: path.join(__dirname, 'src')},
            {
                test: /\.less$/,
                loader: "style!css!less"
            }
        ]
    }
};

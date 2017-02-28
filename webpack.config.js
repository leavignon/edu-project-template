const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS  = {
    app: path.join(__dirname, 'src/app'),
    build: path.join(__dirname, 'build')
};

const common = {
    entry: {
        app: ['babel-polyfill', path.join(PATHS.app, '/index.jsx')]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: PATHS.build,
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test:  /\.(js|jsx)$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname)+'/index.ejs'
        })
    ]
}

if (process.env.NODE_ENV == 'dev') {
    module.exports = merge(common, {
        entry: [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://localhost:4000',
            'webpack/hot/only-dev-server',
            PATHS.app
        ],
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    });
}

if (process.env.NODE_ENV == 'production') {
    module.exports = merge(common, {
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                output: {
                    comments: false,
                },
                compress: {
                    // Ignore warning messages are they are pretty useless
                    warnings: false
                }
            })
        ]
    });
}


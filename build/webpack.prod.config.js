const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.cssSourceMap,
            extract: true
        })
    },
    devtool: false,
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.build.env
        }),
        new MiniCssExtractPlugin({
            filename: utils.assetsPath('css/[name].css'),
            allChunks: true
        }),
        new webpack.optimize.SplitChunksPlugin({
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    test: path.join(__dirname, '../node_modules'),
                    chunks: 'all'
                }
            }
        }),
        new CopyWebpackPlugin([
            {
                from: 'client/views',
                to: 'views'
            }
        ])
    ]
});

module.exports = webpackConfig;

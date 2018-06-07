const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    output: {
        path: config.build.assetsRoot,
        publicPath: config.build.assetsPublicPath,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.cssSourceMap,
            extract: true
        })
    },
    devtool: false,
    optimization: {
        splitChunks: {
            chunks: 'initial',
            cacheGroups: {
                vendor: {
                    test: /node_modules\//,
                    name: 'vendor',
                    chunks: 'all',
                    priority: 10,
                    enforce: true
                },
                commons: {
                    test: /common\/|components\//,
                    name: 'commons',
                    priority: 10,
                    enforce: true
                }
            }
        },
        runtimeChunk: {
            name: 'manifest'
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.build.env
        }),
        new MiniCssExtractPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css'),
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            filename: 'views/index.ejs',
            template: '!!raw-loader!client/views/index.ejs',
            inject: true,
            chunksSortMode: 'dependency'
        })
    ]
});

module.exports = webpackConfig;

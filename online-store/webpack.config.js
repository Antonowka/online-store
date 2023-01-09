const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const baseConfig = {
    entry: path.resolve(__dirname, './js/hash-router.ts'),
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/i,
                // use: ["style-loader", "css-loader"],
                use: [
                    "style-loader",
                    {
                      loader: "css-loader",
                      options: {
                        // Run `postcss-loader` on each CSS `@import` and CSS modules/ICSS imports, do not forget that `sass-loader` compile non CSS `@import`'s into a single file
                        // If you need run `sass-loader` and `postcss-loader` on each CSS `@import` please set it to `2`
                        importLoaders: 1,
                      },
                    },
                  ],
            },
            {
                test: /\.ts$/i,
                use: 'ts-loader',
            },
            {
                test: /\.(jpg|png|gif|woff|eot|ttf|svg)/,
                use: {
                    loader: 'url-loader', // this need file-loader
                    options: {
                        limit: 50000
                    }
                }
            }
            // {
            //     test: /\.(png|svg|jpe?g|gif)$/,
            //     include: /images/,
            //     use: [
            //       {
            //         loader: 'file-loader',
            //         options: {
            //           name: '[name].[ext]',
            //           outputPath: 'images/',
            //           publicPath: 'images/'
            //         }
            //       }
            //     ]
            // },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
        new EslintPlugin({ extensions: 'ts' }),
        new CopyPlugin({
            patterns: [
              { from: "assets", to: "assets" },
              { from: "templates", to: "templates" },
            //   { from: "style", to: "style" },
              { from: "js/products.json", to: "js/products.json" },
            ],
          }),
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};

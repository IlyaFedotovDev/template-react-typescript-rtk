// webpack 5 version
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const { Directory, Path } = require('./path.config.js');

module.exports = (env) => {
    const isDev = env.dev;
    const isProd = !isDev;
    const isAnalisis = env.analize;

    const filename = (ext) => {
        const e = ext ? ext : '[ext]';
        return isDev ? `[name].${e}` : `[name].[contenthash:8].${e}`;
    };

    const chunkFilename = (ext) => {
        const e = ext ? ext : '[ext]';
        return isDev
            ? `[name].[id].chunk.${e}`
            : `[name].[id].[contenthash:8].chunk.${e}`;
    };

    const cssLoaders = [
        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: [
                        [
                            'postcss-preset-env',
                            {
                                // Options
                            },
                        ],
                    ],
                },
            },
        },
    ];

    const plugins = [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(Path.entry.static, 'index.html'),
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: Path.entry.static,
                    to: Path.output.static,
                    noErrorOnMissing: true,
                    globOptions: {
                        ignore: ['**/*.html'],
                    },
                },
            ],
        }),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                diagnosticOptions: {
                    semantic: true,
                    syntactic: true,
                },
                configFile: path.resolve('tsconfig.json'),
            },
        }),
    ];

    if (isDev) {
        plugins.push(
            new ESLintPlugin({
                extensions: ['js', 'ts', 'jsx', 'tsx'],
                fix: true,
            }),
        );
    }

    if (isProd) {
        plugins.push(
            new MiniCssExtractPlugin({
                filename: path.join(Directory.output.css, filename('css')),
                chunkFilename: path.join(
                    Directory.output.css,
                    chunkFilename('css'),
                ),
            }),
        );
    }

    if (isAnalisis) {
        plugins.push(
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                reportFilename: path.join(Path.output.stats, 'index.html'),
            }),
        );
    }

    const config = {
        mode: isDev ? 'development' : 'production',
        entry: {
            app: path.resolve(__dirname, Directory.entry.root, 'index.tsx'),
        },
        output: {
            path: Path.output.root,
            // publicPath: '/',
            filename: path.join(Directory.output.js, filename('js')),
            chunkFilename: path.join(Directory.output.js, chunkFilename('js')),
            assetModuleFilename: path.join(Directory.output.asset, filename()),
            clean: true,
        },

        devtool: isDev ? 'eval-source-map' : false,
        optimization: {
            minimizer: [
                `...`,
                new CssMinimizerPlugin(),
                new ImageMinimizerPlugin({
                    minimizer: {
                        implementation: ImageMinimizerPlugin.imageminMinify,
                        options: {
                            plugins: [
                                'mozjpeg',
                                ['optipng', { optimizationLevel: 5 }],
                                [
                                    'svgo',
                                    {
                                        plugins: [
                                            {
                                                name: 'preset-default',
                                                params: {
                                                    overrides: {
                                                        removeViewBox: false,
                                                    },
                                                },
                                            },
                                            'prefixIds',
                                        ],
                                    },
                                ],
                            ],
                        },
                    },
                }),
            ],
            // runtimeChunk: 'single',
            moduleIds: 'deterministic',
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                        enforce: true,
                    },
                },
            },
        },

        resolve: {
            extensions: ['.tsx', '.jsx', '.ts', '...'],
            plugins: [
                new TsconfigPathsPlugin({
                    configFile: path.resolve(__dirname, 'tsconfig.json'),
                }),
            ],
        },

        devServer: {
            historyApiFallback: true,
            // proxy: {
            //     '/api': 'http://localhost:3000',
            // },
            static: Path.output.root,
            hot: isDev,
            compress: true,
            port: 9000,
            open: true,
        },

        module: {
            rules: [
                {
                    test: /\.(js|ts)x?$/,
                    exclude: /node_modules/,
                    use: ['babel-loader'],
                },
                {
                    test: /\.css$/i,
                    use: [...cssLoaders],
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [...cssLoaders, 'sass-loader'],
                },
                {
                    test: /\.(png|jpe?g|webp|gif)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: path.join(Directory.output.img, filename()),
                    },
                },
                {
                    test: /\.svg$/i,
                    oneOf: [
                        {
                            resourceQuery: /inline/, // foo.css?inline
                            type: 'asset/inline',
                        },
                        {
                            type: 'asset/resource',
                            generator: {
                                filename: path.join(
                                    Directory.output.img,
                                    'svg',
                                    filename(),
                                ),
                            },
                        },
                    ],
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: path.join(Directory.output.font, filename()),
                    },
                },
            ],
        },

        plugins: plugins,
    };

    return config;
};

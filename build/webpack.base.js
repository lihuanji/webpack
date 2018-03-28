const path = require('path');
const webpack = require('webpack');
// 删除目录
const CleanWebpackPlugin = require('clean-webpack-plugin');
// 根据html模板生成html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 提取css为单独文件 webpack4.0.0以上版本需要npm i extract-text-webpack-plugin@next -D
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HappyPack = require('happypack');

module.exports = {
    // 入口文件路径
    // key为chunk名 如果传入路径string，则chunk默认为main
    entry: {
        main: './src/index.js',
        // 提取库作为单独入口，减少单个文件体积
        vendor: ['react', 'react-dom'],
    },
    // 输出文件配置
    output: {
        // 路径
        path: path.join(__dirname, '../dist'),
        // 文件名  [name]为chunk名，默认为main  [hash] 为文件hash值  :8取前8位
        filename: '[name].[hash:8].js',
        // 给script link 加上base url  默认为/ 如有cnd加速，则填写cnd地址
        publicPath: '/'
    },
    resolve: {
        // import时, 可以省略扩展名
        extensions: ['.js', '.jsx', '.scss', '.json'],
    },
    module: {
        rules: [
            // 处理js jsx
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                // use: ['babel-loader']
                use: 'happypack/loader?id=babel',
            },
            // 处理scss
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    // style-loader 把css直接写入html中style标签
                    fallback: 'style-loader',
                    // sass-loader 转换scss为css文件
                    // css-loader css中import支持
                    // loader执行顺序 从右往左执行
                    use: ['css-loader', 'sass-loader']
                }),
                // 排除node_modules里的文件，不做解析
                exclude: /node_modules/
            },
            // 处理css
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    // style-loader 把css直接写入html中style标签
                    fallback: 'style-loader',
                    // css-loader css中import支持
                    // loader执行顺序 从右往左执行
                    use: ['css-loader']
                }),
                // 排除node_modules里的文件，不做解析
                exclude: /node_modules/
            },
            // 处理图片
            {
                test: /\.(png|jpg|gif|ttf|eot|woff(2)?)(\?[=a-z0-9]+)?$/,
                use: [{
                    // 依赖于 file-loader
                    // 超出阈值交给file-loader, 否则转换为base64
                    loader: 'url-loader',
                    options: {
                        query: {
                            // 阈值 单位byte
                            limit: '8192',
                            name: 'images/[name]_[hash:7].[ext]',
                            publicPath: '../'
                        }
                    }
                }]
            },
        ]
    },
    plugins: [
        // 每次构建前先删除dist目录
        new CleanWebpackPlugin(
            // 需要删除的文件夹或文件
            path.join(__dirname, '../dist'),
            {
                // 需要配置root 不然会滤过 不生效
                root: path.join(__dirname, '../')
            }
        ),
        // 根据模板生成html
        // 文档: https://github.com/jantimon/html-webpack-plugin
        new HtmlWebpackPlugin({
            template: './src/templet.html', // html模板
            filename: 'index.html', // 生成文件名 多模块可用[name]
            title: 'index', // 传入模板，模板里面可以获取到该参数
            hash: true,// 会在引入的js里加入查询字符串避免缓存,
            minify: {
                // 删除双引号，减少体积
                removeAttributeQuotes: true
            }
        }),
        // name为chunk名  contenthash根据内容生成hash值
        // 文档: https://github.com/webpack-contrib/extract-text-webpack-plugin
        new ExtractTextPlugin('[name].[contenthash:8].css'),
        // webpack3+特性 将有联系的模板放到闭包，提升效率
        new webpack.optimize.ModuleConcatenationPlugin(),
        // 开起子进程编译
        // 文档: https://github.com/amireh/happypack
        new HappyPack({
            // 与loader配置项对应
            id: 'babel',
            // 配置多少个子进程
            threads: 4,
            // 用什么loader处理
            loaders: ['babel-loader']
        }),
    ],
    optimization: {
        // webpack4 中代替 webpack.optimize.CommonsChunkPlugin 插件
        // 可以把多次引用的文件，打包成一个common.js
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 2,
                    name: 'common'
                }
            }
        }
    },
}
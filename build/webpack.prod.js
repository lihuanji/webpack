const path = require('path');
const merge = require('webpack-merge'); // 用来合并配置文件
// 开启多个核心cpu打包，加速，并引入uglifyJS
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const base = require('./webpack.base');

const prod = {
    plugins: [
        // 文档: https://github.com/gdborton/webpack-parallel-uglify-plugin
        new WebpackParallelUglifyPlugin(
            {
                // uglifyJS 参数配置
                // 文档: https://www.npmjs.com/package/uglify-js
                uglifyJS: {
                    // 是否混淆代码
                    mangle: false,
                    output: {
                        // 代码压缩成一行 true为不压缩 false压缩
                        beautify: false,
                        // 去掉注释
                        comments: false
                    },
                    compress: {
                        // 在删除没用到代码时 不输出警告
                        warnings: false,
                        // 删除console
                        drop_console: true,
                        // 把定义一次的变量，直接使用，取消定义变量
                        collapse_vars: true,
                        // 合并多次用到的值，定义成变量
                        reduce_vars: true
                    }
                }
            }
        ),
    ]
}

module.exports = merge(base, prod);

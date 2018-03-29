const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge'); // 用来合并配置文件
const base = require('./webpack.base');

const dev = {
    devServer: {
        contentBase: path.join(__dirname, '../dist'),
        // 端口
        port: 8080,
        // 主机
        host: 'localhost',
        // 如果出错，则在浏览器中显示出错误
        overlay: true,
        // 服务器返回浏览器的时候是否启动gzip压缩
        compress: true,
        // 打包完成自动打开浏览器
        open:true,
        // 模块热替换 需要webpack.HotModuleReplacementPlugin插件
        hot: true,
        // 实时构建
        inline: true,
        // 显示打包进度
        progress: true,
    },
    // 生成映射，查看编译前代码，利于找bug
    devtool: 'inline-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // 显示模块的相对路径
        new webpack.NamedModulesPlugin(),
    ]
}

module.exports = merge(base, dev);

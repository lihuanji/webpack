// 预设 presets 一个预设包含多个插件 起到方便作用 不用引用多个插件
env -> 只转换新的句法，列如const let => ..等 不转换 Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise、Object.assign。

stage-0 -> es7提案转码规则  有 0 1 2 3 阶段  0包含 1 2 3里面的所有

react -> 转换react jsx语法

// 插件 plugins 可以自己开发插件 转换代码
transform-runtime  -> 转换新语法，自动引入polyfill插件，另外可以避免污染全局变量

transform-decorators-legacy -> 支持装饰器

add-module-exports -> 转译export default {};  添加上module.exports = exports.default 支持commonjs
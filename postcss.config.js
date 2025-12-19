// postcss.config.js
export default {
    plugins: {
        // 避免自动合并 @import
        'postcss-import': false, // 关闭 postcss-import（如果安装了）
    },
};

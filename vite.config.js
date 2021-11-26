import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";
import dsv from "@rollup/plugin-dsv";
import alias from "@rollup/plugin-alias";
import styleImport from "vite-plugin-style-import";
import nodeResolve from "rollup-plugin-node-resolve";
// import nodeResolve2 from "@rollup/plugin-node-resolve";
// import nodePolyfills from 'rollup-plugin-node-polyfills';
import { VitePWA } from "vite-plugin-pwa";
import manifest from "./manifest.json";
import { resolve } from "path";
import path from "path";
import legacy from "@vitejs/plugin-legacy";
import viteCompression from "vite-plugin-compression";
import AsyncCatch from "vite-plugin-async-catch"; // 一个可以自动为 async 函数注入 try catch 代码的 Vite 插件
// import VitePluginVue2Suffix from "vite-plugin-vue2-suffix" // 转换引入组件缺少.vue后缀的问题

export default defineConfig({
    root: "./",
    plugins: [
        // commonjs(),
        // babel({ babelHelpers: 'bundled' }),
        createVuePlugin(),
        // nodePolyfills(),
        // nodeResolve2({ preferBuiltins: false }), // 如果在本地版本上使用内置模块，则带有警告
        // VitePluginVue2Suffix(),
        alias(),
        dsv(),
        VitePWA({
            strategies: "injectManifest",
            srcDir: "",
            filename: "service-worker.js",
            manifest,
        }),
        // viteCompression({
        //     algorithm: 'brotliCompress',
        //     threshold: 1,
        //     deleteOriginFile: true
        // }),
        AsyncCatch({
            catchCode: `console.error(e)`,
        }),
        legacy({
            targets: ["ie >= 11"],
            additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
        }),
    ],
    resolve: {
        alias: [{
                find: "@",
                replacement: resolve(__dirname, "src"),
            },
            {
                find: /^~/,
                replacement: "",
            },
        ],
    },
    /**
     * 在生产中服务时的基本公共路径。
     * @default '/'
     */
    base: "./",
    optimizeDeps: {
        exclude: ["vue"],
    },
    build: {
        /**
         * 与“根”相关的目录，构建输出将放在其中。如果目录存在，它将在构建之前被删除。
         * @default 'dist'
         */
        outDir: "dist",
        sourcemap: false,
        manifest: true,
        chunkSizeWarningLimit: 600,
        rollupOptions: {
            plugins: [nodeResolve()],
            external: [
                // 'vant',
                // path.resolve(__dirname, "/src/pages/cfdadrug/china/children/chart.js"),
                // 'jquery',
                // 'vue',
                // 'echarts',
                // 'vue-cookies',
                // 'vue-router',
                // 'axios',
                // 'vue-i18n',
                // 'element-ui',
                // 'vue-matomo',
                // 'video-js',
                // 'html2canvas',
                // 'jspdf',
                // 'vue-analytics',
                // 'vue-quill-editor',
                // 'uuid-js',
                // 'element-theme',
                // "element-theme-chalk",
                // 'element-theme-default'
            ],
            output: {
                globals: {
                    jquery: "$",
                    lodash: "_",
                    vue: "vue",
                    echarts: "echarts",
                    "vue-router": "vue-router",
                    vuex: "vuex",
                    axios: "axios",
                    "vue-i18n": "vue-i18n",
                    "element-ui": "element-ui",
                    "vue-matomo": "vue-matomo",
                    "video-js": "video-js",
                    "vue-cookies": "vue-cookies",
                    html2canvas: "html2canvas",
                    jspdf: "jspdf",
                    "vue-analytics": "vue-analytics",
                    "vue-quill-editor": "vue-quill-editor",
                    "vue-quill-editor-upload": "vue-quill-editor-upload",
                    vant: "vant",
                    "uuid-js": "uuid-js",
                    "element-theme": "element-theme",
                    "element-theme-chalk": "element-theme-chalk",
                    "js-md5": "js-md5",
                    moment: "moment",
                    sha1: "sha1",
                    "crypto-js": "crypto-js",
                    "element-theme-default": "element-theme-default",
                    func: path.resolve(
                        __dirname,
                        "/src/pages/cfdadrug/china/children/chart.js"
                    ),
                },
            },
        },
    },
    server: {
        host: "vip-local.yaozh.com",
        strictPort: true,
        port: 3000,
        // 是否自动在浏览器打开
        open: true,
        // 是否开启 https
        https: true,
        // 服务端渲染
        ssr: true,
        proxy: {
            "/api": "https://vip-dev.yaozh.com/",
            "/mlw": "http://felog.yaozh.com/",
            "/pat": "https://patapi-dev.yaozh.com/",
            "/lineat": "https://patapi.yaozh.com/",
        },
    },
});
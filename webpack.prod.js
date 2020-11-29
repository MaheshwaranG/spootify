const path = require("path");
const pagesConfig = require("./pages");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const dotenv= require("dotenv");

const envParsed = dotenv.config().parsed;

const env = Object.keys(envParsed).reduce((state, key) => {
    state[`process.env.${key}`] = JSON.stringify(envParsed[key]);
    return state;
}, {})

let pagesList = { ...pagesConfig }; // to getpages information
let pages = {}; // for webpack entry point
let host = "localhost";
let port = 9001;
let baseURL = `http://${host}:${port}/`

let htmlWebpackPluginsPages = []; // to chunk generation

Object.keys(pagesList).forEach((key, index) => {
    pages[`${key}`] = pagesList[`${key}`]["chunk"];

    let jsChunks = [`${key}`];

    let basicDetails = {};
    if (pagesList[`${key}`]["title"]) {
        basicDetails["title"] = pagesList[`${key}`]["title"];
    }
    if (pagesList[`${key}`]["favicon"]) {
        basicDetails["favicon"] = pagesList[`${key}`]["favicon"];
    }
    if (pagesList[`${key}`]["meta"]) {
        basicDetails["meta"] = { ...pagesList[`${key}`]["meta"] };
    }
    if (pagesList[`${key}`]["scriptLoading"]) {
        basicDetails["scriptLoading"] = pagesList[`${key}`]["scriptLoading"];
    }

    htmlWebpackPluginsPages.push(
        new HtmlWebpackPlugin({
            hash: true,
            template: "template/index.html",
            filename: `${key}.[hash].html`,
            // filename: `${key}.html`,
            base: baseURL,
            chunks: [...jsChunks],
            minify: {
                minifyJS: true,
                minifyCSS: true,
                removeComments: true,
                useShortDoctype: true,
                collapseWhitespace: true,
                collapseInlineTagWhitespace: true,
            },
            files: {
                css: [...pagesList[`${key}`]["css"]],
                js: [...pagesList[`${key}`]["js"]],
            },
            append: {
                head: `<script src="//cdn.polyfill.io/v3/polyfill.min.js"></script>`,
            },
            ...basicDetails,
        })
    );
});

console.log(
    "=======================Pages Details==============================="
);
console.log(JSON.stringify(pages));
console.log(
    "-------------------------------------------------------------------"
);

module.exports = {
    mode: "production",
    entry: {
        ...pages,
    },
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "scripts/[name].js",
        // assetModuleFilename: "assets/[hash][ext]",
    },
    target: "web",
    // Enable sourcemaps for debugging webpacks's output.
    devtool: "nosources-source-map",
    resolve: {
        extensions: [".js", ".ts", ".tsx"],
        mainFields: ["browser", "module", "main"],
        alias: {
            app: path.resolve(__dirname, "./src/"),
            asset: path.resolve(__dirname, "./src/asset"),
            components: path.resolve(__dirname, "./src/components"),
        },
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-react",
                            ],
                            plugins: [
                                "@babel/plugin-proposal-class-properties",
                            ],
                        },
                    },
                    {
                        loader: "ts-loader",
                    },
                ],
            },
            {
                test: [/\.scss$|\.css$/],
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                loader: "file-loader",
                options: {
                    name: "assets/[name].[ext]",
                },
            },
        ],
    },
    plugins: [new webpack.DefinePlugin(env), new CleanWebpackPlugin(), ...htmlWebpackPluginsPages],
};

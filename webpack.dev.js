const path = require("path");
const pagesConfig = require("./pages.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const dotenv= require("dotenv");
const fs = require('fs');

let pagesList = {...pagesConfig};
let pages = {};
let devUrlPatterns = [];
let htmlWebpackPluginsPages = [];
let host = "localhost";
let port = 9001;
let baseURL = `http://${host}:${port}/`

Object.keys(pagesList).forEach((key, index) => {
    pages[`${key}`] = pagesList[`${key}`]["chunk"];
    let jsChunks = [`${key}`];
    if(index === 0) {
        let urlRewrite = {from: /^\/$/, to: `/${key}.html`};
        devUrlPatterns.push(urlRewrite);
    }
    let regexString = `^/${key}`;
    let newUrlMatchPattern = new RegExp(regexString);
    let urlRewrites = {from: newUrlMatchPattern, to: `/${key}.html`};
    devUrlPatterns.push(urlRewrites);

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
            filename: `${key}.html`,
            chunks: [...jsChunks],
            base: baseURL,
            minify: {
                minifyJS: false,
                minifyCSS: false,
                removeComments: false,
                collapseWhitespace: false,
                collapseBooleanAttributes: false,
                collapseInlineTagWhitespace: false,
                useShortDoctype: false,
                caseSensitive: true,
                preserveLineBreaks: false
            },
            files: {
                css: [...pagesList[`${key}`]["css"]],
                js: [...pagesList[`${key}`]["js"]],
            },
            ...basicDetails
        })
    )
})

console.log(
    "=======================Pages Details==============================="
);
console.log(JSON.stringify(pages));
console.log(devUrlPatterns);
console.log(
    "-------------------------------------------------------------------"
);

module.exports = (env) => {
    const envBasePath  = path.join(__dirname+"/.env");
    const envFile = envBasePath+"."+env.ENVIRONMENT;
    const envFilePath = fs.existsSync(envFile) ? envFile : envBasePath;
    const envParsed = dotenv.config({path: envFilePath}).parsed;

    const envVariables = Object.keys(envParsed).reduce((state, key) => {
        state[`process.env.${key}`] = JSON.stringify(envParsed[key]);
        return state;
    }, {})
    return {
    mode: "development",
     entry: {
         ...pages
     },
     output: {
         path: path.join(__dirname, "./dist"),
         filename: "scripts/[name].js"
     },
     target: "web",
     // Enable sourcemaps for debugging webpack's output.
     devtool: "eval-source-map",

     resolve: {
         extensions: [".js", ".ts", ".tsx"],
         mainFields: ["browser", "module", "main"],
         alias: {
            app: path.resolve(__dirname, "./src/"),
            asset: path.resolve(__dirname, "./src/asset"),
            components: path.resolve(__dirname, "./src/components/"),
        }
     },

     module: {
         rules: [
             {
                test: /\.ts(x)?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-react"
                            ],
                            plugins: [
                                "@babel/plugin-proposal-class-properties"
                            ]
                        }
                    }, 
                    {
                        loader: "ts-loader"
                    }
                ]
             },
             {
                 test: [/\.scss$|\.css$/],
                 use: ["style-loader", "css-loader", "sass-loader"],
             },
             {
                 test: /\.(png|jpe?g|svg)$/i,
                 use: ["file-loader"]
             }
         ]
     },
     plugins: [ 
        new webpack.DefinePlugin(envVariables), 
        ...htmlWebpackPluginsPages],
     devServer: {
         port: port,
         historyApiFallback: true,
         contentBase: path.join(__dirname, "./dist/"),
        //  publicPath: "/",
         open: "Chrome",
         openPage: [""],
        //  proxy: [
        //      {
        //          context: ["/api"],
        //          target: "http://localhost:6000",
        //          pathRewrite: {"^/api": ""},
        //          secure: false
        //      }
        //  ]
     }
}
}
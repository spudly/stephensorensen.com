import express from "express";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import postcssMiddleware from "postcss-middleware";
import { renderToStaticMarkup } from "react-dom/server";
import prettier from "prettier";
// @ts-ignore
import prettierConfig from "../.prettier.config.js";
import React from "react";
// @ts-ignore
import webpackConfig from "../webpack.config.js";
// @ts-ignore
import postcssConfig from "../postcss.config.js";
import Index from "../src/html/Index";

const serveJs = webpackDevMiddleware(
  webpack({ ...webpackConfig, mode: "development" }),
  {
    publicPath: webpackConfig.output.publicPath
  }
);

const app = express();
app.get("/index.js", (req, resp, next) => {
  serveJs(req, resp, next);
});
app
  .get(
    "/index.css",
    postcssMiddleware({
      plugins: postcssConfig.plugins.slice(0, postcssConfig.plugins.length - 1), // all except last (cssnano)
      src: req => "src/css/index.css"
    })
  )
  .get("/", (req, resp) => {
    resp.setHeader("Content-Type", "text/html");
    resp.end(
      prettier.format(
        `<!doctype html>${renderToStaticMarkup(<Index env="development" />)}`,
        {
          ...prettierConfig,
          filepath: "index.html"
        }
      )
    );
  });

app.listen(8080, () => {
  console.log(`Listening @ http://localhost:8080/`);
});

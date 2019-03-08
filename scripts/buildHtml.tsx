import fs from "fs";
import { promisify } from "util";
import React from "react";
import Index from "../src/html/Index";
import { renderToStaticMarkup } from "react-dom/server";

const writeFile = promisify(fs.writeFile);

const buildHtmlFiles = async () => {
  await writeFile(
    "./build/index.html",
    `<!doctype html>${renderToStaticMarkup(<Index />)}`
  );
};

buildHtmlFiles().catch(error => {
  console.log("FAIL", error);
  process.stderr.write(error.stack);
  process.exitCode = 1;
});

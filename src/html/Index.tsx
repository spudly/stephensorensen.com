import React from "react";
import { renderToString } from "react-dom/server";
import App from "../js/App";

type Props = {
  env?: "production" | "development";
};

const Index = ({ env = "production" }: Props) => {
  const reactExt = process.env.NODE_ENV === "development" ? ".min.js" : ".js";
  return (
    <html lang="en">
      <head>
        <title>stephensorensen.com</title>
        <link rel="stylesheet" href="/index.css" />
      </head>
      <body>
        <div
          id="root"
          dangerouslySetInnerHTML={{ __html: renderToString(<App />) }}
        />
        <script
          src={`https://unpkg.com/react@16.8.4/umd/react.production${reactExt}`}
        />
        <script
          src={`https://unpkg.com/react-dom@16.8.4/umd/react-dom.production${reactExt}`}
        />
        <script src="/index.js" />
      </body>
    </html>
  );
};

export default Index;

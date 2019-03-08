import React from "react";
import { renderToString } from "react-dom/server";
import App from "../js/App";

type Props = {
  env?: "production" | "development";
};

const Index = ({ env = "production" }: Props) => {
  const reactExt = env === "development" ? ".development.js" : ".production.min.js";
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
          src={`https://unpkg.com/react@16.8.4/umd/react${reactExt}`}
        />
        <script
          src={`https://unpkg.com/react-dom@16.8.4/umd/react-dom${reactExt}`}
        />
        <script src="/index.js" />
      </body>
    </html>
  );
};

export default Index;

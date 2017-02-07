import React from 'react';

const Projects = () =>
  <div className="page">
    <h1 className="page-header">&lt;Projects /&gt;</h1>

    <h2>npm packages</h2>
    <dl>
      <dt><a href="https://www.npmjs.com/package/error-subclass">error-subclass</a></dt>
      <dd>A base class for creating custom JavaScript error classes</dd>
      <dt><a href="https://www.npmjs.com/package/@spudly/eslint-config">@spudly/eslint-config</a></dt>
      <dd>Shareable ESLint config with all the best settings.</dd>
      <dt><a href="https://www.npmjs.com/package/talk-like-a-pirate">talk-like-a-pirate</a></dt>
      <dd>Translates text into pirate-speek</dd>
      <dt><a href="https://www.npmjs.com/package/card.css">card.css</a></dt>
      <dd>CSS for a flippable card</dd>
      <dt><a href="https://www.npmjs.com/package/index-card.css">index-card.css</a></dt>
      <dd>CSS for an index card</dd>
      <dt><a href="https://www.npmjs.com/package/react-deck">react-deck</a></dt>
      <dd>Render a stack of cards with React</dd>
      <dt><a href="https://www.npmjs.com/package/error-wrapper">error-wrapper</a></dt>
      <dd>A base class for creating custom JavaScript error classes that wrap around a child error object.</dd>
    </dl>

  </div>;

Projects.displayName = 'Projects';

export default Projects;

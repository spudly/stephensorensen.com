import React from 'react';
import Gravatar from 'react-gravatar';
import flatten from 'lodash/fp/flatten';

const SocialLinks = ({facebook, twitter, googleplus, medium, github, stackoverflow, linkedin, email}) =>
  <ul>
    <li><a rel="me" href={`https://www.facebook.com/${facebook}`}>Facebook</a></li>
    <li><a rel="me" href={`https://twitter.com/${twitter.replace(/^@/, '')}`}>Twitter</a></li>
    <li><a rel="me" href={`https://plus.google.com/${googleplus}`}>Google+</a></li>
    <li><a rel="me" href={`https://medium.com/${medium}`}>Medium</a></li>
    <li><a rel="me" href={`https://github.com/${github}`}>GitHub</a></li>
    <li><a rel="me" href={`http://stackoverflow.com/users/${stackoverflow}`}>StackOverflow</a></li>
    <li><a rel="me" href={`https://www.linkedin.com/in/${linkedin}`}>LinkedIn</a></li>
    <li><a rel="me" className="u-email" href={`mailto:${email}`}>Email: shuoink@gmail.com</a></li>
  </ul>;

const LinkList = ({items}) => (
  <dl>
    {flatten(items.map(item => [
      <dt key={`${item.url}--dt`}><a href={item.url}>{item.name}</a></dt>,
      <dd key={`${item.url}--dd`}>{item.description}</dd>
    ]))}
  </dl>
);

const PageHeader = ({text}) => <div className="page-header">{text}</div>;

const widgets = {
  'react-gravatar': Gravatar,
  'social-links': SocialLinks,
  'link-list': LinkList,
  'page-header': PageHeader,
};

const toReactElement = (descriptor) => {
  if (typeof descriptor === 'string') {
    return descriptor;
  }
  const {widget, props, children} = descriptor;
  const component = widgets[widget] || widget;
  const reactProps = {...props, key: descriptor.id};
  const reactChildren = children && children.length
    ? children.map(toReactElement)
    : null;
  return React.createElement(
    component,
    reactProps,
    reactChildren
  );
};

const Page = ({pageData}) =>
  <div className="page">
    {(pageData.children || []).map(toReactElement)}
  </div>
;

export default Page;

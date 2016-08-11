import React, {PropTypes} from 'react';

const OssProject = ({name, npm = true, scope = ''}) =>
  <div>
    <h2>{name}</h2>

    {npm &&
      <a href={`https://npmjs.org/package/${scope}${name}`}>
        <img alt="NPM" src={`https://nodei.co/npm/${scope}${name}.png`} />
      </a>
    }
    {' '}
    <a href={`https://travis-ci.org/spudly/${name}`}>
      <img alt="Build Status" src={`https://travis-ci.org/spudly/${name}.svg?branch=master`} />
    </a>
    {' '}
    <a href={`https://david-dm.org/spudly/${name}`}>
      <img alt="dependencies" src={`https://david-dm.org/spudly/${name}.svg`} />
    </a>
    {' '}
    <a href={`https://david-dm.org/spudly/${name}#info=devDependencies`}>
      <img alt="devDependencies" src={`https://david-dm.org/spudly/${name}/dev-status.svg`} />
    </a>
  </div>;

OssProject.displayName = 'OssProject';

OssProject.propTypes = {
  name: PropTypes.string.isRequired,
  npm: PropTypes.bool,
  scope: PropTypes.string,
};

export default OssProject;

import path from 'path';

const BUILD = path.join(__dirname, '../../build');

const removeFileNameHash = fileName =>
  fileName
    .replace(BUILD, '')
    .replace(/\/?(.*)(\.\w+)(\.js)/, (match, p1, p2, p3) => p1 + p3);

export default removeFileNameHash;

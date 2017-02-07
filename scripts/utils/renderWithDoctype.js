import {renderToString} from 'react-dom/server';

const renderWithDoctype = el => `<!doctype html>${renderToString(el)}`;

export default renderWithDoctype;
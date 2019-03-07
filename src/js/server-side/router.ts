import {createReadStream} from 'fs';
import {Router as createRouter} from 'express';
import {resolve} from 'path';

const router = createRouter()
  .get('/js', (req, resp) => {
    resp.setHeader('Content-Type', 'application/javascript');
    createReadStream(resolve(__dirname, '../client-side/index.js')).pipe(resp);
  })
  .get('/css', (req, resp) => {
    resp.setHeader('Content-Type', 'text/css');
    createReadStream(resolve(__dirname, '../../css/index.css')).pipe(resp);
  })
  .get('/', (req, resp) => {
    resp.setHeader('Content-Type', 'text/html');
    createReadStream(resolve(__dirname, '../../html/index.html')).pipe(resp);
  });

export default router;

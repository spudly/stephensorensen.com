/* global caches, fetch, Response */
import regeneratorRuntime from 'regenerator-runtime';
const CACHE_KEY = __webpack_hash__;
const OFFLINE_PAGE = {}; // TODO: define this
const OFFLINE_IMAGE = {}; // TODO: define this
const CACHE_URLS = [
  '/',
  '/about',
  '/code',
  '/experiments',
  '/resume',
  `/${CACHE_KEY}/js`,
  `/${CACHE_KEY}/css`,
];

const fetchFromCache = async request => {
  const response = await caches.match(request);
  if (!response) {
    throw Error(`${event.request.url} not found in cache`);
  }
  return response;
};

const offlineResponse = resourceType => {
  if (resourceType === 'image') {
    return new Response(OFFLINE_IMAGE.body, {
      headers: OFFLINE_IMAGE.headers,
    });
  }

  if (resourceType === 'content') {
    return caches.match(OFFLINE_PAGE);
  }

  return undefined;
}

const fetchAndCache = async request => {
  const {pathname} = new URL(request.url);
  const response = await fetch(pathname, {credentials: 'same-origin'});
  if (response.ok) {
    const clone = response.clone();
    const cache = await caches.open(CACHE_KEY);
    cache.put(request, clone);
    return response;
  }
  return response;
};

const respondFromCacheThenNetwork = async request => {
  try {
    return fetchFromCache(request);
  } catch (cacheError) {
    try {
      return fetchAndCache(request);
    } catch (fetchError) {
      return offlineResponse();
    }
  }
};

const respondFromNetworkThenCache = async request => {
  try {
    return fetchAndCache(request);
  } catch (fetchError) {
    try {
      return fetchFromCache(request);
    } catch (cacheError) {
      return offlineResponse();
    }
  }
};

const shouldHandleFetch = request => {
  const {origin, pathname} = new URL(request.url);

  if (pathname.endsWith('/serviceWorker.js')) {
    return false;
  }

  if (request.method !== 'GET') {
    return false;
  }

  if (origin !== self.location.origin) {
    return false;
  }

  return true;
};

const populateCache = async () => {
  const cache = await caches.open(CACHE_KEY);
  return cache.addAll(CACHE_URLS);
};


const handleInstall = event => event.waitUntil(populateCache());

const handleFetch = event => {
  const isImmutableFile = event.request.url.startsWith(`/${CACHE_KEY}/`);
  if (shouldHandleFetch(event.request)) {
    console.log(`handling fetch for ${event.request.url}`);
    event.respondWith(
      isImmutableFile
        ? respondFromCacheThenNetwork(event.request)
        : respondFromNetworkThenCache(event.request)
    )
  }
};

const handleActivate = async event => {
  const cacheKeys = await caches.keys();
  const oldKeys = cacheKeys.filter(key => key !== CACHE_KEY);
  return Promise.all(oldKeys.map(key => caches.delete(key)));
};

self.addEventListener('install', handleInstall);
self.addEventListener('fetch', handleFetch);
self.addEventListener('activate', handleActivate);
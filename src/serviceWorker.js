/* global caches, fetch, Response */
import regeneratorRuntime from 'regenerator-runtime';
const urlsToCache = [];
const CACHE_KEY = __webpack_hash__;
const OFFLINE_PAGE = {}; // TODO: define this
const OFFLINE_IMAGE = {}; // TODO: define this

const openCache = async () => {
  const cache = await caches.open(CACHE_KEY);
  return cache.addAll(urlsToCache);
};

const fetchFromCache = async request => {
  const response = await caches.match(request);
  if (!response) {
    throw Error('${event.request.url} not found in cache');
  }
  return response;
};

const addToCache = async (cacheKey, request, response) => {
  if (response.ok) {
    var copy = response.clone();
    const cache = await caches.open(cacheKey);
    cache.put(request, copy);
    return response;
  }
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
  const response = await fetch(request);
  return addToCache(CACHE_KEY, request, response);
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

const handleInstall = event => event.waitUntil(openCache());

const handleFetch = event => {
  const isImmutableFile = event.request.url.startsWith(`/${CACHE_KEY}/`);
  event.respondWith(
    isImmutableFile
      ? respondFromCacheThenNetwork(event.request)
      : respondFromNetworkThenCache(event.request)
  )
};

const handleActivate = async event => {
  const cacheKeys = await caches.keys();
  const oldKeys = cacheKeys.filter(key => key !== CACHE_KEY);
  return Promise.all(oldKeys.map(key => caches.delete(key)));
};

self.addEventListener('install', handleInstall);
self.addEventListener('fetch', handleFetch);
self.addEventListener('activate', handleActivate);
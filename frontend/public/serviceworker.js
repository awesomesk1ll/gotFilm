const staticAppCacheName = 's-gf-app-rev0001';
const dynamicAppCacheName = 'd-gf-app-rev0001';
const filmsCacheName = 'gf-films-rev0001';
const self = this;

const staticFiles = [
  '/index.html',
  '/icons/favicon.ico',
  './offline.jpg',
  'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap'
];

const FILMS_ORIGINS = ['http://localhost:3000', 'https://gotfilm.tk'];

const getDynamicFiles = async () => {
  const list = await fetch('./asset-manifest.json').then(data => data.json());
  return Object.values(list.files);
}
const getFilesList = async () => {
  const dynamicFiles = await getDynamicFiles();
  const files = [...staticFiles, ...dynamicFiles].filter((value, index, arr) => arr.indexOf(value) === index);
  
  return files
}

// Install SW
self.addEventListener('install', async (event) => {
  console.log('SW: install event fired');
  const filesList = await getFilesList();
  const cache = await caches.open(staticAppCacheName);
  await cache.addAll(filesList)
});

// Listen for requests
self.addEventListener('fetch', (event) => {
  event.respondWith(cacheFirstOrSave(event.request));
});

// Activate the SW
self.addEventListener('activate', async (event) => {
  console.log('SW: activate event fired');
  const whiteCacheNames = [staticAppCacheName, dynamicAppCacheName, filmsCacheName];
  const cacheNames = await caches.keys();

  cacheNames.filter((name) => !whiteCacheNames.includes(name)).map((name) => caches.delete(name))
});

// unused base strategy
async function cacheFirst (request) {
  const cached = await caches.match(request);
  console.log('SW: cf', !!cached, request.method, request.url);
  return cached ?? await fetch(request)
}

// strategy trying to get data from cache then if there is no data -> fetch data and put it to cache
async function cacheFirstOrSave (request) {
  let fetched, origin, cache, error, options;
  const cached = await caches.match(request);

  console.log('SW: cfs', !!cached, request.method, request.url);
  
  origin = new URL(request.url).origin;

  const isFilmsRequest = FILMS_ORIGINS.includes(origin) && (/\/films\/\d*.json/).test(request.url);
  const isPictureRequest = origin === 'https://st.kp.yandex.net';
  options = isPictureRequest ? {redirect: 'follow', mode: 'no-cors'} : {};

  if (!cached) {
    if (!origin.includes('chrome-extension')) {
      cache = await caches.open(isFilmsRequest ? filmsCacheName : dynamicAppCacheName);
      try {
        fetched = await fetch(request.url, options);
      } catch (err) {
        console.log('fetch error (offline?):', err);
      }
      if (isPictureRequest && !fetched) {
        
        return await fetch('./offline.jpg')
      }
      
      // we cannot put original request to cache as it changes request's "bodyUsed" to true
      fetched && cache.put(request.url, fetched.clone());
    }
  }
  // console.log(!!cached && 'cached' || !!fetched && 'fetched now' || 'new download / cannot be cached');
  return cached ?? fetched ?? await fetch(request.url, options)
}
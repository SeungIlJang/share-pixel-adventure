/* 모두의 픽셀모험 — OTA 지원 서비스워커
   문서(index.html)는 "네트워크 우선"으로 받아 항상 최신 버전을 적용하고,
   오프라인일 때만 캐시로 폴백한다. 아이콘 등 정적 자산은 캐시 우선 +
   백그라운드 갱신(stale-while-revalidate)으로 빠르게 뜨면서 다음 실행 때 최신화된다.
   → 웹(docs)만 갱신하면 설치된 앱이 재빌드 없이 자동 업데이트된다. */
const CACHE = 'pixel-adventure';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon.svg',
  './icon-maskable.svg'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).catch(() => {}));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function isDocument(req) {
  return req.mode === 'navigate'
      || req.destination === 'document'
      || req.url.endsWith('/')
      || req.url.endsWith('/index.html');
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  if (isDocument(req)) {
    // 네트워크 우선(캐시 무시하고 최신 요청) → 성공 시 캐시 갱신, 실패(오프라인) 시 캐시 폴백
    e.respondWith(
      fetch(req, { cache: 'reload' })
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match(req).then((c) => c || caches.match('./index.html')))
    );
    return;
  }

  // 정적 자산: 캐시 우선으로 즉시 응답 + 백그라운드로 최신화
  e.respondWith(
    caches.match(req).then((cached) => {
      const net = fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() => cached);
      return cached || net;
    })
  );
});

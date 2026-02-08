// اسم النسخة لتحديث الذاكرة لاحقاً
const cacheName = 'hanani-store-v1';

// الملفات التي سيتم حفظها لتعمل بدون إنترنت
const assets = [
  './',
  './index.html',
  'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap'
];

// تثبيت ملف الخدمة وحفظ الملفات في الذاكرة التخزينية
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// جلب البيانات من الذاكرة إذا كان الإنترنت مقطوعاً
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
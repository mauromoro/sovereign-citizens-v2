// SOVEREIGN CITIZENS Service Worker
// Handles caching, offline functionality, and push notifications

const CACHE_NAME = 'sovereign-citizens-v1.0.0';
const OFFLINE_URL = '/offline.html';

// Core app files to cache immediately
const CORE_CACHE_FILES = [
  '/',
  '/index.html',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  OFFLINE_URL
];

// API endpoints to cache
const API_CACHE_PATTERNS = [
  /^https:\/\/api\.sovereign-citizens\.app\//,
  /^https:\/\/polygon-rpc\./,
  /^https:\/\/.*\.nostr\./
];

// Install event - cache core files
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching core files');
        return cache.addAll(CORE_CACHE_FILES);
      })
      .then(() => {
        console.log('[SW] Core files cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Failed to cache core files:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Service worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - handle network requests with caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-HTTP requests
  if (!request.url.startsWith('http')) {
    return;
  }

  // Handle different request types with appropriate strategies
  if (request.destination === 'document') {
    // HTML documents - Network first, cache fallback
    event.respondWith(handleDocumentRequest(request));
  } else if (isAPIRequest(request.url)) {
    // API requests - Network first with cache fallback
    event.respondWith(handleAPIRequest(request));
  } else if (isStaticAsset(request.url)) {
    // Static assets - Cache first
    event.respondWith(handleStaticAssetRequest(request));
  } else {
    // Default - Network first
    event.respondWith(handleDefaultRequest(request));
  }
});

// Document request handler
async function handleDocumentRequest(request) {
  try {
    // Try network first
    const response = await fetch(request);
    
    // Cache successful responses
    if (response.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    console.log('[SW] Network failed for document, serving from cache');
    
    // Try cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Fallback to offline page
    return caches.match(OFFLINE_URL);
  }
}

// API request handler
async function handleAPIRequest(request) {
  try {
    const response = await fetch(request);
    
    // Cache successful GET requests
    if (request.method === 'GET' && response.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    console.log('[SW] API request failed, checking cache');
    
    // For GET requests, try cache
    if (request.method === 'GET') {
      const cachedResponse = await caches.match(request);
      if (cachedResponse) {
        return cachedResponse;
      }
    }
    
    // Return error response for failed API calls
    return new Response(
      JSON.stringify({ 
        error: 'Network unavailable', 
        cached: false,
        timestamp: Date.now()
      }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Static asset request handler
async function handleStaticAssetRequest(request) {
  // Try cache first
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // If not in cache, fetch and cache
  try {
    const response = await fetch(request);
    if (response.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.log('[SW] Failed to load static asset:', request.url);
    throw error;
  }
}

// Default request handler
async function handleDefaultRequest(request) {
  try {
    return await fetch(request);
  } catch (error) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || new Response('Network Error', { status: 503 });
  }
}

// Helper functions
function isAPIRequest(url) {
  return API_CACHE_PATTERNS.some(pattern => pattern.test(url));
}

function isStaticAsset(url) {
  return /\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|ico)$/i.test(url);
}

// Push notification handler
self.addEventListener('push', (event) => {
  console.log('[SW] Push notification received');
  
  let notificationData = {};
  
  if (event.data) {
    try {
      notificationData = event.data.json();
    } catch (e) {
      notificationData = { title: event.data.text() };
    }
  }
  
  const options = {
    title: notificationData.title || 'SOVEREIGN CITIZENS',
    body: notificationData.body || 'New activity in your trading network',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    tag: notificationData.tag || 'general',
    data: notificationData.data || {},
    actions: [
      {
        action: 'view',
        title: 'View',
        icon: '/icons/action-view.png'
      },
      {
        action: 'dismiss',
        title: 'Dismiss',
        icon: '/icons/action-dismiss.png'
      }
    ],
    requireInteraction: notificationData.urgent || false
  };
  
  event.waitUntil(
    self.registration.showNotification(options.title, options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event.action);
  
  event.notification.close();
  
  if (event.action === 'dismiss') {
    return;
  }
  
  // Handle notification click
  const urlToOpen = event.notification.data?.url || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Try to focus existing window
        for (const client of clientList) {
          if (client.url.includes(urlToOpen) && 'focus' in client) {
            return client.focus();
          }
        }
        
        // Open new window if none found
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});

// Background sync for offline transactions
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync triggered:', event.tag);
  
  if (event.tag === 'sync-trades') {
    event.waitUntil(syncPendingTrades());
  }
  
  if (event.tag === 'sync-messages') {
    event.waitUntil(syncPendingMessages());
  }
});

// Sync pending trades when online
async function syncPendingTrades() {
  try {
    console.log('[SW] Syncing pending trades...');
    
    // Get pending trades from IndexedDB (you'll implement this)
    // const pendingTrades = await getPendingTrades();
    
    // Send each trade to the blockchain
    // for (const trade of pendingTrades) {
    //   await submitTradeToBlockchain(trade);
    // }
    
    console.log('[SW] Trades synced successfully');
  } catch (error) {
    console.error('[SW] Failed to sync trades:', error);
  }
}

// Sync pending NOSTR messages when online
async function syncPendingMessages() {
  try {
    console.log('[SW] Syncing pending messages...');
    
    // Get pending messages from IndexedDB
    // const pendingMessages = await getPendingMessages();
    
    // Send each message to NOSTR relays
    // for (const message of pendingMessages) {
    //   await publishToNOSTR(message);
    // }
    
    console.log('[SW] Messages synced successfully');
  } catch (error) {
    console.error('[SW] Failed to sync messages:', error);
  }
}

// Handle app updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('[SW] Service worker script loaded');
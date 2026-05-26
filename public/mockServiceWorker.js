/* MSW Mock Service Worker */
/* This file is auto-generated. Do not edit manually. */

importScripts(
  'https://unpkg.com/msw@2.0.11/browser.js',
)

const SW_VERSION = 'v1'
const HANDLERS = []

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', () => {
  self.clients.claim()
})

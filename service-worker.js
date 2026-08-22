/* Service worker for Thai Memory Game (PWA support).
   Strategy: cache-first for the app shell.

   How updates work:
   - When you deploy a new version of index.html, bump CACHE_VERSION below.
   - The browser installs the new service worker in the background. It then
     WAITS (it does not auto-activate), so the page can show a "new version
     available" toast.
   - When the user taps Reload, the page sends a SKIP_WAITING message; the new
     worker activates, clears old caches, and the page reloads once into the
     new version. (If the user ignores the toast, the update applies naturally
     on a later visit when no old version is controlling any tab.)
   - No "reinstall" needed; same icon, same saved data (localStorage is never
     touched by cache changes), new content.
*/

const CACHE_VERSION = 'thai-memory-v1.4.4';
const CACHE_NAME = CACHE_VERSION;

/* Recorded pronunciations (./audio/voice/*.mp3) live in their OWN cache, whose
   name deliberately does NOT contain CACHE_VERSION.

   Why: the app-shell cache above is wiped on every version bump, which is
   exactly right for HTML/JS/CSS — stale code must go. But a recording of a Thai
   word never changes, and students accumulate them gradually (each file is
   cached the first time that word is played). If they lived in the versioned
   cache, every single app update would throw away every recording a student had
   built up and make them re-download the lot over mobile data.

   Kept out of the activate cleanup below, this cache simply survives updates.
   Recordings are also NOT pre-cached at install: there can eventually be
   hundreds of them, and forcing every student to download every word before the
   app will even open would be a terrible trade for files most of them will
   never play. They arrive on demand instead, and until one has arrived the app
   falls back to speech synthesis on its own. */
const VOICE_CACHE_NAME = 'thai-voice-v1';
const VOICE_PATH_RE = /\/audio\/voice\//i;

/* Lesson review pages (thai-course.com/review/... and /reviews/...) are separate
   websites that happen to share this origin, opened in a new tab from the
   Grammar menu. They are not part of the app and must not be handled here:
   caching them would slowly fill the app's cache with pages and images the app
   never uses, and — worse — the offline fallback at the bottom of this file
   would answer an uncached review page with the app's own index.html, so a
   student offline would see the app boot inside the review tab instead of a
   normal browser error. Left alone, the browser handles them normally. */
const REVIEW_PATH_RE = /^\/reviews?\//i;

// Files to pre-cache during install. Images and sounds live in
// separate ./images/ and ./audio/ files (previously embedded as base64 inside
// index.html). We pre-cache them all so the game works fully offline once
// installed. The browser will still cache any other requests opportunistically.
const PRECACHE_URLS = [
  './',
  './index.html',
  './vocab-data.js',
  './grammar-data.js',
  './sentences.js',
  './sentence-builder.js',
  './pitchy.js',
  './tone-trainer.js',
  './tone-challenge.js',
  './tongue-twister.js',
  './word-cards.js',
  './romanizer-dict.js',
  './romanizer-dict2.js',
  './romanizer-meanings.js',
  './romanizer-meanings2.js',
  './romanizer-freq.js',
  './romanizer-autobreak.js',
  './romanizer.js',
  './manifest.json',
  './icon_48.png',
  './icon_180.png',
  './icon_192.png',
  './icon_512.png',
  // Card backgrounds
  './images/card_background_1.jpg',
  './images/card_background_2.jpg',
  './images/card_background_3.jpg',
  './images/card_background_4.jpg',
  './images/card_background_5.jpg',
  './images/card_background_6.jpg',
  './images/card_background_7.jpg',
  // Character artwork
  './images/artwork_1_grandma.jpg',
  './images/artwork_2_tuktuk.jpg',
  './images/artwork_3_fighter.jpg',
  './images/artwork_4_student.jpg',
  './images/artwork_5_lawyer.jpg',
  './images/artwork_6_teacher.jpg',
  // Character end-game outcome artwork (won / lost poses)
  './images/artwork_1_grandma_won.jpg',
  './images/artwork_1_grandma_lost.jpg',
  './images/artwork_2_tuktuk_won.jpg',
  './images/artwork_2_tuktuk_lost.jpg',
  './images/artwork_3_fighter_won.jpg',
  './images/artwork_3_fighter_lost.jpg',
  './images/artwork_4_student_won.jpg',
  './images/artwork_4_student_lost.jpg',
  './images/artwork_5_lawyer_won.jpg',
  './images/artwork_5_lawyer_lost.jpg',
  './images/artwork_6_teacher_won.jpg',
  './images/artwork_6_teacher_lost.jpg',
  // Character avatars
  './images/avatar_1_grandma.jpg',
  './images/avatar_2_tuktuk.jpg',
  './images/avatar_3_fighter.jpg',
  './images/avatar_4_student.jpg',
  './images/avatar_5_lawyer.jpg',
  './images/avatar_6_teacher.jpg',
  // Achievement trophies (transparent PNGs)
  './images/Ach1.png',
  './images/Ach2.png',
  './images/Ach3.png',
  './images/Ach4.png',
  './images/Ach5.png',
  './images/Ach6.png',
  './images/Ach7.png',
  // Tone Challenge rating illustrations (1 = lowest … 5 = excellent)
  './images/rate1.png',
  './images/rate2.png',
  './images/rate3.png',
  './images/rate4.png',
  './images/rate5.png',
  // vs-CPU badge trophies (transparent PNGs)
  './images/trophy_bronze.png',
  './images/trophy_silver.png',
  './images/trophy_gold.png',
  // Sound effects
  './audio/game_memory_match.mp3',
  './audio/game_memory_wrong.mp3',
  './audio/card-flip.mp3',
  './audio/result_win_big.mp3',
  './audio/result_win_regular.mp3',
  './audio/result_lose.mp3',
  './audio/result_draw.mp3',
  './audio/game_start.mp3',
  './audio/game_cpu_click.mp3',
  // Trimmed menu click (mono, silence removed). The untrimmed original is kept
  // and still pre-cached below purely so that reverting the one line in
  // index.html that names this file is a complete, offline-safe rollback.
  './audio/menu-click-v2.mp3',
  './audio/menu-click.mp3',
  './audio/game_cpu_chat.mp3',
  // vs-Computer end-modal spoken result lines
  './audio/say-won.mp3',
  './audio/say-lost.mp3',
  './audio/say-draw.mp3',
  './audio/game_bingo_correct.mp3',
  './audio/game_bingo_incorrect.mp3',
  './audio/game_sentence_put.mp3',
  './audio/game_sentence_remove.mp3',
  './audio/game_sentence_fail.mp3',
  // Word Cards SFX — declared in WC_SOUNDS in word-cards.js, not in index.html.
  './audio/uno-shuffle.mp3',
  './audio/uno-deal.mp3',
  './audio/uno-red.mp3',
  './audio/uno-blue.mp3',
  './audio/uno-green.mp3',
  './audio/uno-yellow.mp3',
  './audio/uno-reverse-say.mp3',
  './audio/uno-skip-say.mp3',
  './audio/uno-wrong.mp3',
  './audio/uno-1left.mp3',
  './audio/uno-draw2.mp3',
  './audio/uno-draw4.mp3',
  './audio/uno-reverse.mp3',
  './audio/uno-skip.mp3',
  './audio/uno-turn.mp3',
  './audio/uno-change.mp3',
  // Lesson-content unlock chime
  './audio/unlock.mp3',
  /* Tongue Twister native recordings — named in TT_TWISTERS in
     tongue-twister.js, not in index.html. Unlike ./audio/voice/*.mp3 these
     ARE pre-cached: there are only a handful, every learner who opens the
     mode needs them, and the mode is far less useful without a model to
     copy. (The install step adds each file individually and swallows
     failures, so a recording that has not been uploaded yet logs a warning
     rather than breaking the install.) */
  './audio/twisters/moo-meuk-goong.mp3',
  './audio/twisters/krai-kaai-kai-gai.mp3',
  './audio/twisters/yak-yai-lai-yak-lek.mp3',
  './audio/twisters/kao-gin.mp3',
  './audio/twisters/chaam-kieow.mp3',
  './audio/twisters/mai-mai.mp3'
];

// Install: pre-cache the app shell.
// NOTE: we intentionally do NOT call skipWaiting() here. Letting the new worker
// wait is what allows the page to detect the update and show the reload toast.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Individual adds with catch so a missing icon doesn't break install.
      return Promise.all(
        PRECACHE_URLS.map((url) =>
          cache.add(url).catch((err) => {
            console.warn('SW: failed to cache', url, err);
          })
        )
      );
    })
  );
});

// Allow the page to trigger activation of a waiting worker (the "Reload" button).
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Activate: clean up old caches from previous versions, then take control.
// The voice cache is preserved: it is not versioned, and the recordings in it
// are still valid no matter which version of the app is running.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME && key !== VOICE_CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: cache-first for same-origin GET requests.
// Cross-origin (e.g. Google Fonts) bypasses the cache and goes to network.
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  // Only handle same-origin requests with our cache.
  if (url.origin !== self.location.origin) return;

  // Lesson review pages are not part of the app — hands off entirely.
  if (REVIEW_PATH_RE.test(url.pathname)) return;

  // Recorded pronunciations: cache-first out of the long-lived voice cache.
  //
  // Two deliberate differences from the app-shell strategy below. There is no
  // background re-fetch on a hit, because a recording of a word never changes,
  // so re-downloading it would spend a student's data to replace a file with
  // itself. And there is no index.html fallback on failure: handing an HTML
  // document to an <audio> element produces a confusing decode error, whereas a
  // clean failure is exactly what the app's own fallback is waiting for — it
  // then speaks the word with TTS instead, which is the whole point of the
  // recordings being optional.
  if (VOICE_PATH_RE.test(url.pathname)) {
    event.respondWith(
      caches.match(req, { cacheName: VOICE_CACHE_NAME }).then((cached) => {
        if (cached) return cached;
        return fetch(req).then((res) => {
          if (res && res.ok) {
            const clone = res.clone();
            caches.open(VOICE_CACHE_NAME).then((cache) => cache.put(req, clone));
          }
          return res;
        }).catch(() => new Response('', { status: 504, statusText: 'Recording unavailable offline' }));
      })
    );
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) {
        // Cache hit — return cached, but also fetch in background to refresh
        // the cache for next time (stale-while-revalidate pattern).
        fetch(req).then((res) => {
          if (res && res.ok) {
            caches.open(CACHE_NAME).then((cache) => cache.put(req, res));
          }
        }).catch(() => { /* offline — ignore */ });
        return cached;
      }
      // Cache miss — fetch from network and cache the result.
      return fetch(req).then((res) => {
        if (res && res.ok) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
        }
        return res;
      }).catch(() => {
        // Network failed and not in cache — return whatever we have for the
        // root URL as a fallback so the app at least loads its shell.
        return caches.match('./index.html');
      });
    })
  );
});

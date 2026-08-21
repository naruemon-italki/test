/* =========================================================================
   sentence-builder.js  —  Sentence Builder game engine (Thai Beginner Course)
   -------------------------------------------------------------------------
   ENGINE + UI + CHECK LOGIC for the Sentence Builder mode. Rarely edited.

   Loaded AFTER the main inline script (so it can see shared globals: state,
   showView, navigate, tts, playSound, haptic, shuffle, escapeHtml, saveStorage,
   checkAchievements, the win-modal helpers, plus the special-pack helpers
   isPackLesson / isPackUnlocked / lessonLabel / packName) and AFTER sentences.js
   (so the global `sentences` array exists). Plain script, no modules — everything
   shares one global scope, exactly like vocab-data.js / grammar-data.js.

   This file is self-contained behind state.gameMode === 'sentence' and its own
   two views (#view-sentence menu, #view-sentence-game board). It reuses existing
   systems rather than duplicating them:
     - Thai TTS via the global `tts` object (+ the same availability gate)
     - the shared win-modal shell (#win-modal) for the end screen
     - the menu CSS classes (cat-chip / toggle-opt / level-grid / start-btn ...)
       so the menu looks identical to Audio Bingo without sharing its vocab-pool
       logic.

   ROUND 1 SCOPE: the full menu (Sentence Pool lesson chips, Lives, Spoken
   Answer, Sentences-per-session, Start) is implemented and wired. The actual
   gameplay (startSentenceGame / teardownSentence) is stubbed and will be built
   in Round 2.
   ========================================================================= */

(function () {
  'use strict';

  /* ----------------------------------------------------------------------
     DATA ACCESS HELPERS (read-only over the global `sentences` array)
     ---------------------------------------------------------------------- */

  // Safe accessor — never throw if sentences.js failed to load for any reason.
  function allSentences() {
    return (typeof sentences !== 'undefined' && Array.isArray(sentences)) ? sentences : [];
  }

  // Highest lesson the current edition includes. In the slim edition the inline
  // script exposes window.EDITION_MAX_LESSON = 10; in the full edition it is
  // Infinity (or undefined on very old builds → treat as no cap). Sentence
  // Builder mirrors the same rule the rest of the app applies to vocabulary, so
  // a slim build only ever offers Lessons 1–10 here too.
  function editionMaxLesson() {
    var v = (typeof window !== 'undefined') ? window.EDITION_MAX_LESSON : undefined;
    return (typeof v === 'number' && isFinite(v)) ? v : Infinity;
  }

  /* ---- Special packs (standalone mini-lessons, `less: 101` and up) ----------
     The main inline script declares SPECIAL_PACK_MIN / isPackLesson /
     isPackUnlocked / lessonLabel as top-level `const`/`function` in a CLASSIC
     script. Those create SCRIPT-SCOPE bindings, which are visible to this file
     as bare identifiers but are NOT properties of `window` — so they must be
     probed with `typeof x === 'function'`, never as `window.x` (which would be
     undefined and silently hide every pack). Contrast window.EDITION_MAX_LESSON
     above, which works only because it is explicitly ASSIGNED to window.

     Each helper degrades safely if the main script ever stops exporting it. */
  function sbIsPackLesson(n) {
    if (typeof isPackLesson === 'function') return isPackLesson(n);
    return typeof n === 'number' && isFinite(n) && n >= 100;
  }
  function sbIsPackUnlocked(n) {
    if (typeof isPackUnlocked === 'function') return isPackUnlocked(n);
    return false;   // fail CLOSED: never reveal pack content we can't verify
  }
  // "Lesson 3" for a course lesson, "Favorites" for a special pack.
  function sbLessonLabel(n) {
    if (sbIsPackLesson(n) && typeof lessonLabel === 'function') return lessonLabel(n);
    if (sbIsPackLesson(n) && typeof packName === 'function') return packName(n);
    return 'Lesson ' + n;
  }

  // True if a lesson number is allowed right now.
  //   • Special pack (>= 100): gated by its OWN unlock code, never by the course
  //     ceiling. Checked FIRST — a pack id is always numerically above the
  //     ceiling, so the `<=` compare below would hide it permanently.
  //   • Course lesson: capped by the edition / unlocked ceiling as before.
  function lessonAllowedByEdition(lessonNum) {
    if (sbIsPackLesson(lessonNum)) return sbIsPackUnlocked(lessonNum);
    return lessonNum <= editionMaxLesson();
  }

  // Sorted list of distinct lesson keys that actually exist in the data AND are
  // currently unlocked. Because special packs use ids >= 100, the plain numeric
  // sort places them AFTER every course lesson automatically — no matter how
  // high the student's ceiling rises.
  function getAllSbLessons() {
    const set = new Set();
    allSentences().forEach(s => {
      if (typeof s.less === 'number' && lessonAllowedByEdition(s.less)) set.add(s.less);
    });
    return [...set].sort((a, b) => a - b);
  }

  // How many sentences each lesson contributes: { lessonNumber: count }.
  // Filtered to match getAllSbLessons() (edition cap + pack unlocks).
  function sbLessonCounts() {
    const counts = {};
    allSentences().forEach(s => {
      if (typeof s.less === 'number' && lessonAllowedByEdition(s.less)) {
        counts[s.less] = (counts[s.less] || 0) + 1;
      }
    });
    return counts;
  }

  // The currently-selected lessons, validated against lessons that exist.
  // Falls back to "all lessons" if the stored selection is null/empty/stale.
  function getSelectedLessons() {
    const available = getAllSbLessons();
    const stored = Array.isArray(state.sbLessons) ? state.sbLessons : null;
    if (!stored) return available.slice();
    const valid = stored.filter(n => available.includes(n));
    return valid.length ? valid : available.slice();
  }

  // The pool of sentences matching the current lesson selection.
  function sbPool() {
    const sel = new Set(getSelectedLessons());
    return allSentences().filter(s => sel.has(s.less));
  }

  function sbPoolSize() {
    return sbPool().length;
  }

  // The session-length options. The "count" is how many sentences a session
  // plays; a session is capped at the pool size if the pool is smaller.
  var SB_TARGETS = [10, 15, 20];

  /* ----------------------------------------------------------------------
     MENU RENDERING
     ---------------------------------------------------------------------- */

  // Lesson chips for the Sentence Pool selector. Mirrors the look of the vocab
  // lesson chips (same .cat-chip markup) but is driven entirely by `sentences`.
  // Special packs (less >= 100) render their name ("Favorites") instead of
  // "Lesson 101", and sort after every course lesson.
  function renderSbLessonChips() {
    var root = document.getElementById('sb-lesson-chips');
    if (!root) return;
    root.innerHTML = '';
    var counts = sbLessonCounts();
    var selected = new Set(getSelectedLessons());
    getAllSbLessons().forEach(function (lessonNum) {
      var chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'cat-chip' + (selected.has(lessonNum) ? ' selected' : '');
      chip.dataset.sbLesson = String(lessonNum);
      chip.innerHTML =
        '<span class="cat-check">' + (selected.has(lessonNum) ? '\u2713' : '') + '</span>' +
        '<span class="cat-name">' + escapeHtml(sbLessonLabel(lessonNum)) + '</span>' +
        '<span class="cat-count">' + (counts[lessonNum] || 0) + '</span>';
      chip.addEventListener('click', function () { toggleSbLesson(lessonNum); });
      root.appendChild(chip);
    });
  }

  function toggleSbLesson(lessonNum) {
    var current = getSelectedLessons();
    var idx = current.indexOf(lessonNum);
    if (idx >= 0) {
      // Don't allow deselecting the last remaining lesson — keep at least one.
      if (current.length <= 1) return;
      current.splice(idx, 1);
    } else {
      current.push(lessonNum);
    }
    current.sort(function (a, b) { return a - b; });
    state.sbLessons = current;
    saveStorage();
    renderSbLessonChips();
    updateSbPoolCounter();
    renderSbTargetGrid();
    refreshSbStartButton();
  }

  function updateSbPoolCounter() {
    var el = document.getElementById('sb-pool-count');
    if (!el) return;
    var size = sbPoolSize();
    el.textContent = size;
    var counter = el.closest('.pool-counter');
    if (counter) {
      // Mark invalid if the pool can't even fill the smallest session length.
      var minTarget = Math.min.apply(null, SB_TARGETS);
      counter.classList.toggle('invalid', size < minTarget);
    }
  }

  function renderSbLivesToggle() {
    var root = document.getElementById('sb-lives-toggle');
    if (!root) return;
    root.querySelectorAll('[data-sb-lives]').forEach(function (btn) {
      btn.classList.toggle('active', Number(btn.dataset.sbLives) === state.sbLives);
    });
  }

  function renderSbAutoTtsToggle() {
    var root = document.getElementById('sb-autotts-toggle');
    if (!root) return;
    root.querySelectorAll('[data-sb-autotts]').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.sbAutotts === state.sbAutoTts);
    });
  }

  function renderSbEngHintToggle() {
    var root = document.getElementById('sb-enghint-toggle');
    if (!root) return;
    root.querySelectorAll('[data-sb-enghint]').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.sbEnghint === state.sbEngHint);
    });
  }

  // The 10 / 15 / 20 selector, styled like the level-grid in other menus.
  // An option that exceeds the current pool size is shown disabled with a note,
  // and the session will be capped to the pool if a smaller option is chosen.
  function renderSbTargetGrid() {
    var root = document.getElementById('sb-target-grid');
    if (!root) return;
    root.innerHTML = '';
    var poolSize = sbPoolSize();
    SB_TARGETS.forEach(function (n) {
      var btn = document.createElement('button');
      btn.className = 'level-btn';
      if (state.sbTarget === n) btn.classList.add('selected');
      var tooBig = poolSize < n;
      if (tooBig) btn.classList.add('disabled');
      btn.innerHTML =
        '<div class="level-name">' + n + '</div>' +
        '<div class="level-meta">' +
          '<div class="level-grid-info">sentences</div>' +
          (tooBig
            ? '<div class="level-warning">pool has only ' + poolSize + '</div>'
            : '') +
        '</div>';
      btn.addEventListener('click', function () {
        if (tooBig) return;
        state.sbTarget = n;
        saveStorage();
        renderSbTargetGrid();
        refreshSbStartButton();
      });
      root.appendChild(btn);
    });
  }

  function refreshSbStartButton() {
    var btn = document.getElementById('sb-start');
    var msg = document.getElementById('sb-start-msg');
    if (!btn || !msg) return;

    var poolSize = sbPoolSize();
    var target = state.sbTarget;
    var enabled = true;
    var message = '';

    // Need a valid target selection whose requirement the pool can meet.
    if (SB_TARGETS.indexOf(target) === -1) {
      enabled = false;
      message = 'Choose how many sentences to play.';
    } else if (poolSize < Math.min.apply(null, SB_TARGETS)) {
      enabled = false;
      message = 'Not enough sentences in pool. Add more lessons.';
    } else if (poolSize < target) {
      // The chosen length is bigger than the pool — nudge them to pick a smaller
      // length or add lessons. (We don't silently shrink without telling them.)
      enabled = false;
      message = 'Pool has only ' + poolSize + ' sentences. Pick a smaller length or add lessons.';
    }

    btn.disabled = !enabled;
    msg.textContent = message;
  }

  // Public entry point called by navigate('sentence').
  function renderSentenceMenu() {
    renderSbLessonChips();
    updateSbPoolCounter();
    renderSbEngHintToggle();
    renderSbLivesToggle();
    renderSbAutoTtsToggle();
    renderSbTargetGrid();
    refreshSbStartButton();
  }

  /* ----------------------------------------------------------------------
     MENU EVENT WIRING (toggles + start button)
     These are bound once at load. The chips/target buttons bind their own
     handlers on each render (above), since they're rebuilt dynamically.
     ---------------------------------------------------------------------- */

  function wireSbMenu() {
    // Lives toggle
    var lives = document.getElementById('sb-lives-toggle');
    if (lives) {
      lives.querySelectorAll('[data-sb-lives]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var n = Number(btn.dataset.sbLives);
          if (n === 1 || n === 2 || n === 3) {
            state.sbLives = n;
            saveStorage();
            renderSbLivesToggle();
          }
        });
      });
    }

    // Spoken Answer (auto-TTS) toggle
    var auto = document.getElementById('sb-autotts-toggle');
    if (auto) {
      auto.querySelectorAll('[data-sb-autotts]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var v = btn.dataset.sbAutotts;
          if (v === 'on' || v === 'off') {
            state.sbAutoTts = v;
            saveStorage();
            renderSbAutoTtsToggle();
          }
        });
      });
    }

    // English Hint toggle
    var eng = document.getElementById('sb-enghint-toggle');
    if (eng) {
      eng.querySelectorAll('[data-sb-enghint]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var v = btn.dataset.sbEnghint;
          if (v === 'on' || v === 'off') {
            state.sbEngHint = v;
            saveStorage();
            renderSbEngHintToggle();
          }
        });
      });
    }

    // Start button
    var start = document.getElementById('sb-start');
    if (start) {
      start.addEventListener('click', function () {
        if (start.disabled) return;
        startSentenceGame();
      });
    }

    // Tap-to-hear on the Thai subtitle line of the Sentence Builder menu,
    // matching the other static menus.
    if (typeof wireThaiTapToSpeak === 'function') {
      var view = document.getElementById('view-sentence');
      if (view) wireThaiTapToSpeak(view, '.screen-rom .th');
    }
  }

  /* ----------------------------------------------------------------------
     GAMEPLAY
     ----------------------------------------------------------------------
     Session shape (state.sentenceSession):
       {
         queue:       [sentence, ...]   // the sentences to play this session, in order
         index:       Number            // which sentence we're on (0-based)
         target:      Number            // total sentences in the session
         done:        Number            // sentences completed correctly (HUD counter)
         lives:       Number            // remaining lives
         livesMax:    Number
         over:        Boolean           // true once the end modal is shown
         // per-sentence runtime (rebuilt each round):
         current:     sentence          // the active record
         tokens:      [{th,rom,uid}]    // word tokens in ORIGINAL order (for listen)
         pool:        [uid, ...]        // uids still available to place (in shuffled order)
         slots:       [uid|null, ...]   // one cell per word; uid placed there, or null
         locked:      Boolean           // true while a check animation is running
       }

     Answer checking is STRING-BASED on the displayed Thai word sequence, so
     duplicate words are interchangeable automatically (any "kong" satisfies any
     "kong" position). We compare the placed th-strings against the canonical
     th[] order OR any ordering in answers[].
     ---------------------------------------------------------------------- */

  var _sbUid = 0;          // monotonic id for word tokens (unique even for dupes)
  var _sbClearTimer = null; // pending advance/reset timeout
  var _sbSpeakSafetyTimer = null; // safety cap while waiting for TTS to finish
  var _sbSpeakDelayTimer = null;  // gap before TTS starts (so SFX is heard first)
  var SB_SPEAK_DELAY = 400;       // ms to wait after the SFX before speaking

  // Clean up any running session. Safe to call anytime (idempotent).
  function teardownSentence() {
    if (_sbClearTimer) { clearTimeout(_sbClearTimer); _sbClearTimer = null; }
    if (_sbSpeakSafetyTimer) { clearTimeout(_sbSpeakSafetyTimer); _sbSpeakSafetyTimer = null; }
    if (_sbSpeakDelayTimer) { clearTimeout(_sbSpeakDelayTimer); _sbSpeakDelayTimer = null; }
    if (tts && tts.supported) {
      try { window.speechSynthesis.cancel(); } catch (e) {}
    }
    state.sentenceSession = null;
  }

  function startSentenceGame() {
    var pool = sbPool();
    if (pool.length < Math.min.apply(null, SB_TARGETS)) return;
    var target = Math.min(state.sbTarget, pool.length);

    teardownSentence();
    state.gameMode = 'sentence';

    // Choose `target` distinct sentences for the session, in random order.
    var queue = shuffle(pool).slice(0, target);

    state.sentenceSession = {
      queue: queue,
      index: 0,
      target: target,
      done: 0,
      lives: state.sbLives,
      livesMax: state.sbLives,
      over: false,
      current: null,
      tokens: [],
      pool: [],
      slots: [],
      locked: false,
      // When English Hint is OFF, the player can tap "Show English sentence" to
      // reveal the meaning for the CURRENT sentence only. Reset every round so a
      // reveal never spoils the next one. Ignored entirely when the hint is ON.
      revealEn: false
    };

    if (typeof playSound === 'function') playSound('snd-start');
    if (typeof haptic === 'function') haptic(25);

    // Enter the game view via the inline-script helper (keeps currentView writes
    // and the back-button history guard in one place).
    if (typeof enterSentenceGameView === 'function') {
      enterSentenceGameView();
    } else {
      showView('sentence-game');
    }

    updateSentenceHud();
    loadSentenceRound();
  }

  // True if a sentence game is the active, non-finished game on screen.
  function isSentenceActive() {
    var s = state.sentenceSession;
    var gv = document.getElementById('view-sentence-game');
    return !!s && !s.over && currentViewIsSentenceGame() && gv && !gv.classList.contains('hidden');
  }

  // We can't read the inline script's `currentView` directly here without
  // relying on cross-script binding; the engine only enters the game via
  // enterSentenceGameView(), and teardownSentence() runs on every exit. As a
  // robust proxy, treat the game as active while the session exists and the
  // game view is visible. (Kept as a helper for readability.)
  function currentViewIsSentenceGame() {
    var gv = document.getElementById('view-sentence-game');
    return gv && !gv.classList.contains('hidden');
  }

  // Build the per-sentence runtime (tokens, shuffled pool, empty slots) and render.
  function loadSentenceRound() {
    var s = state.sentenceSession;
    if (!s) return;
    var sent = s.queue[s.index];
    s.current = sent;
    s.locked = false;
    s.revealEn = false; // hide the English again for each new sentence

    // Tokens in ORIGINAL order. Each gets a unique id so duplicate words are
    // independent buttons that move alone. th/rom linked by index.
    s.tokens = sent.th.map(function (th, i) {
      return { uid: ++_sbUid, th: th, rom: (sent.rom && sent.rom[i] != null) ? sent.rom[i] : '' };
    });

    // Pool starts as all tokens, shuffled. Slots all empty.
    s.pool = shuffle(s.tokens.map(function (t) { return t.uid; }));
    // Defensive: if the shuffle happens to equal the solved order, reshuffle once
    // or twice so the puzzle never starts pre-solved (only matters for short ones).
    var tries = 0;
    while (tries < 4 && poolMatchesSolved(s)) { s.pool = shuffle(s.pool); tries++; }

    s.slots = sent.th.map(function () { return null; });

    renderSentenceRound();
  }

  // True if the pool order (as if placed left-to-right) already equals a correct
  // answer — used only to avoid starting a puzzle pre-solved.
  function poolMatchesSolved(s) {
    if (s.tokens.length <= 1) return false;
    var byUid = {};
    s.tokens.forEach(function (t) { byUid[t.uid] = t; });
    var seq = s.pool.map(function (uid) { return byUid[uid].th; });
    return matchesAnyAnswer(seq, s.current);
  }

  function tokenByUid(uid) {
    var s = state.sentenceSession;
    if (!s) return null;
    for (var i = 0; i < s.tokens.length; i++) {
      if (s.tokens[i].uid === uid) return s.tokens[i];
    }
    return null;
  }

  // Build the inner HTML for a word chip (honors the global DISPLAY setting).
  function wordChipInner(tok) {
    var mode = state.displayMode; // 'both' | 'thai' | 'roman'
    var parts = [];
    if (mode === 'both' || mode === 'thai') {
      parts.push('<span class="sb-th">' + escapeHtml(tok.th) + '</span>');
    }
    if (mode === 'both' || mode === 'roman') {
      parts.push('<span class="sb-rom">' + escapeHtml(tok.rom) + '</span>');
    }
    if (parts.length === 0) {
      parts.push('<span class="sb-th">' + escapeHtml(tok.th) + '</span>');
    }
    return parts.join('');
  }

  // Render the whole round: prompt, slots, pool, and optional listen button.
  function renderSentenceRound() {
    var s = state.sentenceSession;
    var host = document.getElementById('sb-game-root');
    if (!s || !host) return;

    var single = (state.displayMode !== 'both') ? ' sb-single' : '';

    var html = '<div class="sb-wrap">';

    // One-time in-game how-to box (above the prompt). Shown until the player taps
    // "OK — Don't show again", which sets state.sbHideHelp and persists it.
    if (!state.sbHideHelp) {
      html += '<div class="sb-help" id="sb-help">' +
                '<div class="sb-help-body">' +
                  '<p class="sb-help-lead">\u2139\uFE0F Build the sentence by arranging the scrambled words.</p>' +
                  '<ul class="sb-help-list">' +
                    '<li>Click a word to place it in the next empty spot.</li>' +
                    '<li>If you make a mistake, click a word in the sentence to remove it.</li>' +
                  '</ul>' +
                '</div>' +
                '<button type="button" class="sb-help-ok" id="sb-help-ok">\u2713 OK \u2014 Don\u2019t show again</button>' +
              '</div>';
    }

    // English prompt (the clue the player reconstructs in Thai). When English
    // Hint is OFF we don't show the meaning up front; instead we offer a small
    // tappable "Show English sentence" link in the same spot. Tapping it reveals
    // the meaning for THIS sentence only (s.revealEn), and it resets every round
    // so it can't spoil the next/upcoming sentence.
    if (state.sbEngHint === 'off') {
      if (s.revealEn) {
        html += '<div class="sb-prompt">' +
                  '<div class="sb-prompt-label">Build this sentence in Thai</div>' +
                  '<div class="sb-prompt-en">' + escapeHtml(s.current.en) + '</div>' +
                '</div>';
      } else {
        html += '<div class="sb-prompt sb-prompt-noeng">' +
                  '<div class="sb-prompt-label">Put the words in the right order</div>' +
                  '<button type="button" class="sb-reveal-en" id="sb-reveal-en">' +
                    'Show English sentence' +
                  '</button>' +
                '</div>';
      }
    } else {
      html += '<div class="sb-prompt">' +
                '<div class="sb-prompt-label">Build this sentence in Thai</div>' +
                '<div class="sb-prompt-en">' + escapeHtml(s.current.en) + '</div>' +
              '</div>';
    }

    // Slots row.
    html += '<div class="sb-slots" id="sb-slots">';
    s.slots.forEach(function (uid, i) {
      if (uid == null) {
        html += '<span class="sb-slot-empty" data-slot="' + i + '"></span>';
      } else {
        var tok = tokenByUid(uid);
        html += '<button type="button" class="sb-word' + single + '" ' +
                'data-from="slot" data-slot="' + i + '" data-uid="' + uid + '">' +
                wordChipInner(tok) + '</button>';
      }
    });
    html += '</div>';

    // Pool row (remaining shuffled words).
    html += '<div class="sb-pool" id="sb-pool">';
    s.pool.forEach(function (uid) {
      var tok = tokenByUid(uid);
      html += '<button type="button" class="sb-word' + single + '" ' +
              'data-from="pool" data-uid="' + uid + '">' +
              wordChipInner(tok) + '</button>';
    });
    html += '</div>';

    html += '</div>'; // .sb-wrap

    host.innerHTML = html;
    host.scrollTop = 0;
    wireRoundEvents();

    // Wire the one-time how-to dismiss button. Hides the box now and remembers
    // the choice (persisted) so it never shows again.
    var helpOk = document.getElementById('sb-help-ok');
    if (helpOk) {
      helpOk.addEventListener('click', function () {
        state.sbHideHelp = true;
        if (typeof saveStorage === 'function') saveStorage();
        var box = document.getElementById('sb-help');
        if (box) box.remove();
        if (typeof haptic === 'function') haptic(8);
      });
    }

    // Wire the "Show English sentence" reveal link (only present when the hint
    // is off and not yet revealed). Reveals this sentence's meaning, then
    // re-renders so the prompt shows it.
    var revealBtn = document.getElementById('sb-reveal-en');
    if (revealBtn) {
      revealBtn.addEventListener('click', function () {
        var ss = state.sentenceSession;
        if (!ss || ss.over) return;
        ss.revealEn = true;
        if (typeof haptic === 'function') haptic(8);
        renderSentenceRound();
      });
    }
  }

  // Swap ONLY the prompt area to the revealed-English version, in place. Used on a
  // correct answer when the English Hint is off, so the meaning appears without a
  // full re-render (which would wipe the green "correct" animation on the slots).
  // Safe no-op if the prompt element isn't present or the hint is on.
  function revealPromptEnglish() {
    var s = state.sentenceSession;
    if (!s || !s.current) return;
    var host = document.getElementById('sb-game-root');
    if (!host) return;
    var prompt = host.querySelector('.sb-prompt');
    if (!prompt) return;
    prompt.className = 'sb-prompt';
    prompt.innerHTML =
      '<div class="sb-prompt-label">Build this sentence in Thai</div>' +
      '<div class="sb-prompt-en">' + escapeHtml(s.current.en) + '</div>';
  }

  // Attach handlers to the freshly-rendered round (delegated on host).
  // - A quick tap places (from pool) or returns (from slot) a word.
  // - A press-and-hold (~600ms) on a word speaks JUST that word in Thai, if a
  //   Thai voice exists. The hold suppresses the click that follows so it does
  //   NOT also place/return the word. No voice on device => nothing happens.
  function wireRoundEvents() {
    var host = document.getElementById('sb-game-root');
    if (!host) return;

    var HOLD_MS = 600;
    var MOVE_CANCEL = 10; // px of movement that cancels a hold (treat as scroll)

    var holdTimer = null;
    var holdUid = null;
    var longFired = false;   // a hold just spoke a word; swallow the next click
    var startX = 0, startY = 0;
    var pressedEl = null;

    function clearHold() {
      if (holdTimer) { clearTimeout(holdTimer); holdTimer = null; }
      holdUid = null;
      if (pressedEl) { pressedEl.classList.remove('sb-holding'); pressedEl = null; }
    }

    function ttsWordAvailable() {
      return tts && tts.supported && tts.bingoAudioAvailable && tts.bingoAudioAvailable();
    }

    host.onpointerdown = function (e) {
      var s = state.sentenceSession;
      if (!s || s.over || s.locked) return;
      // Only left button / touch / pen.
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      var word = e.target.closest('.sb-word');
      if (!word) return;
      // Don't start a hold if there's no Thai voice — long-press just no-ops.
      if (!ttsWordAvailable()) return;

      holdUid = Number(word.dataset.uid);
      pressedEl = word;
      startX = e.clientX; startY = e.clientY;
      longFired = false;

      holdTimer = setTimeout(function () {
        holdTimer = null;
        var s2 = state.sentenceSession;
        if (!s2 || s2.over || s2.locked) { clearHold(); return; }
        var tok = tokenByUid(holdUid);
        if (tok && tok.th) {
          longFired = true; // suppress the click that will follow this hold
          if (pressedEl) pressedEl.classList.add('sb-holding');
          try { tts.speak(tok.th, pressedEl || null, { rate: 0.8 }); } catch (e2) {}
          if (typeof haptic === 'function') haptic(12);
        }
      }, HOLD_MS);
    };

    host.onpointermove = function (e) {
      if (!holdTimer && !pressedEl) return;
      if (holdUid == null) return;
      var dx = e.clientX - startX, dy = e.clientY - startY;
      if ((dx * dx + dy * dy) > (MOVE_CANCEL * MOVE_CANCEL)) {
        // Moved too far — this is a scroll/drag, not a hold. Cancel the timer
        // but keep `longFired` false so a normal click can still register.
        clearHold();
      }
    };

    function endPress() {
      // The pressed-state cue clears, but we keep `longFired` until the click
      // handler consumes it (the click fires right after pointerup).
      if (holdTimer) { clearTimeout(holdTimer); holdTimer = null; }
      holdUid = null;
      if (pressedEl) { pressedEl.classList.remove('sb-holding'); pressedEl = null; }
    }
    host.onpointerup = endPress;
    host.onpointercancel = function () { endPress(); longFired = false; };

    host.onclick = function (e) {
      var s = state.sentenceSession;
      if (!s || s.over || s.locked) return;

      var word = e.target.closest('.sb-word');
      if (!word) return;

      // If this click is the tail of a long-press, swallow it (don't place/return).
      if (longFired) { longFired = false; return; }

      var uid = Number(word.dataset.uid);
      if (word.dataset.from === 'pool') {
        placeWord(uid);
      } else {
        returnWord(uid);
      }
    };
  }

  // Place a pooled word into the NEXT empty slot. Auto-checks when full.
  function placeWord(uid) {
    var s = state.sentenceSession;
    if (!s || s.locked) return;
    var pi = s.pool.indexOf(uid);
    if (pi === -1) return;
    var slotIdx = s.slots.indexOf(null);
    if (slotIdx === -1) return; // all full (shouldn't happen — we auto-check)

    s.pool.splice(pi, 1);
    s.slots[slotIdx] = uid;

    if (typeof playSound === 'function') playSound('snd-sentence-put');
    if (typeof haptic === 'function') haptic(8);

    renderSentenceRound();
    // Pop-in animation on the just-placed slot word.
    animatePlaced(slotIdx);

    // Auto-check when the last slot fills.
    if (s.slots.indexOf(null) === -1) {
      checkSentence();
    }
  }

  // Return a placed word back to the pool.
  function returnWord(uid) {
    var s = state.sentenceSession;
    if (!s || s.locked) return;
    var slotIdx = s.slots.indexOf(uid);
    if (slotIdx === -1) return;
    s.slots[slotIdx] = null;
    // Put it back into the pool (append; order in pool is cosmetic).
    if (s.pool.indexOf(uid) === -1) s.pool.push(uid);

    if (typeof playSound === 'function') playSound('snd-sentence-remove');
    if (typeof haptic === 'function') haptic(8);

    renderSentenceRound();
  }

  function animatePlaced(slotIdx) {
    var slotsEl = document.getElementById('sb-slots');
    if (!slotsEl) return;
    var el = slotsEl.querySelector('.sb-word[data-slot="' + slotIdx + '"]');
    if (!el) return;
    el.classList.add('sb-place');
    setTimeout(function () { if (el) el.classList.remove('sb-place'); }, 360);
  }

  /* ----- Answer checking (string-based; duplicate-safe) ----- */

  // The Thai-string sequence currently in the slots.
  function placedSequence(s) {
    return s.slots.map(function (uid) {
      var t = tokenByUid(uid);
      return t ? t.th : null;
    });
  }

  // True if `seq` (array of th strings) matches the canonical order or any
  // listed answers[] ordering. Compared by value, so duplicates are handled.
  function matchesAnyAnswer(seq, sent) {
    if (arraysEqual(seq, sent.th)) return true;
    if (Array.isArray(sent.answers)) {
      for (var i = 0; i < sent.answers.length; i++) {
        if (arraysEqual(seq, sent.answers[i])) return true;
      }
    }
    return false;
  }

  function arraysEqual(a, b) {
    if (!a || !b || a.length !== b.length) return false;
    for (var i = 0; i < a.length; i++) { if (a[i] !== b[i]) return false; }
    return true;
  }

  function checkSentence() {
    var s = state.sentenceSession;
    if (!s || s.locked) return;
    s.locked = true;

    var seq = placedSequence(s);
    var correct = matchesAnyAnswer(seq, s.current);
    var slotsEl = document.getElementById('sb-slots');

    if (correct) {
      if (slotsEl) {
        slotsEl.classList.add('sb-correct');
        slotsEl.querySelectorAll('.sb-word').forEach(function (w) {
          w.classList.add('sb-correct-word');
        });
      }
      if (typeof playSound === 'function') playSound('snd-bingo-correct');
      if (typeof haptic === 'function') haptic(30);

      s.done++;
      updateSentenceHud();

      var isLast = (s.index + 1 >= s.queue.length);

      // When the English Hint is OFF, reveal the English meaning of the sentence
      // the player just solved (same as tapping "Show English sentence"), so they
      // can confirm what they built. We update ONLY the prompt area in place so the
      // green "correct" animation on the slots is left untouched. The reveal is for
      // THIS solved sentence only — loadSentenceRound() resets s.revealEn for the
      // next one, so it never spoils the upcoming sentence.
      var hintOff = (state.sbEngHint === 'off');
      if (hintOff) {
        s.revealEn = true;
        revealPromptEnglish();
      }

      // Advance timing. With Spoken Answer ON, afterOptionalSpeak waits for the
      // spoken sentence to finish (unchanged). With it OFF, we use a timed delay;
      // when the hint is OFF we extend that delay by ~1s so there's time to read
      // the freshly-revealed English before the next sentence appears.
      var correctDelay = hintOff ? 1900 : 900;

      // On a correct answer the board stays frozen (s.locked is true) while the
      // sentence is read aloud; only once TTS finishes (or the safety timer
      // fires) do we advance to the next sentence — or show the win modal if
      // this was the last one. With Spoken Answer off, this is just a short beat.
      afterOptionalSpeak(true, correctDelay, function () {
        if (!state.sentenceSession || state.sentenceSession.over) return;
        if (isLast) {
          endSentenceGame(true);
        } else {
          s.index++;
          loadSentenceRound();
        }
      });
    } else {
      // Wrong: lose a life.
      s.lives = Math.max(0, s.lives - 1);
      updateSentenceHud();

      if (slotsEl) {
        slotsEl.classList.add('sb-wrong', 'sb-shake');
        slotsEl.querySelectorAll('.sb-word').forEach(function (w) {
          w.classList.add('sb-wrong-word');
        });
      }
      if (typeof haptic === 'function') haptic([20, 40, 20]);

      var lostAll = (s.lives <= 0);

      if (!lostAll) {
        // Still have a life: play the "wrong (try again)" cue, optionally read
        // the sentence as a hint, then reshuffle this sentence to retry.
        if (typeof playSound === 'function') playSound('snd-sentence-fail');
        afterOptionalSpeak(true, 1000, function () {
          if (!state.sentenceSession || state.sentenceSession.over) return;
          resetCurrentSentence();
        });
      } else {
        // Fatal miss → loss. Do NOT play the per-sentence fail sound; the loss
        // modal carries its own (snd-lose). If Spoken Answer is on, still read
        // the sentence first and delay the modal until speech finishes (+250ms).
        afterOptionalSpeak(true, 1000, function () {
          if (!state.sentenceSession || state.sentenceSession.over) return;
          endSentenceGame(false);
        });
      }
    }
  }

  // Put every word back and reshuffle (after a wrong answer, with lives left).
  function resetCurrentSentence() {
    var s = state.sentenceSession;
    if (!s) return;
    s.locked = false;
    // Rebuild pool from all tokens, reshuffled; clear slots.
    s.pool = shuffle(s.tokens.map(function (t) { return t.uid; }));
    var tries = 0;
    while (tries < 4 && poolMatchesSolved(s)) { s.pool = shuffle(s.pool); tries++; }
    s.slots = s.current.th.map(function () { return null; });
    renderSentenceRound();
  }

  /* ----- TTS: speak the full current sentence in Thai -----
     Returns true if speech was actually started (so callers can decide whether
     to wait for it). `opts.onDone` fires once when speech finishes OR errors. -----*/
  function speakWholeSentence(btnEl, opts) {
    opts = opts || {};
    var s = state.sentenceSession;
    if (!s || !s.current) return false;
    if (!(tts && tts.supported)) return false;
    // Need an actual Thai voice for this to make a sound; if none, don't claim
    // we spoke (so the caller's "wait for speech" path falls back to a delay).
    if (tts.bingoAudioAvailable && !tts.bingoAudioAvailable()) return false;
    // Join the ORIGINAL Thai word order into one utterance. Thai is written
    // without spaces between words; joining plainly reads most naturally.
    var phrase = s.current.th.join('');
    try {
      tts.speak(phrase, btnEl || null, { rate: 0.8, onDone: opts.onDone || null });
      return true;
    } catch (e) {
      return false; // TTS is enhancement only
    }
  }

  /* Run `next` after optionally speaking the current sentence.
     - If autoTTS is on AND a Thai voice exists: speak, then run `next` ~250ms
       after speech ends (with a safety cap so a missing onDone can't hang it).
     - Otherwise: run `next` after `fallbackDelay` ms.
     Used so the final sentence (win or fatal loss) finishes being read before
     the end modal appears. */
  function afterOptionalSpeak(doSpeak, fallbackDelay, next) {
    var ran = false;
    function clearTimers() {
      if (_sbSpeakSafetyTimer) { clearTimeout(_sbSpeakSafetyTimer); _sbSpeakSafetyTimer = null; }
      if (_sbClearTimer) { clearTimeout(_sbClearTimer); _sbClearTimer = null; }
      if (_sbSpeakDelayTimer) { clearTimeout(_sbSpeakDelayTimer); _sbSpeakDelayTimer = null; }
    }
    function go() { if (ran) return; ran = true; clearTimers(); next(); }

    if (doSpeak && state.sbAutoTts === 'on') {
      // Brief gap so the just-played correct/wrong SFX is heard before the spoken
      // sentence begins (they're short cues — avoids overlap).
      _sbSpeakDelayTimer = setTimeout(function () {
        _sbSpeakDelayTimer = null;
        if (ran) return;
        var started = speakWholeSentence(null, {
          onDone: function () {
            // Small pause after speech, then proceed.
            if (ran) return;
            _sbClearTimer = setTimeout(go, 250);
          }
        });
        if (started) {
          // Safety net: if onDone never fires (some engines), don't hang forever.
          _sbSpeakSafetyTimer = setTimeout(go, 6000);
        } else {
          // Could not actually speak (no voice) — use the timed fallback,
          // accounting for the delay we already waited.
          _sbClearTimer = setTimeout(go, Math.max(0, fallbackDelay - SB_SPEAK_DELAY));
        }
      }, SB_SPEAK_DELAY);
      return;
    }
    _sbClearTimer = setTimeout(go, fallbackDelay);
  }

  /* ----- End of game (reuses the shared win-modal shell) ----- */
  function endSentenceGame(won) {
    var s = state.sentenceSession;
    if (!s) return;
    s.over = true;
    if (_sbClearTimer) { clearTimeout(_sbClearTimer); _sbClearTimer = null; }
    if (tts && tts.supported) { try { window.speechSynthesis.cancel(); } catch (e) {} }

    // Count a finished session (win or lose), mirroring the other modes.
    if (!state.stats) state.stats = {};
    state.stats.sentenceFinished = (state.stats.sentenceFinished || 0) + 1;

    // On a win, bump the win counter and detect whether this win unlocked a new
    // landmark (drives the big-win sound + the unlock pill). Mirrors Connect/Bingo.
    var unlockedBadge = null;
    if (won) {
      var prevWins = state.sentenceWins || 0;
      var nextWins = prevWins + 1;
      state.sentenceWins = nextWins;
      if (typeof sentenceBadgeUnlockedBy === 'function') {
        unlockedBadge = sentenceBadgeUnlockedBy(prevWins, nextWins);
      }
    }
    try { saveStorage(); } catch (e) {}

    // Sound + haptic. A win that unlocked a new landmark uses the "big" win
    // sound; an ordinary win uses the milder cue (mirrors Audio Bingo / Connect).
    if (won) {
      playSound(unlockedBadge ? 'snd-win' : 'snd-win-2');
      haptic(unlockedBadge ? 60 : 50);
    } else {
      playSound('snd-lose');
      haptic(50);
    }

    // Drive the shared #win-modal. Mirrors endBingoGame()'s use of the shell.
    var title = document.getElementById('win-title');
    var subtitle = document.getElementById('win-subtitle');
    if (title) title.textContent = won ? '\uD83C\uDF89 You won!' : '\uD83D\uDCDA You lost!';
    if (typeof setEndThaiLine === 'function') setEndThaiLine('win-title-thai', won ? 'win' : 'lose');
    if (subtitle) {
      subtitle.textContent = won
        ? 'You built all ' + s.target + ' sentences!'
        : 'Out of lives — you built ' + s.done + ' of ' + s.target + '.';
      subtitle.classList.remove('lead', 'hidden');
    }
    var resultLine = document.getElementById('cpu-result-line');
    if (resultLine) resultLine.classList.add('hidden');
    var scoreLabel = document.getElementById('cpu-score-label');
    if (scoreLabel) scoreLabel.classList.add('hidden');
    if (typeof setEndThaiLine === 'function') setEndThaiLine('win-subtitle-thai', null);

    // Landmark-unlock banner (reuses the record-badge slot, like Connect/Bingo).
    var badgeWrap = document.getElementById('record-badge-wrap');
    if (badgeWrap) {
      if (unlockedBadge) {
        var winsText = unlockedBadge.threshold === 1 ? '1 win' : (unlockedBadge.threshold + ' wins');
        badgeWrap.innerHTML =
          '<div class="record-badge tier-' + unlockedBadge.id + '">' +
            unlockedBadge.emoji + ' ' + winsText + ' \u2014 ' +
            escapeHtml(unlockedBadge.label) + ' landmark unlocked! ' + unlockedBadge.emoji +
          '</div>';
      } else {
        badgeWrap.innerHTML = '';
      }
    }

    // Current-rank line (like Solo / Connect): highest landmark + total wins.
    // Reuses the shared #solo-end-rank element. Shown only once a landmark exists.
    var rankEl = document.getElementById('solo-end-rank');
    if (rankEl) {
      var curBadge = (typeof getSentenceBadge === 'function')
        ? getSentenceBadge(state.sentenceWins || 0) : null;
      if (curBadge) {
        var w = state.sentenceWins || 0;
        rankEl.innerHTML = 'Current rank: <strong>' + escapeHtml(curBadge.label) + '</strong> \u00B7 ' +
                           w + ' win' + (w === 1 ? '' : 's');
        rankEl.classList.remove('hidden');
      } else {
        rankEl.classList.add('hidden');
      }
    }

    // Hide the memory/CPU-specific modal sections (same set endBingoGame hides).
    hideEl('win-stats');
    hideEl('cpu-scoreboard');
    hideEl('cpu-end-portrait');
    hideEl('end-dialogue');
    var box = document.getElementById('win-modal-box');
    if (box) box.classList.remove('cpu-modal');
    var modal = document.getElementById('win-modal');
    if (modal) modal.classList.remove('hidden');

    // Achievement check (Star Student can unlock here once a Sentence Builder
    // landmark exists alongside the others). sentenceWins is already bumped.
    if (typeof checkAchievements === 'function') {
      try { checkAchievements(true); } catch (e) {}
    }
  }

  function hideEl(id) { var el = document.getElementById(id); if (el) el.classList.add('hidden'); }

  // Render the hearts + sentences-done counter in the shared top HUD.
  function updateSentenceHud() {
    var s = state.sentenceSession;
    if (!s) return;
    var hearts = document.getElementById('sb-hearts');
    if (hearts) {
      var html = '';
      for (var i = 0; i < s.livesMax; i++) {
        html += '<span class="' + (i < s.lives ? '' : 'heart-lost') + '">\u2764\uFE0F</span>';
      }
      hearts.innerHTML = html;
    }
    var cur = document.getElementById('sb-cur');
    var tot = document.getElementById('sb-tot');
    if (cur) cur.textContent = s.done;
    if (tot) tot.textContent = s.target;
  }

  /* ----------------------------------------------------------------------
     EXPORTS — expose the hooks the inline script calls by name.
     (Plain globals, matching the rest of the app's no-modules architecture.)
     ---------------------------------------------------------------------- */
  window.renderSentenceMenu = renderSentenceMenu;
  window.startSentenceGame  = startSentenceGame;
  window.teardownSentence   = teardownSentence;
  window.updateSentenceHud  = updateSentenceHud;

  // Wire the static menu controls once the DOM is ready. The script is injected
  // at the end of <body>, so the elements already exist, but guard anyway.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireSbMenu);
  } else {
    wireSbMenu();
  }
})();

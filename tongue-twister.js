/* =========================================================================
   tongue-twister.js  —  Thai Tongue Twister practice (Thai Beginner Course)
   -------------------------------------------------------------------------
   FREE-PLAY practice mode, modelled on the Tone Trainer rather than the Tone
   Challenge: the learner picks ONE tongue twister from a list and repeats it
   as many times as they like, with a native recording to copy and a
   per-syllable breakdown of how they did. There is no run, no queue, no timer
   and no score to lose — retrying is the whole point of a tongue twister.

   ARCHITECTURE — mirrors word-cards.js:
   Plain (non-module) script, loaded AFTER the main inline script (so it can see
   the shared globals: state, saveStorage, navigate, playSound, haptic, …) and
   AFTER tone-trainer.js (so window.openToneCalibration and window.toneDsp
   exist). It owns its view shell entirely: index.html contains only an EMPTY
   <main id="view-tonguetwister">, and this file injects both the markup and its
   own stylesheet at first entry. That keeps index.html's footprint to a handful
   of lines and means this mode can be removed by deleting one <script> tag.

   PROFILE SHARING: voice profiles are read straight from state.toneProfiles —
   the same array the Tone Trainer fills. Add/recalibrate is delegated to the
   Tone Trainer's modal via window.openToneCalibration(recalId, onDone), so
   there is ONE source of truth for calibration across all three tone modes.

   ---------------------------------------------------------------------------
   BUILD STATUS — RUN 1 of 4 (the base).
   ---------------------------------------------------------------------------
   SHIPPED HERE : data model, view shell + CSS, twister library, shared voice
                  profile picker, sentence card with per-syllable tone chips,
                  native-audio playback (normal + slow), best-score storage,
                  navigation and teardown.
   NOT YET HERE : microphone capture, contour drawing, syllable segmentation
                  and scoring. The record panel is present but inert, so the
                  final layout is fixed and later runs only add behaviour.

   Deliberately, this run touches NOTHING in tone-trainer.js or
   tone-challenge.js. The capture-engine changes this mode needs (a per-capture
   VAD policy, and a multi-syllable extractUtterance) land in Run 2, isolated
   from everything here, so a regression in either half is unambiguous.
   See TONGUE-TWISTER-PLAN.md §7 and §9.
   ========================================================================= */

(function () {
  'use strict';

  /* ======================================================================
     TWISTER LIBRARY
     ----------------------------------------------------------------------
     The tone pattern is stored PER SYLLABLE and nowhere else. An utterance's
     pattern is always derived (syllables.map(s => s.tone)) rather than stored
     alongside it, so the two can never drift apart — a wrong pattern would
     poison scoring silently and look exactly like an engine bug.

     Romanization follows the app's existing convention (as in TC_WORDS):
       ก = g   ข/ค = k   ต = dt   ป = bp   พ = p
       à = low   â = falling   á = high   ǎ = rising   (unmarked = mid)

     A syllable may carry an optional `alt` tone: a SECOND pronunciation that is
     equally correct in real speech. The scorer (Run 3) takes the better of the
     two rather than picking one, and the UI shows both. This is not a fudge —
     it exists for genuine, documented variation, currently the question
     particle ไหม (prescriptively rising, colloquially high; so common in the
     high-tone form that informal writing respells it มั้ย). Do not use `alt`
     to paper over a tone we are merely unsure about: look the rule up instead.

     A syllable may also carry `brk: true`, meaning a phrase boundary falls
     BEFORE it — the natural breath in a two-clause twister. The UI draws a
     gap there, and from Run 3 the segmenter treats it as a hard anchor,
     since a real pause is the one boundary cue that is never ambiguous.

     `audio` is a path relative to the app root, or null when no native
     recording has been supplied yet. A missing file is handled gracefully:
     the Listen button reports it rather than failing silently.

     `refMs` is a native reference duration used later for the pace stat. It is
     a PLACEHOLDER until the real recordings arrive — measure it from the mp3
     rather than trusting these numbers.
     ====================================================================== */
  var TT_TWISTERS = [
    {
      id: 'moo-meuk-goong',
      th: 'หมูหมึกกุ้ง',
      en: 'Pork, squid, shrimp',
      note: 'A market-stall classic. Three syllables, three different tones — ' +
            'the shortest way into this mode.',
      level: 1,
      syllables: [
        { th: 'หมู',  rom: 'mŏo',   tone: 'rising'  },
        { th: 'หมึก', rom: 'mèuk',  tone: 'low'     },
        { th: 'กุ้ง', rom: 'gûng',  tone: 'falling' }
      ],
      audio: 'audio/twisters/moo-meuk-goong.mp3',
      refMs: 1200
    },
    {
      id: 'krai-kaai-kai-gai',
      th: 'ใครขายไข่ไก่',
      en: 'Who sells chicken eggs?',
      note: 'The most famous Thai tongue twister. Four syllables that all sound ' +
            'nearly identical — only the tones tell them apart.',
      level: 2,
      syllables: [
        { th: 'ใคร', rom: 'krai',  tone: 'mid'    },
        { th: 'ขาย', rom: 'kăai',  tone: 'rising' },
        { th: 'ไข่', rom: 'kài',   tone: 'low'    },
        { th: 'ไก่', rom: 'gài',   tone: 'low'    }
      ],
      audio: 'audio/twisters/krai-kaai-kai-gai.mp3',
      refMs: 1600
    },
    {
      id: 'yak-yai-lai-yak-lek',
      th: 'ยักษ์ใหญ่ไล่ยักษ์เล็ก',
      en: 'The big giant chases the small giant',
      note: 'Five syllables with a falling tone in the middle. The hard part is ' +
            'ไล่ยักษ์ — there is no pause between them, so the tone has to do all ' +
            'the work.',
      level: 3,
      syllables: [
        { th: 'ยักษ์', rom: 'yák',  tone: 'high'    },
        { th: 'ใหญ่', rom: 'yài',  tone: 'low'     },
        { th: 'ไล่',  rom: 'lâi',  tone: 'falling' },
        { th: 'ยักษ์', rom: 'yák',  tone: 'high'    },
        { th: 'เล็ก', rom: 'lék',  tone: 'high'    }
      ],
      audio: 'audio/twisters/yak-yai-lai-yak-lek.mp3',
      refMs: 2000
    },
    {
      id: 'kao-gin',
      th: 'เขากินข้าวและดูข่าว',
      en: 'He eats rice and watches the news',
      note: 'Not built on one repeated sound like the others \u2014 this one drills ' +
            '\u0E02\u0E49\u0E32\u0E27 (rice, falling) against \u0E02\u0E48\u0E32\u0E27 ' +
            '(news, low). Same letters, same vowel; only the tone separates dinner ' +
            'from the evening bulletin.',
      level: 3,
      syllables: [
        { th: 'เขา',  rom: 'kăo',   tone: 'rising'  },
        { th: 'กิน',  rom: 'gin',   tone: 'mid'     },
        { th: 'ข้าว', rom: 'kâao',  tone: 'falling' },
        { th: 'และ',  rom: 'láe',   tone: 'high'    },
        { th: 'ดู',   rom: 'doo',   tone: 'mid'     },
        { th: 'ข่าว', rom: 'kàao',  tone: 'low'     }
      ],
      audio: 'audio/twisters/kao-gin.mp3',
      refMs: 2200
    },
    {
      id: 'chaam-kieow',
      th: 'ชามเขียวคว่ำเช้า ชามขาวคว่ำค่ำ',
      en: 'The green bowl was upturned in the morning, the white bowl at nightfall',
      note: 'Two matched halves with a breath between them. The trap is the ending: ' +
            '\u0E40\u0E0A\u0E49\u0E32 (morning, high) against \u0E04\u0E48\u0E33 ' +
            '(nightfall, falling), after four syllables that have already lulled you ' +
            'into a rhythm.',
      level: 4,
      syllables: [
        { th: 'ชาม',  rom: 'chaam',  tone: 'mid'     },
        { th: 'เขียว', rom: 'kĭeow',  tone: 'rising'  },
        { th: 'คว่ำ',  rom: 'kwâm',   tone: 'falling' },
        { th: 'เช้า',  rom: 'cháo',   tone: 'high'    },
        // Phrase boundary: a real pause lives here, so it is drawn as a gap and
        // (from Run 3) treated as a HARD segmentation anchor.
        { th: 'ชาม',  rom: 'chaam',  tone: 'mid',     brk: true },
        { th: 'ขาว',  rom: 'kăao',   tone: 'rising'  },
        { th: 'คว่ำ',  rom: 'kwâm',   tone: 'falling' },
        { th: 'ค่ำ',   rom: 'kâm',    tone: 'falling' }
      ],
      audio: 'audio/twisters/chaam-kieow.mp3',
      refMs: 3200
    },
    {
      id: 'mai-mai-mai-mai-chai-mai',
      th: 'ไหมใหม่ไม่ไหม้ใช่ไหม',
      en: 'The new silk isn\u2019t burnt, is it?',
      note: 'Six syllables, five of them "mai". Nothing but the tone tells silk ' +
            '(\u0E44\u0E2B\u0E21) from new (\u0E43\u0E2B\u0E21\u0E48) from not (\u0E44\u0E21\u0E48) ' +
            'from burnt (\u0E44\u0E2B\u0E21\u0E49). The final \u0E44\u0E2B\u0E21 is the question ' +
            'particle: the textbook reading is rising, but in everyday speech almost ' +
            'everyone says it high \u2014 so often that it gets respelled ' +
            '\u0E21\u0E31\u0E49\u0E22. Either is accepted here.',
      level: 4,
      syllables: [
        { th: 'ไหม',  rom: 'măi',  tone: 'rising'  },
        { th: 'ใหม่', rom: 'mài',  tone: 'low'     },
        { th: 'ไม่',  rom: 'mâi',  tone: 'falling' },
        { th: 'ไหม้', rom: 'mâi',  tone: 'falling' },
        { th: 'ใช่',  rom: 'châi', tone: 'falling' },
        // Question particle: rising by the spelling rule, high in ordinary
        // speech. Both accepted — see the `alt` note in the header above.
        { th: 'ไหม',  rom: 'măi',  tone: 'rising', alt: 'high' }
      ],
      audio: 'audio/twisters/mai-mai.mp3',
      refMs: 2400
    }
  ];

  // Display names for the five tones. `key` matches window.toneDsp.TONE_REFS.
  var TONE_LABEL = {
    mid:     { en: 'Mid',     th: 'สามัญ' },
    low:     { en: 'Low',     th: 'เอก'   },
    falling: { en: 'Falling', th: 'โท'    },
    high:    { en: 'High',    th: 'ตรี'   },
    rising:  { en: 'Rising',  th: 'จัตวา' }
  };

  // Difficulty labels, derived from `level`.
  var LEVEL_LABEL = { 1: 'Easy', 2: 'Medium', 3: 'Hard', 4: 'Expert' };

  var MAX_PROFILES = 5;              // mirrors the Tone Trainer cap
  var SLOW_RATE = 0.65;              // playbackRate for the "Slow" listen button

  /* ======================================================================
     RUNTIME STATE (module-local; persisted bits live on window.state)
     ====================================================================== */
  var built = false;                 // markup + CSS injected and wired once
  var selectedProfileId = null;      // chosen in the picker (resolved on entry)
  var activeTwister = null;          // the twister being practised, or null (list view)
  var audioEl = null;                // <Audio> for the current native recording
  var audioSlow = false;             // whether the next Listen tap plays slowed

  function $(id) { return document.getElementById(id); }

  function getProfiles() {
    var st = window.state;
    return (st && Array.isArray(st.toneProfiles)) ? st.toneProfiles : [];
  }
  function persist() {
    try { if (typeof window.saveStorage === 'function') window.saveStorage(); } catch (e) {}
  }
  // Best score per twister id: { 'krai-kaai-kai-gai': 82, ... }. Created lazily
  // so an older saved state (which has no such key) is upgraded transparently.
  function bestScores() {
    var st = window.state;
    if (!st) return {};
    if (!st.ttBest || typeof st.ttBest !== 'object') st.ttBest = {};
    return st.ttBest;
  }
  function escapeText(s) {
    // Everything user-visible here is our own bundled data, but route it through
    // textContent rather than innerHTML anywhere it could ever become dynamic.
    return String(s == null ? '' : s);
  }

  /* ======================================================================
     STYLES
     ----------------------------------------------------------------------
     Injected once, at first entry, so this mode adds no CSS to index.html.
     Everything is scoped under #view-tonguetwister; the shared component
     classes (.menu-section, .howto-section, .tone-profile-chip, .tone-mic-btn,
     .menu-back-btn, …) are reused unchanged so it looks native to the app.
     ====================================================================== */
  var TONE_RGB = {
    mid:     '107,127,153',
    low:     '63,124,196',
    falling: '212,98,58',
    high:    '74,157,95',
    rising:  '154,95,196'
  };

  function injectStyle() {
    if ($('tt-style')) return;
    var css = '';

    // ---- Sub-screen toggling (list vs practice), mirroring the Tone Trainer.
    css +=
      '#view-tonguetwister .tt-practice{display:none;}' +
      '#view-tonguetwister .tt-list{display:flex;flex-direction:column;gap:1.25rem;' +
        'width:100%;max-width:480px;}' +
      '#view-tonguetwister.tt-mode-practice .tt-list{display:none;}' +
      '#view-tonguetwister.tt-mode-practice .tt-practice{display:flex;flex-direction:column;' +
        'gap:1.25rem;width:100%;max-width:480px;}' +
      // In practice: hide the big title to free vertical space (as the other tone modes do).
      '#view-tonguetwister.tt-mode-practice .screen-header{display:none;}' +
      '#view-tonguetwister .tt-list .menu-section,' +
      '#view-tonguetwister .tt-practice .menu-section{max-width:100%;}' +
      '#view-tonguetwister .menu-section-label{padding-right:0.5rem;}' +
      // The wrappers lay out like .menu (flex column, 1.25rem gap), so the global
      // .menu-back-section negative margin resolves to a tidy gap here too.
      '#view-tonguetwister .tt-list > .menu-group-label,' +
      '#view-tonguetwister .tt-list > .tone-howto-section{margin:0;}';

    // ---- Twister picker cards.
    css +=
      '#view-tonguetwister .tt-card{display:block;width:100%;text-align:left;cursor:pointer;' +
        'background:var(--panel);border:2px solid var(--card-face-border);border-radius:14px;' +
        'padding:0.85rem 0.95rem;color:inherit;font:inherit;' +
        'transition:border-color 160ms ease,box-shadow 160ms ease,transform 160ms ease;}' +
      '#view-tonguetwister .tt-card + .tt-card{margin-top:0.6rem;}' +
      '#view-tonguetwister .tt-card:hover{border-color:var(--accent);' +
        'box-shadow:0 2px 10px var(--shadow);}' +
      '#view-tonguetwister .tt-card:active{transform:scale(0.99);}' +
      '#view-tonguetwister .tt-card-top{display:flex;align-items:baseline;' +
        'justify-content:space-between;gap:0.6rem;}' +
      '#view-tonguetwister .tt-card-th{font-size:1.35rem;line-height:1.5;color:var(--ink);}' +
      '#view-tonguetwister .tt-card-rom{font-size:0.92rem;color:var(--rom);margin-top:0.15rem;}' +
      '#view-tonguetwister .tt-card-en{font-size:0.85rem;color:var(--ink-soft);margin-top:0.1rem;}' +
      '#view-tonguetwister .tt-card-foot{display:flex;align-items:center;gap:0.45rem;' +
        'flex-wrap:wrap;margin-top:0.55rem;}' +
      // Difficulty + syllable-count pills.
      '#view-tonguetwister .tt-pill{font-size:0.72rem;padding:0.16rem 0.5rem;border-radius:999px;' +
        'background:var(--bg-2);color:var(--ink-soft);white-space:nowrap;}' +
      '#view-tonguetwister .tt-best{font-size:0.72rem;padding:0.16rem 0.5rem;border-radius:999px;' +
        'background:rgba(34,197,94,0.16);color:var(--ink);white-space:nowrap;}' +
      // The tone melody, as a row of coloured dots — a glanceable difficulty cue.
      '#view-tonguetwister .tt-dots{display:flex;gap:0.28rem;margin-left:auto;}' +
      '#view-tonguetwister .tt-dot{width:0.62rem;height:0.62rem;border-radius:50%;' +
        'display:inline-block;}';

    // ---- Practice header row (voice + change-twister).
    css +=
      '#view-tonguetwister .tt-top-row{display:flex;align-items:center;' +
        'justify-content:space-between;gap:0.6rem;}' +
      '#view-tonguetwister .tt-change{background:none;border:none;cursor:pointer;font:inherit;' +
        'font-size:0.82rem;color:var(--accent-2);text-decoration:underline;padding:0.2rem 0;}';

    // ---- The sentence card: the centrepiece of the practice screen.
    css +=
      '#view-tonguetwister .tt-sentence{background:var(--panel);' +
        'border:2px solid var(--card-face-border);border-radius:16px;padding:1rem 0.85rem;}' +
      '#view-tonguetwister .tt-sentence-th{font-size:1.7rem;line-height:1.55;text-align:center;' +
        'color:var(--ink);}' +
      '#view-tonguetwister .tt-sentence-en{font-size:0.9rem;text-align:center;' +
        'color:var(--ink-soft);margin-top:0.3rem;}' +
      '#view-tonguetwister .tt-sentence-note{font-size:0.82rem;line-height:1.55;' +
        'color:var(--ink-soft);margin-top:0.7rem;padding-top:0.7rem;' +
        'border-top:1px solid var(--card-face-border);}';

    // ---- Per-syllable chips. This row is the mode's real payload: later runs
    //      colour each chip by how well that syllable scored, so the layout is
    //      built now and only the colours change.
    css +=
      '#view-tonguetwister .tt-syls{display:flex;flex-wrap:wrap;justify-content:center;' +
        'gap:0.4rem;margin-top:0.85rem;}' +
      '#view-tonguetwister .tt-syl{flex:0 1 auto;min-width:4.1rem;text-align:center;' +
        'border-radius:11px;padding:0.45rem 0.4rem 0.4rem;' +
        'border:2px solid rgba(var(--tt-tone-rgb),0.55);' +
        'background:rgba(var(--tt-tone-rgb),0.10);' +
        'transition:border-color 220ms ease,background-color 220ms ease;}' +
      // Phrase break: forces a new flex line and leaves a little air, marking
      // the breath between two clauses.
      '#view-tonguetwister .tt-brk{flex-basis:100%;height:0.35rem;}' +
      '#view-tonguetwister .tt-dot.tt-dot-brk{margin-left:0.4rem;' +
        'box-shadow:-0.22rem 0 0 -0.06rem var(--ink-soft);}' +
      '#view-tonguetwister .tt-syl-th{font-size:1.15rem;line-height:1.45;color:var(--ink);}' +
      '#view-tonguetwister .tt-syl-rom{font-size:0.78rem;color:var(--rom);margin-top:0.1rem;}' +
      '#view-tonguetwister .tt-syl-tone{font-size:0.68rem;margin-top:0.22rem;font-weight:600;' +
        'color:rgb(var(--tt-tone-rgb));letter-spacing:0.02em;}' +
      // Two accepted tones need more characters in the same chip width.
      '#view-tonguetwister .tt-syl-tone.has-alt{font-size:0.6rem;letter-spacing:0;}' +
      // Score slot, reserved now and filled in a later run so the row never
      // changes height when a result arrives.
      '#view-tonguetwister .tt-syl-score{font-size:0.72rem;margin-top:0.2rem;' +
        'color:var(--ink-soft);min-height:1em;}';

    // ---- Listen controls.
    css +=
      '#view-tonguetwister .tt-listen-row{display:flex;gap:0.5rem;margin-top:0.85rem;}' +
      '#view-tonguetwister .tt-listen{flex:1;display:flex;align-items:center;' +
        'justify-content:center;gap:0.4rem;cursor:pointer;font:inherit;font-size:0.92rem;' +
        'padding:0.6rem 0.5rem;border-radius:11px;border:2px solid var(--card-face-border);' +
        'background:var(--bg-2);color:var(--ink);' +
        'transition:border-color 160ms ease,background-color 160ms ease;}' +
      '#view-tonguetwister .tt-listen:hover:not(:disabled){border-color:var(--accent);}' +
      '#view-tonguetwister .tt-listen:disabled{opacity:0.5;cursor:default;}' +
      '#view-tonguetwister .tt-listen.playing{border-color:var(--accent);' +
        'background:var(--panel);}' +
      '#view-tonguetwister .tt-audio-msg{font-size:0.78rem;color:var(--ink-soft);' +
        'text-align:center;margin-top:0.45rem;min-height:1em;}';

    // ---- Record panel. Inert in Run 1; the markup is final so later runs only
    //      swap the placeholder for the canvas and enable the button.
    css +=
      '#view-tonguetwister .tt-soon{border:2px dashed var(--card-face-border);border-radius:14px;' +
        'padding:1.15rem 0.9rem;text-align:center;color:var(--ink-soft);' +
        'font-size:0.86rem;line-height:1.6;background:var(--bg-2);}' +
      '#view-tonguetwister .tt-soon strong{color:var(--ink);}' +
      '#view-tonguetwister .tone-mic-btn:disabled{opacity:0.45;cursor:default;}';

    // ---- Empty / error states.
    css +=
      '#view-tonguetwister .tt-empty{text-align:center;line-height:1.6;' +
        'color:var(--ink-soft);font-size:0.88rem;}';

    css += '@media (prefers-reduced-motion: reduce){' +
      '#view-tonguetwister .tt-card,#view-tonguetwister .tt-syl,' +
      '#view-tonguetwister .tt-listen{transition:none;}}';

    var el = document.createElement('style');
    el.id = 'tt-style';
    el.textContent = css;
    document.head.appendChild(el);
  }

  /* ======================================================================
     MARKUP
     ----------------------------------------------------------------------
     Built once into the empty shell in index.html. Two sub-screens inside one
     view, toggled by tt-mode-list / tt-mode-practice on the <main> — exactly
     the pattern the Tone Trainer and Tone Challenge use.
     ====================================================================== */
  function buildMarkup() {
    var view = $('view-tonguetwister');
    if (!view || view.dataset.ttBuilt === '1') return !!view;
    view.dataset.ttBuilt = '1';

    view.innerHTML =
      '<div class="screen-header">' +
        '<h2 class="screen-title">Tongue Twisters</h2>' +
        '<p class="screen-subtitle">Pronunciation Practice</p>' +
        '<p class="screen-rom"><span class="th">\u0E1D\u0E36\u0E01\u0E27\u0E23\u0E23\u0E13\u0E22\u0E38\u0E01\u0E15\u0E4C ' +
          'f\u00E8uk wan-na-y\u00FAk</span></p>' +
      '</div>' +

      /* ---------- LIST sub-screen ---------- */
      '<div class="tt-list">' +
        '<div class="menu-group-label">Getting Started</div>' +

        '<section class="tone-howto-section howto-section" data-howto-id="tt-what">' +
          '<button type="button" class="howto-header">' +
            '<span class="h-icon">\uD83D\uDCA1</span>' +
            '<span class="h-title">What is this?</span>' +
            '<span class="h-chev">\u25BE</span>' +
          '</button>' +
          '<div class="howto-body">' +
            '<p>The Tone Trainer and Tone Challenge work on <strong>single words</strong>. ' +
              'This mode is for <strong>whole sentences</strong> \u2014 real Thai tongue twisters, ' +
              'where the same sound repeats with a different tone each time.</p>' +
            '<p>Pick a twister, listen to how a native speaker says it, then say it yourself. ' +
              'The app shows you <strong>which syllable</strong> you got right and which one ' +
              'slipped \u2014 not just a single mark for the whole sentence.</p>' +
            '<p>There is no timer and no run to lose. Repeat it as many times as you like: ' +
              'that is what a tongue twister is for.</p>' +
            '<p>You\u2019ll use the same <strong>voice profile</strong> as the Tone Trainer. ' +
              'Pick one below (or add a new one) to begin.</p>' +
          '</div>' +
        '</section>' +

        '<div class="menu-section">' +
          '<div class="menu-section-label">' +
            'Voice Profile' +
            '<span class="info-wrap" data-info>' +
              '<button type="button" class="info-icon" aria-label="What does this setting do?">i</button>' +
              '<span class="info-popup" role="tooltip">' +
                'A voice profile records your natural speaking pitch once (about half a minute) ' +
                'so the app knows where your low, mid, and high tones sit. Profiles are shared ' +
                'with the Tone Trainer and Tone Challenge \u2014 calibrate once, use in all three.' +
              '</span>' +
            '</span>' +
          '</div>' +
          '<div class="tone-profile-list" id="tt-profile-list"></div>' +
        '</div>' +

        '<div class="menu-section">' +
          '<div class="menu-section-label">' +
            'Choose a tongue twister' +
            '<span class="info-wrap" data-info>' +
              '<button type="button" class="info-icon" aria-label="What does this setting do?">i</button>' +
              '<span class="info-popup" role="tooltip">' +
                'The coloured dots show the tone of each syllable, in order. More syllables and ' +
                'more tone changes make a twister harder.' +
              '</span>' +
            '</span>' +
          '</div>' +
          '<div id="tt-twister-list"></div>' +
          '<div class="start-msg" id="tt-list-msg"></div>' +
        '</div>' +

        '<div class="menu-section menu-back-section">' +
          '<button type="button" class="menu-back-btn" data-back>Back</button>' +
        '</div>' +
      '</div>' +

      /* ---------- PRACTICE sub-screen ---------- */
      '<div class="tt-practice">' +
        '<div class="menu-section tt-top-row">' +
          '<div class="tone-info-box">Voice: <strong id="tt-active-name">\u2014</strong></div>' +
          '<button type="button" class="tt-change" id="tt-change-btn">Choose another</button>' +
        '</div>' +

        '<div class="menu-section">' +
          '<div class="tt-sentence">' +
            '<div class="tt-sentence-th th" id="tt-sentence-th"></div>' +
            '<div class="tt-sentence-en" id="tt-sentence-en"></div>' +
            '<div class="tt-syls" id="tt-syls"></div>' +
            '<div class="tt-listen-row">' +
              '<button type="button" class="tt-listen" id="tt-listen-btn">' +
                '<span>\uD83D\uDD0A</span><span id="tt-listen-label">Listen</span>' +
              '</button>' +
              '<button type="button" class="tt-listen" id="tt-listen-slow-btn">' +
                '<span>\uD83D\uDC0C</span><span>Slow</span>' +
              '</button>' +
            '</div>' +
            '<div class="tt-audio-msg" id="tt-audio-msg"></div>' +
            '<div class="tt-sentence-note" id="tt-sentence-note"></div>' +
          '</div>' +
        '</div>' +

        /* Record panel. Inert in Run 1 — see the BUILD STATUS note at the top.
           The mic button is real markup (same classes as the other tone modes)
           so the finished layout is already fixed; Run 3 enables it. */
        '<div class="menu-section">' +
          '<div class="tt-soon" id="tt-soon">' +
            '<strong>Recording and scoring arrive next.</strong><br>' +
            'This build sets up the twisters, the tone breakdown and the native audio. ' +
            'The microphone, the pitch graph and the per-syllable scoring come in the ' +
            'following step.' +
          '</div>' +
        '</div>' +

        '<div class="menu-section tone-controls">' +
          '<button type="button" class="tone-mic-btn" id="tt-mic-btn" disabled ' +
                  'aria-label="Recording is not available yet">' +
            '<span class="tone-mic-icon">\uD83C\uDFA4</span>' +
            '<span class="tone-mic-label">Coming next</span>' +
          '</button>' +
        '</div>' +

        '<div class="menu-section menu-back-section">' +
          '<button type="button" class="menu-back-btn" id="tt-back-btn">Back</button>' +
        '</div>' +
      '</div>';

    return true;
  }

  /* ======================================================================
     SUB-SCREEN SWITCHING
     ====================================================================== */
  function setMode(m) {
    var view = $('view-tonguetwister');
    if (!view) return;
    view.classList.toggle('tt-mode-practice', m === 'practice');
    view.classList.toggle('tt-mode-list', m === 'list');
  }

  /* ======================================================================
     PROFILE PICKER  (mirrors tone-challenge.js renderProfileList)
     ----------------------------------------------------------------------
     Reuses the same .tone-profile-* / .tone-add-profile markup + CSS so it
     looks identical. Add/Recalibrate delegate to the Tone Trainer's modal via
     window.openToneCalibration, passing a callback that re-renders THIS list.
     ====================================================================== */
  function renderProfileList() {
    var list = $('tt-profile-list');
    if (!list) return;
    list.innerHTML = '';
    var profiles = getProfiles();

    // Default selection: keep current if still valid, else last-used, else first.
    if (!selectedProfileId || !profiles.some(function (p) { return p.id === selectedProfileId; })) {
      var st = window.state;
      var last = st && st.toneLastProfileId;
      selectedProfileId = (last && profiles.some(function (p) { return p.id === last; }))
        ? last
        : (profiles[0] ? profiles[0].id : null);
    }

    profiles.forEach(function (p) {
      var chip = document.createElement('div');
      chip.className = 'tone-profile-chip' + (p.id === selectedProfileId ? ' selected' : '');

      var avatar = document.createElement('div');
      avatar.className = 'tone-chip-avatar';
      avatar.textContent = (p.name && p.name.charAt(0)) || '?';

      var body = document.createElement('button');
      body.type = 'button';
      body.className = 'tone-chip-body';
      body.style.cssText = 'background:none;border:none;text-align:left;cursor:pointer;color:inherit;';
      body.innerHTML = '<div class="tone-chip-name"></div>' +
                       '<div class="tone-chip-meta">~' + Math.round(p.centerHz) + ' Hz centre</div>';
      body.querySelector('.tone-chip-name').textContent = p.name;
      body.addEventListener('click', function () { selectedProfileId = p.id; renderProfileList(); });

      var recal = document.createElement('button');
      recal.type = 'button';
      recal.className = 'tone-chip-recal';
      recal.textContent = 'Recalibrate';
      recal.addEventListener('click', function (e) { e.stopPropagation(); openCalibration(p.id); });

      var del = document.createElement('button');
      del.type = 'button';
      del.className = 'tone-chip-delete';
      del.setAttribute('aria-label', 'Delete profile');
      del.textContent = '\u00D7';
      del.addEventListener('click', function (e) { e.stopPropagation(); deleteProfile(p.id); });

      chip.appendChild(avatar);
      chip.appendChild(body);
      chip.appendChild(recal);
      chip.appendChild(del);
      chip.addEventListener('click', function () { selectedProfileId = p.id; renderProfileList(); });

      list.appendChild(chip);
    });

    if (profiles.length < MAX_PROFILES) {
      var add = document.createElement('button');
      add.type = 'button';
      add.className = 'tone-add-profile';
      add.innerHTML = '<span>\uFF0B</span> Add profile';
      add.addEventListener('click', function () { openCalibration(null); });
      list.appendChild(add);
    } else {
      var note = document.createElement('div');
      note.className = 'tone-chip-meta';
      note.style.textAlign = 'center';
      note.textContent = 'Maximum of ' + MAX_PROFILES + ' profiles. Delete one to add another.';
      list.appendChild(note);
    }

    refreshListMsg();
  }

  // Delegate add/recalibrate to the Tone Trainer's shared calibration modal.
  function openCalibration(recalId) {
    if (typeof window.openToneCalibration !== 'function') {
      var list = $('tt-profile-list');
      if (list) {
        var n = document.createElement('div');
        n.className = 'tone-chip-meta';
        n.style.textAlign = 'center';
        n.textContent = 'Calibration is unavailable right now.';
        list.appendChild(n);
      }
      return;
    }
    window.openToneCalibration(recalId, function () {
      var st = window.state;
      if (st && st.toneLastProfileId &&
          getProfiles().some(function (p) { return p.id === st.toneLastProfileId; })) {
        selectedProfileId = st.toneLastProfileId;
      }
      renderProfileList();
    });
  }

  function deleteProfile(id) {
    var st = window.state;
    if (!st) return;
    st.toneProfiles = getProfiles().filter(function (p) { return p.id !== id; });
    if (st.toneLastProfileId === id) st.toneLastProfileId = null;
    if (selectedProfileId === id) selectedProfileId = null;
    persist();
    renderProfileList();
  }

  function activeProfile() {
    var profiles = getProfiles();
    for (var i = 0; i < profiles.length; i++) {
      if (profiles[i].id === selectedProfileId) return profiles[i];
    }
    return null;
  }

  /* ======================================================================
     TWISTER LIST
     ====================================================================== */
  function romOf(tw) {
    return tw.syllables.map(function (s) { return s.rom; }).join(' ');
  }

  function renderTwisterList() {
    var root = $('tt-twister-list');
    if (!root) return;
    root.innerHTML = '';
    var best = bestScores();

    TT_TWISTERS.forEach(function (tw) {
      var card = document.createElement('button');
      card.type = 'button';
      card.className = 'tt-card';

      var top = document.createElement('div');
      top.className = 'tt-card-top';
      var th = document.createElement('div');
      th.className = 'tt-card-th th';
      th.textContent = escapeText(tw.th);
      top.appendChild(th);

      var rom = document.createElement('div');
      rom.className = 'tt-card-rom';
      rom.textContent = romOf(tw);

      var en = document.createElement('div');
      en.className = 'tt-card-en';
      en.textContent = escapeText(tw.en);

      var foot = document.createElement('div');
      foot.className = 'tt-card-foot';

      var lvl = document.createElement('span');
      lvl.className = 'tt-pill';
      lvl.textContent = LEVEL_LABEL[tw.level] || 'Level ' + tw.level;
      foot.appendChild(lvl);

      var cnt = document.createElement('span');
      cnt.className = 'tt-pill';
      cnt.textContent = tw.syllables.length + ' syllables';
      foot.appendChild(cnt);

      var b = best[tw.id];
      if (typeof b === 'number' && b > 0) {
        var bp = document.createElement('span');
        bp.className = 'tt-best';
        bp.textContent = 'Best ' + Math.round(b) + '%';
        foot.appendChild(bp);
      }

      // The tone melody as coloured dots.
      var dots = document.createElement('div');
      dots.className = 'tt-dots';
      tw.syllables.forEach(function (s, i) {
        var d = document.createElement('span');
        d.className = 'tt-dot' + (s.brk && i > 0 ? ' tt-dot-brk' : '');
        var a = 'rgb(' + (TONE_RGB[s.tone] || TONE_RGB.mid) + ')';
        if (s.alt) {
          // Two accepted tones: split the dot so the melody row stays honest at
          // a glance rather than silently showing only one of them.
          var b = 'rgb(' + (TONE_RGB[s.alt] || TONE_RGB.mid) + ')';
          d.style.background = 'linear-gradient(135deg,' + a + ' 0 50%,' + b + ' 50% 100%)';
          d.title = (TONE_LABEL[s.tone] ? TONE_LABEL[s.tone].en : s.tone) + ' or ' +
                    (TONE_LABEL[s.alt] ? TONE_LABEL[s.alt].en : s.alt);
        } else {
          d.style.background = a;
          d.title = (TONE_LABEL[s.tone] ? TONE_LABEL[s.tone].en : s.tone);
        }
        dots.appendChild(d);
      });
      foot.appendChild(dots);

      card.appendChild(top);
      card.appendChild(rom);
      card.appendChild(en);
      card.appendChild(foot);

      card.addEventListener('click', function () { openTwister(tw); });
      root.appendChild(card);
    });
  }

  // The list message doubles as the profile gate: twisters are only openable
  // once a profile exists, because every score is measured against it.
  function refreshListMsg() {
    var msg = $('tt-list-msg');
    var root = $('tt-twister-list');
    if (!msg || !root) return;
    var profiles = getProfiles();
    var blocked = (profiles.length === 0 || !selectedProfileId);
    msg.textContent = blocked
      ? (profiles.length === 0 ? 'Add a voice profile to begin.' : 'Select a profile to begin.')
      : '';
    root.querySelectorAll('.tt-card').forEach(function (c) {
      c.disabled = blocked;
      c.style.opacity = blocked ? '0.5' : '';
      c.style.cursor = blocked ? 'default' : 'pointer';
    });
  }

  /* ======================================================================
     PRACTICE SCREEN
     ====================================================================== */
  function openTwister(tw) {
    if (!tw) return;
    var prof = activeProfile();
    if (!prof) { refreshListMsg(); return; }

    activeTwister = tw;
    var st = window.state;
    if (st) {
      st.toneLastProfileId = prof.id;
      st.ttLastId = tw.id;
      st.ttOpened = true;            // collapses the how-to accordion from now on
      persist();
    }

    var name = $('tt-active-name');
    if (name) name.textContent = prof.name || '\u2014';

    renderSentence(tw);
    resetAudio(tw);
    setMode('practice');
    try { window.scrollTo(0, 0); } catch (e) {}
  }

  function renderSentence(tw) {
    var th = $('tt-sentence-th');
    if (th) th.textContent = escapeText(tw.th);
    var en = $('tt-sentence-en');
    if (en) en.textContent = escapeText(tw.en);
    var note = $('tt-sentence-note');
    if (note) {
      note.textContent = escapeText(tw.note || '');
      note.style.display = tw.note ? '' : 'none';
    }

    var syls = $('tt-syls');
    if (!syls) return;
    syls.innerHTML = '';
    tw.syllables.forEach(function (s, i) {
      // A phrase boundary before this syllable becomes a flex line-break plus a
      // spacer, so the two halves of a two-clause twister read as two halves
      // rather than one undifferentiated run of chips.
      if (s.brk && i > 0) {
        var brk = document.createElement('div');
        brk.className = 'tt-brk';
        brk.setAttribute('aria-hidden', 'true');
        syls.appendChild(brk);
      }
      var cell = document.createElement('div');
      cell.className = 'tt-syl';
      cell.dataset.index = String(i);
      // The tone colour drives border, tint and label through one custom
      // property, so a later run can recolour a chip by score with one write.
      cell.style.setProperty('--tt-tone-rgb', TONE_RGB[s.tone] || TONE_RGB.mid);

      var a = document.createElement('div');
      a.className = 'tt-syl-th th';
      a.textContent = escapeText(s.th);

      var b = document.createElement('div');
      b.className = 'tt-syl-rom';
      b.textContent = escapeText(s.rom);

      var c = document.createElement('div');
      c.className = 'tt-syl-tone' + (s.alt ? ' has-alt' : '');
      var primary = (TONE_LABEL[s.tone] ? TONE_LABEL[s.tone].en : s.tone);
      // A syllable with an accepted variant names BOTH, so the learner is never
      // told they were wrong for producing the one they actually hear natives use.
      c.textContent = s.alt
        ? primary + ' / ' + (TONE_LABEL[s.alt] ? TONE_LABEL[s.alt].en : s.alt)
        : primary;

      // Reserved for the per-syllable percentage (filled in a later run).
      var d = document.createElement('div');
      d.className = 'tt-syl-score';
      d.textContent = '';

      cell.appendChild(a);
      cell.appendChild(b);
      cell.appendChild(c);
      cell.appendChild(d);
      syls.appendChild(cell);
    });
  }

  /* ======================================================================
     NATIVE AUDIO
     ----------------------------------------------------------------------
     One <Audio> per twister, created on open and torn down on leave. These are
     CONTENT recordings, not UI sound effects, so they deliberately bypass
     playSound()/WEBAUDIO_SFX and are not muted by the sound toggle — a learner
     who has turned game sounds off still needs the pronunciation model. The
     "Slow" button replays the same element at a reduced playbackRate, which
     preserves pitch in every current browser, so the tones stay correct.
     ====================================================================== */
  function resetAudio(tw) {
    stopAudio();
    audioEl = null;
    audioSlow = false;
    var msg = $('tt-audio-msg');
    var btn = $('tt-listen-btn');
    var slow = $('tt-listen-slow-btn');

    if (!tw.audio) {
      if (btn) btn.disabled = true;
      if (slow) slow.disabled = true;
      if (msg) msg.textContent = 'No native recording for this one yet.';
      return;
    }

    if (btn) btn.disabled = false;
    if (slow) slow.disabled = false;
    if (msg) msg.textContent = '';

    try {
      audioEl = new Audio(tw.audio);
      audioEl.preload = 'auto';
      audioEl.addEventListener('ended', function () { setPlaying(false); });
      audioEl.addEventListener('error', function () {
        setPlaying(false);
        if (btn) btn.disabled = true;
        if (slow) slow.disabled = true;
        var m = $('tt-audio-msg');
        if (m) m.textContent = 'The recording for this twister couldn\u2019t be loaded.';
      });
    } catch (e) {
      audioEl = null;
      if (btn) btn.disabled = true;
      if (slow) slow.disabled = true;
      if (msg) msg.textContent = 'Audio isn\u2019t available on this device.';
    }
  }

  function setPlaying(on) {
    var btn = $('tt-listen-btn');
    var slow = $('tt-listen-slow-btn');
    if (btn) btn.classList.toggle('playing', !!on && !audioSlow);
    if (slow) slow.classList.toggle('playing', !!on && audioSlow);
    var lbl = $('tt-listen-label');
    if (lbl) lbl.textContent = (on && !audioSlow) ? 'Playing\u2026' : 'Listen';
  }

  function playAudio(slow) {
    if (!audioEl) return;
    try {
      // Hold the output device open — a Bluetooth speaker that has idled will
      // otherwise swallow the first syllable, which is exactly where the tone is.
      if (window.audioReady && typeof window.audioReady.noteAudio === 'function') {
        window.audioReady.noteAudio();
      }
    } catch (e) {}
    try {
      audioSlow = !!slow;
      audioEl.pause();
      audioEl.currentTime = 0;
      audioEl.playbackRate = slow ? SLOW_RATE : 1;
      // Keep pitch constant when slowing down, so the tones stay truthful.
      try { audioEl.preservesPitch = true; } catch (e) {}
      try { audioEl.mozPreservesPitch = true; } catch (e) {}
      try { audioEl.webkitPreservesPitch = true; } catch (e) {}
      var p = audioEl.play();
      if (p && p.catch) p.catch(function () { setPlaying(false); });
      setPlaying(true);
    } catch (e) {
      setPlaying(false);
    }
  }

  function stopAudio() {
    if (!audioEl) return;
    try { audioEl.pause(); } catch (e) {}
    try { audioEl.currentTime = 0; } catch (e) {}
    setPlaying(false);
  }

  /* ======================================================================
     WIRING (once)
     ====================================================================== */
  function wireOnce() {
    if (built) return;
    injectStyle();
    if (!buildMarkup()) return;
    built = true;

    var listen = $('tt-listen-btn');
    if (listen) listen.addEventListener('click', function () { playAudio(false); });
    var slow = $('tt-listen-slow-btn');
    if (slow) slow.addEventListener('click', function () { playAudio(true); });

    var change = $('tt-change-btn');
    if (change) change.addEventListener('click', backToList);

    // The practice screen's footer Back returns to the twister list, not to the
    // main menu — mirroring the Tone Trainer's dedicated back button. (The
    // top-left arrow, Esc and the phone Back all still go straight to main via
    // handleBack(), which is why this button carries no data-back attribute.)
    var back = $('tt-back-btn');
    if (back) back.addEventListener('click', function (e) { e.preventDefault(); backToList(); });

    // How-to accordion. The Tone Trainer's wireHowtoAccordion only covers
    // #view-tone, so wire our own. Defaults OPEN until the learner has opened a
    // twister once (state.ttOpened), then defaults CLOSED.
    var view = $('view-tonguetwister');
    if (view) {
      view.querySelectorAll('.tone-howto-section').forEach(function (section) {
        var header = section.querySelector('.howto-header');
        if (header && !header._ttWired) {
          header._ttWired = true;
          header.addEventListener('click', function () { section.classList.toggle('open'); });
        }
      });
    }

    // Tap-to-hear the Thai, using the app's shared helper. Scoped to the header
    // line and the sentence ONLY — deliberately NOT the syllable chips, because
    // Run 3 gives a chip tap a better job: replaying that syllable from the
    // learner's OWN recording. Device TTS is also a poor guide for a whole
    // tongue twister, which is exactly what the native mp3 is there for.
    if (view && typeof window.wireThaiTapToSpeak === 'function') {
      window.wireThaiTapToSpeak(view, '.screen-rom .th, .tt-sentence-th');
    }
  }

  function applyHowtoDefaults() {
    var view = $('view-tonguetwister');
    if (!view) return;
    var open = !(window.state && window.state.ttOpened);
    view.querySelectorAll('.tone-howto-section').forEach(function (section) {
      section.classList.toggle('open', open);
    });
  }

  function backToList() {
    stopAudio();
    activeTwister = null;
    setMode('list');
    renderProfileList();
    renderTwisterList();
    refreshListMsg();
  }

  /* ======================================================================
     PUBLIC HOOKS  (called by the app's navigate machinery)
     ====================================================================== */
  window.enterTongueTwister = function () {
    wireOnce();
    applyHowtoDefaults();
    selectedProfileId = null;        // re-resolve to last-used on each entry
    activeTwister = null;
    stopAudio();
    setMode('list');                 // always land on the picker
    renderProfileList();
    renderTwisterList();
    refreshListMsg();
  };

  window.teardownTongueTwister = function () {
    stopAudio();
    audioEl = null;
    activeTwister = null;
    // Run 3 will also release the microphone here, the way teardownTone does.
  };

  // Exposed for the next runs (segmentation/scoring) and for offline testing,
  // so the twister data has exactly one definition.
  window.tongueTwisterData = {
    list: TT_TWISTERS,
    byId: function (id) {
      for (var i = 0; i < TT_TWISTERS.length; i++) {
        if (TT_TWISTERS[i].id === id) return TT_TWISTERS[i];
      }
      return null;
    },
    pattern: function (tw) {
      return tw ? tw.syllables.map(function (s) { return s.tone; }) : [];
    },
    // Every tone that counts as correct for syllable `i` — one entry normally,
    // two where a genuine spoken variant exists. Run 3's scorer must score
    // against ALL of these and keep the best, so the "accept either" rule has
    // exactly one definition and cannot drift between the UI and the scoring.
    accepted: function (tw, i) {
      if (!tw || !tw.syllables[i]) return [];
      var s = tw.syllables[i];
      return s.alt ? [s.tone, s.alt] : [s.tone];
    },
    hasAlt: function (tw) {
      return !!(tw && tw.syllables.some(function (s) { return !!s.alt; }));
    },
    // Syllable index ranges split at phrase boundaries, e.g. [[0,3],[4,7]].
    // Run 3's segmenter should place a HARD boundary between phrases and only
    // search for the soft ones inside each phrase.
    phrases: function (tw) {
      if (!tw) return [];
      var out = [], start = 0;
      for (var i = 1; i < tw.syllables.length; i++) {
        if (tw.syllables[i].brk) { out.push([start, i - 1]); start = i; }
      }
      out.push([start, tw.syllables.length - 1]);
      return out;
    },
    TONE_LABEL: TONE_LABEL,
    TONE_RGB: TONE_RGB
  };
})();

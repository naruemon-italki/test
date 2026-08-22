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

  /* ======================================================================
     SCORING CORE
     ----------------------------------------------------------------------
     Validated in Run 5 against native recordings: 21/24 syllables (88%) on
     clean audio, with speaking rate making no measurable difference (a fast
     continuous reading scored the highest of the set). It is exposed on
     window.tongueTwisterDsp so it can be unit-tested outside the browser.

     Nothing here modifies the tone model. computeToneScores/scoreAttempt are
     used exactly as the Trainer and Challenge use them; every adaptation is
     applied to the INPUT. That is what keeps this mode from destabilising the
     single-word tuning the other two modes depend on.
     ====================================================================== */
  var TTD = (function () {
    function dsp() { return window.toneDsp; }
    function median(a) {
      if (!a.length) return 0;
      var b = a.slice().sort(function (x, y) { return x - y; });
      return b[b.length >> 1];
    }
    var st = function (hz, c) { return 12 * Math.log2(hz / c); };
    var hzOf = function (v, c) { return c * Math.pow(2, v / 12); };

    /* Per-syllable conditioning — the single biggest accuracy win found.
       computeToneScores was tuned on ISOLATED words, which yield ~30-45 contour
       points. A deliberate connected syllable can run 700ms and yield 80+, and
       the surviving jitter then drags nearly everything to a "falling" verdict
       (measured: five of six syllables classified falling on a reading whose
       boundaries were known correct). Three steps fix it:
         1. foldOctave twice against the syllable's own median, repairing the
            +/-12st spikes that are octave errors. Twice, so a syllable that
            began with most frames in the wrong octave still converges.
         2. keep the central 70% — drops the onset burst and the release, which
            is where Thai aspirated onsets throw the pitch tracker.
         3. resample to 12 points by binned median: matches the point count the
            scorer was tuned for and median-filters the jitter in one step.   */
    function condition(pts) {
      if (!pts || pts.length < 6) return pts || [];
      var d = dsp();
      var r0 = median(pts.map(function (p) { return p.hz; }));
      var once = pts.map(function (p) { return { t: p.t, hz: d.foldOctave(p.hz, r0) }; });
      var r1 = median(once.map(function (p) { return p.hz; }));
      var q = once.map(function (p) { return { t: p.t, hz: d.foldOctave(p.hz, r1) }; });
      var k = Math.floor(q.length * 0.15);
      if (q.length - 2 * k >= 6) q = q.slice(k, q.length - k);
      var N = 12;
      if (q.length <= N) return q;
      var out = [];
      for (var i = 0; i < N; i++) {
        var a = Math.floor(i * q.length / N);
        var b = Math.max(a + 1, Math.floor((i + 1) * q.length / N));
        var seg = q.slice(a, b);
        out.push({ t: seg[0].t, hz: median(seg.map(function (x) { return x.hz; })) });
      }
      return out;
    }

    /* Declination: F0 drifts down across any utterance, so a mid tone late in a
       sentence is physically lower than the same tone early on. Fitting a line
       to the RAW contour would be a trap — a mid->low->low sequence legitimately
       declines and flattening it would erase real tonal information. So the fit
       is to the residual AFTER removing the expected tone heights. The slope is
       declination; the intercept is a per-utterance centre correction, which
       also absorbs the mismatch between an isolated-word calibration and the
       register the speaker actually uses in a sentence.
       Both are clamped so a wholly wrong attempt cannot be "corrected" into
       looking right — the same guard philosophy as the Challenge's centre sweep. */
    function declination(sylPts, tones, centre) {
      var d = dsp(), refs = d.TONE_REFS;
      function expMean(tn) {
        var r = refs[tn] && refs[tn].shape;
        if (!r) return 0;
        return r.reduce(function (a, b) { return a + b; }, 0) / r.length;
      }
      var xs = [], ys = [];
      sylPts.forEach(function (pts, i) {
        if (!pts || !pts.length) return;
        xs.push(pts.reduce(function (a, p) { return a + p.t; }, 0) / pts.length);
        ys.push(pts.reduce(function (a, p) { return a + st(p.hz, centre); }, 0) / pts.length - expMean(tones[i]));
      });
      var slope = 0, icept = 0;
      if (xs.length >= 3) {
        var sl = [];
        for (var a = 0; a < xs.length; a++)
          for (var b = a + 1; b < xs.length; b++)
            if (xs[b] !== xs[a]) sl.push((ys[b] - ys[a]) / (xs[b] - xs[a]));
        slope = Math.max(-0.012, Math.min(0.012, median(sl) || 0));
        var ic = [];
        for (var i2 = 0; i2 < xs.length; i2++) ic.push(ys[i2] - slope * xs[i2]);
        icept = Math.max(-3, Math.min(3, median(ic)));
      }
      return { slope: slope, icept: icept };
    }

    /* Nucleus-anchored segmentation.
       Measured against silence-derived boundaries on six native readings, this
       agreed syllable-for-syllable everywhere both worked, AND worked on two
       readings where the silence count did not match the syllable count. So
       nuclei are the primary cue and real silences only optional anchors.
       Prominence is solved by bisection until exactly N peaks emerge, which
       adapts to loud and quiet recordings without a hand-set threshold.       */
    function segment(frames, utt, N) {
      var HOP = dsp().config.HOP_MS;
      var t0 = utt.runs[0].startMs, t1 = utt.runs[utt.runs.length - 1].endMs;
      var n = Math.round((t1 - t0) / HOP);
      if (n < N * 3) return null;
      var hz = new Array(n), rms = new Array(n), i;
      for (i = 0; i < n; i++) { hz[i] = 0; rms[i] = 0; }
      // Dense energy from the RAW frames: taking rms only from voiced contour
      // points leaves zeros at unvoiced frames, fabricating deep valleys.
      for (i = 0; i < frames.length; i++) {
        var k = Math.round((frames[i].t - t0) / HOP);
        if (k >= 0 && k < n) rms[k] = frames[i].rms;
      }
      utt.runs.forEach(function (r) {
        r.pts.forEach(function (p) {
          var k2 = Math.round((p.t - t0) / HOP);
          if (k2 >= 0 && k2 < n) hz[k2] = p.hz;
        });
      });
      var eS = new Array(n);
      for (i = 0; i < n; i++) {
        var s2 = 0, c2 = 0;
        for (var j = Math.max(0, i - 3); j <= Math.min(n - 1, i + 3); j++) { s2 += rms[j]; c2++; }
        eS[i] = s2 / c2;
      }
      var peak = Math.max.apply(null, eS);
      if (!(peak > 0)) return null;
      var minLen = 9;   // 90ms, matching the engine's MIN_SPEECH_MS

      function peaksAt(prom) {
        var out = [];
        for (var i3 = 1; i3 < n - 1; i3++) {
          if (eS[i3] >= eS[i3 - 1] && eS[i3] > eS[i3 + 1]) {
            var l = eS[i3], r = eS[i3], j2;
            for (j2 = i3 - 1; j2 >= 0 && eS[j2] <= l; j2--) l = Math.min(l, eS[j2]);
            for (j2 = i3 + 1; j2 < n && eS[j2] <= r; j2++) r = Math.min(r, eS[j2]);
            if (eS[i3] - Math.max(l, r) >= prom * peak) out.push(i3);
          }
        }
        var keep = [];
        for (var q = 0; q < out.length; q++) {
          var v = out[q];
          if (keep.length && v - keep[keep.length - 1] < minLen) {
            if (eS[v] > eS[keep[keep.length - 1]]) keep[keep.length - 1] = v;
          } else keep.push(v);
        }
        return keep;
      }

      /* Independent sanity count BEFORE solving for N.
         The bisection below will find exactly N peaks whenever N is reachable,
         so it can never tell us the learner said the wrong number of syllables.
         A count taken at a FIXED moderate prominence can: it reflects how many
         syllable-shaped energy peaks are actually there. Only a clear mismatch
         is reported, since this measure is noisier than the solved one. */
      /* Deliberately loose, and ratio-based rather than absolute. This count is
         noisy — a slowly-spoken 3-syllable twister with long pauses can easily
         read as 5 nuclei — so it must only catch GROSS mismatches: saying the
         sentence twice, or trailing off halfway. Rejecting a legitimate slow
         attempt is a worse failure than scoring a slightly odd one, because the
         learner has no way to tell what they did wrong. */
      var natural = peaksAt(0.10).length;
      if (natural > 0 && (natural < N * 0.5 || natural > N * 1.8)) {
        return { failed: true, found: natural, want: N, natural: true };
      }

      /* ---- Boundary placement: silences FIRST, nuclei to fill in -------
         Real silences are the one boundary cue that is never ambiguous, so
         they are used as hard constraints rather than merely as hints. This
         was the design from the start but was not implemented, and the cost was
         concrete: on a native recording whose six syllables were separated by
         six clean silences, pure nucleus detection put one boundary 1.6s wide
         across three of them and the attempt scored 1/6.

         Nuclei still do the work WITHIN a run — that is the case silences
         cannot handle, and it is why they are not the primary cue on their own.

         Three cases:
           runs == N  -> one syllable per run, boundaries taken from the audio
           runs >  N  -> merge across the narrowest gaps first (a syllable split
                         by its own stop closure) until the counts agree
           runs <  N  -> share the syllables out between runs by duration, then
                         find that many nuclei inside each run                */
      var runSpans = [];
      utt.runs.forEach(function (r) {
        var a = Math.max(0, Math.round((r.startMs - t0) / HOP));
        var b = Math.min(n - 1, Math.round((r.endMs - t0) / HOP));
        if (b > a) runSpans.push({ a: a, b: b, gapBefore: r.gapBeforeMs || 0 });
      });
      if (!runSpans.length) runSpans = [{ a: 0, b: n - 1, gapBefore: 0 }];

      // runs > N: merge across the smallest gaps until the counts agree.
      while (runSpans.length > N) {
        var mi = 1, mg = Infinity;
        for (var q = 1; q < runSpans.length; q++) {
          if (runSpans[q].gapBefore < mg) { mg = runSpans[q].gapBefore; mi = q; }
        }
        runSpans[mi - 1].b = runSpans[mi].b;
        runSpans.splice(mi, 1);
      }

      /* Share N syllables among the runs, at least one each, in proportion to
         run duration (largest-remainder, so the total is always exactly N).
         Weighting by nuclei-per-run was tried instead and measured WORSE
         (63.2% vs 65.8% across the corpus): a fixed prominence threshold is too
         noisy to count syllables inside a single run reliably. Duration is the
         blunter cue but the steadier one. */
      var quota = [], totalLen = 0, i5;
      for (i5 = 0; i5 < runSpans.length; i5++) totalLen += (runSpans[i5].b - runSpans[i5].a + 1);
      var spare = N - runSpans.length, exact = [], base = [];
      for (i5 = 0; i5 < runSpans.length; i5++) {
        var share = spare * (runSpans[i5].b - runSpans[i5].a + 1) / (totalLen || 1);
        exact.push(share); base.push(Math.floor(share)); quota.push(1 + Math.floor(share));
      }
      var used = 0;
      for (i5 = 0; i5 < base.length; i5++) used += base[i5];
      var left = spare - used;
      var order = runSpans.map(function (_, k) { return k; }).sort(function (a, b) {
        return (exact[b] - base[b]) - (exact[a] - base[a]);
      });
      for (i5 = 0; i5 < left; i5++) quota[order[i5 % order.length]]++;

      // Find `want` nuclei inside one run and return the split points.
      function splitRun(a, b, want) {
        if (want <= 1) return [];
        var lo2 = 0.002, hi2 = 0.9, nuc = null;
        for (var it2 = 0; it2 < 45; it2++) {
          var mid2 = (lo2 + hi2) / 2;
          var pk2 = peaksAt(mid2).filter(function (x) { return x >= a && x <= b; });
          if (pk2.length === want) { nuc = pk2; break; }
          if (pk2.length > want) lo2 = mid2; else hi2 = mid2;
        }
        var cuts = [];
        if (!nuc) {
          // No clean nucleus split: fall back to equal division, which at least
          // keeps every syllable inside the run it belongs to.
          for (var e2 = 1; e2 < want; e2++) cuts.push(a + Math.round((b - a) * e2 / want));
          return cuts;
        }
        for (var g2 = 0; g2 < want - 1; g2++) {
          var best2 = nuc[g2] + 1, bv2 = Infinity;
          for (var i6 = nuc[g2] + 1; i6 < nuc[g2 + 1]; i6++) {
            if (eS[i6] < bv2) { bv2 = eS[i6]; best2 = i6; }
          }
          cuts.push(best2);
        }
        return cuts;
      }

      var bounds = [];
      for (i5 = 0; i5 < runSpans.length; i5++) {
        var rs = runSpans[i5];
        // Boundary BETWEEN runs: the midpoint of the silence separating them.
        if (i5 > 0) bounds.push(Math.round((runSpans[i5 - 1].b + rs.a) / 2));
        var inner = splitRun(rs.a, rs.b, quota[i5]);
        for (var c5 = 0; c5 < inner.length; c5++) bounds.push(inner[c5]);
      }
      bounds.sort(function (a, b) { return a - b; });
      if (bounds.length !== N - 1) return { failed: true, found: bounds.length + 1, want: N };

      var edges = [0].concat(bounds, [n]), syls = [];
      for (var s3 = 0; s3 < N; s3++) {
        var pts = [];
        for (var f2 = edges[s3]; f2 < edges[s3 + 1]; f2++) {
          if (hz[f2] > 0) pts.push({ t: t0 + f2 * HOP, hz: hz[f2] });
        }
        syls.push({ pts: pts, startMs: t0 + edges[s3] * HOP, endMs: t0 + edges[s3 + 1] * HOP });
      }
      return { syls: syls, bounds: bounds, runSpans: runSpans, t0: t0, n: n };
    }

    /* ---- Centre sweep, mirroring tone-challenge.js -----------------------
       A voice profile's centre is calibrated from three isolated mid-tone
       words, so it carries real error. Contour tones (falling, rising) are
       judged by SHAPE and barely care. The three LEVEL tones are judged by
       height, so a centre that is half a semitone off can flip mid into low or
       high — which is exactly the failure seen on the middle syllable of
       หมูหมึกกุ้ง, where the rising and falling neighbours both scored 100%.

       So: re-score level-tone targets at several nearby centres and keep the
       best. To stop that silently inflating every score by giving each attempt
       seven chances, subtract a small penalty proportional to how far we had to
       shift. An attempt already correct at the true centre keeps full marks; one
       that only looks right at maximum help takes a bounded haircut. Real
       calibration drift stops costing points, but a genuinely wrong tone cannot
       climb a tier by borrowing a shifted centre.

       Values are deliberately identical to the Challenge's, so the same
       pronunciation scores the same in both modes. */
    var SWEEP_SEMIS = [0, -0.5, 0.5, -1.0, 1.0, -1.5, 1.5];
    var SWEEP_MAX_PENALTY = 4;                       // % at the largest offset
    var SWEEP_TONES = { mid: true, low: true, high: true };

    function scoreWithSweep(d, core, centreHz, target) {
      if (!d || !d.scoreAttempt) {
        return { percent: 0, tone: null, isTarget: false, runnerUp: null, m: null };
      }
      if (!SWEEP_TONES[target] || !(centreHz > 0)) {
        return d.scoreAttempt(core, centreHz, target);
      }
      var maxSemi = 0, k;
      for (k = 0; k < SWEEP_SEMIS.length; k++) {
        var a = Math.abs(SWEEP_SEMIS[k]);
        if (a > maxSemi) maxSemi = a;
      }
      var best = null, bestAdj = -1;
      for (k = 0; k < SWEEP_SEMIS.length; k++) {
        var semi = SWEEP_SEMIS[k];
        var r = d.scoreAttempt(core, centreHz * Math.pow(2, semi / 12), target);
        if (!r || typeof r.percent !== 'number') continue;
        var penalty = maxSemi > 0 ? (Math.abs(semi) / maxSemi) * SWEEP_MAX_PENALTY : 0;
        var adj = r.percent - penalty;
        if (best === null || adj > bestAdj) { best = r; bestAdj = adj; }
      }
      if (!best) return d.scoreAttempt(core, centreHz, target);
      return {
        percent: Math.max(0, Math.min(100, bestAdj)),
        tone: best.tone, isTarget: best.isTarget, runnerUp: best.runnerUp, m: best.m
      };
    }

    /* Full pipeline: frames -> per-syllable results + an overall percentage. */
    function analyse(frames, liveThreshold, centreHz, twister) {
      var d = dsp();
      if (!d || typeof d.extractUtterance !== 'function') {
        return { ok: false, reason: 'engine' };
      }
      var tones = twister.syllables.map(function (s) { return s.tone; });
      var N = tones.length;
      var utt = d.extractUtterance(frames, liveThreshold, centreHz);
      if (!utt) return { ok: false, reason: 'nospeech' };

      var seg = segment(frames, utt, N);
      if (!seg) return { ok: false, reason: 'tooshort' };
      if (seg.failed) {
        // Report the mismatch rather than scoring a guess. A retry costs three
        // seconds; a confidently wrong per-syllable breakdown costs trust.
        return { ok: false, reason: 'count', heard: seg.found, expected: N };
      }

      var sylPts = seg.syls.map(function (s) { return s.pts; });
      var centre = centreHz > 0 ? centreHz
        : median(sylPts.reduce(function (a, p) { return a.concat(p.map(function (x) { return x.hz; })); }, []));
      var dec = declination(sylPts, tones, centre);

      var results = [], sum = 0, hits = 0;
      for (var i = 0; i < N; i++) {
        var cond = condition(sylPts[i]);
        var core = cond.map(function (p) {
          return { t: p.t, hz: hzOf(st(p.hz, centre) - (dec.icept + dec.slope * p.t), centre) };
        });
        var accepted = [tones[i]];
        if (twister.syllables[i].alt) accepted.push(twister.syllables[i].alt);
        // Start from null, not from a zero-percent placeholder: with a
        // placeholder, a syllable that scores 0 against every accepted tone
        // never satisfies `>` and keeps the placeholder's null `tone`, so the
        // feedback loses what was actually heard — the single most useful
        // thing to tell the learner when they got it wrong.
        var best = null;
        for (var a = 0; a < accepted.length; a++) {
          var r = (core.length >= 4)
            ? scoreWithSweep(d, core, centre, accepted[a])
            : { percent: 0, tone: null, isTarget: false };
          if (best === null || r.percent > best.percent) best = r;
        }
        if (!best) best = { percent: 0, tone: null, isTarget: false };
        if (best.isTarget) hits++;
        best.percent = Math.round(best.percent);
        sum += best.percent;
        results.push({
          index: i, percent: best.percent, heard: best.tone, isTarget: best.isTarget,
          startMs: seg.syls[i].startMs, endMs: seg.syls[i].endMs,
          // Three views of the same syllable, so the graph can show WHY a score
          // came out the way it did rather than only what it was:
          //   raw    - exactly what the microphone heard, after the engine's
          //            standard cleanup but before anything this module does
          //   points - after conditioning (octave repair, edge trim, resample)
          //   scored - after declination correction; this is the contour that
          //            was actually handed to the tone model
          raw: sylPts[i].slice(),
          points: cond,
          scored: core
        });
      }
      return {
        ok: true, results: results, hits: hits, count: N,
        percent: Math.round(sum / N),
        centre: centre, declination: dec,
        startMs: seg.syls[0].startMs, endMs: seg.syls[N - 1].endMs,
        durMs: seg.syls[N - 1].endMs - seg.syls[0].startMs
      };
    }

    /* VAD policy for sentences.
       Earlier values (700ms) were set from native teacher recordings, where the
       longest within-reading gap was 490ms. Real learners are slower: a native
       speaker reading unprepared left a 1090ms gap between two words of a
       three-word twister, and got cut off mid-sentence. Someone sounding out an
       unfamiliar sentence may well pause longer still.

       So the engine-level thresholds are now deliberately generous (3s), and
       the decision about when the learner has actually FINISHED is made by this
       module instead, adaptively — see paceWatcher below. A quiet room is
       assumed, and the engine's own noise floor and MIN_SPEECH_MS already
       discard clicks, breaths and other non-speech transients. */
    function vadFor(twister) {
      var n = twister.syllables.length;
      return {
        multiSegment: true,
        speechEndMs: 3000,       // a pause under 3s never ends the capture
        autoStopSilenceMs: 3000,
        noSpeechMs: 8000,        // longer: give a hesitant learner time to begin
        minCaptureMs: Math.min(8000, 700 + n * 250),
        maxCaptureMs: Math.min(20000, 4000 + n * 1800)
      };
    }

    /* Cheap live syllable count: smoothed-energy local maxima with a
       prominence floor. Deliberately simpler than the offline segmenter — it
       only has to answer "roughly how many syllables so far", and it runs on a
       growing buffer a few times a second. */
    function countNuclei(frames, thresh) {
      var n = frames.length;
      if (n < 12) return 0;
      var e = new Array(n), i, j, s2, c2;
      for (i = 0; i < n; i++) {
        s2 = 0; c2 = 0;
        for (j = Math.max(0, i - 3); j <= Math.min(n - 1, i + 3); j++) { s2 += frames[j].rms; c2++; }
        e[i] = s2 / c2;
      }
      var peak = 0;
      for (i = 0; i < n; i++) if (e[i] > peak) peak = e[i];
      if (!(peak > 0)) return 0;
      var count = 0, lastPeak = -99;
      for (i = 1; i < n - 1; i++) {
        if (e[i] >= e[i - 1] && e[i] > e[i + 1] && e[i] > thresh) {
          var l = e[i], r = e[i];
          for (j = i - 1; j >= 0 && e[j] <= l; j--) l = Math.min(l, e[j]);
          for (j = i + 1; j < n && e[j] <= r; j++) r = Math.min(r, e[j]);
          if (e[i] - Math.max(l, r) >= 0.10 * peak && (i - lastPeak) >= 9) {
            count++; lastPeak = i;
          }
        }
      }
      return count;
    }

    /* ---- Adaptive end-of-speech detection -------------------------------
       One fixed threshold cannot serve both a learner rattling the sentence off
       in two seconds and one placing each word deliberately with a two-second
       think between them: short enough to feel responsive for the first cuts
       the second off, and long enough for the second leaves the first waiting.

       So measure the individual instead. Watch the gaps this speaker is
       actually leaving BETWEEN words, and require an end-silence comfortably
       longer than their own longest so far. Someone speaking continuously gets
       a snappy ~1s finish; someone pausing a second between words is given over
       two. It can never cut a learner off mid-sentence for pausing the way they
       have already paused, which is the failure this replaces.

       The engine's 3s threshold stays as the backstop, and the mic button is a
       manual stop throughout.                                                */
    function paceWatcher(expectedSyllables, onDone) {
      var maxGapMs = 0, lastLoudT = -1, everLoud = false, fired = false, tick = 0;
      var MIN_END = 1000, MAX_END = 2800;
      var thresh = 0;   // per-watcher, NOT shared between captures
      var heard = 0;    // syllable nuclei detected so far
      return function (f) {
        if (fired) return null;
        var frames = f && f.frames;
        if (!frames || !frames.length) return null;
        // Re-derive a floor from the capture so far, every ~10 frames. Cheap,
        // and it tracks the room rather than assuming a fixed level.
        if ((tick++ % 10) === 0 || lastLoudT < 0) {
          var rs = [], i;
          for (i = 0; i < frames.length; i++) rs.push(frames[i].rms);
          rs.sort(function (a, b) { return a - b; });
          var p10 = rs[Math.floor(rs.length * 0.10)] || 0;
          var top = rs[rs.length - 1] || 0;
          // Bracketed by the loudest frame seen. A plain "p10 x 3.2" floor
          // collapses early in a capture, when the buffer is nearly all speech
          // and the 10th percentile IS speech — which would make the first word
          // register as silence and lose the gap measurements entirely.
          thresh = Math.min(top * 0.25, Math.max(top * 0.08, p10 * 3.2));
        }
        // How many syllables have we heard so far? Until the learner has
        // produced roughly the whole sentence we stay maximally patient,
        // because a long pause early on is far more likely to be someone
        // thinking than someone finished. This is what covers the bootstrap
        // case: a learner whose very FIRST pause is two seconds has left no
        // evidence yet for the adaptive rule to work from.
        if ((tick % 10) === 1 || heard === 0) {
          heard = countNuclei(frames, thresh);
        }
        var last = frames[frames.length - 1];
        var loud = last.rms >= thresh;
        if (loud) {
          if (everLoud && lastLoudT >= 0) {
            var gap = last.t - lastLoudT;
            // Only count gaps that are real pauses, not inter-frame jitter.
            if (gap > 150 && gap > maxGapMs) maxGapMs = gap;
          }
          lastLoudT = last.t;
          everLoud = true;
          return null;
        }
        if (!everLoud || lastLoudT < 0) return null;
        var satisfied = (heard >= expectedSyllables);
        var need = satisfied
          ? Math.max(MIN_END, Math.min(MAX_END, maxGapMs * 1.6 + 400))
          : MAX_END;
        if ((last.t - lastLoudT) >= need) {
          fired = true;
          onDone(need, maxGapMs, heard);
        }
        return null;
      };
    }

    return {
      analyse: analyse, segment: segment, condition: condition,
      declination: declination, vadFor: vadFor, median: median,
      paceWatcher: paceWatcher, scoreWithSweep: scoreWithSweep,
      countNuclei: countNuclei
    };
  })();
  window.tongueTwisterDsp = TTD;
  // Test hook: render a given analysis into the graph without a live capture.
  window.__ttShowGraph = function (out) { showGraph(out); };


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
      '#view-tonguetwister .tt-canvas-wrap{position:relative;width:100%;aspect-ratio:16/9;' +
        'background:var(--panel);border:2px solid var(--card-face-border);border-radius:14px;' +
        'overflow:hidden;}' +
      '#view-tonguetwister .tt-canvas-wrap canvas{width:100%;height:100%;display:block;' +
        'touch-action:manipulation;}' +
      '#view-tonguetwister .tt-canvas-hint{position:absolute;inset:0;display:flex;' +
        'align-items:center;justify-content:center;text-align:center;padding:1rem;' +
        'font-size:0.85rem;color:var(--ink-soft);pointer-events:none;}' +
      '#view-tonguetwister .tt-canvas-hint.hidden{display:none;}' +
      '#view-tonguetwister .tt-legend{display:flex;gap:0.9rem;justify-content:center;' +
        'flex-wrap:wrap;margin-top:0.45rem;font-size:0.72rem;color:var(--ink-soft);}' +
      '#view-tonguetwister .tt-lg{display:inline-flex;align-items:center;gap:0.3rem;}' +
      '#view-tonguetwister .tt-lg i{width:1.1rem;height:0;display:inline-block;}' +
      '#view-tonguetwister .tt-lg-solid{border-top:3px solid var(--accent);}' +
      '#view-tonguetwister .tt-lg-dash{border-top:2px dashed var(--ink-soft);}' +
      '#view-tonguetwister .tt-lg-ghost{border-top:2px dotted var(--accent);opacity:0.75;}' +
      '#view-tonguetwister .tt-lg-raw{border-top:1px solid var(--ink);opacity:0.25;}' +
      '#view-tonguetwister .tt-result{display:none;text-align:center;}' +
      '#view-tonguetwister .tt-result.show{display:block;}' +
      '#view-tonguetwister .tt-score{font-size:2.3rem;font-weight:700;line-height:1.1;' +
        'color:var(--ink);}' +
      '#view-tonguetwister .tt-verdict{font-size:0.92rem;color:var(--ink-soft);' +
        'margin-top:0.2rem;}' +
      '#view-tonguetwister .tt-status{text-align:center;font-size:0.85rem;' +
        'color:var(--ink-soft);line-height:1.55;margin-top:0.5rem;min-height:2.4em;}' +
      '#view-tonguetwister .tt-status.err{color:var(--bad,#d4623a);}' +
      '#view-tonguetwister .tone-mic-btn:disabled{opacity:0.45;cursor:default;}' +
      '#view-tonguetwister #tt-hear-btn{margin-top:0.6rem;}' +
      // Result colouring on the syllable chips: the tone colour is replaced by
      // a tier colour once an attempt has been scored.
      '#view-tonguetwister .tt-syl.scored{border-color:rgb(var(--tt-res-rgb));' +
        'background:rgba(var(--tt-res-rgb),0.14);}' +
      '#view-tonguetwister .tt-syl.scored .tt-syl-score{color:rgb(var(--tt-res-rgb));' +
        'font-weight:700;}';

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
          '<div class="tone-canvas-wrap tt-canvas-wrap">' +
            '<canvas id="tt-canvas"></canvas>' +
            '<div class="tt-canvas-hint" id="tt-canvas-hint">' +
              'Your pitch across the sentence will appear here.' +
            '</div>' +
          '</div>' +
          '<div class="tt-legend" id="tt-legend" hidden>' +
            '<span class="tt-lg"><i class="tt-lg-solid"></i>your pitch</span>' +
            '<span class="tt-lg"><i class="tt-lg-dash"></i>target shape</span>' +
            '<span class="tt-lg"><i class="tt-lg-ghost"></i>what was scored</span>' +
            '<span class="tt-lg"><i class="tt-lg-raw"></i>raw mic track</span>' +
          '</div>' +
        '</div>' +

        '<div class="menu-section">' +
          '<div class="tt-result" id="tt-result">' +
            '<div class="tt-score" id="tt-score"></div>' +
            '<div class="tt-verdict" id="tt-verdict"></div>' +
          '</div>' +
          '<div class="tt-status" id="tt-status">Tap the microphone and say the whole sentence.</div>' +
        '</div>' +

        '<div class="menu-section tone-controls">' +
          '<button type="button" class="tone-mic-btn" id="tt-mic-btn">' +
            '<span class="tone-mic-icon">\uD83C\uDFA4</span>' +
            '<span class="tone-mic-label">Tap to speak</span>' +
          '</button>' +
          '<button type="button" class="tt-listen" id="tt-hear-btn" hidden>' +
            '<span>\u21BA</span><span>Hear yourself</span>' +
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
    clearResult();
    setStatus('Tap the microphone and say the sentence. There\u2019s no rush \u2014 you can pause between words.');
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
     RECORDING + REVIEW
     ----------------------------------------------------------------------
     Drives the SHARED capture engine (window.toneDsp.createCapture) — this
     module contains no mic loop, no VAD and no pitch reading of its own, which
     is the same contract the Tone Challenge follows. The only thing it supplies
     is a sentence-shaped VAD policy (TTD.vadFor), measured from native
     recordings rather than guessed.
     ====================================================================== */
  var capture = null;        // shared capture instance, created on first use
  var recording = false;
  var lastResult = null;

  // Tier bands reused from the Tone Challenge so the two modes speak the same
  // language, with the same colours the tone chips already use.
  var TIERS = [
    { min: 90, label: 'Perfect', rgb: '34,150,80' },
    { min: 75, label: 'Great',   rgb: '74,157,95' },
    { min: 60, label: 'Good',    rgb: '190,150,40' },
    { min: 40, label: 'Close',   rgb: '212,120,58' },
    { min: 0,  label: 'Off',     rgb: '200,70,60' }
  ];
  function tierFor(pct) {
    for (var i = 0; i < TIERS.length; i++) if (pct >= TIERS[i].min) return TIERS[i];
    return TIERS[TIERS.length - 1];
  }


  /* ======================================================================
     PITCH GRAPH
     ----------------------------------------------------------------------
     Shows the whole sentence as one contour, divided into syllables, with
     each syllable's target shape drawn over it.

     It deliberately draws THREE things, because the useful question is not
     just "what did I say" but "why was it scored that way":
       - solid, tier-coloured : what the microphone heard (raw)
       - dashed grey          : the target shape for that tone
       - dotted, faint        : the contour actually handed to the tone model,
                                after octave repair, edge trimming, resampling
                                and declination correction
     When the solid and dotted lines diverge, the score disagrees with your
     ear because the conditioning changed the shape — and that is visible
     rather than having to be guessed at.

     Axis and colours follow the Tone Trainer so the two modes read the same:
     semitones relative to the speaker's centre, faint bands above +3 and
     below -3, a solid line at the centre.
     ====================================================================== */
  var canvasEl = null, canvasCtx = null, canvasDpr = 1;
  var graphData = null;       // { centre, results, twister } or null
  var graphHitZones = [];     // [{x0,x1,index}] for tap-to-play

  function cssVar(name, fallback) {
    try {
      var v = getComputedStyle(document.documentElement).getPropertyValue(name);
      return (v && v.trim()) || fallback;
    } catch (e) { return fallback; }
  }

  function sizeCanvas() {
    if (!canvasEl) return false;
    var r = canvasEl.getBoundingClientRect();
    if (!r.width || !r.height) return false;
    canvasDpr = Math.min(3, window.devicePixelRatio || 1);
    var w = Math.round(r.width * canvasDpr), h = Math.round(r.height * canvasDpr);
    if (canvasEl.width !== w || canvasEl.height !== h) { canvasEl.width = w; canvasEl.height = h; }
    return true;
  }

  // Vertical span: always cover the target shapes and the actual contour, with
  // a sensible minimum so a flat mid tone doesn't fill the whole canvas.
  function spanOf(vals) {
    var lo = -7, hi = 7, i;
    for (i = 0; i < vals.length; i++) {
      if (vals[i] < lo) lo = vals[i];
      if (vals[i] > hi) hi = vals[i];
    }
    lo = Math.max(lo, -20); hi = Math.min(hi, 20);
    var pad = Math.max(1.5, (hi - lo) * 0.12);
    return { lo: lo - pad, hi: hi + pad };
  }

  function drawGraph() {
    if (!canvasEl || !canvasCtx || !sizeCanvas()) return;
    var ctx = canvasCtx, W = canvasEl.width, H = canvasEl.height, dpr = canvasDpr;
    ctx.clearRect(0, 0, W, H);
    graphHitZones = [];
    if (!graphData || !graphData.results.length) return;

    var inkSoft = cssVar('--ink-soft', '#6b5d44');
    var ink = cssVar('--ink', '#2b2418');
    var accent = cssVar('--accent', '#b8893a');
    var border = cssVar('--card-face-border', '#d4b87a');

    var centre = graphData.centre, res = graphData.results, tw = graphData.twister;
    var st = function (hz) { return 12 * Math.log2(hz / centre); };

    // Collect every value that will be plotted so the axis fits all of them.
    var vals = [], i, k;
    for (i = 0; i < res.length; i++) {
      for (k = 0; k < res[i].raw.length; k++) vals.push(st(res[i].raw[k].hz));
      var ref = window.toneDsp.TONE_REFS[tw.syllables[i].tone];
      if (ref) for (k = 0; k < ref.shape.length; k++) vals.push(ref.shape[k]);
    }
    var span = spanOf(vals);

    var gutter = Math.round(34 * dpr);
    var footer = Math.round(26 * dpr);
    var header = Math.round(16 * dpr);
    var plotW = Math.max(10, W - gutter - Math.round(4 * dpr));
    var plotH = Math.max(10, H - footer - header);
    var yOf = function (v) { return header + plotH * (span.hi - v) / (span.hi - span.lo); };
    var fs = Math.round(10 * dpr);

    // High / low bands + guide lines.
    ctx.globalAlpha = 0.07; ctx.fillStyle = accent;
    if (span.hi > 3) ctx.fillRect(gutter, yOf(span.hi), plotW, Math.max(0, yOf(3) - yOf(span.hi)));
    if (span.lo < -3) ctx.fillRect(gutter, yOf(-3), plotW, Math.max(0, yOf(span.lo) - yOf(-3)));
    ctx.globalAlpha = 1;
    ctx.strokeStyle = border; ctx.lineWidth = 1 * dpr;
    var guides = [[3, 0.30], [-3, 0.30], [0, 0.65]];
    for (i = 0; i < guides.length; i++) {
      if (guides[i][0] > span.hi || guides[i][0] < span.lo) continue;
      ctx.globalAlpha = guides[i][1];
      ctx.setLineDash(guides[i][0] === 0 ? [] : [3 * dpr, 5 * dpr]);
      ctx.beginPath(); ctx.moveTo(gutter, yOf(guides[i][0])); ctx.lineTo(W, yOf(guides[i][0])); ctx.stroke();
    }
    ctx.setLineDash([]); ctx.globalAlpha = 1;

    // Left axis labels.
    ctx.fillStyle = inkSoft; ctx.globalAlpha = 0.85;
    ctx.font = '600 ' + fs + 'px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    if (span.hi > 4.5) ctx.fillText('High', 2 * dpr, yOf(Math.min(span.hi - 0.8, 5.5)));
    ctx.fillText('Mid', 2 * dpr, yOf(0));
    if (span.lo < -4.5) ctx.fillText('Low', 2 * dpr, yOf(Math.max(span.lo + 0.8, -5.5)));
    ctx.globalAlpha = 1;

    // Lay syllables out on REAL TIME, but compress the silence between them so
    // a long think between words doesn't squeeze the contours into slivers.
    var GAPPX = Math.round(10 * dpr);
    var totalVoiced = 0;
    for (i = 0; i < res.length; i++) totalVoiced += Math.max(60, res[i].endMs - res[i].startMs);
    var usable = plotW - GAPPX * (res.length - 1) - Math.round(6 * dpr);
    var x = gutter + Math.round(3 * dpr);

    for (i = 0; i < res.length; i++) {
      var r = res[i];
      var durMs = Math.max(60, r.endMs - r.startMs);
      var wSyl = Math.max(8 * dpr, usable * durMs / totalVoiced);
      var tier = tierFor(r.percent);
      graphHitZones.push({ x0: x / dpr, x1: (x + wSyl) / dpr, index: i });

      // Alternating band so syllables are separable at a glance.
      if (i % 2 === 1) {
        ctx.globalAlpha = 0.05; ctx.fillStyle = ink;
        ctx.fillRect(x, header, wSyl, plotH); ctx.globalAlpha = 1;
      }

      // Target shape for this syllable (dashed).
      var ref = window.toneDsp.TONE_REFS[tw.syllables[i].tone];
      if (ref && ref.shape.length > 1) {
        ctx.strokeStyle = inkSoft; ctx.globalAlpha = 0.55;
        ctx.lineWidth = 1.6 * dpr; ctx.setLineDash([4 * dpr, 4 * dpr]);
        ctx.beginPath();
        for (k = 0; k < ref.shape.length; k++) {
          var xr = x + wSyl * k / (ref.shape.length - 1), yr = yOf(ref.shape[k]);
          if (k === 0) ctx.moveTo(xr, yr); else ctx.lineTo(xr, yr);
        }
        ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
      }

      // What the model actually scored (dotted, faint).
      if (r.scored && r.scored.length > 1) {
        // Tier-coloured rather than grey, so it cannot be confused with the
        // grey dashed target line sitting next to it.
        ctx.strokeStyle = 'rgb(' + tier.rgb + ')'; ctx.globalAlpha = 0.5;
        ctx.lineWidth = 1.8 * dpr; ctx.setLineDash([1.5 * dpr, 3.5 * dpr]);
        ctx.beginPath();
        for (k = 0; k < r.scored.length; k++) {
          var xs = x + wSyl * k / (r.scored.length - 1), ys = yOf(st(r.scored[k].hz));
          if (k === 0) ctx.moveTo(xs, ys); else ctx.lineTo(xs, ys);
        }
        ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
      }

      // Raw track as a hairline. Kept visible on purpose: the vertical spikes
      // it shows are octave errors from the pitch tracker, and whether the
      // repair below catches all of them varies slightly between attempts —
      // which is the most likely reason the same pronunciation can score very
      // differently twice running. Faint enough to ignore, present enough to
      // diagnose.
      if (r.raw && r.raw.length > 1) {
        ctx.strokeStyle = ink; ctx.globalAlpha = 0.18;
        ctx.lineWidth = 1 * dpr;
        ctx.beginPath();
        var tr0 = r.raw[0].t, trS = Math.max(1, r.raw[r.raw.length - 1].t - tr0);
        var st0 = false;
        for (k = 0; k < r.raw.length; k++) {
          var xr2 = x + wSyl * (r.raw[k].t - tr0) / trS, yr2 = yOf(st(r.raw[k].hz));
          if (st0 && k > 0 && (r.raw[k].t - r.raw[k - 1].t) > 60) { ctx.stroke(); ctx.beginPath(); st0 = false; }
          if (!st0) { ctx.moveTo(xr2, yr2); st0 = true; } else ctx.lineTo(xr2, yr2);
        }
        ctx.stroke(); ctx.globalAlpha = 1;
      }

      // What you said, with tracker artefacts repaired (solid, tier-coloured).
      if (r.points && r.points.length > 1) {
        ctx.strokeStyle = 'rgb(' + tier.rgb + ')';
        ctx.lineWidth = 2.6 * dpr;
        ctx.lineJoin = 'round'; ctx.lineCap = 'round';
        ctx.beginPath();
        for (k = 0; k < r.points.length; k++) {
          var xp = x + wSyl * k / (r.points.length - 1), yp = yOf(st(r.points[k].hz));
          if (k === 0) ctx.moveTo(xp, yp); else ctx.lineTo(xp, yp);
        }
        ctx.stroke();
      }

      // Score above, Thai below.
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgb(' + tier.rgb + ')';
      ctx.font = '700 ' + fs + 'px system-ui, -apple-system, sans-serif';
      ctx.textBaseline = 'top';
      ctx.fillText(r.percent + '%', x + wSyl / 2, 2 * dpr);
      ctx.fillStyle = r.isTarget ? inkSoft : 'rgb(' + tier.rgb + ')';
      ctx.font = (r.isTarget ? '400 ' : '700 ') + Math.round(12 * dpr) +
                 'px system-ui, -apple-system, sans-serif';
      ctx.textBaseline = 'bottom';
      ctx.fillText(tw.syllables[i].th, x + wSyl / 2, H - 2 * dpr);

      // Divider.
      if (i < res.length - 1) {
        ctx.strokeStyle = border; ctx.globalAlpha = 0.7; ctx.lineWidth = 1 * dpr;
        ctx.beginPath();
        ctx.moveTo(x + wSyl + GAPPX / 2, header);
        ctx.lineTo(x + wSyl + GAPPX / 2, header + plotH);
        ctx.stroke(); ctx.globalAlpha = 1;
      }
      x += wSyl + GAPPX;
    }
  }

  function showGraph(out) {
    graphData = out ? { centre: out.centre, results: out.results, twister: activeTwister } : null;
    var hint = $('tt-canvas-hint');
    if (hint) hint.classList.toggle('hidden', !!out);
    var lg = $('tt-legend');
    if (lg) lg.hidden = !out;
    drawGraph();
  }

  function setStatus(msg, isErr) {
    var el = $('tt-status');
    if (!el) return;
    el.textContent = msg || '';
    el.classList.toggle('err', !!isErr);
  }
  function setMicLabel(txt, on) {
    var b = $('tt-mic-btn');
    if (!b) return;
    b.classList.toggle('recording', !!on);
    var l = b.querySelector('.tone-mic-label');
    if (l) l.textContent = txt;
  }

  // Clear any previous result from the syllable chips, restoring tone colours.
  function clearResult() {
    lastResult = null;
    showGraph(null);
    var res = $('tt-result');
    if (res) res.classList.remove('show');
    var hear = $('tt-hear-btn');
    if (hear) hear.hidden = true;
    var view = $('view-tonguetwister');
    if (!view) return;
    view.querySelectorAll('.tt-syl').forEach(function (cell) {
      cell.classList.remove('scored');
      cell.style.removeProperty('--tt-res-rgb');
      var sc = cell.querySelector('.tt-syl-score');
      if (sc) sc.textContent = '';
    });
  }

  function getCapture() {
    if (!capture) {
      if (!window.toneDsp || typeof window.toneDsp.createCapture !== 'function') return null;
      capture = window.toneDsp.createCapture();
    }
    return capture;
  }

  function startRecording() {
    if (recording || !activeTwister) return;
    var prof = activeProfile();
    if (!prof) { setStatus('Choose a voice profile first.', true); return; }
    var cap = getCapture();
    if (!cap) { setStatus('The tone engine didn\u2019t load.', true); return; }

    stopAudio();
    clearResult();
    recording = true;
    setMicLabel('Tap to stop', true);
    setStatus('Listening\u2026 take your time. Pause between words if you like, and tap again when you\u2019re done.');

    // The engine's own thresholds are deliberately patient (3s); this watcher
    // decides when THIS speaker has finished, from the pauses they are actually
    // leaving. See TTD.paceWatcher.
    var watch = TTD.paceWatcher(activeTwister.syllables.length, function () {
      if (recording) { try { cap.stop('done'); } catch (e) {} }
    });

    cap.start({
      centreHint: prof.centerHz > 0 ? prof.centerHz : 0,
      vad: TTD.vadFor(activeTwister),
      onFrame: watch,
      onEnd: function (res) { onCaptureEnd(res, prof); }
    }).catch(function () {
      recording = false;
      setMicLabel('Tap to speak', false);
      setStatus('Couldn\u2019t reach the microphone. Check that the app is allowed to use it.', true);
    });
  }

  function stopRecording() {
    var cap = getCapture();
    if (cap && recording) { try { cap.stop('user'); } catch (e) {} }
  }

  function onCaptureEnd(res, prof) {
    recording = false;
    setMicLabel('Tap to speak', false);
    var frames = (res && res.frames) || [];
    if (res && res.reason === 'nospeech') {
      setStatus('I didn\u2019t hear anything. Tap the microphone and speak clearly.', true);
      return;
    }
    var out = TTD.analyse(frames, (res && res.threshold) || 0,
                          prof.centerHz > 0 ? prof.centerHz : 0, activeTwister);
    if (!out.ok) {
      // Report what went wrong rather than showing a confident wrong breakdown.
      var n = activeTwister.syllables.length;
      if (out.reason === 'count') {
        setStatus('I heard about ' + out.heard + ' syllables but expected ' + n +
                  '. Try saying the whole sentence once, at an even pace.', true);
      } else if (out.reason === 'nospeech' || out.reason === 'tooshort') {
        setStatus('That was too short to read. Tap the microphone and say the whole sentence.', true);
      } else {
        setStatus('Something went wrong analysing that attempt. Please try again.', true);
      }
      return;
    }
    lastResult = out;
    renderResult(out);
    showGraph(out);
  }

  function renderResult(out) {
    var tier = tierFor(out.percent);
    var res = $('tt-result');
    if (res) res.classList.add('show');
    var sc = $('tt-score');
    if (sc) { sc.textContent = out.percent + '%'; sc.style.color = 'rgb(' + tier.rgb + ')'; }
    var vd = $('tt-verdict');
    if (vd) vd.textContent = tier.label + ' \u2014 ' + out.hits + ' of ' + out.count + ' tones correct';

    var view = $('view-tonguetwister');
    if (view) {
      var cells = view.querySelectorAll('.tt-syl');
      out.results.forEach(function (r, i) {
        var cell = cells[i];
        if (!cell) return;
        var t = tierFor(r.percent);
        cell.classList.add('scored');
        cell.style.setProperty('--tt-res-rgb', t.rgb);
        var el = cell.querySelector('.tt-syl-score');
        if (el) el.textContent = r.percent + '%';
        // Tapping a chip replays just that syllable of the learner's own attempt.
        cell.style.cursor = 'pointer';
        cell.onclick = function () {
          var cap = getCapture();
          if (cap && cap.hasAudio()) cap.playLast(r.startMs, r.endMs);
        };
      });
    }

    var hear = $('tt-hear-btn');
    var cap = getCapture();
    if (hear) hear.hidden = !(cap && cap.hasAudio());

    var weak = out.results.slice().sort(function (a, b) { return a.percent - b.percent; })[0];
    if (out.hits === out.count) {
      setStatus('Every tone landed. Try it a little faster.');
    } else if (weak) {
      var syl = activeTwister.syllables[weak.index];
      setStatus('Weakest syllable: ' + syl.th + ' (' + syl.rom + ') \u2014 it should be ' +
                (TONE_LABEL[syl.tone] ? TONE_LABEL[syl.tone].en.toLowerCase() : syl.tone) +
                '. Tap any syllable to hear how you said it.');
    }
    persist();
    // Best score per twister.
    var best = bestScores();
    if (!best[activeTwister.id] || out.percent > best[activeTwister.id]) {
      best[activeTwister.id] = out.percent;
      persist();
    }
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

    canvasEl = $('tt-canvas');
    if (canvasEl && canvasEl.getContext) {
      canvasCtx = canvasEl.getContext('2d');
      // Tapping a syllable on the graph replays that syllable, matching the
      // chips below — one behaviour, two places to reach it.
      canvasEl.addEventListener('click', function (e) {
        if (!graphHitZones.length) return;
        var r = canvasEl.getBoundingClientRect();
        var px = e.clientX - r.left;
        for (var i = 0; i < graphHitZones.length; i++) {
          var z = graphHitZones[i];
          if (px >= z.x0 && px <= z.x1) {
            var res = graphData && graphData.results[z.index];
            var cap = getCapture();
            if (res && cap && cap.hasAudio()) cap.playLast(res.startMs, res.endMs);
            return;
          }
        }
      });
      window.addEventListener('resize', function () { if (graphData) drawGraph(); });
    }

    var mic = $('tt-mic-btn');
    if (mic) mic.addEventListener('click', function () {
      if (recording) stopRecording(); else startRecording();
    });
    var hear = $('tt-hear-btn');
    if (hear) hear.addEventListener('click', function () {
      var cap = getCapture();
      if (cap && cap.hasAudio()) cap.playLast(-1, -1);
    });

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
    stopRecording();
    clearResult();
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
    recording = false;
    // Release the mic, the way teardownTone does — leaving it open would keep
    // the recording indicator lit after the learner has navigated away.
    if (capture) { try { capture.release(); } catch (e) {} capture = null; }
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

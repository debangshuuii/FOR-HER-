/* Sorry, Sunlight — client-only interaction logic. No tracking, no backend. */
(function () {
  "use strict";

  var cfg = window.apologyConfig || {};
  var NAME = cfg.name || "Sunlight";
  var PHOTOS = Array.isArray(cfg.photos) ? cfg.photos : [];
  var NO_LABELS = Array.isArray(cfg.noLabels) && cfg.noLabels.length ? cfg.noLabels : ["Don't talk to me"];
  var WAITING = Array.isArray(cfg.waitingLines) && cfg.waitingLines.length
    ? cfg.waitingLines
    : ["I'm still here."];

  // ---------- DOM ----------
  function $(id) { return document.getElementById(id); }
  var herName = $("her-name"), apologyText = $("apology-text"),
    timerValue = $("timer-value"), waitingLine = $("waiting-line"),
    photoArea = $("photo-area"), photoImg = $("photo-img"),
    photoFallback = $("photo-fallback"), fallbackText = $("fallback-text"),
    complimentText = $("compliment-text"), photoCount = $("photo-count"),
    finalNote = $("final-note"), finalApologyText = $("final-apology-text"),
    gentleExit = $("gentle-exit"),
    btnTalk = $("btn-talk"), btnNo = $("btn-no"), btnLater = $("btn-later"),
    btnMusic = $("btn-music"), btnClose = $("btn-close"),
    mainCard = $("main-card"), successCard = $("success-card"),
    finalTime = $("final-time"), contactRow = $("contact-row"),
    contactEmpty = $("contact-empty");

  // ---------- Personalize ----------
  document.title = "Sorry, " + NAME + " ☀️";
  herName.textContent = NAME;
  apologyText.textContent = cfg.apology || "";
  finalApologyText.textContent = cfg.apology || "";
  fallbackText.textContent = "A flower for you, " + NAME + ", while I wait.";

  // ---------- Timer (session only, resets on refresh) ----------
  var startAt = Date.now(), elapsed = 0, frozen = null, waitIdx = 0;

  function fmt(total) {
    total = Math.max(0, Math.floor(total));
    var h = Math.floor(total / 3600), m = Math.floor((total % 3600) / 60), s = total % 60;
    function unit(n, w) { return n + " " + w + (n === 1 ? "" : "s"); }
    if (h > 0) {
      var parts = [unit(h, "hour")];
      if (m > 0) parts.push(unit(m, "minute"));
      if (s > 0) parts.push(unit(s, "second"));
      return parts.join(" ");
    }
    if (m > 0) {
      if (s === 0) return unit(m, "minute");
      return unit(m, "minute") + " " + unit(s, "second");
    }
    return unit(s, "second");
  }

  function tick() {
    if (frozen !== null) return;
    elapsed = (Date.now() - startAt) / 1000;
    timerValue.textContent = fmt(elapsed);
  }
  setInterval(tick, 500);
  tick();

  // Rotate gentle waiting lines with a soft fade
  setInterval(function () {
    if (frozen !== null) return;
    waitIdx = (waitIdx + 1) % WAITING.length;
    waitingLine.classList.add("fade");
    setTimeout(function () {
      waitingLine.textContent = WAITING[waitIdx];
      waitingLine.classList.remove("fade");
    }, 450);
  }, 8000);

  // ---------- Petals (lightweight, skips on reduced motion) ----------
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  (function petals() {
    if (reduceMotion) return;
    var box = $("petals");
    var N = window.innerWidth < 480 ? 14 : 20;
    var kinds = ["", "peach", "gold"];
    for (var i = 0; i < N; i++) {
      var p = document.createElement("span");
      var size = 9 + Math.random() * 13;
      p.className = "petal " + kinds[i % kinds.length];
      p.style.left = Math.random() * 100 + "vw";
      p.style.width = size + "px";
      p.style.height = size * (0.75 + Math.random() * 0.4) + "px";
      p.style.setProperty("--po", (0.3 + Math.random() * 0.45).toFixed(2));
      p.style.setProperty("--drift", ((Math.random() - 0.5) * 140).toFixed(0) + "px");
      p.style.animationDuration = (9 + Math.random() * 9).toFixed(1) + "s";
      p.style.animationDelay = (-Math.random() * 14).toFixed(1) + "s";
      box.appendChild(p);
    }
  })();

  // ---------- Playful “No” flow — never coercive, always escapable ----------
  var noCount = 0; // number of “no” taps
  var photoIndex = -1;
  var interacted = false;

  function revealMusic() {
    if (interacted) return;
    interacted = true;
    btnMusic.hidden = false;
  }

  function setNoLabel() {
    var idx = Math.min(noCount, NO_LABELS.length - 1);
    btnNo.textContent = NO_LABELS[idx] || NO_LABELS[NO_LABELS.length - 1];
  }

  function scaleButtons() {
    var step = Math.min(noCount, 4);
    btnTalk.className = "btn btn-primary" + (step > 0 ? " grow-" + (step === 4 ? "max" : step) : "");
    btnNo.className = "btn btn-ghost" + (step > 0 ? " shrink-" + (step === 4 ? "max" : step) : "");
  }

  function showPhoto(i) {
    var item = PHOTOS[i];
    if (!item) return;
    photoArea.hidden = false;
    // restart fade animation
    complimentText.style.animation = "none";
    photoImg.style.animation = "none";
    void complimentText.offsetWidth;
    complimentText.style.animation = "";
    photoImg.style.animation = "";

    complimentText.textContent = item.compliment || "";
    photoCount.textContent = "Memory " + (i + 1) + " of " + PHOTOS.length;
    photoFallback.hidden = true;
    photoImg.hidden = false;
    photoImg.alt = item.alt || ("A flower for " + NAME + " — photo " + (i + 1));
    photoImg.onerror = function () {
      photoImg.hidden = true;
      photoFallback.hidden = false;
    };
    // cache-bust-proof assignment (re-set to trigger load/error reliably)
    var src = item.src || "";
    photoImg.removeAttribute("src");
    if (src) photoImg.src = src;
    else photoImg.onerror();
  }

  function showFinal() {
    photoArea.hidden = true;
    finalNote.hidden = false;
    btnLater.hidden = false;
    waitingLine.textContent = "No pressure. Take your time. ❤️";
  }

  btnNo.addEventListener("click", function () {
    revealMusic();
    noCount += 1;
    setNoLabel();
    scaleButtons();

    if (PHOTOS.length === 0) {
      showFinal();
      return;
    }
    if (photoIndex + 1 < PHOTOS.length) {
      photoIndex += 1;
      showPhoto(photoIndex);
      if (photoIndex === PHOTOS.length - 1) {
        // last photo shown — next tap goes to final note; hint it gently
        setTimeout(function () {
          if (photoIndex === PHOTOS.length - 1 && finalNote.hidden) {
            waitingLine.textContent = "Okay… I'm running out of arguments.";
          }
        }, 2500);
      }
    } else {
      showFinal();
    }
  });

  btnLater.addEventListener("click", function () {
    revealMusic();
    gentleExit.hidden = false;
    btnLater.hidden = true;
    gentleExit.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
  });

  // ---------- “Talk to me” → success + blooming flower ----------
  btnTalk.addEventListener("click", function () {
    revealMusic();
    frozen = elapsed;
    finalTime.textContent = fmt(frozen);
    mainCard.hidden = true;
    successCard.hidden = false;
    wireContacts();
    // trigger bloom animation on next frame
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { successCard.classList.add("play"); });
    });
    successCard.scrollIntoView({ behavior: "auto", block: "start" });
    window.scrollTo(0, 0);
  });

  // ---------- Contact options (hidden when not configured) ----------
  function wireContacts() {
    var shown = 0;
    function setLink(el, href) {
      if (href) { el.href = href; el.style.display = ""; shown++; }
      else { el.style.display = "none"; }
    }
    var insta = (cfg.instagram || "").replace(/^@/, "").trim();
    var phone = (cfg.phone || "").trim();
    var waLink = (cfg.whatsappLink || "").trim();
    var wa = (cfg.whatsapp || "").replace(/\D/g, "");
    if (!waLink && wa) waLink = "https://wa.me/" + wa;

    setLink($("contact-insta"), insta ? "https://instagram.com/" + encodeURIComponent(insta) : "");
    setLink($("contact-call"), phone ? "tel:" + phone.replace(/\s/g, "") : "");
    setLink($("contact-wa"), waLink || "");
    contactEmpty.hidden = shown > 0;
    contactRow.style.display = shown > 0 ? "" : "none";
  }

  // ---------- Music: gentle, opt-in only, never autoplay ----------
  var audioCtx = null, padNodes = null, musicOn = false, fileAudio = null;

  function stopPad() {
    if (padNodes) {
      try { padNodes.gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.6); } catch (e) {}
      var old = padNodes;
      setTimeout(function () { try { old.nodes.forEach(function (o) { o.stop(); }); } catch (e) {} }, 800);
      padNodes = null;
    }
    if (fileAudio) { try { fileAudio.pause(); } catch (e) {} }
  }

  function startPad() {
    var src = (cfg.musicSrc || "").trim();
    if (src && !fileAudio) {
      fileAudio = new Audio(src);
      fileAudio.loop = true;
      fileAudio.volume = 0.35;
      fileAudio.onerror = function () {
        // fall back to synth pad if file missing
        fileAudio = null;
        startSynth();
      };
    }
    if (src && fileAudio) {
      fileAudio.play().catch(function () { startSynth(); });
      return;
    }
    startSynth();
  }

  function startSynth() {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === "suspended") audioCtx.resume();
      stopPad();
      var gain = audioCtx.createGain();
      gain.gain.value = 0;
      gain.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 2);
      var filter = audioCtx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 900;
      gain.connect(filter);
      filter.connect(audioCtx.destination);
      var freqs = [174, 220, 261.63, 329.63]; // soft F major pad
      var oscs = freqs.map(function (f, i) {
        var o = audioCtx.createOscillator();
        o.type = "sine";
        o.frequency.value = f;
        o.detune.value = (i - 1.5) * 3;
        o.connect(gain);
        o.start();
        return o;
      });
      padNodes = { gain: gain, nodes: oscs };
    } catch (e) { /* music is optional — continue silently */ }
  }

  btnMusic.addEventListener("click", function () {
    revealMusic();
    musicOn = !musicOn;
    btnMusic.setAttribute("aria-pressed", musicOn ? "true" : "false");
    btnMusic.innerHTML = musicOn
      ? '<span aria-hidden="true">🔊</span> Music: on'
      : '<span aria-hidden="true">🔇</span> Music: off';
    if (musicOn) startPad();
    else stopPad();
  });

  // ---------- Respectful close ----------
  btnClose.addEventListener("click", function () {
    gentleExit.hidden = false;
    gentleExit.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
    try { window.close(); } catch (e) {}
  });

  // keyboard: Escape reveals the gentle exit instead of trapping anyone
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !mainCard.hidden) {
      gentleExit.hidden = false;
    }
  });
})();

/* ============================================================
   Sorry, Sunlight ☀️ — central configuration
   Edit ONLY this file to personalize the whole site.
   No tracking, no backend. Everything stays in the browser.
   ============================================================ */
window.apologyConfig = {
  // Shown as “I'm sorry, NAME.” — use a nickname to keep it private
  name: "Sunlight",

  // Your genuine apology. 2–4 sincere sentences work best.
  apology:
    "I'm genuinely sorry for what I did. I understand why it hurt you, and I wish I had handled things differently. I'm not asking you to forget it — I just wanted you to know that I'm sorry.",

  // Contact options — leave any empty ("") to hide that button.
  // Instagram: just the username, no @, no URL
  instagram: "",
  // Call: full tel number, e.g. "+15551234567"
  phone: "",
  // WhatsApp: full international number without +, e.g. "15551234567"
  // Optionally set whatsappLink directly to a full https://wa.me/... URL
  whatsapp: "",
  whatsappLink: "",

  // Optional background music file, e.g. "music/soft.mp3"
  // Leave empty to use the built-in gentle synth pad (no file needed).
  // Music NEVER autoplays — it only starts if they tap the music toggle.
  musicSrc: "",

  // Photos + compliments for the playful “Don't talk to me” sequence.
  // Keep compliments focused on personality / smile / kindness / energy.
  // Avoid appearance/body-focused lines.
  // Replace src with your own files in the photos/ folder.
  photos: [
    {
      src: "photos/photo1.svg",
      alt: "Soft pink flowers",
      compliment: "Okay… but that smile still makes my whole day better."
    },
    {
      src: "photos/photo2.svg",
      alt: "Soft peach blossoms",
      compliment: "I may be biased, but you're genuinely one of my favorite people."
    },
    {
      src: "photos/photo3.svg",
      alt: "Small wildflowers",
      compliment: "Still sorry. Still thinking about you."
    },
    {
      src: "photos/photo4.svg",
      alt: "Cherry blossom branch",
      compliment: "Okay, I'll stop being dramatic now."
    },
    {
      src: "photos/photo5.svg",
      alt: "Single rose petal",
      compliment: "No clever line this time. Just… I'm sorry."
    }
  ],

  // Labels for the “Don't talk to me” button, one per tap.
  // Length should be photos.length + 1 (last one is the resigned one).
  noLabels: [
    "Don't talk to me",
    "Are you sure?",
    "Really?",
    "Still no?",
    "Last chance…",
    "Okay, I get it 😭"
  ],

  // Slowly rotating lines under the timer. Keep them gentle.
  waitingLines: [
    "I'm still here.",
    "Still hoping you'll talk to me.",
    "I brought snacks. 🍪",
    "Okay… I'm still waiting.",
    "Not going anywhere until I finish saying sorry.",
    "Still sorry."
  ]
};

/* ElektroPunkt – ShopBot (Bedingung B)
 * Kein echtes KI-Modell: Der Bot erkennt Stichwörter (auch Wortendungen, Zahlwörter beim Budget)
 * und stellt feste Fragen. Am Ende empfiehlt er immer dieselben Produkte. */
(function () {
const GREETING = "Hallo! 👋 Wie kann ich Ihnen heute helfen? Wonach suchen Sie?";
/** German input made comparable: umlauts written out, everything else to spaces. */
const norm = (s) =>
  s
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const rxCache = new Map();
/** Word-aware keyword test. A trailing "*" also accepts word endings (lauf* → läuft, laufen). */
const has = (s, words) => {
  for (const w of words) {
    let re = rxCache.get(w);
    if (!re) {
      const stem = w.endsWith("*");
      const base = (stem ? w.slice(0, -1) : w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      re = new RegExp(stem ? `\\b${base}\\w*` : `\\b${base}\\b`);
      rxCache.set(w, re);
    }
    if (re.test(s)) return true;
  }
  return false;
};

const WORD_NUMBERS = [
  ["einhundert", "100"],
  ["hundert", "100"],
  ["neunzig", "90"],
  ["achtzig", "80"],
  ["siebzig", "70"],
  ["sechzig", "60"],
  ["fuenfzig", "50"],
  ["vierzig", "40"],
  ["dreissig", "30"],
  ["zwanzig", "20"],
];

const budgetOf = (s) => {
  const expanded = WORD_NUMBERS.reduce(
    (acc, [word, digits]) => acc.replace(new RegExp(`\\b${word}\\b`), digits),
    s,
  );
  for (const raw of expanded.match(/\d{1,4}/g) || []) {
    const value = Number(raw);
    if (value >= 10 && value <= 5000) return `Budget bis ca. ${value}€`;
  }
  if (
    has(s, [
      "guenstig*",
      "gunstig*",
      "billig*",
      "preiswert*",
      "sparsam*",
      "nicht so teuer",
      "nicht viel geld",
      "kleines budget",
      "budget egal",
      "preis leistungs*",
    ])
  )
    return "Budget notiert";
  return null;
};

const TOPICS = [
  {
    key: "need",
    question: "Wonach suchen Sie genau?",
    match: (s) =>
      has(s, [
        "kopfh*",
        "kophorer",
        "kophrer",
        "headphone*",
        "headset*",
        "earbud*",
        "buds",
        "ohrhrer",
        "oehrer",
        "hoerer",
        "ohrstoepsel*",
        "stoepsel*",
        "musik",
        "audio*",
        "hoer*",
      ])
        ? "Sie suchen Kopfhörer"
        : null,
  },
  {
    key: "use",
    question: "Wofür möchten Sie die Kopfhörer hauptsächlich nutzen – Sport, Pendeln oder zu Hause?",
    match: (s) => {
      if (
        has(s, [
          "sport*",
          "laufen",
          "lauft",
          "laeuft",
          "laeufer*",
          "jog*",
          "run",
          "running",
          "training",
          "trainier*",
          "gym*",
          "fitness",
          "workout",
          "rad",
          "fahrrad",
          "cycling",
          "bike",
          "marathon",
          "schwimm*",
          "swim*",
          "wandern",
          "yoga",
          "cardio",
          "aerobic",
          "hiking",
          "home trainer",
        ])
      )
        return "für den Sport";
      if (
        has(s, [
          "pendel*",
          "bahn*",
          "zug*",
          "zueg*",
          "strassenbahn",
          "tram",
          "bus",
          "reise*",
          "urlaub",
          "unterwegs",
          "draussen",
          "auto",
          "flug*",
          "fliegen",
          "flughafen",
          "umsteigen",
        ])
      )
        return "für unterwegs";
      if (
        has(s, [
          "zu hause",
          "zuhause",
          "daheim",
          "home",
          "wohnzimmer",
          "buero",
          "buro",
          "office",
          "arbeit*",
          "lernen",
          "konzentration",
          "pc",
          "gaming",
          "zock*",
          "konsole",
          "fernsehen",
          "tv",
          "film*",
          "serie*",
          "streaming",
          "podcast*",
          "hoerbuch*",
          "schlafen",
          "entspannung",
          "meditation",
          "kinder*",
          "kind",
          "tochter",
          "sohn",
          "schule",
        ])
      )
        return "für zu Hause";
      return null;
    },
  },
  {
    key: "form",
    question: "Bevorzugen Sie In-Ear oder Over-Ear?",
    match: (s) => {
      if (
        has(s, [
          "in ear*",
          "inear*",
          "earbud*",
          "buds",
          "ohrstoepsel*",
          "stoepsel*",
          "im ohr",
          "kompakt*",
        ])
      )
        return "In-Ear";
      if (
        has(s, [
          "over ear*",
          "overear*",
          "on ear*",
          "onear*",
          "buegel*",
          "kopfbuegel*",
          "ueber dem ohr",
          "ums ohr",
          "gross*",
          "kapsel*",
        ])
      )
        return "Over-Ear";
      return null;
    },
  },
  {
    key: "budget",
    question: "Wie hoch ist Ihr Budget ungefähr?",
    match: budgetOf,
  },
];

/** Details the bot acknowledges without asking about them. */
const EXTRAS = [
  {
    label: "wasserfest",
    words: [
      "wasserfest*",
      "wasserdicht*",
      "wasser dich*",
      "schwimm*",
      "swim*",
      "pool",
      "schweiss*",
      "schwitz*",
      "regen",
      "dusch*",
      "ipx",
      "ip 6*",
      "ip 7*",
      "ip 8*",
    ],
  },
  {
    label: "Noise Cancelling",
    words: [
      "noise cancelling",
      "noisecancelling",
      "geraeusch*",
      "gerausch*",
      "anc",
      "abschirm*",
      "ruhe",
      "ruhig",
    ],
  },
  {
    label: "lange Akkulaufzeit",
    words: ["akku*", "laufzeit", "laden*", "ladestation", "stunden", "tagelang", "kapazitaet*"],
  },
  {
    label: "kabellos",
    words: ["bluetooth", "kabellos", "wireless", "ohne kabel", "kein kabel", "ohne stecker"],
  },
  { label: "mit Kabel", words: ["aux", "3 5", "jack*", "klinke", "mit kabel"] },
  {
    label: "gutes Mikrofon",
    words: [
      "mikrofon*",
      "mic",
      "headset*",
      "telefon*",
      "anrufe",
      "gespraeche",
      "call*",
      "zoom",
      "skype",
      "konferenz",
      "meetings",
    ],
  },
  {
    label: "bequemer Sitz",
    words: [
      "bequem*",
      "komfort*",
      "leicht*",
      "sitz*",
      "kleine ohren",
      "druck*",
      "lang tragen",
      "nicht drueckt",
    ],
  },
  {
    label: "satter Klang",
    words: ["bass*", "sound*", "klang*", "hi fi", "hifi", "qualitaet*", "hochwertig*", "premium"],
  },
  {
    label: "schonend für die Ohren",
    words: [
      "gehoer*",
      "lautstaerke*",
      "sensibel*",
      "empfindlich*",
      "ohrenschmerzen",
      "tinnitus",
      "ohren belast*",
    ],
  },
  {
    label: "Farbe notiert",
    words: [
      "schwarz*",
      "weiss*",
      "grau*",
      "blau*",
      "rot*",
      "gruen*",
      "gelb*",
      "silber*",
      "rosa",
      "pink",
      "orange",
      "lila",
    ],
  },
];

/** Answers like "egal" close the open question without adding new information. */
const DONT_CARE = [
  "egal",
  "ist mir egal",
  "keine praeferenz*",
  "keine praferenz*",
  "weiss nicht",
  "weiss ich nicht",
  "keine ahnung",
  "kein plan",
  "was du willst",
  "wie du magst",
  "beides",
  "jedes",
  "alle",
  "hauptsache gut",
  "ist mir recht",
  "schon recht",
  "passt schon",
];
const ACKS = ["Danke!", "Verstanden.", "Super, danke.", "Alles klar."];
const FINAL_TEXT =
  "Basierend auf Ihren Angaben empfehle ich Ihnen die **RunFit Sport Pro — 69€**: wasserfest, sicherer Sitz und lange Akkulaufzeit. Hier sind auch ein paar ähnliche Modelle:";


var BOT_RECOMMENDED_IDS = [1, 13, 15, 10];

/** Sehr einfaches Markdown: nur **fett**. */
function botText(text) {
  return esc(text).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

function renderShopBot(container, query) {
  query = query || "";
  var messages = [];
  var typing = true;
  var done = false;
  var busy = false;
  var covered = new Set();
  var seenExtras = new Set();
  var pendingAsked = "need";

  container.innerHTML =
    '<section class="shopbot">' +
    '<div class="bot-head">' +
    '<span class="bot-avatar">🤖</span>' +
    '<div><p class="bot-name">ShopBot</p><p class="bot-sub">Ihr persönlicher Produktberater</p></div>' +
    '<span class="bot-online"><span class="bot-dot"></span> Online</span>' +
    "</div>" +
    '<div class="bot-chat" id="bot-chat"></div>' +
    '<div class="bot-input" id="bot-input">' +
    '<form id="bot-form" class="bot-form">' +
    '<textarea id="bot-text" rows="2" placeholder="Ihre Antwort …" aria-label="Nachricht an ShopBot" disabled></textarea>' +
    '<button type="submit" id="bot-send" class="btn bot-send" aria-label="Senden" title="Senden" disabled>Senden</button>' +
    "</form></div></section>";

  var chat = container.querySelector("#bot-chat");
  var form = container.querySelector("#bot-form");
  var textarea = container.querySelector("#bot-text");
  var sendBtn = container.querySelector("#bot-send");
  var inputBox = container.querySelector("#bot-input");

  function productCards() {
    var cards = BOT_RECOMMENDED_IDS.map(function (id, index) {
      var p = PRODUCTS.filter(function (x) { return x.id === id; })[0];
      if (!p) return "";
      var href = link("produkt.html", { id: p.id });
      return (
        '<div class="bot-product">' +
        '<a class="bot-product-link" href="' + href + '">' +
        '<img src="' + p.image + '" alt="' + esc(p.name) + ' Produktfoto" loading="lazy">' +
        '<span class="bot-product-tag">' + (index === 0 ? "Unsere Empfehlung" : "Ähnliches Modell") + "</span>" +
        '<span class="bot-product-name">' + esc(p.name) + "</span>" +
        '<span class="bot-product-price">' + p.price + "€</span>" +
        "</a>" +
        '<a class="btn btn-outline btn-small" href="' + href + '">Zum Produkt →</a>' +
        "</div>"
      );
    }).join("");
    return '<div class="bot-products"><p class="bot-products-title">Passende Kopfhörer</p><div class="bot-products-grid">' + cards + "</div></div>";
  }

  function draw() {
    var html = messages.map(function (m) {
      var cls = "msg " + (m.from === "user" ? "msg-user" : "msg-bot") + (m.products ? " msg-wide" : "");
      return '<div class="' + cls + '"><div class="bubble">' + botText(m.text) + (m.products ? productCards() : "") + "</div></div>";
    }).join("");
    if (typing) html += '<p class="typing" role="status">ShopBot schreibt …</p>';
    chat.innerHTML = html;
    chat.scrollTop = chat.scrollHeight;
    textarea.disabled = typing;
    sendBtn.disabled = typing || !textarea.value.trim();
    if (done) inputBox.hidden = true;
  }

  function greet() {
    if (query.trim()) {
      reportSearchToParent(query);
      var q = norm(query);
      TOPICS.forEach(function (t) { if (t.match(q)) covered.add(t.key); });
      EXTRAS.forEach(function (e) { if (has(q, e.words)) seenExtras.add(e.label); });
    }
    messages = [{ from: "bot", text: GREETING }];
    typing = false;
    draw();
    textarea.focus();
  }

  function send(value) {
    var text = value.trim();
    if (!text || typing || done || busy) return;
    busy = true;
    reportSearchToParent(text);
    messages.push({ from: "user", text: text });
    textarea.value = "";
    typing = true;
    draw();

    var lower = norm(text);
    var topicEchoes = [];
    TOPICS.forEach(function (t) {
      if (covered.has(t.key)) return;
      var hit = t.match(lower);
      if (hit) { covered.add(t.key); topicEchoes.push(hit); }
    });
    var extraEchoes = [];
    EXTRAS.forEach(function (e) {
      if (seenExtras.has(e.label)) return;
      if (has(lower, e.words)) { seenExtras.add(e.label); extraEchoes.push(e.label); }
    });
    /* Eine Antwort ohne neue Angaben beantwortet trotzdem die offene Frage. */
    var pending = TOPICS.filter(function (t) { return !covered.has(t.key); })[0];
    var shrugged = !topicEchoes.length && has(lower, DONT_CARE);
    if (pending && (shrugged || (!topicEchoes.length && pendingAsked === pending.key))) {
      covered.add(pending.key);
    }
    if ((topicEchoes.length || extraEchoes.length) && !covered.has("need")) covered.add("need");
    var next = TOPICS.filter(function (t) { return !covered.has(t.key); })[0];
    var echoes = topicEchoes.concat(extraEchoes).slice(0, 4);
    var ack = echoes.length
      ? "Alles klar – " + echoes.join(", ") + ". "
      : ACKS[Math.floor(Math.random() * ACKS.length)] + " ";

    setTimeout(function () {
      if (next) {
        pendingAsked = next.key;
        messages.push({ from: "bot", text: ack + next.question });
      } else {
        messages.push({ from: "bot", text: ack + FINAL_TEXT, products: true });
        done = true;
      }
      busy = false;
      typing = false;
      draw();
      if (!done) textarea.focus();
    }, 1000 + Math.random() * 800);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    send(textarea.value);
  });
  textarea.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(textarea.value);
    }
  });
  textarea.addEventListener("input", function () {
    sendBtn.disabled = typing || !textarea.value.trim();
  });

  draw(); /* zeigt zuerst "ShopBot schreibt …" */
  setTimeout(greet, 800);
}

  window.renderShopBot = renderShopBot;
})();

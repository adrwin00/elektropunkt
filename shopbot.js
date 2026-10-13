/* ElektroPunkt – ShopBot (Bedingung B)
 * Kein echtes KI-Modell: Der Bot erkennt Stichwörter und stellt feste Fragen. */

var BOT_RECOMMENDED_IDS = [1, 13, 15, 10];

var BOT_ACKS = [
  "Danke, das hilft mir weiter!",
  "Verstanden, notiere ich mir das!",
  "Gut zu wissen, danke!"
];

var BOT_FINAL =
  "Alles klar, vielen Dank! Basierend auf Ihren Angaben empfehle ich Ihnen: RunFit Sport Pro — 69€ — wasserfest und mit sicherem Halt beim Laufen.";

/* Themen: Wenn ein Stichwort schon genannt wurde, wird die Frage übersprungen. */
var BOT_TOPICS = [
  {
    id: "einsatz",
    question: "Wofür möchten Sie die Kopfhörer hauptsächlich nutzen — Sport, Pendeln oder zu Hause?",
    keywords: ["sport", "laufen", "joggen", "fitness", "training", "gym", "pendeln", "bahn", "zug", "büro", "buero", "arbeit", "zuhause", "zu hause", "reisen", "gaming"],
    echo: function (hit) { return "Sie nutzen die Kopfhörer also vor allem für „" + hit + "“ — das notiere ich mir."; }
  },
  {
    id: "bauform",
    question: "Bevorzugen Sie In-Ear-Stöpsel oder Over-Ear-Kopfhörer?",
    keywords: ["in-ear", "in ear", "stöpsel", "stoepsel", "over-ear", "over ear", "bügel", "buegel", "on-ear", "ohrhörer", "ohrhoerer"],
    echo: function (hit) { return "Bauform „" + hit + "“ habe ich mir notiert."; }
  },
  {
    id: "farbe",
    question: "Haben Sie eine Farbpräferenz?",
    keywords: ["schwarz", "weiß", "weiss", "grau", "blau", "rot", "grün", "gruen", "silber", "beige", "rosa", "pink", "farbe"],
    echo: function (hit) { return "Farbe „" + hit + "“ — verstanden."; }
  },
  {
    id: "features",
    question: "Sind Ihnen Noise Cancelling oder eine lange Akkulaufzeit wichtig?",
    keywords: ["noise", "anc", "geräuschunterdrückung", "akku", "laufzeit", "batterie", "wasserfest", "spritzwasser", "bluetooth", "kabellos"],
    echo: function (hit) { return "„" + hit + "“ ist Ihnen wichtig — gut zu wissen."; }
  },
  {
    id: "budget",
    question: "Und wie hoch ist Ihr Budget ungefähr?",
    keywords: ["€", "eur", "euro", "budget", "günstig", "guenstig", "billig", "preis"],
    echo: function (hit) { return "Beim Preis orientiere ich mich an „" + hit + "“."; }
  }
];

function botFindHit(text, keywords) {
  var t = text.toLowerCase();
  for (var i = 0; i < keywords.length; i++) {
    if (t.indexOf(keywords[i]) !== -1) return keywords[i];
  }
  return null;
}

function renderShopBot(container, query) {
  query = query || "";
  var messages = [];
  var typing = true;
  var done = false;
  var covered = {};
  var pending = null;

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
      return '<div class="' + cls + '"><div class="bubble">' + esc(m.text) + (m.products ? productCards() : "") + "</div></div>";
    }).join("");
    if (typing) html += '<p class="typing" role="status">ShopBot schreibt …</p>';
    chat.innerHTML = html;
    chat.scrollTop = chat.scrollHeight;
    textarea.disabled = typing;
    sendBtn.disabled = typing || !textarea.value.trim();
    if (done) inputBox.hidden = true;
  }

  function greet() {
    if (query.trim()) reportSearchToParent(query);
    var pre = [];
    BOT_TOPICS.forEach(function (t) {
      var hit = botFindHit(query, t.keywords);
      if (hit) { covered[t.id] = true; pre.push(t.echo(hit)); }
    });
    /* Erste Frage bleibt offen: noch kein Thema gilt als "aktuelle Frage" */
    pending = null;
    messages = [{ from: "bot", text: "Hallo! 👋 Wie kann ich Ihnen heute helfen? Wonach suchen Sie?" }];
    if (pre.length) messages.push({ from: "bot", text: pre.join(" ") });
    typing = false;
    draw();
    textarea.focus();
  }

  function send(value) {
    var text = value.trim();
    if (!text || typing || done) return;
    reportSearchToParent(text);
    messages.push({ from: "user", text: text });
    textarea.value = "";
    typing = true;
    draw();

    if (pending) covered[pending.id] = true;
    var echoes = [];
    BOT_TOPICS.forEach(function (t) {
      if (covered[t.id]) return;
      var hit = botFindHit(text, t.keywords);
      if (hit) { covered[t.id] = true; echoes.push(t.echo(hit)); }
    });
    var next = BOT_TOPICS.filter(function (t) { return !covered[t.id]; })[0] || null;
    pending = next;

    var delay = 1000 + Math.floor(Math.random() * 800);
    setTimeout(function () {
      messages.push({ from: "bot", text: BOT_ACKS[Math.floor(Math.random() * BOT_ACKS.length)] });
      if (echoes.length) messages.push({ from: "bot", text: echoes.join(" ") });
      if (next) {
        messages.push({ from: "bot", text: next.question });
      } else {
        messages.push({ from: "bot", text: BOT_FINAL, products: true });
        done = true;
      }
      typing = false;
      draw();
      if (!done) textarea.focus();
    }, delay);
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

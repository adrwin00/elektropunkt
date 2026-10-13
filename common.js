/* ElektroPunkt – gemeinsame Funktionen (Header, Footer, Warenkorb, Weitergabe an die Umfrage) */

var NAV = [
  { label: "Handy & Tablet", slug: "handy-tablet" },
  { label: "Audio", slug: "audio" },
  { label: "Computer", slug: "computer" },
  { label: "Haushalt", slug: "haushalt" },
  { label: "Angebote", slug: "angebote" }
];

/* ---------- URL-Parameter ---------- */

function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

/** Bedingung aus der URL: ?cond=a (Suche) oder ?cond=b (Chatbot). Standard: a */
function getCond() {
  return getParam("cond") === "b" ? "b" : "a";
}

/** Baut einen internen Link und behält dabei die Bedingung (cond) bei. */
function link(page, params) {
  var p = new URLSearchParams();
  var all = params || {};
  Object.keys(all).forEach(function (k) {
    if (all[k] !== undefined && all[k] !== null && all[k] !== "") p.set(k, all[k]);
  });
  p.set("cond", getCond());
  return page + "?" + p.toString();
}

function esc(text) {
  var d = document.createElement("div");
  d.textContent = text;
  return d.innerHTML;
}

/* ---------- Speicher nur für diesen Tab (sessionStorage, mit Rückfall) ---------- */

var memoryStore = {};
function readStore(key, fallback) {
  try {
    var v = window.sessionStorage.getItem(key);
    return v === null ? fallback : JSON.parse(v);
  } catch (e) {
    return key in memoryStore ? memoryStore[key] : fallback;
  }
}
function writeStore(key, value) {
  memoryStore[key] = value;
  try { window.sessionStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* nicht verfügbar */ }
}

/* ---------- Suchbegriffe an die Umfrage (Elternseite) schicken ---------- */

/*
 * Schickt jeden abgeschickten Suchbegriff (Suchfeld und Chat) per postMessage
 * an die Seite, in die der Shop eingebettet ist (z. B. LimeSurvey-Frage mit iframe).
 * Die Umfrageseite muss auf Nachrichten mit channel "elektropunkt:search" hören.
 */
var SEARCH_CHANNEL = "elektropunkt:search";

function reportSearchToParent(term) {
  var q = (term || "").trim();
  if (!q) return;
  var history = readStore("ep_searches", []);
  history.push(q);
  writeStore("ep_searches", history);
  var message = { channel: SEARCH_CHANNEL, search: q, searches: history.slice() };
  [window.parent, window.top].forEach(function (win) {
    try {
      if (win && win !== window) win.postMessage(message, "*");
    } catch (e) { /* Zielfenster nicht erreichbar */ }
  });
}

/* ---------- Warenkorb ---------- */

function cartCount() { return readStore("ep_cart", 0); }

var toastTimer = null;
function addToCart() {
  writeStore("ep_cart", cartCount() + 1);
  var badge = document.getElementById("cart-count");
  if (badge) badge.textContent = cartCount();
  var toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    toast.textContent = "Zum Warenkorb hinzugefügt";
    document.body.appendChild(toast);
  }
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { toast.hidden = true; }, 1800);
}

/* ---------- Header und Footer ---------- */

function renderHeader(decorative) {
  var nav = NAV.map(function (n) {
    return decorative
      ? '<span class="nav-dead">' + esc(n.label) + "</span>"
      : '<a href="' + link("kategorie.html", { slug: n.slug }) + '">' + esc(n.label) + "</a>";
  }).join("");
  document.getElementById("header").innerHTML =
    '<header class="site-header">' +
    '<div class="container header-row">' +
    '<a class="logo" href="' + link("index.html") + '"><span class="logo-dot"></span>ElektroPunkt</a>' +
    '<nav class="main-nav">' + nav + "</nav>" +
    '<div class="header-icons">' +
    '<span class="cart" aria-label="Warenkorb">🛒<span class="cart-badge" id="cart-count">' + cartCount() + "</span></span>" +
    '<span class="account" aria-label="Konto">👤</span>' +
    "</div></div>" +
    '<div class="subbar"><div class="container">Kostenloser Versand ab 29€ · Lieferung in 1–2 Werktagen · 30 Tage Rückgaberecht</div></div>' +
    "</header>";
}

function renderFooter() {
  var legal = ["Impressum", "AGB", "Datenschutz", "Widerrufsrecht"].map(function (l) {
    return "<li>" + l + "</li>";
  }).join("");
  var pay = ["VISA", "Mastercard", "PayPal", "Klarna"].map(function (p) {
    return '<span class="pay">' + p + "</span>";
  }).join("");
  document.getElementById("footer").innerHTML =
    '<footer class="site-footer"><div class="container footer-grid">' +
    '<div><h3>Kontakt</h3><ul><li>Service-Hotline: 040 555 12 30</li><li>service@elektropunkt.de</li><li>Mo–Sa 8–20 Uhr</li></ul></div>' +
    "<div><h3>Rechtliches</h3><ul>" + legal + "</ul></div>" +
    '<div><h3>Zahlungsarten</h3><div class="pay-row">' + pay + "</div></div>" +
    '<div><h3>Newsletter</h3><p>Angebote jede Woche per E-Mail.</p>' +
    '<div class="newsletter"><input placeholder="E-Mail-Adresse" aria-label="E-Mail-Adresse">' +
    '<button type="button">Anmelden</button></div></div>' +
    "</div>" +
    '<p class="copyright">© 2026 ElektroPunkt GmbH</p></footer>';
}

function starsHtml(rating, reviews) {
  return '<span class="stars"><strong>' + rating.toFixed(1) + " ★</strong><span>(" + reviews + " Bewertungen)</span></span>";
}

/** Preis mit durchgestrichenem Altpreis bei Rabatt. */
function priceHtml(price, disc, big) {
  var old = disc ? '<span class="old-price">' + Math.round(price / (1 - disc / 100)) + "€</span>" : "";
  return '<span class="price-row"><span class="' + (big ? "price big" : "price") + '">' + price + "€</span>" + old + "</span>";
}

function discBadge(disc) {
  return disc ? '<span class="badge badge-left">-' + disc + "%</span>" : "";
}

/** Produktkarte für Suche und Kategorien. */
function productCard(opts) {
  var inner =
    '<div class="img-wrap"><img src="' + opts.image + '" alt="' + esc(opts.name) + ' Produktfoto" loading="lazy" width="768" height="768">' +
    discBadge(opts.disc) +
    (opts.recommended ? '<span class="badge badge-right">Empfohlen für dich</span>' : "") +
    "</div>" +
    '<span class="card-title">' + esc(opts.name) + "</span>" +
    starsHtml(ratingFor(opts.id), reviewsFor(opts.id)) +
    priceHtml(opts.price, opts.disc, false);
  var top = opts.href ? '<a class="card-link" href="' + opts.href + '">' + inner + "</a>" : '<div class="card-link">' + inner + "</div>";
  return '<div class="card">' + top + '<button type="button" class="btn btn-small add-btn">In den Warenkorb</button></div>';
}

function bindCartButtons(root) {
  var buttons = (root || document).querySelectorAll(".add-btn");
  for (var i = 0; i < buttons.length; i++) buttons[i].addEventListener("click", addToCart);
}

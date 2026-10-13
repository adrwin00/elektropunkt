/* Startseite */
(function () {
  var cond = getCond();
  renderHeader(cond === "b");
  renderFooter();

  var CATS = [
    { label: "Kopfhörer", icon: "🎧" },
    { label: "Lautsprecher", icon: "🔊", slug: "lautsprecher" },
    { label: "Smartwatches", icon: "⌚", slug: "smartwatches" },
    { label: "Laptops", icon: "💻", slug: "laptops" },
    { label: "Smart Home", icon: "🏠", slug: "smart-home" },
    { label: "Gaming", icon: "🎮", slug: "gaming" }
  ];
  var DEALS = [
    { tag: "-30%", title: "TV-Wochen", copy: "Große Bildschirme, kleine Preise. Nur bis Sonntag." },
    { tag: "0%", title: "Finanzierung", copy: "24 Monate ohne Zinsen ab 199€ Bestellwert." },
    { tag: "NEU", title: "Smart Home Sets", copy: "Licht, Heizung und Sicherheit im Paket." }
  ];
  var STRIPS = [
    { icon: "🚚", t: "Kostenloser Versand", s: "ab 29€ Bestellwert" },
    { icon: "↩️", t: "30 Tage Rückgabe", s: "kostenlos zurücksenden" },
    { icon: "🏬", t: "Abholung im Markt", s: "in über 200 Filialen" },
    { icon: "🔒", t: "Sichere Zahlung", s: "SSL-verschlüsselt" }
  ];

  function go(q) {
    reportSearchToParent(q);
    window.location.href = link("suche.html", { q: q.trim() || "Kopfhörer" });
  }

  var catTiles = CATS.map(function (c) {
    return c.slug
      ? '<a class="cat-tile" href="' + link("kategorie.html", { slug: c.slug }) + '"><span class="cat-icon">' + c.icon + '</span><span class="cat-label">' + c.label + "</span></a>"
      : '<button type="button" class="cat-tile" data-go="' + c.label + '"><span class="cat-icon">' + c.icon + '</span><span class="cat-label">' + c.label + "</span></button>";
  }).join("");

  var popular = ["Kopfhörer", "Saugroboter", "Fernseher", "Kaffeevollautomat"].map(function (s) {
    return '<button type="button" class="link-btn" data-go="' + s + '">' + s + "</button>";
  }).join(" · ");

  var deals = DEALS.map(function (d) {
    return '<div class="panel"><span class="tag-soft">' + d.tag + '</span><h3 class="panel-title">' + d.title + '</h3><p class="panel-copy">' + d.copy + "</p></div>";
  }).join("");

  var strips = STRIPS.map(function (s) {
    return '<div class="strip-item"><span class="strip-icon">' + s.icon + '</span><div><p class="strip-t">' + s.t + '</p><p class="strip-s">' + s.s + "</p></div></div>";
  }).join("");

  var hero =
    '<section class="hero">' +
    '<div class="hero-inner">' +
    "<h1>Technik finden. Sofort.</h1>" +
    '<p class="hero-sub">Über 120.000 Artikel — sagen Sie uns einfach, wonach Sie suchen.</p>' +
    '<div class="hero-search">' +
    '<input id="home-q" placeholder="Wonach suchen Sie?" aria-label="Suche" autofocus>' +
    '<button type="button" id="home-go" class="btn btn-big">Suchen</button>' +
    "</div>" +
    '<p class="hero-popular">Beliebt gerade: ' + popular + "</p>" +
    "</div></section>";

  document.getElementById("main").innerHTML =
    '<div class="topband">Rote Wochen · bis zu 40% auf ausgewählte Technik</div>' +
    (cond === "b" ? '<section class="container bot-section" id="bot-slot"></section>' : hero) +
    '<section class="container"><div class="cat-grid">' + catTiles + "</div></section>" +
    '<section class="container section-gap"><div class="promo-grid">' +
    '<div class="promo-red"><span class="promo-eyebrow">Aktion der Woche</span>' +
    "<h2>Audio-Tage: Kopfhörer stark reduziert</h2>" +
    "<p>In-Ear, Over-Ear und Sportmodelle — hunderte Angebote, solange der Vorrat reicht.</p>" +
    '<button type="button" class="btn-white" data-go="Kopfhörer">Angebote ansehen</button></div>' +
    '<div class="panel panel-pad"><span class="tag-solid">CLUB</span><h2 class="panel-h2">5€ Gutschein sichern</h2>' +
    '<p class="panel-copy">Kostenlos anmelden und bei jeder Bestellung sparen.</p>' +
    '<button type="button" class="btn btn-outline btn-block">Jetzt Mitglied werden</button></div>' +
    "</div></section>" +
    '<section class="container section-gap-sm"><div class="deal-grid">' + deals + "</div></section>" +
    '<section class="container section-gap"><div class="panel strip-grid">' + strips + "</div></section>";

  var goButtons = document.querySelectorAll("[data-go]");
  for (var i = 0; i < goButtons.length; i++) {
    goButtons[i].addEventListener("click", function (e) { go(e.currentTarget.getAttribute("data-go")); });
  }

  if (cond === "b") {
    renderShopBot(document.getElementById("bot-slot"), "");
  } else {
    var input = document.getElementById("home-q");
    document.getElementById("home-go").addEventListener("click", function () { go(input.value); });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") { e.preventDefault(); go(input.value); }
    });
    input.focus();
  }
})();

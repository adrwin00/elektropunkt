/* Suchergebnisse (Kopfhörer): ?q=...&cond=a|b */
(function () {
  var cond = getCond();
  var q = getParam("q") || "Kopfhörer";
  var query = q;
  var loading = true;
  var sort = "Beliebtheit";
  var SORTS = ["Beliebtheit", "Preis aufsteigend", "Preis absteigend", "Bewertung"];

  renderHeader(false);
  renderFooter();

  var STRIPS = [
    { icon: "🚚", t: "Kostenloser Versand", s: "ab 29€ Bestellwert" },
    { icon: "↩️", t: "30 Tage Rückgabe", s: "kostenlos zurücksenden" },
    { icon: "🏬", t: "Abholung im Markt", s: "in über 200 Filialen" },
    { icon: "🔒", t: "Sichere Zahlung", s: "SSL-verschlüsselt" }
  ];
  var TILES = [
    { tag: "CLUB", title: "5€ Gutschein sichern", copy: "Kostenlos anmelden und bei jeder Bestellung sparen." },
    { tag: "-30%", title: "TV-Wochen", copy: "Große Bildschirme, kleine Preise. Nur bis Sonntag." },
    { tag: "0%", title: "Finanzierung", copy: "24 Monate ohne Zinsen ab 199€ Bestellwert." }
  ];

  var main = document.getElementById("main");
  var extra = "";
  if (cond === "b") {
    extra =
      '<div class="bot-wrap" id="bot-slot"></div>' +
      '<div class="tile-grid">' + TILES.map(function (d) {
        return '<div class="panel panel-pad"><span class="tag-solid">' + d.tag + '</span><h3 class="panel-title">' + d.title + '</h3><p class="panel-copy">' + d.copy + "</p></div>";
      }).join("") + "</div>" +
      '<div class="panel strip-grid strip-top">' + STRIPS.map(function (s) {
        return '<div class="strip-item"><span class="strip-icon">' + s.icon + '</span><div><p class="strip-t">' + s.t + '</p><p class="strip-s">' + s.s + "</p></div></div>";
      }).join("") + "</div>";
  } else {
    extra =
      '<div class="result-head"><div><h1 class="result-title">Kopfhörer &amp; Kabellose Ohrhörer</h1><p class="result-count" id="count"></p></div>' +
      '<label class="sort">Sortieren nach: <select id="sort">' + SORTS.map(function (s) { return "<option>" + s + "</option>"; }).join("") + "</select></label></div>" +
      '<div id="results"></div>';
  }

  main.innerHTML =
    '<div class="container page">' +
    '<div class="search-row"><input id="q" placeholder="Wonach suchen Sie?" aria-label="Suche">' +
    '<button type="button" id="search-btn" class="btn btn-search">Suchen</button></div>' +
    '<nav class="breadcrumb"><a href="' + link("index.html") + '">Start</a> &gt; Audio &gt; <span>Kopfhörer</span></nav>' +
    extra + "</div>";

  var input = document.getElementById("q");
  input.value = query;

  function drawResults() {
    var results = document.getElementById("results");
    if (!results) return;
    var filtered = filterProducts(query);
    var visible = sort === "Preis aufsteigend" ? filtered.slice().sort(function (a, b) { return a.price - b.price; })
      : sort === "Preis absteigend" ? filtered.slice().sort(function (a, b) { return b.price - a.price; })
      : sort === "Bewertung" ? filtered.slice().sort(function (a, b) { return ratingFor(b.id) - ratingFor(a.id); })
      : filtered;
    document.getElementById("count").textContent = visible.length + " Ergebnisse";
    if (loading) {
      results.innerHTML = '<p class="loading">Ergebnisse werden geladen …</p>';
      return;
    }
    var words = searchWords(query);
    var scores = visible.map(function (p) { return matchScore(p, words); });
    var maxScore = Math.max.apply(null, [0].concat(scores));
    var recommended = {};
    visible.filter(function (p, i) { return maxScore > 0 && scores[i] === maxScore; })
      .slice(0, 4)
      .forEach(function (p) { recommended[p.id] = true; });

    results.innerHTML = '<div class="grid">' + visible.map(function (p) {
      return productCard({
        id: p.id, name: p.name, price: p.price, image: p.image,
        disc: discountFor(p.id), recommended: !!recommended[p.id],
        href: link("produkt.html", { id: p.id })
      });
    }).join("") + "</div>";
    bindCartButtons(results);
  }

  function startLoading() {
    loading = true;
    drawResults();
    setTimeout(function () { loading = false; drawResults(); }, 500);
  }

  function submitSearch() {
    reportSearchToParent(input.value);
    var term = input.value.trim();
    q = term || "Kopfhörer";
    query = q;
    input.value = query;
    /* Adresse aktualisieren, ohne die Seite (und den Chat) neu zu laden */
    var params = new URLSearchParams({ q: q, cond: cond });
    if (term) params.set("search", term);
    try { window.history.pushState(null, "", "suche.html?" + params.toString()); } catch (e) { /* ignorieren */ }
    if (cond === "a") startLoading();
  }

  var sortSelect = document.getElementById("sort");
  if (sortSelect) {
    sortSelect.addEventListener("change", function () { sort = sortSelect.value; drawResults(); });
  }

  document.getElementById("search-btn").addEventListener("click", submitSearch);
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") { e.preventDefault(); submitSearch(); }
  });

  if (cond === "a") {
    /* Liste reagiert live beim Tippen */
    input.addEventListener("input", function () { query = input.value; drawResults(); });
    startLoading();
  } else {
    renderShopBot(document.getElementById("bot-slot"), q);
  }
})();

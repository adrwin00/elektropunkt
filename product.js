/* Produktseite: ?id=... */
(function () {
  renderHeader(false);
  renderFooter();
  var id = getParam("id");
  var product = PRODUCTS.filter(function (p) { return String(p.id) === id; })[0];
  var main = document.getElementById("main");

  if (!product) {
    document.title = "Produkt nicht gefunden — ElektroPunkt";
    main.innerHTML = '<div class="container notfound"><h1>Dieses Produkt ist derzeit nicht verfügbar.</h1><a href="' + link("index.html") + '">Zurück zur Startseite</a></div>';
    return;
  }
  document.title = product.name + " — ElektroPunkt";
  var disc = discountFor(product.id);
  var rows = [["Typ", product.typ], ["Akkulaufzeit", product.akku], ["Schutzklasse", product.schutz], ["Gewicht", product.gewicht]]
    .map(function (r) { return '<div class="spec-row"><dt>' + r[0] + "</dt><dd>" + esc(r[1]) + "</dd></div>"; }).join("");
  var badge = disc ? '<span class="badge badge-inline">-' + disc + "%</span>" : "";
  var old = disc ? '<span class="old-price">' + Math.round(product.price / (1 - disc / 100)) + "€</span>" : "";

  main.innerHTML =
    '<div class="container page">' +
    '<nav class="breadcrumb"><a href="' + link("index.html") + '">Start</a> &gt; <a href="' + link("suche.html", { q: "Kopfhörer" }) + '">Kopfhörer</a> &gt; <span>' + esc(product.name) + "</span></nav>" +
    '<div class="detail">' +
    '<img class="detail-img" src="' + product.image + '" alt="' + esc(product.name) + ' Produktfoto groß" width="768" height="768">' +
    '<div class="detail-info"><h1>' + esc(product.name) + "</h1>" + starsHtml(ratingFor(product.id), reviewsFor(product.id)) +
    '<p class="detail-price"><span class="price huge">' + product.price + "€</span>" + old + badge + "</p>" +
    '<p class="detail-desc">' + esc(product.description) + "</p>" +
    '<dl class="specs">' + rows + "</dl>" +
    '<button type="button" class="btn btn-wide add-btn">In den Warenkorb</button>' +
    '<ul class="checks"><li>✓ Kostenlose Rücksendung innerhalb 30 Tagen</li><li>✓ Sichere Zahlung</li></ul>' +
    "</div></div></div>";
  bindCartButtons(main);
})();

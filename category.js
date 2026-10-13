/* Kategorieseite: ?slug=... */
(function () {
  renderHeader(false);
  renderFooter();
  var slug = getParam("slug") || "";
  var cat = categoryBySlug(slug);
  var main = document.getElementById("main");

  if (!cat) {
    document.title = "Kategorie — ElektroPunkt";
    main.innerHTML = '<div class="container notfound"><h1>Diese Kategorie ist derzeit nicht verfügbar.</h1><a href="' + link("index.html") + '">Zurück zur Startseite</a></div>';
    return;
  }
  document.title = cat.title + " — ElektroPunkt";
  var parent = cat.parent !== "Start" ? "&gt; " + esc(cat.parent) + " " : "";

  main.innerHTML =
    '<div class="container page">' +
    '<nav class="breadcrumb"><a href="' + link("index.html") + '">Start</a> ' + parent + "&gt; <span>" + esc(cat.title) + "</span></nav>" +
    '<div class="cat-head"><span class="cat-head-icon">' + cat.icon + '</span><div><h1>' + esc(cat.title) + "</h1><p>" + esc(cat.intro) + "</p></div></div>" +
    '<p class="result-count top-gap">' + (cat.products.length * 9 + 7) + " Ergebnisse</p>" +
    '<div class="grid">' + cat.products.map(function (p, i) {
      var id = i + 1 + slug.length * 3;
      return productCard({ id: id, name: p.name, price: p.price, image: catImage(slug, i), disc: discountFor(id), recommended: false, href: null });
    }).join("") + "</div></div>";
  bindCartButtons(main);
})();

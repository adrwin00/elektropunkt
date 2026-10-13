# ElektroPunkt – prototyp sklepu do badania (HTML/CSS/JS)

Statyczna strona bez backendu i bez bazy danych. Dwa warianty tego samego sklepu:

- `?cond=a` – wersja z wyszukiwarką
- `?cond=b` – wersja z chatbotem ShopBot (skrypt na słowach kluczowych, bez modelu AI)

Przykładowe adresy po wdrożeniu na GitHub Pages:

- `https://adrwin00.github.io/elektropunkt/index.html?cond=a`
- `https://adrwin00.github.io/elektropunkt/index.html?cond=b`

## Struktura plików (wersja bez folderów)

Wszystkie pliki leżą obok siebie, bez podfolderów. Dzięki temu wgranie na GitHub nie wymaga zachowania struktury.

| Plik | Do czego służy |
| --- | --- |
| `index.html`, `suche.html`, `produkt.html`, `kategorie.html` | strony sklepu |
| `style.css` | cały wygląd |
| `data.js` | lista 36 produktów, kategorie, funkcje wyszukiwania |
| `common.js` | nagłówek, stopka, koszyk, wysyłanie fraz do ankiety |
| `shopbot.js` | logika chatbota (pytania, rozpoznawanie słów, rekomendacja) |
| `home.js`, `search.js`, `product.js`, `category.js` | logika poszczególnych stron |
| `img-products-*.jpg`, `img-cat-*.jpg` | zdjęcia produktów i kategorii |
| `favicon.svg`, `favicon.ico` | ikonka w karcie przeglądarki |

## Wdrożenie na GitHub Pages

1. Załóż repozytorium (publiczne – na darmowym koncie Pages nie działa z prywatnego).
2. Wgraj wszystkie pliki z tego folderu (pliki mają leżeć w głównym katalogu repozytorium).
3. Settings → Pages → Source: „Deploy from a branch”, branch `main`, folder `/ (root)` → Save.
4. Po minucie–dwóch strona działa pod adresem widocznym w Settings → Pages.

Test lokalny bez internetu: wystarczy dwukrotnie kliknąć `index.html`.

## Połączenie z ankietą (iframe)

Sklep wysyła każdą wpisaną frazę (wyszukiwarka i czat) do strony nadrzędnej przez `postMessage`.
Strona z ankietą musi na to nasłuchiwać, np.:

```html
<script>
window.addEventListener("message", function (e) {
  if (e.origin !== "https://adrwin00.github.io") return;   // sprawdź nadawcę
  if (!e.data || e.data.channel !== "elektropunkt:search") return;
  console.log(e.data.search);    // ostatnia fraza
  console.log(e.data.searches);  // wszystkie frazy z tej sesji (tablica)
  // tutaj zapisz wartość do ukrytego pola ankiety
});
</script>
```

Osadzenie:

```html
<iframe src="https://adrwin00.github.io/elektropunkt/index.html?cond=a" width="100%" height="900"></iframe>
```

## Co jest zapisywane

- Sklep nie wysyła nic na żaden serwer i nie ma analityki.
- Licznik koszyka i lista wpisanych fraz są trzymane tylko w pamięci karty przeglądarki uczestnika (`sessionStorage`) i znikają po jej zamknięciu.
- Dane z badania powstają wyłącznie po stronie ankiety (odbiór `postMessage`).
- Serwer hostingu (GitHub) może zapisywać standardowe logi odwiedzin.

## Uwagi do zachowania

- Linki wewnątrz sklepu zachowują parametr `cond`, więc uczestnik nie przeskakuje między wariantami.
- W wariancie A lista produktów filtruje się podczas pisania, a najlepiej pasujące produkty dostają plakietkę „Empfohlen für dich”.
- Bot (wariant B) wita się pytaniem „Wonach suchen Sie?”, potem rozpoznaje słowa kluczowe (np. „sport”, „schwarz”, „budget”), pomija pytania, na które uczestnik już odpowiedział, i na końcu zawsze poleca te same produkty.
- Sortowanie w wariancie A działa (Beliebtheit, Preis aufsteigend, Preis absteigend, Bewertung).

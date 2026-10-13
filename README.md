# ElektroPunkt – Prototyp eines Online-Shops für die Studie (HTML/CSS/JS)

Statische Webseite ohne Backend und ohne Datenbank. Zwei Varianten desselben Shops:

- `?cond=a` – Version mit Suchfunktion
- `?cond=b` – Version mit Chatbot ShopBot (Skript auf Basis von Stichwörtern, ohne KI-Modell)

Beispieladressen nach der Veröffentlichung auf GitHub Pages:

- `https://adrwin00.github.io/elektropunkt/index.html?cond=a`
- `https://adrwin00.github.io/elektropunkt/index.html?cond=b`

## Dateistruktur (Version ohne Ordner)

Alle Dateien liegen nebeneinander, ohne Unterordner. Dadurch muss beim Hochladen auf GitHub keine Ordnerstruktur erhalten bleiben.

| Datei | Zweck |
| --- | --- |
| `index.html`, `suche.html`, `produkt.html`, `kategorie.html` | Seiten des Shops |
| `style.css` | gesamtes Erscheinungsbild |
| `data.js` | Liste der 36 Produkte, Kategorien, Suchfunktionen |
| `common.js` | Kopfzeile, Fußzeile, Warenkorb, Weitergabe der Suchbegriffe an die Umfrage |
| `shopbot.js` | Logik des Chatbots (Fragen, Worterkennung, Empfehlung) |
| `home.js`, `search.js`, `product.js`, `category.js` | Logik der einzelnen Seiten |
| `img-products-*.jpg`, `img-cat-*.jpg` | Bilder der Produkte und Kategorien |
| `favicon.svg`, `favicon.ico` | Symbol im Browser-Tab |

## Veröffentlichung auf GitHub Pages

1. Ein Repository anlegen (öffentlich – mit dem kostenlosen Konto funktioniert Pages

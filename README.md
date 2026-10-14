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

1. Ein Repository anlegen (öffentlich – mit dem kostenlosen Konto funktioniert Pages nicht aus einem privaten Repository).
2. Alle Dateien aus diesem Ordner hochladen (die Dateien müssen im Hauptverzeichnis des Repositorys liegen).
3. Settings → Pages → Source: „Deploy from a branch“, Branch `main`, Ordner `/ (root)` → Save.
4. Nach ein bis zwei Minuten ist die Seite unter der in Settings → Pages angezeigten Adresse erreichbar.

Lokaler Test ohne Internet: `index.html` einfach per Doppelklick öffnen.

## Anbindung an die Umfrage (iframe)

Der Shop sendet jeden eingegebenen Suchbegriff (Suchfeld und Chat) per `postMessage` an die übergeordnete Seite.
Die Umfrageseite muss darauf lauschen, z. B.:

```html
<script>
window.addEventListener("message", function (e) {
  if (e.origin !== "https://adrwin00.github.io") return;   // Absender prüfen
  if (!e.data || e.data.channel !== "elektropunkt:search") return;
  console.log(e.data.search);    // letzter Suchbegriff
  console.log(e.data.searches);  // alle Suchbegriffe dieser Sitzung (Array)
  // hier den Wert in einem versteckten Feld der Umfrage speichern
});
</script>
```

Einbettung:

```html
<iframe src="https://adrwin00.github.io/elektropunkt/index.html?cond=a" width="100%" height="900"></iframe>
```

## Was gespeichert wird

- Der Shop sendet nichts an einen Server und enthält keine Analyse-Dienste.
- Der Warenkorbzähler und die Liste der eingegebenen Suchbegriffe werden nur im Speicher des Browser-Tabs der Teilnehmer:innen gehalten (`sessionStorage`) und verschwinden beim Schließen des Tabs.
- Die Studiendaten entstehen ausschließlich auf Seiten der Umfrage (Empfang der `postMessage`).
- Der Hosting-Anbieter (GitHub) kann übliche Zugriffsprotokolle speichern.

## Hinweise zum Verhalten

- Interne Links im Shop behalten den Parameter `cond` bei, sodass die Teilnehmer:innen nicht zwischen den Varianten wechseln.
- In Variante A wird die Produktliste während der Eingabe live gefiltert, und die am besten passenden Produkte erhalten die Kennzeichnung „Empfohlen für dich“.
- Der Bot (Variante B) begrüßt mit der Frage „Wonach suchen Sie?“. Anschließend erkennt er Stichwörter samt Wortendungen (z. B. „läuft“, „Kopfhörer“), Zahlwörter beim Budget („hundert Euro“), Zusatzwünsche (z. B. wasserdicht, Noise Cancelling) und Antworten wie „egal“. Er überspringt Fragen, die die Teilnehmer:innen bereits beantwortet haben, und empfiehlt am Ende immer dieselben Produkte (RunFit Sport Pro und drei ähnliche Modelle).
- Die Sortierung in Variante A funktioniert (Beliebtheit, Preis aufsteigend, Preis absteigend, Bewertung).
- Der Bot arbeitet ausschließlich regelbasiert und nutzt weder ein KI-Modell noch einen externen Server.

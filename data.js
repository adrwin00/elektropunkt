/* ElektroPunkt – Produktdaten, Kategorien und Hilfsfunktionen (Katalog) */



/**
 * Fixed product list. Order is constant for every visitor — the search bar and
 * the filters never modify this array (controlled research stimulus).
 */
var PRODUCTS = [
  {
    id: 1,
    name: "RunFit Sport Pro",
    price: 69,
    teaser: "Kabellose In-Ears mit sicherem Halt beim Laufen.",
    description:
      "Die RunFit Sport Pro wurden für intensives Lauftraining entwickelt und sitzen dank flexibler Ohrbügel auch bei schnellen Bewegungen sicher. Der wasserfeste Aufbau schützt zuverlässig vor Schweiß und Regen. Über die Ladeschale kommen Sie auf insgesamt rund 28 Stunden Musikwiedergabe.",
    image: "img-products-p1.jpg",
    typ: "In-Ear",
    akku: "8 Std. (28 Std. mit Ladeschale)",
    schutz: "IPX7",
    gewicht: "5,1 g pro Ohrhörer",
  },
  {
    id: 2,
    name: "AudioMax Air",
    price: 89,
    teaser: "Leichte Over-Ears mit weichen Memory-Foam-Polstern.",
    description:
      "Die AudioMax Air setzen auf einen betont leichten Bügel und weiche Memory-Foam-Polster für lange Hörsessions. Der Klang ist ausgewogen abgestimmt, mit klaren Höhen und kontrolliertem Bass. Per Kabel lassen sich die Kopfhörer auch ohne Akku nutzen.",
    image: "img-products-p2.jpg",
    typ: "Over-Ear",
    akku: "34 Std.",
    schutz: "IPX2",
    gewicht: "218 g",
  },
  {
    id: 3,
    name: "PulseAudio Mini",
    price: 49,
    teaser: "Kompakte In-Ears für den Alltag und kurze Wege.",
    description:
      "Die PulseAudio Mini sind besonders klein gebaut und verschwinden fast vollständig im Ohr. Trotz der kompakten Bauform liefern sie einen kräftigen Bass. Die Ladeschale passt in jede Hosentasche.",
    image: "img-products-p3.jpg",
    typ: "In-Ear",
    akku: "6 Std. (22 Std. mit Ladeschale)",
    schutz: "IPX4",
    gewicht: "4,3 g pro Ohrhörer",
  },
  {
    id: 4,
    name: "ClearTone Studio",
    price: 119,
    teaser: "Over-Ears mit aktiver Geräuschunterdrückung.",
    description:
      "Die ClearTone Studio filtern Umgebungsgeräusche mit einer zweistufigen aktiven Geräuschunterdrückung heraus. Ein Transparenzmodus lässt Stimmen bei Bedarf wieder durch. Die Ohrmuscheln lassen sich flach drehen und platzsparend verstauen.",
    image: "img-products-p4.jpg",
    typ: "Over-Ear",
    akku: "40 Std.",
    schutz: "IPX2",
    gewicht: "254 g",
  },
  {
    id: 5,
    name: "SoftBeat Nova",
    price: 59,
    teaser: "Kabellose Ohrhörer mit warmer Klangabstimmung.",
    description:
      "Die SoftBeat Nova sind auf eine warme, angenehme Klangabstimmung ausgelegt und eignen sich gut für Podcasts und Hörbücher. Die matte Oberfläche fühlt sich griffig an. Vier Aufsatzgrößen liegen bei.",
    image: "img-products-p5.jpg",
    typ: "In-Ear",
    akku: "7 Std. (25 Std. mit Ladeschale)",
    schutz: "IPX4",
    gewicht: "4,8 g pro Ohrhörer",
  },
  {
    id: 6,
    name: "BassLine Grip",
    price: 74,
    teaser: "Sportkopfhörer mit rutschfestem Bügel.",
    description:
      "Der gummierte Bügel der BassLine Grip liegt eng am Kopf an und verrutscht auch beim Training nicht. Der Bass ist bewusst kräftig abgestimmt. Eine Schnellladung von zehn Minuten reicht für rund zwei Stunden Wiedergabe.",
    image: "img-products-p6.jpg",
    typ: "On-Ear",
    akku: "24 Std.",
    schutz: "IPX5",
    gewicht: "176 g",
  },
  {
    id: 7,
    name: "UrbanSound Dock",
    price: 65,
    teaser: "In-Ears mit robuster Ladeschale für unterwegs.",
    description:
      "Die UrbanSound Dock kommen mit einer besonders stabilen Ladeschale, die auch in der Tasche einiges aushält. Die Bedienung erfolgt über Berührungsflächen an beiden Ohrhörern. Eine Einzelnutzung eines Ohrhörers ist möglich.",
    image: "img-products-p7.jpg",
    typ: "In-Ear",
    akku: "6 Std. (30 Std. mit Ladeschale)",
    schutz: "IPX4",
    gewicht: "5,4 g pro Ohrhörer",
  },
  {
    id: 8,
    name: "RedLine Beat 300",
    price: 99,
    teaser: "Auffällige Over-Ears mit kräftigem Bass.",
    description:
      "Die RedLine Beat 300 setzen auf große 40-mm-Treiber und eine basslastige Abstimmung. Der Bügel ist mehrstufig verstellbar und gepolstert. Ein Mikrofonarm ist nicht nötig — Telefonate laufen über zwei integrierte Mikrofone.",
    image: "img-products-p8.jpg",
    typ: "Over-Ear",
    akku: "30 Std.",
    schutz: "IPX2",
    gewicht: "262 g",
  },
  {
    id: 9,
    name: "AirFlow Green Edition",
    price: 55,
    teaser: "Leichte Ohrhörer in matter Farboberfläche.",
    description:
      "Die AirFlow Green Edition wiegen kaum spürbare fünf Gramm pro Seite und eignen sich für lange Tage im Ohr. Die halboffene Bauform verhindert Druckgefühl. Umgebungsgeräusche bleiben dabei hörbar.",
    image: "img-products-p9.jpg",
    typ: "In-Ear",
    akku: "5 Std. (20 Std. mit Ladeschale)",
    schutz: "IPX4",
    gewicht: "5,0 g pro Ohrhörer",
  },
  {
    id: 10,
    name: "SoundWave Clip",
    price: 79,
    teaser: "Offene Clip-Ohrhörer ohne Druck im Gehörgang.",
    description:
      "Die SoundWave Clip werden außen an der Ohrmuschel befestigt und verschließen den Gehörgang nicht. Dadurch bleiben Verkehr und Umgebung hörbar — praktisch beim Laufen im Freien. Der Klang bleibt trotz offener Bauweise klar.",
    image: "img-products-p10.jpg",
    typ: "In-Ear",
    akku: "9 Std. (26 Std. mit Ladeschale)",
    schutz: "IPX5",
    gewicht: "6,2 g pro Ohrhörer",
  },
  {
    id: 11,
    name: "DeepBlue Studio One",
    price: 109,
    teaser: "Studiokopfhörer mit neutraler Abstimmung.",
    description:
      "Die DeepBlue Studio One zielen auf eine möglichst neutrale Wiedergabe und eignen sich für Aufnahme und Schnitt. Die Ohrpolster sind austauschbar. Ein Spiralkabel liegt für den kabelgebundenen Betrieb bei.",
    image: "img-products-p11.jpg",
    typ: "Over-Ear",
    akku: "36 Std.",
    schutz: "IPX2",
    gewicht: "279 g",
  },
  {
    id: 12,
    name: "TrailRun Open",
    price: 84,
    teaser: "Offener Sportkopfhörer für Läufe im Freien.",
    description:
      "Der TrailRun Open sitzt vor statt im Ohr und lässt Umgebungsgeräusche bewusst durch. Der Nackenbügel bleibt auch bei ruppigen Trails stabil. Schweiß und Regen machen dem Gehäuse nichts aus.",
    image: "img-products-p12.jpg",
    typ: "On-Ear",
    akku: "10 Std.",
    schutz: "IPX6",
    gewicht: "31 g",
  },
  {
    id: 13,
    name: "RunFit Air Lite",
    price: 62,
    teaser: "Sport-In-Ears mit besonders leichtem Gehäuse.",
    description:
      "Die RunFit Air Lite sind eine abgespeckte Variante für Einsteiger ins Lauftraining. Sie sitzen fest, ohne zu drücken, und halten Schweiß problemlos stand. Die Bedienung erfolgt über je eine Taste pro Seite.",
    image: "img-products-p1.jpg",
    typ: "In-Ear",
    akku: "7 Std. (24 Std. mit Ladeschale)",
    schutz: "IPX6",
    gewicht: "4,9 g pro Ohrhörer",
  },
  {
    id: 14,
    name: "AudioMax Comfort",
    price: 94,
    teaser: "Over-Ears mit besonders großen Ohrpolstern.",
    description:
      "Die AudioMax Comfort setzen auf übergroße Polster, die das ganze Ohr umschließen. Der Anpressdruck ist bewusst gering gehalten. Auch nach mehreren Stunden bleibt das Tragegefühl angenehm.",
    image: "img-products-p2.jpg",
    typ: "Over-Ear",
    akku: "32 Std.",
    schutz: "IPX2",
    gewicht: "231 g",
  },
  {
    id: 15,
    name: "PulseAudio Sport X",
    price: 71,
    teaser: "Wasserfeste In-Ears mit stabilem Sitz.",
    description:
      "Die PulseAudio Sport X kombinieren einen kurzen Stiel mit einem zusätzlichen Silikonflügel für festen Halt. Das Gehäuse ist vollständig gegen Wasser geschützt. Ein kurzer Signalton meldet niedrigen Akkustand.",
    image: "img-products-p3.jpg",
    typ: "In-Ear",
    akku: "8 Std. (27 Std. mit Ladeschale)",
    schutz: "IPX7",
    gewicht: "5,3 g pro Ohrhörer",
  },
  {
    id: 16,
    name: "ClearTone Silent 40",
    price: 115,
    teaser: "Reisekopfhörer mit starker Geräuschreduktion.",
    description:
      "Die ClearTone Silent 40 sind auf lange Flug- und Bahnreisen ausgelegt und dämpfen tieffrequente Geräusche deutlich. Ein Hartschalenetui gehört zum Lieferumfang. Der Akku hält problemlos mehrere Reisetage.",
    image: "img-products-p4.jpg",
    typ: "Over-Ear",
    akku: "42 Std.",
    schutz: "IPX2",
    gewicht: "248 g",
  },
  {
    id: 17,
    name: "SoftBeat Daily",
    price: 45,
    teaser: "Günstige Ohrhörer für den täglichen Gebrauch.",
    description:
      "Die SoftBeat Daily decken die Grundlagen zuverlässig ab: stabile Verbindung, klare Sprachwiedergabe, einfache Bedienung. Sie eignen sich gut als Zweitpaar für Büro oder Pendelweg. Die Ladeschale wird über USB-C geladen.",
    image: "img-products-p5.jpg",
    typ: "In-Ear",
    akku: "5 Std. (18 Std. mit Ladeschale)",
    schutz: "IPX4",
    gewicht: "4,6 g pro Ohrhörer",
  },
  {
    id: 18,
    name: "BassLine Motion",
    price: 68,
    teaser: "On-Ears mit faltbarem Bügel für unterwegs.",
    description:
      "Die BassLine Motion lassen sich zusammenklappen und passen so in kleine Taschen. Die Abstimmung betont Bass und untere Mitten. Ein Beutel aus Filz liegt bei.",
    image: "img-products-p6.jpg",
    typ: "On-Ear",
    akku: "26 Std.",
    schutz: "IPX4",
    gewicht: "168 g",
  },
  {
    id: 19,
    name: "UrbanSound Pocket",
    price: 52,
    teaser: "Flache Ladeschale, unauffälliges Design.",
    description:
      "Die UrbanSound Pocket kommen in einer flachen Ladeschale, die kaum aufträgt. Die Ohrhörer sitzen locker und lassen sich schnell ein- und ausstöpseln. Für Sport sind sie nur bedingt geeignet.",
    image: "img-products-p7.jpg",
    typ: "In-Ear",
    akku: "6 Std. (21 Std. mit Ladeschale)",
    schutz: "IPX4",
    gewicht: "4,7 g pro Ohrhörer",
  },
  {
    id: 20,
    name: "RedLine Court",
    price: 88,
    teaser: "Robuste Over-Ears für Training und Halle.",
    description:
      "Die RedLine Court haben ein verstärktes Bügelgelenk und halten auch gröberer Behandlung stand. Die Polster sind abwischbar. Die Verbindung bleibt auch über größere Distanzen stabil.",
    image: "img-products-p8.jpg",
    typ: "Over-Ear",
    akku: "28 Std.",
    schutz: "IPX4",
    gewicht: "244 g",
  },
  {
    id: 21,
    name: "AirFlow Duo",
    price: 76,
    teaser: "Zwei Geräte gleichzeitig verbunden.",
    description:
      "Die AirFlow Duo lassen sich parallel mit Notebook und Telefon verbinden und wechseln automatisch zur aktiven Quelle. Die Mikrofone unterdrücken Windgeräusche. Der Sitz ist flach und unauffällig.",
    image: "img-products-p9.jpg",
    typ: "In-Ear",
    akku: "7 Std. (23 Std. mit Ladeschale)",
    schutz: "IPX4",
    gewicht: "5,2 g pro Ohrhörer",
  },
  {
    id: 22,
    name: "SoundWave Metal",
    price: 97,
    teaser: "Ohrhörer mit Gehäuse aus gebürstetem Metall.",
    description:
      "Die SoundWave Metal setzen auf ein Aluminiumgehäuse, das kühl und wertig wirkt. Der Klang ist detailreich mit zurückhaltendem Bass. Die Ladeschale ist ebenfalls aus Metall gefertigt.",
    image: "img-products-p10.jpg",
    typ: "In-Ear",
    akku: "8 Std. (24 Std. mit Ladeschale)",
    schutz: "IPX5",
    gewicht: "6,0 g pro Ohrhörer",
  },
  {
    id: 23,
    name: "DeepBlue Travel",
    price: 103,
    teaser: "Over-Ears mit Etui und Flugadapter.",
    description:
      "Die DeepBlue Travel sind als Reisebegleiter gedacht und bringen Etui sowie Flugadapter mit. Die Geräuschreduktion arbeitet in zwei Stufen. Der Bügel klappt vollständig ein.",
    image: "img-products-p11.jpg",
    typ: "Over-Ear",
    akku: "38 Std.",
    schutz: "IPX2",
    gewicht: "236 g",
  },
  {
    id: 24,
    name: "TrailRun Band 2",
    price: 39,
    teaser: "Einfacher Sportkopfhörer zum Einstiegspreis.",
    description:
      "Der TrailRun Band 2 ist die günstigste Sportvariante im Sortiment. Der Nackenbügel sitzt fest, die Bedienung ist auf das Nötigste reduziert. Für Regen und Schweiß ist das Gehäuse ausgelegt.",
    image: "img-products-p12.jpg",
    typ: "On-Ear",
    akku: "9 Std.",
    schutz: "IPX5",
    gewicht: "29 g",
  },
  {
    id: 25,
    name: "NovaSound Breeze",
    price: 59,
    teaser: "Leichte In-Ears mit luftigem Sitz für den ganzen Tag.",
    description:
      "Die NovaSound Breeze wiegen kaum fünf Gramm und liegen dank weicher Aufsätze angenehm im Ohr. Der Klang ist hell und detailreich, mit dezentem Bass. Über die Ladeschale sind rund 24 Stunden Wiedergabe möglich.",
    image: "img-products-p5.jpg",
    typ: "In-Ear",
    akku: "7 Std. (24 Std. mit Ladeschale)",
    schutz: "IPX4",
    gewicht: "4,8 g pro Ohrhörer",
  },
  {
    id: 26,
    name: "CloudNine Comfort 2",
    price: 99,
    teaser: "Over-Ears mit besonders weichen Polstern für lange Sessions.",
    description:
      "Die CloudNine Comfort 2 setzen auf dick gepolsterte Ohrmuscheln und ein geringes Gewicht. Die Abstimmung ist warm und ausgewogen, ideal für Musik und Hörbücher. Der Bügel lässt sich stufenlos verstellen.",
    image: "img-products-p2.jpg",
    typ: "Over-Ear",
    akku: "35 Std.",
    schutz: "IPX2",
    gewicht: "226 g",
  },
  {
    id: 27,
    name: "SportBand Flex",
    price: 55,
    teaser: "Flexibler Sportkopfhörer mit wasserfestem Gehäuse.",
    description:
      "Der SportBand Flex umschließt das Ohr mit einem flexiblen, wasserabweisenden Band. Er hält Schweiß und Spritzwasser problemlos stand. Die Tasten sind so groß gebaut, dass sie auch mit Handschuhen bedienbar sind.",
    image: "img-products-p6.jpg",
    typ: "On-Ear",
    akku: "18 Std.",
    schutz: "IPX5",
    gewicht: "158 g",
  },
  {
    id: 28,
    name: "EchoPods Lite",
    price: 47,
    teaser: "Einfache In-Ears mit klarer Sprachwiedergabe.",
    description:
      "Die EchoPods Lite bieten alles Wichtige: schnelles Koppeln, klare Telefonate und eine handliche Ladeschale. Der Klang ist neutral abgestimmt und für Podcasts gut geeignet. Die Bedienung erfolgt über Tasten an beiden Hörern.",
    image: "img-products-p7.jpg",
    typ: "In-Ear",
    akku: "6 Std. (20 Std. mit Ladeschale)",
    schutz: "IPX4",
    gewicht: "4,5 g pro Ohrhörer",
  },
  {
    id: 29,
    name: "StudioLine Reference",
    price: 129,
    teaser: "Referenzkopfhörer mit sehr detailreicher Wiedergabe.",
    description:
      "Die StudioLine Reference wurden für anspruchsvolles Hören zu Hause entwickelt. Hohe und mittlere Frequenzen werden besonders fein aufgelöst. Große, weiche Polster sorgen auch bei langen Sessions für einen angenehmen Sitz.",
    image: "img-products-p11.jpg",
    typ: "Over-Ear",
    akku: "44 Std.",
    schutz: "IPX2",
    gewicht: "268 g",
  },
  {
    id: 30,
    name: "TrailRun X2",
    price: 89,
    teaser: "Robuster Trailkopfhörer mit festem Sitz und gutem Schutz.",
    description:
      "Der TrailRun X2 ist für anspruchsvolle Läufe abseits befestigter Wege gebaut. Das Gehäuse ist staub- und wassergeschützt, der Bügel sitzt auch bei schnellen Richtungswechseln fest. Eine Schnellladung reicht für zwei Stunden Wiedergabe.",
    image: "img-products-p12.jpg",
    typ: "On-Ear",
    akku: "20 Std.",
    schutz: "IPX6",
    gewicht: "172 g",
  },
  {
    id: 31,
    name: "AquaBeat Swim",
    price: 78,
    teaser: "Wasserfeste In-Ears für Schwimmen und intensives Training.",
    description:
      "Die AquaBeat Swim sind vollständig wasserdicht gebaut und vertragen auch längeren Kontakt mit Schweiß und Regen. Die Aufsätze sitzen eng und rutschen nicht. Im Wasser ist die Bluetooth-Reichweite naturgemäß begrenzt.",
    image: "img-products-p1.jpg",
    typ: "In-Ear",
    akku: "8 Std. (26 Std. mit Ladeschale)",
    schutz: "IPX7",
    gewicht: "5,6 g pro Ohrhörer",
  },
  {
    id: 32,
    name: "QuietMax Home",
    price: 92,
    teaser: "Bequeme Over-Ears mit sanfter Geräuschdämpfung.",
    description:
      "Die QuietMax Home dämpfen störende Alltagsgeräusche sanft ab, ohne den Klang zu verfärben. Ein Transparenzmodus lässt Gespräche bei Bedarf durch. Die Ohrmuscheln sind drehbar und lassen sich flach verstauen.",
    image: "img-products-p4.jpg",
    typ: "Over-Ear",
    akku: "38 Std.",
    schutz: "IPX2",
    gewicht: "242 g",
  },
  {
    id: 33,
    name: "BassLine Street",
    price: 64,
    teaser: "On-Ears mit kräftigem Bass für den Stadtgebrauch.",
    description:
      "Der BassLine Street ist auf einen vollen, druckvollen Bass ausgelegt und eignet sich gut für Hip-Hop und Elektronik. Das robuste Gehäuse hält den Alltag im Rucksack problemlos aus. Der Bügel ist gepolstert und klappbar.",
    image: "img-products-p6.jpg",
    typ: "On-Ear",
    akku: "25 Std.",
    schutz: "IPX4",
    gewicht: "181 g",
  },
  {
    id: 34,
    name: "PocketTone Slim",
    price: 43,
    teaser: "Sehr flache In-Ears mit winziger Ladeschale.",
    description:
      "Die PocketTone Slim gehören zu den kleinsten Modellen im Sortiment und verschwinden fast vollständig im Ohr. Die Ladeschale ist flacher als eine Karte. Der Klang ist ausgeglichen, mit leicht betonten Höhen.",
    image: "img-products-p10.jpg",
    typ: "In-Ear",
    akku: "5 Std. (19 Std. mit Ladeschale)",
    schutz: "IPX4",
    gewicht: "4,2 g pro Ohrhörer",
  },
  {
    id: 35,
    name: "ClearTone Voice Pro",
    price: 108,
    teaser: "Business-Over-Ears mit vier Mikrofonen für klare Anrufe.",
    description:
      "Die ClearTone Voice Pro richten sich an alle, die viel telefonieren. Vier Mikrofone filtern Hintergrundgeräusche aus der Stimme heraus. Die Polster sind austauschbar und lassen sich abwischen.",
    image: "img-products-p4.jpg",
    typ: "Over-Ear",
    akku: "34 Std.",
    schutz: "IPX2",
    gewicht: "238 g",
  },
  {
    id: 36,
    name: "AirFlow Sport Mini",
    price: 66,
    teaser: "Kleine Sport-In-Ears mit offenem Sitz und festem Halt.",
    description:
      "Die AirFlow Sport Mini kombinieren eine halboffene Bauform mit Silikonflügeln für sicheren Halt. Umgebungsgeräusche bleiben hörbar, was beim Laufen im Freien sicherer ist. Das Gehäuse ist gegen Schweiß geschützt.",
    image: "img-products-p9.jpg",
    typ: "In-Ear",
    akku: "6 Std. (21 Std. mit Ladeschale)",
    schutz: "IPX5",
    gewicht: "4,7 g pro Ohrhörer",
  },
];

/** Wörter, die keine echte Eingrenzung darstellen. */
var GENERIC_WORDS = new Set([
  "kopfhörer",
  "kopfhorer",
  "kopfhöhrer",
  "kopfhoerer",
  "headphones",
  "headphone",
  "ohrhörer",
  "ohrhoerer",
  "słuchawki",
  "sluchawki",
  "earbuds",
  "in-ears",
  "over-ears",
  "on-ears",
  "bluetooth",
  "kabellose",
  "kabellos",
  "wireless",
  "audio",
  "suche",
  "suchen",
  "gute",
  "guter",
  "gutes",
  "neue",
  "neuer",
  "neues",
  "für",
  "fuer",
  "und",
  "mit",
  "die",
  "der",
  "das",
  "ich",
  "bitte",
]);

/** Zugeordnete Farben pro Produkt (für die Stichwortsuche). */
var COLORS = {
  1: ["schwarz"],
  2: ["schwarz", "grau"],
  3: ["weiß", "weiss"],
  4: ["schwarz"],
  5: ["blau"],
  6: ["schwarz", "silber"],
  7: ["weiß", "weiss", "rosa"],
  8: ["schwarz"],
  9: ["grau", "silber"],
  10: ["schwarz", "rot"],
  11: ["weiß", "weiss"],
  12: ["schwarz", "blau"],
  13: ["weiß", "weiss"],
  14: ["schwarz"],
  15: ["schwarz", "rot"],
  16: ["grau"],
  17: ["schwarz"],
  18: ["blau", "schwarz"],
  19: ["weiß", "weiss", "beige"],
  20: ["schwarz"],
  21: ["rot"],
  22: ["schwarz", "grau"],
  23: ["silber", "weiß", "weiss"],
  24: ["schwarz"],
  25: ["weiß", "weiss"],
  26: ["grau"],
  27: ["schwarz", "blau"],
  28: ["schwarz"],
  29: ["schwarz"],
  30: ["schwarz", "grün"],
  31: ["blau"],
  32: ["beige", "weiß", "weiss"],
  33: ["rot", "schwarz"],
  34: ["weiß", "weiss", "silber"],
  35: ["schwarz", "silber"],
  36: ["blau", "weiß", "weiss"],
};

/** Brauchbare Stichwörter einer Suchanfrage (ohne Füllwörter). */
function searchWords(query) {
  return query
    .toLowerCase()
    .split(/[^a-zäöüß0-9]+/i)
    .filter((w) => w.length >= 3 && !GENERIC_WORDS.has(w));
}

/** Anzahl der treffenden Stichwörter für ein Produkt. */
function matchScore(p, words) {
  if (!words.length) return 0;
  var hay =
    `${p.name} ${p.teaser} ${p.description} ${p.typ} ${(COLORS[p.id] ?? []).join(" ")}`.toLowerCase();
  var n = 0;
  for (var i = 0; i < words.length; i++) {
    var w = words[i];
    if (hay.includes(w)) {
      n += 1;
      continue;
    }
    // Leichte Grundform-Erkennung: schwarze → schwarz, blaue → blau
    var stem = w.replace(/(?:en|es|er|e|n|s)$/, "");
    if (stem.length >= 3 && hay.includes(stem)) n += 1;
  }
  return n;
}

/**
 * Leichte, kosmetische Suche: filtert nach Stichworten in Name, Teaser,
 * Beschreibung, Bauform und Farbe. Liefert die volle Liste, wenn die Anfrage
 * keine brauchbaren Stichworte enthält oder nichts passt.
 */
function filterProducts(query) {
  var words = searchWords(query);
  if (!words.length) return PRODUCTS;
  var matches = PRODUCTS.filter((p) => matchScore(p, words) > 0);
  return matches.length ? matches : PRODUCTS;
}



var CATEGORIES = [
  {
    slug: "lautsprecher",
    title: "Lautsprecher",
    parent: "Audio",
    icon: "🔊",
    intro: "Bluetooth-Boxen, Soundbars und Multiroom-Systeme für jeden Raum.",
    products: [
      { name: "SoundWave Cube 200", price: 79, icon: "🔊" },
      { name: "BassLine Tower X", price: 249, icon: "🔊" },
      { name: "AudioMax Bar 3.1", price: 189, icon: "📻" },
      { name: "PulseAudio Go", price: 49, icon: "🔈" },
      { name: "ClearTone Room One", price: 129, icon: "🔊" },
      { name: "EchoField Mini", price: 39, icon: "🔈" },
      { name: "NordSound Party 400", price: 199, icon: "🎛️" },
      { name: "VibraBox Outdoor", price: 89, icon: "🔊" },
      { name: "SoundWave Duo Set", price: 159, icon: "🔊" },
      { name: "AudioMax Deck 50", price: 109, icon: "📻" },
      { name: "PulseAudio Stage", price: 299, icon: "🎚️" },
      { name: "ClearTone Wall Slim", price: 139, icon: "🔉" },
    ],
  },
  {
    slug: "smartwatches",
    title: "Smartwatches & Wearables",
    parent: "Handy & Tablet",
    icon: "⌚",
    intro: "Fitness-Tracker und Smartwatches mit GPS, Pulsmessung und langer Laufzeit.",
    products: [
      { name: "TimeFit Active 2", price: 99, icon: "⌚" },
      { name: "PulseBand Lite", price: 39, icon: "⌚" },
      { name: "NordTime Sport GPS", price: 179, icon: "⌚" },
      { name: "VitaWatch Round", price: 149, icon: "⌚" },
      { name: "TimeFit Kids", price: 59, icon: "⌚" },
      { name: "RunFit Watch Trail", price: 219, icon: "⌚" },
      { name: "PulseBand Pro HR", price: 79, icon: "⌚" },
      { name: "VitaWatch Steel Edition", price: 259, icon: "⌚" },
      { name: "NordTime Daily", price: 69, icon: "⌚" },
      { name: "TimeFit Square 44", price: 119, icon: "⌚" },
      { name: "PulseBand Swim", price: 89, icon: "⌚" },
      { name: "VitaWatch Solar", price: 299, icon: "⌚" },
    ],
  },
  {
    slug: "laptops",
    title: "Laptops & Notebooks",
    parent: "Computer",
    icon: "💻",
    intro: "Notebooks für Büro, Studium und Gaming — mit aktuellen Prozessoren und SSD.",
    products: [
      { name: "NovaBook Air 14", price: 649, icon: "💻" },
      { name: "WorkLine Pro 15", price: 899, icon: "💻" },
      { name: "NovaBook Study 13", price: 479, icon: "💻" },
      { name: "TitanForce Gaming 16", price: 1399, icon: "💻" },
      { name: "WorkLine Convertible", price: 799, icon: "💻" },
      { name: "NovaBook Ultra 14", price: 1099, icon: "💻" },
      { name: "OfficeMate Basic 15", price: 399, icon: "💻" },
      { name: "TitanForce Creator", price: 1599, icon: "💻" },
      { name: "WorkLine Slim 13", price: 749, icon: "💻" },
      { name: "NovaBook Touch 15", price: 869, icon: "💻" },
      { name: "OfficeMate Home 17", price: 599, icon: "💻" },
      { name: "TitanForce Compact", price: 1199, icon: "💻" },
    ],
  },
  {
    slug: "smart-home",
    title: "Smart Home",
    parent: "Haushalt",
    icon: "🏠",
    intro: "Licht, Heizung, Kameras und Steckdosen — bequem per App gesteuert.",
    products: [
      { name: "HomeGrid Steckdose 2er", price: 24, icon: "🔌" },
      { name: "LumiSet Farblampe E27", price: 19, icon: "💡" },
      { name: "SafeView Innenkamera", price: 59, icon: "📷" },
      { name: "ThermoLine Heizregler", price: 49, icon: "🌡️" },
      { name: "HomeGrid Hub Mini", price: 79, icon: "📡" },
      { name: "LumiSet LED-Strip 5m", price: 34, icon: "💡" },
      { name: "SafeView Türklingel", price: 129, icon: "🔔" },
      { name: "AquaStop Wassermelder", price: 29, icon: "💧" },
      { name: "HomeGrid Fensterkontakt", price: 22, icon: "🪟" },
      { name: "LumiSet Deckenpanel", price: 89, icon: "💡" },
      { name: "SafeView Außenkamera 2K", price: 149, icon: "📷" },
      { name: "ThermoLine Raumfühler", price: 39, icon: "🌡️" },
    ],
  },
  {
    slug: "gaming",
    title: "Gaming",
    parent: "Computer",
    icon: "🎮",
    intro: "Controller, Headsets, Monitore und Zubehör für Konsole und PC.",
    products: [
      { name: "PlayGrip Controller X", price: 59, icon: "🎮" },
      { name: "TitanForce Monitor 27\"", price: 279, icon: "🖥️" },
      { name: "RapidKey Mechanisch RGB", price: 89, icon: "⌨️" },
      { name: "GlideMouse Pro 8K", price: 69, icon: "🖱️" },
      { name: "PlayGrip Racing Wheel", price: 199, icon: "🕹️" },
      { name: "TitanForce Gaming-Stuhl", price: 249, icon: "💺" },
      { name: "RapidKey Compact 65%", price: 64, icon: "⌨️" },
      { name: "StreamLight Ringlicht", price: 45, icon: "💡" },
      { name: "PlayGrip Arcade Stick", price: 139, icon: "🕹️" },
      { name: "GlideMouse Pad XXL", price: 24, icon: "🖱️" },
      { name: "TitanForce Capture Box", price: 119, icon: "🎛️" },
      { name: "StreamLight Mikrofon USB", price: 79, icon: "🎤" },
    ],
  },
  {
    slug: "handy-tablet",
    title: "Handy & Tablet",
    parent: "Start",
    icon: "📱",
    intro: "Smartphones, Tablets und Zubehör — mit Tarifoption und Inzahlungnahme.",
    products: [
      { name: "NordPhone 12 Lite", price: 249, icon: "📱" },
      { name: "NordPhone 12 Pro", price: 649, icon: "📱" },
      { name: "TabLine 10 WiFi", price: 199, icon: "📲" },
      { name: "NordPhone Mini 5G", price: 429, icon: "📱" },
      { name: "TabLine 11 Pro LTE", price: 499, icon: "📲" },
      { name: "ChargeUp Powerbank 20k", price: 39, icon: "🔋" },
      { name: "NordPhone Rugged XR", price: 359, icon: "📱" },
      { name: "TabLine Kids 8", price: 129, icon: "📲" },
      { name: "ChargeUp Ladestation 3in1", price: 49, icon: "🔌" },
      { name: "NordPhone 11 Classic", price: 199, icon: "📱" },
      { name: "GlassGuard Schutzset", price: 15, icon: "🛡️" },
      { name: "TabLine Tastatur-Cover", price: 69, icon: "⌨️" },
    ],
  },
  {
    slug: "haushalt",
    title: "Haushalt & Küche",
    parent: "Start",
    icon: "🍳",
    intro: "Kaffeevollautomaten, Staubsauger und Küchengeräte für den Alltag.",
    products: [
      { name: "BrewMaster Vollautomat", price: 449, icon: "☕" },
      { name: "CleanBot Saugroboter 300", price: 299, icon: "🤖" },
      { name: "KitchenLine Mixer 1200W", price: 89, icon: "🍹" },
      { name: "FreshAir Luftreiniger", price: 179, icon: "🌬️" },
      { name: "BrewMaster Filterkaffee", price: 59, icon: "☕" },
      { name: "CleanBot Akkusauger Flex", price: 149, icon: "🧹" },
      { name: "KitchenLine Airfryer 5L", price: 99, icon: "🍟" },
      { name: "SteamPress Bügelstation", price: 129, icon: "👔" },
      { name: "KitchenLine Toaster Duo", price: 39, icon: "🍞" },
      { name: "FreshAir Ventilator Turm", price: 79, icon: "🌀" },
      { name: "BrewMaster Milchaufschäumer", price: 45, icon: "🥛" },
      { name: "CleanBot Fenstersauger", price: 69, icon: "🪟" },
    ],
  },
  {
    slug: "angebote",
    title: "Angebote der Woche",
    parent: "Start",
    icon: "🏷️",
    intro: "Ausgewählte Aktionsartikel aus allen Bereichen — solange der Vorrat reicht.",
    products: [
      { name: "SoundWave Cube 200", price: 69, icon: "🔊" },
      { name: "NovaBook Air 14", price: 599, icon: "💻" },
      { name: "CleanBot Saugroboter 300", price: 259, icon: "🤖" },
      { name: "TimeFit Active 2", price: 79, icon: "⌚" },
      { name: "NordPhone 12 Lite", price: 219, icon: "📱" },
      { name: "BrewMaster Vollautomat", price: 399, icon: "☕" },
      { name: "TitanForce Monitor 27\"", price: 239, icon: "🖥️" },
      { name: "LumiSet Farblampe E27", price: 14, icon: "💡" },
      { name: "TabLine 10 WiFi", price: 169, icon: "📲" },
      { name: "RapidKey Mechanisch RGB", price: 74, icon: "⌨️" },
      { name: "FreshAir Luftreiniger", price: 149, icon: "🌬️" },
      { name: "SafeView Innenkamera", price: 49, icon: "📷" },
    ],
  },
  {
    slug: "computer",
    title: "Computer & Zubehör",
    parent: "Start",
    icon: "🖥️",
    intro: "PCs, Monitore, Drucker und Zubehör für Homeoffice und Studium.",
    products: [
      { name: "WorkLine Desktop i5", price: 699, icon: "🖥️" },
      { name: "ClearView Monitor 24\"", price: 149, icon: "🖥️" },
      { name: "PrintLine Multifunktion", price: 129, icon: "🖨️" },
      { name: "WorkLine Mini-PC", price: 449, icon: "🖥️" },
      { name: "RapidKey Office Set", price: 35, icon: "⌨️" },
      { name: "DataSafe SSD 1TB", price: 89, icon: "💾" },
      { name: "ClearView Monitor 32\" 4K", price: 379, icon: "🖥️" },
      { name: "NetLink WLAN-Router AX", price: 99, icon: "📡" },
      { name: "DataSafe Festplatte 4TB", price: 109, icon: "💾" },
      { name: "PrintLine Laser S/W", price: 179, icon: "🖨️" },
      { name: "WorkLine Dockingstation", price: 119, icon: "🔌" },
      { name: "NetLink Mesh Set 3er", price: 199, icon: "📡" },
    ],
  },
  {
    slug: "audio",
    title: "Audio & HiFi",
    parent: "Start",
    icon: "🎵",
    intro: "Kopfhörer, Lautsprecher, Plattenspieler und HiFi-Komponenten.",
    products: [
      { name: "SoundWave Cube 200", price: 79, icon: "🔊" },
      { name: "ClearTone Studio Monitor", price: 219, icon: "🎚️" },
      { name: "VinylLine Plattenspieler", price: 159, icon: "🎵" },
      { name: "AudioMax Bar 3.1", price: 189, icon: "📻" },
      { name: "PulseAudio Verstärker 60W", price: 249, icon: "🎛️" },
      { name: "EchoField Mini", price: 39, icon: "🔈" },
      { name: "VinylLine Schallplatten-Set", price: 29, icon: "💿" },
      { name: "NordSound DAB+ Radio", price: 69, icon: "📻" },
      { name: "ClearTone Mikrofon Studio", price: 119, icon: "🎤" },
      { name: "AudioMax Kabel-Set HiFi", price: 19, icon: "🔌" },
      { name: "PulseAudio Subwoofer 8\"", price: 179, icon: "🔊" },
      { name: "NordSound Kompaktanlage", price: 139, icon: "📻" },
    ],
  },
];

function categoryBySlug(slug) {
  return CATEGORIES.find((c) => c.slug === slug);
}


var CAT_IMAGES = {
  lautsprecher: ["img-cat-lautsprecher-1.jpg", "img-cat-lautsprecher-2.jpg"],
  smartwatches: ["img-cat-smartwatches-1.jpg", "img-cat-smartwatches-2.jpg"],
  laptops: ["img-cat-laptops-1.jpg", "img-cat-laptops-2.jpg"],
  "smart-home": ["img-cat-smart-home-1.jpg", "img-cat-smart-home-2.jpg"],
  gaming: ["img-cat-gaming-1.jpg", "img-cat-gaming-2.jpg"],
  "handy-tablet": ["img-cat-handy-tablet-1.jpg", "img-cat-handy-tablet-2.jpg"],
  haushalt: ["img-cat-haushalt-1.jpg", "img-cat-haushalt-2.jpg"],
  angebote: ["img-cat-angebote-1.jpg", "img-cat-angebote-2.jpg", "img-cat-audio-1.jpg", "img-cat-computer-1.jpg"],
  computer: ["img-cat-computer-1.jpg", "img-cat-computer-2.jpg", "img-cat-laptops-1.jpg"],
  audio: ["img-cat-audio-1.jpg", "img-cat-audio-2.jpg", "img-cat-lautsprecher-1.jpg"],
};

var CAT_FALLBACK = ["img-cat-audio-2.jpg", "img-cat-computer-1.jpg", "img-cat-haushalt-1.jpg"];

/** Festes Foto pro Produkt innerhalb einer Kategorie. */
function catImage(slug, index) {
  var pool = CAT_IMAGES[slug] || CAT_FALLBACK;
  return pool[index % pool.length];
}

/** Feste Darstellungsdaten pro Produkt-ID (Bewertung, Anzahl Bewertungen, Rabatt). */
function ratingFor(id) { return 3.9 + ((id * 7) % 11) / 10; }
function reviewsFor(id) { return 42 + ((id * 137) % 860); }
function discountFor(id) {
  if (id % 4 !== 0) return null;
  var d = [10, 15, 20, 25][(id / 4) % 4];
  return d || 20;
}

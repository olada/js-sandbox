# JS-SANDBOX
Playing around with Javascript stuff.


## Start der Webanwendung:
Grundsätzlich gilt: Falls eine der folgenden Anweisungen auf Anhieb mit einem Fehler abbricht, einfach nochmal ausführen.

* Install node (e.g. version 2.15.8)
* `npm install gulp -g`
* `npm install webpack -g`
* `npm install webpack-dev-server -g`
* `git clone this repo`
* navigate to repo, then:
* `npm install`
* `gulp build-and-serve`
* Navigate to <http://localhost:1337>

## Beispiel:
Die Webanwendung zeigt einen Graphen (zu Beginn leer), sowie einige Eingabemasken. Folgende Werte generieren einen Graphen:

Tab Kunden-Basisdaten:
* Monatliches Einkommen: 2000
* Monatliche Ausgaben: 1500
* Anzahl Kinder im Haushalt: 2
* Alter Kind 1: 5
* Alter Kind 2: 16

Tab Krediteinstellungen:
* Laufzeit (in Jahren): 4
* Jahreszins (in %): 5
* Kreditbetrag: 7000

Folgender Graph sollte zu sehen sein:
(https://github.com/olada/js-sandbox/raw/master/docs/graph1.png)

Der Graph zeigt drei Linien:
- grün: monatliches Einkommen (durchgezogene Linie, da es nur ein Eingabefeld gibt)
- rot: monatliche Ausgaben: In der Logik ist hinterlegt, dass Kinder ab einem bestimmten Alter unterschiedliche Kosten verursachen. Dadurch kommen die Veränderung der roten Kurve zu Stande.
- blau: Zu zahlender Kreditbetrag (mit Zinseszins), der jeden Monat um die monatliche Rate abnimmt. Falls in dem jeweiligen Monat die Ausgaben höher sind als das Einkommen, wird dies durch einen roten Punkt auf der blauen Kurve signalisiert (wie es im Beispiel bis zum 35. Monat der Fall ist).

Mit jeder Eingabeänderung aktualisiert sich der Graph.

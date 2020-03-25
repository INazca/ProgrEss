# ProgrEss-UI-Prototyp v1.1
**ProgrEss** ist ein Classroom-Response-System, ausgerichtet auf den Einsatz in Einführungsprogrammierkursen. Mit **ProgrEss** können speziell auf die Erlernung des Programmierens abgestimmte Aufgaben an Studenten gestellt werden. Momentan existiert für das System nur der hier enthaltene UI-Prototyp.

## Quick start
Um den Prototypen zu installieren und zu starten, laden Sie sich das Projektverzeichnis herunter und führen darin die folgenden Konsolenbefehle in gegebener Reihenfolge aus:  
`$ npm install`  
`$ npm start`
  
Daraufhin startet sich ein lokaler Server, der über die Adresse *http://localhost:8701/* erreichbar ist

## Usage
* [Starten einer Umfrage](#starten-einer-umfrage)
* [Erstellen einer Umfrage](#erstellen-einer-umfrage)

### Starten einer Umfrage
Um eine Umfrage zu starten, muss auf der Hauptseite ein valider Umfragecode eingegeben und bestätigt werden. Momentan gibt es 30 verschiedene Umfragen mit Codes von *0001* bis *0030*. Auch selbserstellte Umfragen können mit der Anwendung durchlaufen werden.

An bestimmten Stellen der Anwendung muss momentan noch zusätzlich eingegriffen werden. Dies würde eigentlich durch einen Dozenten geschehen, der dann für alle Teilnehmer gleichzeitig die nächste Phase einleitet, was allerdings in diesem Prototypen bis dato nicht umgesetzt wurde. An einer Stelle, an der das System nicht von alleine weiterschaltet, wie z.B. in den *Discuss*- und *Reveal*-Phasen, muss der Nutzer die **ENDE**-Taste betätigen, um zum nächsten View zu gelangen.

Außerdem sind momentan noch Rudimente der Studie enthalten, die nach jeder Aufgabe angezeigt werden. Diese können allerdings einfach ignoriert und mit der Taste **ENDE** geskippt werden.

### Erstellen einer Umfrage
Das Erstellen von Umfragen wird momentan nicht direkt durch die Anwendung unterstützt. Möchte man eine eigene Umfrage erstellen, so muss eine neue survey-JSON-Datei angelegt werden. Diese befinden sich im Ordner */data*. Die neue JSON-Datei muss den gewünschten Umfragecode enthalten.  
#### Beispiel
Die Umfrage soll über den Code "1234" abrufbar sein.  
Dann muss die JSON-Datei folgenden Namen tragen:  
`1234.JSON`  

Jede der survey-JSONs ist nach folgendem Schema aufgebaut:
* **surveyName** - der Name der Umfrage (z.B. "Kontrollstrukturen und Arrays")
* **taskList** - eine Liste mit beliebig vielen Aufgaben, die alle als Objekte angelegt sein müssen

Ein Aufgabenobjekt ist nach folgendem Schema aufgebaut:
* **id** - eine eindeutige ID der Aufgabe innerhalb der taskList (diese wird in späteren Versionen vermutlich wieder abgeschafft)
* **type** - der Aufgabentyp (möglich sind die Werte *syntax*, *type*, und *microtask*)
* **task** - die Aufgabenstellung (bei Aufgabentyp *type* nicht notwendig)
* **code** - der vorgegebene Code, der später in der Umfrage angezeigt wird
* **waitTime** - legt in ms fest, wie lange auf Aufgaben anderer Teilnehmer gewartet werden muss (nach Abschluss der *Solve*-Phase)
* einige aufgabenspezifische Werte

Es gibt 3 verschiedene Arten von Aufgabentypen, *Syntaxhighlighting*, *Typebestimmung* und *Microtask*, der über den Wert von **type** festgelegt wird. Jede Aufgabe hat dabei die folgenden spezifischen Werte:

#### *syntax*
* **highlights** - hier wird eine Liste von highlights übergeben, welche selbst als Objekt aufgebaut sind  
   *highlight*-Objekt:
    - **list** - eine Liste aus den Nummern der markierten Zeilen
    - **editor** - die Nummer des Teilnehmers, der die Lösung abgegeben hat (hier kann beim Erstellen einer eigenen Umfrage ein beliebiger Wert angegeben werden
* **heatmap** - eine Liste der in der Statistik markierten Zeilen, dieses Objekt enhält mindestens eine der folgenden Listen
    - **light** - in dieser Liste werden, als Zeilennummern, alle Markierungen aufgeführt, die nicht sehr frequent, aber mindestens einmal eingereicht wurden
    - **medium** - in dieser Liste werden, als Zeilennummern, alle Markierungen aufgeführt, die oft eingereicht wurden
    - **strong** - in dieser Liste werden, als Zeilennummern, alle Markierungen aufgeführt, die sehr oft eingereicht wurden
* **solution** - eine Liste aus Nummern der richtigen Zeilen

#### *type*
* **highlight** - ein Objekt aus den Werten **anchor** und **head**, *position*-Objekte, die jeweils eine Stelle im Code beschreiben und zur Markierung des Ausdrucks verbunden werden  
  *position*-Objekt:
    - **line** - die Zeile der Position
    - **ch** - der n-te Charakter der Zeile, die Position in der Zeile
* **evaluations** - eine Liste aus zu evaluierenden Lösungen, die als *type-evaluate*-Objekte aufgebaut sind  
  *type-evaluate*-Objekt:
    - **isLegal** - wurde der Ausdruck als zulässig bestimmt? (true, false)
    - **type** - der angegebene Rückgabetyp
    - **editor** - die Nummer des Teilnehmers, der die Lösung abgegeben hat (hier kann beim Erstellen einer eigenen Umfrage ein beliebiger Wert angegeben werden
* **expression** - der markierte Ausdruck in textueller Form
* **histogramm** - enthält die Daten für das Histogramm der *Discuss*-Phase, enthält eine belibiege Anzahl an *Balken*-Objekten  
  *Balken*-Objekt:
    - **group** - der Rückgabetyp, für den der Balken angezeigt wird
    - **correct** - Anteil der Gesamtzahl an Abgaben diesen Typs, die als korrekt gewertet wurden
    - **rest** - Rest der Angaben diesen Typs, der als falsch oder nicht bewertet wurde
* **solution** - enthält die richtige Lösung, gleiche Form wie *type-evaluate*-Objekt aber ohne **editor**

#### *microtask*
* **evaluations** - eine Liste der beliebig vieler, zu evaluierenden Lösungen, die als *microtask-evalaute*-Objekt aufgebaut sind  
  *microtask-evaluate*-Objekt:
    - **code** - der abgegebene Code des Teilnehmers
    - **editor** - die Nummer des Teilnehmers, der die Lösung abgegeben hat (hier kann beim Erstellen einer eigenen Umfrage ein beliebiger Wert angegeben werden
* **discussionSolutions** - eine Liste aus zwei Lösungen, die in der *Discuss*-Phase angezeigt werden, diese sind als *microtask-discuss*-Objekt anzulegen  
  *microtask-discuss*-Objekt:
    - **code** - der abgegebene Code
    - **percentage** - zu wie vielen Prozent die Abgabe als richtig gewertet wurde
* **solution** - vorgegebener Code, der eine richtige Lösung des Problems darstellt

Zusätzlich muss die Nummer der Umfrage noch in der Datei */lib/utils/ServerConst.js* registriert werden.

# Technische Struktur der Anwendung

## Struktur des Projektverzeichnisses
Das Projektverzeichnis ist nach folgendermaßen aufgebaut  
```text
ProgrEss/
├── app/
│   ├── resources/
│   │   ├── css/
│   │   │   └── enthält alle css-Dateien der Anwendung
│   │   └── js/
│   │       ├── controller/
│   │       │   ├── microtask/
│   │       │   │   └── hier sind alle für Microtask-Aufgaben notwendigen Controller enthalten
│   │       │   ├── syntax-highlighting/
│   │       │   │   └── hier sind alle für Microtask-Aufgaben notwendigen Controller enthalten
│   │       │   ├── type-determination/
│   │       │   │   └── hier sind alle für Microtask-Aufgaben notwendigen Controller enthalten
│   │       │   ├── Controller.js (oberste Klasse für alle Controller, außer indexViewer)
│   │       │   └── WaitPhase.js (Klasse für alle Wait-Phasen)
│   │       ├── tasks/
│   │       │   └── hier sind alle Datenmodelle für die Aufgabentypen enthalten
│   │       ├── utils/
│   │       │   ├── Animation.js (Verwaltung der Animationen)
│   │       │   ├── Logger.js (Verwaltung des Logs)
│   │       │   └── Observable.js
│   │       ├── views/
│   │       │   ├── subviews/
│   │       │   │   └── enthält alle untergeordneten Module zur View-Manipulation von Aufgaben
│   │       │   ├── CardView.js (oberste Klasse für alle Aufgabenkarten)
│   │       │   ├── HomeView.js (View-Manipulation der Startseite)
│   │       │   ├── SurveyViewer.js (Manipulation des übergeordneten UIs)
│   │       │   └── WaitView.js (Manipulation von Wait-Views)
│   │       ├── index.js (Hauptdatei für die Startseite)
│   │       ├── indexLog.js (Hauptdatei für die Log-Seite)
│   │       └── indexViewer.js (Hauptdatei für den Survey-Viewer)
│   └── views/
│   ├── partials/
│   │   ├── survey-viewer/
│   │   └── enthält alle Templates, die zum Aufbau von einzelnen Views im Survey-Viewer genutzt werden
│   │   ├── footer.ejs (Partial für noch nicht eingebauten Footer)
│   │   ├── header.ejs (Partial für den Header, also die Navbar)
│   │   ├── html-header.ejs (Partial für den Kopf aller HTML-Dateien)
│   │   └── html-close.ejs (Partial für Schließen der Tags am Ende aller HTML-Dateien)
│   ├── index.ejs (Template für Startseite)
│   ├── log.ejs (Template für Log-Seite)
│   └── survey-viewer.ejs (Template für den Survey-Viewer)
├── data/
│   ├── utils/
│   │   └── enthält alle Dateien, mit denen die Umfragen für die Studie programmatisch erstellt wurden
│   └── alle Umfragen die über die Anwendung ausgeführt werden können
├── lib/utils/
│   └── ServerConst.js (Einstellung des Servers)
└── app.js (Server der Anwendung)
```

## Details zu Klassen

### Controller
* die Controller stellen die zentralen Steuerklassen dar im SurveyViewer angezeigten Views dar
* jeder Controller in */app/resources/js/controller/* hat einen View, über den die zugehörige Survey-Card oder der Wait-View manipuliert werden kann
* jeder Controller erbt mindestens von der obersten Klasse "Controller.js"

### Views
* die Views enthaltenen die nötigen Objekte und Methoden, um die für den Benutzer sichtbare Schnittstelle zu manipulieren
* jeder View in */app/resources/js/views/*, außer "Homeview.js" und "SurveyViewer.js" referenziert ein Template aus */app/views/partials/survey-viewer/*, auf Basis dessen die Survey-Card oder der Wait-View erstellt erstellt wird
* die Survey-Cards werden mit Hilfe des Views mit den jeweiligen Inhalten befüllt
* jeder der Subviews und WaitView.js erbt mindestens von deren oberster Klasse "Cardview.js", die zentrale Klasse für Views, die im Survey-Viewer angezeigt werden sollen
* der "SurveyViewer.js" wird für die Verwaltung aller übergeordneten UI-Elemente, wie z.B. die Card-Controls (Abgabe-Button, Vor-/Zurückbuttons, etc.) genutzt
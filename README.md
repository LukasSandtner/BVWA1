# Projekt: Vědomostní Kvíz

> Interaktivní webová aplikace pro testování znalostí v různých oblastech a úrovních obtížnosti, vytvořená jako ročníkový/semestrální projekt.

## Popis aplikace
Tato aplikace je dynamický vědomostní kvíz, který uživatelům umožňuje vybrat si z pěti různých kategorií (Vesmír, Kultura, Matematika, Biologie, Technologie) a tří úrovní obtížnosti (Nízká, Střední, Vysoká). Otázky i jejich odpovědi se při každém spuštění náhodně míchají, což zajišťuje vysokou znovuhratelnost. 

Aplikace navíc obsahuje interaktivní souhlas s ukládáním tzv. "cookies" a pro každou úroveň uchovává historicky nejvyšší dosažené skóre přímo v prohlížeči uživatele.

## Hlavní funkce
* Rozmanitý obsah: 5 kategorií, každá obsahuje 30 otázek rozdělených podle obtížnosti.
* Náhodné generování: Otázky a jejich odpovědi se při každé nové hře náhodně promíchají.
* Ukládání postupu: Zapamatování nejvyššího skóre pro konkrétní kategorii a obtížnost pomocí document.cookie.
* GDPR & ePrivacy: Implementován vtipný a transparentní souhlas s ukládáním cookies.
* Okamžitá zpětná vazba: Vizuální odlišení správných a špatných odpovědí (zelené/červené orámování).
* Přístupnost (A11y): Využití ARIA atributů (např. aria-live) pro čtečky obrazovky a sémantické HTML.

## Použité technologie
Při vývoji byl kladen důraz na moderní přístup k tvorbě uživatelských rozhraní a oddělení datové vrstvy od aplikační logiky.

* React 18: Hlavní JavaScriptový framework pro tvorbu UI (využití useState, useEffect a podmíněného renderování).
* Bootstrap 5: CSS framework pro zajištění plně responzivního designu, stylizování tlačítek, karet a progress barů.
* JSON: Formát pro externí ukládání dat (otázek a odpovědí) k zajištění čistoty kódu v hlavních komponentách.
* Vlastní CSS: Drobné úpravy nad rámec Bootstrapu (hover efekty).
* Vanilla JS (v rámci Reactu): Zpracování logiky míchání polí (pomocí .sort() a Math.random()), manipulace s datem a časem pro expiraci cookies.

## Struktura projektu

```
quizz_app_sandtner/
├── public/                 # Statické soubory
├── src/                    # Zdrojové kódy aplikace
│   ├── data/               # Datová vrstva (JSON soubory)
│   │   ├── biologie.json
│   │   ├── kultura.json
│   │   ├── matematika.json
│   │   ├── technologie.json
│   │   └── vesmir.json
│   ├── App.jsx             # Hlavní komponenta s logikou aplikace
│   ├── main.jsx            # Vstupní bod React aplikace
│   └── styles.css          # Globální a custom styly
├── index.html              # Hlavní HTML šablona
├── package.json            # Závislosti a npm skripty
└── README.md   
```

# Dokumentace projektu

## Jak spustit projekt lokálně

Pro spuštění tohoto projektu na vašem zařízení budete potřebovat nainstalovaný Node.js.

1. Naklonování/stažení repozitáře:
   Stáhněte si složku s projektem do svého počítače a otevřete ji v terminálu.

2. Instalace závislostí:
   npm install

3. Spuštění vývojového serveru:
   npm run dev
   (Případně npm start, pokud byl projekt inicializován přes Create React App)

4. Otevření v prohlížeči:
   Aplikace poběží na adrese, která se vypíše v terminálu (standardně http://localhost:5173 nebo http://localhost:3000).

---
Autor: Lukáš Sandtner | Rok: 2026

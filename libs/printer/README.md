# Kanji.sh: Generator

This is the source code that generates PDF files. The directory structure is as follows:

    ├── build
    │   ├── all-data.json       # Kanji data including meaning & readings
    │   ├── pdf                 # Out directory for generated PDFs
    │   └── svg                 # Out directory for SVG files
    ├── css
    │   └── svg-writing.css     # Inline CSS for kanji SVG
    ├── frequency
    ├── grade
    ├── jlpt
    ├── wanikani
    ├── template
    │   └── page.html           # HTML page template
    └── main.js                 # Generator script

The `main.js` script reads source files from `frequency`, `grade`, `jlpt` & `wanikani` directories, downloads the SVG
files from KanjiVG while inserting inline CSS, and downloads the meaning and reading data. Finally, launches a headless
browser and generated single page PDF files for the corresponding data. The reason for generating one file at a time is
if we generate the full PDF in one go, not all the SVGGs rendered when converting to PDF. Also, keeping 5 pages per core
in memory at once seems to yield the best results.

## Sources

### Kanji source files

| Kanji taken from | Source                                       |
| ---------------- | -------------------------------------------- |
| JLPT             | <https://jlptstudy.net>                      |
| Grades           | <https://en.wikipedia.org/wiki/Kyōiku_kanji> |
| Frequency        | <https://en.wikipedia.org/wiki/Kyōiku_kanji> |
| Wanikani         | <https://wanikani.com>                       |

### Vectors | Strokes

Taken from <https://raw.githubusercontent.com/KanjiVG>.

### Meanings & Readings

1. <https://github.com/davidluzgouveia/kanji-data>
2. <https://www.bunka.go.jp/kokugo_nihongo/sisaku/joho/joho/kijun/naikaku/kanji/>

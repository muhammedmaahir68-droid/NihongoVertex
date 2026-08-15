# NihongoVertex Character Engine Upgrade

## Kana coverage

The Character Lab now exposes **107 Hiragana** and **107 Katakana** entries.

Each set is structured as:

- 46 Seion (basic)
- 20 Dakuon
- 5 Handakuon
- 21 Yōon Seion
- 9 Yōon Dakuon
- 3 Yōon Handakuon
- 3 extended/archaic forms

The requested 107 count therefore includes 3 extended/archaic forms. The core modern combination inventory is 104.

## SVG mnemonic formation

Every kana variant resolves to a reusable object scene and follows:

`object drawing → highlighted feature → ink/stroke transition → authentic character strokes`

Examples include key, duck/beak, noodle, cow, mountain, sword, kite, eye, ribbon, rabbit, road, etc. Voiced and contracted forms reuse the base object and visibly add the dakuten/handakuten/small-y component before the final glyph.

## Stroke animation

The final character continues to use the stored stroke paths. The mnemonic layer never replaces the Japanese stroke-order data.

## Writing practice

Trace & Practice now displays the stored SVG stroke-order guide over the writing canvas, with stroke count, guide opacity, undo and clear controls. It no longer fabricates a random handwriting-accuracy percentage.

## Kanji readings

Kanji entries now expose `readingsHiragana`, converting Onyomi and Kunyomi display values to Hiragana for learners while preserving the original data.

The current repository's bundled Kanji dataset contains 13 detailed records; this change does not falsely label those 13 as a complete Japanese Kanji inventory. The same SVG/stroke architecture can ingest a full verified KanjiVG/Jōyō dataset later.

## Validation

Run:

`npm run validate:characters`

The validator confirms 107/107 kana counts, duplicate-free character IDs, and presence of stroke data.

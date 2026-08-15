# NihongoVertex — Complete Mnemonic Formation Library Status

## Current coverage

| Library | Scene records | Formation pipeline | Stroke data | Verified stroke order |
|---|---:|---|---|---:|
| Hiragana | 107 / 107 | Object → feature → same-line ink → kana strokes | Present | Present in existing kana dataset |
| Katakana | 107 / 107 | Object → feature → same-line ink → kana strokes | Present | Present in existing kana dataset |
| Kanji | 107 / 107 | Pictorial mnemonic → feature → same-line ink → Kanji strokes | Present | 0 / 107 currently verified in source dataset |

## Runtime sequence

Every registered scene is rendered by the same formation engine:

1. Draw the mnemonic object with SVG paths.
2. Keep the object visible while the meaningful feature is highlighted.
3. Extend the same feature path into a red SVG ink transformation.
4. Draw the character from its stored stroke paths.
5. Finish with the completed character and learning metadata.

## Important honesty rule

The 107 Kanji records in the supplied project currently have `isVerifiedStrokeOrder: false`. The implementation therefore marks those scenes `artwork_complete_stroke_pending` instead of falsely claiming verified calligraphy stroke order.

Kanji stroke-order SVGs should be sourced from a verified dataset such as KanjiVG before changing those records to `complete`.

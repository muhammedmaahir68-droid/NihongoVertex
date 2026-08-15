# Imported JLPT N5–N1 syllabus package

This folder contains the user-supplied PostgreSQL syllabus package, preserved
as a separate database seed. It supplies a distinct curriculum for all five
exam levels:

| Level | Modules |
| --- | --- |
| N5 | Foundations, verbs, adjectives, requests, past/question words, kanji/reading |
| N4 | Plain form, ability/volitional, conditionals, giving/receiving, rules, kanji/reading |
| N3 | Nuanced conjunctions, keigo, speculation, causative, kanji/reading |
| N2 | Formal writing, business keigo, modality, long-form reading |
| N1 | Literary grammar, rhetoric, academic vocabulary, idioms/native fluency |

## Files

- `sql/01_schema.sql` — isolated package schema.
- `sql/02_seed_core.sql` — level, module, grammar, and vocabulary seed data.
- `sql/03_seed_kanji.sql` — kanji seed data.
- `sql/04_seed_quiz.sql` — generated multiple-choice questions.
- `k8s/postgres.yaml` — supplied standalone PostgreSQL deployment manifest.

## Important integration rule

Do **not** run these files directly against the app's existing `nihongo`
database: this package uses generic table names such as `levels`, `lessons`,
and `vocabulary`, which can conflict with the platform schema. Load it into a
dedicated database first, then Phase 2's Django import command will validate
and map original/licensed rows to the platform models.

## Local import into a dedicated database

```powershell
docker run --name jlpt-syllabus-postgres -e POSTGRES_DB=jlpt_syllabus -e POSTGRES_USER=jlpt_admin -e POSTGRES_PASSWORD=change_me_in_prod -p 5434:5432 -d postgres:16
Get-Content sql/01_schema.sql | docker exec -i jlpt-syllabus-postgres psql -U jlpt_admin -d jlpt_syllabus
Get-Content sql/02_seed_core.sql | docker exec -i jlpt-syllabus-postgres psql -U jlpt_admin -d jlpt_syllabus
Get-Content sql/03_seed_kanji.sql | docker exec -i jlpt-syllabus-postgres psql -U jlpt_admin -d jlpt_syllabus
Get-Content sql/04_seed_quiz.sql | docker exec -i jlpt-syllabus-postgres psql -U jlpt_admin -d jlpt_syllabus
```

Verify the separate level data:

```powershell
docker exec -it jlpt-syllabus-postgres psql -U jlpt_admin -d jlpt_syllabus -c "SELECT l.code, COUNT(m.id) AS modules FROM levels l LEFT JOIN modules m ON m.level_id=l.id GROUP BY l.code, l.sort_order ORDER BY l.sort_order;"
```

Only original or properly licensed content may be published through the
application. Review supplied seed data before publication.

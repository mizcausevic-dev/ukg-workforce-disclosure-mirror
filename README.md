# UKG Workforce Disclosure Mirror

[![CI](https://github.com/mizcausevic-dev/ukg-workforce-disclosure-mirror/actions/workflows/ci.yml/badge.svg)](https://github.com/mizcausevic-dev/ukg-workforce-disclosure-mirror/actions/workflows/ci.yml)
[![Deploy](https://github.com/mizcausevic-dev/ukg-workforce-disclosure-mirror/actions/workflows/pages.yml/badge.svg)](https://github.com/mizcausevic-dev/ukg-workforce-disclosure-mirror/actions/workflows/pages.yml)
[![Release](https://img.shields.io/github/v/release/mizcausevic-dev/ukg-workforce-disclosure-mirror?display_name=tag)](https://github.com/mizcausevic-dev/ukg-workforce-disclosure-mirror/releases/tag/v0.1-shipped)

TypeScript control plane for workforce disclosure coverage, employee acknowledgment evidence, provisioning attestations, and review-safe policy posture.

Live surface:

- [workforce.kineticgain.com](https://workforce.kineticgain.com/)

## Why this exists

- Workforce rollouts often split employee notices, acknowledgment chronology, provisioning attestations, and manager escalation across HR technology, identity operations, and compliance teams.
- Enterprise shops still need one operator-readable picture before a policy checkpoint or workforce launch review hardens.
- This surface turns synthetic workforce, packet, and review exports into lane, gap, and review posture evidence without pretending to be a live HRIS control plane.

## Why this matters

This repo demonstrates the Workforce / HR technology disclosure primitive for enterprise buyers: employee notice packets tied to missing proof, stale acknowledgment windows, provisioning blockers, and review-safe escalation paths. A B2B buyer would care because workforce disclosure posture often needs to surface inside operator tools without exposing unsafe employee records or write-heavy backends. Kinetic Gain Embedded extends this into security-first in-product analytics for review-aware and evidence-aware workflows, see [kineticgain.com/embedded](https://kineticgain.com/embedded).

## Monetization ladder

- Tier 1 now: public repo, dashboard, analyzer, and docs surface
- Tier 2 planned: paid notice templates, acknowledgment starter packs, and workforce review checklists
- Tier 3 contingent: hosted preview when product rail and billing are ready
- Tier 4 by engagement: embedded workforce-governance and evidence-routing delivery

## Surface map

- `/`
- `/workforce-lane`
- `/disclosure-gaps`
- `/review-posture`
- `/verification`
- `/docs`

Structured APIs:

- `/api/dashboard/summary`
- `/api/workforce-lane`
- `/api/disclosure-gaps`
- `/api/review-posture`
- `/api/verification`
- `/api/sample`

## Screenshots

![Overview](./screenshots/01-overview-proof.png)
![Workforce lane](./screenshots/02-workforce-lane-proof.png)
![Review posture](./screenshots/03-review-posture-proof.png)

## Local usage

```powershell
git clone https://github.com/mizcausevic-dev/ukg-workforce-disclosure-mirror.git
cd ukg-workforce-disclosure-mirror
npm install
npm run verify
npm run prerender
npm run render:assets
```

Start the local server:

```powershell
npm run dev
```

Useful routes:

- [http://127.0.0.1:5524/](http://127.0.0.1:5524/)
- [http://127.0.0.1:5524/workforce-lane](http://127.0.0.1:5524/workforce-lane)
- [http://127.0.0.1:5524/disclosure-gaps](http://127.0.0.1:5524/disclosure-gaps)

CLI example:

```powershell
npx ukg-workforce-board fixtures/ukg-workforce-disclosures-clean.json --format summary
```

## Release discipline

| Guardrail | Posture |
| --- | --- |
| Data handling | Synthetic, non-employee, non-tenant-identifying workforce and packet snapshots only. No live HR records or credentials. |
| Deploy | Static prerender → **https://workforce.kineticgain.com/** (GitHub Pages, [pages workflow](./.github/workflows/pages.yml)) |
| SEO | `robots.txt`, `sitemap.xml`, canonical routes, and crawlable docs included |
| Theme | Dark Kinetic Gain operator shell aligned to the current public dashboard standard |
| Tests | `npm run verify` covers lint, typecheck, vitest coverage, build, demo, and smoke |

## Platform note

This is an independent operator-surface demonstration for teams working with workforce disclosures, employee policy review, and HR-technology workflows. It is not an official vendor site, SDK, or tenant integration.

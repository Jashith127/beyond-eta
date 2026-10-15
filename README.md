# BEYOND ETA — The number and the person

An interactive exposure artwork built around an auto-meter-inspired object and a customer phone.

**Live:** https://jashith127.github.io/beyond-eta/

## What changed

This is a self-paced artwork about algorithmic translation, rather than a timer dashboard. The phone turns a scripted delivery into arrival estimates. The meter retains the conditions of the work. EXPOSE reveals the input, the timing adjustment and what this teaching model leaves outside its number.

At the end, choosing the first or latest estimate changes the verdict from six minutes late to on time. The working record stays identical. This is an illustrative evaluation rule, not a claim about any platform's actual disciplinary policies.

## Experience the work

1. Press START on the meter or Place order on the phone.
2. NEXT moves through assignment, restaurant waiting, rain, traffic, a safety stop and completion.
3. At rain, press EXPOSE to uncover the model before continuing. The same control works in every chapter; CONCEAL returns to the customer interface.
4. At completion, use Judge against first / Judge against latest. Compare the changed verdict with the unchanged meter.
5. Issue thermal receipt creates a readable counter-record. Print receipt opens the browser print dialog; Download PNG saves the same record as an image.
6. REPLAY or RESET returns to the beginning. On mobile, fixed Expose / Next controls remain available while viewing either object.

No automatic advancing timer, login, real order, GPS, sensors, backend or personal-data storage. All times and personal situations are scripted.

## Scenario and arithmetic

The first estimate is 20 minutes: max(rider arrives at 4, kitchen ready at 8) + customer leg 12. Rain revises the toy estimate to 22, traffic to 25, and the revised route after a safety stop to 26. These increments are invented scenario settings, not learned platform weights.

The actual scripted journey lasts 26 minutes: 20 riding, 4 waiting for food, 2 stopped for safety. Rain exposure (6 minutes) and traffic exposure (6 minutes) overlap riding. Do not sum exposure durations into additional journey time. Exposure length and added delay are different quantities.

The final classifications are mathematical comparisons against a chosen baseline. No stress, injury, lost income, compensation, rating, penalty or wrongdoing is inferred.

## Thermal receipt

The receipt includes first/revised/actual times, both judgements, the viewer's selected reference at issue time, the work breakdown and overlapping exposures. It is a fixed record of the issued state. No money or fare is fabricated.

The on-screen receipt uses 14px black monospaced type on off-white paper. The PNG is rendered at 900px width with large type. Print CSS targets an 80mm roll with a 72mm content area and 9–12pt body/summary text. Browser and printer settings control the physical result; choose the corresponding paper width and disable browser headers/footers if necessary. Printing does not connect directly to a hardware meter or printer. A PDF can be saved from the print dialog.

## Run locally

Use Node.js 22.12 or newer.

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

Vite uses relative base paths and no client router, so a repository subpath and refresh work on GitHub Pages.

## Deploy

`.github/workflows/deploy.yml` tests and builds pushes to `main`, uploads `dist`, and deploys to GitHub Pages with Pages/OIDC permissions. Repository Settings → Pages → Source must be GitHub Actions. For this repository it is already configured.

```sh
git add .
git commit -m "Update exposure artwork"
git push origin main
```

## Source

- `src/exposure-story.js`: scripted states, exposure gate, baseline comparison and reset
- `src/exposure-story.test.js`: state-transition and arithmetic invariants
- `src/exhibition.js`: device interaction, receipt creation and PNG export
- `src/exhibition.css`, `src/exhibition-compact.css`: gallery composition, hardware, phone and responsive controls
- `src/receipt-paper.css`: readable thermal paper and print layout
- `src/segments.js`, `src/icons.js`: locally rendered display and condition symbols

The previous timer dashboard is preserved in Git history (initial commit `3436e1b`).

## Evidence and limits

The visual object draws on photographs of Bengaluru meters: a black housing, silver printed faceplate, red seven-segment windows and a mounting base. The redesigned controls and exposure record are our own intervention.

Public engineering material establishes that weather-related signals, routing, traffic, food preparation and waiting can already be modelled. The artwork makes no universal claim that platforms ignore these inputs. See [ETA research](docs/eta-research-and-narrative.md) and [hardware references](docs/bengaluru-meter-research.md). Their earlier implementation descriptions are historical context; the active experience is the self-paced artwork described here.

The current work does not reproduce a proprietary algorithm. It exposes a constructed relationship between observation, quantification and judgement, grounded in the distinction between a prediction and an account of labour.


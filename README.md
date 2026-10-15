# BEYOND ETA — The Gig Worker Meter

A responsive, browser-only speculative device for exposing the delivery journey behind a customer-facing ETA. Inspired by Indian auto-rickshaw meters and scooter instrumentation; all visuals are CSS. No sensors, GPS, accounts, backend, or platform APIs.

The current hardware treatment is based on inspected photographs of SMC Super and blue meters in Bengaluru autos: black casing, recessed silver faceplate, printed labels, red LED numerals, separate reading windows, and a central mount. BEYOND ETA retains its own branding and adds simulated exposure indicators. The phone has a fixed shorter shell with internal scrolling and collapsed manual controls. See [the meter research](docs/bengaluru-meter-research.md) for source links, reference captures and design decisions.

The revised concept keeps the journey summary on the meter. **There are no thermal receipts or printing controls.**

## Local development

Use Node.js 22.12 or newer.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. For a production preview:

```sh
npm test
npm run build
npm run preview
```

## Demonstration

### Connected companion demo app

The meter now displays large SVG icons for current rain, traffic, heat, hazards, and restaurant waiting. Encounter lights retain the conditions recorded on the journey. The meter replaces its illustrative ETA cell with an encounter count; the customer estimate remains in the app's customer view.

Simulated rain lasts 150 journey seconds, traffic 90, hazards 60, and heat 120. The meter counts exposure time within these scripted windows, without adding extra journey time. These durations are scenario settings, not sensor measurements. The large icon returns to riding after an encounter ends, while the small recorded icon stays lit. JSON exports include per-condition exposure totals. Waiting is shown separately. Only one road condition is active at a time in this simple prototype.

The meter and app share one simulated journey in the same browser page. Use either device to start, wait, resume, or complete a delivery; both views update immediately. This is a local demonstration of pairing, not a Bluetooth implementation.

- **Run 40-second demo** starts a fresh scenario at ×30: rain at 01:30, arrival at the restaurant at 04:00, order collection at 08:00, traffic at 12:00, a hazard at 15:00, and completion at 20:00. The resulting delivery has 16 minutes travelling and 4 minutes waiting. Stopping the guided demo keeps the current journey available for manual interaction. Manual timer/event/checkpoint actions also stop the guided sequence.
- **At restaurant** switches to waiting. **Order collected** resumes travelling and moves the illustrative rider along the customer leg.
- **Worker view** shows elapsed time, the travel/wait breakdown, and recorded encounters. **Customer view** demonstrates a limited view with a fixed illustrative ETA and progress. Neither is a real platform interface.
- **Log** shows timestamped actions and simulated events. On completion, **Download journey data** exports a JSON record (not a receipt).
- **History** saves up to 20 completed deliveries in this browser's local storage. Expand a delivery to inspect its full log. Reloading starts a new idle journey with the next number and preserves history; an unfinished delivery is not restored. Storage can be unavailable in private browser contexts.
- The route is drawn locally in SVG. Position is simulated from travel time and pickup checkpoints, not GPS. No network or actual hardware connection is involved.

1. Press **START DELIVERY**. Demo speed defaults to ×30 (one real second records thirty journey seconds). Toggle it off for real time.
2. Press **START WAITING**; travelling pauses and waiting accumulates. Press **RESUME JOURNEY** to travel again.
3. Press **DEMO EVENT** to cycle through rain, heat, traffic, restaurant waiting, and a potential road hazard. The conditions panel also lets you choose individual events. Every event is marked simulated.
4. Restaurant waiting switches to waiting. Other events record encounters without adding fictional time or automatically pausing the journey.
5. Press **COMPLETE DELIVERY**. The meter freezes total, travelling, and waiting time. Review conditions and the timestamped log, then press **NEW DELIVERY** to reset everything and increment the delivery number.

The illustrative customer ETA is fixed at 20 minutes, not an actual prediction. Long durations can exceed two minute digits. Timers use elapsed monotonic browser time rather than counting interval ticks; completed and idle states cannot accumulate time. Automatic events occur only during the user-started guided demonstration.

## Deploy to GitHub Pages

This repository includes an Actions workflow and a lockfile. Pushes to `main` run the tests and build, then deploy `dist` to GitHub Pages. The production build has passed locally.

To deploy your own copy from this project directory:

```sh
gh auth login --hostname github.com
git add .
git commit -m "Build Beyond ETA meter prototype"
gh repo create beyond-eta --public --source=. --remote=origin
```

Enable GitHub Pages with GitHub Actions **before pushing** (replace `YOUR_USERNAME`):

```sh
gh api --method POST repos/YOUR_USERNAME/beyond-eta/pages -f build_type=workflow
git push -u origin main
gh run list --workflow deploy.yml
```

Alternatively, open the repository's **Settings → Pages → Build and deployment → Source → GitHub Actions**, then push. If Pages already exists, use `gh api --method PUT repos/YOUR_USERNAME/beyond-eta/pages -f build_type=workflow`.

After the workflow succeeds, retrieve the verified public URL:

```sh
gh api repos/YOUR_USERNAME/beyond-eta/pages --jq .html_url
```

Expected URL format: `https://YOUR_USERNAME.github.io/beyond-eta/`. This is a template, not a verified deployment URL. The workflow deploys pushes to `main`, runs tests and build, uploads `dist`, and uses Pages and OIDC permissions. Relative Vite `base: './'` handles any repository subpath. No client-side router is used, so refresh is safe.

## Structure

- `index.html`: presentation, meter, accessible dialogs
- `src/instrument.css`: responsive casing, amber display, tactile controls
- `src/companion.css`: companion app and responsive two-device layout
- `src/guided.js`: deterministic, timed demonstration scenario
- `src/model.js`: journey state and simulated event model
- `src/segments.js`: SVG seven-segment timer display
- `src/main.js`: browser interaction and elapsed-time updates
- `src/model.test.js`: timer partition, freeze, reset, and event checks
- `.github/workflows/deploy.yml`: automatic GitHub Pages deployment

Typography uses system fonts. The main timer is a locally drawn SVG seven-segment display. No external fonts or images. Native HTML buttons, keyboard focus rings, Escape-dismissable dialogs, reduced-motion support, and clearly disabled controls are provided. Project source and compiled `dist` are included in the delivery archive.

## Academic framing

The researched narrative distinguishes prediction from working conditions: weather, traffic and waiting may already influence platform estimates. An accurate estimate does not communicate the full worker experience or establish compensation. Project notes contains a source-linked explanation; active condition cards show the associated human implication. [The ETA research and narrative](docs/eta-research-and-narrative.md) provides a platform/input matrix, worker-data classification, evidence limits, and a presentation script.

`src/eta-context.js` defines an explicit teaching scenario, not a production platform model: the rider reaches the restaurant at minute 4, food is ready at minute 8, and the customer leg takes 12 minutes. Cooking and rider arrival overlap, giving `max(4,8)+12=20` minutes. Exposure durations are part of elapsed time and are never added twice. The prototype does not measure distress, injury, lost income, payment entitlement or disciplinary outcomes.

Algorithm: ETA prediction. Mode of engagement: Exposure. The intervention asks what becomes visible when the meter records more than arrival time. It does not claim platforms categorically omit weather, waiting, or traffic from their models; it examines the limited account visible through customer-facing interfaces.



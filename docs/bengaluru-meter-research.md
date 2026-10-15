# Bengaluru auto meters → BEYOND ETA

Research and implementation decisions, 15 October 2026.

## Real references inspected and captured

### SMC Super, photographed in a Bengaluru auto

Source: [Mint, 17 October 2022 — Bengaluru autorickshaw report](https://www.livemint.com/news/india/bengaluru-asked-to-pay-more-by-autorickshaw-driver-here-s-how-you-can-complain-11665982774757.html). The source credits the photograph to HT Photo.


Visible details: a thick black housing; a recessed silver/grey printed faceplate; a red brand strip; a large red seven-segment fare window; a smaller row for waiting/other readings; small lower indicators; a separate identification plate; and a substantial mounting base.

### Blue meter, photographed in a Bengaluru auto

Source: [Moneycontrol — Bengaluru auto fare revision report](https://www.moneycontrol.com/news/india/bengaluru-auto-rickshaw-fare-revision-likely-as-transport-dept-calls-for-meeting-12893384.html).


Visible details: box-like blue housing, a grey printed faceplate, separately labelled dark windows for fare, distance and waiting, an identification plate below, a pedestal mount, and a separate FOR HIRE sign. This establishes that colour and arrangement vary; the photographs do not establish one universal Bengaluru meter design or market prevalence.

## Decision

Use the SMC-style black/silver/red visual language as the main reference, reinforced by the blue meter's explicit printed labels and separate reading windows. The previous olive dashboard and large side control bank were weak translations of these objects.

| Observed feature | Implemented translation |
| --- | --- |
| Thick black casing with recessed front | Deeper black plastic casing, raised edge, silver inset faceplate |
| Red LED fare window | Red SVG seven-segment total journey window |
| Printed fixed labels around readings | Printed TOTAL TIME, TRAVEL, WAIT and ENCOUNTERS labels |
| Smaller separate windows | Individual dark travel/wait/encounter readouts |
| Brand and identification strips | Own BEYOND ETA red strip and BE–01 identification plate |
| Lower hardware details | Small round controls below the display; retained condition indicators |
| Pedestal mounting | Thick central mounting base adapted as a two-wheeler prototype mount |

The four round controls and exposure-icon display are our design decisions, not claimed replicas of controls observed in either photograph. Actual fare and distance functions are replaced with delivery journey exposure. The device remains a redesigned two-wheeler concept, not an existing auto meter attached to a scooter. No manufacturer trademark, certification mark, rate, or legal approval is copied or implied. No receipt or printer is included.

## Phone

The phone shell is now 600 CSS pixels tall on the main desktop layout, 570 at narrower desktop widths, and 580 on mobile. It no longer grows to fit all content. The core journey summary is presented first, extra manual controls are collapsed, and long logs/history scroll inside the phone. Perspective and navigation remain reachable.

## Scope and limits

These are visual observations from two published Bengaluru photographs. They support a familiar form and display language; they do not establish manufacturing dimensions, sensor technology, road-safety certification, weather resistance or mounting engineering. The implementation is CSS/SVG and all journey conditions remain simulated.

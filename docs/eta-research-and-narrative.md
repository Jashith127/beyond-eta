# BEYOND ETA — what the algorithm predicts, what the worker experiences

Research checked 15 October 2026. Focus: Zomato and Swiggy in India, with public engineering explanations from Uber Eats and DoorDash for comparison.

## The central finding

An ETA is a prediction of arrival, not a complete account of labour. A model can anticipate a rainy, congested journey and predict the correct arrival time, while the customer still learns little about the rider’s exposure, waiting, effort or costs.

The project should therefore ask: **What did this delivery require of the person who completed it—even when it arrived on time?**

Do not divide the world into “platforms consider distance” and “platforms ignore rain/waiting.” Published material contradicts that. Separate four questions instead: Is something measured? Does it affect prediction? Is it explained to the customer? Does a policy protect or compensate the worker? Evidence for one is not evidence for the others.

## 1. What platforms publicly describe

These are documented examples, not a full inventory of proprietary systems. Historical publications describe systems at publication time; implementation may have changed.

| Input or predicted component | What it does | Public evidence and limits |
|---|---|---|
| Origin, destination, road network, current traffic, request time and type | Predict movement between locations | Uber's DeepETA combines routing with learned corrections using location, time and traffic. This is a travel-time component, not the whole food-order process. [Uber, 2022](https://www.uber.com/in/en/blog/deepeta-how-uber-predicts-arrival-times/) |
| Dish type and quantity; restaurant patterns; time/day; restaurant footfall | Predict preparation time | Zomato names these factors for food preparation. [Zomato, 2021](https://www.zomato.com/blog/elements-of-scalable-machine-learning/) |
| Rider waiting and counter pickup/handshake time | Coordinate food readiness and rider arrival | Zomato explicitly predicts these alongside preparation. Waiting is not categorically missing from the algorithm. [Zomato, 2022](https://www.zomato.com/blog/predicting-fpt-optimally/) |
| Geography, restaurant load and rider availability | Predict delivery duration before ordering | These groups are confirmed in Swiggy's own engineering announcement. The linked full article was unavailable during this review, so detailed feature lists or model architecture are not asserted. [Swiggy official post](https://www.linkedin.com/posts/swiggy-in_predicting-food-delivery-time-at-cart-activity-7112734102650273793-YjLR) |
| GPS, motion/activity signals, parking, walking and restaurant waiting | Infer trip stages and improve dispatch | Uber Eats describes a trip-state model with these stages. Its publication is from 2018; this is evidence that such modelling exists, not confirmation of every current deployment. [Uber Eats, 2018](https://www.uber.com/us/en/blog/uber-eats-trip-optimization/) |
| Recent store/area delivery durations; local supply-demand balance | Detect unusual delays and update estimates | DoorDash describes recent-duration signals that can capture a rainstorm or construction indirectly. A feature need not literally be named “rain” to reflect its delay effect. [DoorDash, 2021](https://careersatdoordash.com/blog/improving-eta-prediction-accuracy-for-long-tail-events/) |
| Food-preparation estimates, available riders, delivery type and historical outcomes | Predict arrival uncertainty rather than only one point | DoorDash describes probabilistic prediction and a separate decision layer. A displayed time/window is a selected representation of a prediction distribution. [DoorDash, 2024](https://careersatdoordash.com/blog/improving-etas-with-multi-task-models-deep-learning-and-probabilistic-forecasts/) |
| Localised weather | Support network operations | Zomato's Weather Union says local weather feeds ML-based network optimisation. It does not disclose the precise role or weighting of each weather variable in the customer ETA. [Weather Union](https://www.weatherunion.com/) |

This does not establish that every platform uses every row, or that a particular variable is directly measured rather than inferred. Cart subtotal and available rider count are also explicitly mentioned in DoorDash's 2025 probabilistic-ETA project; this is a scoped project account, not evidence of universal use. [DoorDash, 2025](https://careersatdoordash.com/blog/part-4-doordash-2025-summer-intern-projects/)

## 2. What to expose on the worker's side

The honest category is **worker experiences not established as explicit ETA inputs in the reviewed disclosures**, rather than “things all apps ignore.” Some may be captured indirectly; some may exist in separate safety/support systems. We cannot audit private production models from public posts.

| Data point for our meter | Prediction can capture… | Human dimension to expose | Evidence status / how to record |
|---|---|---|---|
| Time in rain | Slower trips or local weather | Getting wet, difficult visibility, disrupted comfort | Rain duration is simulated here. Personal effects are possible experiences, not measured diagnoses. Weather use is documented; the individual's discomfort is not established as an ETA input. |
| Time in heat | Weather and effects on operations | The person's need for shade, water or rest | Display environmental exposure only. Do not infer body temperature, dehydration or illness. Optional worker report would be required for personal needs. |
| Time in traffic | Current congestion and recent trip durations | Occupied work time; interruption of the next earning opportunity | Treat this as context, not proof of a fixed income loss. No automatic monetary amount. |
| Restaurant waiting | Food readiness, predicted waiting and pickup queues | Time committed to work; whether that time is paid; limited control over readiness | Waiting is already modelled by some platforms. Compensation is a separate policy question and varies. Record elapsed waiting; do not label all waiting “unpaid.” |
| Hazard encounter / safety pause | Some road delays through routing/history | A rider's decision to slow, stop or take a safer option | Manually simulated/reported encounter. Not proof of a near miss, accident or unsafe platform instruction. |
| Fatigue, missed rest, toilet/water access | Possibly indirect effects on travel behaviour | Bodily needs and recovery across a shift | Not established as direct ETA inputs in reviewed disclosures. Candidate voluntary reports, not biometric inference or current sensor capabilities. |
| Customer contact, gate/security wait, stairs and final handoff | Some pickup/access processes and longer completion times | Effort after the road journey and work that may lie outside a selected timing boundary | Record separately in a future scenario. Do not claim all building access is unmodelled. |
| Fuel, maintenance and net pay | Operational efficiency may affect costs | Whether the completed delivery is economically worthwhile after costs | A pay/cost record is distinct from ETA. Requires worker-provided values and applicable rate rules; currently not measured. |
| Anxiety about targets, ratings or account access | May influence behaviour, but not established here as direct ETA features | Pressure to be quick and ability to contest an adverse decision | Voluntary account of pressure; never infer a mental state from a delay. ETA, assignment, incentives, ratings and enforcement are separate systems. |

Research support: a small 2025 position paper based on 14 interviews identifies waiting and repetitive app interactions as invisible labour and discusses gamification/opacity; it does not establish population prevalence. [Authors' paper](https://arxiv.org/abs/2504.17697). Fairwork's 2024 India assessment documents gaps in evidence for earnings guarantees after work costs, alongside evidence of safety and appeal policies at some platforms; absence of a score is not proof of universal noncompliance. [Fairwork](https://fairwork.oii.ox.ac.uk/en/fw/blog/fairwork-indias-sixth-report-examines-the-changing-nature-of-platform/). The PAIGAM/Penn report includes delivery-worker concerns and recommendations about waiting, traffic, costs, bodily health and welfare; these are survey/report findings, not an audit of ETA feature code. [Report, delivery section and recommendations](https://tgpwu.org/wp-content/uploads/2024/03/Report-Final-Print-1.pdf#page=72).

## 3. How algorithmic governance can affect a person

Use this causal chain as a design interpretation, not a universal finding about one company:

**Prediction → customer expectation → dispatch/work organisation → pressure and consequences for the worker → opportunity to explain or contest the record.**

These links must remain distinct. For example, a poor prediction can increase waiting through dispatch timing. Uber itself connects dispatch inefficiencies to earning opportunities. Separately, Uber's public help page warns that recurring substantial lateness may affect app access while stating safety comes first. That page is evidence of a specific publicly stated policy, not proof that every late trip is punished or that Swiggy/Zomato use the same rule. [Uber Help](https://help.uber.com/driving-and-delivering/article/how-do-arrival-times-work?nodeId=7c7765a3-c789-48a1-b93d-b73a509f0070).

No source reviewed here establishes that ETA alone causes the reported labour harms. Economic terms, demand, road conditions, allocation rules and individual circumstances also matter. The intervention exposes this relationship; it should not claim causal proof from a scripted animation.

## 4. The recommended demonstration

Keep the existing 40-second run. It represents a 20-minute delivery with 16 minutes travelling and 4 minutes restaurant waiting. Rain, traffic and a hazard happen within that time; exposure seconds overlap the journey and must not be added to it again.

1. Customer view presents an illustrative 20-minute ETA.
2. Rain appears. Show exposure duration and an icon; explain that a predicted delay does not describe the rider getting wet.
3. Restaurant waiting begins. Travel pauses, waiting increases. Explain that predicted waiting and paid waiting are different questions.
4. Traffic appears. Record time occupied, without inventing lost rupees or blaming the rider.
5. A hazard appears. Record the encounter and the legitimacy of a safe response, without pretending an accident happened.
6. The delivery completes at 20 minutes. Both “on time” and “difficult journey” are true. Preserve the icons and log.

This is stronger than making the ETA fail on every trip. The central contrast becomes **accurate arrival prediction versus an incomplete account of the person’s work**.

### Illustrative ETA recipe in the code

`max(assignment + rider-to-restaurant, kitchen-ready time) + restaurant-to-customer`

For this teaching example: `max(0 + 4, 8) + 12 = 20 minutes`. Cooking and rider arrival overlap. This simplified scenario excludes many real operational details and is not attributed to a platform or fitted from proprietary data. Route time can already include congestion; a separate observed traffic duration must not automatically be added again. The model's customer-facing number is deliberately simpler than a production probabilistic estimate.

## 5. Academic narrative

**BEYOND ETA explores how a delivery prediction becomes a way of seeing and organising work. Platforms may model weather, traffic and waiting to estimate arrival, but the customer's time estimate cannot fully communicate what the rider experienced. Our redesigned meter preserves exposure and interruptions alongside elapsed time. It asks viewers to recognise the worker's journey, including the conditions of an on-time delivery, rather than reduce the person to a moving location or a late arrival.**

Keep the device uncluttered. Put evidence and qualifications in Project notes; show one relevant human implication during an encounter. Do not create an individual stress score, automatic blame indicator, assumed penalty, medical inference or new worker surveillance stream. For future fieldwork, agree with workers which voluntary records help them and who may access them.

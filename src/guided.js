export const STEPS = [
 {at:90, run:j => j.event('rain')},
 {at:240, run:j => {j.arriveRestaurant(); j.event('restaurant');}},
 {at:480, run:j => j.collectOrder()},
 {at:720, run:j => j.event('traffic')},
 {at:900, run:j => j.event('hazard')},
 {at:1200, run:j => j.complete()}
];
export class GuidedDemo {
 constructor() { this.next = 0; this.running = true; }
 advance(journey, seconds) {
  if (!this.running) return;
  const target = Math.min(1200, journey.total + seconds);
  while (this.next < STEPS.length && STEPS[this.next].at <= target) {
   const step = STEPS[this.next++]; journey.advance(step.at - journey.total); step.run(journey);
  }
  journey.advance(target - journey.total);
  if (!journey.active) this.running = false;
 }
}

export const EVENT_TYPES = {
  rain: {label: 'Rain encountered', short: 'Rain'},
  heat: {label: 'High temperature encountered · 38°C', short: 'Heat · 38°C'},
  traffic: {label: 'Traffic delay encountered', short: 'Traffic delay'},
  restaurant: {label: 'Extended restaurant wait', short: 'Restaurant wait'},
  hazard: {label: 'Potential road hazard encountered', short: 'Road hazard'}
};
export const formatTime = seconds => `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${Math.floor(seconds % 60).toString().padStart(2, '0')}`;
export class Journey {
  constructor(number = 1) { this.number = number; this.phase = 'idle'; this.travel = 0; this.wait = 0; this.events = []; this.recorded = new Set(); this.stage = 'to_restaurant'; this.pickupTravel = 0; this.condition = null; this.conditionUntil = 0; this.exposure = {rain:0,heat:0,traffic:0,hazard:0}; }
  get total() { return this.travel + this.wait; }
  get active() { return this.phase === 'travelling' || this.phase === 'waiting'; }
  log(label) { this.events.push({at: this.total, label}); }
  start() { if (this.phase !== 'idle') return; this.phase = 'travelling'; this.log('Delivery started'); }
  advance(seconds) { if (!this.active) return; const delta=Math.max(0,seconds); if(this.condition) this.exposure[this.condition]+=Math.max(0,Math.min(delta,this.conditionUntil-this.total)); this[this.phase === 'waiting' ? 'wait' : 'travel'] += delta; if(this.condition && this.total>=this.conditionUntil) this.condition=null; }
  toggleWaiting() { if (!this.active) return; this.phase = this.phase === 'waiting' ? 'travelling' : 'waiting'; this.log(this.phase === 'waiting' ? 'Waiting started' : 'Journey resumed'); }
  event(type) { if (!this.active || !EVENT_TYPES[type]) return; this.recorded.add(type); this.log(`SIMULATED · ${EVENT_TYPES[type].label}`); if(type!=='restaurant'){this.condition=type;this.conditionUntil=this.total+({rain:150,heat:120,traffic:90,hazard:60}[type]);} if (type === 'restaurant' && this.phase !== 'waiting') this.toggleWaiting(); }
  arriveRestaurant() { if (!this.active || this.stage !== 'to_restaurant') return; this.stage = 'waiting_order'; this.pickupTravel = this.travel; this.log('Arrived at restaurant'); if (this.phase !== 'waiting') this.toggleWaiting(); }
  collectOrder() { if (!this.active || this.stage !== 'waiting_order') return; this.stage = 'to_customer'; this.log('Order collected'); if (this.phase === 'waiting') this.toggleWaiting(); }
  complete() { if (!this.active) return; this.log('Delivery completed'); this.phase = 'completed'; this.stage = 'delivered'; }
  get progress() { if (this.phase === 'idle') return 0; if (this.stage === 'delivered') return 1; if (this.stage === 'waiting_order') return 200/467; return this.stage === 'to_customer' ? Math.min(.95, 200/467 + (this.travel - this.pickupTravel) / 720 * 267/467) : Math.min(.41, this.travel / 240 * 200/467); }
}

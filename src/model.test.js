import {test} from 'node:test';
import assert from 'node:assert/strict';
import {Journey, formatTime} from './model.js';
test('idle and completed journeys do not accumulate time; travel and wait partition total', () => {
  const j = new Journey(); j.advance(60); assert.equal(j.total,0);
  j.start(); j.advance(45); j.toggleWaiting(); j.advance(75); j.toggleWaiting(); j.advance(30);
  assert.equal(j.total,150); assert.equal(j.travel,75); assert.equal(j.wait,75);
  j.complete(); j.advance(100); assert.equal(j.total,150); assert.equal(j.phase,'completed');
});
test('restaurant event enters waiting and records simulated conditions without adding fictional time', () => {
  const j = new Journey(); j.event('rain'); assert.equal(j.events.length,0);
  j.start(); j.advance(10); j.event('restaurant'); assert.equal(j.phase,'waiting'); j.advance(30);
  j.event('rain'); assert.equal(j.total,40); assert.equal(j.wait,30); assert.ok(j.recorded.has('rain'));
  j.complete(); j.event('heat'); assert.ok(!j.recorded.has('heat'));
});
test('timer formatting and independent new deliveries', () => {
  assert.equal(formatTime(0),'00:00'); assert.equal(formatTime(125.8),'02:05'); assert.equal(formatTime(6000),'100:00');
  const j = new Journey(2); assert.equal(j.number,2); assert.equal(j.events.length,0);
});

import {test} from 'node:test';
import assert from 'node:assert/strict';
import {Journey} from './model.js';
import {GuidedDemo} from './guided.js';
test('guided delivery records encounters, separates restaurant waiting and freezes after completion',()=>{
 const j=new Journey();j.start();const demo=new GuidedDemo();demo.advance(j,1300);
 assert.equal(j.phase,'completed');assert.equal(j.total,1200);assert.equal(j.wait,240);assert.equal(j.travel,960);assert.equal(j.stage,'delivered');assert.equal(j.progress,1);assert.equal(demo.running,false);assert.deepEqual([...j.recorded],['rain','restaurant','traffic','hazard']);assert.equal(j.exposure.rain,150);assert.equal(j.exposure.traffic,90);assert.equal(j.exposure.hazard,60);demo.advance(j,300);assert.equal(j.total,1200);
});
test('manual pickup checkpoints switch phase and cannot repeat',()=>{
 const j=new Journey();j.start();j.advance(240);j.arriveRestaurant();assert.equal(j.phase,'waiting');j.advance(120);j.collectOrder();assert.equal(j.phase,'travelling');assert.equal(j.stage,'to_customer');const count=j.events.length;j.collectOrder();assert.equal(j.events.length,count);assert.equal(j.wait,120);
});

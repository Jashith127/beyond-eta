import {test} from 'node:test';
import assert from 'node:assert/strict';
import {ExposureStory,SCENES} from './exposure-story.js';
test('rain makes the translation visible before the viewer can move on',()=>{const story=new ExposureStory();story.next();story.next();story.next();assert.equal(story.index,3);assert.equal(story.next(),false);story.reveal();assert.equal(story.canNext,true);assert.equal(story.next(),true);assert.equal(story.exposed,false);});
test('changing the evaluation baseline changes judgement without changing the journey',()=>{const story=new ExposureStory();story.index=6;const record=JSON.stringify(story.scene);assert.equal(story.lateness,0);story.baseline='original';assert.equal(story.lateness,6);assert.equal(JSON.stringify(story.scene),record);story.next();assert.equal(story.index,0);assert.equal(story.baseline,'latest');});
test('story keeps travel and stops additive while exposures overlap',()=>{for(const scene of SCENES){assert.equal(scene.elapsed,scene.travel+scene.stopped);assert.ok(scene.records[0]<=scene.stopped);assert.ok(scene.records.slice(1).every(duration=>duration<=scene.elapsed));}assert.deepEqual(SCENES.at(-1).records,[4,6,6,2]);});

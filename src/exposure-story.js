// A scripted artwork. These are invented scenario values, not platform weights.
export const SCENES = [
 {name:'A promise',elapsed:0,travel:0,stopped:0,eta:20,event:'clear',value:0,title:'20 minutes.',line:'A customer receives a number. A rider receives the work.',action:'Place the order',input:'Kitchen ready in 8 min; rider arrives in 4; customer leg 12.',decision:'max(4, 8) + 12 = 20 minutes',outside:'The person who will carry the order.',records:[0,0,0,0]},
 {name:'Assigned',elapsed:4,travel:4,stopped:0,eta:20,event:'ride',value:4,title:'A person is now moving.',line:'The order is a route on the phone. It is four minutes of work on the meter.',action:'Reach the restaurant',input:'Rider reaches restaurant at minute 4.',decision:'Food is still expected at minute 8. ETA stays 20.',outside:'The rider’s time is already committed.',records:[0,0,0,0]},
 {name:'Waiting',elapsed:8,travel:4,stopped:4,eta:20,event:'restaurant',value:4,title:'Waiting is work, too.',line:'Four minutes at the restaurant. Already inside the prediction. Still lived by someone.',action:'Ride into rain',input:'Food ready at minute 8; rider has waited 4 minutes.',decision:'Waiting was anticipated. ETA stays 20.',outside:'Knowing the wait does not say whether it is paid.',records:[4,0,0,0]},
 {name:'Rain',elapsed:14,travel:10,stopped:4,eta:22,event:'rain',value:6,title:'Rain becomes +2 minutes.',line:'Six minutes riding in rain become two extra minutes in this model.',action:'Enter traffic',input:'Rain-related travel slowdown: +2 min.',decision:'Arrival estimate 20 → 22 minutes.',outside:'Wet clothes. Reduced visibility. The experience of being out in it.',records:[4,6,0,0]},
 {name:'Traffic',elapsed:20,travel:16,stopped:4,eta:25,event:'traffic',value:6,title:'Congestion becomes +3 minutes.',line:'The estimate moves again. Six minutes in traffic remain on the rider’s record.',action:'Encounter an obstruction',input:'Traffic-related travel slowdown: +3 min.',decision:'Arrival estimate 22 → 25 minutes.',outside:'Time occupied, fuel used, and the next job deferred. Costs are not measured here.',records:[4,6,6,0]},
 {name:'Safety stop',elapsed:22,travel:16,stopped:6,eta:26,event:'hazard',value:2,title:'A safe decision becomes another minute.',line:'The rider stops for two minutes at an obstruction. The model revises arrival by one.',action:'Deliver the order',input:'Revised route completion after an obstruction: +1 min.',decision:'Arrival estimate 25 → 26 minutes.',outside:'A person choosing to stop. The reason matters beyond its timing effect.',records:[4,6,6,2]},
 {name:'Delivered',elapsed:26,travel:20,stopped:6,eta:26,event:'clear',value:26,title:'The same journey. Two judgements.',line:'Change the reference time on the phone. The rider’s record does not change.',action:'Start again',input:'Actual delivery: 26 min. First estimate: 20. Latest: 26.',decision:'Against 26: on time. Against 20: six minutes late.',outside:'Neither judgement describes the whole working experience.',records:[4,6,6,2]}
];
export class ExposureStory {
 constructor(){this.index=0;this.exposed=false;this.hasExposedRain=false;this.baseline='latest';}
 get scene(){return SCENES[this.index];}
 get finished(){return this.index===SCENES.length-1;}
 get canNext(){return this.index!==3||this.hasExposedRain;}
 next(){if(!this.canNext)return false;if(this.finished){this.reset();return true;}this.index++;this.exposed=false;return true;}
 reveal(){this.exposed=!this.exposed;if(this.index===3&&this.exposed)this.hasExposedRain=true;}
 reset(){this.index=0;this.exposed=false;this.hasExposedRain=false;this.baseline='latest';}
 get lateness(){return Math.max(0,this.scene.elapsed-(this.baseline==='original'?20:this.scene.eta));}
}

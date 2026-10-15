import './instrument.css';
import './companion.css';
import './encounters.css';
import './exposure-ui.css';
import './bengaluru.css';
import './research.css';
import {icon} from './icons.js';
import { drawDisplay } from './segments.js';
import {Journey, EVENT_TYPES, formatTime} from './model.js';
import {GuidedDemo} from './guided.js';
import {illustrativeETA,WORKER_CONTEXT} from './eta-context.js';
const $ = id => document.getElementById(id);
let journey = new Journey();
let last = performance.now();
let speed = 30;
let demoIndex = 0;
let guided = null;
let perspective = 'worker';
let appTab = 'journey';
let lastLogLength = -1;
let history = [];
try {const saved = JSON.parse(localStorage.getItem('beyond-eta-history') || '[]'); if (Array.isArray(saved)) history = saved.filter(record => typeof record.number === 'number' && Array.isArray(record.events) && Array.isArray(record.conditions)).slice(0,20);} catch {}
journey.number = (history[0]?.number || 0) + 1;
const demoTypes = Object.keys(EVENT_TYPES);
const mapIcon=document.createElement('div');mapIcon.id='map-condition-icon';mapIcon.setAttribute('aria-hidden','true');document.querySelector('.route-map').append(mapIcon);
document.querySelectorAll('[data-condition]').forEach(el=>{const led=el.querySelector('b');el.innerHTML=`${icon(el.dataset.condition)}<span>${EVENT_TYPES[el.dataset.condition].short.split(' · ')[0].toUpperCase()}</span>`;el.prepend(led);});
document.querySelectorAll('[data-event]').forEach(el=>el.innerHTML=`${icon(el.dataset.event)}<span>${EVENT_TYPES[el.dataset.event].short.split(' · ')[0]}</span>`);
const encounterCopy={rain:['RAIN','Riding through rain. Rain exposure is counting.'],heat:['HIGH HEAT','High temperature encountered · simulated 38°C.'],traffic:['TRAFFIC','Slow traffic encountered. Delay exposure is counting.'],hazard:['ROAD HAZARD','A road obstruction was encountered. Caution is visible.'],restaurant:['WAITING FOR FOOD','The bike has stopped. Waiting time still counts.'],ride:['RIDING','The rider is moving. The journey is being recorded.'],clear:['JOURNEY COMPLETE','The clock stops. The recorded encounters stay visible.'],wait:['WAITING','The rider has paused. Waiting time still counts.']};
let drawnCondition='';
function sync() {
  const now = performance.now();
  const elapsed = (now - last) / 1000 * speed;
  if (guided?.running) guided.advance(journey, elapsed); else journey.advance(elapsed);
  last = now;
}
function render() {
  drawDisplay($('total'), formatTime(journey.total));
  $('travel').textContent = formatTime(journey.travel);
  $('waiting').textContent = formatTime(journey.wait);
  $('delivery-id').textContent = `#${String(journey.number).padStart(3, '0')}`;
  const done = journey.phase === 'completed';
  $('status').textContent = {idle:'READY FOR DELIVERY', travelling:'DELIVERY IN PROGRESS', waiting:'WAITING · TIME STILL COUNTS', completed:'DELIVERY COMPLETED'}[journey.phase];
  $('status-dot').className = journey.active ? 'active' : done ? 'done' : '';
  $('primary').disabled = journey.active;
  $('primary').innerHTML = done ? 'NEW<br>DELIVERY' : 'START<br>DELIVERY';
  $('wait').disabled = !journey.active;
  $('wait').innerHTML = journey.phase === 'waiting' ? 'RESUME<br>JOURNEY' : 'START<br>WAITING';
  $('complete').disabled = !journey.active;
  $('demo').disabled = !journey.active;
  $('accelerated').disabled = done;
  document.querySelectorAll('[data-condition]').forEach(el => el.classList.toggle('lit', journey.recorded.has(el.dataset.condition)));
  const condition=done?'clear':journey.condition||(journey.phase==='waiting'?(journey.stage==='waiting_order'?'restaurant':'wait'):'ride');
  if(drawnCondition!==condition){drawnCondition=condition;$('encounter-icon').innerHTML=icon(condition);$('app-encounter-icon').innerHTML=icon(condition);mapIcon.innerHTML=journey.condition&&!done?icon(condition):'';}
  $('meter-encounter').dataset.type=condition;$('app-encounter').dataset.type=condition;
  const [title,detail]=journey.phase==='idle'?['READY','Start a delivery to record the road.']:encounterCopy[condition];
  $('encounter-title').textContent=title;$('app-encounter-title').textContent=title;
  $('encounter-detail').textContent=journey.condition&&!done?`${formatTime(journey.exposure[journey.condition])} IN THIS CONDITION · SIMULATED`:done?`${journey.recorded.size} CONDITIONS RECORDED`:'';
  $('encounter-detail').hidden=!$('encounter-detail').textContent;
  $('encounter-count').textContent=journey.recorded.size;
  $('worker-impact').textContent=journey.phase==='idle'?'':WORKER_CONTEXT[condition];
  $('worker-impact').hidden=!$('worker-impact').textContent;
  document.querySelector('.route-map').dataset.condition=journey.condition||'';
  if (done && !journey.saved) {
    journey.saved = true;
    history.unshift({number:journey.number, total:journey.total, travel:journey.travel, wait:journey.wait, exposure:{...journey.exposure}, conditions:[...journey.recorded], events:journey.events.map(event=>({...event})), savedAt:new Date().toISOString(), simulated:true});
    history = history.slice(0,20);
    try {localStorage.setItem('beyond-eta-history',JSON.stringify(history));} catch {}
    renderHistory();
  }
  renderApp();
}
function renderLog() {
  $('condition-summary').textContent = journey.recorded.size ? `Recorded: ${[...journey.recorded].map(key => EVENT_TYPES[key].short).join(' · ')}. All conditions are simulated.` : 'No simulated conditions recorded yet.';
  $('event-picker').replaceChildren();
  for (const [key, event] of Object.entries(EVENT_TYPES)) {
    const button = document.createElement('button'); button.textContent = `＋ ${event.short}`; button.disabled = !journey.active;
    button.addEventListener('click', () => {sync(); guided = null; journey.event(key); render(); renderLog();});
    $('event-picker').append(button);
  }
  $('journey-log').replaceChildren();
  for (const event of journey.events) {
    const row = document.createElement('li'); const time = document.createElement('time'); time.textContent = formatTime(event.at);
    const text = document.createElement('span'); text.textContent = event.label; row.append(time, text); $('journey-log').append(row);
  }
  if (!journey.events.length) { const row = document.createElement('li'); row.textContent = 'Start a delivery to record the journey.'; $('journey-log').append(row); }
}
$('primary').addEventListener('click', () => { sync(); guided = null; if (journey.phase === 'completed') {journey = new Journey(journey.number + 1); demoIndex = 0; lastLogLength = -1; speed = $('accelerated').checked ? 30 : 1;} journey.start(); render(); });
$('wait').addEventListener('click', () => {sync(); guided = null; journey.toggleWaiting(); render();});
$('complete').addEventListener('click', () => {sync(); guided = null; journey.complete(); render();});
$('accelerated').addEventListener('change', () => {sync(); speed = $('accelerated').checked ? 30 : 1; document.querySelector('.switch b').textContent = `×${speed}`;});
$('demo').addEventListener('click', () => {sync(); guided = null; journey.event(demoTypes[demoIndex++ % demoTypes.length]); render(); renderLog(); $('conditions-dialog').showModal();});
$('conditions').addEventListener('click', () => {sync(); renderLog(); $('conditions-dialog').showModal();});
$('info').addEventListener('click', () => $('info-dialog').showModal());
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {if (event.target === dialog) {const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();}});
});
function currentRecord() {return {number:journey.number,total:journey.total,travel:journey.travel,wait:journey.wait,exposure:{...journey.exposure},conditions:[...journey.recorded],events:journey.events,simulated:true};}
function renderApp() {
  const customer = perspective === 'customer'; const done = journey.phase === 'completed';
  $('app-order').textContent = `#${String(journey.number).padStart(3,'0')}`;
  $('app-title').textContent = customer ? 'Your order' : 'Your delivery';
  $('app-status').textContent = journey.phase === 'idle' ? 'Ready to start' : done ? 'Delivered' : journey.phase === 'waiting' ? (journey.stage === 'waiting_order' ? 'Waiting for the order' : 'Journey paused') : journey.stage === 'to_customer' ? 'On the way to the customer' : 'On the way to the restaurant';
  $('app-time-label').textContent = customer && !done ? 'ILLUSTRATIVE ETA' : 'RECORDED TIME';
  $('app-total').textContent = customer && !done ? `${illustrativeETA()} min` : formatTime(journey.total);
  $('app-split').textContent = `${formatTime(journey.travel)} / ${formatTime(journey.wait)}`;
  $('travel-bar').style.width = `${journey.total ? journey.travel/journey.total*100 : 100}%`;
  $('wait-bar').style.width = `${journey.total ? journey.wait/journey.total*100 : 0}%`;
  const route = $('route-path'); const point = route.getPointAtLength(route.getTotalLength()*journey.progress);
  $('rider-marker').setAttribute('transform',`translate(${point.x},${point.y})`);
  $('app-primary').textContent = done ? 'New delivery' : 'Start delivery'; $('app-primary').disabled = journey.active;
  $('app-wait').textContent = journey.phase === 'waiting' ? 'Resume journey' : 'Start waiting'; $('app-wait').disabled = !journey.active;
  $('checkpoint').textContent = journey.stage === 'waiting_order' ? 'Order collected' : journey.stage === 'to_customer' || done ? 'Pickup recorded' : 'At restaurant';
  $('checkpoint').disabled = !journey.active || journey.stage === 'to_customer';
  $('app-complete').disabled = !journey.active;
  document.querySelectorAll('[data-event]').forEach(button=>button.disabled=!journey.active);
  $('download-record').disabled = !done;
  $('log-count').textContent = journey.events.length;
  $('history-count').textContent = history.length;
  $('guided').textContent = guided?.running ? 'Stop guided demo' : 'Run 40-second demo';
  $('demo-status').textContent = guided?.running ? `Guided demo · ${Math.min(100,Math.floor(journey.total/12))}%` : guided && done ? 'Guided delivery completed' : 'Manual mode';
  $('accelerated').disabled = done || !!guided?.running;
  if (lastLogLength !== journey.events.length) {
    lastLogLength = journey.events.length;
    $('app-log').replaceChildren();
    for (const event of journey.events) {const li=document.createElement('li'); const time=document.createElement('time'); time.textContent=formatTime(event.at); const text=document.createElement('span'); text.textContent=event.label; li.append(time,text); $('app-log').append(li);}
    if (!journey.events.length) {const li=document.createElement('li'); li.textContent='No journey recorded yet.'; $('app-log').append(li);}
    $('exposure-chips').replaceChildren();
    for (const type of journey.recorded) {const chip=document.createElement('span');chip.innerHTML=icon(type);const label=document.createElement('span');label.textContent=EVENT_TYPES[type].short;chip.append(label);$('exposure-chips').append(chip);}
    if(!journey.recorded.size){const chip=document.createElement('span');chip.textContent='No encounters recorded';$('exposure-chips').append(chip);}
  }
}
function renderHistory() {
  $('history-list').replaceChildren();
  if (!history.length) {$('history-list').textContent='Complete a delivery to save its journey here.';return;}
  for (const record of history) {
    const details=document.createElement('details');const summary=document.createElement('summary');summary.textContent=`Delivery #${String(record.number).padStart(3,'0')} · ${formatTime(record.total)}`;
    const text=document.createElement('p');text.textContent=`Travelling ${formatTime(record.travel)} · Waiting ${formatTime(record.wait)}. ${record.conditions.map(type=>EVENT_TYPES[type]?.short).filter(Boolean).join(', ') || 'No encounters recorded'}. Simulated delivery.`;
    const list=document.createElement('ol');for(const event of record.events){const li=document.createElement('li');li.textContent=`${formatTime(event.at)} · ${event.label}`;list.append(li);}
    details.append(summary,text,list);$('history-list').append(details);
  }
}
function setPerspective(value) {
 perspective=value;
 $('worker-view').classList.toggle('selected',value==='worker');$('customer-view').classList.toggle('selected',value==='customer');
 $('worker-view').setAttribute('aria-pressed',value==='worker');$('customer-view').setAttribute('aria-pressed',value==='customer');
 document.querySelectorAll('.worker-detail').forEach(el=>el.hidden=value==='customer');$('app-actions').hidden=value==='customer';
 document.querySelector('[data-tab="log"]').hidden=value==='customer';document.querySelector('[data-tab="history"]').hidden=value==='customer';
 if(value==='customer') setTab('journey'); renderApp();
}
function setTab(value) {appTab=value;document.querySelectorAll('[data-tab]').forEach(button=>{button.classList.toggle('selected',button.dataset.tab===value);button.setAttribute('aria-pressed',button.dataset.tab===value);});for(const tab of ['journey','log','history']) $(`${tab}-panel`).hidden=tab!==value;}
$('worker-view').addEventListener('click',()=>setPerspective('worker'));
$('customer-view').addEventListener('click',()=>setPerspective('customer'));
document.querySelectorAll('[data-tab]').forEach(button=>button.addEventListener('click',()=>setTab(button.dataset.tab)));
$('app-primary').addEventListener('click',()=>$('primary').click());
$('app-wait').addEventListener('click',()=>$('wait').click());
$('app-complete').addEventListener('click',()=>$('complete').click());
$('checkpoint').addEventListener('click',()=>{sync();guided=null;if(journey.stage==='to_restaurant')journey.arriveRestaurant();else journey.collectOrder();render();});
document.querySelectorAll('[data-event]').forEach(button=>button.addEventListener('click',()=>{sync();guided=null;journey.event(button.dataset.event);render();}));
$('guided').addEventListener('click',()=>{
 sync();if(guided?.running){guided=null;render();return;}
 journey=new Journey(journey.phase==='idle'?journey.number:journey.number+1);lastLogLength=-1;demoIndex=0;speed=30;$('accelerated').checked=true;document.querySelector('.switch b').textContent='×30';guided=new GuidedDemo();journey.start();last=performance.now();setPerspective('worker');setTab('journey');render();
});
$('download-record').addEventListener('click',()=>{if(journey.phase!=='completed')return;const url=URL.createObjectURL(new Blob([JSON.stringify(currentRecord(),null,2)],{type:'application/json'}));const link=document.createElement('a');link.href=url;link.download=`beyond-eta-journey-${journey.number}.json`;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
renderHistory();
setInterval(() => {sync(); render();}, 100);
render();

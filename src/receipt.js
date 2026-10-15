import {jsPDF} from 'jspdf';

// One layout supplies the screen, image and PDF; values are aligned, never space-padded.
export function receiptLines(baseline='latest') {
 return [
  {type:'title',text:'BEYOND ETA'},
  {type:'meta',text:'DELIVERY #001'},
  {type:'rule'},
  {type:'total',label:'TOTAL TIME',value:'26 min'},
  {type:'heading',text:'TIME BREAKDOWN'},
  {type:'row',label:'Riding',value:'20 min'},
  {type:'row',label:'Waiting for food',value:'4 min'},
  {type:'row',label:'Safety stop',value:'2 min'},
  {type:'rule'},
  {type:'heading',text:'CONDITIONS WHILE RIDING'},
  {type:'row',label:'Rain',value:'6 min'},
  {type:'row',label:'Traffic',value:'6 min'},
  {type:'note',text:'Included in riding time, not added to it.'},
  {type:'rule'},
  {type:'heading',text:'HOW THE DELIVERY IS JUDGED'},
  {type:'row',label:'First ETA',value:'20 min'},
  {type:'result',label:'Compared with first ETA',value:'6 min late'},
  {type:'row',label:'Latest ETA',value:'26 min'},
  {type:'result',label:'Compared with latest ETA',value:'On time'},
  {type:'rule'},
  {type:'note',text:`Phone uses: ${baseline==='original'?'first ETA (20 min)':'latest ETA (26 min)'}.`},
  {type:'note',text:'Scripted demo. Not a platform record.'}
 ];
}
const heights={title:32,meta:25,rule:22,total:44,heading:30,row:26,result:34,note:23};
export function receiptLayout(baseline) {
 let y=26;
 const lines=receiptLines(baseline).map(line=>{const positioned={...line,y};y+=heights[line.type];return positioned;});
 return {width:384,height:y+20,lines};
}
export function receiptHTML(baseline) {
 return receiptLines(baseline).map(line=>line.type==='rule'?'<hr>':
  line.label?`<div class="paper-${line.type}"><span>${line.label}</span><strong>${line.value}</strong></div>`:
  `<${line.type==='title'?'h2':'p'} class="paper-${line.type}">${line.text}</${line.type==='title'?'h2':'p'}>`).join('');
}
export function receiptPNG(baseline) {
 const layout=receiptLayout(baseline),canvas=document.createElement('canvas');
 canvas.width=layout.width*3;canvas.height=layout.height*3;
 const ctx=canvas.getContext('2d');ctx.scale(3,3);
 ctx.fillStyle='#fffdf5';ctx.fillRect(0,0,layout.width,layout.height);ctx.fillStyle='#171717';ctx.textBaseline='top';
 for(const line of layout.lines){
  if(line.type==='rule'){ctx.strokeStyle='#777';ctx.setLineDash([3,3]);ctx.beginPath();ctx.moveTo(24,line.y+6);ctx.lineTo(360,line.y+6);ctx.stroke();continue;}
  const size=line.type==='title'?25:line.type==='total'?20:line.type==='note'?12:14;
  const bold=['title','heading','total','result'].includes(line.type);
  ctx.font=`${bold?'bold ':''}${size}px "Courier New",monospace`;
  ctx.textAlign='left';ctx.fillText(line.text||line.label,24,line.y);
  if(line.value){ctx.textAlign='right';ctx.fillText(line.value,360,line.y);}
 }
 return canvas.toDataURL('image/png');
}
export function receiptPDF(baseline) {
 const layout=receiptLayout(baseline),scale=80/layout.width;
 const pdf=new jsPDF({unit:'mm',format:[80,layout.height*scale],orientation:'portrait'});
 pdf.setProperties({title:'Beyond ETA - Delivery 001',subject:'Scripted delivery record'});
 for(const line of layout.lines){
  if(line.type==='rule'){pdf.setDrawColor(120);pdf.setLineWidth(.15);pdf.setLineDashPattern([.6,.6],0);pdf.line(5,(line.y+6)*scale,75,(line.y+6)*scale);continue;}
  const size=line.type==='title'?25:line.type==='total'?20:line.type==='note'?12:14;
  pdf.setFont('courier',['title','heading','total','result'].includes(line.type)?'bold':'normal');
  pdf.setFontSize(size*scale*72/25.4);pdf.setTextColor(0);
  pdf.text(line.text||line.label,5,line.y*scale,{baseline:'top'});
  if(line.value)pdf.text(line.value,75,line.y*scale,{baseline:'top',align:'right'});
 }
 return pdf;
}

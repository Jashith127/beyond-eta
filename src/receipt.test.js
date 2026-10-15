import test from 'node:test';
import assert from 'node:assert/strict';
import {receiptLines,receiptPDF,receiptLayout} from './receipt.js';

test('changing the reference on a receipt retains all journey evidence',()=>{
 const original=receiptLines('original'),latest=receiptLines('latest');
 assert.deepEqual(original.filter(x=>!x.text?.startsWith('Phone uses:')),latest.filter(x=>!x.text?.startsWith('Phone uses:')));
 assert.equal(original.find(x=>x.label==='TOTAL TIME').value,'26 min');
});
test('PDF is a single 80 mm receipt with space for every label and value',()=>{
 const pdf=receiptPDF('original');
 assert.equal(pdf.getNumberOfPages(),1);
 assert.ok(Math.abs(pdf.internal.pageSize.getWidth()-80)<.01);
 for(const line of receiptLayout('original').lines){
  if(line.type==='rule')continue;
  const size=line.type==='title'?25:line.type==='total'?20:line.type==='note'?12:14;
  pdf.setFont('courier',['title','heading','total','result'].includes(line.type)?'bold':'normal');
  pdf.setFontSize(size*(80/384)*72/25.4);
  assert.ok(pdf.getTextWidth(line.text||line.label)+pdf.getTextWidth(line.value||'')<68,`Overflow: ${line.text||line.label}`);
 }
});

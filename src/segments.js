const shapes = [
 '8,2 44,2 49,7 43,12 9,12 3,7',
 '50,9 53,14 50,45 44,50 40,45 43,15',
 '44,54 49,59 46,89 40,96 36,90 39,61',
 '7,94 36,94 41,99 35,104 5,104 0,99',
 '4,54 9,59 6,89 0,96 -4,90 -1,61',
 '10,9 15,14 12,45 6,50 2,45 5,15',
 '7,48 40,48 45,53 39,58 6,58 1,53'
];
const numbers = {0:[0,1,2,3,4,5],1:[1,2],2:[0,1,6,4,3],3:[0,1,6,2,3],4:[5,6,1,2],5:[0,5,6,2,3],6:[0,5,6,4,2,3],7:[0,1,2],8:[0,1,2,3,4,5,6],9:[0,1,2,3,5,6]};
export function drawDisplay(element, value) {
 if (element.dataset.value === value) return;
 element.dataset.value = value;
 element.setAttribute('aria-label', `Total time ${value}`);
 let x = 8;
 const content = [...value].map(character => {
   if (character === ':') {const svg = `<g transform="translate(${x},0)"><rect x="1" y="29" width="7" height="7" class="segment on"/><rect x="-1" y="73" width="7" height="7" class="segment on"/></g>`; x+=24; return svg;}
   const svg = `<g transform="translate(${x},0)">${shapes.map((points,i) => `<polygon points="${points}" class="segment ${numbers[character]?.includes(i) ? 'on':''}"/>`).join('')}</g>`; x+=65; return svg;
 }).join('');
 element.innerHTML = `<svg viewBox="0 0 ${x-4} 108" aria-hidden="true" focusable="false">${content}</svg>`;
}

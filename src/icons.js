const paths={
 rain:'<path d="M12 23H9a6 6 0 1 1 1-12 9 9 0 0 1 17 1 6 6 0 0 1-1 11h-3"/><path d="m12 28-2 5m10-5-2 5m10-5-2 5"/>',
 heat:'<circle cx="20" cy="20" r="7"/><path d="M20 2v5m0 26v5M2 20h5m26 0h5M7 7l4 4m18 18 4 4M7 33l4-4m18-18 4-4"/>',
 traffic:'<rect x="2" y="11" width="16" height="12" rx="3"/><path d="m5 11 2-6h6l2 6M5 23v4m10-4v4M3 17h14"/><rect x="22" y="21" width="16" height="12" rx="3"/><path d="m25 21 2-6h6l2 6m-10 12v4m10-4v4M23 27h14"/>',
 hazard:'<path d="m20 4 17 31H3Z"/><path d="M20 15v10"/><circle cx="20" cy="30" r="1"/>',
 restaurant:'<path d="M7 3v12m5-12v12m5-12v12M7 10h10m-5 5v22M30 3c-7 7-7 16 0 16V3Zm0 16v18"/>',
 clear:'<path d="m8 22 8 8L33 10"/>',
 ride:'<circle cx="9" cy="29" r="6"/><circle cx="31" cy="29" r="6"/><path d="m9 29 8-15 8 15H9m8-15h8l6 15M15 8h7m3 6 3-7h5"/>',
 wait:'<rect x="10" y="7" width="6" height="26" rx="1"/><rect x="24" y="7" width="6" height="26" rx="1"/>'
};
export function icon(type){return `<svg viewBox="0 0 40 40" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths[type]||paths.clear}</svg>`;}

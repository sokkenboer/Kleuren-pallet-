export interface ColoringTemplate {
  id: string;
  name: string;
  icon: string;
  category: 'dieren' | 'voertuigen' | 'fantasie';
  description: string;
}

export const COLORING_CATEGORIES = [
  { id: 'alles', label: 'Alles (30)', icon: '🎨' },
  { id: 'dieren', label: 'Dieren', icon: '🐾' },
  { id: 'voertuigen', label: 'Voertuigen', icon: '🚀' },
  { id: 'fantasie', label: 'Natuur & Fantasie', icon: '🌈' },
] as const;

export const COLORING_TEMPLATES: ColoringTemplate[] = [
  // 1-10: Original 10 Templates
  { id: 'kameleon', name: 'Kiki de Kameleon', icon: '🦎', category: 'dieren', description: 'Onze lieve mascotte op een tak' },
  { id: 'vlinder', name: 'Vrolijke Vlinder', icon: '🦋', category: 'dieren', description: 'Grote vleugels met vrolijke stippen' },
  { id: 'schildpad', name: 'Lieve Schildpad', icon: '🐢', category: 'dieren', description: 'Schild met mooie patronen' },
  { id: 'regenboog', name: 'Zomer Regenboog', icon: '🌈', category: 'fantasie', description: 'Kleurige bogen, zon en wolken' },
  { id: 'raket', name: 'Ruimteraket', icon: '🚀', category: 'voertuigen', description: 'Vlieg naar de sterren met vuur' },
  { id: 'lieveheersbeestje', name: 'Lief Lieveheersbeestje', icon: '🐞', category: 'dieren', description: 'Rode vleugeltjes op een groen blad' },
  { id: 'walvis', name: 'Blije Walvis', icon: '🐳', category: 'dieren', description: 'Spuit een hoge waterfontein in zee' },
  { id: 'zonnebloem', name: 'Zon & Zonnebloem', icon: '🌻', category: 'fantasie', description: 'Stralende bloem met een bijtje' },
  { id: 'kasteel', name: 'Magisch Kasteel', icon: '🏰', category: 'fantasie', description: 'Torentjes, wapperende vlaggen en poort' },
  { id: 'zeilboot', name: 'Vrolijk Zeilbootje', icon: '⛵', category: 'voertuigen', description: 'Varen over zachte zeegolven' },

  // 11-30: 20 NEW Engaging Templates for Kids
  { id: 'olifant', name: 'Vrolijke Olifant', icon: '🐘', category: 'dieren', description: 'Grote oren en waterdruppels uit de slurf' },
  { id: 'leeuw', name: 'Stoere Leeuw', icon: '🦁', category: 'dieren', description: 'Grote zachte manen en vrolijke snorharen' },
  { id: 'dinosaurus', name: 'Vriendelijke Dino', icon: '🦕', category: 'dieren', description: 'Lange hals, lieve lach en rugschildjes' },
  { id: 'panda', name: 'Knuffel Panda', icon: '🐼', category: 'dieren', description: 'Lieve ronde oortjes en sappige bamboebladeren' },
  { id: 'kikker', name: 'Kwakende Kikker', icon: '🐸', category: 'dieren', description: 'Grote kijkers op een waterlelieblad' },
  { id: 'uil', name: 'Wijze Uil', icon: '🦉', category: 'dieren', description: 'Grote ronde ogen, sterren en een maansikkel' },
  { id: 'eendje', name: 'Blij Eendje', icon: '🦆', category: 'dieren', description: 'Kwekend zwemmen tussen waterriet en golven' },
  { id: 'vis', name: 'Goudvisje', icon: '🐠', category: 'dieren', description: 'Grote vinnen, waterbelletjes en waterplanten' },
  { id: 'slak', name: 'Vrolijke Slak', icon: '🐌', category: 'dieren', description: 'Prachtig spiraalhuisje en lieve voelsprieten' },
  { id: 'paard', name: 'Lief Veulentje', icon: '🐴', category: 'dieren', description: 'Vrolijk paardje in de weide bij het hek' },
  { id: 'krab', name: 'Blije Krab', icon: '🦀', category: 'dieren', description: 'Twee grote zwaaischaren op het zandstrand' },
  { id: 'rups', name: 'Kleurige Rups', icon: '🐛', category: 'dieren', description: 'Ronde lijfjes kruipend over een groen blad' },
  { id: 'giraf', name: 'Lange Giraf', icon: '🦒', category: 'dieren', description: 'Hele lange nek vol stippen en een zonnige boom' },
  { id: 'brandweerauto', name: 'Dappere Brandweer', icon: '🚒', category: 'voertuigen', description: 'Zwaailicht, ladder en grote wielen' },
  { id: 'vliegtuig', name: 'Vrolijk Vliegtuig', icon: '✈️', category: 'voertuigen', description: 'Propeller, vleugels en zachte wolken' },
  { id: 'luchtballon', name: 'Grote Luchtballon', icon: '🎈', category: 'voertuigen', description: 'Gestreepte ballon hoog tussen de vogeltjes' },
  { id: 'trein', name: 'Tsjoeke Trein', icon: '🚂', category: 'voertuigen', description: 'Stoomlocomotief met grote rookwolken' },
  { id: 'ijsje', name: 'Drielaags IJsco', icon: '🍦', category: 'fantasie', description: 'Drie vrolijke bollen ijs met een kersje erop' },
  { id: 'appelboom', name: 'Rijke Appelboom', icon: '🍎', category: 'fantasie', description: 'Rode appels in de boom en een gevuld mandje' },
  { id: 'paddenstoel', name: 'Kabouterhuisje', icon: '🍄', category: 'fantasie', description: 'Grote rode hoed met witte stippen en deurtje' },
];

export const TEMPLATE_PART_KEYS: Record<string, string[]> = {
  kameleon: ['k-body', 'k-tail', 'k-head', 'k-belly', 'k-leg1', 'k-leg2', 'k-branch', 'k-leaf1', 'k-leaf2', 'k-eye-rim'],
  vlinder: ['v-wing-lt', 'v-wing-rt', 'v-spot-lt', 'v-spot-rt', 'v-wing-lb', 'v-wing-rb', 'v-body', 'v-head', 'v-flower1', 'v-flower2'],
  schildpad: ['t-leg1', 't-leg2', 't-leg3', 't-leg4', 't-head', 't-shell-main', 't-shell-center', 't-pebble1', 't-pebble2'],
  regenboog: ['rb-arc-1', 'rb-arc-2', 'rb-arc-3', 'rb-cloud-l', 'rb-cloud-r', 'rb-sun', 'rb-hill'],
  raket: ['rk-wing-l', 'rk-wing-r', 'rk-body', 'rk-nose', 'rk-window', 'rk-flame', 'rk-star1', 'rk-star2'],
  lieveheersbeestje: ['lh-leaf', 'lh-body', 'lh-wing-l', 'lh-wing-r', 'lh-head', 'lh-spot1', 'lh-spot2', 'lh-spot3', 'lh-drop'],
  walvis: ['w-water1', 'w-water2', 'w-body', 'w-belly', 'w-fin', 'w-tail', 'w-wave1', 'w-wave2'],
  zonnebloem: ['zb-stem', 'zb-leaf-l', 'zb-leaf-r', 'zb-center', 'zb-p1', 'zb-p2', 'zb-p3', 'zb-p4', 'zb-bee-body', 'zb-bee-wing'],
  kasteel: ['ks-ground', 'ks-wall', 'ks-tower-l', 'ks-tower-r', 'ks-tower-m', 'ks-roof-l', 'ks-roof-r', 'ks-roof-m', 'ks-door', 'ks-flag'],
  zeilboot: ['zb-water', 'zb-hull', 'zb-cabin', 'zb-sail-main', 'zb-sail-front', 'zb-flag', 'zb-sun'],

  // 20 New Template Part Keys
  olifant: ['ol-body', 'ol-head', 'ol-ear', 'ol-trunk', 'ol-leg1', 'ol-leg2', 'ol-drop1', 'ol-drop2', 'ol-ground'],
  leeuw: ['lw-body', 'lw-head', 'lw-mane', 'lw-snout', 'lw-paw1', 'lw-paw2', 'lw-tail', 'lw-grass'],
  dinosaurus: ['dn-body', 'dn-neck', 'dn-head', 'dn-belly', 'dn-plate1', 'dn-plate2', 'dn-plate3', 'dn-plate4', 'dn-tail', 'dn-ground'],
  panda: ['pd-body', 'pd-head', 'pd-belly', 'pd-ear-l', 'pd-ear-r', 'pd-eye-l', 'pd-eye-r', 'pd-bamboo', 'pd-leaf'],
  kikker: ['kk-body', 'kk-head', 'kk-leg-l', 'kk-leg-r', 'kk-lilypad', 'kk-flower', 'kk-water1', 'kk-water2'],
  uil: ['ul-body', 'ul-head', 'ul-wing-l', 'ul-wing-r', 'ul-belly', 'ul-branch', 'ul-moon', 'ul-star1', 'ul-star2'],
  eendje: ['ed-body', 'ed-head', 'ed-wing', 'ed-beak', 'ed-wave1', 'ed-wave2', 'ed-reed1', 'ed-reed2'],
  vis: ['vs-body', 'vs-tail', 'vs-fin-t', 'vs-fin-b', 'vs-bubble1', 'vs-bubble2', 'vs-bubble3', 'vs-plant'],
  slak: ['sl-body', 'sl-head', 'sl-shell-outer', 'sl-shell-inner', 'sl-flower', 'sl-stem', 'sl-grass'],
  paard: ['pr-body', 'pr-head', 'pr-mane', 'pr-tail', 'pr-leg1', 'pr-leg2', 'pr-fence', 'pr-sun'],
  krab: ['kb-body', 'kb-claw-l', 'kb-claw-r', 'kb-leg1', 'kb-leg2', 'kb-sand', 'kb-shell'],
  rups: ['rp-head', 'rp-seg1', 'rp-seg2', 'rp-seg3', 'rp-seg4', 'rp-leaf', 'rp-stem', 'rp-sun'],
  giraf: ['gr-body', 'gr-neck', 'gr-head', 'gr-spot1', 'gr-spot2', 'gr-spot3', 'gr-leg1', 'gr-leg2', 'gr-tree'],
  brandweerauto: ['bw-body', 'bw-cabin', 'bw-ladder', 'bw-wheel1', 'bw-wheel2', 'bw-light', 'bw-hose'],
  vliegtuig: ['vt-body', 'vt-wing-l', 'vt-wing-r', 'vt-propeller', 'vt-tail', 'vt-window1', 'vt-cloud'],
  luchtballon: ['lb-strip1', 'lb-strip2', 'lb-strip3', 'lb-basket', 'lb-cloud-l', 'lb-cloud-r', 'lb-bird'],
  trein: ['tr-body', 'tr-cabin', 'tr-chimney', 'tr-wheel1', 'tr-wheel2', 'tr-smoke1', 'tr-smoke2'],
  ijsje: ['ij-cone', 'ij-scoop1', 'ij-scoop2', 'ij-scoop3', 'ij-cherry', 'ij-sprinkle'],
  appelboom: ['ab-trunk', 'ab-crown', 'ab-apple1', 'ab-apple2', 'ab-apple3', 'ab-basket', 'ab-grass'],
  paddenstoel: ['ps-stem', 'ps-cap', 'ps-dot1', 'ps-dot2', 'ps-dot3', 'ps-door', 'ps-grass'],
};

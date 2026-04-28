export type ElementCategory =
  | 'alkali' | 'alkaline' | 'transition' | 'post'
  | 'metalloid' | 'nonmetal' | 'halogen' | 'noble'
  | 'lanthanide' | 'actinide';

export type Phase = 'Solid' | 'Liquid' | 'Gas';

export interface Element {
  n: number;
  sym: string;
  name: string;
  mass: number;
  cat: ElementCategory;
  period: number;
  group: number | null;
  phase: Phase;
  config: string;
  en: number | null;      // electronegativity (Pauling)
  mp: number | null;      // melting point °C
  bp: number | null;      // boiling point °C
  density: number | null; // g/cm³ (g/L for gases)
  discovered?: number;
  discoveredBy?: string;
}

export const CATEGORY_LABELS: Record<ElementCategory, string> = {
  alkali:     'Alkali metal',
  alkaline:   'Alkaline earth',
  transition: 'Transition metal',
  post:       'Post-transition',
  metalloid:  'Metalloid',
  nonmetal:   'Nonmetal',
  halogen:    'Halogen',
  noble:      'Noble gas',
  lanthanide: 'Lanthanide',
  actinide:   'Actinide',
};

export const CATEGORY_COLORS: Record<ElementCategory, string> = {
  alkali:     '#c0392b',
  alkaline:   '#d35400',
  transition: '#2980b9',
  post:       '#7f8c8d',
  metalloid:  '#16a085',
  nonmetal:   '#27ae60',
  halogen:    '#8e44ad',
  noble:      '#148f77',
  lanthanide: '#d68910',
  actinide:   '#cb4335',
};

export const elements: Element[] = [
  {n:1,  sym:'H',  name:'Hydrogen',      mass:1.008,   cat:'nonmetal',   period:1, group:1,    phase:'Gas',    config:'1s¹',                       en:2.20, mp:-259.1, bp:-252.9, density:0.0899},
  {n:2,  sym:'He', name:'Helium',        mass:4.003,   cat:'noble',      period:1, group:18,   phase:'Gas',    config:'1s²',                       en:null, mp:null,   bp:-268.9, density:0.1786},
  {n:3,  sym:'Li', name:'Lithium',       mass:6.941,   cat:'alkali',     period:2, group:1,    phase:'Solid',  config:'[He] 2s¹',                  en:0.98, mp:180.5,  bp:1342,   density:0.534},
  {n:4,  sym:'Be', name:'Beryllium',     mass:9.012,   cat:'alkaline',   period:2, group:2,    phase:'Solid',  config:'[He] 2s²',                  en:1.57, mp:1287,   bp:2468,   density:1.85},
  {n:5,  sym:'B',  name:'Boron',         mass:10.81,   cat:'metalloid',  period:2, group:13,   phase:'Solid',  config:'[He] 2s²2p¹',               en:2.04, mp:2075,   bp:4000,   density:2.34},
  {n:6,  sym:'C',  name:'Carbon',        mass:12.01,   cat:'nonmetal',   period:2, group:14,   phase:'Solid',  config:'[He] 2s²2p²',               en:2.55, mp:3642,   bp:3642,   density:2.267},
  {n:7,  sym:'N',  name:'Nitrogen',      mass:14.01,   cat:'nonmetal',   period:2, group:15,   phase:'Gas',    config:'[He] 2s²2p³',               en:3.04, mp:-210.1, bp:-195.8, density:1.251},
  {n:8,  sym:'O',  name:'Oxygen',        mass:16.00,   cat:'nonmetal',   period:2, group:16,   phase:'Gas',    config:'[He] 2s²2p⁴',               en:3.44, mp:-218.3, bp:-182.9, density:1.429},
  {n:9,  sym:'F',  name:'Fluorine',      mass:19.00,   cat:'halogen',    period:2, group:17,   phase:'Gas',    config:'[He] 2s²2p⁵',               en:3.98, mp:-219.6, bp:-188.1, density:1.696},
  {n:10, sym:'Ne', name:'Neon',          mass:20.18,   cat:'noble',      period:2, group:18,   phase:'Gas',    config:'[He] 2s²2p⁶',               en:null, mp:-248.6, bp:-246.1, density:0.9},
  {n:11, sym:'Na', name:'Sodium',        mass:22.99,   cat:'alkali',     period:3, group:1,    phase:'Solid',  config:'[Ne] 3s¹',                  en:0.93, mp:97.72,  bp:883,    density:0.968},
  {n:12, sym:'Mg', name:'Magnesium',     mass:24.31,   cat:'alkaline',   period:3, group:2,    phase:'Solid',  config:'[Ne] 3s²',                  en:1.31, mp:650,    bp:1090,   density:1.738},
  {n:13, sym:'Al', name:'Aluminum',      mass:26.98,   cat:'post',       period:3, group:13,   phase:'Solid',  config:'[Ne] 3s²3p¹',               en:1.61, mp:660.3,  bp:2519,   density:2.698},
  {n:14, sym:'Si', name:'Silicon',       mass:28.09,   cat:'metalloid',  period:3, group:14,   phase:'Solid',  config:'[Ne] 3s²3p²',               en:1.90, mp:1414,   bp:3265,   density:2.329},
  {n:15, sym:'P',  name:'Phosphorus',    mass:30.97,   cat:'nonmetal',   period:3, group:15,   phase:'Solid',  config:'[Ne] 3s²3p³',               en:2.19, mp:44.1,   bp:280.5,  density:1.823},
  {n:16, sym:'S',  name:'Sulfur',        mass:32.06,   cat:'nonmetal',   period:3, group:16,   phase:'Solid',  config:'[Ne] 3s²3p⁴',               en:2.58, mp:115.2,  bp:444.7,  density:2.067},
  {n:17, sym:'Cl', name:'Chlorine',      mass:35.45,   cat:'halogen',    period:3, group:17,   phase:'Gas',    config:'[Ne] 3s²3p⁵',               en:3.16, mp:-101.5, bp:-34.04, density:3.214},
  {n:18, sym:'Ar', name:'Argon',         mass:39.95,   cat:'noble',      period:3, group:18,   phase:'Gas',    config:'[Ne] 3s²3p⁶',               en:null, mp:-189.3, bp:-185.8, density:1.784},
  {n:19, sym:'K',  name:'Potassium',     mass:39.10,   cat:'alkali',     period:4, group:1,    phase:'Solid',  config:'[Ar] 4s¹',                  en:0.82, mp:63.38,  bp:759,    density:0.862},
  {n:20, sym:'Ca', name:'Calcium',       mass:40.08,   cat:'alkaline',   period:4, group:2,    phase:'Solid',  config:'[Ar] 4s²',                  en:1.00, mp:842,    bp:1484,   density:1.55},
  {n:21, sym:'Sc', name:'Scandium',      mass:44.96,   cat:'transition', period:4, group:3,    phase:'Solid',  config:'[Ar] 3d¹4s²',               en:1.36, mp:1541,   bp:2836,   density:2.985},
  {n:22, sym:'Ti', name:'Titanium',      mass:47.87,   cat:'transition', period:4, group:4,    phase:'Solid',  config:'[Ar] 3d²4s²',               en:1.54, mp:1668,   bp:3287,   density:4.507},
  {n:23, sym:'V',  name:'Vanadium',      mass:50.94,   cat:'transition', period:4, group:5,    phase:'Solid',  config:'[Ar] 3d³4s²',               en:1.63, mp:1910,   bp:3407,   density:6.11},
  {n:24, sym:'Cr', name:'Chromium',      mass:52.00,   cat:'transition', period:4, group:6,    phase:'Solid',  config:'[Ar] 3d⁵4s¹',               en:1.66, mp:1907,   bp:2671,   density:7.19},
  {n:25, sym:'Mn', name:'Manganese',     mass:54.94,   cat:'transition', period:4, group:7,    phase:'Solid',  config:'[Ar] 3d⁵4s²',               en:1.55, mp:1246,   bp:2061,   density:7.47},
  {n:26, sym:'Fe', name:'Iron',          mass:55.85,   cat:'transition', period:4, group:8,    phase:'Solid',  config:'[Ar] 3d⁶4s²',               en:1.83, mp:1538,   bp:2861,   density:7.874},
  {n:27, sym:'Co', name:'Cobalt',        mass:58.93,   cat:'transition', period:4, group:9,    phase:'Solid',  config:'[Ar] 3d⁷4s²',               en:1.88, mp:1495,   bp:2927,   density:8.9},
  {n:28, sym:'Ni', name:'Nickel',        mass:58.69,   cat:'transition', period:4, group:10,   phase:'Solid',  config:'[Ar] 3d⁸4s²',               en:1.91, mp:1455,   bp:2913,   density:8.908},
  {n:29, sym:'Cu', name:'Copper',        mass:63.55,   cat:'transition', period:4, group:11,   phase:'Solid',  config:'[Ar] 3d¹⁰4s¹',              en:1.90, mp:1084.6, bp:2562,   density:8.96},
  {n:30, sym:'Zn', name:'Zinc',          mass:65.38,   cat:'transition', period:4, group:12,   phase:'Solid',  config:'[Ar] 3d¹⁰4s²',              en:1.65, mp:419.5,  bp:907,    density:7.134},
  {n:31, sym:'Ga', name:'Gallium',       mass:69.72,   cat:'post',       period:4, group:13,   phase:'Solid',  config:'[Ar] 3d¹⁰4s²4p¹',           en:1.81, mp:29.76,  bp:2204,   density:5.907},
  {n:32, sym:'Ge', name:'Germanium',     mass:72.63,   cat:'metalloid',  period:4, group:14,   phase:'Solid',  config:'[Ar] 3d¹⁰4s²4p²',           en:2.01, mp:938.2,  bp:2820,   density:5.323},
  {n:33, sym:'As', name:'Arsenic',       mass:74.92,   cat:'metalloid',  period:4, group:15,   phase:'Solid',  config:'[Ar] 3d¹⁰4s²4p³',           en:2.18, mp:817,    bp:614,    density:5.727},
  {n:34, sym:'Se', name:'Selenium',      mass:78.97,   cat:'nonmetal',   period:4, group:16,   phase:'Solid',  config:'[Ar] 3d¹⁰4s²4p⁴',           en:2.55, mp:220.8,  bp:685,    density:4.81},
  {n:35, sym:'Br', name:'Bromine',       mass:79.90,   cat:'halogen',    period:4, group:17,   phase:'Liquid', config:'[Ar] 3d¹⁰4s²4p⁵',           en:2.96, mp:-7.2,   bp:58.8,   density:3.102},
  {n:36, sym:'Kr', name:'Krypton',       mass:83.80,   cat:'noble',      period:4, group:18,   phase:'Gas',    config:'[Ar] 3d¹⁰4s²4p⁶',           en:3.00, mp:-157.4, bp:-153.4, density:3.749},
  {n:37, sym:'Rb', name:'Rubidium',      mass:85.47,   cat:'alkali',     period:5, group:1,    phase:'Solid',  config:'[Kr] 5s¹',                  en:0.82, mp:39.31,  bp:688,    density:1.532},
  {n:38, sym:'Sr', name:'Strontium',     mass:87.62,   cat:'alkaline',   period:5, group:2,    phase:'Solid',  config:'[Kr] 5s²',                  en:0.95, mp:777,    bp:1382,   density:2.64},
  {n:39, sym:'Y',  name:'Yttrium',       mass:88.91,   cat:'transition', period:5, group:3,    phase:'Solid',  config:'[Kr] 4d¹5s²',               en:1.22, mp:1522,   bp:3345,   density:4.47},
  {n:40, sym:'Zr', name:'Zirconium',     mass:91.22,   cat:'transition', period:5, group:4,    phase:'Solid',  config:'[Kr] 4d²5s²',               en:1.33, mp:1855,   bp:4409,   density:6.52},
  {n:41, sym:'Nb', name:'Niobium',       mass:92.91,   cat:'transition', period:5, group:5,    phase:'Solid',  config:'[Kr] 4d⁴5s¹',               en:1.60, mp:2477,   bp:4744,   density:8.57},
  {n:42, sym:'Mo', name:'Molybdenum',    mass:95.96,   cat:'transition', period:5, group:6,    phase:'Solid',  config:'[Kr] 4d⁵5s¹',               en:2.16, mp:2623,   bp:4639,   density:10.28},
  {n:43, sym:'Tc', name:'Technetium',    mass:98,      cat:'transition', period:5, group:7,    phase:'Solid',  config:'[Kr] 4d⁵5s²',               en:1.90, mp:2157,   bp:4265,   density:11},
  {n:44, sym:'Ru', name:'Ruthenium',     mass:101.07,  cat:'transition', period:5, group:8,    phase:'Solid',  config:'[Kr] 4d⁷5s¹',               en:2.20, mp:2334,   bp:4150,   density:12.37},
  {n:45, sym:'Rh', name:'Rhodium',       mass:102.91,  cat:'transition', period:5, group:9,    phase:'Solid',  config:'[Kr] 4d⁸5s¹',               en:2.28, mp:1964,   bp:3695,   density:12.41},
  {n:46, sym:'Pd', name:'Palladium',     mass:106.42,  cat:'transition', period:5, group:10,   phase:'Solid',  config:'[Kr] 4d¹⁰',                 en:2.20, mp:1554.9, bp:2963,   density:12.023},
  {n:47, sym:'Ag', name:'Silver',        mass:107.87,  cat:'transition', period:5, group:11,   phase:'Solid',  config:'[Kr] 4d¹⁰5s¹',              en:1.93, mp:961.8,  bp:2162,   density:10.49},
  {n:48, sym:'Cd', name:'Cadmium',       mass:112.41,  cat:'transition', period:5, group:12,   phase:'Solid',  config:'[Kr] 4d¹⁰5s²',              en:1.69, mp:321.1,  bp:767,    density:8.65},
  {n:49, sym:'In', name:'Indium',        mass:114.82,  cat:'post',       period:5, group:13,   phase:'Solid',  config:'[Kr] 4d¹⁰5s²5p¹',           en:1.78, mp:156.6,  bp:2072,   density:7.31},
  {n:50, sym:'Sn', name:'Tin',           mass:118.71,  cat:'post',       period:5, group:14,   phase:'Solid',  config:'[Kr] 4d¹⁰5s²5p²',           en:1.96, mp:231.9,  bp:2602,   density:7.287},
  {n:51, sym:'Sb', name:'Antimony',      mass:121.76,  cat:'metalloid',  period:5, group:15,   phase:'Solid',  config:'[Kr] 4d¹⁰5s²5p³',           en:2.05, mp:630.6,  bp:1587,   density:6.685},
  {n:52, sym:'Te', name:'Tellurium',     mass:127.60,  cat:'metalloid',  period:5, group:16,   phase:'Solid',  config:'[Kr] 4d¹⁰5s²5p⁴',           en:2.10, mp:449.5,  bp:988,    density:6.232},
  {n:53, sym:'I',  name:'Iodine',        mass:126.90,  cat:'halogen',    period:5, group:17,   phase:'Solid',  config:'[Kr] 4d¹⁰5s²5p⁵',           en:2.66, mp:113.7,  bp:184.4,  density:4.93},
  {n:54, sym:'Xe', name:'Xenon',         mass:131.29,  cat:'noble',      period:5, group:18,   phase:'Gas',    config:'[Kr] 4d¹⁰5s²5p⁶',           en:2.60, mp:-111.8, bp:-108.1, density:5.894},
  {n:55, sym:'Cs', name:'Cesium',        mass:132.91,  cat:'alkali',     period:6, group:1,    phase:'Solid',  config:'[Xe] 6s¹',                  en:0.79, mp:28.44,  bp:671,    density:1.879},
  {n:56, sym:'Ba', name:'Barium',        mass:137.33,  cat:'alkaline',   period:6, group:2,    phase:'Solid',  config:'[Xe] 6s²',                  en:0.89, mp:727,    bp:1845,   density:3.51},
  {n:57, sym:'La', name:'Lanthanum',     mass:138.91,  cat:'lanthanide', period:6, group:3,    phase:'Solid',  config:'[Xe] 5d¹6s²',               en:1.10, mp:920,    bp:3464,   density:6.145},
  {n:58, sym:'Ce', name:'Cerium',        mass:140.12,  cat:'lanthanide', period:6, group:null, phase:'Solid',  config:'[Xe] 4f¹5d¹6s²',            en:1.12, mp:795,    bp:3443,   density:6.77},
  {n:59, sym:'Pr', name:'Praseodymium',  mass:140.91,  cat:'lanthanide', period:6, group:null, phase:'Solid',  config:'[Xe] 4f³6s²',               en:1.13, mp:935,    bp:3130,   density:6.773},
  {n:60, sym:'Nd', name:'Neodymium',     mass:144.24,  cat:'lanthanide', period:6, group:null, phase:'Solid',  config:'[Xe] 4f⁴6s²',               en:1.14, mp:1024,   bp:3074,   density:7.007},
  {n:61, sym:'Pm', name:'Promethium',    mass:145,     cat:'lanthanide', period:6, group:null, phase:'Solid',  config:'[Xe] 4f⁵6s²',               en:1.13, mp:1042,   bp:3000,   density:7.26},
  {n:62, sym:'Sm', name:'Samarium',      mass:150.36,  cat:'lanthanide', period:6, group:null, phase:'Solid',  config:'[Xe] 4f⁶6s²',               en:1.17, mp:1072,   bp:1794,   density:7.52},
  {n:63, sym:'Eu', name:'Europium',      mass:151.96,  cat:'lanthanide', period:6, group:null, phase:'Solid',  config:'[Xe] 4f⁷6s²',               en:1.20, mp:826,    bp:1529,   density:5.243},
  {n:64, sym:'Gd', name:'Gadolinium',    mass:157.25,  cat:'lanthanide', period:6, group:null, phase:'Solid',  config:'[Xe] 4f⁷5d¹6s²',            en:1.20, mp:1313,   bp:3273,   density:7.9},
  {n:65, sym:'Tb', name:'Terbium',       mass:158.93,  cat:'lanthanide', period:6, group:null, phase:'Solid',  config:'[Xe] 4f⁹6s²',               en:1.20, mp:1356,   bp:3230,   density:8.23},
  {n:66, sym:'Dy', name:'Dysprosium',    mass:162.50,  cat:'lanthanide', period:6, group:null, phase:'Solid',  config:'[Xe] 4f¹⁰6s²',              en:1.22, mp:1407,   bp:2567,   density:8.54},
  {n:67, sym:'Ho', name:'Holmium',       mass:164.93,  cat:'lanthanide', period:6, group:null, phase:'Solid',  config:'[Xe] 4f¹¹6s²',              en:1.23, mp:1461,   bp:2700,   density:8.79},
  {n:68, sym:'Er', name:'Erbium',        mass:167.26,  cat:'lanthanide', period:6, group:null, phase:'Solid',  config:'[Xe] 4f¹²6s²',              en:1.24, mp:1529,   bp:2868,   density:9.066},
  {n:69, sym:'Tm', name:'Thulium',       mass:168.93,  cat:'lanthanide', period:6, group:null, phase:'Solid',  config:'[Xe] 4f¹³6s²',              en:1.25, mp:1545,   bp:1950,   density:9.32},
  {n:70, sym:'Yb', name:'Ytterbium',     mass:173.04,  cat:'lanthanide', period:6, group:null, phase:'Solid',  config:'[Xe] 4f¹⁴6s²',              en:1.10, mp:824,    bp:1196,   density:6.9},
  {n:71, sym:'Lu', name:'Lutetium',      mass:174.97,  cat:'lanthanide', period:6, group:3,    phase:'Solid',  config:'[Xe] 4f¹⁴5d¹6s²',           en:1.27, mp:1663,   bp:3402,   density:9.84},
  {n:72, sym:'Hf', name:'Hafnium',       mass:178.49,  cat:'transition', period:6, group:4,    phase:'Solid',  config:'[Xe] 4f¹⁴5d²6s²',           en:1.30, mp:2233,   bp:4603,   density:13.31},
  {n:73, sym:'Ta', name:'Tantalum',      mass:180.95,  cat:'transition', period:6, group:5,    phase:'Solid',  config:'[Xe] 4f¹⁴5d³6s²',           en:1.50, mp:3017,   bp:5458,   density:16.65},
  {n:74, sym:'W',  name:'Tungsten',      mass:183.84,  cat:'transition', period:6, group:6,    phase:'Solid',  config:'[Xe] 4f¹⁴5d⁴6s²',           en:2.36, mp:3422,   bp:5555,   density:19.25},
  {n:75, sym:'Re', name:'Rhenium',       mass:186.21,  cat:'transition', period:6, group:7,    phase:'Solid',  config:'[Xe] 4f¹⁴5d⁵6s²',           en:1.90, mp:3186,   bp:5596,   density:21.02},
  {n:76, sym:'Os', name:'Osmium',        mass:190.23,  cat:'transition', period:6, group:8,    phase:'Solid',  config:'[Xe] 4f¹⁴5d⁶6s²',           en:2.20, mp:3033,   bp:5012,   density:22.59},
  {n:77, sym:'Ir', name:'Iridium',       mass:192.22,  cat:'transition', period:6, group:9,    phase:'Solid',  config:'[Xe] 4f¹⁴5d⁷6s²',           en:2.20, mp:2446,   bp:4428,   density:22.56},
  {n:78, sym:'Pt', name:'Platinum',      mass:195.08,  cat:'transition', period:6, group:10,   phase:'Solid',  config:'[Xe] 4f¹⁴5d⁹6s¹',           en:2.28, mp:1768.3, bp:3825,   density:21.45},
  {n:79, sym:'Au', name:'Gold',          mass:196.97,  cat:'transition', period:6, group:11,   phase:'Solid',  config:'[Xe] 4f¹⁴5d¹⁰6s¹',          en:2.54, mp:1064.2, bp:2856,   density:19.3},
  {n:80, sym:'Hg', name:'Mercury',       mass:200.59,  cat:'transition', period:6, group:12,   phase:'Liquid', config:'[Xe] 4f¹⁴5d¹⁰6s²',          en:2.00, mp:-38.83, bp:356.7,  density:13.534},
  {n:81, sym:'Tl', name:'Thallium',      mass:204.38,  cat:'post',       period:6, group:13,   phase:'Solid',  config:'[Xe] 4f¹⁴5d¹⁰6s²6p¹',       en:1.62, mp:304,    bp:1473,   density:11.85},
  {n:82, sym:'Pb', name:'Lead',          mass:207.2,   cat:'post',       period:6, group:14,   phase:'Solid',  config:'[Xe] 4f¹⁴5d¹⁰6s²6p²',       en:2.33, mp:327.5,  bp:1749,   density:11.34},
  {n:83, sym:'Bi', name:'Bismuth',       mass:208.98,  cat:'post',       period:6, group:15,   phase:'Solid',  config:'[Xe] 4f¹⁴5d¹⁰6s²6p³',       en:2.02, mp:271.5,  bp:1564,   density:9.747},
  {n:84, sym:'Po', name:'Polonium',      mass:209,     cat:'post',       period:6, group:16,   phase:'Solid',  config:'[Xe] 4f¹⁴5d¹⁰6s²6p⁴',       en:2.00, mp:254,    bp:962,    density:9.196},
  {n:85, sym:'At', name:'Astatine',      mass:210,     cat:'halogen',    period:6, group:17,   phase:'Solid',  config:'[Xe] 4f¹⁴5d¹⁰6s²6p⁵',       en:2.20, mp:302,    bp:337,    density:null},
  {n:86, sym:'Rn', name:'Radon',         mass:222,     cat:'noble',      period:6, group:18,   phase:'Gas',    config:'[Xe] 4f¹⁴5d¹⁰6s²6p⁶',       en:2.20, mp:-71,    bp:-61.7,  density:9.73},
  {n:87, sym:'Fr', name:'Francium',      mass:223,     cat:'alkali',     period:7, group:1,    phase:'Solid',  config:'[Rn] 7s¹',                  en:0.70, mp:27,     bp:677,    density:null},
  {n:88, sym:'Ra', name:'Radium',        mass:226,     cat:'alkaline',   period:7, group:2,    phase:'Solid',  config:'[Rn] 7s²',                  en:0.90, mp:700,    bp:1737,   density:5.5},
  {n:89, sym:'Ac', name:'Actinium',      mass:227,     cat:'actinide',   period:7, group:3,    phase:'Solid',  config:'[Rn] 6d¹7s²',               en:1.10, mp:1050,   bp:3200,   density:10.07},
  {n:90, sym:'Th', name:'Thorium',       mass:232.04,  cat:'actinide',   period:7, group:null, phase:'Solid',  config:'[Rn] 6d²7s²',               en:1.30, mp:1750,   bp:4788,   density:11.72},
  {n:91, sym:'Pa', name:'Protactinium',  mass:231.04,  cat:'actinide',   period:7, group:null, phase:'Solid',  config:'[Rn] 5f²6d¹7s²',            en:1.50, mp:1572,   bp:4000,   density:15.37},
  {n:92, sym:'U',  name:'Uranium',       mass:238.03,  cat:'actinide',   period:7, group:null, phase:'Solid',  config:'[Rn] 5f³6d¹7s²',            en:1.38, mp:1132.2, bp:4131,   density:19.05},
  {n:93, sym:'Np', name:'Neptunium',     mass:237,     cat:'actinide',   period:7, group:null, phase:'Solid',  config:'[Rn] 5f⁴6d¹7s²',            en:1.36, mp:644,    bp:4000,   density:20.45},
  {n:94, sym:'Pu', name:'Plutonium',     mass:244,     cat:'actinide',   period:7, group:null, phase:'Solid',  config:'[Rn] 5f⁶7s²',               en:1.28, mp:639.4,  bp:3228,   density:19.84},
  {n:95, sym:'Am', name:'Americium',     mass:243,     cat:'actinide',   period:7, group:null, phase:'Solid',  config:'[Rn] 5f⁷7s²',               en:1.30, mp:1176,   bp:2607,   density:12},
  {n:96, sym:'Cm', name:'Curium',        mass:247,     cat:'actinide',   period:7, group:null, phase:'Solid',  config:'[Rn] 5f⁷6d¹7s²',            en:1.30, mp:1340,   bp:3110,   density:13.51},
  {n:97, sym:'Bk', name:'Berkelium',     mass:247,     cat:'actinide',   period:7, group:null, phase:'Solid',  config:'[Rn] 5f⁹7s²',               en:1.30, mp:986,    bp:2627,   density:14.78},
  {n:98, sym:'Cf', name:'Californium',   mass:251,     cat:'actinide',   period:7, group:null, phase:'Solid',  config:'[Rn] 5f¹⁰7s²',              en:1.30, mp:900,    bp:1470,   density:15.1},
  {n:99, sym:'Es', name:'Einsteinium',   mass:252,     cat:'actinide',   period:7, group:null, phase:'Solid',  config:'[Rn] 5f¹¹7s²',              en:1.30, mp:860,    bp:996,    density:8.84},
  {n:100,sym:'Fm', name:'Fermium',       mass:257,     cat:'actinide',   period:7, group:null, phase:'Solid',  config:'[Rn] 5f¹²7s²',              en:1.30, mp:1527,   bp:null,   density:null},
  {n:101,sym:'Md', name:'Mendelevium',   mass:258,     cat:'actinide',   period:7, group:null, phase:'Solid',  config:'[Rn] 5f¹³7s²',              en:1.30, mp:827,    bp:null,   density:null},
  {n:102,sym:'No', name:'Nobelium',      mass:259,     cat:'actinide',   period:7, group:null, phase:'Solid',  config:'[Rn] 5f¹⁴7s²',              en:1.30, mp:827,    bp:null,   density:null},
  {n:103,sym:'Lr', name:'Lawrencium',    mass:266,     cat:'actinide',   period:7, group:3,    phase:'Solid',  config:'[Rn] 5f¹⁴7s²7p¹',           en:1.30, mp:1627,   bp:null,   density:null},
  {n:104,sym:'Rf', name:'Rutherfordium', mass:267,     cat:'transition', period:7, group:4,    phase:'Solid',  config:'[Rn] 5f¹⁴6d²7s²',           en:null, mp:2100,   bp:5500,   density:23.2},
  {n:105,sym:'Db', name:'Dubnium',       mass:268,     cat:'transition', period:7, group:5,    phase:'Solid',  config:'[Rn] 5f¹⁴6d³7s²',           en:null, mp:null,   bp:null,   density:29.3},
  {n:106,sym:'Sg', name:'Seaborgium',    mass:269,     cat:'transition', period:7, group:6,    phase:'Solid',  config:'[Rn] 5f¹⁴6d⁴7s²',           en:null, mp:null,   bp:null,   density:35},
  {n:107,sym:'Bh', name:'Bohrium',       mass:270,     cat:'transition', period:7, group:7,    phase:'Solid',  config:'[Rn] 5f¹⁴6d⁵7s²',           en:null, mp:null,   bp:null,   density:37.1},
  {n:108,sym:'Hs', name:'Hassium',       mass:277,     cat:'transition', period:7, group:8,    phase:'Solid',  config:'[Rn] 5f¹⁴6d⁶7s²',           en:null, mp:null,   bp:null,   density:40.7},
  {n:109,sym:'Mt', name:'Meitnerium',    mass:278,     cat:'transition', period:7, group:9,    phase:'Solid',  config:'[Rn] 5f¹⁴6d⁷7s²',           en:null, mp:null,   bp:null,   density:37.4},
  {n:110,sym:'Ds', name:'Darmstadtium',  mass:281,     cat:'transition', period:7, group:10,   phase:'Solid',  config:'[Rn] 5f¹⁴6d⁸7s²',           en:null, mp:null,   bp:null,   density:34.8},
  {n:111,sym:'Rg', name:'Roentgenium',   mass:282,     cat:'transition', period:7, group:11,   phase:'Solid',  config:'[Rn] 5f¹⁴6d⁹7s²',           en:null, mp:null,   bp:null,   density:28.7},
  {n:112,sym:'Cn', name:'Copernicium',   mass:285,     cat:'transition', period:7, group:12,   phase:'Gas',    config:'[Rn] 5f¹⁴6d¹⁰7s²',          en:null, mp:null,   bp:null,   density:23.7},
  {n:113,sym:'Nh', name:'Nihonium',      mass:286,     cat:'post',       period:7, group:13,   phase:'Solid',  config:'[Rn] 5f¹⁴6d¹⁰7s²7p¹',       en:null, mp:null,   bp:null,   density:null},
  {n:114,sym:'Fl', name:'Flerovium',     mass:289,     cat:'post',       period:7, group:14,   phase:'Solid',  config:'[Rn] 5f¹⁴6d¹⁰7s²7p²',       en:null, mp:null,   bp:null,   density:null},
  {n:115,sym:'Mc', name:'Moscovium',     mass:290,     cat:'post',       period:7, group:15,   phase:'Solid',  config:'[Rn] 5f¹⁴6d¹⁰7s²7p³',       en:null, mp:null,   bp:null,   density:null},
  {n:116,sym:'Lv', name:'Livermorium',   mass:293,     cat:'post',       period:7, group:16,   phase:'Solid',  config:'[Rn] 5f¹⁴6d¹⁰7s²7p⁴',       en:null, mp:null,   bp:null,   density:null},
  {n:117,sym:'Ts', name:'Tennessine',    mass:294,     cat:'halogen',    period:7, group:17,   phase:'Solid',  config:'[Rn] 5f¹⁴6d¹⁰7s²7p⁵',       en:null, mp:null,   bp:null,   density:null},
  {n:118,sym:'Og', name:'Oganesson',     mass:294,     cat:'noble',      period:7, group:18,   phase:'Gas',    config:'[Rn] 5f¹⁴6d¹⁰7s²7p⁶',       en:null, mp:null,   bp:null,   density:null},
];

export const elementsByNumber: Record<number, Element> =
  Object.fromEntries(elements.map(e => [e.n, e]));

export const elementsBySymbol: Record<string, Element> =
  Object.fromEntries(elements.map(e => [e.sym, e]));

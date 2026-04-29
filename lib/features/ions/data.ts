import type { IonRecord, IonSection } from './types';

export const ION_SECTION_LABELS: Record<IonSection, string> = {
  basic: 'Basic monatomic',
  core: 'Core polyatomic',
  trans: 'Transition metals',
  special: 'Special and organic',
};

export const ionsData: IonRecord[] = [
  { id: 'h_plus', formula: 'H+', name: 'Hydron', type: 'Cation', category: 'Monatomic', section: 'basic', group: 'basic_cat1', mass: 1.008 },
  { id: 'li_plus', formula: 'Li+', name: 'Lithium ion', type: 'Cation', category: 'Monatomic', section: 'basic', group: 'basic_cat1', mass: 6.941 },
  { id: 'na_plus', formula: 'Na+', name: 'Sodium ion', type: 'Cation', category: 'Monatomic', section: 'basic', group: 'basic_cat1', mass: 22.99 },
  { id: 'k_plus', formula: 'K+', name: 'Potassium ion', type: 'Cation', category: 'Monatomic', section: 'basic', group: 'basic_cat1', mass: 39.1 },
  { id: 'mg_2plus', formula: 'Mg2+', name: 'Magnesium ion', type: 'Cation', category: 'Monatomic', section: 'basic', group: 'basic_cat2', mass: 24.31 },
  { id: 'ca_2plus', formula: 'Ca2+', name: 'Calcium ion', type: 'Cation', category: 'Monatomic', section: 'basic', group: 'basic_cat2', mass: 40.08 },
  { id: 'ag_plus', formula: 'Ag+', name: 'Silver ion', type: 'Cation', category: 'Monatomic', section: 'trans', group: 'trans_ag', mass: 107.87 },
  { id: 'fe_2plus', formula: 'Fe2+', name: 'Iron(II)', type: 'Cation', category: 'Monatomic', section: 'trans', group: 'trans_fe', mass: 55.85 },
  { id: 'fe_3plus', formula: 'Fe3+', name: 'Iron(III)', type: 'Cation', category: 'Monatomic', section: 'trans', group: 'trans_fe', mass: 55.85 },
  { id: 'cu_2plus', formula: 'Cu2+', name: 'Copper(II)', type: 'Cation', category: 'Monatomic', section: 'trans', group: 'trans_cu', mass: 63.55 },
  { id: 'nh4_plus', formula: 'NH4+', name: 'Ammonium', type: 'Cation', category: 'Polyatomic', section: 'core', group: 'core_n', mass: 18.04 },
  { id: 'f_minus', formula: 'F-', name: 'Fluoride', type: 'Anion', category: 'Monatomic', section: 'basic', group: 'basic_an1', mass: 19 },
  { id: 'cl_minus', formula: 'Cl-', name: 'Chloride', type: 'Anion', category: 'Monatomic', section: 'basic', group: 'basic_an1', mass: 35.45 },
  { id: 'br_minus', formula: 'Br-', name: 'Bromide', type: 'Anion', category: 'Monatomic', section: 'basic', group: 'basic_an1', mass: 79.9 },
  { id: 'i_minus', formula: 'I-', name: 'Iodide', type: 'Anion', category: 'Monatomic', section: 'basic', group: 'basic_an1', mass: 126.9 },
  { id: 'oh_minus', formula: 'OH-', name: 'Hydroxide', type: 'Anion', category: 'Polyatomic', section: 'core', group: 'core_o', mass: 17.01 },
  { id: 'no3_minus', formula: 'NO3-', name: 'Nitrate', type: 'Anion', category: 'Polyatomic', section: 'core', group: 'core_n', mass: 62 },
  { id: 'no2_minus', formula: 'NO2-', name: 'Nitrite', type: 'Anion', category: 'Polyatomic', section: 'core', group: 'core_n', mass: 46.01 },
  { id: 'so4_2minus', formula: 'SO4^2-', name: 'Sulfate', type: 'Anion', category: 'Polyatomic', section: 'core', group: 'core_s', mass: 96.06 },
  { id: 'so3_2minus', formula: 'SO3^2-', name: 'Sulfite', type: 'Anion', category: 'Polyatomic', section: 'core', group: 'core_s', mass: 80.06 },
  { id: 'co3_2minus', formula: 'CO3^2-', name: 'Carbonate', type: 'Anion', category: 'Polyatomic', section: 'core', group: 'core_c', mass: 60.01 },
  { id: 'hco3_minus', formula: 'HCO3-', name: 'Bicarbonate', type: 'Anion', category: 'Polyatomic', section: 'core', group: 'core_c', mass: 61.02 },
  { id: 'po4_3minus', formula: 'PO4^3-', name: 'Phosphate', type: 'Anion', category: 'Polyatomic', section: 'core', group: 'core_p', mass: 94.97 },
  { id: 'ch3coo_minus', formula: 'CH3COO-', name: 'Acetate', type: 'Anion', category: 'Polyatomic', section: 'special', group: 'spec_org', mass: 59.04 },
  { id: 'mno4_minus', formula: 'MnO4-', name: 'Permanganate', type: 'Anion', category: 'Polyatomic', section: 'special', group: 'spec_pair', mass: 118.94 },
  { id: 'cr2o7_2minus', formula: 'Cr2O7^2-', name: 'Dichromate', type: 'Anion', category: 'Polyatomic', section: 'special', group: 'spec_pair', mass: 216 },
];

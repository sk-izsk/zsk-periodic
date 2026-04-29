/**
 * Stable (and long-lived primordial) isotope mass numbers for each element.
 * Neutron count = massNumber - atomicNumber
 * Elements with no stable isotopes (Tc=43, Pm=61, Po-Og=84-118) are omitted.
 */
export const STABLE_MASS_NUMBERS: Record<number, number[]> = {
  1: [1, 2],
  2: [3, 4],
  3: [6, 7],
  4: [9],
  5: [10, 11],
  6: [12, 13],
  7: [14, 15],
  8: [16, 17, 18],
  9: [19],
  10: [20, 21, 22],
  11: [23],
  12: [24, 25, 26],
  13: [27],
  14: [28, 29, 30],
  15: [31],
  16: [32, 33, 34, 36],
  17: [35, 37],
  18: [36, 38, 40],
  19: [39, 41],
  20: [40, 42, 43, 44, 46, 48],
  21: [45],
  22: [46, 47, 48, 49, 50],
  23: [50, 51],
  24: [50, 52, 53, 54],
  25: [55],
  26: [54, 56, 57, 58],
  27: [59],
  28: [58, 60, 61, 62, 64],
  29: [63, 65],
  30: [64, 66, 67, 68, 70],
  31: [69, 71],
  32: [70, 72, 73, 74, 76],
  33: [75],
  34: [74, 76, 77, 78, 80, 82],
  35: [79, 81],
  36: [78, 80, 82, 83, 84, 86],
  37: [85, 87],
  38: [84, 86, 87, 88],
  39: [89],
  40: [90, 91, 92, 94, 96],
  41: [93],
  42: [92, 94, 95, 96, 97, 98, 100],
  43: [], // Tc — no stable isotopes
  44: [96, 98, 99, 100, 101, 102, 104],
  45: [103],
  46: [102, 104, 105, 106, 108, 110],
  47: [107, 109],
  48: [106, 108, 110, 111, 112, 113, 114, 116],
  49: [113, 115],
  50: [112, 114, 115, 116, 117, 118, 119, 120, 122, 124],
  51: [121, 123],
  52: [120, 122, 123, 124, 125, 126, 128, 130],
  53: [127],
  54: [124, 126, 128, 129, 130, 131, 132, 134, 136],
  55: [133],
  56: [130, 132, 134, 135, 136, 137, 138],
  57: [138, 139],
  58: [136, 138, 140, 142],
  59: [141],
  60: [142, 143, 144, 145, 146, 148, 150],
  61: [], // Pm — no stable isotopes
  62: [144, 147, 148, 149, 150, 152, 154],
  63: [151, 153],
  64: [152, 154, 155, 156, 157, 158, 160],
  65: [159],
  66: [156, 158, 160, 161, 162, 163, 164],
  67: [165],
  68: [162, 164, 166, 167, 168, 170],
  69: [169],
  70: [168, 170, 171, 172, 173, 174, 176],
  71: [175, 176],
  72: [174, 176, 177, 178, 179, 180],
  73: [180, 181],
  74: [180, 182, 183, 184, 186],
  75: [185, 187],
  76: [184, 186, 187, 188, 189, 190, 192],
  77: [191, 193],
  78: [190, 192, 194, 195, 196, 198],
  79: [197],
  80: [196, 198, 199, 200, 201, 202, 204],
  81: [203, 205],
  82: [204, 206, 207, 208],
  // 83–118: all radioactive — no stable isotopes
}

/**
 * Key radioactive isotope mass numbers used when stable isotopes do not exist.
 * Includes naturally occurring, long-lived, or most representative isotopes.
 */
export const KEY_RADIOACTIVE_MASS_NUMBERS: Record<number, number[]> = {
  43: [97, 99],
  61: [145, 147],
  83: [209],
  84: [209, 210],
  85: [210, 211],
  86: [220, 222],
  87: [223],
  88: [226],
  89: [227],
  90: [230, 232],
  91: [231],
  92: [235, 238],
  93: [237],
  94: [239, 244],
  95: [241, 243],
  96: [247],
  97: [247],
  98: [251],
  99: [252],
  100: [257],
  101: [258],
  102: [259],
  103: [262],
  104: [267],
  105: [268],
  106: [269],
  107: [270],
  108: [277],
  109: [278],
  110: [281],
  111: [282],
  112: [285],
  113: [286],
  114: [289],
  115: [290],
  116: [293],
  117: [294],
  118: [294],
}

/**
 * Notable radioactive isotopes for elements that also have stable isotopes.
 * These are appended to the stable list so they appear in the modal.
 */
export const NOTABLE_RADIOACTIVE_MASS_NUMBERS: Record<number, number[]> = {
  6: [14], // Carbon-14 — radiocarbon dating
  19: [40], // Potassium-40 — natural radioactivity
  37: [87], // Rubidium-87
}

/**
 * Human-readable notes for specific isotopes, keyed by "Symbol-massNumber".
 */
export const ISOTOPE_NOTES: Record<string, string> = {
  'C-14': 'Carbon-14 is radioactive and well known for radiocarbon dating.',
  'K-40': 'Potassium-40 is naturally radioactive and used in radiometric dating.',
  'Rb-87': 'Rubidium-87 is long-lived and used in rubidium-strontium dating.',
}

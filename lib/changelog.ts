export type ChangelogEntry = {
  version: string;
  date: string;
  changes: string[];
};

export const changelogData: ChangelogEntry[] = [
  {
    version: '1.0.0',
    date: '2026-02-07',
    changes: [
      'Official v1.0 release',
      '118 elements with complete chemistry data',
      'Interactive 3D atom models and ion engine',
      'Chemistry tools and worksheet generator',
    ],
  },
  {
    version: '0.5.0',
    date: '2026-01-14',
    changes: [
      'Ions table quick access improvements',
      'UI consistency updates across pages',
      'Expanded README documentation',
    ],
  },
];

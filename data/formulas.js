export const formulaSections = [
  {
    id: 'bangun-datar',
    title: 'Bangun Datar',
    description: 'Rumus luas dan keliling untuk bentuk 2 dimensi.',
    theme: {
      primary: '#2563eb',
      soft: '#e8f0ff',
    },
    items: [
      {
        id: 'persegi',
        name: 'Persegi',
        tagline: 'Empat sisi sama panjang dan empat sudut siku-siku.',
        formulas: [
          { label: 'Luas', value: 's x s' },
          { label: 'Keliling', value: '4 x s' },
        ],
        variables: ['s = sisi'],
      },
      {
        id: 'persegi-panjang',
        name: 'Persegi Panjang',
        tagline: 'Dua pasang sisi berhadapan sama panjang.',
        formulas: [
          { label: 'Luas', value: 'p x l' },
          { label: 'Keliling', value: '2 x (p + l)' },
        ],
        variables: ['p = panjang', 'l = lebar'],
      },
      {
        id: 'segitiga',
        name: 'Segitiga',
        tagline: 'Memiliki tiga sisi dan tiga titik sudut.',
        formulas: [
          { label: 'Luas', value: '1/2 x a x t' },
          { label: 'Keliling', value: 's1 + s2 + s3' },
        ],
        variables: ['a = alas', 't = tinggi'],
      },
      {
        id: 'lingkaran',
        name: 'Lingkaran',
        tagline: 'Semua titik pada garis tepi berjarak sama dari pusat.',
        formulas: [
          { label: 'Luas', value: 'π x r x r' },
          { label: 'Keliling', value: '2 x π x r' },
        ],
        variables: ['r = jari-jari', 'π = 22/7 atau 3,14'],
      },
      {
        id: 'jajar-genjang',
        name: 'Jajar Genjang',
        tagline: 'Sisi berhadapan sejajar dan sama panjang.',
        formulas: [
          { label: 'Luas', value: 'a x t' },
          { label: 'Keliling', value: '2 x (a + b)' },
        ],
        variables: ['a = alas', 't = tinggi', 'b = sisi miring'],
      },
      {
        id: 'trapesium',
        name: 'Trapesium',
        tagline: 'Memiliki sepasang sisi sejajar.',
        formulas: [
          { label: 'Luas', value: '1/2 x (a + b) x t' },
          { label: 'Keliling', value: 'jumlah semua sisi' },
        ],
        variables: ['a dan b = sisi sejajar', 't = tinggi'],
      },
      {
        id: 'belah-ketupat',
        name: 'Belah Ketupat',
        tagline: 'Semua sisi sama panjang, sudut berhadapan sama besar.',
        formulas: [
          { label: 'Luas', value: '1/2 x d1 x d2' },
          { label: 'Keliling', value: '4 x s' },
        ],
        variables: ['d1 dan d2 = diagonal', 's = sisi'],
      },
      {
        id: 'layang-layang',
        name: 'Layang-Layang',
        tagline: 'Dua pasang sisi berdekatan sama panjang.',
        formulas: [
          { label: 'Luas', value: '1/2 x d1 x d2' },
          { label: 'Keliling', value: '2 x (a + b)' },
        ],
        variables: ['d1 dan d2 = diagonal', 'a dan b = pasangan sisi'],
      },
      {
        id: 'segi-lima',
        name: 'Segi Lima Beraturan',
        tagline: 'Memiliki 5 sisi sama panjang dan 5 sudut sama besar.',
        formulas: [
          { label: 'Luas', value: '1/2 x ap x K (atau (1/4) x √(5(5 + 2√5)) x s x s)' },
          { label: 'Keliling', value: '5 x s' },
        ],
        variables: [
          's = sisi',
          'K = keliling',
          'ap = apotema',
          'apotema = jarak tegak lurus dari pusat ke sisi',
        ],
      },
      {
        id: 'segi-enam',
        name: 'Segi Enam Beraturan',
        tagline: 'Memiliki 6 sisi sama panjang dan 6 sudut sama besar.',
        formulas: [
          { label: 'Luas', value: '1/2 x ap x K (atau (3√3/2) x s x s)' },
          { label: 'Keliling', value: '6 x s' },
        ],
        variables: [
          's = sisi',
          'K = keliling',
          'ap = apotema',
          'apotema = jarak tegak lurus dari pusat ke sisi',
        ],
      },
      {
        id: 'segi-n',
        name: 'Segi-n Beraturan',
        tagline: 'Memiliki n sisi sama panjang dan n sudut sama besar.',
        formulas: [
          { label: 'Luas', value: '1/2 x ap x K (atau (n x s x s) / (4 x tan(π/n)))' },
          { label: 'Keliling', value: 'n x s' },
        ],
        variables: [
          'n = jumlah sisi',
          's = sisi',
          'K = keliling',
          'ap = apotema',
          'apotema = jarak tegak lurus dari pusat ke sisi',
        ],
      },
    ],
  },
  {
    id: 'bangun-ruang',
    title: 'Bangun Ruang',
    description: 'Rumus volume dan luas permukaan untuk bentuk 3 dimensi.',
    theme: {
      primary: '#0f766e',
      soft: '#e8fbf8',
    },
    items: [
      {
        id: 'kubus',
        name: 'Kubus',
        tagline: 'Memiliki 6 sisi berbentuk persegi yang sama besar.',
        formulas: [
          { label: 'Volume', value: 's x s x s' },
          { label: 'Luas Permukaan', value: '6 x s x s' },
        ],
        variables: ['s = sisi'],
      },
      {
        id: 'balok',
        name: 'Balok',
        tagline: 'Memiliki 3 pasang sisi berbentuk persegi panjang.',
        formulas: [
          { label: 'Volume', value: 'p x l x t' },
          { label: 'Luas Permukaan', value: '2 x (pl + pt + lt)' },
        ],
        variables: ['p = panjang', 'l = lebar', 't = tinggi'],
      },
      {
        id: 'prisma-segitiga',
        name: 'Prisma Segitiga',
        tagline: 'Memiliki alas dan atap segitiga yang kongruen.',
        formulas: [
          { label: 'Volume', value: 'L<sub>alas</sub> x tp' },
          { label: 'Luas Permukaan', value: '(2 x L<sub>alas</sub>) + (K<sub>alas</sub> x tp)' },
        ],
        variables: [
          'L<sub>alas</sub> = luas alas segitiga',
          'K<sub>alas</sub> = keliling alas segitiga',
          'tp = tinggi prisma',
          'L<sub>alas</sub> = 1/2 x a x t',
        ],
      },
      {
        id: 'limas-segiempat',
        name: 'Limas Segiempat',
        tagline: 'Memiliki alas segiempat dan sisi tegak bertemu di puncak.',
        formulas: [
          { label: 'Volume', value: '1/3 x L<sub>alas</sub> x t' },
          { label: 'Luas Permukaan', value: 'L<sub>alas</sub> + (1/2 x K<sub>alas</sub> x ts)' },
        ],
        variables: [
          'L<sub>alas</sub> = luas alas',
          'K<sub>alas</sub> = keliling alas',
          'ts = tinggi sisi tegak (apotema)',
          't = tinggi limas',
        ],
      },
      {
        id: 'tabung',
        name: 'Tabung',
        tagline: 'Bangun ruang dengan alas dan tutup lingkaran.',
        formulas: [
          { label: 'Volume', value: 'π x r x r x t' },
          { label: 'Luas Permukaan', value: '2 x π x r x (r + t)' },
        ],
        variables: ['r = jari-jari', 't = tinggi'],
      },
      {
        id: 'kerucut',
        name: 'Kerucut',
        tagline: 'Alas lingkaran dengan satu titik puncak.',
        formulas: [
          { label: 'Volume', value: '1/3 x π x r x r x t' },
          { label: 'Luas Permukaan', value: 'π x r x (r + s)' },
        ],
        variables: ['r = jari-jari', 't = tinggi', 's = garis pelukis'],
      },
      {
        id: 'bola',
        name: 'Bola',
        tagline: 'Semua titik pada permukaan berjarak sama dari pusat.',
        formulas: [
          { label: 'Volume', value: '4/3 x π x r x r x r' },
          { label: 'Luas Permukaan', value: '4 x π x r x r' },
        ],
        variables: ['r = jari-jari'],
      },
    ],
  },
];

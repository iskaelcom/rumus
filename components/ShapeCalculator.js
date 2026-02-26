import { useEffect, useMemo, useState } from 'react';
import { Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import renderSubscriptText from './renderSubscriptText';

const PI = Math.PI;
const LENGTH_TO_METER = {
  km: 1000,
  hm: 100,
  dam: 10,
  m: 1,
  dm: 0.1,
  cm: 0.01,
  mm: 0.001,
};
const LENGTH_KEYS = Object.keys(LENGTH_TO_METER);

const FONT_UI = Platform.select({
  web: 'Geist',
  ios: 'System',
  android: 'sans-serif',
  default: 'sans-serif',
});

const CALCULATOR_FIELDS = {
  persegi: [
    { key: 's', label: 's (sisi)' },
    { key: 'luas', label: 'Luas (L)' },
    { key: 'kel', label: 'Keliling (Kel)' },
  ],
  'persegi-panjang': [
    { key: 'p', label: 'p (panjang)' },
    { key: 'l', label: 'l (lebar)' },
    { key: 'luas', label: 'Luas (L)' },
    { key: 'kel', label: 'Keliling (Kel)' },
  ],
  segitiga: [
    { key: 'a', label: 'a (alas)' },
    { key: 't', label: 't (tinggi)' },
    { key: 's1', label: 's1' },
    { key: 's2', label: 's2' },
    { key: 's3', label: 's3' },
    { key: 'luas', label: 'Luas (L)' },
    { key: 'kel', label: 'Keliling (Kel)' },
  ],
  lingkaran: [
    { key: 'r', label: 'r (jari-jari)' },
    { key: 'd', label: 'd (diameter)' },
    { key: 'luas', label: 'Luas (L)' },
    { key: 'kel', label: 'Keliling (K)' },
  ],
  'jajar-genjang': [
    { key: 'a', label: 'a (alas)' },
    { key: 't', label: 't (tinggi)' },
    { key: 'b', label: 'b (sisi miring)' },
    { key: 'luas', label: 'Luas (L)' },
    { key: 'kel', label: 'Keliling (K)' },
  ],
  trapesium: [
    { key: 'a', label: 'a (sejajar 1)' },
    { key: 'b', label: 'b (sejajar 2)' },
    { key: 't', label: 't (tinggi)' },
    { key: 'c', label: 'c (sisi 1)' },
    { key: 'd', label: 'd (sisi 2)' },
    { key: 'luas', label: 'Luas (L)' },
    { key: 'kel', label: 'Keliling (K)' },
  ],
  'belah-ketupat': [
    { key: 'd1', label: 'd1' },
    { key: 'd2', label: 'd2' },
    { key: 's', label: 's (sisi)' },
    { key: 'luas', label: 'Luas (L)' },
    { key: 'kel', label: 'Keliling (K)' },
  ],
  'layang-layang': [
    { key: 'd1', label: 'd1' },
    { key: 'd2', label: 'd2' },
    { key: 'a', label: 'a' },
    { key: 'b', label: 'b' },
    { key: 'luas', label: 'Luas (L)' },
    { key: 'kel', label: 'Keliling (K)' },
  ],
  'segi-lima': [
    { key: 's', label: 's (sisi)' },
    { key: 'ap', label: 'ap (apotema)' },
    { key: 'kel', label: 'Keliling (K)' },
    { key: 'luas', label: 'Luas (L)' },
  ],
  'segi-enam': [
    { key: 's', label: 's (sisi)' },
    { key: 'ap', label: 'ap (apotema)' },
    { key: 'kel', label: 'Keliling (K)' },
    { key: 'luas', label: 'Luas (L)' },
  ],
  'segi-n': [
    { key: 'n', label: 'n (jumlah sisi)' },
    { key: 's', label: 's (sisi)' },
    { key: 'ap', label: 'ap (apotema)' },
    { key: 'kel', label: 'Keliling (K)' },
    { key: 'luas', label: 'Luas (L)' },
  ],
  pythagoras: [
    { key: 'a', label: 'a (sisi siku-siku)' },
    { key: 'b', label: 'b (sisi siku-siku)' },
    { key: 'c', label: 'c (sisi miring)' },
  ],
  'kecepatan-jarak-waktu': [
    { key: 'v', label: 'v (kecepatan)' },
    { key: 's', label: 's (jarak)' },
    { key: 't', label: 't (waktu)' },
  ],
  persen: [
    { key: 'bagian', label: 'Bagian' },
    { key: 'total', label: 'Total' },
    { key: 'persen', label: 'Persentase (%)' },
  ],
  'rata-rata': [
    { key: 'jumlah', label: 'Jumlah' },
    { key: 'n', label: 'Banyak data (n)' },
    { key: 'rata', label: 'Rata-rata' },
  ],
  skala: [
    { key: 'skala', label: 'Skala' },
    { key: 'jarakPeta', label: 'Jarak peta' },
    { key: 'jarakSebenarnya', label: 'Jarak sebenarnya' },
  ],
  'fpb-kpk': [
    { key: 'a', label: 'a' },
    { key: 'b', label: 'b' },
    { key: 'fpb', label: 'FPB' },
    { key: 'kpk', label: 'KPK' },
  ],
  pecahan: [
    { key: 'pembilang', label: 'Pembilang' },
    { key: 'penyebut', label: 'Penyebut' },
    { key: 'desimal', label: 'Desimal' },
    { key: 'persen', label: 'Persen (%)' },
  ],
  'konversi-satuan': [
    { key: 'km', label: 'km' },
    { key: 'hm', label: 'hm' },
    { key: 'dam', label: 'dam' },
    { key: 'm', label: 'm' },
    { key: 'dm', label: 'dm' },
    { key: 'cm', label: 'cm' },
    { key: 'mm', label: 'mm' },
  ],
  debit: [
    { key: 'debit', label: 'Debit' },
    { key: 'volume', label: 'Volume' },
    { key: 'waktu', label: 'Waktu' },
  ],
  kubus: [
    { key: 's', label: 's (sisi)' },
    { key: 'volume', label: 'Volume (V)' },
    { key: 'luas', label: 'Luas Permukaan (LP)' },
  ],
  balok: [
    { key: 'p', label: 'p (panjang)' },
    { key: 'l', label: 'l (lebar)' },
    { key: 't', label: 't (tinggi)' },
    { key: 'volume', label: 'Volume (V)' },
    { key: 'luas', label: 'Luas Permukaan (LP)' },
  ],
  'prisma-segitiga': [
    { key: 'luasAlas', label: 'L<sub>alas</sub>' },
    { key: 'kelAlas', label: 'K<sub>alas</sub>' },
    { key: 'tp', label: 'Tinggi prisma' },
    { key: 'volume', label: 'Volume (V)' },
    { key: 'luas', label: 'Luas Permukaan (LP)' },
  ],
  'limas-segiempat': [
    { key: 'luasAlas', label: 'L<sub>alas</sub>' },
    { key: 'kelAlas', label: 'K<sub>alas</sub>' },
    { key: 'ts', label: 'Tinggi sisi tegak' },
    { key: 't', label: 'Tinggi' },
    { key: 'volume', label: 'Volume (V)' },
    { key: 'luas', label: 'Luas Permukaan (LP)' },
  ],
  tabung: [
    { key: 'r', label: 'r (jari-jari)' },
    { key: 't', label: 't (tinggi)' },
    { key: 'volume', label: 'Volume (V)' },
    { key: 'luas', label: 'Luas Permukaan (LP)' },
  ],
  kerucut: [
    { key: 'r', label: 'r (jari-jari)' },
    { key: 't', label: 't (tinggi)' },
    { key: 's', label: 's (garis pelukis)' },
    { key: 'volume', label: 'Volume (V)' },
    { key: 'luas', label: 'Luas Permukaan (LP)' },
  ],
  bola: [
    { key: 'r', label: 'r (jari-jari)' },
    { key: 'd', label: 'd (diameter)' },
    { key: 'volume', label: 'Volume (V)' },
    { key: 'luas', label: 'Luas Permukaan (LP)' },
  ],
};

const formatNumber = (value) => {
  if (!Number.isFinite(value)) {
    return '';
  }
  const rounded = Math.round(value * 10000) / 10000;
  if (Number.isInteger(rounded)) {
    return String(rounded);
  }
  return String(rounded).replace(/\.?0+$/, '');
};

const parseNumber = (value) => {
  if (!value) {
    return null;
  }
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return null;
  }
  return parsed;
};

const cleanInput = (text) => {
  const normalized = text.replace(',', '.').replace(/[^0-9.]/g, '');
  const firstDot = normalized.indexOf('.');
  if (firstDot === -1) {
    return normalized;
  }
  return `${normalized.slice(0, firstDot + 1)}${normalized.slice(firstDot + 1).replace(/\./g, '')}`;
};

const gcdInt = (a, b) => {
  let x = Math.abs(Math.trunc(a));
  let y = Math.abs(Math.trunc(b));
  while (y !== 0) {
    const temp = y;
    y = x % y;
    x = temp;
  }
  return x;
};

const lcmInt = (a, b) => {
  const x = Math.abs(Math.trunc(a));
  const y = Math.abs(Math.trunc(b));
  if (x === 0 || y === 0) {
    return 0;
  }
  return (x / gcdInt(x, y)) * y;
};

const solveRegularPolygon = (values, set, n) => {
  if (!Number.isFinite(n) || !Number.isInteger(n) || n <= 2) {
    return;
  }

  if (Number.isFinite(values.s)) {
    set('kel', n * values.s);
    set('ap', values.s / (2 * Math.tan(Math.PI / n)));
    set('luas', (n * values.s * values.s) / (4 * Math.tan(Math.PI / n)));
  }

  if (Number.isFinite(values.kel)) {
    set('s', values.kel / n);
  }

  if (Number.isFinite(values.ap)) {
    set('s', 2 * values.ap * Math.tan(Math.PI / n));
  }

  if (Number.isFinite(values.ap) && Number.isFinite(values.kel)) {
    set('luas', 0.5 * values.ap * values.kel);
  }

  if (Number.isFinite(values.luas) && Number.isFinite(values.ap) && values.ap > 0) {
    set('kel', (2 * values.luas) / values.ap);
  }

  if (Number.isFinite(values.luas) && Number.isFinite(values.kel) && values.kel > 0) {
    set('ap', (2 * values.luas) / values.kel);
  }
};

const solveShapeValues = (shapeId, seedValues, preferredKey = null) => {
  const values = { ...seedValues };
  const has = (key) => Number.isFinite(values[key]);
  const setFactory = (flagRef) => (key, value) => {
    if (has(key)) {
      return;
    }
    if (!Number.isFinite(value) || value < 0) {
      return;
    }
    values[key] = value;
    flagRef.changed = true;
  };

  for (let i = 0; i < 12; i += 1) {
    const flagRef = { changed: false };
    const set = setFactory(flagRef);

    switch (shapeId) {
      case 'persegi': {
        if (has('s')) {
          set('luas', values.s * values.s);
          set('kel', 4 * values.s);
        }
        if (has('luas')) {
          set('s', Math.sqrt(values.luas));
        }
        if (has('kel')) {
          set('s', values.kel / 4);
        }
        break;
      }
      case 'persegi-panjang': {
        if (has('p') && has('l')) {
          set('luas', values.p * values.l);
          set('kel', 2 * (values.p + values.l));
        }
        if (has('luas') && has('l') && values.l > 0) {
          set('p', values.luas / values.l);
        }
        if (has('luas') && has('p') && values.p > 0) {
          set('l', values.luas / values.p);
        }
        if (has('kel') && has('p')) {
          set('l', values.kel / 2 - values.p);
        }
        if (has('kel') && has('l')) {
          set('p', values.kel / 2 - values.l);
        }
        break;
      }
      case 'segitiga': {
        if (has('a') && has('t')) {
          set('luas', 0.5 * values.a * values.t);
        }
        if (has('luas') && has('a') && values.a > 0) {
          set('t', (2 * values.luas) / values.a);
        }
        if (has('luas') && has('t') && values.t > 0) {
          set('a', (2 * values.luas) / values.t);
        }
        if (has('s1') && has('s2') && has('s3')) {
          set('kel', values.s1 + values.s2 + values.s3);
        }
        if (has('kel') && has('s1') && has('s2')) {
          set('s3', values.kel - values.s1 - values.s2);
        }
        if (has('kel') && has('s1') && has('s3')) {
          set('s2', values.kel - values.s1 - values.s3);
        }
        if (has('kel') && has('s2') && has('s3')) {
          set('s1', values.kel - values.s2 - values.s3);
        }
        break;
      }
      case 'lingkaran': {
        if (has('r')) {
          set('d', 2 * values.r);
          set('luas', PI * values.r * values.r);
          set('kel', 2 * PI * values.r);
        }
        if (has('d')) {
          set('r', values.d / 2);
        }
        if (has('luas')) {
          set('r', Math.sqrt(values.luas / PI));
        }
        if (has('kel')) {
          set('r', values.kel / (2 * PI));
        }
        break;
      }
      case 'jajar-genjang': {
        if (has('a') && has('t')) {
          set('luas', values.a * values.t);
        }
        if (has('luas') && has('a') && values.a > 0) {
          set('t', values.luas / values.a);
        }
        if (has('luas') && has('t') && values.t > 0) {
          set('a', values.luas / values.t);
        }
        if (has('a') && has('b')) {
          set('kel', 2 * (values.a + values.b));
        }
        if (has('kel') && has('a')) {
          set('b', values.kel / 2 - values.a);
        }
        if (has('kel') && has('b')) {
          set('a', values.kel / 2 - values.b);
        }
        break;
      }
      case 'trapesium': {
        if (has('a') && has('b') && has('t')) {
          set('luas', 0.5 * (values.a + values.b) * values.t);
        }
        if (has('luas') && has('a') && has('b') && values.a + values.b > 0) {
          set('t', (2 * values.luas) / (values.a + values.b));
        }
        if (has('luas') && has('t') && has('a') && values.t > 0) {
          set('b', (2 * values.luas) / values.t - values.a);
        }
        if (has('luas') && has('t') && has('b') && values.t > 0) {
          set('a', (2 * values.luas) / values.t - values.b);
        }
        if (has('a') && has('b') && has('c') && has('d')) {
          set('kel', values.a + values.b + values.c + values.d);
        }
        if (has('kel') && has('a') && has('b') && has('c')) {
          set('d', values.kel - values.a - values.b - values.c);
        }
        if (has('kel') && has('a') && has('b') && has('d')) {
          set('c', values.kel - values.a - values.b - values.d);
        }
        if (has('kel') && has('a') && has('c') && has('d')) {
          set('b', values.kel - values.a - values.c - values.d);
        }
        if (has('kel') && has('b') && has('c') && has('d')) {
          set('a', values.kel - values.b - values.c - values.d);
        }
        break;
      }
      case 'belah-ketupat': {
        if (has('d1') && has('d2')) {
          set('luas', 0.5 * values.d1 * values.d2);
        }
        if (has('luas') && has('d1') && values.d1 > 0) {
          set('d2', (2 * values.luas) / values.d1);
        }
        if (has('luas') && has('d2') && values.d2 > 0) {
          set('d1', (2 * values.luas) / values.d2);
        }
        if (has('s')) {
          set('kel', 4 * values.s);
        }
        if (has('kel')) {
          set('s', values.kel / 4);
        }
        break;
      }
      case 'layang-layang': {
        if (has('d1') && has('d2')) {
          set('luas', 0.5 * values.d1 * values.d2);
        }
        if (has('luas') && has('d1') && values.d1 > 0) {
          set('d2', (2 * values.luas) / values.d1);
        }
        if (has('luas') && has('d2') && values.d2 > 0) {
          set('d1', (2 * values.luas) / values.d2);
        }
        if (has('a') && has('b')) {
          set('kel', 2 * (values.a + values.b));
        }
        if (has('kel') && has('a')) {
          set('b', values.kel / 2 - values.a);
        }
        if (has('kel') && has('b')) {
          set('a', values.kel / 2 - values.b);
        }
        break;
      }
      case 'segi-lima': {
        solveRegularPolygon(values, set, 5);
        break;
      }
      case 'segi-enam': {
        solveRegularPolygon(values, set, 6);
        break;
      }
      case 'segi-n': {
        if (has('n')) {
          solveRegularPolygon(values, set, values.n);
        }
        break;
      }
      case 'pythagoras': {
        if (has('a') && has('b')) {
          set('c', Math.sqrt(values.a * values.a + values.b * values.b));
        }
        if (has('c') && has('a') && values.c >= values.a) {
          set('b', Math.sqrt(values.c * values.c - values.a * values.a));
        }
        if (has('c') && has('b') && values.c >= values.b) {
          set('a', Math.sqrt(values.c * values.c - values.b * values.b));
        }
        break;
      }
      case 'kecepatan-jarak-waktu': {
        if (has('v') && has('t')) {
          set('s', values.v * values.t);
        }
        if (has('s') && has('t') && values.t > 0) {
          set('v', values.s / values.t);
        }
        if (has('s') && has('v') && values.v > 0) {
          set('t', values.s / values.v);
        }
        break;
      }
      case 'persen': {
        if (has('bagian') && has('total') && values.total > 0) {
          set('persen', (values.bagian / values.total) * 100);
        }
        if (has('persen') && has('total')) {
          set('bagian', (values.persen / 100) * values.total);
        }
        if (has('bagian') && has('persen') && values.persen > 0) {
          set('total', (values.bagian * 100) / values.persen);
        }
        break;
      }
      case 'rata-rata': {
        if (has('jumlah') && has('n') && values.n > 0) {
          set('rata', values.jumlah / values.n);
        }
        if (has('rata') && has('n')) {
          set('jumlah', values.rata * values.n);
        }
        if (has('jumlah') && has('rata') && values.rata > 0) {
          set('n', values.jumlah / values.rata);
        }
        break;
      }
      case 'skala': {
        if (has('jarakPeta') && has('jarakSebenarnya') && values.jarakSebenarnya > 0) {
          set('skala', values.jarakPeta / values.jarakSebenarnya);
        }
        if (has('skala') && has('jarakSebenarnya')) {
          set('jarakPeta', values.skala * values.jarakSebenarnya);
        }
        if (has('jarakPeta') && has('skala') && values.skala > 0) {
          set('jarakSebenarnya', values.jarakPeta / values.skala);
        }
        break;
      }
      case 'fpb-kpk': {
        if (has('a') && has('b') && Number.isInteger(values.a) && Number.isInteger(values.b) && values.a > 0 && values.b > 0) {
          set('fpb', gcdInt(values.a, values.b));
          set('kpk', lcmInt(values.a, values.b));
        }
        break;
      }
      case 'pecahan': {
        if (has('pembilang') && has('penyebut') && values.penyebut > 0) {
          set('desimal', values.pembilang / values.penyebut);
          set('persen', (values.pembilang / values.penyebut) * 100);
        }
        if (has('desimal')) {
          set('persen', values.desimal * 100);
        }
        if (has('persen')) {
          set('desimal', values.persen / 100);
        }
        if (has('desimal') && has('penyebut') && values.penyebut > 0) {
          set('pembilang', values.desimal * values.penyebut);
        }
        if (has('persen') && has('penyebut') && values.penyebut > 0) {
          set('pembilang', (values.persen / 100) * values.penyebut);
        }
        if (has('pembilang') && has('desimal') && values.desimal > 0) {
          set('penyebut', values.pembilang / values.desimal);
        }
        if (has('pembilang') && has('persen') && values.persen > 0) {
          set('penyebut', values.pembilang / (values.persen / 100));
        }
        break;
      }
      case 'konversi-satuan': {
        const sourceUnit =
          (preferredKey && LENGTH_KEYS.includes(preferredKey) && has(preferredKey) && preferredKey) ||
          LENGTH_KEYS.find((unitKey) => has(unitKey));
        if (sourceUnit) {
          const valueInMeter = values[sourceUnit] * LENGTH_TO_METER[sourceUnit];
          LENGTH_KEYS.forEach((unitKey) => {
            if (unitKey === sourceUnit) {
              return;
            }
            set(unitKey, valueInMeter / LENGTH_TO_METER[unitKey]);
          });
        }
        break;
      }
      case 'debit': {
        if (has('volume') && has('waktu') && values.waktu > 0) {
          set('debit', values.volume / values.waktu);
        }
        if (has('debit') && has('waktu')) {
          set('volume', values.debit * values.waktu);
        }
        if (has('volume') && has('debit') && values.debit > 0) {
          set('waktu', values.volume / values.debit);
        }
        break;
      }
      case 'kubus': {
        if (has('s')) {
          set('volume', values.s ** 3);
          set('luas', 6 * values.s ** 2);
        }
        if (has('volume')) {
          set('s', Math.cbrt(values.volume));
        }
        if (has('luas')) {
          set('s', Math.sqrt(values.luas / 6));
        }
        break;
      }
      case 'balok': {
        if (has('p') && has('l') && has('t')) {
          set('volume', values.p * values.l * values.t);
          set('luas', 2 * (values.p * values.l + values.p * values.t + values.l * values.t));
        }
        if (has('volume') && has('p') && has('l') && values.p * values.l > 0) {
          set('t', values.volume / (values.p * values.l));
        }
        if (has('volume') && has('p') && has('t') && values.p * values.t > 0) {
          set('l', values.volume / (values.p * values.t));
        }
        if (has('volume') && has('l') && has('t') && values.l * values.t > 0) {
          set('p', values.volume / (values.l * values.t));
        }
        if (has('luas') && has('p') && has('l') && values.p + values.l > 0) {
          set('t', (values.luas / 2 - values.p * values.l) / (values.p + values.l));
        }
        if (has('luas') && has('p') && has('t') && values.p + values.t > 0) {
          set('l', (values.luas / 2 - values.p * values.t) / (values.p + values.t));
        }
        if (has('luas') && has('l') && has('t') && values.l + values.t > 0) {
          set('p', (values.luas / 2 - values.l * values.t) / (values.l + values.t));
        }
        break;
      }
      case 'prisma-segitiga': {
        if (has('luasAlas') && has('tp')) {
          set('volume', values.luasAlas * values.tp);
        }
        if (has('luasAlas') && has('kelAlas') && has('tp')) {
          set('luas', 2 * values.luasAlas + values.kelAlas * values.tp);
        }
        if (has('volume') && has('luasAlas') && values.luasAlas > 0) {
          set('tp', values.volume / values.luasAlas);
        }
        if (has('volume') && has('tp') && values.tp > 0) {
          set('luasAlas', values.volume / values.tp);
        }
        if (has('luas') && has('luasAlas') && has('tp') && values.tp > 0) {
          set('kelAlas', (values.luas - 2 * values.luasAlas) / values.tp);
        }
        if (has('luas') && has('luasAlas') && has('kelAlas') && values.kelAlas > 0) {
          set('tp', (values.luas - 2 * values.luasAlas) / values.kelAlas);
        }
        if (has('luas') && has('kelAlas') && has('tp')) {
          set('luasAlas', (values.luas - values.kelAlas * values.tp) / 2);
        }
        break;
      }
      case 'limas-segiempat': {
        if (has('luasAlas') && has('t')) {
          set('volume', (values.luasAlas * values.t) / 3);
        }
        if (has('luasAlas') && has('kelAlas') && has('ts')) {
          set('luas', values.luasAlas + 0.5 * values.kelAlas * values.ts);
        }
        if (has('volume') && has('luasAlas') && values.luasAlas > 0) {
          set('t', (3 * values.volume) / values.luasAlas);
        }
        if (has('volume') && has('t') && values.t > 0) {
          set('luasAlas', (3 * values.volume) / values.t);
        }
        if (has('luas') && has('luasAlas') && has('kelAlas') && values.kelAlas > 0) {
          set('ts', (2 * (values.luas - values.luasAlas)) / values.kelAlas);
        }
        if (has('luas') && has('luasAlas') && has('ts') && values.ts > 0) {
          set('kelAlas', (2 * (values.luas - values.luasAlas)) / values.ts);
        }
        if (has('luas') && has('kelAlas') && has('ts')) {
          set('luasAlas', values.luas - 0.5 * values.kelAlas * values.ts);
        }
        break;
      }
      case 'tabung': {
        if (has('r') && has('t')) {
          set('volume', PI * values.r * values.r * values.t);
          set('luas', 2 * PI * values.r * (values.r + values.t));
        }
        if (has('volume') && has('r') && values.r > 0) {
          set('t', values.volume / (PI * values.r * values.r));
        }
        if (has('volume') && has('t') && values.t > 0) {
          set('r', Math.sqrt(values.volume / (PI * values.t)));
        }
        if (has('luas') && has('r') && values.r > 0) {
          set('t', values.luas / (2 * PI * values.r) - values.r);
        }
        if (has('luas') && has('t')) {
          const c = values.luas / (2 * PI);
          const discriminant = values.t * values.t + 4 * c;
          set('r', (-values.t + Math.sqrt(discriminant)) / 2);
        }
        break;
      }
      case 'kerucut': {
        if (has('r') && has('t')) {
          set('volume', (PI * values.r * values.r * values.t) / 3);
          set('s', Math.sqrt(values.r * values.r + values.t * values.t));
        }
        if (has('r') && has('s')) {
          set('luas', PI * values.r * (values.r + values.s));
        }
        if (has('volume') && has('r') && values.r > 0) {
          set('t', (3 * values.volume) / (PI * values.r * values.r));
        }
        if (has('volume') && has('t') && values.t > 0) {
          set('r', Math.sqrt((3 * values.volume) / (PI * values.t)));
        }
        if (has('luas') && has('r') && values.r > 0) {
          set('s', values.luas / (PI * values.r) - values.r);
        }
        if (has('luas') && has('s')) {
          const c = values.luas / PI;
          const discriminant = values.s * values.s + 4 * c;
          set('r', (-values.s + Math.sqrt(discriminant)) / 2);
        }
        if (has('s') && has('r') && values.s >= values.r) {
          set('t', Math.sqrt(values.s * values.s - values.r * values.r));
        }
        if (has('s') && has('t') && values.s >= values.t) {
          set('r', Math.sqrt(values.s * values.s - values.t * values.t));
        }
        break;
      }
      case 'bola': {
        if (has('r')) {
          set('d', 2 * values.r);
          set('volume', (4 / 3) * PI * values.r ** 3);
          set('luas', 4 * PI * values.r ** 2);
        }
        if (has('d')) {
          set('r', values.d / 2);
        }
        if (has('volume')) {
          set('r', Math.cbrt((3 * values.volume) / (4 * PI)));
        }
        if (has('luas')) {
          set('r', Math.sqrt(values.luas / (4 * PI)));
        }
        break;
      }
      default:
        break;
    }

    if (!flagRef.changed) {
      break;
    }
  }

  return values;
};

const buildEmptyValues = (fields) =>
  fields.reduce((acc, field) => {
    acc[field.key] = '';
    return acc;
  }, {});

const recomputeDisplayValues = (shapeId, fields, nextValues, manualMap, activeKey = null) => {
  const manualSeeds = {};
  fields.forEach((field) => {
    if (!manualMap[field.key]) {
      return;
    }
    const parsed = parseNumber(nextValues[field.key]);
    if (parsed === null) {
      return;
    }
    manualSeeds[field.key] = parsed;
  });

  const solved = solveShapeValues(shapeId, manualSeeds, activeKey);
  const merged = {};
  fields.forEach((field) => {
    if (manualMap[field.key]) {
      merged[field.key] = nextValues[field.key];
      return;
    }
    merged[field.key] = Number.isFinite(solved[field.key]) ? formatNumber(solved[field.key]) : '';
  });
  return merged;
};

export default function ShapeCalculator({ shapeId, accentColor }) {
  const fields = CALCULATOR_FIELDS[shapeId] || [];
  const initialValues = useMemo(() => buildEmptyValues(fields), [fields]);
  const [state, setState] = useState({ values: initialValues, manual: {} });

  useEffect(() => {
    setState({ values: buildEmptyValues(fields), manual: {} });
  }, [shapeId, fields]);

  if (!fields.length) {
    return null;
  }

  const onChangeValue = (key, rawValue) => {
    const cleaned = cleanInput(rawValue);
    setState((prevState) => {
      const nextValues = { ...prevState.values, [key]: cleaned };
      const nextManual = { ...prevState.manual };

      if (shapeId === 'konversi-satuan') {
        if (cleaned.trim() === '') {
          delete nextManual[key];
        } else {
          Object.keys(nextManual).forEach((manualKey) => {
            delete nextManual[manualKey];
          });
          nextManual[key] = true;
        }
      } else {
        if (cleaned.trim() === '') {
          delete nextManual[key];
        } else {
          nextManual[key] = true;
        }
      }

      return {
        values: recomputeDisplayValues(shapeId, fields, nextValues, nextManual, key),
        manual: nextManual,
      };
    });
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.helperText}>
        Isi nilai yang kamu tahu. Kolom kosong dihitung otomatis.
      </Text>
      <View style={styles.grid}>
        {fields.map((field) => (
          <View key={field.key} style={styles.fieldItem}>
            <Text style={[styles.fieldLabel, { color: accentColor }]}>
              {renderSubscriptText(field.label, styles.subscriptText)}
            </Text>
            <TextInput
              value={state.values[field.key]}
              onChangeText={(text) => onChangeValue(field.key, text)}
              keyboardType='numeric'
              style={styles.fieldInput}
              placeholder='0'
              placeholderTextColor='#94a3b8'
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 14,
    marginBottom: 2,
  },
  helperText: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 10,
    fontFamily: FONT_UI,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  fieldItem: {
    minWidth: 120,
    flexGrow: 1,
    flexBasis: '46%',
  },
  fieldLabel: {
    fontSize: 12,
    marginBottom: 6,
    fontWeight: '700',
    fontFamily: FONT_UI,
  },
  fieldInput: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    backgroundColor: '#f8fafc',
    color: '#0f172a',
    paddingHorizontal: 10,
    paddingVertical: 9,
    fontSize: 14,
    outlineStyle: 'none',
    outlineWidth: 0,
    outlineColor: 'transparent',
    fontFamily: FONT_UI,
  },
  subscriptText: {
    fontSize: 10,
    lineHeight: 11,
    transform: [{ translateY: 2 }],
  },
});

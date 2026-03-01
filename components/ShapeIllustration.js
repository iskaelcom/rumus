import { Image, Platform, StyleSheet, View } from 'react-native';

const createSvgUri = (svg) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

const ILLUSTRATION_COPY = {
  id: {
    altPrefix: 'Ilustrasi',
    nSides: 'n sisi',
    average: 'rata',
    map: 'Peta',
    actual: 'Sebenarnya',
    numerator: 'pembilang',
    denominator: 'penyebut',
  },
  en: {
    altPrefix: 'Illustration',
    nSides: 'n sides',
    average: 'avg',
    map: 'Map',
    actual: 'Actual',
    numerator: 'numerator',
    denominator: 'denominator',
  },
};

const toRadians = (degree) => (degree * Math.PI) / 180;

const getRegularPolygonPoints = (sides, centerX, centerY, radius, rotationDegree) =>
  Array.from({ length: sides }, (_, index) => {
    const angle = toRadians(rotationDegree + (index * 360) / sides);
    return [centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle)];
  });

const buildRegularPolygonShape = ({
  sides,
  stroke,
  helperStroke,
  labelFill,
  showNSides = false,
  nSidesLabel = 'n sisi',
}) => {
  const centerX = 160;
  const centerY = 92;
  const radius = 68;
  const rotationDegree = sides % 2 === 0 ? -90 - 180 / sides : -90;
  const points = getRegularPolygonPoints(sides, centerX, centerY, radius, rotationDegree);

  const sidesData = points.map((startPoint, index) => {
    const endPoint = points[(index + 1) % points.length];
    const midX = (startPoint[0] + endPoint[0]) / 2;
    const midY = (startPoint[1] + endPoint[1]) / 2;
    return { startPoint, endPoint, midX, midY };
  });

  const apothemSide = sidesData.reduce((best, current) => {
    if (!best) {
      return current;
    }
    if (current.midY > best.midY) {
      return current;
    }
    if (Math.abs(current.midY - best.midY) < 0.1) {
      const currentCenterDistance = Math.abs(current.midX - centerX);
      const bestCenterDistance = Math.abs(best.midX - centerX);
      if (currentCenterDistance < bestCenterDistance) {
        return current;
      }
      if (Math.abs(currentCenterDistance - bestCenterDistance) < 0.1 && current.midX > best.midX) {
        return current;
      }
    }
    return best;
  }, null);

  const dx = apothemSide.midX - centerX;
  const dy = apothemSide.midY - centerY;
  const distance = Math.hypot(dx, dy) || 1;
  const unitX = dx / distance;
  const unitY = dy / distance;
  const apLabelX = centerX + unitX * distance * 0.56;
  const apLabelY = centerY + unitY * distance * 0.56;
  const sLabelX = apothemSide.midX + unitX * 18;
  const sLabelY = apothemSide.midY + unitY * 18;
  const pointsValue = points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

  return `
    <polygon points='${pointsValue}' fill='none' stroke='${stroke}' stroke-width='4.2' stroke-linejoin='round' />
    <line x1='${centerX.toFixed(1)}' y1='${centerY.toFixed(1)}' x2='${apothemSide.midX.toFixed(1)}' y2='${apothemSide.midY.toFixed(1)}' stroke='${helperStroke}' stroke-width='1.6' stroke-dasharray='6 6' />
    <circle cx='${centerX.toFixed(1)}' cy='${centerY.toFixed(1)}' r='3.2' fill='${stroke}' />
    <text x='${apLabelX.toFixed(1)}' y='${apLabelY.toFixed(1)}' fill='${labelFill}' font-size='14' font-weight='700'>ap</text>
    <text x='${sLabelX.toFixed(1)}' y='${sLabelY.toFixed(1)}' fill='${labelFill}' font-size='14' font-weight='700'>s</text>
    ${showNSides ? `<text x='160' y='18' fill='${labelFill}' text-anchor='middle' font-size='13' font-weight='700'>${nSidesLabel}</text>` : ''}
  `;
};

const buildSvg = (shapeId, stroke, copy) => {
  const helperStroke = '#64748b';
  const labelFill = '#0f172a';
  const common = '';

  const shapes = {
    persegi: `
      <rect x='104' y='34' width='112' height='112' fill='none' stroke='${stroke}' stroke-width='4.2' />
      <text x='160' y='24' fill='${labelFill}' text-anchor='middle' font-size='15' font-weight='700'>s</text>
      <text x='230' y='94' fill='${labelFill}' text-anchor='middle' font-size='15' font-weight='700'>s</text>
    `,
    'persegi-panjang': `
      <rect x='70' y='45' width='180' height='90' fill='none' stroke='${stroke}' stroke-width='4.2' />
      <text x='160' y='34' fill='${labelFill}' text-anchor='middle' font-size='15' font-weight='700'>p</text>
      <text x='262' y='94' fill='${labelFill}' text-anchor='middle' font-size='15' font-weight='700'>l</text>
    `,
    segitiga: `
      <polygon points='160,30 65,145 255,145' fill='none' stroke='${stroke}' stroke-width='4.2' />
      <line x1='160' y1='30' x2='160' y2='145' stroke='${helperStroke}' stroke-width='1.6' stroke-dasharray='6 6' />
      <text x='160' y='164' fill='${labelFill}' text-anchor='middle' font-size='15' font-weight='700'>a</text>
      <text x='172' y='92' fill='${labelFill}' font-size='15' font-weight='700'>t</text>
      <text x='111' y='95' fill='${labelFill}' font-size='13' font-weight='700'>s1</text>
      <text x='201' y='95' fill='${labelFill}' font-size='13' font-weight='700'>s2</text>
    `,
    lingkaran: `
      <circle cx='160' cy='90' r='58' fill='none' stroke='${stroke}' stroke-width='4.2' />
      <circle cx='160' cy='90' r='4' fill='${stroke}' />
      <line x1='160' y1='90' x2='218' y2='90' stroke='${helperStroke}' stroke-width='1.6' />
      <text x='190' y='82' fill='${labelFill}' font-size='15' font-weight='700'>r</text>
    `,
    'jajar-genjang': `
      <polygon points='95,38 235,38 215,142 75,142' fill='none' stroke='${stroke}' stroke-width='4.2' />
      <line x1='95' y1='38' x2='95' y2='142' stroke='${helperStroke}' stroke-width='1.6' stroke-dasharray='6 6' />
      <text x='145' y='161' fill='${labelFill}' text-anchor='middle' font-size='15' font-weight='700'>a</text>
      <text x='229' y='96' fill='${labelFill}' font-size='15' font-weight='700'>b</text>
      <text x='80' y='94' fill='${labelFill}' font-size='15' font-weight='700'>t</text>
    `,
    trapesium: `
      <polygon points='105,42 215,42 255,142 65,142' fill='none' stroke='${stroke}' stroke-width='4.2' />
      <line x1='105' y1='42' x2='105' y2='142' stroke='${helperStroke}' stroke-width='1.6' stroke-dasharray='6 6' />
      <text x='160' y='31' fill='${labelFill}' text-anchor='middle' font-size='15' font-weight='700'>a</text>
      <text x='160' y='162' fill='${labelFill}' text-anchor='middle' font-size='15' font-weight='700'>b</text>
      <text x='87' y='96' fill='${labelFill}' font-size='15' font-weight='700'>t</text>
    `,
    'belah-ketupat': `
      <polygon points='160,28 245,90 160,152 75,90' fill='none' stroke='${stroke}' stroke-width='4.2' />
      <line x1='160' y1='28' x2='160' y2='152' stroke='${helperStroke}' stroke-width='1.6' stroke-dasharray='6 6' />
      <line x1='75' y1='90' x2='245' y2='90' stroke='${helperStroke}' stroke-width='1.6' stroke-dasharray='6 6' />
      <text x='167' y='92' fill='${labelFill}' font-size='13' font-weight='700'>d1</text>
      <text x='151' y='82' fill='${labelFill}' font-size='13' font-weight='700'>d2</text>
      <text x='206' y='66' fill='${labelFill}' font-size='15' font-weight='700'>s</text>
    `,
    'layang-layang': `
      <polygon points='160,22 240,96 160,156 88,96' fill='none' stroke='${stroke}' stroke-width='4.2' />
      <line x1='160' y1='22' x2='160' y2='156' stroke='${helperStroke}' stroke-width='1.6' stroke-dasharray='6 6' />
      <line x1='88' y1='96' x2='240' y2='96' stroke='${helperStroke}' stroke-width='1.6' stroke-dasharray='6 6' />
      <text x='168' y='92' fill='${labelFill}' font-size='13' font-weight='700'>d1</text>
      <text x='152' y='86' fill='${labelFill}' font-size='13' font-weight='700'>d2</text>
      <text x='204' y='62' fill='${labelFill}' font-size='15' font-weight='700'>a</text>
      <text x='202' y='132' fill='${labelFill}' font-size='15' font-weight='700'>b</text>
    `,
    'segi-lima': buildRegularPolygonShape({ sides: 5, stroke, helperStroke, labelFill }),
    'segi-enam': buildRegularPolygonShape({ sides: 6, stroke, helperStroke, labelFill }),
    'segi-n': buildRegularPolygonShape({
      sides: 8,
      stroke,
      helperStroke,
      labelFill,
      showNSides: true,
      nSidesLabel: copy.nSides,
    }),
    pythagoras: `
      <polygon points='92,142 92,52 226,142' fill='none' stroke='${stroke}' stroke-width='4.2' stroke-linejoin='round' />
      <rect x='92' y='132' width='10' height='10' fill='none' stroke='${helperStroke}' stroke-width='1.6' />
      <text x='84' y='98' fill='${labelFill}' font-size='15' font-weight='700'>a</text>
      <text x='160' y='160' fill='${labelFill}' font-size='15' font-weight='700'>b</text>
      <text x='158' y='95' fill='${labelFill}' font-size='15' font-weight='700'>c</text>
      <text x='232' y='145' fill='${labelFill}' font-size='11' font-weight='700'>90°</text>
    `,
    'kecepatan-jarak-waktu': `
      <line x1='160' y1='46' x2='98' y2='132' stroke='${stroke}' stroke-width='3' />
      <line x1='160' y1='46' x2='222' y2='132' stroke='${stroke}' stroke-width='3' />
      <line x1='98' y1='132' x2='222' y2='132' stroke='${stroke}' stroke-width='3' />
      <circle cx='160' cy='46' r='24' fill='#ffffff' stroke='${stroke}' stroke-width='3' />
      <circle cx='98' cy='132' r='24' fill='#ffffff' stroke='${stroke}' stroke-width='3' />
      <circle cx='222' cy='132' r='24' fill='#ffffff' stroke='${stroke}' stroke-width='3' />
      <text x='160' y='52' fill='${labelFill}' text-anchor='middle' font-size='15' font-weight='700'>s</text>
      <text x='98' y='138' fill='${labelFill}' text-anchor='middle' font-size='15' font-weight='700'>v</text>
      <text x='222' y='138' fill='${labelFill}' text-anchor='middle' font-size='15' font-weight='700'>t</text>
    `,
    persen: `
      <circle cx='160' cy='92' r='56' fill='#ffffff' stroke='${stroke}' stroke-width='3.8' />
      <path d='M 160 92 L 160 36 A 56 56 0 0 1 213.3 110.9 Z' fill='#bfdbfe' stroke='${stroke}' stroke-width='2' />
      <line x1='160' y1='92' x2='160' y2='36' stroke='${helperStroke}' stroke-width='1.6' />
      <line x1='160' y1='92' x2='213.3' y2='110.9' stroke='${helperStroke}' stroke-width='1.6' />
      <text x='160' y='98' fill='${labelFill}' text-anchor='middle' font-size='14' font-weight='700'>%</text>
    `,
    'rata-rata': `
      <line x1='78' y1='142' x2='242' y2='142' stroke='${helperStroke}' stroke-width='1.6' />
      <rect x='90' y='106' width='24' height='36' rx='4' fill='#ffffff' stroke='${stroke}' stroke-width='2.6' />
      <rect x='126' y='84' width='24' height='58' rx='4' fill='#ffffff' stroke='${stroke}' stroke-width='2.6' />
      <rect x='162' y='96' width='24' height='46' rx='4' fill='#ffffff' stroke='${stroke}' stroke-width='2.6' />
      <rect x='198' y='70' width='24' height='72' rx='4' fill='#ffffff' stroke='${stroke}' stroke-width='2.6' />
      <line x1='82' y1='96' x2='238' y2='96' stroke='${stroke}' stroke-width='2.2' stroke-dasharray='6 5' />
      <text x='243' y='100' fill='${labelFill}' font-size='13' font-weight='700'>${copy.average}</text>
    `,
    skala: `
      <rect x='68' y='52' width='86' height='34' rx='6' fill='#ffffff' stroke='${stroke}' stroke-width='2.8' />
      <text x='111' y='73' fill='${labelFill}' text-anchor='middle' font-size='12' font-weight='700'>${copy.map}</text>
      <rect x='166' y='102' width='126' height='42' rx='6' fill='#ffffff' stroke='${stroke}' stroke-width='2.8' />
      <text x='229' y='128' fill='${labelFill}' text-anchor='middle' font-size='12' font-weight='700'>${copy.actual}</text>
      <line x1='154' y1='69' x2='166' y2='114' stroke='${helperStroke}' stroke-width='1.8' />
      <text x='160' y='98' fill='${labelFill}' text-anchor='middle' font-size='13' font-weight='700'>1 : n</text>
    `,
    'fpb-kpk': `
      <rect x='72' y='52' width='76' height='38' rx='8' fill='#ffffff' stroke='${stroke}' stroke-width='2.8' />
      <rect x='172' y='52' width='76' height='38' rx='8' fill='#ffffff' stroke='${stroke}' stroke-width='2.8' />
      <text x='110' y='75' fill='${labelFill}' text-anchor='middle' font-size='15' font-weight='700'>a</text>
      <text x='210' y='75' fill='${labelFill}' text-anchor='middle' font-size='15' font-weight='700'>b</text>
      <line x1='110' y1='94' x2='110' y2='122' stroke='${helperStroke}' stroke-width='1.8' />
      <line x1='210' y1='94' x2='210' y2='122' stroke='${helperStroke}' stroke-width='1.8' />
      <rect x='64' y='122' width='96' height='34' rx='8' fill='#ffffff' stroke='${stroke}' stroke-width='2.2' />
      <rect x='160' y='122' width='96' height='34' rx='8' fill='#ffffff' stroke='${stroke}' stroke-width='2.2' />
      <text x='112' y='144' fill='${labelFill}' text-anchor='middle' font-size='12' font-weight='700'>FPB</text>
      <text x='208' y='144' fill='${labelFill}' text-anchor='middle' font-size='12' font-weight='700'>KPK</text>
    `,
    pecahan: `
      <line x1='104' y1='90' x2='216' y2='90' stroke='${stroke}' stroke-width='3' />
      <text x='160' y='74' fill='${labelFill}' text-anchor='middle' font-size='14' font-weight='700'>${copy.numerator}</text>
      <text x='160' y='116' fill='${labelFill}' text-anchor='middle' font-size='14' font-weight='700'>${copy.denominator}</text>
      <text x='241' y='96' fill='${labelFill}' text-anchor='middle' font-size='15' font-weight='700'>= %</text>
    `,
    'konversi-satuan': `
      <defs>
        <marker id='ks-arr-dn' markerWidth='7' markerHeight='7' refX='3.5' refY='3.5' orient='auto' markerUnits='strokeWidth'>
          <path d='M 0 0 L 4 3.5 L 0 7 z' fill='${helperStroke}' />
        </marker>
        <marker id='ks-arr-up' markerWidth='7' markerHeight='7' refX='3.5' refY='3.5' orient='auto-start-reverse' markerUnits='strokeWidth'>
          <path d='M 0 0 L 4 3.5 L 0 7 z' fill='${helperStroke}' />
        </marker>
      </defs>
      <!-- Staircase polygon (top-left stair → bottom-right, closed) -->
      <polygon
        points='44,14 78,14 78,34 112,34 112,54 146,54 146,74 180,74 180,94 214,94 214,114 248,114 248,134 282,134 282,154 44,154'
        fill='${stroke}' fill-opacity='0.1'
        stroke='${stroke}' stroke-width='2.4' stroke-linejoin='round'
      />
      <!-- Step labels centered in each tread (plateau 34×20px, baseline = top+14) -->
      <text x='61' y='28' fill='${labelFill}' text-anchor='middle' font-size='12' font-weight='700'>km</text>
      <text x='95' y='48' fill='${labelFill}' text-anchor='middle' font-size='12' font-weight='700'>hm</text>
      <text x='129' y='68' fill='${labelFill}' text-anchor='middle' font-size='12' font-weight='700'>dam</text>
      <text x='163' y='88' fill='${labelFill}' text-anchor='middle' font-size='12' font-weight='700'>m</text>
      <text x='197' y='108' fill='${labelFill}' text-anchor='middle' font-size='12' font-weight='700'>dm</text>
      <text x='231' y='128' fill='${labelFill}' text-anchor='middle' font-size='12' font-weight='700'>cm</text>
      <text x='265' y='148' fill='${labelFill}' text-anchor='middle' font-size='12' font-weight='700'>mm</text>
      <!-- ×10 arrow: down on right side -->
      <line x1='298' y1='26' x2='298' y2='148' stroke='${helperStroke}' stroke-width='1.8' stroke-linecap='round' marker-end='url(#ks-arr-dn)' />
      <text x='298' y='18' fill='${labelFill}' text-anchor='middle' font-size='11' font-weight='700'>×10</text>
      <!-- ÷10 arrow: up on left side -->
      <line x1='28' y1='148' x2='28' y2='26' stroke='${helperStroke}' stroke-width='1.8' stroke-linecap='round' marker-end='url(#ks-arr-up)' />
      <text x='28' y='166' fill='${labelFill}' text-anchor='middle' font-size='11' font-weight='700'>÷10</text>
    `,
    'konversi-berat': `
      <defs>
        <marker id='kb-arr-dn' markerWidth='7' markerHeight='7' refX='3.5' refY='3.5' orient='auto' markerUnits='strokeWidth'>
          <path d='M 0 0 L 4 3.5 L 0 7 z' fill='${helperStroke}' />
        </marker>
        <marker id='kb-arr-up' markerWidth='7' markerHeight='7' refX='3.5' refY='3.5' orient='auto-start-reverse' markerUnits='strokeWidth'>
          <path d='M 0 0 L 4 3.5 L 0 7 z' fill='${helperStroke}' />
        </marker>
      </defs>
      <!-- Metric staircase (7 steps kg→mg, W=22, H=20, start x=14, y=14) -->
      <polygon
        points='14,14 36,14 36,34 58,34 58,54 80,54 80,74 102,74 102,94 124,94 124,114 146,114 146,134 168,134 168,154 14,154'
        fill='${stroke}' fill-opacity='0.1'
        stroke='${stroke}' stroke-width='2.2' stroke-linejoin='round'
      />
      <!-- Step labels (center x = step_left+11, y = step_top+14) -->
      <text x='25' y='28' fill='${labelFill}' text-anchor='middle' font-size='9.5' font-weight='700'>kg</text>
      <text x='47' y='48' fill='${labelFill}' text-anchor='middle' font-size='9.5' font-weight='700'>hg</text>
      <text x='69' y='68' fill='${labelFill}' text-anchor='middle' font-size='9.5' font-weight='700'>dag</text>
      <text x='91' y='88' fill='${labelFill}' text-anchor='middle' font-size='9.5' font-weight='700'>g</text>
      <text x='113' y='108' fill='${labelFill}' text-anchor='middle' font-size='9.5' font-weight='700'>dg</text>
      <text x='135' y='128' fill='${labelFill}' text-anchor='middle' font-size='9.5' font-weight='700'>cg</text>
      <text x='157' y='148' fill='${labelFill}' text-anchor='middle' font-size='9.5' font-weight='700'>mg</text>
      <!-- ×10 arrow down (right side of metric staircase) -->
      <line x1='178' y1='22' x2='178' y2='146' stroke='${helperStroke}' stroke-width='1.8' stroke-linecap='round' marker-end='url(#kb-arr-dn)' />
      <text x='178' y='15' fill='${labelFill}' text-anchor='middle' font-size='10' font-weight='700'>×10</text>
      <!-- ÷10 arrow up (left side) -->
      <line x1='7' y1='146' x2='7' y2='22' stroke='${helperStroke}' stroke-width='1.8' stroke-linecap='round' marker-end='url(#kb-arr-up)' />
      <text x='7' y='163' fill='${labelFill}' text-anchor='middle' font-size='10' font-weight='700'>÷10</text>
      <!-- Divider between metric and US panels -->
      <line x1='188' y1='8' x2='188' y2='170' stroke='#e2e8f0' stroke-width='1' stroke-dasharray='4 3' />
      <!-- US System header -->
      <text x='253' y='22' fill='${labelFill}' text-anchor='middle' font-size='10' font-weight='700'>Sistem Amerika</text>
      <!-- US ton box -->
      <rect x='193' y='28' width='120' height='36' rx='6' fill='${stroke}' fill-opacity='0.08' stroke='${stroke}' stroke-width='1.8' />
      <text x='253' y='46' fill='${labelFill}' text-anchor='middle' font-size='11' font-weight='700'>ton (US)</text>
      <text x='253' y='59' fill='${helperStroke}' text-anchor='middle' font-size='9'>1 ton = 2.000 lb</text>
      <!-- Arrow ton→lb -->
      <line x1='253' y1='64' x2='253' y2='78' stroke='${helperStroke}' stroke-width='1.6' stroke-linecap='round' marker-end='url(#kb-arr-dn)' />
      <text x='264' y='74' fill='${labelFill}' font-size='9' font-weight='700'>×2.000</text>
      <!-- US lb box -->
      <rect x='193' y='82' width='120' height='36' rx='6' fill='${stroke}' fill-opacity='0.08' stroke='${stroke}' stroke-width='1.8' />
      <text x='253' y='100' fill='${labelFill}' text-anchor='middle' font-size='11' font-weight='700'>lb (pound)</text>
      <text x='253' y='113' fill='${helperStroke}' text-anchor='middle' font-size='9'>1 lb = 16 oz</text>
      <!-- Arrow lb→oz -->
      <line x1='253' y1='118' x2='253' y2='132' stroke='${helperStroke}' stroke-width='1.6' stroke-linecap='round' marker-end='url(#kb-arr-dn)' />
      <text x='264' y='128' fill='${labelFill}' font-size='9' font-weight='700'>×16</text>
      <!-- US oz box -->
      <rect x='193' y='136' width='120' height='36' rx='6' fill='${stroke}' fill-opacity='0.08' stroke='${stroke}' stroke-width='1.8' />
      <text x='253' y='154' fill='${labelFill}' text-anchor='middle' font-size='11' font-weight='700'>oz (ounce)</text>
      <text x='253' y='166' fill='${helperStroke}' text-anchor='middle' font-size='9'>1 oz = 28,35 g</text>
    `,
    'konversi-waktu': `
      <!-- Staircase polygon (7 steps: tahun→detik, same geometry as konversi-satuan) -->
      <polygon
        points='44,14 78,14 78,34 112,34 112,54 146,54 146,74 180,74 180,94 214,94 214,114 248,114 248,134 282,134 282,154 44,154'
        fill='${stroke}' fill-opacity='0.1'
        stroke='${stroke}' stroke-width='2.4' stroke-linejoin='round'
      />
      <!-- Step labels (font 10 to fit longer words like "minggu", "menit") -->
      <text x='61' y='27' fill='${labelFill}' text-anchor='middle' font-size='10' font-weight='700'>tahun</text>
      <text x='95' y='47' fill='${labelFill}' text-anchor='middle' font-size='10' font-weight='700'>bulan</text>
      <text x='129' y='67' fill='${labelFill}' text-anchor='middle' font-size='10' font-weight='700'>minggu</text>
      <text x='163' y='87' fill='${labelFill}' text-anchor='middle' font-size='10' font-weight='700'>hari</text>
      <text x='197' y='107' fill='${labelFill}' text-anchor='middle' font-size='10' font-weight='700'>jam</text>
      <text x='231' y='127' fill='${labelFill}' text-anchor='middle' font-size='10' font-weight='700'>menit</text>
      <text x='265' y='147' fill='${labelFill}' text-anchor='middle' font-size='10' font-weight='700'>detik</text>
      <!-- Per-step conversion factor labels on each riser gap -->
      <text x='81' y='30' fill='${helperStroke}' font-size='8.5' font-weight='700'>×12</text>
      <text x='115' y='50' fill='${helperStroke}' font-size='8.5' font-weight='700'>×4</text>
      <text x='149' y='70' fill='${helperStroke}' font-size='8.5' font-weight='700'>×7</text>
      <text x='183' y='90' fill='${helperStroke}' font-size='8.5' font-weight='700'>×24</text>
      <text x='217' y='110' fill='${helperStroke}' font-size='8.5' font-weight='700'>×60</text>
      <text x='251' y='130' fill='${helperStroke}' font-size='8.5' font-weight='700'>×60</text>
      <!-- Legend note top-right -->
      <text x='308' y='22' fill='${helperStroke}' text-anchor='end' font-size='9' font-weight='700'>↓ kalikan</text>
      <text x='308' y='34' fill='${helperStroke}' text-anchor='end' font-size='9' font-weight='700'>↑ bagi</text>
    `,
    debit: `
      <defs>
        <marker id='fa' markerWidth='7' markerHeight='6' refX='6' refY='3' orient='auto' markerUnits='strokeWidth'>
          <path d='M 0 0 L 7 3 L 0 6 z' fill='${stroke}' />
        </marker>
      </defs>

      <!-- Pipe body -->
      <rect x='22' y='66' width='88' height='48' rx='10' fill='none' stroke='${stroke}' stroke-width='2.8' />
      <!-- Pipe inlet cap -->
      <ellipse cx='23' cy='90' rx='5' ry='21' fill='none' stroke='${stroke}' stroke-width='1.8' />

      <!-- Water ripple lines inside pipe -->
      <path d='M 46 78 Q 57 86 68 78 Q 79 70 90 78 Q 101 86 110 78' fill='none' stroke='${stroke}' stroke-width='1.8' opacity='0.4' stroke-linecap='round' />
      <path d='M 46 100 Q 57 108 68 100 Q 79 92 90 100 Q 101 108 110 100' fill='none' stroke='${stroke}' stroke-width='1.8' opacity='0.4' stroke-linecap='round' />

      <!-- Pipe right opening -->
      <line x1='110' y1='66' x2='110' y2='114' stroke='${stroke}' stroke-width='2.2' />

      <!-- Flow arrows (3 lines: thin-thick-thin) -->
      <line x1='112' y1='78' x2='157' y2='78' stroke='${stroke}' stroke-width='1.6' marker-end='url(#fa)' />
      <line x1='112' y1='90' x2='161' y2='90' stroke='${stroke}' stroke-width='2.8' marker-end='url(#fa)' />
      <line x1='112' y1='102' x2='157' y2='102' stroke='${stroke}' stroke-width='1.6' marker-end='url(#fa)' />

      <!-- Q label above flow -->
      <text x='136' y='61' fill='${labelFill}' text-anchor='middle' font-size='14' font-weight='700'>Q</text>
      <line x1='136' y1='63' x2='136' y2='73' stroke='${helperStroke}' stroke-width='1.2' />

      <!-- Tank / container -->
      <rect x='170' y='32' width='116' height='122' rx='10' fill='none' stroke='${stroke}' stroke-width='2.8' />

      <!-- Water fill (bottom ~42% of tank) -->
      <rect x='172' y='103' width='112' height='49' fill='${stroke}' opacity='0.14' />

      <!-- Water surface wave -->
      <path d='M 172 103 Q 194 98 216 103 Q 238 108 260 103 Q 278 98 282 103' fill='none' stroke='${stroke}' stroke-width='2' opacity='0.55' />

      <!-- V label in upper part of tank -->
      <text x='228' y='84' fill='${labelFill}' text-anchor='middle' font-size='28' font-weight='700'>V</text>

      <!-- Volume measurement ticks on left wall of tank -->
      <line x1='170' y1='103' x2='162' y2='103' stroke='${helperStroke}' stroke-width='1.5' />
      <line x1='170' y1='152' x2='162' y2='152' stroke='${helperStroke}' stroke-width='1.5' />
      <line x1='166' y1='103' x2='166' y2='152' stroke='${helperStroke}' stroke-width='1.5' />

      <!-- t label: dashed bracket on right side of tank -->
      <line x1='290' y1='32' x2='290' y2='154' stroke='${helperStroke}' stroke-width='1.6' stroke-dasharray='5 4' />
      <line x1='285' y1='32' x2='290' y2='32' stroke='${helperStroke}' stroke-width='1.4' />
      <line x1='285' y1='154' x2='290' y2='154' stroke='${helperStroke}' stroke-width='1.4' />
      <text x='301' y='97' fill='${labelFill}' font-size='16' font-weight='700'>t</text>
    `,
    kubus: `
      <rect x='92' y='64' width='84' height='84' fill='none' stroke='${stroke}' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round' />
      <rect x='136' y='40' width='84' height='84' fill='none' stroke='${stroke}' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round' />
      <line x1='92' y1='64' x2='136' y2='40' stroke='${stroke}' stroke-width='2.6' stroke-linecap='round' />
      <line x1='176' y1='64' x2='220' y2='40' stroke='${stroke}' stroke-width='2.6' stroke-linecap='round' />
      <line x1='92' y1='148' x2='136' y2='124' stroke='${stroke}' stroke-width='2.6' stroke-linecap='round' />
      <line x1='176' y1='148' x2='220' y2='124' stroke='${stroke}' stroke-width='2.6' stroke-linecap='round' />
      <text x='134' y='164' fill='${labelFill}' text-anchor='middle' font-size='15' font-weight='700'>s</text>
    `,
    balok: `
      <rect x='76' y='74' width='114' height='60' fill='none' stroke='${stroke}' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round' />
      <rect x='130' y='50' width='114' height='60' fill='none' stroke='${stroke}' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round' />
      <line x1='76' y1='74' x2='130' y2='50' stroke='${stroke}' stroke-width='2.6' stroke-linecap='round' />
      <line x1='190' y1='74' x2='244' y2='50' stroke='${stroke}' stroke-width='2.6' stroke-linecap='round' />
      <line x1='76' y1='134' x2='130' y2='110' stroke='${stroke}' stroke-width='2.6' stroke-linecap='round' />
      <line x1='190' y1='134' x2='244' y2='110' stroke='${stroke}' stroke-width='2.6' stroke-linecap='round' />
      <text x='133' y='148' fill='${labelFill}' text-anchor='middle' font-size='14' font-weight='700'>p</text>
      <text x='218' y='58' fill='${labelFill}' font-size='14' font-weight='700'>l</text>
      <text x='248' y='108' fill='${labelFill}' font-size='14' font-weight='700'>t</text>
    `,
    'prisma-segitiga': `
      <polygon points='90,142 208,142 149,108' fill='none' stroke='${stroke}' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round' />
      <polygon points='122,78 240,78 181,44' fill='none' stroke='${stroke}' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round' />
      <line x1='90' y1='142' x2='122' y2='78' stroke='${stroke}' stroke-width='2.6' stroke-linecap='round' />
      <line x1='208' y1='142' x2='240' y2='78' stroke='${stroke}' stroke-width='2.6' stroke-linecap='round' />
      <line x1='149' y1='108' x2='181' y2='44' stroke='${stroke}' stroke-width='2.6' stroke-linecap='round' />
      <line x1='149' y1='108' x2='149' y2='142' stroke='${helperStroke}' stroke-width='1.6' stroke-dasharray='6 6' />
      <text x='149' y='158' fill='${labelFill}' text-anchor='middle' font-size='14' font-weight='700'>a</text>
      <text x='156' y='127' fill='${labelFill}' font-size='14' font-weight='700'>t</text>
      <text x='104' y='106' fill='${labelFill}' font-size='14' font-weight='700'>tp</text>
    `,
    'limas-segiempat': `
      <polygon points='88,128 160,96 232,128 160,158' fill='none' stroke='${stroke}' stroke-width='2.6' stroke-linejoin='round' />
      <line x1='160' y1='40' x2='88' y2='128' stroke='${stroke}' stroke-width='2.6' stroke-linecap='round' />
      <line x1='160' y1='40' x2='232' y2='128' stroke='${stroke}' stroke-width='2.6' stroke-linecap='round' />
      <line x1='160' y1='40' x2='160' y2='96' stroke='${stroke}' stroke-width='1.9' stroke-dasharray='5 6' stroke-linecap='round' />
      <line x1='160' y1='40' x2='160' y2='158' stroke='${stroke}' stroke-width='1.9' stroke-dasharray='5 6' stroke-linecap='round' />
      <line x1='88' y1='128' x2='160' y2='158' stroke='${stroke}' stroke-width='1.9' stroke-dasharray='5 6' stroke-linecap='round' />
      <line x1='232' y1='128' x2='160' y2='158' stroke='${stroke}' stroke-width='1.9' stroke-dasharray='5 6' stroke-linecap='round' />
      <text x='168' y='78' fill='${labelFill}' font-size='14' font-weight='700'>t</text>
      <text x='126' y='118' fill='${labelFill}' font-size='14' font-weight='700'>a</text>
    `,
    tabung: `
      <ellipse cx='160' cy='45' rx='68' ry='20' fill='none' stroke='${stroke}' stroke-width='3.6' />
      <ellipse cx='160' cy='135' rx='68' ry='20' fill='none' stroke='${stroke}' stroke-width='3.6' />
      <line x1='92' y1='45' x2='92' y2='135' stroke='${stroke}' stroke-width='3.6' />
      <line x1='228' y1='45' x2='228' y2='135' stroke='${stroke}' stroke-width='3.6' />
      <line x1='160' y1='45' x2='228' y2='45' stroke='${helperStroke}' stroke-width='1.6' />
      <text x='194' y='36' fill='${labelFill}' font-size='15' font-weight='700'>r</text>
      <text x='239' y='94' fill='${labelFill}' font-size='15' font-weight='700'>t</text>
    `,
    kerucut: `
      <ellipse cx='160' cy='132' rx='68' ry='18' fill='none' stroke='${stroke}' stroke-width='2.6' />
      <line x1='160' y1='34' x2='92' y2='132' stroke='${stroke}' stroke-width='2.6' stroke-linecap='round' />
      <line x1='160' y1='34' x2='228' y2='132' stroke='${stroke}' stroke-width='2.6' stroke-linecap='round' />
      <line x1='160' y1='34' x2='160' y2='132' stroke='${stroke}' stroke-width='1.6' stroke-dasharray='5 6' />
      <line x1='160' y1='132' x2='228' y2='132' stroke='${helperStroke}' stroke-width='1.6' />
      <text x='193' y='123' fill='${labelFill}' font-size='15' font-weight='700'>r</text>
      <text x='168' y='90' fill='${labelFill}' font-size='15' font-weight='700'>t</text>
      <text x='199' y='88' fill='${labelFill}' font-size='15' font-weight='700'>s</text>
    `,
    bola: `
      <circle cx='160' cy='90' r='58' fill='none' stroke='${stroke}' stroke-width='3.6' />
      <ellipse cx='160' cy='90' rx='58' ry='22' fill='none' stroke='${stroke}' stroke-width='2.6' />
      <path d='M 160 32 C 125 50 125 130 160 148' fill='none' stroke='${stroke}' stroke-width='2.6' />
      <path d='M 160 32 C 195 50 195 130 160 148' fill='none' stroke='${stroke}' stroke-width='2.6' />
      <circle cx='160' cy='90' r='4' fill='${stroke}' />
      <line x1='160' y1='90' x2='218' y2='90' stroke='${helperStroke}' stroke-width='1.6' />
      <text x='189' y='82' fill='${labelFill}' font-size='15' font-weight='700'>r</text>
    `,
  };

  const body = shapes[shapeId] || `<circle cx='160' cy='90' r='58' fill='none' stroke='${stroke}' stroke-width='4.2' />`;

  return `
    <svg width='320' height='180' viewBox='0 0 320 180' xmlns='http://www.w3.org/2000/svg'>
      ${common}
      ${body}
    </svg>
  `;
};

export default function ShapeIllustration({ shapeId, tintColor, locale = 'id', compact = false, style }) {
  const copy = ILLUSTRATION_COPY[locale] || ILLUSTRATION_COPY.id;
  const svgUri = createSvgUri(buildSvg(shapeId, tintColor || '#2563eb', copy));
  const webStyle = compact ? { ...webImageStyle, height: 56 } : webImageStyle;

  if (Platform.OS === 'web') {
    return (
      <View style={[styles.wrapper, compact && styles.wrapperCompact, style]}>
        <img alt={`${copy.altPrefix} ${shapeId}`} src={svgUri} style={webStyle} />
      </View>
    );
  }

  return (
    <View style={[styles.wrapper, compact && styles.wrapperCompact, style]}>
      <Image
        source={{ uri: svgUri }}
        resizeMode='contain'
        style={[styles.image, compact && styles.imageCompact]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#DDE5F8',
    backgroundColor: 'transparent',
    overflow: 'hidden',
    marginBottom: 16,
  },
  wrapperCompact: {
    borderRadius: 10,
    marginBottom: 0,
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: 'transparent',
  },
  imageCompact: {
    height: 56,
  },
});

const webImageStyle = {
  width: '100%',
  height: 180,
  display: 'block',
  objectFit: 'contain',
  backgroundColor: 'transparent',
};

import { Image, Platform, StyleSheet, View } from 'react-native';

const createSvgUri = (svg) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

const toRadians = (degree) => (degree * Math.PI) / 180;

const getRegularPolygonPoints = (sides, centerX, centerY, radius, rotationDegree) =>
  Array.from({ length: sides }, (_, index) => {
    const angle = toRadians(rotationDegree + (index * 360) / sides);
    return [centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle)];
  });

const buildRegularPolygonShape = ({ sides, stroke, helperStroke, labelFill, showNSides = false }) => {
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
    ${showNSides ? `<text x='160' y='18' fill='${labelFill}' text-anchor='middle' font-size='13' font-weight='700'>n sisi</text>` : ''}
  `;
};

const buildSvg = (shapeId, stroke) => {
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
    'segi-n': buildRegularPolygonShape({ sides: 8, stroke, helperStroke, labelFill, showNSides: true }),
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
      <text x='243' y='100' fill='${labelFill}' font-size='13' font-weight='700'>rata</text>
    `,
    skala: `
      <rect x='68' y='52' width='86' height='34' rx='6' fill='#ffffff' stroke='${stroke}' stroke-width='2.8' />
      <text x='111' y='73' fill='${labelFill}' text-anchor='middle' font-size='12' font-weight='700'>Peta</text>
      <rect x='166' y='102' width='126' height='42' rx='6' fill='#ffffff' stroke='${stroke}' stroke-width='2.8' />
      <text x='229' y='128' fill='${labelFill}' text-anchor='middle' font-size='12' font-weight='700'>Sebenarnya</text>
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
      <text x='160' y='74' fill='${labelFill}' text-anchor='middle' font-size='16' font-weight='700'>pembilang</text>
      <text x='160' y='116' fill='${labelFill}' text-anchor='middle' font-size='16' font-weight='700'>penyebut</text>
      <text x='241' y='96' fill='${labelFill}' text-anchor='middle' font-size='15' font-weight='700'>= %</text>
    `,
    'konversi-satuan': `
      <defs>
        <marker id='arrow-down' markerWidth='8' markerHeight='8' refX='7' refY='4' orient='auto' markerUnits='strokeWidth'>
          <path d='M 0 0 L 8 4 L 0 8 z' fill='${helperStroke}' />
        </marker>
        <marker id='arrow-up' markerWidth='8' markerHeight='8' refX='7' refY='4' orient='auto' markerUnits='strokeWidth'>
          <path d='M 0 0 L 8 4 L 0 8 z' fill='${helperStroke}' />
        </marker>
      </defs>
      <line x1='108' y1='28' x2='194' y2='61' stroke='${helperStroke}' stroke-width='2' stroke-linecap='round' marker-end='url(#arrow-down)' />
      <text x='200' y='54' fill='${labelFill}' font-size='11' font-weight='700'>x10</text>
      <line x1='212' y1='156' x2='114' y2='118' stroke='${helperStroke}' stroke-width='2' stroke-linecap='round' marker-end='url(#arrow-up)' />
      <text x='84' y='148' fill='${labelFill}' font-size='11' font-weight='700'>:10</text>
      <rect x='36' y='36' width='32' height='22' rx='6' fill='#ffffff' stroke='${stroke}' stroke-width='1.8' />
      <rect x='72' y='50' width='32' height='22' rx='6' fill='#ffffff' stroke='${stroke}' stroke-width='1.8' />
      <rect x='108' y='64' width='32' height='22' rx='6' fill='#ffffff' stroke='${stroke}' stroke-width='1.8' />
      <rect x='144' y='78' width='32' height='22' rx='6' fill='#ffffff' stroke='${stroke}' stroke-width='1.8' />
      <rect x='180' y='92' width='32' height='22' rx='6' fill='#ffffff' stroke='${stroke}' stroke-width='1.8' />
      <rect x='216' y='106' width='32' height='22' rx='6' fill='#ffffff' stroke='${stroke}' stroke-width='1.8' />
      <rect x='252' y='120' width='32' height='22' rx='6' fill='#ffffff' stroke='${stroke}' stroke-width='1.8' />
      <text x='52' y='51' fill='${labelFill}' text-anchor='middle' font-size='9.5' font-weight='700'>km</text>
      <text x='88' y='65' fill='${labelFill}' text-anchor='middle' font-size='9.5' font-weight='700'>hm</text>
      <text x='124' y='79' fill='${labelFill}' text-anchor='middle' font-size='9.5' font-weight='700'>dam</text>
      <text x='160' y='93' fill='${labelFill}' text-anchor='middle' font-size='9.5' font-weight='700'>m</text>
      <text x='196' y='107' fill='${labelFill}' text-anchor='middle' font-size='9.5' font-weight='700'>dm</text>
      <text x='232' y='121' fill='${labelFill}' text-anchor='middle' font-size='9.5' font-weight='700'>cm</text>
      <text x='268' y='135' fill='${labelFill}' text-anchor='middle' font-size='9.5' font-weight='700'>mm</text>
    `,
    debit: `
      <rect x='58' y='38' width='204' height='104' rx='16' fill='#ffffff' stroke='${stroke}' stroke-width='2.8' />
      <text x='160' y='76' fill='${labelFill}' text-anchor='middle' font-size='24' font-weight='700'>Q = V / t</text>
      <text x='160' y='106' fill='${labelFill}' text-anchor='middle' font-size='18' font-weight='700'>V = Q x t</text>
      <text x='160' y='132' fill='${labelFill}' text-anchor='middle' font-size='18' font-weight='700'>t = V / Q</text>
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

export default function ShapeIllustration({ shapeId, tintColor, compact = false, style }) {
  const svgUri = createSvgUri(buildSvg(shapeId, tintColor || '#2563eb'));
  const webStyle = compact ? { ...webImageStyle, height: 56 } : webImageStyle;

  if (Platform.OS === 'web') {
    return (
      <View style={[styles.wrapper, compact && styles.wrapperCompact, style]}>
        <img alt={`Ilustrasi ${shapeId}`} src={svgUri} style={webStyle} />
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
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#dbe1eb',
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

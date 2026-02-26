import { Text } from 'react-native';

const SUBSCRIPT_PATTERN = /<sub>(.*?)<\/sub>/g;
const FRACTION_PATTERN = /(^|[^0-9])([0-9]+)\/([0-9]+)(?=[^0-9]|$)/g;

const COMMON_FRACTIONS = {
  '1/2': '½',
  '1/3': '⅓',
  '2/3': '⅔',
  '1/4': '¼',
  '3/4': '¾',
  '1/5': '⅕',
  '2/5': '⅖',
  '3/5': '⅗',
  '4/5': '⅘',
  '1/6': '⅙',
  '5/6': '⅚',
  '1/8': '⅛',
  '3/8': '⅜',
  '5/8': '⅝',
  '7/8': '⅞',
};

const SUPERSCRIPT_DIGITS = {
  '0': '⁰',
  '1': '¹',
  '2': '²',
  '3': '³',
  '4': '⁴',
  '5': '⁵',
  '6': '⁶',
  '7': '⁷',
  '8': '⁸',
  '9': '⁹',
};

const SUBSCRIPT_DIGITS = {
  '0': '₀',
  '1': '₁',
  '2': '₂',
  '3': '₃',
  '4': '₄',
  '5': '₅',
  '6': '₆',
  '7': '₇',
  '8': '₈',
  '9': '₉',
};

const toSuperscriptDigits = (text) => text.split('').map((char) => SUPERSCRIPT_DIGITS[char] || char).join('');
const toSubscriptDigits = (text) => text.split('').map((char) => SUBSCRIPT_DIGITS[char] || char).join('');

const formatFraction = (numerator, denominator) => {
  const plainFraction = `${numerator}/${denominator}`;
  if (COMMON_FRACTIONS[plainFraction]) {
    return COMMON_FRACTIONS[plainFraction];
  }
  return `${toSuperscriptDigits(numerator)}⁄${toSubscriptDigits(denominator)}`;
};

const formatFractionsInText = (text) =>
  text.replace(FRACTION_PATTERN, (_, prefix, numerator, denominator) => {
    return `${prefix}${formatFraction(numerator, denominator)}`;
  });

export default function renderSubscriptText(rawText, subStyle) {
  if (typeof rawText !== 'string') {
    return rawText;
  }

  const formattedText = formatFractionsInText(rawText);
  if (!formattedText.includes('<sub>')) {
    return formattedText;
  }

  const nodes = [];
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = SUBSCRIPT_PATTERN.exec(formattedText)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(formattedText.slice(lastIndex, match.index));
    }

    nodes.push(
      <Text key={`sub-${key}`} style={subStyle}>
        {match[1]}
      </Text>
    );

    key += 1;
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < formattedText.length) {
    nodes.push(formattedText.slice(lastIndex));
  }

  return nodes;
}

import { Text } from 'react-native';

const SUBSCRIPT_PATTERN = /<sub>(.*?)<\/sub>/g;

export default function renderSubscriptText(rawText, subStyle) {
  if (typeof rawText !== 'string' || !rawText.includes('<sub>')) {
    return rawText;
  }

  const nodes = [];
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = SUBSCRIPT_PATTERN.exec(rawText)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(rawText.slice(lastIndex, match.index));
    }

    nodes.push(
      <Text key={`sub-${key}`} style={subStyle}>
        {match[1]}
      </Text>
    );

    key += 1;
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < rawText.length) {
    nodes.push(rawText.slice(lastIndex));
  }

  return nodes;
}

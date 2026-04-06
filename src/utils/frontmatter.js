/**
 * Simple frontmatter parser for project markdown files.
 * Parses YAML-like frontmatter between --- delimiters.
 */
export function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { attributes: {}, body: raw };
  }

  const frontmatter = match[1];
  const body = match[2];
  const attributes = {};

  let currentKey = null;
  let inArray = false;
  let arrayItems = [];

  for (const line of frontmatter.split('\n')) {
    // Array item (indented with -)
    if (inArray && /^\s+-\s+/.test(line)) {
      const value = line.replace(/^\s+-\s+/, '').trim();
      // Check if it's an object item (has key: value)
      if (/^\w+:/.test(value)) {
        const obj = parseInlineObject(line, frontmatter, line);
        if (obj) arrayItems.push(obj);
      } else {
        arrayItems.push(value);
      }
      continue;
    }

    // End of array — save and reset
    if (inArray && !/^\s+-\s/.test(line) && !/^\s+\w+:/.test(line)) {
      attributes[currentKey] = arrayItems;
      inArray = false;
      arrayItems = [];
      currentKey = null;
    }

    // Sub-key of an object inside array (e.g., "    url: ...")
    if (inArray && /^\s+\w+:/.test(line) && !/^\s+-/.test(line)) {
      // Append to last object in array
      const [, key, val] = line.match(/^\s+(\w+):\s*(.*)$/) || [];
      if (key && arrayItems.length > 0 && typeof arrayItems[arrayItems.length - 1] === 'object') {
        arrayItems[arrayItems.length - 1][key] = val.trim();
      }
      continue;
    }

    // Top-level key: value
    const kvMatch = line.match(/^(\w+):\s*(.*)$/);
    if (kvMatch) {
      const [, key, rawValue] = kvMatch;

      // Inline array: [a, b, c]
      const inlineArray = rawValue.match(/^\[(.+)\]$/);
      if (inlineArray) {
        attributes[key] = inlineArray[1].split(',').map(s => s.trim());
        continue;
      }

      // Empty value means upcoming indented array/object
      if (rawValue === '') {
        if (inArray && currentKey) {
          attributes[currentKey] = arrayItems;
          arrayItems = [];
        }
        currentKey = key;
        inArray = true;
        continue;
      }

      attributes[key] = rawValue;
    }
  }

  // Flush remaining array
  if (inArray && currentKey) {
    attributes[currentKey] = arrayItems;
  }

  return { attributes, body };
}

function parseInlineObject(line) {
  // "  - label: GitHub" -> start of object
  const match = line.match(/^\s+-\s+(\w+):\s*(.*)$/);
  if (match) {
    return { [match[1]]: match[2].trim() };
  }
  return null;
}

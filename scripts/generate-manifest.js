const fs = require('fs');
const path = require('path');

const projectsDir = path.join(__dirname, '..', 'public', 'projects');
const manifestPath = path.join(projectsDir, 'manifest.json');

const slugs = fs.readdirSync(projectsDir)
  .filter(f => f.endsWith('.md'))
  .map(f => f.replace(/\.md$/, ''))
  .sort();

fs.writeFileSync(manifestPath, JSON.stringify(slugs));
console.log(`manifest.json: ${slugs.length} projects [${slugs.join(', ')}]`);

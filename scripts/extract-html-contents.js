// Extract HTML contents from all detail pages
const fs = require('fs');
const path = require('path');

function extractDetailBody(html) {
  // Extract content from detail-body
  const match = html.match(/<article class="detail-body">([\s\S]*?)<\/article>/);
  if (!match) return null;
  
  let content = match[1];
  
  // Remove unwanted elements but keep HTML structure
  content = content
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<div class="detail-cta">[\s\S]*?<\/div>/gi, '')
    .replace(/<a href="#"[^>]*>[\s\S]*?<\/a>/gi, ''); // Remove empty links
  
  return content.trim();
}

function extractAllContents() {
  const sourceDir = path.join(__dirname, '../../biabet-clone-modern');
  const files = fs.readdirSync(sourceDir).filter(f => f.startsWith('detail-') && f.endsWith('.html'));
  
  const contents = {};
  
  files.forEach(file => {
    try {
      const filePath = path.join(sourceDir, file);
      const html = fs.readFileSync(filePath, 'utf-8');
      const bodyContent = extractDetailBody(html);
      
      if (bodyContent) {
        const slug = file.replace(/^detail-/, '').replace(/\.html$/, '');
        contents[slug] = bodyContent;
        console.log(`✓ Extracted: ${slug}`);
      }
    } catch (error) {
      console.error(`✗ Error extracting ${file}:`, error.message);
    }
  });
  
  return contents;
}

// Run extraction
console.log('Extracting HTML contents from detail pages...\n');
const contents = extractAllContents();
const outputPath = path.join(__dirname, '../public/page-contents.json');

fs.writeFileSync(outputPath, JSON.stringify(contents, null, 2), 'utf-8');

console.log(`\n✓ Extracted ${Object.keys(contents).length} page contents`);
console.log(`✓ Saved to ${outputPath}`);

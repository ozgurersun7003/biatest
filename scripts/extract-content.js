// Script to extract HTML content from detail pages
// Run with: node scripts/extract-content.js

const fs = require('fs');
const path = require('path');

function extractContentFromHTML(htmlContent) {
  // Extract detail-body content
  const detailBodyMatch = htmlContent.match(/<article class="detail-body">([\s\S]*?)<\/article>/);
  if (!detailBodyMatch) return null;
  
  let content = detailBodyMatch[1];
  
  // Remove unwanted elements
  content = content
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<div class="detail-cta">[\s\S]*?<\/div>/gi, '')
    .replace(/<div class="detail-navigation">[\s\S]*?<\/div>/gi, '');
  
  // Get title
  const titleMatch = htmlContent.match(/<h1 class="page-title">(.*?)<\/h1>/);
  const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '';
  
  // Get description
  const descMatch = htmlContent.match(/<p class="page-subtitle">(.*?)<\/p>/);
  const description = descMatch ? descMatch[1].replace(/<[^>]+>/g, '').trim() : '';
  
  // Get category from breadcrumb
  const breadcrumbMatch = htmlContent.match(/<nav class="breadcrumb-nav">[\s\S]*?<a[^>]*>(.*?)<\/a>[\s\S]*?<span>(.*?)<\/span>/);
  const category = breadcrumbMatch && breadcrumbMatch[2] ? breadcrumbMatch[2].replace(/<[^>]+>/g, '').trim() : '';
  
  return {
    title,
    description,
    category,
    htmlContent: content.trim()
  };
}

function extractAllDetails() {
  const sourceDir = path.join(__dirname, '../../biabet-clone-modern');
  const files = fs.readdirSync(sourceDir).filter(f => f.startsWith('detail-') && f.endsWith('.html'));
  
  const contents = {};
  
  files.forEach(file => {
    const filePath = path.join(sourceDir, file);
    const html = fs.readFileSync(filePath, 'utf-8');
    const extracted = extractContentFromHTML(html);
    
    if (extracted) {
      const slug = file.replace(/^detail-/, '').replace(/\.html$/, '');
      contents[slug] = extracted;
    }
  });
  
  return contents;
}

// Run extraction
const contents = extractAllDetails();
const outputPath = path.join(__dirname, '../public/page-contents.json');
fs.writeFileSync(outputPath, JSON.stringify(contents, null, 2), 'utf-8');

console.log(`Extracted ${Object.keys(contents).length} page contents`);
console.log(`Output saved to ${outputPath}`);

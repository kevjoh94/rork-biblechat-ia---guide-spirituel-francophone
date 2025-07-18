const fs = require('fs');
const path = require('path');

// Function to recursively find all .tsx files
function findTsxFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      findTsxFiles(filePath, fileList);
    } else if (file.endsWith('.tsx')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Function to fix LinearGradient colors
function fixLinearGradientColors(content) {
  // Pattern to match LinearGradient colors prop that doesn't already have 'as const' or 'as readonly'
  const pattern = /colors=\{([^}]+)\}/g;
  
  return content.replace(pattern, (match, colorsContent) => {
    // Skip if already has type assertion
    if (colorsContent.includes('as const') || colorsContent.includes('as readonly')) {
      return match;
    }
    
    // Check if it's an array literal
    if (colorsContent.trim().startsWith('[') && colorsContent.trim().endsWith(']')) {
      return `colors={${colorsContent} as readonly [string, string]}`;
    }
    
    // Check if it's a reference to colors.someGradient
    if (colorsContent.includes('Gradient')) {
      return `colors={${colorsContent} as readonly [string, string]}`;
    }
    
    return match;
  });
}

// Main execution
const tsxFiles = findTsxFiles('.');
let fixedCount = 0;

tsxFiles.forEach(filePath => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Only process files that contain LinearGradient
    if (content.includes('LinearGradient')) {
      const fixedContent = fixLinearGradientColors(content);
      
      if (fixedContent !== content) {
        fs.writeFileSync(filePath, fixedContent, 'utf8');
        console.log(`Fixed: ${filePath}`);
        fixedCount++;
      }
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
});

console.log(`\nFixed ${fixedCount} files with LinearGradient issues.`);
// Bundle Size Analysis Script
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

function analyzeBundle() {
  const buildPath = path.join(__dirname, ".next/static/chunks");

  if (!fs.existsSync(buildPath)) {
    console.log("❌ Build directory not found. Run npm run build first.");
    return;
  }

  const files = fs.readdirSync(buildPath);
  const bundles = [];

  files.forEach((file) => {
    if (file.endsWith(".js")) {
      const filePath = path.join(buildPath, file);
      const stats = fs.statSync(filePath);
      const sizeKB = Math.round(stats.size / 1024);

      bundles.push({
        name: file,
        size: sizeKB,
        path: filePath,
      });
    }
  });

  // Sort by size (largest first)
  bundles.sort((a, b) => b.size - a.size);

  console.log("\n📊 Bundle Analysis Report");
  console.log("=".repeat(50));

  let totalSize = 0;
  const largeFiles = [];

  bundles.forEach((bundle) => {
    totalSize += bundle.size;

    if (bundle.size > 100) {
      largeFiles.push(bundle);
      console.log(`🔴 ${bundle.name}: ${bundle.size}KB`);
    } else if (bundle.size > 50) {
      console.log(`🟡 ${bundle.name}: ${bundle.size}KB`);
    } else {
      console.log(`🟢 ${bundle.name}: ${bundle.size}KB`);
    }
  });

  console.log("=".repeat(50));
  console.log(`📦 Total Bundle Size: ${totalSize}KB`);
  console.log(`⚠️  Large Files (>100KB): ${largeFiles.length}`);

  if (largeFiles.length > 0) {
    console.log("\n🚨 Large Files Analysis:");
    largeFiles.forEach((file) => {
      console.log(`   - ${file.name} (${file.size}KB)`);
    });
  }

  // Performance recommendations
  console.log("\n🎯 Performance Recommendations:");

  if (totalSize > 1000) {
    console.log("   ❌ Total bundle size is too large (>1MB)");
  } else if (totalSize > 500) {
    console.log("   ⚠️  Bundle size is acceptable but could be optimized");
  } else {
    console.log("   ✅ Bundle size looks good");
  }

  if (largeFiles.length > 3) {
    console.log("   ❌ Too many large files - consider code splitting");
  }

  // Check for development artifacts
  const devArtifacts = bundles.filter(
    (b) =>
      b.name.includes("devtools") || b.name.includes("dev") || b.size > 1000
  );

  if (devArtifacts.length > 0) {
    console.log("   ❌ Development artifacts found in production build");
    devArtifacts.forEach((artifact) => {
      console.log(`      - ${artifact.name} (${artifact.size}KB)`);
    });
  }
}

if (require.main === module) {
  analyzeBundle();
}

module.exports = { analyzeBundle };

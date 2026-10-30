import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const filesToOptimize = [
  // Heavy JPEGs (or misnamed PNGs)
  { file: "public/images/psu/Image4.jpg", type: "jpeg", maxWidth: 2560, quality: 82 },
  { file: "public/images/monetization/monetization-gallery-10.jpg", type: "jpeg", maxWidth: 2560, quality: 82 },

  // Business PNGs
  { file: "public/images/business/film-festivals.png", type: "png", maxWidth: 1920 },
  { file: "public/images/business/international-co-productions.png", type: "png", maxWidth: 1920 },
  { file: "public/images/business/international-markets.png", type: "png", maxWidth: 1920 },
  { file: "public/images/business/market-representation.png", type: "png", maxWidth: 1920 },
  { file: "public/images/business/strategic-alliances.png", type: "png", maxWidth: 1920 },
  { file: "public/images/business/international-business-hero.png", type: "png", maxWidth: 1920 },

  // Digital Media Networks PNGs
  { file: "public/images/degital-media-networks/Image1.png", type: "png", maxWidth: 1920 },
  { file: "public/images/degital-media-networks/Image2.png", type: "png", maxWidth: 1920 },
  { file: "public/images/degital-media-networks/Image3.png", type: "png", maxWidth: 1920 },
  { file: "public/images/degital-media-networks/Image4.png", type: "png", maxWidth: 1920 },
  { file: "public/images/degital-media-networks/Image5.png", type: "png", maxWidth: 1920 },
  { file: "public/images/degital-media-networks/Image6.png", type: "png", maxWidth: 1920 },
  { file: "public/images/degital-media-networks/Image7.png", type: "png", maxWidth: 1920 },
  { file: "public/images/degital-media-networks/Image8.png", type: "png", maxWidth: 1920 },
  { file: "public/images/degital-media-networks/Image9.png", type: "png", maxWidth: 1920 },

  // Event experience PNGs
  { file: "public/images/event-experience/event-experience-gallery-1.png", type: "png", maxWidth: 1920 },
  { file: "public/images/event-experience/suman-cultural-utsav.png", type: "png", maxWidth: 1920 },

  // Contact US PNGs
  { file: "public/images/contact-us/contact-us-gallery-1.png", type: "png", maxWidth: 1920 },
  { file: "public/images/contact-us/contact-us-gallery-2.png", type: "png", maxWidth: 1920 },

  // Client & Landing PNGs
  { file: "public/images/landing/client/abhijat-marathi-streaming.png", type: "png", maxWidth: 1920 },
  { file: "public/images/landing/client/music-and-audio-library.png", type: "png", maxWidth: 1920 },
  { file: "public/images/landing/film/ganesh-festival.png", type: "png", maxWidth: 1920 },
  { file: "public/images/landing/film/mumbai-gateway.png", type: "png", maxWidth: 1920 },
  { file: "public/images/landing/film/marine-drive.png", type: "png", maxWidth: 1920 },

  // Other heavy PNGs
  { file: "public/images/abhijat-marathi/app-store.png", type: "png", maxWidth: 1920 },
  { file: "public/images/abhijat-marathi/mobile/onphone-image.png", type: "png", maxWidth: 1920 },
  { file: "public/images/music-audio/music-audio-gallery-9.png", type: "png", maxWidth: 1920 },
  { file: "public/images/creator-ecosystem/creator-ecosystem-gallery-1.png", type: "png", maxWidth: 1920 },
];

async function main() {
  let totalSaved = 0;
  let beforeTotal = 0;
  let afterTotal = 0;

  for (const item of filesToOptimize) {
    const fullPath = path.resolve(item.file);
    if (!fs.existsSync(fullPath)) {
      console.warn(`Skipping missing file: ${item.file}`);
      continue;
    }

    const inputBuffer = fs.readFileSync(fullPath);
    const beforeBytes = inputBuffer.length;
    beforeTotal += beforeBytes;

    let pipeline = sharp(inputBuffer).resize({
      width: item.maxWidth || 1920,
      withoutEnlargement: true,
    });

    let buffer;
    if (item.type === "jpeg") {
      buffer = await pipeline.jpeg({ quality: item.quality || 82, mozjpeg: true }).toBuffer();
    } else {
      buffer = await pipeline.png({ compressionLevel: 9, effort: 7 }).toBuffer();
    }

    const afterBytes = buffer.length;
    if (afterBytes < beforeBytes) {
      fs.writeFileSync(fullPath, buffer);
      const saved = beforeBytes - afterBytes;
      totalSaved += saved;
      afterTotal += afterBytes;
      console.log(
        `✓ ${item.file}: ${(beforeBytes / 1024 / 1024).toFixed(2)} MB -> ${(afterBytes / 1024).toFixed(1)} KB (Saved ${(saved / 1024 / 1024).toFixed(2)} MB)`
      );
    } else {
      afterTotal += beforeBytes;
      console.log(`- ${item.file}: already optimal, kept original`);
    }
  }

  console.log("=========================================");
  console.log(`Original total: ${(beforeTotal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Optimized total: ${(afterTotal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`TOTAL SAVINGS: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
}

main().catch((err) => {
  console.error("Optimization failed:", err);
  process.exit(1);
});

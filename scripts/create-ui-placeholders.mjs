import fs from "node:fs";
import path from "node:path";
import { createCanvas } from "@napi-rs/canvas";

const PLACEHOLDERS = [
  {
    file: "public/contact/contact-hero-placeholder.jpg",
    width: 1920,
    height: 720,
    label: "Contact Hero",
  },
  {
    file: "public/contact/recruitment-placeholder.jpg",
    width: 960,
    height: 720,
    label: "Recruitment",
  },
];

function drawPlaceholder({ width, height, label }) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#0a0c10");
  gradient.addColorStop(0.5, "#12161d");
  gradient.addColorStop(1, "#1a1208");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(255, 107, 0, 0.08)";
  ctx.lineWidth = 1;
  const grid = 48;
  for (let x = 0; x <= width; x += grid) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y <= height; y += grid) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  ctx.strokeStyle = "rgba(255, 107, 0, 0.35)";
  ctx.lineWidth = 2;
  ctx.strokeRect(width * 0.08, height * 0.12, width * 0.84, height * 0.76);

  ctx.fillStyle = "rgba(255, 140, 66, 0.85)";
  ctx.font = `600 ${Math.round(height * 0.045)}px sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText(label.toUpperCase(), width / 2, height / 2 - 8);

  ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
  ctx.font = `400 ${Math.round(height * 0.028)}px sans-serif`;
  ctx.fillText("Replace with final image", width / 2, height / 2 + 28);

  return canvas.toBuffer("image/jpeg", 88);
}

for (const placeholder of PLACEHOLDERS) {
  const outputPath = path.join(process.cwd(), placeholder.file);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, drawPlaceholder(placeholder));
  console.log(`[placeholders] Created ${placeholder.file}`);
}

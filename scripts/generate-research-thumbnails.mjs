import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { createCanvas } from "@napi-rs/canvas";

const DOCUMENTS_DIR = path.join(process.cwd(), "public", "documents");
const THUMBNAILS_DIR = path.join(process.cwd(), "public", "research-thumbnails");
const TARGET_PREVIEW_WIDTH = 520;

const PUBLICATIONS = [
  "Conference_paper1.pdf",
  "Research1.pdf",
  "Research3.pdf",
  "Research2.pdf",
];

function thumbnailFilenameForPdf(filename) {
  return `${filename.replace(/\.[^.]+$/, "")}.png`;
}

function shouldRegenerateThumbnail(pdfPath, thumbnailPath) {
  if (!fs.existsSync(thumbnailPath)) return true;
  if (!fs.existsSync(pdfPath)) return false;

  return fs.statSync(pdfPath).mtimeMs > fs.statSync(thumbnailPath).mtimeMs;
}

async function renderPdfFirstPageThumbnail(pdfPath, outputPath) {
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const workerPath = path.join(
    process.cwd(),
    "node_modules",
    "pdfjs-dist",
    "legacy",
    "build",
    "pdf.worker.mjs",
  );

  pdfjs.GlobalWorkerOptions.workerSrc = pathToFileURL(workerPath).href;

  const pdfBuffer = fs.readFileSync(pdfPath);
  const loadingTask = pdfjs.getDocument({
    data: new Uint8Array(pdfBuffer),
    useSystemFonts: true,
    disableFontFace: true,
    isEvalSupported: false,
  });

  const pdfDocument = await loadingTask.promise;
  const page = await pdfDocument.getPage(1);
  const baseViewport = page.getViewport({ scale: 1 });
  const scale = TARGET_PREVIEW_WIDTH / baseViewport.width;
  const viewport = page.getViewport({ scale });

  const canvas = createCanvas(Math.floor(viewport.width), Math.floor(viewport.height));
  const context = canvas.getContext("2d");

  await page.render({
    canvasContext: context,
    viewport,
    canvas,
  }).promise;

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, canvas.toBuffer("image/png"));
}

async function ensureResearchThumbnail(filename) {
  const pdfPath = path.join(DOCUMENTS_DIR, filename);
  if (!fs.existsSync(pdfPath)) {
    console.warn(`[research-thumbnails] Missing PDF: ${filename}`);
    return null;
  }

  const thumbnailName = thumbnailFilenameForPdf(filename);
  const thumbnailPath = path.join(THUMBNAILS_DIR, thumbnailName);

  if (shouldRegenerateThumbnail(pdfPath, thumbnailPath)) {
    await renderPdfFirstPageThumbnail(pdfPath, thumbnailPath);
    console.log(`[research-thumbnails] Generated ${thumbnailName}`);
  } else {
    console.log(`[research-thumbnails] Up to date ${thumbnailName}`);
  }

  return `/research-thumbnails/${encodeURIComponent(thumbnailName)}`;
}

async function main() {
  fs.mkdirSync(THUMBNAILS_DIR, { recursive: true });

  for (const filename of PUBLICATIONS) {
    await ensureResearchThumbnail(filename);
  }
}

main().catch((error) => {
  console.error("[research-thumbnails] Failed:", error);
  process.exit(1);
});

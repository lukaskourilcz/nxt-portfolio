// Allow side-effect CSS imports (e.g. `import "./globals.css"`) under bare tsc.
// Next.js handles these at build time; this keeps `tsc --noEmit` happy too.
declare module "*.css";

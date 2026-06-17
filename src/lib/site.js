// Single source of truth for the site's URL, contact details, and external
// profile links. Anything that shows up in more than one place — page
// metadata, the navbar, footer, contact section, structured data — lives here
// so it only ever has to be changed once (and can't drift out of sync).

export const SITE_URL = "https://lukaskouril.vercel.app";

export const EMAIL = "kouril.lukas@gmail.com";
export const EMAIL_HREF = `mailto:${EMAIL}`;

export const PHONE = "+420 737 875 367";
export const PHONE_HREF = "tel:+420737875367";

export const LOCATION = "Prague, Czech Republic";

export const GITHUB_USERNAME = "lukaskourilcz";
export const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`;
export const LINKEDIN_URL = "https://linkedin.com/in/lukas-kouril/";

// Downloadable CV/résumé served from /public.
export const RESUME_PATH = "/pdf/cv_lukaskouril.pdf";

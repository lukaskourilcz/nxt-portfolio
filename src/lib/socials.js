import { Github, Linkedin, Mail } from "lucide-react";
import { GITHUB_URL, LINKEDIN_URL, EMAIL_HREF } from "@/lib/site";

// Shared social links, used by the footer and the contact section.
export const SOCIALS = [
  { href: GITHUB_URL, label: "GitHub", Icon: Github },
  { href: LINKEDIN_URL, label: "LinkedIn", Icon: Linkedin },
];

// Footer surfaces email alongside the social links.
export const SOCIALS_WITH_EMAIL = [
  ...SOCIALS,
  { href: EMAIL_HREF, label: "Email", Icon: Mail },
];

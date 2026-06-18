import { Github, Linkedin, Mail } from "lucide-react";
import { GITHUB_URL, LINKEDIN_URL, EMAIL_HREF } from "@/lib/site";
import type { Social } from "@/lib/types";

// Shared social links, used by the footer and the contact section.
export const SOCIALS: Social[] = [
  { href: GITHUB_URL, label: "GitHub", Icon: Github },
  { href: LINKEDIN_URL, label: "LinkedIn", Icon: Linkedin },
];

// Footer surfaces email alongside the social links.
export const SOCIALS_WITH_EMAIL: Social[] = [
  ...SOCIALS,
  { href: EMAIL_HREF, label: "Email", Icon: Mail },
];

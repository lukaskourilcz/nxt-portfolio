import { notFound } from "next/navigation";
import { CONTENT } from "@/lib/content";
import DevEditor from "./editor";

export const metadata = {
  title: "dev editor",
  robots: { index: false, follow: false },
};

// Local content editor. Only exists while running `npm run dev`; the
// production build serves a 404 here.
export default function DevPage() {
  if (process.env.NODE_ENV !== "development") notFound();
  return <DevEditor initial={CONTENT} />;
}

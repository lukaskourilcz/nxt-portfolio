import { notFound } from "next/navigation";
import { getAllContent } from "@/lib/content";
import DevEditor from "./editor";

export const metadata = { title: "Portfolio content editor", robots: { index: false, follow: false } };

export default function DevPage() {
  if (process.env.NODE_ENV !== "development") notFound();
  return <DevEditor initial={getAllContent()} />;
}

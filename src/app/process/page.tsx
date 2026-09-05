import type { Metadata } from "next";
import { Footer } from "@/components/site/footer";
import { SiteNav } from "@/components/site/nav";
import { Process } from "@/components/site/process";

export const metadata: Metadata = { title: "Our Process | AppCraft Technology", description: "How AppCraft Technology takes a digital product from discovery to launch." };

export default function ProcessPage() {
  return <div className="min-h-screen bg-background text-foreground"><SiteNav /><main className="pt-28 sm:pt-36"><Process /></main><Footer /></div>;
}

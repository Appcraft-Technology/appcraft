import type { Metadata } from "next";
import { Footer } from "@/components/site/footer";
import { SiteNav } from "@/components/site/nav";
import { Tech } from "@/components/site/tech";

export const metadata: Metadata = { title: "Technology Stack | AppCraft Technology", description: "The technologies AppCraft uses to build mobile and web products." };

export default function TechPage() {
  return <div className="min-h-screen bg-background text-foreground"><SiteNav /><main className="pt-28 sm:pt-36"><Tech /></main><Footer /></div>;
}

import type { Metadata } from "next";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { SiteNav } from "@/components/site/nav";

export const metadata: Metadata = { title: "Contact | AppCraft Technology", description: "Start a product-engineering conversation with AppCraft Technology." };

export default function ContactPage() {
  return <div className="min-h-screen bg-background text-foreground"><SiteNav /><main className="pt-28 sm:pt-36"><Contact /></main><Footer /></div>;
}

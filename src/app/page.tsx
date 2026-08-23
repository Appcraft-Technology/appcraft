import type { Metadata } from "next";
import { SiteNav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { ShippedCarousel } from "@/components/site/shipped-carousel";
import { Stats } from "@/components/site/stats";
import { Process } from "@/components/site/process";
import { Tech } from "@/components/site/tech";
import { Testimonials } from "@/components/site/testimonials";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";

const title = "AppCraft Technology | Product Engineering | 13 Years";
const description =
  "AppCraft Technology ships production iOS, Android, and web apps. 13 years, 50+ products, live on the App Store.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    url: "https://appcraft.in/",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "https://appcraft.in/",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <Hero />
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="relative h-px">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-blue/40 to-transparent opacity-60 blur-[1px]" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-line to-transparent" />
          </div>
        </div>
        <ShippedCarousel />
        <Stats />

        <Process />
        <Tech />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

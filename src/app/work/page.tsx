import type { Metadata } from "next";
import { Footer } from "@/components/site/footer";
import { SiteNav } from "@/components/site/nav";
import { WorkArchive } from "@/components/site/work-archive";

export const metadata: Metadata = {
  title: "Work Archive | AppCraft Technology",
  description: "Browse the mobile products and web platforms shipped by AppCraft Technology.",
  alternates: { canonical: "https://appcraft.in/work" },
};

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <main>
        <WorkArchive />
      </main>
      <Footer />
    </div>
  );
}

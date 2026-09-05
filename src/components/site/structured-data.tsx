const siteUrl = "https://appcraft.in";

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#organization`,
      name: "AppCraft Technology",
      url: siteUrl,
      logo: `${siteUrl}/assets/appcraft-lockup-transparent.png`,
      description: "Product engineering company building iOS, Android, and web products.",
      address: { "@type": "PostalAddress", addressLocality: "New Delhi", addressCountry: "IN" },
      sameAs: ["https://www.linkedin.com/company/appcraft-technology", "https://x.com/appcraft_tweets"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "AppCraft Technology",
      url: siteUrl,
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en-IN",
    },
  ],
};

export function StructuredData() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />;
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { Footer } from "@/components/site/footer";
import { SiteNav } from "@/components/site/nav";
import { blogPosts, getBlogPost } from "@/content/blog";

export const dynamicParams = false;
export function generateStaticParams() { return blogPosts.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> { const post = getBlogPost((await params).slug); return post ? { title: post.title, description: post.excerpt, alternates: { canonical: `https://appcraft.in/blog/${post.slug}` }, openGraph: { type: "article", title: post.title, description: post.excerpt, url: `https://appcraft.in/blog/${post.slug}`, publishedTime: post.publishedAt } } : {}; }

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const post = getBlogPost((await params).slug); if (!post) notFound();
  const schema = { "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.excerpt, datePublished: post.publishedAt, dateModified: post.publishedAt, mainEntityOfPage: `https://appcraft.in/blog/${post.slug}`, author: { "@type": "Organization", name: "AppCraft Technology", url: "https://appcraft.in" }, publisher: { "@type": "Organization", name: "AppCraft Technology", logo: { "@type": "ImageObject", url: "https://appcraft.in/assets/appcraft-lockup-transparent.png" } } };
  return <div className="min-h-screen bg-background text-foreground"><SiteNav /><main className="pt-28 pb-20 sm:pt-36"><article className="mx-auto max-w-3xl px-5 sm:px-8"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><Link href="/blog" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-ink-muted outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-accent-blue-bright focus-visible:ring-offset-2 focus-visible:ring-offset-background"><ArrowLeft className="size-4" aria-hidden />All notes</Link><time dateTime={post.publishedAt} className="mt-10 block text-sm text-accent-blue">{post.publishedAt}<span className="mx-2">·</span>{post.readTime}</time><h1 className="mt-4 text-4xl sm:text-5xl">{post.title}</h1><p className="mt-6 text-lg leading-8 text-ink-muted">{post.excerpt}</p><div className="mt-10 space-y-6 border-t border-line pt-8 text-base leading-8 text-ink-muted sm:text-lg">{post.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><p className="mt-10 border-t border-line pt-5 text-sm text-ink-dim">Published by AppCraft Technology · Updated {post.publishedAt}</p></article></main><Footer /></div>;
}

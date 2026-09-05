"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, ExternalLink, X } from "lucide-react";
import { shippedCategories, type ShippedCard } from "./shipped-data.generated";
import { workDetails } from "./work-details";

export type WorkItem = ShippedCard & {
  category: string;
};

const workItems: WorkItem[] = shippedCategories.flatMap((category) =>
  category.cards.map((card) => ({ ...card, category: category.title })),
);

function PlatformChip({ platform }: { platform: WorkItem["platforms"][number] }) {
  return (
    <span className="rounded-full border border-line bg-surface px-2.5 py-1 text-xs font-medium text-ink-muted">
      {platform}
    </span>
  );
}

function LiveLink({ item }: { item: WorkItem }) {
  if (item.url === "#") return null;

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noreferrer noopener"
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground outline-none transition-all duration-200 hover:scale-[1.02] hover:shadow-[var(--shadow-glow)] focus-visible:ring-2 focus-visible:ring-accent-blue-bright focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]"
    >
      Visit live product <ExternalLink className="size-4" aria-hidden />
    </a>
  );
}

export function WorkDialog({ item }: { item: WorkItem }) {
  const detail = workDetails[item.name] ?? {
    business: item.desc,
    audience: "Visitors evaluating the live product.",
    capabilities: item.platforms.map((platform) => `${platform} product experience`),
    publicPositioning: "The live product is the available public reference for this project.",
  };
  return (
    <Dialog.Content
      aria-describedby="project-description"
      className="fixed top-1/2 left-1/2 z-[60] flex max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl bg-background shadow-[0_24px_80px_-28px_rgb(15_23_42/0.45)] outline-none"
    >
      <div
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain touch-pan-y"
        onWheelCapture={(event) => event.stopPropagation()}
        onTouchMoveCapture={(event) => event.stopPropagation()}
      >
        <div className="relative aspect-[16/8] bg-surface-2 sm:aspect-[16/7]">
          {item.image ? (
            <img
              src={item.image}
              alt={`${item.name} product preview`}
              className="size-full object-cover object-top"
            />
          ) : null}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/70 to-transparent" />
        </div>

        <div className="px-5 pt-5 pb-6 sm:px-8 sm:pt-7 sm:pb-8">
          <p className="text-sm font-medium text-accent-blue">{item.category}</p>
          <Dialog.Title className="mt-2 pr-12 text-3xl sm:text-4xl">{item.name}</Dialog.Title>
          <Dialog.Close asChild>
            <button
              type="button"
              className="absolute top-4 right-4 inline-flex size-11 items-center justify-center rounded-full bg-background/90 text-ink shadow-sm outline-none backdrop-blur transition-colors hover:bg-background focus-visible:ring-2 focus-visible:ring-accent-blue-bright focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <X className="size-5" aria-hidden />
              <span className="sr-only">Close {item.name} details</span>
            </button>
          </Dialog.Close>

          <div className="mt-6 grid gap-7 border-t border-line pt-6 sm:grid-cols-[minmax(0,1.5fr)_minmax(11rem,0.75fr)]">
            <div>
              <h2 className="text-lg">What it is</h2>
              <p id="project-description" className="mt-2 max-w-prose text-base leading-7 text-ink-muted">
                {detail.business}
              </p>
              <h2 className="mt-6 text-lg">Who it serves</h2>
              <p className="mt-2 max-w-prose text-base leading-7 text-ink-muted">{detail.audience}</p>
            </div>
            <dl className="space-y-5">
              <div>
                <dt className="text-xs font-medium tracking-wide text-ink-dim uppercase">Delivery</dt>
                <dd className="mt-2 text-sm text-ink">{item.category}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium tracking-wide text-ink-dim uppercase">Platforms</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {item.platforms.map((platform) => (
                    <PlatformChip key={platform} platform={platform} />
                  ))}
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-7 grid gap-7 border-t border-line pt-6 sm:grid-cols-2">
            <div>
              <h2 className="text-lg">Visible product experience</h2>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-ink-muted">
                {detail.capabilities.map((capability) => (
                  <li key={capability} className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-blue" aria-hidden />
                    {capability}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-lg">Public positioning</h2>
              <p className="mt-3 text-sm leading-6 text-ink-muted">{detail.publicPositioning}</p>
            </div>
          </div>

          <div className="mt-8 border-t border-line pt-6">
            <LiveLink item={item} />
          </div>
        </div>
      </div>
    </Dialog.Content>
  );
}

function WorkCard({ item }: { item: WorkItem }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-surface text-left outline-none transition-all duration-300 hover:-translate-y-1 hover:border-line-strong focus-visible:ring-2 focus-visible:ring-accent-blue-bright focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-2">
            {item.image ? (
              <img
                src={item.image}
                alt=""
                className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
                decoding="async"
              />
            ) : null}
            <span className="absolute top-3 right-3 inline-flex size-9 items-center justify-center rounded-full bg-background/90 text-ink opacity-0 shadow-sm backdrop-blur transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
              <ArrowUpRight className="size-4" aria-hidden />
            </span>
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="text-sm font-medium text-accent-blue">{item.category}</p>
            <h2 className="mt-2 text-xl">{item.name}</h2>
            <p className="mt-2 text-sm leading-6 text-ink-muted">{item.desc}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {item.platforms.map((platform) => (
                <PlatformChip key={platform} platform={platform} />
              ))}
            </div>
          </div>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[55] bg-ink/35 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <WorkDialog item={item} />
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function WorkArchive() {
  return (
    <section className="pb-20 pt-28 sm:pt-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="text-sm font-medium text-accent-blue">Project archive</p>
        <h1 className="mt-3 max-w-3xl text-4xl sm:text-5xl lg:text-6xl">Everything we have shipped, in one place.</h1>
        <div className="mt-6 flex flex-col justify-between gap-5 border-t border-line pt-5 sm:flex-row sm:items-end">
          <p className="max-w-2xl text-base leading-7 text-ink-muted sm:text-lg">
            Browse our live mobile products and web platforms. Select any project to see its
            complete published record and visit the live product.
          </p>
          <p className="shrink-0 text-sm text-ink-dim">{workItems.length} projects</p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {workItems.map((item) => (
            <WorkCard key={`${item.category}-${item.name}`} item={item} />
          ))}
        </div>

        <div className="mt-20 border-t border-line pt-10 text-center sm:mt-24 sm:pt-12">
          <h2 className="text-2xl sm:text-3xl">The work you see is only part of the story.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-ink-muted sm:text-lg">
            This archive features projects we can share publicly. Many products we have shipped
            remain private under client confidentiality and NDA commitments.
          </p>
        </div>
      </div>
    </section>
  );
}

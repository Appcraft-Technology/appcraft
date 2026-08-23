"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./motion-primitives";
import { shippedCategories, type ShippedCard } from "./shipped-data.generated";
import type { Platform } from "./work-data";

const platformClass: Record<Platform, string> = {
  iOS: "border-accent-blue/30 text-accent-blue",
  Android: "border-accent-emerald/30 text-accent-emerald",
  Web: "border-accent-blue/30 text-accent-blue",
};

function PlatformChip({ platform }: { platform: Platform }) {
  return (
    <span
      className={`rounded-full border px-2.5 py-0.5 text-[0.6875rem] font-medium tracking-wide ${platformClass[platform]}`}
    >
      {platform}
    </span>
  );
}

function CardFooter({ card }: { card: ShippedCard }) {
  return (
    <>
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {card.platforms.map((p) => (
          <PlatformChip key={p} platform={p} />
        ))}
      </div>
      <a
        href={card.url}
        target={card.url === "#" ? undefined : "_blank"}
        rel={card.url === "#" ? undefined : "noreferrer noopener"}
        aria-disabled={card.url === "#"}
        className={`mt-4 flex items-center gap-1 border-t border-line pt-3 text-sm text-ink-muted transition-colors ${
          card.url === "#" ? "pointer-events-none opacity-60" : "hover:text-accent-blue"
        }`}
      >
        View live <ArrowUpRight className="size-3.5" />
      </a>
    </>
  );
}

/**
 * CSS-drawn phone bezel around a screenshot (dark rounded frame + notch), used for
 * raw in-app screenshots. When `card.framed` is true the source image already has
 * its own device mockup baked in, so we skip the extra bezel and just show the
 * image - but both variants render inside the exact same outer aspect-ratio box
 * (fixed on the outermost element, not a percentage sub-box) so every card in the
 * row ends up the same height regardless of which variant it uses.
 */
function PhoneScreenshot({ card }: { card: ShippedCard }) {
  if (card.framed) {
    return (
      <div className="relative aspect-[9/19.5] w-full overflow-hidden bg-surface-2">
        <img
          src={card.image}
          alt={`${card.name} screenshot`}
          loading="lazy"
          decoding="async"
          className="size-full object-cover object-top"
        />
      </div>
    );
  }

  return (
    <div className="relative flex aspect-[9/19.5] w-full items-center justify-center bg-surface-2 p-2">
      <div className="relative aspect-[9/19.5] h-full rounded-[1.4rem] border-[3px] border-ink bg-ink p-1.5 shadow-[0_0_0_1px_var(--surface-2),0_2px_8px_-2px_rgb(0_0_0/0.25)]">
        <div
          aria-hidden
          className="absolute top-1.5 left-1/2 z-10 h-3 w-1/3 -translate-x-1/2 rounded-full bg-ink ring-2 ring-surface-2/80"
        />
        <div className="relative aspect-[9/19.5] h-full overflow-hidden rounded-[1rem] bg-surface">
          <img
            src={card.image}
            alt={`${card.name} screenshot`}
            loading="lazy"
            decoding="async"
            className="size-full object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}

function ImageCard({ card, category }: { card: ShippedCard; category: string }) {
  const isPhone = category === "mobile-ios";

  if (isPhone) {
    return (
      <article className="group flex w-[130px] shrink-0 flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-line-strong sm:w-[220px] lg:w-[250px]">
        <PhoneScreenshot card={card} />
        <div className="flex flex-1 flex-col p-4">
          <h4 className="font-display text-base font-semibold text-ink">{card.name}</h4>
          <p className="mt-1 line-clamp-2 text-sm text-ink-muted">{card.desc}</p>
          <CardFooter card={card} />
        </div>
      </article>
    );
  }

  return (
    <article className="group flex w-[340px] shrink-0 flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-line-strong sm:w-[400px] lg:w-[460px]">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-2">
        <img
          src={card.image}
          alt={`${card.name} screenshot`}
          loading="lazy"
          decoding="async"
          className="size-full object-cover object-top"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h4 className="font-display text-base font-semibold text-ink">{card.name}</h4>
        <p className="mt-1 line-clamp-2 text-sm text-ink-muted">{card.desc}</p>
        <CardFooter card={card} />
      </div>
    </article>
  );
}

function LabelCard({ card, category }: { card: ShippedCard; category: string }) {
  const isPhone = category === "mobile-ios";
  return (
    <article
      className={`group relative flex shrink-0 flex-col overflow-hidden rounded-2xl border border-line bg-surface p-4 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong ${
        isPhone
          ? "w-[130px] sm:w-[220px] lg:w-[250px]"
          : "w-[340px] sm:w-[400px] lg:w-[460px]"
      } ${isPhone ? "aspect-[9/19.5]" : ""}`}
    >
      <div
        aria-hidden
        className="barcode-texture pointer-events-none absolute inset-y-0 right-0 w-16 text-ink"
      />
      <div className="relative flex flex-1 flex-col">
        <h4 className="font-display text-base font-semibold text-ink">{card.name}</h4>
        <p className="mt-1 line-clamp-2 text-sm text-ink-muted">{card.desc}</p>
        <CardFooter card={card} />
      </div>
    </article>
  );
}

function Card({ card, category }: { card: ShippedCard; category: string }) {
  return card.image ? (
    <ImageCard card={card} category={category} />
  ) : (
    <LabelCard card={card} category={category} />
  );
}

function CategoryRow({
  index,
  title,
  category,
  cards,
  reverse,
}: {
  index: number;
  title: string;
  category: string;
  cards: ShippedCard[];
  reverse?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeftRef.current = trackRef.current.scrollLeft;
    trackRef.current.style.cursor = "grabbing";
    trackRef.current.style.userSelect = "none";
  };

  const handleMouseUp = () => {
    if (!trackRef.current) return;
    isDraggingRef.current = false;
    trackRef.current.style.cursor = "grab";
    trackRef.current.style.userSelect = "";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 2;
    trackRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseLeave = () => {
    if (!trackRef.current) return;
    isDraggingRef.current = false;
    trackRef.current.style.cursor = "grab";
    trackRef.current.style.userSelect = "";
  };

  // Estimate the widest a card can realistically render (widest card width + gap),
  // then repeat the source list enough times so a single lap comfortably exceeds
  // even an ultra-wide viewport. That repeated list is then duplicated once more
  // so the CSS `-50%` translate loop always has a matching second half to hand
  // off to - this keeps the scroll seamless no matter how few cards a row has
  // or how wide the screen is (e.g. a 3-card row on a 4K monitor).
  const MAX_CARD_WIDTH_PX = 480;
  const SAFE_LAP_WIDTH_PX = 4200;
  const singleLapWidth = cards.length * MAX_CARD_WIDTH_PX;
  const repeatCount = Math.max(2, Math.ceil(SAFE_LAP_WIDTH_PX / singleLapWidth));
  const lap = Array.from({ length: repeatCount }, () => cards).flat();
  const doubled = [...lap, ...lap];

  // Fixed CSS animation durations assume a specific track length, so a longer
  // repeated track (rows with few cards) would otherwise scroll faster than a
  // row with many cards. Scale duration by lap width so every row moves at the
  // same, slow, comfortable px/sec speed regardless of how many times its card
  // list had to repeat for loop-safety.
  const PX_PER_SECOND = 40;
  const lapWidth = repeatCount * singleLapWidth;
  const durationSeconds = Math.max(20, Math.round(lapWidth / PX_PER_SECOND));

  return (
    <div>
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-5 sm:px-8">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent-blue text-xs font-semibold text-primary-foreground">
          {String(index).padStart(2, "0")}
        </span>
        <h3 className="font-display text-lg font-bold text-ink sm:text-xl">{title}</h3>
      </div>

      <div 
        ref={trackRef}
        className="marquee-row group relative mt-5 overflow-x-auto overflow-y-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={`${reverse ? "marquee-track-reverse" : "marquee-track"} gap-4 group-hover:[animation-play-state:paused]`}
          style={{ animationDuration: `${durationSeconds}s` }}
        >
          {doubled.map((card, i) => (
            <div key={card.name + i} className="mr-4 last:mr-0">
              <Card card={card} category={category} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ShippedCarousel() {
  return (
    <section id="work" className="scroll-mt-24 pt-16 pb-28 sm:pt-20 lg:pt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-accent-blue" aria-hidden />
            Selected Work
          </p>
          <h2 className="mt-4 text-4xl sm:text-5xl">Products We&apos;ve Shipped</h2>
          <p className="mt-4 text-base text-ink-muted sm:text-lg">
            Live apps and platforms across mobile, web, and portfolio work - real links, real
            users.
          </p>
        </Reveal>

        <div className="mt-6 flex items-center gap-3 border-t border-line pt-4 text-[0.6875rem] tracking-[0.08em] text-ink-dim">
          <span>MANIFEST</span>
          <span className="text-line-strong">/</span>
          <span>{shippedCategories.length} CATEGORIES</span>
          <span className="text-line-strong">/</span>
          <span>
            {shippedCategories.reduce((sum, c) => sum + c.cards.length, 0)} PRODUCTS
          </span>
        </div>
      </div>

      <div className="mt-12 space-y-14">
        {shippedCategories.map((category, i) => (
          <CategoryRow
            key={category.slug}
            index={i + 1}
            title={category.title}
            category={category.slug}
            cards={category.cards}
            reverse={i % 2 === 1}
          />
        ))}
      </div>
    </section>
  );
}

"use client";

import { Quote } from "lucide-react";
import { Reveal } from "./motion-primitives";

const dallasKrueger = "/assets/testimonials/dallas-krueger.webp";
const michael = "/assets/testimonials/michael.webp";
const mohitKalra = "/assets/testimonials/mohit-kalra.webp";
const sumitKumar = "/assets/testimonials/sumit-kumar.jpg";
const rohitKulthia = "/assets/testimonials/rohit-kulthia.jpg";
const ankurWalia = "/assets/testimonials/ankur-walia.png";
const vineetPatidar = "/assets/testimonials/vineet-patidar.png";
const sanjayMorya = "/assets/testimonials/sanjay-morya.png";
const srikumarPandit = "/assets/testimonials/srikumar-pandit.jpg";
const nidhiPandey = "/assets/testimonials/nidhi-pandey.jpg";
const sonalBhagria = "/assets/testimonials/sonal-bhagria.jpg";
const saritaMall = "/assets/testimonials/sarita-mall.png";
const anshulSinghal = "/assets/testimonials/anshul-singhal.jpg";
const akhileshSharma = "/assets/testimonials/akhilesh-sharma.jpg";
const nishuArora = "/assets/testimonials/nishu-arora.jpg";
const ramanSingh = "/assets/testimonials/raman-singh.jpg";
const ranjeetaKoul = "/assets/testimonials/ranjeeta-koul.jpg";

type Testimonial = {
  quote: string;
  name: string;
  avatar?: string;
};

const quotes: Testimonial[] = [
  {
    quote:
      "My experience has been great working with Appcraft Technology. Their team is highly skilled in developing end-to-end solutions for web and mobile platforms.",
    name: "Dallas Krueger",
    avatar: dallasKrueger,
  },
  {
    quote:
      "It has been great experience working with your guys. You made my website, mobile app and Facebook app without any hassle to me. I am so impressed by your services.",
    name: "Mohit Kalra",
    avatar: mohitKalra,
  },
  {
    quote:
      "Thank you for making such a great product for us! I am so pleased with the quality of YouPoll app. Your expertise in mobile domain is great! I will refer everyone I know.",
    name: "Michael",
    avatar: michael,
  },
  {
    quote:
      "What I found particularly valuable was the range of technical knowledge. Being comfortable across mobile, server technologies, automation, and multiple programming languages makes for a very versatile engineering environment.",
    name: "Sumit Kumar",
    avatar: sumitKumar,
  },
  {
    quote:
      "The strongest impression I had was the originality of the design thinking. There was a real ability to imagine concepts from scratch and turn them into distinctive visual work.",
    name: "Rohit Kulthia",
    avatar: rohitKulthia,
  },
  {
    quote:
      "The quality of bug reporting made a real difference. Clear, reproducible steps meant issues could be understood quickly and fixed without unnecessary back-and-forth.",
    name: "Ankur Walia",
    avatar: ankurWalia,
  },
  {
    quote:
      "I really valued the freedom to experiment. Having room to try different approaches, while still knowing that support was available when needed, created a good balance.",
    name: "Anshul Singhal",
    avatar: anshulSinghal,
  },
  {
    quote:
      "What impressed me most was the technical flexibility. He could move between programming languages without hesitation, while still maintaining a strong focus on logic and getting things right.",
    name: "Raman Singh",
    avatar: ramanSingh,
  },
  {
    quote:
      "The people I worked with brought a great energy to the workplace. There was always a positive attitude, and working together felt easy and enjoyable.",
    name: "Nishu Arora",
    avatar: nishuArora,
  },
  {
    quote:
      "Once he decided to take something on, there was no leaving it unfinished. That persistence was one of the qualities I respected most.",
    name: "Akhilesh Sharma",
    avatar: akhileshSharma,
  },
  {
    quote:
      "What I found particularly valuable was the range of technical knowledge. Being comfortable across mobile, server technologies, automation, and multiple programming languages makes for a very versatile engineering environment.",
    name: "Vineet Patidar",
    avatar: vineetPatidar,
  },
  {
    quote:
      "There's a genuine willingness to take on difficult technical challenges. Instead of avoiding unfamiliar problems, the approach is to understand them and work towards a solution.",
    name: "Sanjay Morya",
    avatar: sanjayMorya,
  },
  {
    quote:
      "The learning culture stood out to me. New technologies and changes were approached systematically, with well-organized sessions that helped people actually understand and apply what they were learning.",
    name: "Srikumar Pandit",
    avatar: srikumarPandit,
  },
  {
    quote:
      "I appreciated the consistency in the quality of the work. Things were handled professionally and delivered within the expected timelines without compromising on standards.",
    name: "Nidhi Pandey",
    avatar: nidhiPandey,
  },
  {
    quote:
      "The design work always had a strong sense of visual thinking behind it. I particularly appreciated the ability to come up with original concepts rather than relying on predictable solutions.",
    name: "Sonal Bhagria",
    avatar: sonalBhagria,
  },
  {
    quote:
      "What stood out to me was the ability to remain calm when the workload increased. Even during demanding periods, things were approached with a level-headed and professional attitude.",
    name: "Sarita Mall",
    avatar: saritaMall,
  },
  {
    quote:
      "I appreciated the combination of professional expertise and a considerate approach to people. It made collaboration comfortable while still keeping things focused and productive.",
    name: "Ranjeeta Koul",
    avatar: ranjeetaKoul,
  },
];

function InitialAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <span
      aria-hidden="true"
      className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent-blue/10 font-display text-sm font-bold text-accent-blue ring-1 ring-accent-blue/20"
    >
      {initials}
    </span>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-[320px] w-[300px] shrink-0 flex-col rounded-2xl border border-line bg-surface p-6 sm:w-[390px]">
      <Quote aria-hidden="true" className="size-6 text-accent-blue" strokeWidth={1.8} />
      <blockquote className="mt-4 line-clamp-6 text-[0.9375rem] leading-6 text-ink-muted">
        {testimonial.quote}
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-3 border-t border-line pt-4">
        {testimonial.avatar ? (
          <img
            src={testimonial.avatar}
            alt=""
            width={48}
            height={48}
            decoding="async"
            className="size-12 shrink-0 rounded-full object-cover ring-1 ring-line"
          />
        ) : (
          <InitialAvatar name={testimonial.name} />
        )}
        <div className="min-w-0">
          <p className="truncate font-display text-base font-bold text-ink">{testimonial.name}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const repeatedQuotes = [...quotes, ...quotes];

  return (
    <section aria-labelledby="testimonials-heading" className="overflow-hidden py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <h2 id="testimonials-heading" className="text-4xl sm:text-5xl">
            What Partners Say
          </h2>
          <p className="mt-4 text-base text-ink-muted sm:text-lg">
            Client feedback and leadership recommendations from people who have worked with
            AppCraft Technology and its team.
          </p>
        </Reveal>
      </div>

      <div className="marquee-row mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <div className="testimonial-marquee-track flex w-max gap-4 px-2 hover:[animation-play-state:paused]">
          {repeatedQuotes.map((testimonial, index) => (
            <TestimonialCard key={`${testimonial.name}-${index}`} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

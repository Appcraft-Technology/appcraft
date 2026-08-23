"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, Linkedin, Loader2, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "./motion-primitives";
import { BookCall } from "./book-call";
import { trackEvent } from "@/lib/analytics";

const bullets = [
  {
    title: "Production-First",
    body: "We ship to the App Store and Play Store, not Figma prototypes.",
  },
  {
    title: "Senior-Only Team",
    body: "Every system is architected by engineers with 15+ years of shipped experience.",
  },
  {
    title: "End-to-End",
    body: "Mobile, web, backend, and cloud infrastructure under one roof.",
  },
];

const projectTypes = ["Mobile App", "Web App", "Both", "Other"] as const;
const budgets = ["$10k-$25k", "$25k-$50k", "$50k-$100k", "$100k+", "Not Sure"] as const;

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Please enter your full name." })
    .max(100, { message: "Name must be under 100 characters." }),
  email: z
    .string()
    .trim()
    .email({ message: "Enter a valid work email address." })
    .max(255, { message: "Email must be under 255 characters." }),
  company: z
    .string()
    .trim()
    .max(120, { message: "Company must be under 120 characters." })
    .optional(),
  projectType: z.enum(projectTypes, { errorMap: () => ({ message: "Select a project type." }) }),
  budget: z.enum(budgets, { errorMap: () => ({ message: "Select an estimated budget." }) }),
  message: z
    .string()
    .trim()
    .min(20, { message: "Tell us a bit more - at least 20 characters." })
    .max(1000, { message: "Message must be under 1000 characters." }),
});

type FormValues = z.infer<typeof schema>;

const fieldBase =
  "w-full rounded-xl border bg-surface/70 px-4 py-3 text-sm text-ink placeholder:text-ink-dim focus:outline-none focus:ring-2 transition-colors";
const fieldOk = "border-line focus:border-accent-blue focus:ring-accent-blue/30";
const fieldBad = "border-destructive focus:border-destructive focus:ring-destructive/30";

function fieldClass(invalid: boolean, extra = "") {
  return `${fieldBase} ${invalid ? fieldBad : fieldOk} ${extra}`;
}

function FieldError({ id, message }: { id: string; message?: string | undefined }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-xs text-destructive">
      {message}
    </p>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    } as Partial<FormValues> as FormValues,
  });

  const messageLength = watch("message")?.length ?? 0;

  async function onSubmit(values: FormValues) {
    await new Promise((r) => setTimeout(r, 600));

    trackEvent("contact_form_submit", {
      project_type: values.projectType,
      budget: values.budget,
      has_company: Boolean(values.company),
    });

    setSent(true);
    reset();
    toast.success("Message sent", {
      description: "We'll respond within 24 hours with a technical assessment.",
    });
  }

  function onInvalid(fieldErrors: Record<string, unknown>) {
    trackEvent("contact_form_error", { field_count: Object.keys(fieldErrors).length });
  }

  return (
    <section
      id="contact"
      className="scroll-mt-24 py-28"
      style={{ background: "var(--gradient-cta)" }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Start Your Project</p>
          <h2 className="mt-4 text-4xl sm:text-5xl">Ready to Ship?</h2>
          <p className="mt-4 text-base text-ink-muted sm:text-lg">
            Tell us what you're building. We'll respond within 24 hours with a technical assessment.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="mt-12">
          <BookCall />
        </Reveal>

        <div className="mx-auto mt-12 flex max-w-2xl items-center gap-4">
          <span className="h-px flex-1 bg-line" />
          <span className="eyebrow whitespace-nowrap">Fill a form</span>
          <span className="h-px flex-1 bg-line" />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal className="rounded-2xl glass-card p-6 sm:p-8">
            {sent ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <span className="inline-flex size-14 items-center justify-center rounded-full bg-accent-emerald/15 text-accent-emerald">
                  <Check className="size-7" />
                </span>
                <h3 className="mt-6 text-2xl">Request received</h3>
                <p className="mt-3 max-w-sm text-sm text-ink-muted">
                  Thanks for reaching out. A senior engineer will reply within 24 hours with a
                  technical assessment and next steps.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-8 inline-flex min-h-11 items-center rounded-full border border-line px-5 text-sm text-ink-muted transition-colors hover:border-line-strong hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                noValidate
                onSubmit={handleSubmit(onSubmit, onInvalid)}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2"
              >
                <div>
                  <label htmlFor="cf-name" className="sr-only">
                    Full name
                  </label>
                  <input
                    id="cf-name"
                    placeholder="Full Name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "cf-name-error" : undefined}
                    className={fieldClass(Boolean(errors.name))}
                    {...register("name")}
                  />
                  <FieldError id="cf-name-error" message={errors.name?.message} />
                </div>

                <div>
                  <label htmlFor="cf-email" className="sr-only">
                    Work email
                  </label>
                  <input
                    id="cf-email"
                    type="email"
                    placeholder="Work Email"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "cf-email-error" : undefined}
                    className={fieldClass(Boolean(errors.email))}
                    {...register("email")}
                  />
                  <FieldError id="cf-email-error" message={errors.email?.message} />
                </div>

                <div>
                  <label htmlFor="cf-company" className="sr-only">
                    Company name
                  </label>
                  <input
                    id="cf-company"
                    placeholder="Company Name (optional)"
                    aria-invalid={Boolean(errors.company)}
                    aria-describedby={errors.company ? "cf-company-error" : undefined}
                    className={fieldClass(Boolean(errors.company))}
                    {...register("company")}
                  />
                  <FieldError id="cf-company-error" message={errors.company?.message} />
                </div>

                <div>
                  <label htmlFor="cf-type" className="sr-only">
                    Project type
                  </label>
                  <select
                    id="cf-type"
                    defaultValue=""
                    aria-invalid={Boolean(errors.projectType)}
                    aria-describedby={errors.projectType ? "cf-type-error" : undefined}
                    className={fieldClass(Boolean(errors.projectType))}
                    {...register("projectType")}
                  >
                    <option value="" disabled>
                      Project Type
                    </option>
                    {projectTypes.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                  <FieldError id="cf-type-error" message={errors.projectType?.message} />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="cf-budget" className="sr-only">
                    Estimated budget
                  </label>
                  <select
                    id="cf-budget"
                    defaultValue=""
                    aria-invalid={Boolean(errors.budget)}
                    aria-describedby={errors.budget ? "cf-budget-error" : undefined}
                    className={fieldClass(Boolean(errors.budget))}
                    {...register("budget")}
                  >
                    <option value="" disabled>
                      Estimated Budget
                    </option>
                    {budgets.map((b) => (
                      <option key={b}>{b}</option>
                    ))}
                  </select>
                  <FieldError id="cf-budget-error" message={errors.budget?.message} />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="cf-message" className="sr-only">
                    Message
                  </label>
                  <textarea
                    id="cf-message"
                    rows={5}
                    maxLength={1000}
                    placeholder="What are you building?"
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "cf-message-error" : "cf-message-count"}
                    className={fieldClass(Boolean(errors.message))}
                    {...register("message")}
                  />
                  <div className="mt-1.5 flex items-start justify-between gap-4">
                    <FieldError id="cf-message-error" message={errors.message?.message} />
                    <span id="cf-message-count" className="ml-auto text-xs text-ink-dim">
                      {messageLength}/1000
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary py-3.5 font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition-transform duration-200 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100 sm:col-span-2"
                >
                  {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
            <p className="mt-5 text-sm text-ink-muted">
              Prefer email?{" "}
              <a href="mailto:hello@appcraft.in" className="text-accent-blue hover:underline">
                hello@appcraft.in
              </a>
            </p>
          </Reveal>

          <Reveal delay={0.1} className="rounded-2xl glass-card p-6 sm:p-8">
            <h3 className="text-2xl">How We're Different</h3>
            <ul className="mt-6 space-y-5">
              {bullets.map((b) => (
                <li key={b.title} className="flex gap-3 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent-emerald" />
                  <span>
                    <span className="block font-medium text-ink">{b.title}</span>
                    <span className="mt-1 block text-ink-muted">{b.body}</span>
                  </span>
                </li>
              ))}
            </ul>
            <hr className="my-8 border-line" />
            <p className="flex items-start gap-3 text-sm text-ink-muted">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent-blue" />
              New Delhi, India - serving USA, Europe &amp; APAC
            </p>
            <a
              href="https://www.linkedin.com/in/dipakmishra/"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="AppCraft on LinkedIn"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
            >
              <Linkedin className="size-4" /> LinkedIn
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

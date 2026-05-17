import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  MessageCircle,
  Target,
  Zap,
} from "lucide-react";
import { SiteHeader } from "@/components/marketing/site-header";
import { Section } from "@/components/marketing/section";
import { FlatDecor } from "@/components/marketing/flat-decor";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IconWell } from "@/components/ui/icon-well";

const stats = [
  { label: "Jobs matched", value: "12k+", color: "text-primary" },
  { label: "Avg. response rate", value: "3.2×", color: "text-secondary" },
  { label: "Hours saved / week", value: "8+", color: "text-accent" },
  { label: "Active users", value: "2.4k", color: "text-foreground" },
];

const features = [
  {
    icon: Target,
    title: "Smart matching",
    description: "Kairos scores every role against your profile and surfaces only what fits.",
    tint: "tint-blue" as const,
    iconColor: "text-primary",
  },
  {
    icon: Zap,
    title: "Instant applications",
    description: "Tailored CVs and cover letters generated in seconds, not hours.",
    tint: "tint-emerald" as const,
    iconColor: "text-secondary",
  },
  {
    icon: MessageCircle,
    title: "Agent on your channel",
    description: "WhatsApp, Slack, or email — your career agent meets you where you are.",
    tint: "tint-amber" as const,
    iconColor: "text-accent",
  },
];

const steps = [
  { num: "01", title: "Tell Kairos who you are", desc: "Chat onboarding or upload your CV." },
  { num: "02", title: "Connect your sources", desc: "GitHub, Notion, Drive — keep your profile live." },
  { num: "03", title: "Let the agent work", desc: "Matches, applies, and updates you in real time." },
];

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Try Kairos with limited matches.",
    features: ["5 matches / week", "Chat onboarding", "Email alerts"],
    cta: "Get started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/mo",
    description: "Full agent for active job seekers.",
    features: ["Unlimited matches", "CV tailoring", "WhatsApp agent", "Priority support"],
    cta: "Start free trial",
    popular: true,
  },
  {
    name: "Team",
    price: "$99",
    period: "/mo",
    description: "For cohorts and career coaches.",
    features: ["Everything in Pro", "5 seats", "Shared pipeline", "Admin dashboard"],
    cta: "Contact us",
    popular: false,
  },
];

const faqs = [
  {
    q: "How does Kairos find jobs?",
    a: "We aggregate listings from major boards and company sites, then score each against your skills, experience, and preferences.",
  },
  {
    q: "Can I control what gets applied?",
    a: "Yes. You approve applications or set rules — auto-apply only above a match score you choose.",
  },
  {
    q: "Which channels are supported?",
    a: "WhatsApp, Telegram, Slack, Discord, and email. More coming soon.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <BenefitsSection />
      <HowItWorksSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </div>
  );
}

function HeroSection() {
  return (
    <div className="section-primary flat-decor relative">
      <FlatDecor />
      <SiteHeader inverted />
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-12 md:pb-32 md:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-on-primary/80">
              AI career agent
            </p>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-on-primary md:text-6xl">
              The right moment, applied.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-on-primary/80">
              Kairos finds roles, tailors your applications, and keeps you in the loop — so you focus on interviews, not spreadsheets.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-[var(--on-accent)] text-[var(--accent)] hover:bg-[var(--on-accent)]/90 border-transparent"
                asChild
              >
                <Link href="/login">
                  Sign in
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border border-[var(--on-accent)]/60 text-on-primary hover:bg-[var(--on-accent)]/10 hover:border-[var(--on-accent)]"
                asChild
              >
                <Link href="/onboarding">Get started free</Link>
              </Button>
            </div>
          </div>
          <div className="relative hidden h-80 lg:block" aria-hidden>
            <HeroIllustrationBlocks />
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroIllustrationBlocks() {
  return (
    <>
      <div className="absolute right-0 top-0 h-48 w-48 rounded-[16px] bg-[var(--on-accent)]/20" />
      <div className="absolute bottom-8 left-8 h-32 w-32 rounded-[16px] bg-[var(--on-accent)]/15" />
      <div className="absolute right-12 top-16 h-24 w-24 rotate-12 rounded-full bg-[var(--on-accent)]/10" />
      <div className="absolute left-1/2 top-1/2 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[16px] bg-[var(--on-accent)]">
        <Target className="h-16 w-16 text-[var(--accent)]" strokeWidth={2} />
      </div>
    </>
  );
}

function StatsSection() {
  return (
    <Section variant="default" className="py-12">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className={`text-3xl font-extrabold tracking-tight md:text-4xl ${s.color}`}>
              {s.value}
            </p>
            <p className="mt-1 text-sm font-medium uppercase tracking-wider text-muted-foreground">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function FeaturesSection() {
  return (
    <Section variant="muted" id="features">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          Built for momentum
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Everything you need to run a modern job search — without the busywork.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {features.map((f) => (
          <Card key={f.title} variant={f.tint} interactive className="p-8">
            <IconWell iconClassName={f.iconColor}>
              <f.icon className="h-6 w-6" strokeWidth={2.5} />
            </IconWell>
            <h3 className="mt-6 text-lg font-bold">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function BenefitsSection() {
  return (
    <Section variant="secondary">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <BenefitsText />
        <BenefitsVisual />
      </div>
    </Section>
  );
}

function BenefitsText() {
  return (
    <div>
      <h2 className="text-3xl font-extrabold tracking-tight text-on-primary md:text-4xl">
        Your profile stays sharp
      </h2>
      <p className="mt-4 text-lg text-on-primary/80">
        Connect GitHub, Notion, and Drive. Kairos keeps your skills and projects current so every application reflects the real you.
      </p>
      <ul className="mt-8 space-y-4">
        {["Auto-sync from connected sources", "Match scores you can trust", "One agent, every channel"].map(
          (item) => (
            <li key={item} className="flex items-center gap-3 text-on-primary">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--on-accent)]/20 text-sm font-bold">
                ✓
              </span>
              {item}
            </li>
          )
        )}
      </ul>
    </div>
  );
}

function BenefitsVisual() {
  return (
    <div className="relative h-64" aria-hidden>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-40 w-full max-w-sm rounded-[16px] bg-[var(--on-accent)]/20" />
      </div>
      <Briefcase className="absolute left-1/4 top-1/2 h-12 w-12 -translate-y-1/2 text-on-primary" strokeWidth={2} />
    </div>
  );
}

function HowItWorksSection() {
  return (
    <Section variant="dark" id="how-it-works">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          How it works
        </h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step) => (
          <div
            key={step.num}
            className="rounded-[16px] border border-border bg-[var(--bg-elevated)] p-8"
          >
            <span className="text-4xl font-extrabold text-muted-foreground/60">{step.num}</span>
            <h3 className="mt-4 text-lg font-bold text-foreground">{step.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function PricingSection() {
  return (
    <Section variant="default" id="pricing">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">Simple pricing</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Start free. Upgrade when you&apos;re ready to go all in.
        </p>
      </div>
      <div className="grid items-end gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={
              plan.popular
                ? "scale-105 rounded-[20px] bg-primary p-8 text-on-primary transition-all duration-200"
                : "rounded-[20px] border border-border bg-muted p-8 transition-all duration-200"
            }
          >
            {plan.popular && (
              <span className="mb-4 inline-block rounded-md bg-[var(--on-accent)]/20 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider">
                Popular
              </span>
            )}
            <h3 className="text-lg font-bold">{plan.name}</h3>
            <p className="mt-2 text-sm opacity-80">{plan.description}</p>
            <p className="mt-4 text-4xl font-extrabold">
              {plan.price}
              {plan.period && <span className="text-lg font-medium opacity-70">{plan.period}</span>}
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              {plan.features.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>
            <Button
              variant={plan.popular ? "secondary" : "outline"}
              className={`mt-8 w-full ${plan.popular ? "bg-[var(--on-accent)] text-[var(--accent)] hover:bg-[var(--on-accent)]/90 border-transparent" : ""}`}
              asChild
            >
              <Link href="/onboarding">{plan.cta}</Link>
            </Button>
          </div>
        ))}
      </div>
    </Section>
  );
}

function FaqSection() {
  return (
    <Section variant="muted" id="faq">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">FAQ</h2>
      </div>
      <div className="mx-auto max-w-2xl divide-y divide-border overflow-hidden rounded-[16px] border border-border bg-surface">
        {faqs.map((faq) => (
          <details key={faq.q} className="group px-6 py-4">
            <summary className="cursor-pointer list-none font-semibold">{faq.q}</summary>
            <p className="mt-2 text-sm text-muted-foreground">{faq.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}

function CtaSection() {
  return (
    <Section variant="accent">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-on-primary md:text-4xl">
          Ready to apply at the right moment?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-on-primary/90">
          Join thousands of job seekers using Kairos to move faster.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button
            size="lg"
            className="bg-[var(--on-accent)] text-[var(--warning)] hover:bg-[var(--on-accent)]/90 border-transparent"
            asChild
          >
            <Link href="/onboarding">Get started free</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border border-[var(--on-accent)]/60 text-on-primary hover:bg-[var(--on-accent)]/10 hover:border-[var(--on-accent)]"
            asChild
          >
            <Link href="/login">Sign in</Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-[var(--bg-elevated)] py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Kairos. All rights reserved.
          </p>
          <nav className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <Link href="/login" className="transition-colors hover:text-foreground">Sign in</Link>
            <Link href="/onboarding" className="transition-colors hover:text-foreground">Get started</Link>
            <Link href="/dashboard" className="transition-colors hover:text-foreground">Dashboard</Link>
            <Link href="/connectors" className="transition-colors hover:text-foreground">Connectors</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

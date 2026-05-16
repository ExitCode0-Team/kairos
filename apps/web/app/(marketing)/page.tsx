import Link from "next/link";
import { ArrowRight, BarChart3, Target, Zap } from "lucide-react";
import { SiteHeader } from "@/components/marketing/site-header";
import { Section } from "@/components/marketing/section";
import { HeroCareerMock } from "@/components/marketing/hero-career-mock";
import { TrustBadges } from "@/components/marketing/trust-badges";
import { LogoTicker } from "@/components/marketing/logo-ticker";
import { LiquidWave } from "@/components/marketing/liquid-wave";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";

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
    <div className="void-bg min-h-screen">
      <HeroSection />
      <LiquidWave />
      <TrustBadgesSection />
      <ProductProofSection />
      <HowItWorksSection />
      <LogoTicker />
      <PricingSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </div>
  );
}

function HeroSection() {
  return (
    <div className="liquid-hero relative">
      <SiteHeader />
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-16 pt-8 md:pb-20 md:pt-12">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-label-ai mb-4">Career intelligence</p>
            <h1 className="text-hero">The right moment, applied.</h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              Match scores, tailored CVs, and applications on your channel — timed for when roles are actually open.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/onboarding">
                  Start chatting free
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/dashboard">Open dashboard</Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <HeroCareerMock />
          </div>
        </div>
      </div>
    </div>
  );
}

function TrustBadgesSection() {
  return (
    <Section variant="default" className="py-10">
      <TrustBadges />
    </Section>
  );
}

function ProductProofSection() {
  return (
    <Section variant="surface" id="features">
      <div className="mb-12 text-center">
        <h2 className="text-h1">Apply with context</h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Scoring, recommendations, and pipeline — the same surfaces you use in the app.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <GlassCard tier={3} signal="blue" padding="lg">
          <Target className="mb-4 h-6 w-6 text-primary" strokeWidth={2} />
          <h3 className="text-lg font-semibold">Match score</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Every role scored against your live profile — gaps surfaced before you apply.
          </p>
          <p className="mt-4 text-3xl font-bold text-primary">94%</p>
          <p className="text-caption">Stripe · Senior Frontend</p>
        </GlassCard>
        <GlassCard tier={3} signal="green" padding="lg">
          <Zap className="mb-4 h-6 w-6 text-secondary" strokeWidth={2} />
          <h3 className="text-lg font-semibold">Job recommendation</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Proactive alerts when a role crosses your threshold — act on WhatsApp or web.
          </p>
          <Badge variant="proactive" className="mt-4">
            Apply now
          </Badge>
        </GlassCard>
        <GlassCard tier={3} padding="lg">
          <BarChart3 className="mb-4 h-6 w-6 text-foreground" strokeWidth={2} />
          <h3 className="text-lg font-semibold">Pipeline</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Track applications, interviews, and response rate in one calm view.
          </p>
          <p className="mt-4 text-3xl font-bold text-foreground">32%</p>
          <p className="text-caption">Response rate this month</p>
        </GlassCard>
      </div>
    </Section>
  );
}

function HowItWorksSection() {
  return (
    <Section variant="default" id="how-it-works" className="relative">
      <div className="mb-12 grid items-end gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-h1">How it works</h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Three steps from profile to applications — no busywork in between.
          </p>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step) => (
          <GlassCard key={step.num} tier={2} padding="lg">
            <span className="text-label">{step.num}</span>
            <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}

function PricingSection() {
  return (
    <Section variant="surface" id="pricing">
      <div className="mb-12 text-center">
        <h2 className="text-h1">Simple pricing</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Start free. Upgrade when you&apos;re ready to go all in.
        </p>
      </div>
      <div className="grid items-end gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <GlassCard
            key={plan.name}
            tier={3}
            padding="lg"
            className={plan.popular ? "scale-[1.02] ring-1 ring-secondary/40" : ""}
          >
            {plan.popular && (
              <Badge variant="proactive" className="mb-4">
                Popular
              </Badge>
            )}
            <h3 className="text-lg font-semibold">{plan.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
            <p className="mt-4 text-4xl font-bold">
              {plan.price}
              {plan.period && (
                <span className="text-lg font-medium text-muted-foreground">{plan.period}</span>
              )}
            </p>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              {plan.features.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>
            <Button variant={plan.popular ? "success" : "outline"} className="mt-8 w-full" asChild>
              <Link href="/onboarding">{plan.cta}</Link>
            </Button>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}

function FaqSection() {
  return (
    <Section variant="default" id="faq">
      <div className="mb-12 text-center">
        <h2 className="text-h1">FAQ</h2>
      </div>
      <div className="mx-auto max-w-2xl divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10">
        {faqs.map((faq) => (
          <details key={faq.q} className="group bg-surface px-6 py-4">
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
    <Section variant="default" className="relative py-24">
      <div className="signal-glow-blue -left-20 top-1/2 -translate-y-1/2" />
      <GlassCard tier={3} padding="lg" className="relative mx-auto max-w-2xl text-center">
        <h2 className="text-h1">Ready to apply at the right moment?</h2>
        <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
          Connect your profile, set your match threshold, and let Kairos handle the rest.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/onboarding">Start chatting free</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/login">Sign in</Link>
          </Button>
        </div>
      </GlassCard>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="section-surface border-t border-white/10 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Kairos. All rights reserved.
          </p>
          <nav className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <Link href="/login" className="hover:text-foreground">
              Sign in
            </Link>
            <Link href="/onboarding" className="text-secondary hover:text-secondary-hover">
              Get started
            </Link>
            <Link href="/dashboard" className="hover:text-foreground">
              Dashboard
            </Link>
            <Link href="/connectors" className="hover:text-foreground">
              Connectors
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

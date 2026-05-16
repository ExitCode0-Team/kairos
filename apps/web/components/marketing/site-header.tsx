import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export function SiteHeader({ inverted = false }: { inverted?: boolean }) {
  return (
    <header
      className={
        inverted
          ? "relative z-10 border-b border-white/20"
          : "relative z-10 border-b border-border bg-background"
      }
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/">
          <Logo inverted={inverted} />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className={cnNavLink(inverted)}
          >
            Features
          </a>
          <a href="#how-it-works" className={cnNavLink(inverted)}>
            How it works
          </a>
          <a href="#pricing" className={cnNavLink(inverted)}>
            Pricing
          </a>
          <a href="#faq" className={cnNavLink(inverted)}>
            FAQ
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <Button
            variant={inverted ? "secondary" : "ghost"}
            size="sm"
            className={inverted ? "bg-white/20 text-white hover:bg-white/30" : ""}
            asChild
          >
            <Link href="/login">Sign in</Link>
          </Button>
          <Button
            variant={inverted ? "secondary" : "default"}
            size="sm"
            className={inverted ? "bg-white text-primary hover:bg-white/90" : ""}
            asChild
          >
            <Link href="/onboarding">Get started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

function cnNavLink(inverted: boolean) {
  return inverted
    ? "text-sm font-medium text-white/90 hover:text-white"
    : "text-sm font-medium text-muted-foreground hover:text-foreground";
}
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteHeader({ inverted = false }: { inverted?: boolean }) {
  return (
    <header
      className={
        inverted
          ? "relative z-10 border-b border-[var(--on-accent)]/15"
          : "relative z-10 border-b border-border bg-background"
      }
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/">
          <Logo inverted={inverted} />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#features" className={navLink(inverted)}>
            Features
          </a>
          <a href="#how-it-works" className={navLink(inverted)}>
            How it works
          </a>
          <a href="#pricing" className={navLink(inverted)}>
            Pricing
          </a>
          <a href="#faq" className={navLink(inverted)}>
            FAQ
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <Button
            variant={inverted ? "secondary" : "ghost"}
            size="sm"
            className={
              inverted
                ? "bg-[var(--on-accent)]/15 text-on-primary border-transparent hover:bg-[var(--on-accent)]/25"
                : ""
            }
            asChild
          >
            <Link href="/login">Sign in</Link>
          </Button>
          <Button
            variant={inverted ? "secondary" : "default"}
            size="sm"
            className={
              inverted
                ? "bg-[var(--on-accent)] text-[var(--accent)] border-transparent hover:bg-[var(--on-accent)]/90"
                : ""
            }
            asChild
          >
            <Link href="/onboarding">Get started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

function navLink(inverted: boolean) {
  return cn(
    "text-sm font-medium transition-colors",
    inverted
      ? "text-on-primary/85 hover:text-on-primary"
      : "text-muted-foreground hover:text-foreground"
  );
}

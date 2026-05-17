import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { FlatDecor } from "@/components/flat-decor";

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <div className="relative hidden w-1/2 flex-col justify-between section-primary p-12 lg:flex">
        <FlatDecor />
        <Link href="/dashboard">
          <Logo inverted />
        </Link>
        <div className="relative z-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-on-primary">
            The right moment, applied.
          </h1>
          <p className="mt-4 max-w-md text-lg text-on-primary/80">
            Your AI career agent finds matches, tailors applications, and keeps you in the loop.
          </p>
        </div>
        <p className="relative z-10 text-sm text-on-primary/60">© Kairos</p>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background p-6">
        <div className="w-full max-w-[400px]">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

function LoginForm() {
  return (
    <>
      <div className="mb-8 lg:hidden">
        <Link href="/dashboard">
          <Logo />
        </Link>
      </div>
      <div className="rounded-lg p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Sign in</h2>
          <p className="mt-1 text-sm text-muted-foreground">Continue to your account</p>
        </div>
        <div className="space-y-3">
          <Button variant="secondary" className="w-full justify-center" asChild>
            <Link href="/onboarding">
              <GoogleIcon />
              Continue with Google
            </Link>
          </Button>
          <Button variant="secondary" className="w-full justify-center" asChild>
            <Link href="/onboarding">
              <AppleIcon />
              Continue with Apple
            </Link>
          </Button>
          <p className="py-2 text-center text-xs uppercase tracking-wider text-muted-foreground">or</p>
          <Button variant="secondary" className="w-full justify-center" asChild>
            <Link href="/onboarding">
              <MailIcon />
              Continue with email
            </Link>
          </Button>
        </div>
      </div>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/onboarding" className="font-semibold text-primary hover:text-primary-hover">
          Get started
        </Link>
      </p>
    </>
  );
}

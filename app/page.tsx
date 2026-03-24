import Link from "next/link";
import {
  ArrowRight,
  Clock,
  MapPin,
  ShieldCheck,
  Star,
  Truck,
  UtensilsCrossed,
  Zap,
  ChefHat,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ─────────────────────────────────────────────
   Landing Page
───────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground antialiased">

      {/* ── Sticky Nav ── */}
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 font-black text-xl tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <UtensilsCrossed className="h-4 w-4 text-white" />
            </span>
            QuickBite
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground sm:flex">
            <Link href="#how-it-works" className="hover:text-foreground transition-colors duration-150">How it works</Link>
            <Link href="#features" className="hover:text-foreground transition-colors duration-150">Features</Link>
            <Link href="/register/driver" className="hover:text-foreground transition-colors duration-150">Drive with us</Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex font-semibold">
              <Link href="/login">Login</Link>
            </Button>
            <Button size="sm" asChild className="rounded-full px-5 font-bold shadow-sm">
              <Link href="/register/customer">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">

        {/* ══════════════════════════════════════════
            HERO
        ══════════════════════════════════════════ */}
        <section className="relative overflow-hidden">

          {/* Background blobs */}
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            {/* large warm blob top-right */}
            <div className="absolute -right-32 -top-32 h-[560px] w-[560px] rounded-full bg-primary/20 blur-[120px]" />
            {/* small accent blob bottom-left */}
            <div className="absolute -bottom-20 -left-20 h-[360px] w-[360px] rounded-full bg-orange-300/20 blur-[100px]" />
            {/* subtle grid */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(to right,currentColor 1px,transparent 1px),linear-gradient(to bottom,currentColor 1px,transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 pt-24 pb-20 text-center sm:px-6 sm:pt-32 sm:pb-28">

            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/8 px-4 py-1.5 text-xs font-bold tracking-widest text-primary uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Now live in your city
            </div>

            {/* Headline */}
            <h1 className="max-w-4xl text-5xl font-black leading-[1.08] tracking-tight sm:text-7xl">
              Hungry?{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-primary">Great food</span>
                {/* underline squiggle */}
                <svg
                  aria-hidden
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 9 C50 3, 100 11, 150 6 S250 2, 298 8"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    className="text-primary/40"
                  />
                </svg>
              </span>
              <br />
              at your door in minutes.
            </h1>

            {/* Sub */}
            <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
              Order from hundreds of local restaurants. Real-time tracking, lightning-fast drivers, and zero hassle.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <Button
                size="lg"
                asChild
                className="h-14 rounded-full px-10 text-base font-black shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow"
              >
                <Link href="/register/customer">
                  Order Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-14 rounded-full px-10 text-base font-bold border-2 hover:bg-muted/60"
              >
                <Link href="/login">Sign in to your account</Link>
              </Button>
            </div>

            {/* Trust chips */}
            <div className="mt-2 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              {[
                { icon: Star, label: "4.9 / 5 rating", color: "text-yellow-500", fill: true },
                { icon: Truck, label: "~28 min avg delivery", color: "text-primary", fill: false },
                { icon: ShieldCheck, label: "Secure & encrypted", color: "text-primary", fill: false },
                { icon: Zap, label: "Instant driver assign", color: "text-primary", fill: false },
              ].map(({ icon: Icon, label, color, fill }) => (
                <span key={label} className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1">
                  <Icon className={`h-3.5 w-3.5 ${color} ${fill ? "fill-yellow-500" : ""}`} />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            STATS BAR
        ══════════════════════════════════════════ */}
        <div className="border-y bg-muted/50">
          <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-border sm:grid-cols-4">
            {[
              { value: "50k+", label: "Happy customers" },
              { value: "200+", label: "Restaurants" },
              { value: "28 min", label: "Avg delivery time" },
              { value: "4.9★", label: "Average rating" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center gap-0.5 px-6 py-8 text-center">
                <span className="text-3xl font-black text-foreground">{value}</span>
                <span className="text-sm text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════
            HOW IT WORKS
        ══════════════════════════════════════════ */}
        <section id="how-it-works" className="py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">

            <div className="mb-16 text-center">
              <p className="mb-2 text-xs font-bold tracking-widest text-primary uppercase">Simple process</p>
              <h2 className="text-4xl font-black tracking-tight">From craving to doorstep</h2>
              <p className="mt-3 text-muted-foreground">Three steps is all it takes</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {[
                {
                  step: "01",
                  icon: MapPin,
                  title: "Browse restaurants",
                  body: "Filter by cuisine, rating, or delivery time. Find exactly what you're in the mood for.",
                  accent: "bg-orange-50 dark:bg-orange-950/30",
                },
                {
                  step: "02",
                  icon: ChefHat,
                  title: "Build your order",
                  body: "Pick from full menus, add items to cart, and check out in seconds.",
                  accent: "bg-primary/5",
                },
                {
                  step: "03",
                  icon: Truck,
                  title: "Sit back & enjoy",
                  body: "A driver is assigned instantly. Watch your delivery in real time.",
                  accent: "bg-amber-50 dark:bg-amber-950/30",
                },
              ].map(({ step, icon: Icon, title, body, accent }, idx) => (
                <div key={step} className={`relative rounded-3xl ${accent} p-8`}>
                  {/* Connector line (desktop) */}
                  {idx < 2 && (
                    <div
                      aria-hidden
                      className="absolute -right-3 top-1/2 hidden h-px w-6 bg-border sm:block"
                    />
                  )}
                  <div className="mb-6 flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-md shadow-primary/30">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-4xl font-black text-foreground/10">{step}</span>
                  </div>
                  <h3 className="mb-2 text-lg font-bold">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            FEATURES
        ══════════════════════════════════════════ */}
        <section id="features" className="border-t py-24 bg-muted/30">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">

            <div className="mb-16 text-center">
              <p className="mb-2 text-xs font-bold tracking-widest text-primary uppercase">Why QuickBite</p>
              <h2 className="text-4xl font-black tracking-tight">Built for everyone</h2>
              <p className="mt-3 text-muted-foreground">Customers, drivers, and restaurants — we have you covered</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Clock,        title: "Real-time tracking",    body: "See your driver's live location from the moment they pick up your order.", highlight: true },
                { icon: ShieldCheck,  title: "Secure payments",       body: "End-to-end encryption. Your card and personal data are never stored on our servers.", highlight: false },
                { icon: Star,         title: "Curated restaurants",   body: "Every partner restaurant is vetted for food quality, hygiene, and service standards.", highlight: false },
                { icon: Zap,          title: "Instant driver match",  body: "Our algorithm assigns the nearest available driver the moment you place an order.", highlight: false },
                { icon: UtensilsCrossed, title: "Huge variety",       body: "Street food, sushi, burgers, fine dining — thousands of dishes across every cuisine.", highlight: false },
                { icon: BadgeCheck,   title: "Satisfaction guarantee",body: "Something wrong? Our support team resolves issues within the hour, every time.", highlight: false },
              ].map(({ icon: Icon, title, body, highlight }) => (
                <div
                  key={title}
                  className={`group flex flex-col gap-4 rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
                    highlight
                      ? "border-primary/40 bg-primary/5 shadow-sm shadow-primary/10"
                      : "bg-background hover:border-primary/30"
                  }`}
                >
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${
                    highlight ? "bg-primary text-white" : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold">{title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
                  </div>
                  {highlight && (
                    <span className="mt-auto inline-flex w-fit items-center gap-1 rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-semibold text-primary">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Most popular
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            CTA SECTION
        ══════════════════════════════════════════ */}
        <section className="relative overflow-hidden py-28">

          {/* Background */}
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-primary" />
            {/* dark texture overlay */}
            <div className="absolute inset-0 bg-black/10" />
            {/* glow blobs */}
            <div className="absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-white/10 blur-[80px]" />
            <div className="absolute -bottom-24 right-1/4 h-80 w-80 rounded-full bg-black/20 blur-[80px]" />
            {/* dot grid */}
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
          </div>

          <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 px-4 text-center sm:px-6">

            {/* Icon */}
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur ring-1 ring-white/20">
              <UtensilsCrossed className="h-7 w-7 text-white" />
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                Your next great meal<br />is one tap away.
              </h2>
              <p className="text-lg text-white/70">
                Join over 50,000 customers already using QuickBite. Free to sign up. No hidden fees.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <Button
                size="lg"
                asChild
                className="h-14 rounded-full bg-white px-10 text-base font-black text-primary shadow-xl hover:bg-white/90 transition-colors"
              >
                <Link href="/register/customer">
                  Create free account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="ghost"
                asChild
                className="h-14 rounded-full px-10 text-base font-bold text-white hover:bg-white/15 border border-white/25"
              >
                <Link href="/login">Sign in</Link>
              </Button>
            </div>

            {/* Micro trust line */}
            <p className="flex items-center gap-2 text-sm text-white/60">
              <ShieldCheck className="h-4 w-4" />
              No credit card required · Cancel anytime · 100% free to join
            </p>

            {/* Roles */}
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              {[
                { label: "For Customers", href: "/register/customer", sub: "Order food" },
                { label: "For Drivers", href: "/register/driver", sub: "Earn money" },
              ].map(({ label, href, sub }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex flex-col items-start gap-0.5 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-left backdrop-blur transition-colors hover:bg-white/20"
                >
                  <span className="text-sm font-bold text-white">{label}</span>
                  <span className="text-xs text-white/60">{sub}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="border-t bg-background">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">

            {/* Brand */}
            <div className="flex flex-col gap-2">
              <Link href="/" className="flex items-center gap-2 font-black text-lg tracking-tight">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
                  <UtensilsCrossed className="h-3.5 w-3.5 text-white" />
                </span>
                QuickBite
              </Link>
              <p className="max-w-xs text-sm text-muted-foreground">
                Fast, fresh, and reliable food delivery — right to your door.
              </p>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-x-12 gap-y-6 text-sm">
              <div className="flex flex-col gap-2">
                <span className="font-bold text-foreground">Platform</span>
                <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">Login</Link>
                <Link href="/register/customer" className="text-muted-foreground hover:text-foreground transition-colors">Sign Up</Link>
                <Link href="/register/driver" className="text-muted-foreground hover:text-foreground transition-colors">Drive with us</Link>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-bold text-foreground">Legal</span>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t pt-6 text-xs text-muted-foreground sm:flex-row">
            <span>&copy; {new Date().getFullYear()} QuickBite. All rights reserved.</span>
            <span>Made with ❤️ for food lovers everywhere.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

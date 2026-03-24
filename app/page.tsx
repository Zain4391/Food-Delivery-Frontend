import Link from "next/link";
import { ArrowRight, Clock, MapPin, ShieldCheck, Star, Truck, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* ── Nav ── */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 font-black text-lg tracking-tight">
            <UtensilsCrossed className="h-5 w-5 text-primary" />
            <span>QuickBite</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground sm:flex">
            <Link href="#how-it-works" className="hover:text-foreground transition-colors">How it works</Link>
            <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
            <Link href="/login" className="hover:text-foreground transition-colors">Login</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/register/customer">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* ── Hero ── */}
        <section className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-24 text-center sm:px-6 sm:py-32">
          <Badge variant="secondary" className="rounded-full px-4 py-1 text-xs font-semibold">
            Fast · Fresh · Reliable
          </Badge>
          <h1 className="max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">
            Great food,{" "}
            <span className="text-primary">delivered fast</span>
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            Order from the best local restaurants and get your meal delivered to your door in minutes. No fuss, no wait.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild className="rounded-full px-8">
              <Link href="/register/customer">
                Order Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-full px-8">
              <Link href="/register/driver">Become a Driver</Link>
            </Button>
          </div>
          <div className="mt-4 flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> 4.9 / 5 rating</span>
            <span className="flex items-center gap-1.5"><Truck className="h-4 w-4 text-primary" /> 30 min avg. delivery</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-primary" /> Secure checkout</span>
          </div>
        </section>

        {/* ── How it works ── */}
        <section id="how-it-works" className="border-y bg-muted/40 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-black tracking-tight">How it works</h2>
              <p className="mt-2 text-muted-foreground">Three simple steps to your next favourite meal</p>
            </div>
            <div className="grid gap-8 sm:grid-cols-3">
              {[
                { step: "01", icon: MapPin, title: "Choose a restaurant", body: "Browse hundreds of local restaurants and filter by cuisine, rating, or delivery time." },
                { step: "02", icon: UtensilsCrossed, title: "Pick your meal", body: "Select from full menus, customise your order, and add everything to your cart." },
                { step: "03", icon: Truck, title: "Sit back & enjoy", body: "We assign a driver instantly. Track your order live and receive it fresh at your door." },
              ].map(({ step, icon: Icon, title, body }) => (
                <div key={step} className="flex flex-col items-center gap-4 rounded-2xl bg-background p-8 text-center shadow-sm">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xs font-bold tracking-widest text-muted-foreground">{step}</span>
                  <h3 className="text-lg font-bold">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section id="features" className="py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-black tracking-tight">Everything you need</h2>
              <p className="mt-2 text-muted-foreground">Built for customers, drivers, and restaurants alike</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Clock, title: "Real-time tracking", body: "Know exactly where your order is at every step of the journey." },
                { icon: ShieldCheck, title: "Secure payments", body: "Your payment and personal data are always encrypted and protected." },
                { icon: Star, title: "Curated restaurants", body: "Every restaurant on our platform is vetted for quality and hygiene." },
                { icon: Truck, title: "Fast delivery", body: "Our driver network ensures the shortest possible route to your door." },
                { icon: UtensilsCrossed, title: "Huge variety", body: "From local street food to fine dining — whatever you crave, we have it." },
                { icon: MapPin, title: "Wide coverage", body: "Serving multiple cities and constantly expanding to reach you wherever you are." },
              ].map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex flex-col gap-3 rounded-2xl border p-6 transition-shadow hover:shadow-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-bold">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="border-t bg-primary py-20 text-primary-foreground">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-4 text-center sm:px-6">
            <h2 className="text-3xl font-black tracking-tight">Ready to order?</h2>
            <p className="text-primary-foreground/80">
              Join thousands of happy customers already using QuickBite. Sign up free in under a minute.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" variant="secondary" asChild className="rounded-full px-8">
                <Link href="/register/customer">
                  Create a free account <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Link href="/login">Sign in</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t bg-background">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <Link href="/" className="flex items-center gap-2 font-black tracking-tight">
              <UtensilsCrossed className="h-4 w-4 text-primary" />
              QuickBite
            </Link>
            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link href="/login" className="hover:text-foreground transition-colors">Login</Link>
              <Link href="/register/customer" className="hover:text-foreground transition-colors">Sign Up</Link>
              <Link href="/register/driver" className="hover:text-foreground transition-colors">Drive with us</Link>
            </nav>
            <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} QuickBite. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

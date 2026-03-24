import Link from "next/link";
import { ChevronRight, FileText, Shield, UtensilsCrossed } from "lucide-react";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-black text-lg tracking-tight transition-colors hover:text-primary"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <UtensilsCrossed className="h-4 w-4 text-white" />
            </span>
            QuickBite
          </Link>
        </div>
      </header>

      {/* Hero section for legal pages */}
      <div className="bg-muted/30 border-b border-border/40">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl text-foreground">
            Legal & Privacy
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Everything you need to know about our terms and policies.
          </p>
        </div>
      </div>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-16">
          {/* Navigation Sidebar */}
          <aside className="w-full md:w-64 shrink-0">
            <nav className="flex flex-row md:flex-col gap-1 md:gap-2 overflow-x-auto pb-4 md:pb-0 hide-scrollbar">
              <Link
                href="/terms"
                className="group flex flex-1 md:flex-none items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all hover:bg-muted hover:text-primary whitespace-nowrap md:whitespace-normal"
              >
                <span className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                  Terms of Service
                </span>
                <ChevronRight className="h-4 w-4 hidden md:block text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
              </Link>
              <Link
                href="/privacy"
                className="group flex flex-1 md:flex-none items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all hover:bg-muted hover:text-primary whitespace-nowrap md:whitespace-normal"
              >
                <span className="flex items-center gap-3">
                  <Shield className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                  Privacy Policy
                </span>
                <ChevronRight className="h-4 w-4 hidden md:block text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
              </Link>
            </nav>
          </aside>

          {/* Content Area */}
          <div className="flex-1 rounded-3xl md:border md:border-border/50 md:bg-card md:p-10 md:shadow-sm">
            {children}
          </div>
        </div>
      </main>

      <footer className="border-t border-border/40 py-8 text-center text-sm text-muted-foreground bg-muted/20">
        <div className="flex items-center justify-center gap-6 font-medium">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/terms" className="hover:text-primary transition-colors">
            Terms
          </Link>
          <Link
            href="/privacy"
            className="hover:text-primary transition-colors"
          >
            Privacy
          </Link>
          <Link href="/login" className="hover:text-primary transition-colors">
            Login
          </Link>
        </div>
        <p className="mt-4 opacity-70">
          &copy; {new Date().getFullYear()} QuickBite. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

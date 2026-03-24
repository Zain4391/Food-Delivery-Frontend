import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-4xl items-center px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 font-black text-base tracking-tight">
            <UtensilsCrossed className="h-4 w-4 text-primary" />
            QuickBite
          </Link>
        </div>
      </header>
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-12 sm:px-6">
        {children}
      </main>
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-4">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          <Link href="/login" className="hover:text-foreground transition-colors">Login</Link>
        </div>
        <p className="mt-3">&copy; {new Date().getFullYear()} QuickBite. All rights reserved.</p>
      </footer>
    </div>
  );
}

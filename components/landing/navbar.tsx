"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Intervu" className="h-7 w-7" />
          <span className="font-semibold text-foreground">Intervu</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          <Link href="#how-it-works" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            How it works
          </Link>
          <Link href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Features
          </Link>
          <Link href="#preview" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Dashboard
          </Link>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button asChild variant="ghost" size="sm" className="text-muted-foreground">
            <Link href="/intake">Sign in</Link>
          </Button>
          <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/intake">Start Free Assessment</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="text-muted-foreground md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background px-6 pb-6 pt-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link href="#how-it-works" className="text-sm text-muted-foreground" onClick={() => setOpen(false)}>
              How it works
            </Link>
            <Link href="#features" className="text-sm text-muted-foreground" onClick={() => setOpen(false)}>
              Features
            </Link>
            <Button asChild className="mt-2 w-full bg-primary text-primary-foreground">
              <Link href="/intake">Start Free Assessment</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

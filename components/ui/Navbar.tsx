"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 md:px-8 transition-all duration-500 ${scrolled ? "pt-4" : "pt-6"}`}>
      <header className={`flex items-center justify-between border transition-all duration-500 w-full mx-auto shadow-sm overflow-hidden ${
        scrolled 
          ? "max-w-4xl bg-[#0a0a0b]/70 backdrop-blur-md border-zinc-800/80 rounded-full px-8 py-3" 
          : "max-w-[80rem] bg-[#0e0e11] border-zinc-800 rounded-[1rem] px-6 py-4"
      }`}>
        <Link href="/" className="flex items-center gap-3">
           <div className="w-8 h-8 flex items-center justify-center p-[2px] relative overflow-hidden">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-[#3b82f6]" stroke="currentColor" strokeWidth="2">
                <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" strokeOpacity="0.3" />
                <path d="M9 16.5C10.5 17 12 17.5 14 16c2-1.5 1-4.5-1-6S10 7 10 7" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4.5 12A7.5 7.5 0 0 0 12 19.5" strokeLinecap="round" opacity="0.8" />
              </svg>
           </div>
           <span className="text-white font-bold text-[22px] tracking-tight" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>Locarda</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-8 lg:space-x-10" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
           <Link href="#features" className="text-[16px] text-zinc-400 hover:text-white transition-colors">Features</Link>
           <Link href="#about" className="text-[16px] text-zinc-400 hover:text-white transition-colors">About</Link>
           <Link href="#pricing" className="text-[16px] text-zinc-400 hover:text-white transition-colors">Pricing</Link>
           <Link href="#tutorials" className="text-[16px] text-zinc-400 hover:text-white transition-colors">Tutorials</Link>
           <Link href="#blog" className="text-[16px] text-zinc-400 hover:text-white transition-colors">Blog</Link>
        </nav>
      </header>
    </div>
  );
}

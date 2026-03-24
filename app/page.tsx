import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import ipadImage from "../images/ipad-locarda.png";
import { Navbar } from "@/components/ui/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 w-full flex flex-col items-center justify-center p-6 mt-16 md:mt-32 relative">
        <div className="max-w-5xl text-center space-y-10 flex flex-col items-center">
          <div className="inline-flex items-center rounded-full border border-zinc-700/60 bg-zinc-800/30 px-5 py-2.5 text-[11px] font-semibold tracking-[0.15em] text-zinc-400 uppercase">
            The OS for Medicolegal Death Investigation
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-[84px] font-semibold tracking-tight text-white leading-[1.05]">
            Bringing clarity and closure,<br />
            faster.
          </h1>

          <p className="max-w-[700px] text-zinc-400 text-lg md:text-[22px] leading-[1.6] mt-4 font-normal">
            Locarda unifies the disconnected processes of death investigation<br className="hidden md:block"/> into a single end-to-end system of record—from intake through<br className="hidden md:block"/> case closure.
          </p>

          <div className="pt-2 space-y-4">
             <p className="text-zinc-400 text-[22px]">If this excites you, we'd love to hear from you:</p>
             <a href="mailto:founders@locarda.com" className="text-[#3b82f6] hover:text-blue-400 text-[22px] transition-colors block">founders@locarda.com</a>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-8">
             <Link href="#ipad-preview" className="inline-flex h-[60px] items-center justify-center rounded-xl border border-zinc-800 bg-[#0a0a0b] px-10 text-[18px] font-medium text-white transition-colors hover:bg-zinc-900 shadow-sm">
                Learn More
             </Link>

             <Link
                href="/demo"
                className="inline-flex h-[60px] items-center justify-center rounded-xl bg-white px-10 text-[18px] font-medium text-zinc-950 shadow transition-colors hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-300 disabled:pointer-events-none disabled:opacity-50"
              >
                Start Demo <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
           </div>
        </div>
      </main>

      <section id="ipad-preview" className="w-full relative flex items-center justify-center pt-10 pb-32 px-4 scroll-smooth">
        <div className="max-w-[1200px] w-full relative group">
           <div className="absolute inset-x-0 bottom-[-50px] top-1/2 bg-gradient-to-b from-transparent to-[#0a0a0b] z-10 pointer-events-none"></div>
           <div className="absolute inset-0 bg-blue-500/5 blur-[120px] rounded-full scale-75 -z-10"></div>
           <Image 
             src={ipadImage}
             alt="Locarda running on an iPad"
             className="w-full h-auto object-cover transform transition-all duration-1000 ease-out hover:scale-[1.02]"
             priority
           />
        </div>
      </section>
    </div>
  );
}

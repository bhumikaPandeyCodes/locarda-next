"use client";

import { useState } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { ErrorCard } from "@/components/ui/error/ErrorCard";
import { InlineError } from "@/components/ui/error/InlineError";
import { ValidationPanel, ValidationIssue } from "@/components/ui/error/ValidationPanel";
import { useToast } from "@/components/ui/error/ToastError";
import { motion } from "framer-motion";

export default function ErrorDemoPage() {
  const { toast } = useToast();
  const [showInlineError, setShowInlineError] = useState(true);

  const validationIssues: ValidationIssue[] = [
    { id: "1", type: "missing_section", message: "Required template section 'Internal Injuries' is missing." },
    { id: "2", type: "template_mismatch", message: "Dictated findings do not align cleanly with standard structures.", fieldId: "Chest/Torso" },
    { id: "3", type: "duplicate_header", message: "Duplicate heading 'Extremities' found in output." }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0b] flex flex-col font-sans text-zinc-300">
      <Navbar />
      <main className="flex-1 w-full max-w-4xl mx-auto pt-32 pb-12 px-4 md:px-8 space-y-12">
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold text-white tracking-tight">Error System Demo</h1>
          <p className="text-zinc-400 text-[15px]">
            A showcase of the modern error UI designed for medico-legal applications. Professional, minimal, providing clarity without alarming language.
          </p>
        </div>

        {/* 1. Error Card Demo */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold tracking-widest text-zinc-500 uppercase">1. Component: Error Card</h2>
          <ErrorCard 
            title="We couldn't structure the report correctly."
            description="The transcription format failed to map against your custom structural template. Some sections may be displaced or missing. Please verify the raw output or retry generating."
            technicalDetails='{ "error_code": "PARSE_FAULT", "module": "LLM Router", "timestamp": "16723232" }'
            onRetry={() => {
              toast({ type: "info", message: "Retrying structure generation...", duration: 2500 });
            }}
          />
        </section>

        {/* 2. Inline Error Demo */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold tracking-widest text-zinc-500 uppercase">2. Component: Inline Error</h2>
          <div className="p-6 rounded-2xl border border-zinc-800 bg-[#0e0e11] space-y-4">
            <div>
              <label className="text-sm font-medium text-zinc-300 block mb-2">Transcript Input</label>
              <textarea 
                className="w-full h-24 bg-[#0a0a0b] border border-red-500/40 rounded-lg p-3 text-sm text-zinc-200 outline-none focus:ring-1 focus:ring-red-500/50"
                placeholder="Microphone recorded nothing..."
                defaultValue=""
              />
              <InlineError 
                message="Cannot generate report from an empty transcript." 
                className="mt-2" 
                align="left" 
              />
            </div>
            <button 
              onClick={() => setShowInlineError(!showInlineError)}
              className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-md text-xs font-medium text-white transition-colors"
            >
              Toggle Error
            </button>
          </div>
        </section>

        {/* 3. Validation Panel Demo */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold tracking-widest text-zinc-500 uppercase">3. Component: Validation Panel</h2>
          <ValidationPanel 
            issues={validationIssues} 
            onIssueClick={(issue) => {
              toast({ type: "warning", message: `Navigating to issue: ${issue.id}` });
            }} 
          />
        </section>

        {/* 4. Toast Error Demo */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold tracking-widest text-zinc-500 uppercase">4. Component: Toast Error System</h2>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => toast({ type: "error", message: "API failure: Transcription engine unreachable." })}
              className="px-4 py-2 border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 text-red-300 rounded-lg text-[13px] font-medium transition-colors"
            >
               Simulate API Error
            </button>
            <button 
              onClick={() => toast({ type: "warning", message: "Warning: Missing template sections identified." })}
              className="px-4 py-2 border border-amber-500/20 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 rounded-lg text-[13px] font-medium transition-colors"
            >
               Simulate Validation Warning
            </button>
            <button 
              onClick={() => toast({ type: "success", message: "Report generated successfully." })}
              className="px-4 py-2 border border-green-500/20 bg-green-500/10 hover:bg-green-500/20 text-green-300 rounded-lg text-[13px] font-medium transition-colors"
            >
               Simulate Success Info
            </button>
          </div>
        </section>

      </main>
    </div>
  );
}

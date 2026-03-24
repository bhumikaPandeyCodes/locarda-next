"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, FileWarning, Search, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ValidationIssue {
  id: string;
  type: "missing_section" | "template_mismatch" | "duplicate_header" | "info";
  message: string;
  fieldId?: string;
}

interface ValidationPanelProps {
  issues: ValidationIssue[];
  onIssueClick?: (issue: ValidationIssue) => void;
  className?: string;
}

const iconMap = {
  missing_section: <AlertTriangle className="w-4 h-4 text-red-400" />,
  template_mismatch: <FileWarning className="w-4 h-4 text-amber-400" />,
  duplicate_header: <Search className="w-4 h-4 text-amber-500" />,
  info: <Info className="w-4 h-4 text-blue-400" />
};

export function ValidationPanel({ issues, onIssueClick, className }: ValidationPanelProps) {
  if (!issues || issues.length === 0) return null;

  return (
    <div className={cn("w-full bg-[#0a0a0b] border border-zinc-800 rounded-xl overflow-hidden shadow-sm", className)}>
      <div className="px-4 py-3 border-b border-zinc-800/80 bg-zinc-900/30 flex items-center justify-between">
         <h3 className="text-[13px] font-semibold tracking-wider uppercase text-zinc-500">
           Validation Issues
         </h3>
         <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 text-[11px] font-medium border border-red-500/20">
           {issues.length} {issues.length === 1 ? "Issue" : "Issues"}
         </span>
      </div>
      <div className="p-2 space-y-1">
        <AnimatePresence initial={false}>
          {issues.map((issue) => (
            <motion.button
              key={issue.id}
              layout
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={() => onIssueClick && onIssueClick(issue)}
              className="w-full text-left px-3 py-2.5 rounded-lg flex items-start space-x-3 hover:bg-zinc-800/50 transition-colors group cursor-pointer"
            >
              <div className="mt-[2px] p-1 rounded-md bg-[#0a0a0b] shadow-inner border border-white/5 opacity-80 group-hover:opacity-100 transition-opacity">
                {iconMap[issue.type]}
              </div>
              <div className="flex-1">
                <p className="text-[14px] text-zinc-300 font-medium leading-tight group-hover:text-zinc-100 transition-colors">
                  {issue.message}
                </p>
                {issue.fieldId && (
                  <span className="text-[11px] font-mono text-zinc-500 mt-1 block">
                    Location: {issue.fieldId}
                  </span>
                )}
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

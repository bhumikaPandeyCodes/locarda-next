"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, ChevronDown, ChevronRight, Copy, CheckCircle2, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

type ErrorSeverity = "error" | "warning" | "info";

interface ErrorCardProps {
  title: string;
  description: string;
  severity?: ErrorSeverity;
  technicalDetails?: string;
  onRetry?: () => void;
  className?: string;
}

const severityConfig = {
  error: {
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    icon: "text-red-400",
    text: "text-red-200",
    hover: "hover:bg-red-500/20"
  },
  warning: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    icon: "text-amber-400",
    text: "text-amber-200",
    hover: "hover:bg-amber-500/20"
  },
  info: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    icon: "text-blue-400",
    text: "text-blue-200",
    hover: "hover:bg-blue-500/20"
  }
};

export function ErrorCard({
  title,
  description,
  severity = "error",
  technicalDetails,
  onRetry,
  className
}: ErrorCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const config = severityConfig[severity];

  const handleCopy = () => {
    if (!technicalDetails) return;
    navigator.clipboard.writeText(technicalDetails);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "w-full rounded-2xl border bg-[#0e0e11] shadow-[0_4px_24px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col transition-colors",
        config.border,
        className
      )}
    >
      <div className={cn("p-5 flex items-start space-x-4", config.bg)}>
        <div className={cn("mt-1 p-1.5 rounded-lg bg-[#0a0a0b]/50 border border-white/5", config.icon)}>
          <AlertCircle className="w-5 h-5" />
        </div>
        <div className="flex-1 space-y-1.5">
          <h3 className="text-[15px] font-medium text-white tracking-tight">{title}</h3>
          <p className="text-[14px] leading-relaxed text-zinc-400">
            {description}
          </p>
          
          {onRetry && (
             <button 
               onClick={onRetry}
               className="mt-3 inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-white bg-zinc-800 hover:bg-zinc-700 rounded-md transition-colors"
             >
               <RotateCcw className="w-3.5 h-3.5" />
               <span>Try Again</span>
             </button>
          )}
        </div>
      </div>

      {technicalDetails && (
        <div className="border-t border-zinc-800/80 bg-[#0a0a0b]">
           <button 
             onClick={() => setIsExpanded(!isExpanded)}
             className="w-full flex items-center justify-between px-5 py-3 text-[13px] font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
           >
             <span className="flex items-center space-x-1.5">
                {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                <span>View technical details</span>
             </span>
           </button>
           
           <AnimatePresence>
             {isExpanded && (
               <motion.div
                 initial={{ height: 0, opacity: 0 }}
                 animate={{ height: "auto", opacity: 1 }}
                 exit={{ height: 0, opacity: 0 }}
                 className="overflow-hidden"
               >
                 <div className="px-5 pb-5 pt-1 relative group">
                   <div className="absolute top-3 right-7 opacity-0 group-hover:opacity-100 transition-opacity">
                     <button 
                       onClick={handleCopy}
                       className="p-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-md text-zinc-300 transition-colors"
                     >
                        {isCopied ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                     </button>
                   </div>
                   <pre className="p-4 rounded-xl bg-black/50 border border-zinc-800/60 overflow-x-auto text-[12px] font-mono text-zinc-500 leading-relaxed">
                     {technicalDetails}
                   </pre>
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}

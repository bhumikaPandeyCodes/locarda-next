"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface InlineErrorProps {
  message?: string;
  className?: string;
  align?: "left" | "center" | "right";
}

export function InlineError({ message, className, align = "left" }: InlineErrorProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, height: 0, y: -4 }}
          animate={{ opacity: 1, height: "auto", y: 0 }}
          exit={{ opacity: 0, height: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "flex items-center space-x-1.5 overflow-hidden",
            align === "center" && "justify-center",
            align === "right" && "justify-end",
            className
          )}
        >
          <AlertCircle className="w-3.5 h-3.5 text-red-500/80 shrink-0 mt-[2px]" />
          <p className="text-[13.5px] font-medium text-red-400/90 leading-tight">
            {message}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

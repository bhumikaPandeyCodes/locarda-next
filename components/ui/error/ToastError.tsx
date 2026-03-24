"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle, CheckCircle2, Info } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "error" | "success" | "info" | "warning";

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastContextType {
  toast: (options: Omit<Toast, "id">) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (options: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...options, id }]);

    if (options.duration !== 0) {
      setTimeout(() => removeToast(id), options.duration || 4000);
    }
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      <div className="fixed top-4 right-4 z-[100] flex flex-col items-end space-y-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <ToastItem key={t.id} toast={t} onClose={() => removeToast(t.id)} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

const icons = {
  error: <AlertCircle className="w-4 h-4 text-red-400" />,
  success: <CheckCircle2 className="w-4 h-4 text-green-400" />,
  info: <Info className="w-4 h-4 text-blue-400" />,
  warning: <AlertCircle className="w-4 h-4 text-amber-400" />
};

const styles = {
  error: "bg-red-500/10 border-red-500/20",
  success: "bg-green-500/10 border-green-500/20",
  info: "bg-blue-500/10 border-blue-500/20",
  warning: "bg-amber-500/10 border-amber-500/20"
};

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 50, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
      className={cn(
        "pointer-events-auto flex items-center space-x-3 px-4 py-3 rounded-xl border shadow-[0_8px_30px_rgb(0,0,0,0.3)] backdrop-blur-md min-w-[280px] max-w-[400px]",
        styles[toast.type]
      )}
    >
      <div className="p-1 rounded-md bg-[#0a0a0b]/60 border border-white/5">{icons[toast.type]}</div>
      <p className="text-[14px] text-zinc-200 font-medium flex-1">{toast.message}</p>
      <button
        onClick={onClose}
        className="shrink-0 p-1 text-zinc-500 hover:text-zinc-300 transition-colors rounded-md hover:bg-white/5"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

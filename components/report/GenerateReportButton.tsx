import { Sparkles, Loader2 } from "lucide-react";

interface GenerateReportButtonProps {
    onClick: () => void;
    isLoading: boolean;
    disabled?: boolean;
}

export function GenerateReportButton({ onClick, isLoading, disabled }: GenerateReportButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="w-full h-14 flex items-center justify-center space-x-2 rounded-xl bg-white hover:bg-zinc-200 text-[#0a0a0b] text-[17px] font-medium transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0e0e11] focus:ring-white disabled:opacity-50 disabled:cursor-not-allowed group"
        >
            {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
                <Sparkles className="w-5 h-5 text-zinc-700 group-hover:text-zinc-900 transition-colors" />
            )}
            <span>{isLoading ? "Formatting Report..." : "Generate Structured Report"}</span>
        </button>
    );
}

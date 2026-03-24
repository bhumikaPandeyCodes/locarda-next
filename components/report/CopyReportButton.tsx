import { Copy, Check } from "lucide-react";
import { useState } from "react";

export function CopyReportButton({ report }: { report: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(report);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text", err);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
            title="Copy to clipboard"
        >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </button>
    );
}

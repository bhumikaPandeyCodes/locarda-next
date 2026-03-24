import { Mic, Square } from "lucide-react";

interface RecordButtonProps {
    isRecording: boolean;
    onClick: () => void;
    disabled?: boolean;
}

export function RecordButton({ isRecording, onClick, disabled }: RecordButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
        relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-950
        disabled:opacity-50 disabled:cursor-not-allowed
        ${isRecording
                    ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30 focus:ring-red-500'
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white focus:ring-zinc-500'
                }
      `}
        >
            {isRecording ? <Square className="w-5 h-5 fill-current" /> : <Mic className="w-5 h-5" />}
            {isRecording && (
                <span className="absolute -inset-1 rounded-full border border-red-500/50 animate-ping" />
            )}
        </button>
    );
}

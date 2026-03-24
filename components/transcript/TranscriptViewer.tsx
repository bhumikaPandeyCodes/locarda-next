interface TranscriptViewerProps {
    transcript: string;
    onChange: (value: string) => void;
}

export function TranscriptViewer({ transcript, onChange }: TranscriptViewerProps) {
    return (
        <div className="flex flex-col space-y-2 relative">
            <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-zinc-400">Live Transcript</label>
            </div>
            <textarea
                className="w-full min-h-[150px] bg-[#0a0a0b]/40 border border-zinc-800/80 rounded-xl p-4 text-zinc-300 text-[15px] focus:outline-none transition-shadow resize-none placeholder:text-zinc-600 block cursor-default"
                placeholder="Secure output... Your dictation will appear here automatically."
                value={transcript}
                readOnly
                spellCheck={false}
            />
        </div>
    );
}

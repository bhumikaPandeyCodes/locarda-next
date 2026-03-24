// components/voice/RecordingIndicator.tsx
import { useEffect, useState } from 'react';

export function RecordingIndicator({ isRecording }: { isRecording: boolean }) {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRecording) {
            interval = setInterval(() => setSeconds(s => s + 1), 1000);
        } else {
            setSeconds(0);
        }
        return () => clearInterval(interval);
    }, [isRecording]);

    const formatTime = (secs: number) => {
        const mins = Math.floor(secs / 60).toString().padStart(2, '0');
        const remSecs = (secs % 60).toString().padStart(2, '0');
        return `${mins}:${remSecs}`;
    };

    if (!isRecording) {
        return <span className="text-sm font-medium text-zinc-500">Ready to dictate</span>;
    }

    return (
        <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-sm font-medium text-red-500">Recording... {formatTime(seconds)}</span>
        </div>
    );
}

// components/voice/VoiceRecorder.tsx
import { useState } from "react";
import { useRecorder } from "@/hooks/useRecorder";
import { RecordButton } from "./RecordButton";
import { RecordingIndicator } from "./RecordingIndicator";

export function VoiceRecorder({ 
    onTranscriptReceived, 
    onRecordingStart 
}: { 
    onTranscriptReceived: (text: string) => void;
    onRecordingStart?: () => void;
}) {
    const { isRecording, startRecording, stopRecording } = useRecorder();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleToggleRecord = async () => {
        if (isRecording) {
            const audioBlob = await stopRecording();
            if (audioBlob) {
                setIsProcessing(true);
                try {
                    const formData = new FormData();
                    formData.append("file", audioBlob, "recording.webm");

                    const response = await fetch("/api/transcribe", {
                        method: "POST",
                        body: formData,
                    });

                    if (!response.ok) throw new Error("Transcription failed");

                    const data = await response.json();
                    if (data.transcript) {
                        onTranscriptReceived(data.transcript);
                    }
                } catch (error) {
                    console.error(error);
                    alert("Error transcribing audio.");
                } finally {
                    setIsProcessing(false);
                }
            }
        } else {
            if (onRecordingStart) onRecordingStart();
            startRecording();
        }
    };

    return (
        <div className="flex items-center space-x-4 p-4 bg-zinc-950 rounded-lg border border-zinc-800">
            <RecordButton isRecording={isRecording} onClick={handleToggleRecord} disabled={isProcessing} />
            <div className="flex flex-col">
                <RecordingIndicator isRecording={isRecording} />
                {isProcessing && <span className="text-xs text-zinc-500 mt-1 animate-pulse">Transcribing with Deepgram...</span>}
            </div>
        </div>
    );
}

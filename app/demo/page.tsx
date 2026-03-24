"use client";

import { useState } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { PanelLayout } from "@/components/ui/PanelLayout";
import { TemplateEditor } from "@/components/template/TemplateEditor";
import { VoiceRecorder } from "@/components/voice/VoiceRecorder";
import { TranscriptViewer } from "@/components/transcript/TranscriptViewer";
import { Loader2 } from "lucide-react";
import { ReportViewer } from "@/components/report/ReportViewer";
import { useToast } from "@/components/ui/error/ToastError";

export default function DemoPage() {
    const { toast } = useToast();
    const [template, setTemplate] = useState<string>("");
    const [transcript, setTranscript] = useState<string>("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [report, setReport] = useState<string | null>(null);

    const handleGenerateReport = async (textToProcess: string) => {
        if (!template) {
            toast({ type: "warning", message: "Missing Template: Please paste a report template before dictating findings.", duration: 5000 });
            return;
        }
        if (!textToProcess) return;

        setIsGenerating(true);
        try {
            const response = await fetch("/api/format-eoi", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ template, transcript: textToProcess }),
            });

            if (!response.ok) throw new Error("Failed to generate report");

            const data = await response.json();
            setReport(data.report);
        } catch (error) {
            console.error(error);
            toast({ 
                type: "error", 
                message: "We couldn’t structure the report correctly. Please check your template or try dictating again.", 
                duration: 6000 
            });
        } finally {
            setIsGenerating(false);
        }
    };

    const leftPanel = (
        <div className="h-full flex flex-col p-8 space-y-6">
            <div className="flex flex-col space-y-3">
                <h2 className="text-3xl font-semibold text-white tracking-tight">1. Configure Template</h2>
                <p className="text-[17px] text-zinc-400 leading-relaxed font-normal">
                    Insert your department's specific reporting structure below. Our system will dynamically route your spoken findings into exactly these sections.
                </p>
            </div>
            <div className="flex-1 rounded-xl overflow-hidden border border-zinc-800 shadow-md bg-[#0a0a0b]/50">
                <TemplateEditor value={template} onChange={setTemplate} />
            </div>
        </div>
    );

    const rightPanel = (
        <div className="h-full flex flex-col p-8 space-y-8 overflow-y-auto w-full">
            <div className="flex flex-col space-y-3">
                <h2 className="text-3xl font-semibold text-white tracking-tight">2. Dictate Findings</h2>
                <p className="text-[17px] text-zinc-400 leading-relaxed font-normal">
                    Speak your forensic findings naturally. Once you stop recording, we'll automatically transcribe and structure everything for you.
                </p>
            </div>

            <div className="p-6 border border-zinc-800 bg-[#0a0a0b]/60 rounded-2xl space-y-5 shadow-sm">
                <VoiceRecorder 
                    onRecordingStart={() => {
                        setTranscript("");
                        setReport(null);
                    }}
                    onTranscriptReceived={(text) => {
                        setTranscript(text);
                        handleGenerateReport(text);
                    }} 
                />
                <TranscriptViewer transcript={transcript} onChange={setTranscript} />
            </div>

            {isGenerating && (
                <div className="pt-6 flex justify-center items-center space-x-3 text-zinc-400">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="text-[17px]">Generating Structured Report...</span>
                </div>
            )}

            {report && (
                <div className="pt-6 flex-1 flex flex-col min-h-0 space-y-4 animate-in fade-in slide-in-from-bottom-4">
                    <div className="flex flex-col space-y-2">
                        <h2 className="text-2xl font-semibold text-white tracking-tight">3. Final AI Report</h2>
                    </div>
                    <div className="flex-1 rounded-xl overflow-hidden border border-zinc-800 shadow-md bg-[#0a0a0b]/50 p-4">
                         <ReportViewer report={report} />
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-[#0a0a0b] flex flex-col font-sans">
            <Navbar />
            <main className="flex-1 w-full max-w-[1500px] mx-auto pt-32 pb-12 px-4 md:px-8 flex flex-col">
                <div className="flex-1 border border-zinc-800/90 rounded-[2rem] overflow-hidden shadow-2xl bg-[#0e0e11] flex flex-col min-h-[70vh]">
                    <PanelLayout leftPanel={leftPanel} rightPanel={rightPanel} />
                </div>
            </main>
        </div>
    );
}

"use client";

import React, { useState, useRef } from "react";
import SegmentsViewer from "@/components/SegmentsViewer";
import JsonViewer from "@/components/JsonViewer";
import ReportViewer from "@/components/ReportViewer";

const DEFAULT_TEMPLATE = `Described in anatomical position.

Multiple blunt force trauma:

Head and neck:
[Findings]

Torso:
[Findings]

Internal injuries:
[Findings]

Extremities:
[Findings]

Most of the injuries mentioned once will not be repeated.`;

export default function AgentDemoPage() {
  const [template, setTemplate] = useState(DEFAULT_TEMPLATE);
  const [transcripts, setTranscripts] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState("");
  
  const [pipelineData, setPipelineData] = useState<{
    segments: string[];
    classifications: string[];
    structured: Record<string, string[]> | null;
    report: string | null;
  }>({
    segments: [],
    classifications: [],
    structured: null,
    report: null
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4';
      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        setIsTranscribing(true);
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        
        try {
          const formData = new FormData();
          formData.append("file", audioBlob, "recording" + (mimeType === 'audio/webm' ? '.webm' : '.mp4'));

          const res = await fetch("/api/transcribe", {
            method: "POST",
            body: formData,
          });

          if (!res.ok) throw new Error("Transcription failed");
          
          const data = await res.json();
          if (data.transcript && data.transcript.trim()) {
             setTranscripts(prev => [...prev, data.transcript.trim()]);
          }
        } catch (error) {
          console.error("Transcription error:", error);
          alert("Error transcribing audio. Please try again.");
        } finally {
          setIsTranscribing(false);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Microphone access denied or error:", err);
      alert("Error accessing microphone. Please allow permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
    setIsRecording(false);
  };

  const addDummyTranscript = () => {
    const dummy = [
      "Right temple scalp has abrasion.",
      "Brain has hemorrhage.",
      "Put this in the previous section - left knee has abrasion."
    ];
    const newTranscript = dummy[transcripts.length % dummy.length];
    setTranscripts(prev => [...prev, newTranscript]);
  };

  const clearSession = () => {
    setTranscripts([]);
    setPipelineData({ segments: [], classifications: [], structured: null, report: null });
  };

  const handleGenerateReport = async () => {
    if (transcripts.length === 0) return;
    
    setIsLoading(true);
    try {
      const response = await fetch("/api/agent-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ template, transcripts })
      });

      if (!response.ok) throw new Error("Failed to process pipeline");

      const data = await response.json();
      setPipelineData({
        segments: data.segments,
        classifications: data.classifications,
        structured: data.structuredData,
        report: data.report
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div>
          <h1 className="text-3xl font-bold mb-2">Hybrid Agentic AI Pipeline Demo</h1>
          <p className="text-gray-400">Multi-pass recording with session memory for medico-legal dictations.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* SECTION 1 - TEMPLATE INPUT */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-sm flex flex-col">
            <h2 className="text-xl font-semibold mb-2 text-gray-200 uppercase tracking-wide text-sm">Section 1 — Template Input</h2>
            <p className="text-gray-500 text-sm mb-4">Paste Report Template below</p>
            <textarea
              className="w-full flex-1 min-h-[250px] bg-gray-950 border border-gray-800 rounded-lg p-4 text-gray-300 text-sm focus:outline-none focus:border-blue-500/50 font-mono resize-none transition-colors"
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              placeholder="Paste Report Template"
            />
          </div>

          {/* SECTION 2 - RECORD DICTATION */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold text-gray-200 uppercase tracking-wide text-sm">Section 2 — Record Dictation</h2>
              {transcripts.length > 0 && (
                <button onClick={clearSession} className="text-xs text-gray-500 hover:text-red-400">Clear Session</button>
              )}
            </div>
            
            <p className="text-gray-500 text-sm mb-4">Record dictations sequentially. They are accumulated in the patient session.</p>
            
            <div className="flex flex-wrap gap-3 mb-6">
              {!isRecording ? (
                <button onClick={startRecording} className="bg-red-600/20 text-red-400 border border-red-900 hover:bg-red-600/30 py-2 px-5 rounded-lg transition-colors font-medium flex items-center gap-2 text-sm">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  Record
                </button>
              ) : (
                <button onClick={stopRecording} className="bg-gray-800 text-white border border-gray-700 hover:bg-gray-700 py-2 px-5 rounded-lg transition-colors font-medium flex items-center gap-2 text-sm">
                  <div className="w-2.5 h-2.5 rounded-sm bg-white" />
                  Stop
                </button>
              )}
              
              <button 
                onClick={addDummyTranscript}
                className="bg-transparent hover:bg-gray-800 text-gray-400 py-2 px-4 rounded-lg transition-colors font-medium border border-gray-800 text-sm"
              >
                + Dummy Entry
              </button>

              <button 
                onClick={handleGenerateReport}
                disabled={isLoading || transcripts.length === 0}
                className="ml-auto bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 px-5 rounded-lg transition-colors font-medium text-sm"
              >
                {isLoading ? "Processing Pipeline..." : "Generate Report"}
              </button>
            </div>

            <div className="flex-1 overflow-auto space-y-3 bg-gray-950 border border-gray-800 rounded-lg p-4 min-h-[160px]">
              <h3 className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">Session Memory ({transcripts.length})</h3>
              
              {transcripts.length === 0 && !isRecording && (
                <div className="text-gray-600 italic text-sm text-center mt-8">No transcripts yet. Start recording one.</div>
              )}
              
              {transcripts.map((t, i) => (
                <div key={i} className="bg-gray-900 p-3 rounded-lg border border-gray-800 text-gray-300 text-sm">
                  <span className="font-semibold text-blue-400/70 mr-2 text-xs uppercase">Rec {i + 1} &rarr;</span>
                  {t}
                </div>
              ))}
              
              {isRecording && (
                <div className="bg-red-950/20 p-3 rounded-lg border border-red-900/30 text-red-200 text-sm">
                  <span className="font-semibold text-red-400/70 mr-2 text-xs uppercase animate-pulse">Recording &rarr;</span>
                  Listening... Click stop when finished.
                </div>
              )}

              {isTranscribing && (
                <div className="bg-blue-950/20 p-3 rounded-lg border border-blue-900/30 text-blue-200 text-sm">
                  <span className="font-semibold text-blue-400/70 mr-2 text-xs uppercase animate-pulse">Transcribing &rarr;</span>
                  Processing audio through API...
                </div>
              )}
            </div>
            
          </div>
        </div>

        {/* AGENT PIPELINE RESULTS */}
        {pipelineData.report && (
          <div className="pt-8 border-t border-gray-800 mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold mb-6 text-gray-200">Pipeline Stages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              
              <div className="lg:col-span-1 border border-gray-800 rounded-xl overflow-hidden flex flex-col h-[600px]">
                <SegmentsViewer segments={pipelineData.segments} classifications={pipelineData.classifications} />
              </div>
              <div className="lg:col-span-1 border border-gray-800 rounded-xl overflow-hidden flex flex-col h-[600px]">
                <JsonViewer data={pipelineData.structured} />
              </div>
              <div className="lg:col-span-2 border border-gray-800 rounded-xl overflow-hidden flex flex-col h-[600px]">
                <ReportViewer report={pipelineData.report} />
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

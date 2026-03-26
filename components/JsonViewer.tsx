import React from "react";

interface JsonViewerProps {
  data: Record<string, string[]> | null;
}

export default function JsonViewer({ data }: JsonViewerProps) {
  return (
    <div className="bg-gray-900 border-none p-6 h-full flex flex-col">
      <h2 className="text-xl font-semibold text-white mb-2">CARD 3: Structured JSON Output</h2>
      <p className="text-gray-400 mb-4 text-sm">Findings grouped into structured sections.</p>
      
      <div className="flex-1 overflow-auto bg-gray-950 border border-gray-800 rounded-lg p-4">
        {!data ? (
          <div className="text-gray-600 italic">No structure generated yet. Run the pipeline.</div>
        ) : (
          <pre className="text-xs text-green-400 font-mono whitespace-pre-wrap">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}

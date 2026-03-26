import React from "react";

interface ReportViewerProps {
  report: string | null;
}

export default function ReportViewer({ report }: ReportViewerProps) {
  return (
    <div className="bg-gray-900 border-none p-6 h-full flex flex-col">
      <h2 className="text-xl font-semibold text-white mb-2">CARD 4: Final Rendered Report</h2>
      <p className="text-gray-400 mb-4 text-sm">The validated, template-injected EOI report.</p>
      
      <div className="flex-1 overflow-auto bg-gray-950 border border-gray-800 rounded-lg p-6">
        {!report ? (
          <div className="text-gray-600 italic">No report generated yet. Run the pipeline.</div>
        ) : (
          <pre className="text-sm text-gray-200 font-mono whitespace-pre-wrap font-sans leading-relaxed">
            {report}
          </pre>
        )}
      </div>
    </div>
  );
}

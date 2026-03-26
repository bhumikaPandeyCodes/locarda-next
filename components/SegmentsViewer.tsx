import React from "react";

interface SegmentsViewerProps {
  segments: string[];
  classifications?: string[];
}

export default function SegmentsViewer({ segments, classifications }: SegmentsViewerProps) {
  return (
    <div className="bg-gray-900 border-none p-6 h-full flex flex-col">
      <h2 className="text-xl font-semibold text-white mb-2">CARD 1 & 2: Segments & Classifications</h2>
      <p className="text-gray-400 mb-4 text-sm">Transcript broken into atomic statements and classified.</p>
      
      <div className="flex-1 overflow-auto space-y-3 pr-2">
        {segments.length === 0 ? (
          <div className="text-gray-600 italic">No segments generated yet. Run the pipeline.</div>
        ) : (
          segments.map((segment, idx) => (
            <div key={idx} className="bg-gray-950 border border-gray-800 rounded-lg p-3">
              <div className="text-gray-300 text-sm mb-2">{segment}</div>
              {classifications && classifications[idx] && (
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-800">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-400 bg-blue-900/30 px-2 py-1 rounded">
                    {classifications[idx]}
                  </span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

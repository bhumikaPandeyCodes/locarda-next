import { CopyReportButton } from "./CopyReportButton";

interface ReportViewerProps {
    report: string;
}

export function ReportViewer({ report }: ReportViewerProps) {
    return (
        <div className="flex-1 flex flex-col relative bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
            <div className="absolute top-2 right-2 flex space-x-2">
                <CopyReportButton report={report} />
            </div>
            <div className="p-6 overflow-y-auto w-full h-full text-zinc-300 font-mono text-sm whitespace-pre-wrap leading-relaxed">
                {report}
            </div>
        </div>
    );
}

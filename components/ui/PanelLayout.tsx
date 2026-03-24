export function PanelLayout({
    leftPanel,
    rightPanel,
}: {
    leftPanel: React.ReactNode;
    rightPanel: React.ReactNode;
}) {
    return (
        <div className="flex-1 flex flex-col xl:flex-row h-full overflow-hidden">
            {/* Left Panel */}
            <div className="w-full xl:w-[45%] border-b xl:border-b-0 xl:border-r border-zinc-800/80 bg-[#0a0a0b]/40 h-[50vh] xl:h-full">
                {leftPanel}
            </div>

            {/* Right Panel */}
            <div className="w-full xl:w-[55%] bg-[#0a0a0b]/80 h-[50vh] xl:h-full relative shadow-inner">
                {rightPanel}
            </div>
        </div>
    );
}

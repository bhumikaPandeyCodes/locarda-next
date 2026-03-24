import { Navbar } from "@/components/ui/Navbar";

export default function DemoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen bg-zinc-950 text-slate-200">
            <Navbar />
            <main className="flex-1 flex flex-col h-[calc(100vh-64px)] overflow-hidden">
                {children}
            </main>
        </div>
    );
}

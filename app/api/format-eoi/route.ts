import { NextResponse } from "next/server";
import { formatReportWithClaude } from "@/lib/claude";

export async function POST(req: Request) {
    try {
        const { template, transcript } = await req.json();

        if (!template || !transcript) {
            return NextResponse.json(
                { error: "Template and transcript are required" },
                { status: 400 }
            );
        }
        const report = await formatReportWithClaude(template, transcript);

        return NextResponse.json({ report });
    } catch (error) {
        console.error("Formatting error:", error);
        return NextResponse.json(
            { error: "Error formatting report" },
            { status: 500 }
        );
    }
}

import { NextResponse } from "next/server";
import { runAgentPipeline } from "@/lib/agents/pipeline";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { template, transcripts } = body;

    if (!template || !transcripts || !Array.isArray(transcripts)) {
      return NextResponse.json({ error: "Missing template or transcripts array" }, { status: 400 });
    }

    const result = await runAgentPipeline(template, transcripts);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Pipeline API error:", error);
    return NextResponse.json({ error: "Failed to process pipeline" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { transcribeAudioSegment } from "@/lib/deepgram";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as Blob;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Call deepgram API
        const transcript = await transcribeAudioSegment(buffer);
        console.log('this is the transcript', transcript);
        return NextResponse.json({ transcript });
    } catch (error) {
        console.error("Transcription error:", error);
        return NextResponse.json(
            { error: "Error transcribing audio" },
            { status: 500 }
        );
    }
}

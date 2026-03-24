import { createClient } from "@deepgram/sdk";

const deepgramApiKey = process.env.DEEPGRAM_API_KEY || "dummy-key";
const deepgram = createClient(deepgramApiKey);

export async function transcribeAudioSegment(buffer: Buffer): Promise<string> {
  const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
    buffer,
    {
      model: "nova-2",
      smart_format: true,
      diarize: false,
    }
  );

  if (error) {
    throw new Error(error.message);
  }

  return result?.results?.channels?.[0]?.alternatives?.[0]?.transcript || "";
}

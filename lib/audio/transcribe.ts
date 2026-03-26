export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  // Placeholder implementation representing STT
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Mock transcription: The patient was evaluated. Brain has hemorrhage. Put this in the previous section - left knee has abrasion.");
    }, 1500);
  });
}

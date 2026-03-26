export function segmentTranscript(transcript: string): string[] {
  if (!transcript) return [];
  
  const rawSegments = transcript.split(/[\n.]+/);
  
  const segments: string[] = [];
  for (const seg of rawSegments) {
    const trimmed = seg.trim();
    if (!trimmed) continue;
    
    // Split on commas if they look like separate findings
    const commaSegments = trimmed.split(/,(?!\s*and)/);
    for (const cSeg of commaSegments) {
      const cTrimmed = cSeg.trim();
      if (cTrimmed) {
        const formatted = cTrimmed.charAt(0).toUpperCase() + cTrimmed.slice(1);
        segments.push(formatted);
      }
    }
  }
  
  return segments;
}

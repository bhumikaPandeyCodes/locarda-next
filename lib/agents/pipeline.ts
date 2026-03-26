import { segmentTranscript } from "./segmenter";
import { classifySegment } from "./classifier";
import { buildStructuredJSON } from "./jsonBuilder";
import { renderReport } from './renderer';
import { validateReport } from "./validator";

export async function runAgentPipeline(template: string, transcripts: string[]) {
  // 1. Merge transcripts
  const mergedTranscript = transcripts.join(" ");

  // 2. Segment findings
  const segments = segmentTranscript(mergedTranscript);

  // 3. Classify segments
  const rawClassifications = await Promise.all(
    segments.map(segment => classifySegment(segment))
  );

  // 4. Apply context corrections
  const contextCorrectionKeywords = ["previous section", "move above", "same section as before"];
  const classifications: string[] = [];
  let previousCategory = "Unknown";

  for (let i = 0; i < segments.length; i++) {
    const segmentLower = segments[i].toLowerCase();
    const needsCorrection = contextCorrectionKeywords.some(keyword => segmentLower.includes(keyword));

    if (needsCorrection && previousCategory !== "Unknown") {
      classifications.push(previousCategory);
    } else {
      classifications.push(rawClassifications[i]);
      if (rawClassifications[i] !== "Unknown") { // only update history on valid classes
        previousCategory = rawClassifications[i];
      }
    }
  }

  // 5. Build structured JSON
  const structuredData = buildStructuredJSON(segments, classifications);

  // 6. Render template
  const report = renderReport(template, structuredData);

  // 7. Validate report
  const validatedReport = validateReport(report);

  return {
    segments,
    classifications,
    structuredData,
    report: validatedReport
  };
}

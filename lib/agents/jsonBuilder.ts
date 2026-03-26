export function buildStructuredJSON(segments: string[], classifications: string[]) {
  const structure: Record<string, string[]> = {
    "Head and neck": [],
    "Torso": [],
    "Internal injuries": [],
    "Extremities": [],
    "Unknown": []
  };

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    const category = classifications[i];
    if (structure[category]) {
      structure[category].push(segment);
    } else {
      structure["Unknown"].push(segment);
    }
  }

  // Optional: eliminate unknown if context correction works perfectly
  if (structure["Unknown"].length === 0) {
    delete structure["Unknown"];
  }

  return structure;
}

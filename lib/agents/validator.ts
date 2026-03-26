export function validateReport(report: string): string {
  let validated = report;
  
  const sectionsToCheck = ["Head and neck:", "Torso:", "Internal injuries:", "Extremities:"];
  for (const s of sectionsToCheck) {
    if (!validated.includes(s)) {
      validated = `${s}\n-\n\n` + validated;
    }
  }

  validated = validated.replace(/\[Findings\]/gi, "-\n");
  
  validated = validated.replace(/\n{3,}/g, '\n\n');
  return validated;
}

export function renderReport(template: string, structuredData: Record<string, string[]>): string {
  let rendered = template;
  
  const sections = [
    { name: "Head and neck:", key: "Head and neck" },
    { name: "Torso:", key: "Torso" },
    { name: "Internal injuries:", key: "Internal injuries" },
    { name: "Extremities:", key: "Extremities" }
  ];

  for (const section of sections) {
    const findings = structuredData[section.key] && structuredData[section.key].length > 0
      ? structuredData[section.key].join("\n")
      : "-";
    
    const regex = new RegExp(`${section.name}\\s*\\[Findings\\]`, "gi");
    if (regex.test(rendered)) {
      rendered = rendered.replace(regex, `${section.name}\n${findings}`);
    } else {
      const looseRegex = new RegExp(`${section.name}[^\\S\\n]*$`, "gim");
      rendered = rendered.replace(looseRegex, `${section.name}\n${findings}`);
    }
  }
  
  return rendered;
}

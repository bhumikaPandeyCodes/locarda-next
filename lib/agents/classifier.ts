import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function classifySegment(segment: string): Promise<string> {
  const prompt = `You are a medical classifier.

Classify the following forensic medical finding into ONE anatomical region.

Allowed categories:

Head and neck
Torso
Internal injuries
Extremities
Unknown

Classification rules:

Head and neck:
scalp, face, orbit, jaw, skull, neck

Torso:
chest, abdomen, pelvis, back

Internal injuries:
organs, fractures, hemorrhage, brain injuries

Extremities:
arms, hands, legs, knees, feet

Finding:
${segment}

Return ONLY the category name.`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 10,
      temperature: 0,
      messages: [{ role: "user", content: prompt }]
    });

    if (response.content[0] && response.content[0].type === "text") {
      const classification = response.content[0].text.trim();
      const validCategories = ["Head and neck", "Torso", "Internal injuries", "Extremities"];
      for (const cat of validCategories) {
        if (classification.includes(cat)) {
          return cat;
        }
      }
    }
    return "Unknown";
  } catch (error) {
    console.error("Error classifying segment:", error);
    return "Unknown";
  }
}

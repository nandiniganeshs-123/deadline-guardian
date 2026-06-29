import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

console.log("Gemini API Key:", API_KEY);

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

async function callGemini(prompt) {
  const maxRetries = 3;

  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      return response.text;
    } catch (error) {
      if (error.status === 503 && i < maxRetries - 1) {
        console.log(`Retrying Gemini... Attempt ${i + 2}`);

        await new Promise((resolve) =>
          setTimeout(resolve, 2000 * (i + 1))
        );

        continue;
      }

      throw error;
    }
  }
}

export const generatePlan = async (
  taskName,
  deadline,
  priority
) => {

  const today = new Date();
  const due = new Date(deadline);

  const daysLeft = Math.ceil(
    (due - today) / (1000 * 60 * 60 * 24)
  );

 const prompt = `
You are an AI productivity assistant.

Task Name: ${taskName}
Deadline: ${deadline}
Priority: ${priority}
Days Remaining: ${daysLeft}

Determine Risk Level using:

- High Risk → 0-2 days remaining
- Medium Risk → 3-5 days remaining
- Low Risk → More than 5 days remaining

Provide:

1. Risk Level
2. Short action plan
3. 3-5 actionable steps
4. One productivity tip

Rules:
- Keep response under 150 words.
- Do NOT create long-term roadmaps.
- Focus on the given task only.
- Use emojis and headings.
`;



 return await callGemini(prompt);
};

export const generateDailyPlan = async (tasks) => {
  const today = new Date().toLocaleDateString();

 const prompt = `
You are Deadline Guardian AI, an intelligent productivity coach.

Today's Date: ${today}

Current Tasks:

${tasks.map((task, index) => `
Task ${index + 1}
Title: ${task.title}
Deadline: ${task.deadline}
Priority: ${task.priority}
Status: ${task.status}
Description: ${task.description}
`).join("\n")}

Your responsibilities:

1. Decide ONLY what should be done TODAY.
2. Order tasks from highest priority to lowest.
3. Estimate time for each task.
4. Warn about any risky deadlines.
5. Mention which tasks can safely wait.
6. Keep the response under 180 words.
7. Use emojis and clear headings.

Output format:

🎯 Today's Focus

⏰ Suggested Schedule

⚠ Risks

💡 Productivity Tip
`;


 return await callGemini(prompt);
};

export const generateTaskBreakdown = async (task) => {
  const prompt = `
You are an expert productivity coach.

Task:
${task.title}

Description:
${task.description}

Deadline:
${task.deadline}

Priority:
${task.priority}

Generate exactly 5 actionable subtasks.

Rules:
- Return ONLY a numbered list.
- Keep each subtask under 10 words.
- No explanations.
- No markdown.
`;


return await callGemini(prompt);
};

export const generateReschedule = async (tasks) => {
  const prompt = `
You are Guardian AI.

Analyze these tasks:

${tasks.map((task) => `
Title: ${task.title}
Deadline: ${task.deadline}
Priority: ${task.priority}
Status: ${task.status}
`).join("\n")}

Reorganize ONLY the remaining (non-completed) tasks.

Return:

🔄 Optimized Schedule

Today
Tomorrow
Later This Week

Mention completed tasks separately.

Keep the response under 180 words.

Do not use markdown.
`;



return await callGemini(prompt);
};

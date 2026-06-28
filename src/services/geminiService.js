import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

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

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
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

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
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

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
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

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
};

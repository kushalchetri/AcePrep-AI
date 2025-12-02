const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => `
You are an AI that outputs ONLY valid JSON.

RULES:
1. Return ONLY a JSON array of length ${numberOfQuestions}.
2. Each element MUST be an object with exactly these keys:
   { "question": "Short important technical question that does NOT require code or examples", 
     "answer": "Plain-text technical answer with multiple descriptive points, Minimum 50 words",
     "topic": "One topic from the provided list"
   }
3. Questions must be evenly distributed across topics:
   - There are ${topicsToFocus.length} topics.
   - Each topic MUST receive at least Math.floor(${numberOfQuestions} / ${topicsToFocus.length}) questions.
   - Any remaining questions MUST be randomly assigned among the topics.
4. STRICTLY NO markdown, NO symbols that look like code.
5. Escape newlines as \\n.
6. Use double quotes ONLY.
7. Questions must be conceptual or theoretical; no coding or example-based questions.

Context:
- Role: ${role}
- Experience: ${experience}
- Topics: ${JSON.stringify(topicsToFocus)}
`;


const conceptExplainPrompt = (question) => `
You are an AI that returns strictly valid JSON only. 
Do NOT include markdown or text outside the JSON object.

Instructions:
- Question: ${question}
- Explain the concept clearly for a beginner.
- If the topic is non-technical (biology, history, etc.), provide a detailed explanation in **bullet points** (300-400 words) as a **single string**. Separate bullets with \\n- .
- If the topic is technical, include code example at the end.
- Escape all double quotes as \\" and all newlines as \\n.

Return JSON exactly like this:

{
  "title": "Short descriptive title",
  "explanation": "Bullet point 1\\n- Bullet point 2\\n- Bullet point 3 ... Only include code if relevant."
}

Requirements:
1. Only output valid JSON.
2. All content must be inside the JSON object.
3. Do NOT output arrays.
4. Use double quotes for all strings.
`;


module.exports = { questionAnswerPrompt, conceptExplainPrompt}    
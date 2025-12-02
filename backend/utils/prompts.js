const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => `
You are an AI that outputs ONLY valid JSON.

RULES:
1. Return ONLY a JSON array.
2. Each object must have:
   { "question": "Short technical question that does NOT require code or examples", "answer": "Plain-text technical answer, ≤30 words" }
3. STRICTLY NO CODE, NO MARKDOWN, NO EXAMPLES, NO SYMBOLS THAT LOOK LIKE CODE.
4. Escape newlines as \\n.
5. Use double quotes ONLY.
6. Answer MUST be technical and in plain text only, even for programming or GitHub topics.
7. Questions must be conceptual or theoretical and NOT require any example or code to answer.

Context:
- Role: ${role}
- Experience: ${experience}
- Topics: ${topicsToFocus}
- Number of questions: ${numberOfQuestions}
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
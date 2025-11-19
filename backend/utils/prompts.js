const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => `
You are an AI that generates **strictly valid JSON only**. 
Do NOT include markdown outside of JSON. 
Inside the JSON string values, you ARE allowed to include code examples using triple backticks **only if the topic is technical or programming-related**. For non-technical topics (biology, history, psychology, etc.), provide a theory/example explanation instead — do NOT include code.

Instructions:
- Role: ${role}
- Experience: ${experience} years
- Topics: ${topicsToFocus}
- Number of questions: ${numberOfQuestions}

Return **exactly one JSON array** where each object has:

{
  "question": "Plain text question.",
  "answer": "Explanation text. Include a code example only if the topic is technical. Non-technical topics should not have any code."
}

Requirements:
1. The JSON MUST be valid.
2. All code blocks MUST stay inside the answer string only.
3. Use **double quotes** around every string.
4. Escape newlines using \\n.
5. Do NOT add any markdown or text outside the JSON array.
6. Only output the JSON array. Nothing before or after it.
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
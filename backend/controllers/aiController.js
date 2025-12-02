const { GoogleGenAI } = require("@google/genai");
const { conceptExplainPrompt } = require("../utils/prompts")
const {questionAnswerPrompt} = require("../utils/prompts")

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY});

function extractJsonArray(raw) {
    if (!raw || typeof raw !== "string") return [];

    let cleaned = raw.trim();

    cleaned = cleaned.replace(/```json\s*([\s\S]*?)```/i, "$1").trim();

    if (cleaned.startsWith("```") && cleaned.endsWith("```")) {
        cleaned = cleaned.slice(3, -3).trim();
    }

    cleaned = cleaned.replace(/^\s*json\s*/i, "");

    cleaned = cleaned
      .replace(/^\s*\*\*?/gm, "")
      .replace(/^\s*[-*+]\s+/gm, "")
      .replace(/^\s*\d+[\).]\s+/gm, "")
      .trim();

    const regex = /\[[\s\S]*\]/;
    const match = cleaned.match(regex);
    if (!match) return [];

    let candidate = match[0];

    try {
        return JSON.parse(candidate);
    } catch (err) {
        candidate = candidate.replace(/,\s*([}\]])/g, "$1");
        candidate = candidate.replace(/'/g, '"');
        try {
            return JSON.parse(candidate);
        } catch {
            return [];
        }
    }
}

function extractJsonObject(str) {
  const start = str.indexOf("{");
  if (start === -1) return null;

  let braceCount = 0;
  let end = start;

  for (let i = start; i < str.length; i++) {
    if (str[i] === "{") braceCount++;
    else if (str[i] === "}") braceCount--;

    if (braceCount === 0) {
      end = i;
      break;
    }
  }

  if (braceCount !== 0) return null;

  const jsonString = str.slice(start, end + 1);

  try {
    return JSON.parse(jsonString);
  } catch (err) {
    console.error("Failed to parse JSON:", err);
    return null;
  }
}


const generateInterviewQuestions = async (req, res) => {
    const MODELS = [
    "gemini-2.5-flash-lite",
    ];

    let data;

    for(const model of MODELS){
        try{
        const { role, experience, topicsToFocus, numberOfQuestions } = req.body;
        
        if(!role || !experience || !topicsToFocus || !numberOfQuestions){
            return res.status(400).json({message:"Missing required fields"})
        }

        const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

        const response = await ai.models.generateContent({
            model,
            contents: [{type: "text", text: prompt}]
        })
        
        const rawText = response.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

        let cleaned = extractJsonArray(rawText);
        
        data = cleaned;
        break;
       }catch(error){
        if(error.status === "UNAVAILABLE" || error.message?.includes("503")) continue;
        throw error
        }
    }
    if(data){
        res.status(200).json({content:data})
    }else{
        res.status(500).json({error:"All models failed"})
    }
    
}


const generateConceptExplanation = async (req, res) => {
  const MODELS = ["gemini-2.5-flash", "gemini-2.5-flash-lite"];
  const { question } = req.body;

  if (!question) return res.status(400).json({ message: "Missing required field" });

  let data = null;

  for (const model of MODELS) {
    try {
      const prompt = conceptExplainPrompt(question);

      const response = await ai.models.generateContent({
        model,
        contents: [{ type: "text", text: prompt }]
      });

      const rawText = response.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

      const parsed = extractJsonObject(rawText);
      if (parsed) {
        data = parsed;
        break;
      }
    } catch (error) {
      if (error.status === "UNAVAILABLE" || error.message?.includes("503")) continue;
      throw error;
    }
  }

  if(data) {
    const{title,explanation} = data;
    Array.isArray(explanation) ? explanation.join("\n\n") : explanation;
    res.status(200).json({
        title,
        explanation
    })
  }else{
    res.status(500).json({ error: "All models failed or returned invalid JSON" });
  }
};


module.exports = { generateInterviewQuestions, generateConceptExplanation };
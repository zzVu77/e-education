// app/api/chat/route.ts
import { NextResponse } from "next/server";
import { formatCoursesToContextString } from "../../../../constants/data";

export async function POST(req: Request) {
  const { prompt } = await req.json();
  const apiKey = process.env.NEXT_GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      reply: "Gemini API key is not configured.",
    });
  }

  const contextString = formatCoursesToContextString();

  const fullPrompt = `
You are an AI assistant helping users explore and learn about available online courses.
Below is a list of available courses. Each course has a unique Course ID and description.

${contextString}

Your response rules:
- If the user is asking for **course recommendations** based on a topic or interest (e.g., "I want to learn English", "Suggest me a programming course"), then respond with ONLY a **raw JSON array of course IDs**, like:
["3", "7"]
→ Do NOT add any explanation, do NOT include text around it.

- If the user asks for **details about a specific course** (e.g., "What is course 2 about?", "Tell me more about the Digital Marketing course"), then reply with a **short summary** in plain text.

- If the question is **not related to any courses** in the list, respond exactly with:
"I can only assist with information about the available courses in this system."

Now answer this user question:

"${prompt}"
`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const body = {
    contents: [
      {
        parts: [{ text: fullPrompt }],
      },
    ],
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    console.log("Gemini response:", text);

    let courseIds: string[] | null = null;
    let reply = text;

    try {
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed)) {
        courseIds = parsed.filter((id) => typeof id === "string");
        reply = "Here are the suggested courses.";
      }
    } catch {}

    return NextResponse.json({
      reply,
      courseIds: courseIds ?? [],
    });
  } catch (error) {
    console.error("Gemini error:", error);
    return NextResponse.json({
      reply: "There was an error while contacting Gemini.",
      courseIds: [],
    });
  }
}

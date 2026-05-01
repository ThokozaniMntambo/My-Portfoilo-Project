import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { config as dotenvConfig } from "dotenv";
import OpenAI from "openai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root (one level up from server/)
dotenvConfig({ path: path.join(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

// --- OpenAI client (lazy — only fails at request time if key missing) ---
const getOpenAI = () => new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// System prompt — everything the bot should know about Thokozani
const SYSTEM_PROMPT = `You are a friendly AI assistant on Thokozani Mntambo's personal portfolio website. Your job is to help visitors learn about Thokozani and answer their questions.

Here is everything you know about Thokozani:

**Personal:**
- Full name: Thokozani Mntambo
- Location: Johannesburg, South Africa
- Currently seeking: Internship or Junior Developer role
- Status: Available for opportunities

**Contact:**
- Email: thokozanimntamb@gmail.com
- GitHub: github.com/thokozani
- LinkedIn: linkedin.com/in/thokozani

**Technical Skills:**
- Frontend: React, TypeScript, JavaScript, HTML, CSS, Vite, Tailwind CSS
- Backend: Node.js, Express.js, Java, REST APIs, GraphQL
- Databases: PostgreSQL, MongoDB
- Tools: Git, GitHub, Docker, Linux

**Experience:**
- 1 year of software development experience
- 6 projects built
- 10+ technologies mastered

**About:**
Thokozani is a Software Developer from Johannesburg, South Africa, focused on building real-world web applications using Java and React. He enjoys turning ideas into practical solutions with a strong focus on clean code, performance, and user experience.

**Guidelines:**
- Be friendly, concise, and professional
- If asked how to contact Thokozani, provide his email: thokozanimntamb@gmail.com
- If asked about his GitHub, share: github.com/thokozani
- If someone wants to hire him or discuss opportunities, encourage them to reach out via email
- Keep answers brief and to the point (2-4 sentences max unless more detail is needed)
- Do NOT make up skills, projects, or experience that isn't listed above
- If asked something you don't know about Thokozani, say you don't have that information and suggest contacting him directly`;

// --- Chat endpoint (streaming via SSE) ---
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;


  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages array is required." });
  }

  if (
    !process.env.OPENAI_API_KEY ||
    process.env.OPENAI_API_KEY === "your_openai_api_key_here"
  ) {
    return res.status(500).json({ error: "OpenAI API key is not configured." });
  }

  // Set SSE headers for streaming
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  try {
    const openai = getOpenAI();
    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      stream: true,
      max_tokens: 400,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.slice(-10), // keep last 10 messages for context
      ],
    });

    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta?.content;
      if (delta) {
        res.write(`data: ${JSON.stringify({ text: delta })}\n\n`);
      }
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    res.write(`data: ${JSON.stringify({ error: msg })}\n\n`);
    res.end();
  }
});

// --- Contact Form ---
app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRx.test(email)) {
    return res.status(400).json({ error: "Invalid email address." });
  }

  console.log("\n📬 New Contact Message");
  console.log("──────────────────────");
  console.log(`From:    ${name} <${email}>`);
  console.log(`Subject: ${subject}`);
  console.log(`Message: ${message}`);
  console.log("──────────────────────\n");

  res.status(200).json({ success: true, message: "Message received!" });
});

// --- Health Check ---
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// --- Serve frontend in production ---
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../dist");
  app.use(express.static(distPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

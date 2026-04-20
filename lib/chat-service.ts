import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_INSTRUCTION = `You are AccessNovaa AI Assistant, a helpful expert in Digital Accessibility and inclusive solutions.
      
You answer questions related to:
- Digital Accessibility (WCAG 2.2, Section 508, PDF/UA, ADA compliance)
- Web & Mobile App Development (accessible websites, native/cross-platform apps for growth)
- WCAG 2.0, 2.1, 2.2 guidelines and success criteria
- PDF/UA (ISO 14289), Section 508, ADA, EAA, AODA, RGAA, BITV 2.0
- Accessibility tools: Adobe Acrobat Pro, PAC, axesPDF, CommonLook, NVDA, JAWS
- Document remediation: PDF, Word (DOCX), Excel (XLSX), PowerPoint (PPTX), Website
- Industries we serve: Healthcare, Banking, Government, Education, Insurance, Pharma, Telecom, E-commerce
- General digital inclusion and growth-focused digital business solutions

If someone asks ANYTHING outside our specialized services, reply gracefully:
"I'm specialized in Digital Accessibility and Web/Mobile Development only. For other queries, please contact us via the Contact page or WhatsApp."

Rules:
- Keep answers short, clear, and helpful (max 4-5 lines)
- Use bullet points where needed
- Be friendly and professional
- Never make up information
- Always encourage user to contact AccessNovaa for professional help
- CRITICAL: Never end your response or any sentence with a period (.)`;

const MODEL_CANDIDATES = ['gemini-2.5-flash', 'gemini-2.0-flash'];
const RETRYABLE_STATUS_CODES = new Set([429, 500, 503]);

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRetryableError(error: unknown) {
  if (!(error instanceof Error)) return false;

  const maybeStatus = (error as Error & { status?: number }).status;
  return (
    typeof maybeStatus === 'number' && RETRYABLE_STATUS_CODES.has(maybeStatus)
  );
}

export async function getChatReply(
  userMessage: string,
): Promise<{ reply: string }> {
  // Support both variable names for flexibility
  const apiKey = (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY)
    ?.trim()
    .replace(/^['"]|['"]$/g, '');

  if (!apiKey) {
    throw new Error(
      'Neither GEMINI_API_KEY nor GOOGLE_API_KEY is defined in environment variables',
    );
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  let lastError: unknown;

  for (const modelName of MODEL_CANDIDATES) {
    const model = genAI.getGenerativeModel({
      model: modelName,
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        const result = await model.generateContent(userMessage);
        return { reply: result.response.text() };
      } catch (error) {
        lastError = error;

        if (!isRetryableError(error) || attempt === 2) {
          break;
        }

        await sleep(500 * (attempt + 1));
      }
    }
  }

  throw lastError;
}

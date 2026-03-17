import { GoogleGenAI } from "@google/genai";
import { MANUAL_CHAPTERS, CAMP_SERVICES } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function askProjectAI(question: string) {
  try {
    const context = `
      Eres un asistente inteligente para trabajadores del Proyecto Vicuña, una mina en San Juan, Argentina.
      Usa la siguiente información para responder preguntas de forma clara y profesional.
      
      MANUAL DEL PROYECTO:
      ${MANUAL_CHAPTERS.map(c => `${c.title}: ${c.content}`).join('\n')}
      
      SERVICIOS DEL CAMPAMENTO:
      ${CAMP_SERVICES.map(s => `${s.name}: ${s.schedule}. ${s.details}`).join('\n')}
      
      Si no sabes la respuesta basándote en esta información, indícalo amablemente y sugiere contactar a supervisión.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ parts: [{ text: `${context}\n\nPregunta del trabajador: ${question}` }] }],
    });

    return response.text || "Lo siento, no pude procesar tu consulta en este momento.";
  } catch (error) {
    console.error("Error calling Gemini:", error);
    return "Error de conexión con el asistente inteligente.";
  }
}

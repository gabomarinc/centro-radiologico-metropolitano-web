
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function askConcierge(question: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: question,
      config: {
        systemInstruction: `Eres el "Asistente Médico Metropolitano Panamá". Tu objetivo es ayudar a pacientes en Panamá a prepararse para sus estudios radiológicos.
        - Ubicaciones: Marbella y Costa del Este en Ciudad de Panamá.
        - Tono: Empático, profesional, claro y con calidez panameña.
        - Estilo: Respuestas breves, en viñetas si es necesario.
        - Restricción: No des diagnósticos médicos ni recetas. Solo logística y preparación (ayunos, ropa, documentos).
        - Si la pregunta es sobre precios, sugiere llamar a las sedes (+507 263-5555).`,
        temperature: 0.7,
      },
    });
    return response.text || "Lo siento, no pude procesar tu solicitud. Por favor intenta de nuevo.";
  } catch (error) {
    console.error("Gemini Assistant Error:", error);
    return "Estoy teniendo problemas de conexión. Por favor consulta nuestra sección de pacientes o llámanos directamente al +507 263-5555.";
  }
}

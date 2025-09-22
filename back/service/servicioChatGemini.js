const { LlamarChatGemini } = require("../repositorio/repositorioChatGemini");

function limpiarTextoParaParseo(texto) {
  if (!texto || typeof texto !== "string") return texto;
  texto = texto.replace(/^\uFEFF/, "");
  texto = texto.replace(/```/g, "");
  texto = texto.replace(/^\s*json[:\s]*/i, "");
  texto = texto.replace(/^\s*JSON[:\s]*/i, "");
  return texto.trim();
}

function intentarExtraerJSON(texto) {
  if (!texto || typeof texto !== "string") return null;
  texto = limpiarTextoParaParseo(texto);

  const start = texto.indexOf("{");
  if (start === -1) return null;

  let depth = 0;
  let inString = false;
  let escape = false;
  for (let i = start; i < texto.length; i++) {
    const ch = texto[i];
    if (escape) { escape = false; continue; }
    if (ch === "\\") { escape = true; continue; }
    if (ch === '"') { inString = !inString; continue; }
    if (inString) continue;
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) {
        const candidate = texto.slice(start, i + 1);
        try { return JSON.parse(candidate); }
        catch (err) { /* continuar buscando */ }
      }
    }
  }

  const match = texto.match(/\{[\s\S]*\}/);
  if (match) {
    try { return JSON.parse(match[0]); }
    catch (err) { console.log("intentarExtraerJSON: fallback regex parse error:", err.message); }
  }
  return null;
}

async function LlamarChatGeminiService(mensaje) {
  try {
    const prompt = `
Sos PochIA, el asistente de Pochocleando.
El usuario pide: "${mensaje}"

Instrucciones: Devuelve entre 1 y 4 recomendaciones (película o serie). Responde SOLO con JSON válido, conciso, sin explicaciones.
Cada recomendación debe tener:
- title: título
- type: "película" o "serie"
- year: año
- reason: frase de máximo 1 línea
No incluyas texto extra.
Formato:
{ "recommendations": [ { "title":"Titulo", "type":"película|serie", "year":2020, "reason":"1 frase corta" } ] }
    `.trim();

    const respuestaCruda = await LlamarChatGemini(prompt);
    const textoBruto = typeof respuestaCruda === "string" ? respuestaCruda : JSON.stringify(respuestaCruda);
    const textoLimpio = limpiarTextoParaParseo(textoBruto);

    try {
      const parsed = JSON.parse(textoLimpio);
      return { success: true, data: parsed };
    } catch (err) {
      console.log("servicioChatGemini: no vino JSON directo, intentando extracción:", err.message);
      console.log("servicioChatGemini: raw (recortado):", textoBruto.length > 800 ? textoBruto.slice(0, 800) + "..." : textoBruto);

      const extraido = intentarExtraerJSON(textoBruto);
      if (extraido) return { success: true, data: extraido };

      // fallback: devolver texto (corto)
      const fallback = textoBruto.length > 1000 ? textoBruto.slice(0, 1000) + "..." : textoBruto;
      return { success: false, fallback };
    }
  } catch (error) {
    console.log("servicioChatGemini error:", error);
    return { success: false, error: "Error interno del servicio" };
  }
}

module.exports = { LlamarChatGeminiService };

const API_URL = import.meta.env.VITE_API_URL

/**
 * Envía texto o URL al endpoint /analyze y retorna el resultado.
 * @param {string} input - Texto o URL de la noticia
 * @returns {Promise<object>} Resultado con score, level, signals, explanation
 */
export async function analyzeNews(input) {
  const response = await fetch(`${API_URL}/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ input }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.error || `Error ${response.status}`)
  }

  return response.json()
}

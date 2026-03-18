import { useState } from 'react'
import NewsForm from './components/NewsForm'
import ScoreDisplay from './components/ScoreDisplay'
import { analyzeNews } from './services/api'

export default function App() {
  const [result, setResult]   = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  async function handleSubmit(input) {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const data = await analyzeNews(input)
      setResult(data)
    } catch (err) {
      setError(err.message || 'Error al conectar con el servidor.')
    } finally {
      setLoading(false)
    }
  }

  function handleReset() {
    setResult(null)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-12">
      <div className="mx-auto max-w-xl space-y-8">

        {/* Header */}
        <header className="text-center">
          <h1 className="text-4xl font-black tracking-tight text-white">
            Truth<span className="text-blue-500">Lens</span>
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Analiza noticias y detecta señales de desinformación con IA
          </p>
        </header>

        {/* Formulario o resultado */}
        {!result ? (
          <NewsForm onSubmit={handleSubmit} loading={loading} />
        ) : (
          <div className="space-y-6">
            <ScoreDisplay result={result} />
            <button
              onClick={handleReset}
              className="w-full rounded-xl border border-slate-700 py-3 text-sm text-slate-400
                         transition hover:border-slate-500 hover:text-slate-200"
            >
              Analizar otra noticia
            </button>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-xl border border-red-800 bg-red-950/40 p-4 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Footer */}
        <footer className="text-center text-xs text-slate-700">
          Powered by AWS Comprehend · Rekognition · Bedrock
        </footer>
      </div>
    </div>
  )
}

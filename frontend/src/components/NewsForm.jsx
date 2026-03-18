import { useState } from 'react'

export default function NewsForm({ onSubmit, loading }) {
  const [input, setInput] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = input.trim()
    if (trimmed) onSubmit(trimmed)
  }

  const isUrl = input.trim().startsWith('http')

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="relative">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Pega una URL o el texto de la noticia que quieres analizar..."
          rows={5}
          disabled={loading}
          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm
                     text-slate-100 placeholder-slate-500 resize-none
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     disabled:opacity-50"
        />
        {input.trim() && (
          <span className="absolute bottom-3 right-3 rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-400">
            {isUrl ? 'URL' : 'Texto'}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={loading || !input.trim()}
        className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white
                   transition hover:bg-blue-500 active:scale-95
                   disabled:cursor-not-allowed disabled:opacity-40"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Spinner /> Analizando...
          </span>
        ) : (
          'Analizar noticia'
        )}
      </button>
    </form>
  )
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

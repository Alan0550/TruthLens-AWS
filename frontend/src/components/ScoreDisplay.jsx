const LEVELS = {
  creíble:  { color: 'text-green-400',  ring: 'ring-green-500',  bg: 'bg-green-500/10',  label: 'Creíble' },
  dudoso:   { color: 'text-amber-400',  ring: 'ring-amber-500',  bg: 'bg-amber-500/10',  label: 'Dudoso' },
  peligroso:{ color: 'text-red-400',    ring: 'ring-red-500',    bg: 'bg-red-500/10',    label: 'Peligroso' },
}

const SIGNAL_STATUS = {
  ok:      { dot: 'bg-green-500', text: 'text-green-400' },
  warning: { dot: 'bg-amber-500', text: 'text-amber-400' },
  danger:  { dot: 'bg-red-500',   text: 'text-red-400'   },
}

export default function ScoreDisplay({ result }) {
  const theme = LEVELS[result.level] ?? LEVELS['dudoso']

  return (
    <div className="w-full space-y-6 animate-fade-in">

      {/* Score circular */}
      <div className={`flex flex-col items-center gap-2 rounded-2xl ${theme.bg} p-6 ring-2 ${theme.ring}`}>
        <span className="text-xs font-medium uppercase tracking-widest text-slate-400">
          Score de credibilidad
        </span>
        <span className={`text-7xl font-black ${theme.color}`}>
          {result.score}
        </span>
        <span className={`text-lg font-semibold ${theme.color}`}>
          {theme.label}
        </span>
      </div>

      {/* Explicación */}
      <div className="rounded-xl border border-slate-700 bg-slate-900 p-4 text-sm text-slate-300 leading-relaxed">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Análisis
        </p>
        {result.explanation}
      </div>

      {/* Señales */}
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Señales detectadas
        </p>
        {result.signals.map((signal) => {
          const s = SIGNAL_STATUS[signal.status] ?? SIGNAL_STATUS.warning
          return (
            <div
              key={signal.id}
              className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-900 px-4 py-3"
            >
              <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${s.dot}`} />
              <div>
                <p className="text-sm font-medium text-slate-200">{signal.label}</p>
                <p className={`text-xs ${s.text}`}>{signal.detail}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Disclaimer */}
      <p className="text-center text-xs text-slate-600">
        {result.disclaimer}
      </p>
    </div>
  )
}

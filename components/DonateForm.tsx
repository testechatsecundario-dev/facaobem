'use client'

import { useState } from 'react'

type DonateResponse = {
  ok: boolean
  message?: string
  pixCopiaECola?: string
  qrCodeImageUrl?: string
}

export default function DonateForm({ slug }: { slug: string }) {
  const [value, setValue] = useState<number | ''>(20)
  const [loading, setLoading] = useState(false)
  const [resp, setResp] = useState<DonateResponse | null>(null)
  const [copied, setCopied] = useState(false)

  const min = 5

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!value || value < min) {
      setResp({ ok: false, message: `O valor mínimo para doação é R$ ${min.toFixed(2)}` })
      return
    }
    setLoading(true)
    setResp(null)
    try {
      const r = await fetch('/api/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: value, slug })
      })
      const data = await r.json()
      setResp({ ...data, ok: r.ok })
    } catch (err: any) {
      setResp({ ok: false, message: err?.message || 'Erro ao gerar Pix' })
    } finally {
      setLoading(false)
    }
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="card p-5">
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block text-sm text-[color:var(--muted)]">
          Digite o valor que deseja doar
        </label>
        <div className="flex items-center gap-2">
          <span className="px-3 py-2 rounded-lg bg-white/5">R$</span>
          <input
            type="number"
            min={min}
            step="1"
            value={value}
            onChange={(e) => {
              const val = e.target.value
              setValue(val === '' ? '' : Number(val))
            }}
            className="w-full rounded-xl bg-white/5 px-4 py-2 outline-none ring-1 ring-white/10 focus:ring-white/20"
            placeholder="Ex.: 20"
          />
          <button
            type="submit"
            disabled={loading}
            className="whitespace-nowrap rounded-xl bg-green-500 hover:bg-green-600 disabled:opacity-60 px-5 py-2 font-semibold"
          >
            {loading ? 'Gerando Pix...' : 'Doar via Pix'}
          </button>
        </div>

        {/* Aviso de valor mínimo */}
        <p className="text-xs text-[color:var(--muted)]">
          Valor mínimo: R$ {min.toFixed(2)}
        </p>

        {/* Progress bar (placeholder estática) */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-bold text-green-500">
            <span>Progresso</span>
            <span>97%</span>
          </div>
          <div className="progress"><div /></div>
        </div>
      </form>

      {resp && (
        <div className="mt-5 space-y-3">
          {!resp.ok && (
            <div className="rounded-lg bg-red-500/15 text-red-300 p-3 text-sm">
              {resp.message || 'Erro inesperado ao gerar Pix. Tente novamente.'}
            </div>
          )}
          {resp.ok && resp.pixCopiaECola && (
            <div className="rounded-lg bg-gray-100 text-black p-4 space-y-3">
              <p className="text-sm">
                Copie o código abaixo, cole no app do seu banco e finalize o pagamento. Seu apoio faz a diferença!
              </p>
              <div className="flex gap-2">
                <textarea
                  readOnly
                  value={resp.pixCopiaECola}
                  className="w-full h-28 rounded-lg border p-3 text-xs bg-white"
                />
                <button
                  onClick={() => copyToClipboard(resp.pixCopiaECola!)}
                  className="px-3 py-2 rounded-lg bg-blue-500 text-white text-sm hover:bg-blue-600"
                  type="button"
                >
                  {copied ? '✅ Copiado!' : '🔗 Copiar'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

'use client'

import { useState } from 'react'

type DonateResponse = {
  ok: boolean
  message?: string
  pixCopiaECola?: string
  qrCodeImageUrl?: string
}

export default function DonateForm({ slug }: { slug: string }) {
  const [value, setValue] = useState<number>(20)
  const [loading, setLoading] = useState(false)
  const [resp, setResp] = useState<DonateResponse | null>(null)

  const min = 5

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (value < min) {
      setResp({ ok: false, message: `Valor mínimo é R$ ${min.toFixed(2)}` })
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
      setResp(data)
    } catch (err: any) {
      setResp({ ok: false, message: err?.message || 'Erro ao gerar Pix' })
    } finally {
      setLoading(false)
    }
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
            onChange={(e) => setValue(Number(e.target.value))}
            className="w-full rounded-xl bg-white/5 px-4 py-2 outline-none ring-1 ring-white/10 focus:ring-white/20"
            placeholder="Ex.: 20"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-green-500 hover:bg-green-600 disabled:opacity-60 px-5 py-2 font-semibold"
          >
            {loading ? 'Gerando Pix...' : 'Doar via Pix'}
          </button>
        </div>

        {/* 97% progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-[color:var(--muted)]">
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
              {resp.message || 'Erro inesperado ao gerar Pix.'}
            </div>
          )}
          {resp.ok && (
            <div className="rounded-lg bg-white/5 p-4 space-y-3">
              <p className="text-sm text-[color:var(--muted)]">Use o Pix copia-e-cola abaixo no seu app bancário:</p>
              {resp.pixCopiaECola ? (
                <textarea
                  readOnly
                  value={resp.pixCopiaECola}
                  className="w-full h-28 rounded-lg bg-black/30 p-3 text-xs"
                />
              ) : (
                <p className="text-sm">Código Pix não retornado pela API.</p>
              )}
              {resp.qrCodeImageUrl && (
                <div className="pt-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={resp.qrCodeImageUrl} alt="QR Code Pix" className="mx-auto w-56 h-56 object-contain rounded-lg" />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

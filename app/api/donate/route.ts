import { NextRequest, NextResponse } from 'next/server'

/**
 * This is a thin server-side proxy to your payment provider (StreetPay).
 * - Keeps your API key secret (never call StreetPay directly from the browser).
 * - Validates the minimum amount.
 * - Returns Pix "copia e cola" and optional QR image URL for the frontend.
 *
 * Fill the TODOs based on your working bot code (endpoint, headers and payload).
 */

export async function POST(req: NextRequest) {
  try {
    const { amount, slug } = await req.json() as { amount: number, slug?: string }

    if (!amount || amount < 5) {
      return NextResponse.json({ ok: false, message: 'Valor mínimo é R$ 5,00' }, { status: 400 })
    }

    // Convert to cents if your API expects integer value
    const valueInCents = Math.round(amount * 100)

    // === TODO: configure StreetPay endpoint & headers based on your working bot ===
    const STREETPAY_BASE = process.env.STREETPAY_BASE_URL || 'https://api.streetpay.com.br'
    const STREETPAY_API_KEY = process.env.STREETPAY_API_KEY // do not expose in client
    if (!STREETPAY_API_KEY) {
      return NextResponse.json({ ok: false, message: 'Configuração ausente: STREETPAY_API_KEY' }, { status: 500 })
    }

    // NOTE: Replace the path, headers and body with the exact fields you already use in the bot.
    const endpoint = `${STREETPAY_BASE}/functions/v1/transactions` // <-- ajuste se necessário

    const body = {
      // Ajuste o shape exatamente como no seu bot que funciona
      amount: valueInCents,
      payment_method: 'pix',
      description: `Doação ${slug || 'campanha'}`,
      // Dados fictícios aceitos pela StreetPay (replique do bot):
      customer: {
        name: 'Doador Anônimo',
        document: '00000000000'
      },
      // Campos que retornam o Pix copia e cola e o QR, conforme sua API
      // ex.: return_pix: true
    }

    const r = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STREETPAY_API_KEY}`,
        // Alguns provedores usam header 'apikey' separado. Se seu bot usa, replique aqui.
        // 'apikey': STREETPAY_API_KEY
      },
      body: JSON.stringify(body),
      // Important: avoid caching
      cache: 'no-store'
    })

    if (!r.ok) {
      const text = await r.text()
      return NextResponse.json({ ok: false, message: `StreetPay erro ${r.status}: ${text.slice(0, 200)}` }, { status: 500 })
    }

    const data = await r.json()
    // === TODO: mapeie abaixo conforme o retorno real da StreetPay ===
    // Tente detectar campos comuns:
    const pixCopiaECola =
      data?.pixCopiaECola ||
      data?.pix_code ||
      data?.payload ||
      data?.emv ||
      data?.qrCode?.text ||
      null

    const qrCodeImageUrl =
      data?.qrCodeImageUrl ||
      data?.qr_code_image ||
      data?.qrCode?.image ||
      null

    return NextResponse.json({ ok: true, pixCopiaECola, qrCodeImageUrl })
  } catch (err: any) {
    return NextResponse.json({ ok: false, message: err?.message || 'Erro ao processar' }, { status: 500 })
  }
}

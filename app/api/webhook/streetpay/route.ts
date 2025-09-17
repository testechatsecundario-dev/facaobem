import { NextRequest, NextResponse } from 'next/server'

/**
 * Webhook para receber confirmações da StreetPay (opcional no MVP).
 * Cadastre esta URL no painel/console do provedor para receber POSTs.
 * Exemplo de URL em produção: https://facaobem.net/api/webhook/streetpay
 * 
 * IMPORTANTE: Se a StreetPay assina os eventos, valide a assinatura aqui.
 */

export async function POST(req: NextRequest) {
  const event = await req.json().catch(() => null)

  // TODO: valide assinatura se a StreetPay enviar header como 'x-signature' etc.
  console.log('Webhook StreetPay recebido:', JSON.stringify(event))

  // Sua lógica: marcar doação como confirmada, atualizar banco/planilha, etc.
  return NextResponse.json({ received: true })
}

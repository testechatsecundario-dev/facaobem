import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, description } = body; // amount em reais (ex: 20)

    const secret = process.env.STREETPAY_SECRET_KEY;
    const company = process.env.STREETPAY_COMPANY_ID;

    if (!secret || !company) {
      throw new Error("StreetPay ENV vars not configured");
    }

    // transforma em centavos
    const amountInCents = Math.round(Number(amount) * 100);

    // monta Basic Auth
    const authStr = `${secret}:${company}`;
    const authB64 = Buffer.from(authStr).toString("base64");

    const payload = {
      amount: amountInCents,
      paymentMethod: "PIX",
      pix: { qrcode: true },
      items: [
        {
          title: description || "Doação Faça o Bem",
          unitPrice: amountInCents,
          quantity: 1,
          externalRef: "site_donation",
        },
      ],
      customer: {
        name: "Cliente_Site",
        email: "anon@facaobem.org",
      },
      metadata: {
        origem: "site",
      },
      // se quiser ativar o webhook depois, só adicionar:
      // postbackUrl: `${process.env.WEBHOOK_URL}/webhook/streetpay`,
    };

    const response = await fetch(
      "https://api.streetpay.com.br/functions/v1/transactions",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${authB64}`,
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("StreetPay error:", err);
      return NextResponse.json({ error: "Erro ao gerar Pix" }, { status: 500 });
    }

    const data = await response.json();

    return NextResponse.json({
      id: data?.id,
      amount: data?.amount,
      status: data?.status,
      pixCopiaECola: data?.pix?.qrcode || null,
      // StreetPay não manda imagem pronta — se quiser gerar,
      // dá pra usar uma lib de QRCode depois
    });
  } catch (err: any) {
    console.error("Donate API error:", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

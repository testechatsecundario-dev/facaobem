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
      // postbackUrl pode ser ativado depois se quiser webhook
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
      return NextResponse.json({ error: "Erro ao gerar Pix", details: err }, { status: 500 });
    }

    const data = await response.json();

    console.log("✅ StreetPay resposta:", JSON.stringify(data, null, 2));

    return NextResponse.json({
      ok: true,
      raw: data, // devolvemos tudo para inspecionar
      pixCopiaECola: data?.pix?.qrcode || null,
    });
  } catch (err: any) {
    console.error("Donate API error:", err);
    return NextResponse.json({ error: "Erro interno", details: err?.message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, description } = body; // amount em centavos

    const secret = process.env.STREETPAY_SECRET_KEY;
    const company = process.env.STREETPAY_COMPANY_ID;

    if (!secret || !company) {
      throw new Error("StreetPay ENV vars not configured");
    }

    // monta Basic Auth
    const authStr = `${secret}:${company}`;
    const authB64 = Buffer.from(authStr).toString("base64");

    const payload = {
      amount,
      paymentMethod: "PIX",
      pix: { qrcode: true },
      items: [
        {
          title: description || "Doação Faça o Bem",
          unitPrice: amount,
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
      // sem postbackUrl por enquanto
    };

    const response = await fetch("https://api.streetpay.com.br/functions/v1/transactions", {
      method: "POST",
      headers: {
        Authorization: `Basic ${authB64}`,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("StreetPay error:", err);
      return NextResponse.json({ error: "Erro ao gerar Pix" }, { status: 500 });
    }

    const data = await response.json();

    return NextResponse.json({
      pixCopiaECola: data?.pix?.qrcode || null,
      qrCodeImageUrl: null, // StreetPay não retorna imagem pronta
    });
  } catch (err: any) {
    console.error("Donate API error:", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

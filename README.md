# Faça o Bem • Starter (Next.js + Vercel Functions)

Site leve, responsivo e replicável para campanhas de doação via Pix.

## Funcionalidades
- Páginas de causa: `/[slug]` (veja `data/causes.ts`)
- Barra de progresso fixa em 97%
- Formulário de doação com mínimo de R$5
- Geração de Pix via `/api/donate` (proxy serverless) — **preencha os TODOs da StreetPay**
- Webhook `/api/webhook/streetpay` (opcional) para confirmação de pagamento
- Design clean com Tailwind CSS

## Como usar (local)
```bash
# 1) instalar deps
npm install

# 2) configurar variáveis
cp .env.local.example .env.local
# edite .env.local com sua STREETPAY_API_KEY e BASE_URL

# 3) rodar localmente
npm run dev
# abra http://localhost:3000
```

## Deploy (Vercel)
- Crie um projeto no https://vercel.com e importe este repositório
- Em **Settings → Environment Variables**, adicione:
  - `STREETPAY_BASE_URL`
  - `STREETPAY_API_KEY`
- Faça o deploy e teste `/chiquinho` ou `/petlove`

## Adicionar uma nova campanha
Edite `data/causes.ts` e adicione um item ao array `causes` com:
```ts
{
  slug: "novacausa",
  title: "Título da campanha",
  subtitle: "Frase curta",
  coverImage: "/images/novacausa.jpg",
  content: "Texto da história..."
}
```
Coloque a imagem em `public/images/novacausa.jpg`.

## Integração StreetPay
Substitua no arquivo `app/api/donate/route.ts`:
- `endpoint` (se o caminho for diferente)
- `headers` (se a StreetPay usar `apikey` além de `Authorization`)
- `body` conforme seu **bot que já funciona** (ex.: `payment_method: 'pix'`, `amount` em centavos, etc.)
- No retorno, mapeie para `pixCopiaECola` e `qrCodeImageUrl` conforme os nomes reais do JSON da StreetPay.

## Segurança
Nunca exponha sua API key no frontend. O proxy `/api/donate` já evita isso.
Se o provedor enviar **assinatura** no webhook, valide antes de aceitar o evento.

## Observações
- Mantemos a barra em 97% sem valores por decisão estratégica.
- Evite vídeos pesados. Prefira imagens otimizadas.
- Para métricas ou CRM, você pode armazenar cada solicitação (ex.: Google Sheets, DB).

---

Qualquer dúvida, abra o arquivo `app/api/donate/route.ts` e deixe comentários com os campos que a StreetPay exige; adapte usando o mesmo payload do seu bot.

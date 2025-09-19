import Image from "next/image";
import DonateForm from "@/components/DonateForm";
import { getCause } from "@/data/causes";
import { notFound } from "next/navigation";

export default function CausePage({ params }: { params: { slug: string } }) {
  const cause = getCause(params.slug);
  if (!cause) return notFound();

  return (
    <div className="space-y-6">
      {/* Cabeçalho com logo */}
      <header className="flex items-center gap-3 p-4 border-b border-white/10">
        <Image src="/logo.png" alt="Fundação Faça o Bem" width={48} height={48} />
        <span className="font-bold text-lg">Fundação Faça o Bem</span>
      </header>

      {/* Conteúdo da campanha */}
      <div className="card overflow-hidden">
        <div className="relative h-56 w-full">
          <Image
            src={cause.coverImage || "/images/chiquinho.jpg"}
            alt={cause.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6 md:p-8 space-y-3">
          <h1 className="text-2xl md:text-3xl font-bold">{cause.title}</h1>
          {cause.subtitle && (
            <p className="text-[color:var(--muted)]">{cause.subtitle}</p>
          )}
          <article className="prose prose-invert max-w-none">
            {cause.content.split("\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </article>
        </div>
      </div>

      {/* Formulário de doação */}
      <DonateForm slug={cause.slug} />

      {/* Rodapé */}
      <footer className="text-center text-xs text-[color:var(--muted)] py-6 border-t border-white/10">
        100% dos valores arrecadados são direcionados para essa causa.
        <br />
        Fundação Faça o Bem — CNPJ 00.000.000/0001-00 — Rua Exemplo, 123, São Paulo/SP
      </footer>
    </div>
  );
}

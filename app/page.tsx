import Link from 'next/link'
import Image from 'next/image'
import { causes } from '@/data/causes'

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="card p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-3">Sobre nós</h1>
        <p className="text-[color:var(--muted)] leading-relaxed">
          Acreditamos que pequenas doações feitas por muitas pessoas transformam histórias.
          Criamos campanhas objetivas, com materiais visuais claros e processo de doação sem burocracia via Pix.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Campanhas em destaque</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {causes.map(c => (
            <Link key={c.slug} href={`/${c.slug}`} className="card overflow-hidden hover:opacity-95 transition">
              <div className="relative h-44 w-full">
                <Image src={c.coverImage || '/images/chiquinho.jpg'} alt={c.title} fill className="object-cover" />
              </div>
              <div className="p-5">
                <h3 className="font-semibold">{c.title}</h3>
                <p className="text-sm text-[color:var(--muted)]">{c.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

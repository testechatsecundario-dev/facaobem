import Image from 'next/image'
import DonateForm from '@/components/DonateForm'
import { getCause } from '@/data/causes'
import { notFound } from 'next/navigation'

export default function CausePage({ params }: { params: { slug: string }}) {
  const cause = getCause(params.slug)
  if (!cause) return notFound()

  return (
    <div className="space-y-6">
      <div className="card overflow-hidden">
        <div className="relative h-56 w-full">
          <Image src={cause.coverImage || '/images/chiquinho.jpg'} alt={cause.title} fill className="object-cover" />
        </div>
        <div className="p-6 md:p-8 space-y-3">
          <h1 className="text-2xl md:text-3xl font-bold">{cause.title}</h1>
          {cause.subtitle && <p className="text-[color:var(--muted)]">{cause.subtitle}</p>}
          <article className="prose prose-invert max-w-none">
            {cause.content.split('\n').map((p, i) => <p key={i}>{p}</p>)}
          </article>
        </div>
      </div>
      <DonateForm slug={cause.slug} />
    </div>
  )
}

export type Cause = {
  slug: string
  title: string
  subtitle?: string
  coverImage?: string
  content: string
}

export const causes: Cause[] = [
  {
    slug: "chiquinho",
    title: "Campanha do Chiquinho",
    subtitle: "Ajude o Chiquinho a vencer essa fase",
    coverImage: "/images/chiquinho.jpg",
    content: `O Chiquinho precisa de apoio imediato para custear cuidados veterinários e alimentação.
Escreva aqui a história resumida e objetiva, com um pedido claro de ajuda.`
  },
  {
    slug: "petlove",
    title: "Resgate Coletivo PetLove",
    subtitle: "Ração, vacinas e castrações",
    coverImage: "/images/petlove.jpg",
    content: `Esta campanha apoia um grupo de protetores independentes.
Detalhe o que será feito com os recursos, mantendo objetividade e empatia.`
  }
]

export function getCause(slug: string): Cause | undefined {
  return causes.find(c => c.slug === slug)
}

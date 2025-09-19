export type Cause = {
  slug: string
  title: string
  subtitle?: string
  coverImage?: string
  content: string
}

export const causes: Cause[] = [
  {
    slug: "perebas",
    title: "Campanha do Perebas",
    subtitle: "Ajude o Perebas a vencer essa fase",
    coverImage: "/images/perebas.jpg",
    content: `O Perebas precisa de apoio imediato para custear cuidados veterinários e alimentação.
Houve uma fratura grave no maxilar e parte do lábio foi arrancado quando foi atropelado. Estamos QUASE batendo a meta.
Ele precisa da sua ajuda!`
  },
  {
    slug: "olhinho-mel",
    title: "Campanha da Mel",
    subtitle: "Você pode fazer a diferença na vida da Mel",
    coverImage: "/images/mel01.jpg",
    content: `Ela já foi resgatada e está sob cuidados veterinários.
Mas precisamos da sua ajuda para custear o tratamento e minimizar o dano que o ser humano já fez a ela.`
  }
]

export function getCause(slug: string): Cause | undefined {
  return causes.find(c => c.slug === slug)
}

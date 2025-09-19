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

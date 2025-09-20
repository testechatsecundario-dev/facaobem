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
    slug: "zeus-urgente",
    title: "Campanha do Zeus",
    subtitle: "Cada segundo pra ele conta! Socorro!!",
    coverImage: "/images/zeus.jpg",
    content: `Ele está sob cuidados, mas ainda precisa fazer a cirurgia e precisa de medicamentos que são caros.
Ele só tem você pra contar! Falta pouco!`
  },
  {
    slug: "amora",
    title: "Campanha da Amora",
    subtitle: "Família pede ajuda para cirurgia!",
    coverImage: "/images/amora.jpg",
    content: `A Amora desenvolveu um tumor na barriguinha que agora está vazando e a família está sem condições de arcar com a cirurgia.
Ela tem 9 aninhos e falta pouco para conseguirmos dar mais uma chance a ela!`
  },
  {
    slug: "thor",
    title: "Campanha do Thor",
    subtitle: "Ele precisa voltar a andar!",
    coverImage: "/images/thor.jpg",
    content: `O Thor foi atropelado por uma moto e pode perder os movimentos das patas traseiras caso não seja devidamente tratado.
Falta pouco para garantirmos que ele não perca os movimentos!`
  },
  {
    slug: "pacoca",
    title: "Campanha do Paçoca",
    subtitle: "Sua ajuda vai salvar o Paçoca! Urgente!!",
    coverImage: "/images/pacoca.jpg",
    content: `Conseguimos resgatar esse Caramelo que apelidamos de Paçoca. Ele foi vítima de tesouradas por um ser cruel e precisa da sua ajuda!.
Você pode não mudar o mundo todo, mas vai mudar o mundo todo dele!`
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

import Image from "next/image";
import Link from "next/link";
import { causes } from "@/data/causes";

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Lista de campanhas */}
      <main className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Campanhas em andamento</h1>
        <div className="grid md:grid-cols-2 gap-6">
          {causes.map((cause) => (
            <Link
              key={cause.slug}
              href={`/${cause.slug}`}
              className="card overflow-hidden hover:shadow-lg transition"
            >
              <div className="relative h-40 w-full">
                <Image
                  src={cause.coverImage || "/images/chiquinho.jpg"}
                  alt={cause.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 space-y-2">
                <h2 className="text-lg font-bold">{cause.title}</h2>
                {cause.subtitle && (
                  <p className="text-sm text-[color:var(--muted)]">{cause.subtitle}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

import Image from 'next/image'

export default function GaleriaCurso({ fotos }: { fotos: string[] }) {
  if (!fotos.length) return null

  return (
    <div
      className="columns-2 md:columns-3 lg:columns-4 gap-3"
      style={{ columnGap: '0.75rem' }}
    >
      {fotos.map((url, i) => (
        <div key={i} className="break-inside-avoid mb-3 relative overflow-hidden rounded-lg">
          <Image
            src={url}
            alt={`Instrumento de aluno ${i + 1}`}
            width={400}
            height={300}
            className="w-full h-auto object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </div>
      ))}
    </div>
  )
}

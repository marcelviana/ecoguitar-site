export default function YoutubeEmbed({
  videoId,
  titulo,
}: {
  videoId: string
  titulo: string
}) {
  return (
    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title={titulo}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="absolute inset-0 w-full h-full rounded-xl"
      />
    </div>
  )
}

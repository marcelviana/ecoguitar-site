export default function CategoryBadge({ label }: { label: string }) {
  return (
    <span className="inline-block font-mono text-label uppercase px-2 py-px bg-eco-turquoise/10 border border-eco-turquoise/30 text-eco-turquoise-dk rounded">
      {label}
    </span>
  )
}

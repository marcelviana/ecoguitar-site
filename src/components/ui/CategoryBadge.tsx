export default function CategoryBadge({ label }: { label: string }) {
  return (
    <span className="inline-block font-mono text-label uppercase tracking-widest px-2.5 py-0.5 bg-eco-turquoise/10 border border-eco-turquoise/30 text-eco-turquoise-dk rounded">
      {label}
    </span>
  )
}

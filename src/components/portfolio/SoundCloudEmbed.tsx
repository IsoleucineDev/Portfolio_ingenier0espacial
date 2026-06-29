interface SoundCloudEmbedProps {
  embedUrl: string
  title: string
  compact?: boolean
}

export default function SoundCloudEmbed({ embedUrl, title, compact = false }: SoundCloudEmbedProps) {
  const height = compact ? 200 : 350

  return (
    <div className="w-full rounded-xl overflow-hidden" style={{ maxWidth: compact ? 420 : '100%' }}>
      <iframe
        title={`${title} — SoundCloud Player`}
        width="100%"
        height={height}
        src={embedUrl}
        allow="autoplay"
        style={{ border: 'none', borderRadius: 12 }}
        loading="lazy"
      />
    </div>
  )
}

interface SupademoProps {
  url?: string
  title?: string
  height?: string
}

export function Supademo({
  url = 'https://app.supademo.com/embed/cmgzdkn6w0t2t6nxtxpf2xi1r?embed_v=2',
  title = 'Create a manual agent trigger in Ekinox',
  height = '600px',
}: SupademoProps) {
  return (
    <div className="my-8 not-prose">
      <div
        className="relative w-full overflow-hidden rounded-lg shadow-lg border border-border bg-transparent"
        style={{
          paddingBottom: '59.82%',
        }}
      >
        <iframe
          src={url}
          loading="lazy"
          title={title}
          allow="clipboard-write"
          frameBorder="0"
          allowFullScreen
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 0,
          }}
        />
      </div>
    </div>
  )
}

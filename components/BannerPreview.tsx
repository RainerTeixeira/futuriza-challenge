'use client'

interface BannerPreviewProps {
  imageUrl?: string
  url?: string
}

export function BannerPreview({ imageUrl, url }: BannerPreviewProps) {
  if (!imageUrl) {
    return (
      <div className="border-2 border-dashed rounded-lg p-8 text-center text-muted-foreground">
        Preview do banner aparecerá aqui
      </div>
    )
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <a href={url || '#'} target="_blank" rel="noopener noreferrer" className="block">
        <img src={imageUrl} alt="Banner preview" className="w-full h-auto" />
      </a>
      {url && (
        <div className="p-2 bg-muted text-sm">
          <span className="font-medium">URL:</span> {url}
        </div>
      )}
    </div>
  )
}

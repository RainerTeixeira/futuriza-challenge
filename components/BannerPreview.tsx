/**
 * @fileoverview Banner preview component for real-time banner visualization
 * @module components/BannerPreview
 */

'use client'

/**
 * Props interface for BannerPreview component
 * @interface BannerPreviewProps
 */
interface BannerPreviewProps {
  /** @description URL of the banner image to display */
  imageUrl?: string
  /** @description Target URL that the banner links to */
  url?: string
}

/**
 * Banner preview component that displays a real-time preview of banner appearance
 * @function BannerPreview
 * @param {BannerPreviewProps} props - Component props
 * @param {string} [props.imageUrl] - URL of the banner image
 * @param {string} [props.url] - Target URL for the banner link
 * @returns {JSX.Element} Rendered banner preview or placeholder
 * @description Shows either a placeholder message or the actual banner with clickable link
 */
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

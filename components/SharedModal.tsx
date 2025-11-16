import type { SVGProps } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Download, Instagram, Twitter } from "lucide-react";
import type { SharedModalProps, ImageProps } from "../utils/types";
import useKeypress from "react-use-keypress";

/**
 * Simple WhatsApp logo as an inline SVG.
 * This avoids relying on a missing brand icon from lucide-react.
 */
function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        d="M16 3C9.383 3 4 8.383 4 15c0 2.363.676 4.57 1.848 6.44L4 29l7.79-1.815A11.86 11.86 0 0 0 16 27c6.617 0 12-5.383 12-12S22.617 3 16 3Z"
        fill="#25D366"
      />
      <path
        d="M16 5.5C10.768 5.5 6.5 9.768 6.5 15c0 2.13.68 3.957 1.84 5.38l-.8 3.093 3.164-.763A9.27 9.27 0 0 0 16 24.5c5.232 0 9.5-4.268 9.5-9.5S21.232 5.5 16 5.5Z"
        fill="#fff"
      />
      <path
        d="M20.422 18.23c-.327-.163-1.93-.953-2.23-1.062-.3-.11-.52-.163-.74.163-.22.327-.848 1.061-1.04 1.284-.19.22-.383.245-.71.082-.327-.164-1.377-.508-2.622-1.62-.97-.866-1.624-1.933-1.815-2.26-.19-.327-.02-.503.144-.665.147-.147.327-.382.49-.573.163-.19.218-.327.327-.545.11-.218.055-.408-.027-.573-.082-.163-.74-1.79-1.014-2.454-.266-.638-.537-.55-.74-.56l-.63-.011c-.218 0-.573.082-.873.382-.3.3-1.146 1.12-1.146 2.73 0 1.61 1.172 3.166 1.335 3.383.163.218 2.308 3.52 5.59 4.777.781.301 1.39.48 1.864.615.783.223 1.496.192 2.06.117.628-.084 1.93-.79 2.204-1.553.273-.763.273-1.417.191-1.553-.082-.137-.3-.218-.628-.382Z"
        fill="#25D366"
      />
    </svg>
  );
}

export default function SharedModal({
  index,
  images,
  currentPhoto,
  changePhotoId,
  closeModal,
  navigation,
}: SharedModalProps) {
  // Decide which image to show:
  // - If navigation is enabled, we expect an images[] array + index
  // - Otherwise we fall back to a single currentPhoto (used by Carousel)
  const current: ImageProps | undefined =
    navigation && images && images.length > 0
      ? images[index]
      : currentPhoto;

  if (!current) return null;

  const imageUrl = current.secure_url;
  const pageUrl = typeof window !== "undefined" ? window.location.href : imageUrl;

  const shareText = encodeURIComponent("Check out this moment from Africa Blockchain Festival 2025");
  const encodedUrl = encodeURIComponent(pageUrl);

  const twitterShare = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${shareText}`;
  // Instagram has no direct web-share with prefilled media, so we just open Instagram
  const instagramShare = `https://www.instagram.com/?url=${encodedUrl}`;
  const whatsappShare = `https://wa.me/?text=${shareText}%20${encodedUrl}`;

  // Keyboard navigation for arrow keys when navigation is enabled
  useKeypress("ArrowRight", () => {
    if (!navigation || !images) return;
    if (index + 1 < images.length) {
      changePhotoId(index + 1);
    }
  });

  useKeypress("ArrowLeft", () => {
    if (!navigation || !images) return;
    if (index > 0) {
      changePhotoId(index - 1);
    }
  });

  return (
    <div className="relative flex max-h-[90vh] max-w-[95vw] flex-col overflow-hidden rounded-2xl bg-black/80 p-4 text-white shadow-2xl">
      {/* Top bar: Close + Share + Download */}
      <div className="mb-3 flex items-center justify-between gap-4 text-sm">
        <button
          type="button"
          onClick={closeModal}
          className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wide hover:bg-white/20"
        >
          Close
        </button>

        <div className="flex items-center gap-3">
          {/* Share buttons */}
          <span className="text-xs text-white/60">Share</span>
          <a
            href={twitterShare}
            target="_blank"
            rel="noreferrer"
            aria-label="Share on X (Twitter)"
            className="rounded-full bg-white/10 p-1.5 hover:bg-white/20"
          >
            <Twitter size={20} />
          </a>
          <a
            href={instagramShare}
            target="_blank"
            rel="noreferrer"
            aria-label="Share on Instagram"
            className="rounded-full bg-white/10 p-1.5 hover:bg-white/20"
          >
            <Instagram size={20} />
          </a>
          <a
            href={whatsappShare}
            target="_blank"
            rel="noreferrer"
            aria-label="Share on WhatsApp"
            className="rounded-full bg-white/10 p-1.5 hover:bg-white/20"
          >
            <WhatsAppIcon width={20} height={20} />
          </a>

          {/* Download button */}
          <a
            href={imageUrl}
            download
            target="_blank"
            rel="noreferrer"
            aria-label="Download image"
            className="ml-2 rounded-full bg-white/10 p-1.5 hover:bg-white/20"
          >
            <Download size={20} />
          </a>
        </div>
      </div>

      {/* Main image area */}
      <div className="relative flex items-center justify-center">
        {navigation && images && images.length > 1 && (
          <button
            type="button"
            onClick={() => index > 0 && changePhotoId(index - 1)}
            className="absolute left-0 z-20 ml-1 rounded-full bg-black/40 p-2 hover:bg-black/70"
            aria-label="Previous photo"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        <motion.img
          key={current.secure_url}
          src={current.secure_url}
          alt={current.public_id || "Photo"}
          className="mx-auto max-h-[80vh] w-auto max-w-full rounded-lg object-contain"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {navigation && images && images.length > 1 && (
          <button
            type="button"
            onClick={() =>
              index + 1 < images.length && changePhotoId(index + 1)
            }
            className="absolute right-0 z-20 mr-1 rounded-full bg-black/40 p-2 hover:bg-black/70"
            aria-label="Next photo"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
}

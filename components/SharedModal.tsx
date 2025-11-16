import { motion } from "framer-motion";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Download,
  Instagram,
  MessageCircle,
} from "lucide-react";
import type { ImageProps } from "../utils/types";

export default function SharedModal({
  index,
  images,
  changePhotoId,
  closeModal,
  navigation = true,
}: {
  index: number;
  images: ImageProps[];
  changePhotoId: (val: number) => void;
  closeModal: () => void;
  navigation?: boolean;
}) {
  const currentPhoto = images[index];
  const imgUrl = currentPhoto?.secure_url || currentPhoto?.public_id;

  if (!currentPhoto) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/80">
        <button
          onClick={closeModal}
          className="px-4 py-2 rounded bg-orange-600 text-white"
        >
          Back to Gallery
        </button>
      </div>
    );
  }

  const shareUrl = encodeURIComponent(imgUrl);
  const caption = encodeURIComponent("Africa Blockchain Festival 2025 Photo");

  return (
    <div className="relative z-50 flex h-full w-full items-center justify-center p-4">
      {/* Close button */}
      <button
        className="absolute top-4 right-4 z-50 rounded-full bg-black/50 p-2 text-white backdrop-blur"
        onClick={closeModal}
        aria-label="Close"
      >
        <X size={24} />
      </button>

      {/* Navigation Left */}
      {navigation && index > 0 && (
        <button
          onClick={() => changePhotoId(index - 1)}
          className="absolute left-4 z-50 rounded-full bg-black/50 p-2 text-white backdrop-blur hover:bg-black/70"
          aria-label="Previous image"
        >
          <ChevronLeft size={30} />
        </button>
      )}

      {/* Navigation Right */}
      {navigation && index < images.length - 1 && (
        <button
          onClick={() => changePhotoId(index + 1)}
          className="absolute right-4 z-50 rounded-full bg-black/50 p-2 text-white backdrop-blur hover:bg-black/70"
          aria-label="Next image"
        >
          <ChevronRight size={30} />
        </button>
      )}

      {/* Actual Image */}
      <motion.div
        key={imgUrl}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="relative max-h-[90vh] max-w-[95vw]"
      >
        <Image
          src={imgUrl}
          alt="Photo"
          width={currentPhoto.width}
          height={currentPhoto.height}
          unoptimized
          className="rounded-xl object-contain max-h-[90vh] max-w-[95vw]"
        />
      </motion.div>

      {/* Share + Download Controls */}
      <div className="absolute bottom-6 flex items-center gap-6 bg-black/40 px-5 py-3 rounded-full backdrop-blur">
        {/* Download */}
        <a
          href={imgUrl}
          download
          aria-label="Download image"
          className="text-white hover:text-orange-400 transition"
        >
          <Download size={22} />
        </a>

        {/* X */}
        <a
          href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${caption}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X"
          className="text-white hover:text-orange-400 transition"
        >
          <X size={22} />
        </a>

        {/* Instagram (cannot deep-link upload; opens app/site) */}
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="text-white hover:text-orange-400 transition"
        >
          <Instagram size={22} />
        </a>

        {/* WhatsApp */}
        <a
          href={`https://api.whatsapp.com/send?text=${caption}%20${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on WhatsApp"
          className="text-white hover:text-green-400 transition"
        >
          <MessageCircle size={22} />
        </a>
      </div>
    </div>
  );
}

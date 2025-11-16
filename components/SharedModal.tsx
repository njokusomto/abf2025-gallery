import { motion } from "framer-motion";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Download,
  Instagram,
  Twitter,
  Whatsapp,
} from "lucide-react";
import type { ImageProps } from "../utils/types";
import useKeypress from "react-use-keypress";

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

  // Always build a valid Cloudinary URL
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const imgUrl =
    currentPhoto.secure_url ||
    `https://res.cloudinary.com/${cloudName}/image/upload/${currentPhoto.public_id}.${currentPhoto.format}`;

  const shareUrl = encodeURIComponent(imgUrl);
  const caption = encodeURIComponent("Africa Blockchain Festival 2025 Photo");

  // Keyboard navigation
  useKeypress("ArrowRight", () => {
    if (index < images.length - 1) changePhotoId(index + 1);
  });

  useKeypress("ArrowLeft", () => {
    if (index > 0) changePhotoId(index - 1);
  });

  useKeypress("Escape", closeModal);

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

      {/* Left */}
      {navigation && index > 0 && (
        <button
          onClick={() => changePhotoId(index - 1)}
          className="absolute left-4 z-50 rounded-full bg-black/50 p-2 text-white backdrop-blur hover:bg-black/70"
        >
          <ChevronLeft size={30} />
        </button>
      )}

      {/* Right */}
      {navigation && index < images.length - 1 && (
        <button
          onClick={() => changePhotoId(index + 1)}
          className="absolute right-4 z-50 rounded-full bg-black/50 p-2 text-white backdrop-blur hover:bg-black/70"
        >
          <ChevronRight size={30} />
        </button>
      )}

      {/* Image */}
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
          unoptimized
          width={currentPhoto.width}
          height={currentPhoto.height}
          className="rounded-xl object-contain max-h-[90vh] max-w-[95vw]"
        />
      </motion.div>

      {/* Controls */}
      <div className="absolute bottom-6 flex items-center gap-6 bg-black/40 px-5 py-3 rounded-full backdrop-blur">
        {/* Download */}
        <a
          href={imgUrl}
          download
          className="text-white hover:text-orange-400 transition"
        >
          <Download size={22} />
        </a>

        {/* X / Twitter */}
        <a
          href={`https://twitter.com/intent/tweet?text=${caption}&url=${shareUrl}`}
          target="_blank"
          className="text-white hover:text-orange-400 transition"
        >
          <Twitter size={22} />
        </a>

        {/* Instagram (cannot auto-upload) */}
        <a
          href="https://www.instagram.com/"
          target="_blank"
          className="text-white hover:text-orange-400 transition"
        >
          <Instagram size={22} />
        </a>

        {/* WhatsApp (correct icon) */}
        <a
          href={`https://api.whatsapp.com/send?text=${caption}%20${shareUrl}`}
          target="_blank"
          className="text-white hover:text-green-400 transition"
        >
          <Whatsapp size={22} />
        </a>
      </div>
    </div>
  );
}

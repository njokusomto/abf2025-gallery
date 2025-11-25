"use client";

import {
  ChevronLeft,
  ChevronRight,
  X,
  Twitter,
  Instagram,
  Download,
} from "lucide-react";
import { motion } from "framer-motion";
import type { ImageProps } from "../utils/types";

// Cloudinary WhatsApp icon replacement
function WhatsAppIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="currentColor"
    >
      <path d="M16.04 3C9.41 3 4 8.41 4 15.04c0 2.65.87 5.11 2.34 7.12L4 29l7.06-2.31a12.8 12.8 0 004.98 1.01c6.63 0 12.04-5.41 12.04-12.04C28.08 8.4 22.67 3 16.04 3zm0 21.93c-1.63 0-3.21-.43-4.6-1.25l-.33-.2-4.18 1.36 1.37-4.07-.21-.33A10.13 10.13 0 015.9 15c0-5.6 4.54-10.14 10.14-10.14S26.18 9.4 26.18 15 21.64 24.93 16.04 24.93zm5.48-7.16c-.3-.15-1.79-.88-2.07-.98-.28-.1-.48-.15-.69.15-.2.3-.79.98-.97 1.18-.18.2-.36.23-.66.08-.3-.15-1.27-.47-2.43-1.5a9.07 9.07 0 01-1.7-2.1c-.18-.3-.02-.46.13-.61.14-.14.3-.36.45-.54.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.54-.08-.15-.69-1.66-.95-2.27-.25-.6-.5-.52-.68-.53h-.58c-.2 0-.52.08-.79.38-.26.3-1.04 1-1.04 2.42 0 1.43 1.07 2.8 1.22 2.98.15.2 2.1 3.21 5.1 4.5 3 1.3 3 0.86 3.54.8.55-.07 1.79-.73 2.04-1.43.25-.7.25-1.3.18-1.43-.07-.13-.26-.2-.55-.35z" />
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
}: {
  index: number;
  images: ImageProps[];
  currentPhoto: ImageProps;
  changePhotoId: (val: number) => void;
  closeModal: () => void;
  navigation: boolean;
}) {
  const previewSrc = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto,w_1200/${currentPhoto.public_id}.${currentPhoto.format}`;
  const fullSrc = currentPhoto.secure_url;

  return (
    <div className="relative flex flex-col items-center justify-center">
      <motion.img
        key={currentPhoto.public_id}
        src={previewSrc}
        alt={currentPhoto.public_id}
        className="max-h-[85vh] w-auto object-contain rounded-lg shadow-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      <div className="absolute top-4 flex items-center space-x-3 px-4 py-2 bg-black/60 rounded-full text-white shadow-xl">
        <button
          onClick={closeModal}
          className="flex items-center hover:text-red-400"
        >
          <X size={18} />
          <span className="ml-1 text-sm">CLOSE</span>
        </button>

        <span className="text-sm opacity-80">Share</span>

        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(fullSrc)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400"
        >
          <Twitter size={18} />
        </a>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-400"
        >
          <Instagram size={18} />
        </a>

        <a
          href={`https://wa.me/?text=${encodeURIComponent(fullSrc)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-400"
        >
          <WhatsAppIcon size={18} />
        </a>

        <a href={fullSrc} download className="hover:text-gray-200">
          <Download size={18} />
        </a>
      </div>

      {navigation && images.length > 1 && (
        <>
          {index > 0 && (
            <button
              onClick={() => changePhotoId(index - 1)}
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full text-white hover:bg-black/70"
            >
              <ChevronLeft size={32} />
            </button>
          )}

          {index < images.length - 1 && (
            <button
              onClick={() => changePhotoId(index + 1)}
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full text-white hover:bg-black/70"
            >
              <ChevronRight size={32} />
            </button>
          )}
        </>
      )}
    </div>
  );
}

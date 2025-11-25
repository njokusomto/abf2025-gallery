"use client";

import {
  ChevronLeft,
  ChevronRight,
  X,
  Twitter,
  Instagram,
  Download,
  MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import type { ImageProps } from "../utils/types";

type SharedModalProps = {
  index: number;
  images: ImageProps[];
  currentPhoto?: ImageProps;
  changePhotoId: (val: number) => void;
  closeModal: () => void;
  navigation: boolean;
};

export default function SharedModal({
  index,
  images,
  currentPhoto,
  changePhotoId,
  closeModal,
  navigation,
}: SharedModalProps) {
  // Always resolve a current image, even if currentPhoto is not passed
  const current =
    currentPhoto ||
    (images && images[index]) || {
      public_id: "missing",
      format: "jpg",
      id: index,
      width: 0,
      height: 0,
    };

  // Prefer secure_url if provided, otherwise build the Cloudinary URL
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const fallbackSrc =
    cloudName && current.public_id && current.format
      ? `https://res.cloudinary.com/${cloudName}/image/upload/c_scale,w_1280/${current.public_id}.${current.format}`
      : "";

  const src = current.secure_url || fallbackSrc;

  if (!src) {
    console.warn("SharedModal: missing image src", { index, current });
  }

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* IMAGE */}
      <motion.img
        key={current.public_id}
        src={src}
        alt={current.public_id}
        className="max-h-[85vh] w-auto object-contain rounded-lg shadow-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* TOP BAR */}
      <div className="absolute top-4 flex items-center space-x-3 px-4 py-2 bg-black/60 rounded-full text-white shadow-xl">
        <button
          onClick={closeModal}
          className="flex items-center hover:text-red-400"
        >
          <X size={18} />
          <span className="ml-1 text-sm">CLOSE</span>
        </button>

        <span className="text-sm opacity-80">Share</span>

        {/* X / Twitter */}
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
            src,
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400"
        >
          <Twitter size={18} />
        </a>

        {/* Instagram – no direct API, link to site */}
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-400"
        >
          <Instagram size={18} />
        </a>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/?text=${encodeURIComponent(src)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-400"
        >
          <MessageCircle size={18} />
        </a>

        {/* Download */}
        <a href={src} download className="hover:text-gray-200">
          <Download size={18} />
        </a>
      </div>

      {/* ARROWS */}
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

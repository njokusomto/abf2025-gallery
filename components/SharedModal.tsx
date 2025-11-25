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
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { ImageProps } from "../utils/types";

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
  // very fast low-res
  const lowRes = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_600/${currentPhoto.public_id}.${currentPhoto.format}`;

  // full-resolution
  const highRes = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${currentPhoto.public_id}.${currentPhoto.format}`;

  const [src, setSrc] = useState(lowRes);
  const [isLoaded, setIsLoaded] = useState(false);

  // preload hi-res once modal opens
  useEffect(() => {
    const img = new Image();
    img.src = highRes;
    img.onload = () => setSrc(highRes);
  }, [highRes]);

  return (
    <div className="relative flex flex-col items-center justify-center">
      <motion.img
        key={src}
        src={src}
        alt={currentPhoto.public_id}
        className="max-h-[85vh] w-auto object-contain rounded-lg shadow-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Toolbar */}
      <div className="absolute top-4 flex items-center space-x-3 px-4 py-2 bg-black/60 rounded-full text-white shadow-xl">
        <button onClick={closeModal} className="flex items-center hover:text-red-400">
          <X size={18} />
          <span className="ml-1 text-sm">Close</span>
        </button>

        <span className="text-sm opacity-80">Share</span>

        {/* X */}
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(highRes)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitter size={18} />
        </a>

        {/* Instagram */}
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <Instagram size={18} />
        </a>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/?text=${encodeURIComponent(highRes)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle size={18} />
        </a>

        {/* Download always full-res */}
        <a href={highRes} download>
          <Download size={18} />
        </a>
      </div>

      {/* Arrows */}
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

"use client";

import {
  ChevronLeft,
  ChevronRight,
  X,
  Twitter,
  Instagram,
  Download
} from "lucide-react";
import WhatsAppIcon from "./Icons/WhatsAppIcon";
import { motion } from "framer-motion";
import type { ImageProps } from "../utils/types";

export default function SharedModal({
  index,
  images,
  currentPhoto,
  changePhotoId,
  closeModal,
  navigation,
  isHiRes,
}: {
  index: number;
  images: ImageProps[];
  currentPhoto: ImageProps;
  changePhotoId: (val: number) => void;
  closeModal: () => void;
  navigation: boolean;
  isHiRes: boolean;
}) {

  const base = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

  const lowResSrc = `${base}/c_scale,w_600/${currentPhoto.public_id}.${currentPhoto.format}`;
  const hiResSrc = currentPhoto.secure_url || lowResSrc;

  const displayedSrc = isHiRes ? hiResSrc : lowResSrc;

  return (
    <div className="relative flex flex-col items-center justify-center">

      <motion.img
        key={currentPhoto.public_id}
        src={displayedSrc}
        alt={currentPhoto.public_id}
        className="max-h-[85vh] w-auto object-contain rounded-lg shadow-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      <div className="absolute top-4 flex items-center space-x-3 px-4 py-2 bg-black/60 rounded-full text-white shadow-xl">
        <button onClick={closeModal} className="flex items-center hover:text-red-400">
          <X size={18} />
          <span className="ml-1 text-sm">CLOSE</span>
        </button>

        <span className="text-sm opacity-80">Share</span>

        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(hiResSrc)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400"
        >
          <Twitter size={18} />
        </a>

        <a
          href={`https://wa.me/?text=${encodeURIComponent(hiResSrc)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-400"
        >
          <WhatsAppIcon size={18} />
        </a>

        <a href={hiResSrc} download className="hover:text-gray-200">
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

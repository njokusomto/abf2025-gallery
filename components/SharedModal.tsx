"use client";

import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Download,
  Twitter,
  Instagram,
  MessageCircle,
} from "lucide-react";
import type { ImageProps, SharedModalProps } from "../utils/types";
import useKeypress from "react-use-keypress";

export default function SharedModal({
  index,
  images,
  changePhotoId,
  closeModal,
  navigation,
}: SharedModalProps) {
  const current: ImageProps = images![index];

  useKeypress("ArrowRight", () => {
    if (!navigation) return;
    if (index + 1 < images!.length) changePhotoId(index + 1);
  });

  useKeypress("ArrowLeft", () => {
    if (!navigation) return;
    if (index > 0) changePhotoId(index - 1);
  });

  const shareUrl = current.secure_url;

  return (
    <div className="relative flex flex-col items-center">
      {/* Controls */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40">
        <div className="flex items-center gap-4 bg-black/60 px-4 py-2 rounded-full text-white">
          <button onClick={closeModal} className="flex items-center gap-2">
            <X className="w-4 h-4" />
            CLOSE
          </button>

          <span>Share</span>

          <a href={`https://twitter.com/share?url=${shareUrl}`} target="_blank">
            <Twitter className="w-4 h-4" />
          </a>

          <a href={`https://www.instagram.com/?url=${shareUrl}`} target="_blank">
            <Instagram className="w-4 h-4" />
          </a>

          <a href={`https://wa.me/?text=${shareUrl}`} target="_blank">
            <MessageCircle className="w-4 h-4" /> 
          </a>

          <a href={shareUrl} download>
            <Download className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Navigation */}
      {navigation && (
        <>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white z-40"
            onClick={() => index > 0 && changePhotoId(index - 1)}
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white z-40"
            onClick={() =>
              index + 1 < images!.length && changePhotoId(index + 1)
            }
          >
            <ChevronRight className="w-10 h-10" />
          </button>
        </>
      )}

      {/* Actual image */}
      <motion.img
        key={current.secure_url}
        src={current.secure_url}
        alt={current.public_id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-h-[85vh] w-auto object-contain rounded-lg shadow-xl"
      />
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Download,
  Twitter,
  Instagram,
  MessageCircle, // WhatsApp alternative
} from "lucide-react";
import type { ImageProps, SharedModalProps } from "../utils/types";
import useKeypress from "react-use-keypress";

export default function SharedModal({
  index,
  images = [],
  changePhotoId,
  closeModal,
  navigation = true,
}: SharedModalProps) {
  const current: ImageProps = images[index];

  const next = () => {
    if (index + 1 < images.length) changePhotoId(index + 1);
  };

  const prev = () => {
    if (index > 0) changePhotoId(index - 1);
  };

  useKeypress(["ArrowRight", "ArrowLeft"], (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = current.secure_url;
    link.download = `${current.public_id}.${current.format}`;
    link.click();
  };

  const shareToTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        current.secure_url
      )}`,
      "_blank"
    );
  };

  const shareToInstagram = () => {
    window.open("https://instagram.com", "_blank");
  };

  const shareToWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(current.secure_url)}`,
      "_blank"
    );
  };

  return (
    <div className="relative select-none flex flex-col items-center justify-center max-w-[95vw] max-h-[95vh]">
      {/* Top Controls */}
      <div className="flex items-center gap-4 bg-black/70 text-white px-4 py-2 rounded-full mb-3 z-50">
        <button onClick={closeModal} className="flex items-center gap-1">
          <X className="w-4 h-4" />
          <span>CLOSE</span>
        </button>

        <span className="opacity-70">Share</span>

        <button onClick={shareToTwitter}>
          <Twitter className="w-5 h-5" />
        </button>

        <button onClick={shareToInstagram}>
          <Instagram className="w-5 h-5" />
        </button>

        <button onClick={shareToWhatsApp}>
          <MessageCircle className="w-5 h-5" />
        </button>

        <button onClick={downloadImage}>
          <Download className="w-5 h-5" />
        </button>
      </div>

      {/* Image */}
      <motion.img
        key={current.secure_url}
        src={current.secure_url}
        alt={current.public_id}
        className="max-h-[85vh] w-auto object-contain rounded-lg shadow-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Navigation */}
      {navigation && index > 0 && (
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {navigation && index + 1 < images.length && (
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}

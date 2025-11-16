"use client";

import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Download,
  Instagram,
  Twitter,
} from "lucide-react";
import type { ImageProps } from "../utils/types";
import useKeypress from "react-use-keypress";
import { useEffect } from "react";

export default function SharedModal({
  index,
  images,
  changePhotoId,
  closeModal,
  navigation,
}: {
  index: number;
  images: ImageProps[];
  changePhotoId: (newVal: number) => void;
  closeModal: () => void;
  navigation: boolean;
}) {
  const current = images[index];

  // Keyboard navigation
  useKeypress("ArrowRight", () => {
    if (index + 1 < images.length) changePhotoId(index + 1);
  });

  useKeypress("ArrowLeft", () => {
    if (index > 0) changePhotoId(index - 1);
  });

  // Handle share logic
  const shareUrl = current.secure_url;

  function handleTwitterShare() {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      shareUrl
    )}`;
    window.open(url, "_blank");
  }

  function handleInstagramShare() {
    // Instagram does NOT support direct URLs.
    // We COPY the link to clipboard.
    navigator.clipboard.writeText(shareUrl);
    alert("Image link copied. Paste into Instagram Story or DM.");
  }

  function handleWhatsappShare() {
    const url = `https://wa.me/?text=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank");
  }

  function handleDownload() {
    const link = document.createElement("a");
    link.href = current.secure_url;
    link.download = `${current.public_id}.${current.format}`;
    link.click();
  }

  return (
    <div className="relative max-w-[95vw] max-h-[90vh] z-[999]">
      {/* Top controls */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-50 flex items-center space-x-4 bg-black/60 px-4 py-2 rounded-full backdrop-blur">
        <button
          onClick={closeModal}
          className="text-white text-sm font-semibold tracking-wide"
        >
          CLOSE
        </button>

        <span className="text-gray-300 text-sm">Share</span>

        {/* Twitter */}
        <button
          onClick={handleTwitterShare}
          className="text-white hover:text-blue-400"
        >
          <Twitter size={20} />
        </button>

        {/* Instagram */}
        <button
          onClick={handleInstagramShare}
          className="text-white hover:text-pink-400"
        >
          <Instagram size={20} />
        </button>

        {/* WhatsApp */}
        <button
          onClick={handleWhatsappShare}
          className="text-white hover:text-green-400"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
            className="w-5 h-5"
          />
        </button>

        {/* Download */}
        <button
          onClick={handleDownload}
          className="text-white hover:text-gray-300"
        >
          <Download size={20} />
        </button>
      </div>

      {/* Navigation arrows */}
      {navigation && index > 0 && (
        <button
          className="absolute left-3 top-1/2 -translate-y-1/2 z-50 bg-black/50 p-2 rounded-full"
          onClick={() => changePhotoId(index - 1)}
        >
          <ChevronLeft className="text-white" size={28} />
        </button>
      )}

      {navigation && index + 1 < images.length && (
        <button
          className="absolute right-3 top-1/2 -translate-y-1/2 z-50 bg-black/50 p-2 rounded-full"
          onClick={() => changePhotoId(index + 1)}
        >
          <ChevronRight className="text-white" size={28} />
        </button>
      )}

      {/* Actual Image */}
      <motion.img
        key={current.secure_url}
        src={current.secure_url}
        alt={current.public_id}
        className="rounded-lg object-contain w-auto h-auto max-h-[90vh] mx-auto"
      />
    </div>
  );
}

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
import { useSwipeable } from "react-swipeable";
import useKeypress from "react-use-keypress";
import { useEffect } from "react";
import type { ImageProps } from "../utils/types";
import WhatsAppIcon from "./Icons/WhatsAppIcon";

export default function SharedModal({
  index,
  images,
  currentPhoto,
  changePhotoId,
  closeModal,
  navigation,
  isHiRes,
  setIsHiRes,
}: {
  index: number;
  images: ImageProps[];
  currentPhoto: ImageProps;
  changePhotoId: (val: number) => void;
  closeModal: () => void;
  navigation: boolean;
  isHiRes: boolean;
  setIsHiRes: (v: boolean) => void;
}) {
  const base = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

  const lowResSrc = `${base}/c_scale,w_600/${currentPhoto.public_id}.${currentPhoto.format}`;
  const hiResSrc = currentPhoto.secure_url || lowResSrc;

  const displayedSrc = isHiRes ? hiResSrc : lowResSrc;

  // upgrade to hi-res after 7 seconds
  useEffect(() => {
    const timer = setTimeout(() => setIsHiRes(true), 7000);
    return () => clearTimeout(timer);
  }, [currentPhoto, setIsHiRes]);

  // preload next/previous images
  useEffect(() => {
    const preloadList: string[] = [];

    for (let i = index - 5; i <= index + 10; i++) {
      if (i >= 0 && i < images.length) {
        preloadList.push(
          `${base}/c_scale,w_600/${images[i].public_id}.${images[i].format}`
        );
      }
    }

    preloadList.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [index, images]);

  useKeypress("ArrowRight", () => {
    if (navigation && index < images.length - 1) changePhotoId(index + 1);
  });

  useKeypress("ArrowLeft", () => {
    if (navigation && index > 0) changePhotoId(index - 1);
  });

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (navigation && index < images.length - 1) changePhotoId(index + 1);
    },
    onSwipedRight: () => {
      if (navigation && index > 0) changePhotoId(index - 1);
    },
    trackMouse: true,
  });

  return (
    <div
      {...swipeHandlers}
      className="relative flex flex-col items-center justify-center"
    >
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

"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import type { ImageProps } from "../utils/types";

export default function SharedModal({
  images,
  index,
  changePhotoId,
  closeModal,
  navigation,
}: {
  images: ImageProps[];
  index: number;
  changePhotoId: (val: number) => void;
  closeModal: () => void;
  navigation?: boolean;
}) {
  const currentImage = images[index];

  if (!currentImage) return null;

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.25 }}
    >
      {/* Close button (optional top-right) */}
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-white text-3xl font-light hover:text-[#FE4600] transition-all"
      >
        ×
      </button>

      {/* Main image */}
      <div className="flex items-center justify-center max-h-[90vh] max-w-[95vw]">
        <img
          src={currentImage.secure_url}
          alt={currentImage.public_id}
          className="rounded-lg shadow-2xl object-contain"
          style={{
            maxHeight: "90vh",
            maxWidth: "95vw",
            height: "auto",
            width: "auto",
          }}
        />
      </div>

      {/* Navigation arrows */}
      {navigation && (
        <>
          {index > 0 && (
            <button
              onClick={() => changePhotoId(index - 1)}
              className="absolute left-5 text-white hover:text-[#FE4600]"
              aria-label="Previous image"
            >
              <ChevronLeft size={40} />
            </button>
          )}
          {index + 1 < images.length && (
            <button
              onClick={() => changePhotoId(index + 1)}
              className="absolute right-5 text-white hover:text-[#FE4600]"
              aria-label="Next image"
            >
              <ChevronRight size={40} />
            </button>
          )}
        </>
      )}

      {/* Download + Share */}
      <div className="flex items-center justify-center gap-6 mt-6">
        {/* Download */}
        <a
          href={currentImage.secure_url}
          download
          className="text-white hover:text-[#FE4600]"
          title="Download"
        >
          <Download size={26} />
        </a>

        {/* X */}
        <a
          href={`https://twitter.com/intent/tweet?text=Check%20out%20this%20photo%20from%20ABF2025!&url=${encodeURIComponent(
            currentImage.secure_url
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-[#1DA1F2]"
          title="Share on X"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="currentColor"
            width="26"
            height="26"
          >
            <path d="M389.2 48h70.6L305.4 234.2 481 464H343.6L233.4 320.4 105.2 464H34.6l168.4-192.4L32 48h139.6l99 130.4L389.2 48zm-24.8 373.2h39.1L154.3 90.9h-42L364.4 421.2z" />
          </svg>
        </a>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/?text=Check%20this%20out%20${encodeURIComponent(
            currentImage.secure_url
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-[#25D366]"
          title="Share on WhatsApp"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            fill="currentColor"
            width="26"
            height="26"
          >
            <path d="M380.9 97.1C339-2.3 228-33.8 141.6 21.6 66.4 71 36.7 162.8 70.4 239.1L48 448l208.9-22.4c70.1 16.4 142.8-21.8 171.1-87.9 35.8-82.8-4.8-179.4-47.1-240.6zM244.7 401c-63.6 0-115.3-51.7-115.3-115.3S181.1 170.4 244.7 170.4s115.3 51.7 115.3 115.3S308.3 401 244.7 401z" />
          </svg>
        </a>

        {/* Instagram */}
        <a
          href={`https://www.instagram.com/?url=${encodeURIComponent(
            currentImage.secure_url
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-[#E4405F]"
          title="Share on Instagram"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            fill="currentColor"
            width="26"
            height="26"
          >
            <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9S160.5 370.8 224.1 370.8 339 319.5 339 255.9 287.7 141 224.1 141zm146.4-54.7c0 14.9-12.1 27-27 27s-27-12.1-27-27 12.1-27 27-27 27 12.1 27 27zM398.8 80c-8.5-21.1-25-37.6-46.1-46.1C323.1 23 224 23 224 23s-99.1 0-128.7 10.9C74.2 42.4 57.7 58.9 49.2 80 38.3 109.6 38.3 208.7 38.3 208.7s0 99.1 10.9 128.7c8.5 21.1 25 37.6 46.1 46.1C124.9 396 224 396 224 396s99.1 0 128.7-10.9c21.1-8.5 37.6-25 46.1-46.1 10.9-29.6 10.9-128.7 10.9-128.7s0-99.1-10.9-128.7z" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
}

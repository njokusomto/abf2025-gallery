"use client";

import Image from "next/image";
import useKeypress from "react-use-keypress";
import type { ImageProps } from "../utils/types";
import SharedModal from "./SharedModal";

export default function Carousel({
  index,
  images,
  onClose,
}: {
  index: number;
  images: ImageProps[];
  onClose: () => void;
}) {
  // Navigate between images
  function changePhotoId(newVal: number) {
    return newVal; // handled internally by SharedModal
  }

  // Close modal with Escape key
  useKeypress("Escape", () => {
    onClose();
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Dim background */}
      <button
        className="absolute inset-0 z-30 cursor-default bg-black/80 backdrop-blur-2xl"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <Image
          src={images[index].blurDataUrl}
          alt="blurred background"
          className="pointer-events-none h-full w-full object-cover opacity-60"
          fill
          priority={true}
        />
      </button>

      {/* Actual modal content */}
      <SharedModal
        index={index}
        images={images}
        changePhotoId={changePhotoId}
        closeModal={onClose}
        navigation={false}
      />
    </div>
  );
}

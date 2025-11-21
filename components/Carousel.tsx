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
  // handles closing via escape key and overlay click
  const handleClose = () => onClose();
  useKeypress("Escape", handleClose);

  // carousel doesn't need to handle navigation; just pass index back
  const changePhotoId = () => {
    return;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* darkened backdrop; clicking closes modal */}
      <button
        className="absolute inset-0 z-30 cursor-default bg-black/80 backdrop-blur-2xl"
        onClick={handleClose}
        aria-label="Close Lightbox"
      >
        <Image
          src={images[index].blurDataUrl || "/placeholder.png"}
          alt=""
          className="pointer-events-none h-full w-full object-cover opacity-60"
          fill
        />
      </button>
      {/* Use SharedModal to display the current image without navigation */}
      <SharedModal
        index={index}
        images={images}
        changePhotoId={changePhotoId}
        closeModal={handleClose}
        navigation={false}
      />
    </div>
  );
}

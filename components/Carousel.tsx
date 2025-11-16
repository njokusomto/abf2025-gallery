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
  const close = () => onClose();

  useKeypress("Escape", close);

  const changePhotoId = () => {
    return; // Carousel modal doesn’t use navigation
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button
        className="absolute inset-0 z-30 cursor-default bg-black/80 backdrop-blur-2xl"
        onClick={close}
        aria-label="Close Lightbox"
      >
        <Image
          src={images[index].blurDataUrl || "/placeholder.png"}
          alt=""
          className="pointer-events-none h-full w-full object-cover opacity-50"
          fill
        />
      </button>

      <SharedModal
        index={index}
        images={images}
        changePhotoId={changePhotoId}
        closeModal={close}
        navigation={false}
      />
    </div>
  );
}

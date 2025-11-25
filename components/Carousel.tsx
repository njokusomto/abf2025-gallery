"use client";

import Image from "next/image";
import useKeypress from "react-use-keypress";
import type { ImageProps } from "../utils/types";
import SharedModal from "./SharedModal";

export default function Carousel({
  index,
  images,
  onClose,
  changePhotoId,
}: {
  index: number;
  images: ImageProps[];
  onClose: () => void;
  changePhotoId: (newVal: number) => void;
}) {
  const current = images[index];

  useKeypress("Escape", onClose);
  useKeypress("ArrowRight", () => {
    if (index < images.length - 1) changePhotoId(index + 1);
  });
  useKeypress("ArrowLeft", () => {
    if (index > 0) changePhotoId(index - 1);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button
        className="absolute inset-0 z-30 cursor-default bg-black/80 backdrop-blur-2xl"
        onClick={onClose}
      >
        {current.blurDataUrl && (
          <Image
            src={current.blurDataUrl}
            fill
            alt="blurred background"
            className="pointer-events-none h-full w-full object-cover opacity-70"
          />
        )}
      </button>

      <SharedModal
        index={index}
        images={images}
        currentPhoto={current}
        changePhotoId={changePhotoId}
        closeModal={onClose}
        navigation={true}
      />
    </div>
  );
}

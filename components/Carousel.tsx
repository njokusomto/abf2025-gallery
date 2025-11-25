"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import useKeypress from "react-use-keypress";
import { useSwipeable } from "react-swipeable";
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

  // local hi-res toggle for this modal instance
  const [isHiRes, setIsHiRes] = useState(false);

  // Reset hires state whenever new image is displayed
  useEffect(() => {
    setIsHiRes(false);
  }, [index]);

  // ESC to close
  useKeypress("Escape", onClose);

  // keyboard navigation
  useKeypress("ArrowRight", () => {
    if (index < images.length - 1) changePhotoId(index + 1);
  });

  useKeypress("ArrowLeft", () => {
    if (index > 0) changePhotoId(index - 1);
  });

  // swipe navigation
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (index < images.length - 1) changePhotoId(index + 1);
    },
    onSwipedRight: () => {
      if (index > 0) changePhotoId(index - 1);
    },
    trackMouse: true,
  });

  return (
    <div
      {...swipeHandlers}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <button
        className="absolute inset-0 z-30 cursor-default bg-black/80 backdrop-blur-2xl"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        {current.blurDataUrl && (
          <Image
            src={current.blurDataUrl}
            alt="blur background"
            className="pointer-events-none h-full w-full object-cover opacity-70"
            fill
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
        isHiRes={isHiRes}
        setIsHiRes={setIsHiRes}
      />
    </div>
  );
}

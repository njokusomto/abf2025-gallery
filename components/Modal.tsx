"use client";

import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { ImageProps } from "../utils/types";
import SharedModal from "./SharedModal";

export default function Modal({
  images,
  initialIndex,
  onClose,
}: {
  images: ImageProps[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [curIndex, setCurIndex] = useState(initialIndex);
  const [isHiRes, setIsHiRes] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    setIsHiRes(false);

    const timer = setTimeout(() => {
      setIsHiRes(true);
    }, 7000);

    return () => clearTimeout(timer);
  }, [curIndex]);

  useEffect(() => {
    const preloadIndexes = [];

    for (let i = 1; i <= 5; i++) {
      if (curIndex - i >= 0) preloadIndexes.push(curIndex - i);
    }
    for (let i = 1; i <= 10; i++) {
      if (curIndex + i < images.length) preloadIndexes.push(curIndex + i);
    }

    preloadIndexes.forEach((i) => {
      const img = new Image();
      img.src = images[i].secure_url;
    });
  }, [curIndex, images]);

  const changePhotoId = (newVal: number) => {
    if (newVal < 0 || newVal >= images.length) return;
    setCurIndex(newVal);
  };

  return (
    <AnimatePresence>
      <Dialog
        static
        open={true}
        onClose={onClose}
        initialFocus={overlayRef}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <Dialog.Overlay
          ref={overlayRef}
          as={motion.div}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        <motion.div
          className="relative z-50 flex items-center justify-center w-full h-full px-4"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.2 }}
        >
          <SharedModal
            index={curIndex}
            images={images}
            currentPhoto={images[curIndex]}
            changePhotoId={changePhotoId}
            closeModal={onClose}
            navigation={true}
            isHiRes={isHiRes}
          />
        </motion.div>
      </Dialog>
    </AnimatePresence>
  );
}

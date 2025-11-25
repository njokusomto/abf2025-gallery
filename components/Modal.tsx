"use client";

import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { ImageProps } from "../utils/types";
import SharedModal from "./SharedModal";

type ModalProps = {
  images: ImageProps[];
  initialIndex: number;
  onClose: () => void;
};

export default function Modal({ images, initialIndex, onClose }: ModalProps) {
  const [curIndex, setCurIndex] = useState(initialIndex);
  const overlayRef = useRef<HTMLDivElement>(null);

  const maxIndex = images.length - 1;

  const changePhotoId = (newVal: number) => {
    if (newVal < 0 || newVal > maxIndex) return;
    setCurIndex(newVal);
  };

  // ESC to close, arrows to navigate
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        setCurIndex((prev) => (prev < maxIndex ? prev + 1 : prev));
      } else if (e.key === "ArrowLeft") {
        setCurIndex((prev) => (prev > 0 ? prev - 1 : prev));
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, maxIndex]);

  return (
    <AnimatePresence>
      <Dialog
        static
        open={true}
        onClose={onClose}
        initialFocus={overlayRef}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        {/* Dimmed overlay */}
        <Dialog.Overlay
          ref={overlayRef}
          as={motion.div}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal content */}
        <motion.div
          key={curIndex}
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
          />
        </motion.div>
      </Dialog>
    </AnimatePresence>
  );
}

"use client";

import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
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
  const overlayRef = useRef<HTMLDivElement>(null);

  // ESC closes modal
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // navigation
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
            changePhotoId={changePhotoId}
            closeModal={onClose}
            navigation={true}
          />
        </motion.div>
      </Dialog>
    </AnimatePresence>
  );
}

import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Download,
  Instagram,
  Twitter,
} from "lucide-react";
import type { ImageProps } from "../utils/types";
import useKeypress from "react-use-keypress";

export default function SharedModal({
  index,
  images,
  changePhotoId,
  closeModal,
  navigation = true,
}: {
  index: number;
  images: ImageProps[];
  changePhotoId: (val: number) => void;
  closeModal: () => void;
  navigation?: boolean;
}) {
  const current = images[index];

  // WhatsApp official-like icon
  const WhatsappIcon = () => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 32 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="block"
    >
      <path d="M16.001 3.2c-7.046 0-12.8 5.65-12.8 12.622 0 2.226.584 4.393 1.69 6.307L3.2 28.8l7.024-1.655c1.843.996 3.929 1.521 6.777 1.521 7.046 0 12.8-5.65 12.8-12.622C29.801 8.85 23.047 3.2 16.001 3.2zm0 22.91c-2.18 0-4.313-.584-6.174-1.687l-.44-.26-4.172.982.987-4.07-.286-.418a10.24 10.24 0 01-1.6-5.834c0-5.77 4.746-10.462 10.684-10.462 5.914 0 10.685 4.692 10.685 10.462 0 5.77-4.771 10.287-10.685 10.287zm6.133-7.68c-.334-.167-1.977-.973-2.283-1.084-.307-.111-.53-.167-.754.167-.223.334-.861 1.083-1.057 1.307-.195.223-.39.25-.724.083-.334-.167-1.409-.518-2.684-1.65-1-.89-1.677-1.986-1.873-2.32-.195-.334-.02-.514.147-.68.151-.15.334-.39.5-.584.168-.195.223-.334.334-.557.111-.223.056-.417-.028-.584-.083-.167-.754-1.82-1.035-2.497-.273-.654-.553-.566-.754-.566-.195 0-.417-.028-.64-.028-.223 0-.584.083-.89.417-.307.334-1.17 1.14-1.17 2.777 0 1.636 1.198 3.215 1.364 3.439.167.223 2.353 3.707 5.7 5.178.797.345 1.417.55 1.9.704.797.25 1.52.215 2.09.13.638-.096 1.977-.807 2.257-1.59.278-.78.278-1.45.195-1.59-.083-.14-.307-.223-.64-.39z" />
    </svg>
  );

  function goNext() {
    if (index < images.length - 1) changePhotoId(index + 1);
  }

  function goPrev() {
    if (index > 0) changePhotoId(index - 1);
  }

  // Keyboard navigation
  useKeypress("ArrowRight", goNext);
  useKeypress("ArrowLeft", goPrev);
  useKeypress("Escape", closeModal);

  const shareUrl = `https://2025.africablockchainfestival.com/p/${current?.id}`;
  const caption = encodeURIComponent("Check out this photo from ABF2025");

  if (!current) {
    return (
      <div className="text-white text-center p-8">
        Image not found.
      </div>
    );
  }

  return (
    <div className="relative z-50 max-w-7xl mx-auto p-4 flex flex-col items-center justify-center">
      <div className="relative w-auto max-h-[90vh] max-w-[95vw] overflow-hidden rounded-lg shadow-2xl">
        <motion.img
          key={current.src}
          src={current.src}
          alt={current.alt || "Photo"}
          className="object-contain max-h-[90vh] w-auto mx-auto rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6 mt-6 text-white">
        {/* Prev */}
        {navigation && (
          <button
            onClick={goPrev}
            disabled={index === 0}
            className="disabled:opacity-20 hover:text-orange-400 transition"
          >
            <ChevronLeft size={26} />
          </button>
        )}

        {/* X (close) */}
        <button onClick={closeModal} className="hover:text-red-400 transition">
          <X size={26} />
        </button>

        {/* Download */}
        <a
          href={current.src}
          download
          className="hover:text-orange-400 transition"
        >
          <Download size={26} />
        </a>

        {/* Instagram */}
        <a
          href={`https://www.instagram.com/?url=${shareUrl}`}
          target="_blank"
          className="hover:text-pink-400 transition"
        >
          <Instagram size={26} />
        </a>

        {/* X (Twitter) */}
        <a
          href={`https://twitter.com/intent/tweet?text=${caption}&url=${shareUrl}`}
          target="_blank"
          className="hover:text-blue-400 transition"
        >
          <Twitter size={26} />
        </a>

        {/* WhatsApp */}
        <a
          href={`https://api.whatsapp.com/send?text=${caption}%20${shareUrl}`}
          target="_blank"
          className="hover:text-green-400 transition"
        >
          <WhatsappIcon />
        </a>

        {/* Next */}
        {navigation && (
          <button
            onClick={goNext}
            disabled={index === images.length - 1}
            className="disabled:opacity-20 hover:text-orange-400 transition"
          >
            <ChevronRight size={26} />
          </button>
        )}
      </div>
    </div>
  );
}

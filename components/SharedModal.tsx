import {
  ArrowDownTrayIcon,
  ArrowTopRightOnSquareIcon,
  ArrowUturnLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { variants } from "../utils/animationVariants";
import downloadPhoto from "../utils/downloadPhoto";
import { range } from "../utils/range";
import type { ImageProps, SharedModalProps } from "../utils/types";
import Twitter from "./Icons/Twitter";

export default function SharedModal({
  index,
  images,
  changePhotoId,
  closeModal,
  navigation,
  currentPhoto,
  direction,
}: SharedModalProps) {
  const [loaded, setLoaded] = useState(false);

  // Ensure images exist
  if (!images || !images.length) return null;

  // Limit thumbnails
  const filteredImages = images.filter((img: ImageProps) =>
    range(index - 15, index + 15).includes(img.id)
  );

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (index < images.length - 1) changePhotoId(index + 1);
    },
    onSwipedRight: () => {
      if (index > 0) changePhotoId(index - 1);
    },
    trackMouse: true,
  });

  const currentImage = images[index] || currentPhoto;
  if (!currentImage) return null;

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const baseURL = `https://res.cloudinary.com/${cloudName}/image/upload`;

  return (
    <MotionConfig
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <div
        className="relative z-50 flex aspect-[3/2] w-full max-w-7xl items-center wide:h-full xl:taller-than-854:h-auto"
        {...handlers}
      >
        {/* Main image */}
        <div className="w-full overflow-hidden">
          <div className="relative flex aspect-[3/2] items-center justify-center">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute"
              >
                <Image
                  src={`${baseURL}/c_scale,${
                    navigation ? "w_1280" : "w_1920"
                  }/${currentImage.public_id}.${currentImage.format}`}
                  width={navigation ? 1280 : 1920}
                  height={navigation ? 853 : 1280}
                  priority
                  alt={`Africa Blockchain Festival photo ${index + 1}`}
                  onLoad={() => setLoaded(true)}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Overlay Buttons */}
        {loaded && (
          <div className="absolute inset-0 mx-auto flex max-w-7xl items-center justify-center">
            {navigation && (
              <>
                {index > 0 && (
                  <button
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg hover:bg-black/75 hover:text-white"
                    onClick={() => changePhotoId(index - 1)}
                  >
                    <ChevronLeftIcon className="h-6 w-6" />
                  </button>
                )}
                {index + 1 < images.length && (
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg hover:bg-black/75 hover:text-white"
                    onClick={() => changePhotoId(index + 1)}
                  >
                    <ChevronRightIcon className="h-6 w-6" />
                  </button>
                )}
              </>
            )}

            {/* Top-right icons */}
            <div className="absolute top-0 right-0 flex items-center gap-2 p-3 text-white">
              {navigation ? (
                <a
                  href={`${baseURL}/${currentImage.public_id}.${currentImage.format}`}
                  className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg hover:bg-black/75 hover:text-white"
                  target="_blank"
                  rel="noreferrer"
                  title="Open full-size version"
                >
                  <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                </a>
              ) : (
                <a
                  href={`https://twitter.com/intent/tweet?text=Check%20out%20this%20photo%20from%20Africa%20Blockchain%20Festival!%0A%0Ahttps://2025.africablockchainfestival.com/p/${index}`}
                  className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg hover:bg-black/75 hover:text-white"
                  target="_blank"
                  rel="noreferrer"
                  title="Share on Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              <button
                onClick={() =>
                  downloadPhoto(
                    `${baseURL}/${currentImage.public_id}.${currentImage.format}`,
                    `${index}.jpg`
                  )
                }
                className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg hover:bg-black/75 hover:text-white"
                title="Download full-size"
              >
                <ArrowDownTrayIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Close */}
            <div className="absolute top-0 left-0 flex items-center gap-2 p-3 text-white">
              <button
                onClick={closeModal}
                className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg hover:bg-black/75 hover:text-white"
              >
                {navigation ? (
                  <XMarkIcon className="h-5 w-5" />
                ) : (
                  <ArrowUturnLeftIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        )}

        {/* Bottom thumbnail bar */}
        {navigation && (
          <div className="fixed inset-x-0 bottom-0 z-40 overflow-hidden bg-gradient-to-b from-black/0 to-black/60">
            <motion.div
              initial={false}
              className="mx-auto mt-6 mb-6 flex aspect-[3/2] h-14"
            >
              <AnimatePresence initial={false}>
                {filteredImages.map(({ public_id, format, id }) => (
                  <motion.button
                    key={id}
                    initial={{
                      width: "0%",
                      x: `${Math.max((index - 1) * -100, 15 * -100)}%`,
                    }}
                    animate={{
                      scale: id === index ? 1.25 : 1,
                      width: "100%",
                      x: `${Math.max(index * -100, 15 * -100)}%`,
                    }}
                    exit={{ width: "0%" }}
                    onClick={() => changePhotoId(id)}
                    className={`${
                      id === index
                        ? "z-20 rounded-md shadow shadow-black/50"
                        : "z-10"
                    } ${id === 0 ? "rounded-l-md" : ""} ${
                      id === images.length - 1 ? "rounded-r-md" : ""
                    } relative inline-block w-full shrink-0 transform-gpu overflow-hidden focus:outline-none`}
                  >
                    <Image
                      alt="Thumbnail"
                      width={180}
                      height={120}
                      className={`${
                        id === index
                          ? "brightness-110 hover:brightness-110"
                          : "brightness-50 contrast-125 hover:brightness-75"
                      } h-full object-cover transition`}
                      src={`${baseURL}/c_scale,w_180/${public_id}.${format}`}
                    />
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </div>
    </MotionConfig>
  );
}
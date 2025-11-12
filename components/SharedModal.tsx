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

  if (!images || !images.length) return null;
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
  const pageUrl = `https://2025.africablockchainfestival.com/p/${index}`;
  const shareText = encodeURIComponent(
    `Check out this photo from Africa Blockchain Festival 2025!\n${pageUrl}`
  );

  return (
    <MotionConfig
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 },
      }}
    >
      <div
        className="relative z-50 flex aspect-[3/2] w-full max-w-7xl items-center justify-center"
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
                  unoptimized
                  src={`${baseURL}/c_scale,${
                    navigation ? "w_1280" : "w_1920"
                  }/${currentImage.public_id}.${currentImage.format}`}
                  width={navigation ? 1280 : 1920}
                  height={navigation ? 853 : 1280}
                  priority
                  alt={`Africa Blockchain Festival photo ${index + 1}`}
                  onLoad={() => setLoaded(true)}
                  className="rounded-lg shadow-2xl transition-all duration-500"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Overlay Controls */}
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
                <>
                  {/* X (Twitter) Share */}
                  <a
                    href={`https://twitter.com/intent/tweet?text=${shareText}`}
                    className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg hover:bg-black/75 hover:text-white"
                    target="_blank"
                    rel="noreferrer"
                    title="Share on X"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>

                  {/* WhatsApp Share */}
                  <a
                    href={`https://wa.me/?text=${shareText}`}
                    className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg hover:bg-black/75 hover:text-white"
                    target="_blank"
                    rel="noreferrer"
                    title="Share on WhatsApp"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.149-.672.15s-.773.967-.947 1.166c-.174.199-.349.224-.646.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.654-2.059-.173-.299-.018-.46.13-.609.134-.133.298-.348.447-.522.15-.174.199-.299.298-.498.1-.199.05-.374-.025-.523-.075-.149-.672-1.611-.92-2.206-.242-.58-.487-.5-.672-.51-.173-.008-.372-.01-.571-.01-.199 0-.522.074-.796.373-.273.299-1.045 1.02-1.045 2.479 0 1.459 1.07 2.868 1.219 3.066.149.199 2.104 3.215 5.098 4.509.713.307 1.267.489 1.7.625.714.228 1.363.196 1.875.119.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.413-.074-.123-.272-.198-.57-.347z" />
                      <path d="M12.004 2c-5.523 0-10 4.477-10 10 0 1.768.469 3.415 1.285 4.844L2 22l5.33-1.266a9.955 9.955 0 004.675 1.189c5.523 0 10-4.477 10-10s-4.477-10-9.999-10zm0 18.938a8.944 8.944 0 01-4.561-1.252l-.326-.193-3.162.751.845-3.084-.211-.316A8.938 8.938 0 013.062 12c0-4.941 4.002-8.938 8.938-8.938 4.941 0 8.938 3.997 8.938 8.938s-3.997 8.938-8.938 8.938z" />
                    </svg>
                  </a>

                  {/* Instagram Share (copy link prompt) */}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(pageUrl);
                      alert("Link copied! Paste it in Instagram to share.");
                    }}
                    className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg hover:bg-black/75 hover:text-white"
                    title="Share on Instagram"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                    >
                      <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5A4.25 4.25 0 0020.5 16.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm5.75-.75a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z" />
                    </svg>
                  </button>
                </>
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

            {/* Close button */}
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
                    } relative inline-block w-full shrink-0 overflow-hidden focus:outline-none`}
                  >
                    <Image
                      unoptimized
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

"use client";

import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import Modal from "../components/Modal";
import Logo from "../components/Icons/Logo";
import cloudinary from "../utils/cloudinary";
import getBase64ImageUrl from "../utils/generateBlurPlaceholder";
import type { ImageProps } from "../utils/types";

export default function Home({ images }: { images: ImageProps[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <>
      <Head>
        <title>Africa Blockchain Festival 2025 Photos</title>
        <meta property="og:image" content="/ABF-2025-Gallery.jpg" />
      </Head>

      <main className="mx-auto max-w-[1960px] p-6 bg-black min-h-screen text-white">

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 [column-fill:_balance]">

          {/* Hero card */}
          <motion.div
            className="relative mb-6 inline-block w-full overflow-hidden rounded-3xl 
              bg-gradient-to-b from-[#1b3540] via-[#143140] to-[#122e3a]
              p-10 text-center shadow-lg backdrop-blur-md h-[680px] break-inside-avoid"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute top-8 left-0 right-0 flex justify-center opacity-25">
              <Image
                src="/rwanda-outline.png"
                alt="Kigali Skyline"
                width={1000}
                height={300}
                className="object-contain filter brightness-0 invert"
              />
            </div>

            <div className="relative z-10 flex flex-col items-center mt-40">
              <Logo className="scale-110 mb-8" />
              <h1 className="text-lg font-semibold uppercase tracking-[0.25em] text-[#BEFFDC] mb-4">
                2025 Event Photos
              </h1>
              <p className="max-w-[45ch] text-[#BEFFDC]/80 leading-relaxed mb-8">
                Our incredible Africa Blockchain Festival community came together
                in Rwanda for our first-ever in-person conference.
              </p>
              <a
                className="inline-block rounded-lg border-2 border-[#FE4600] bg-[#FE4600] px-6 py-2.5 
                   text-sm font-semibold transition hover:bg-transparent hover:text-[#FE4600]"
                href="https://africablockchainfestival.com"
                target="_blank"
                rel="noreferrer"
              >
                Learn More
              </a>
            </div>
          </motion.div>

          {/* Masonry images */}
          {images.map(({ id, public_id, format, blurDataUrl }) => (
            <motion.div
              key={id}
              className="relative mb-6 block w-full cursor-zoom-in overflow-hidden rounded-2xl 
                shadow-md transition hover:shadow-xl break-inside-avoid"
              onClick={() => setSelectedIndex(id)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <Image
                alt={`ABF photo ${id}`}
                className="rounded-2xl brightness-90 transition-all duration-500"
                placeholder="blur"
                blurDataURL={blurDataUrl}
                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_600/${public_id}.${format}`}
                width={600}
                height={800}
                loading="lazy"
                unoptimized
              />
            </motion.div>
          ))}
        </div>
      </main>

      {selectedIndex !== null && (
        <Modal
          images={images}
          initialIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </>
  );
}

export async function getStaticProps() {
  const results = await cloudinary.v2.search
    .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
    .sort_by("public_id", "desc")
    .max_results(400)
    .execute();

  const reducedResults: ImageProps[] = results.resources.map((r, i) => ({
    id: i,
    height: r.height,
    width: r.width,
    public_id: r.public_id,
    format: r.format,
  }));

  const blurImagePromises = results.resources.map((img: ImageProps) =>
    getBase64ImageUrl(img)
  );

  const imagesWithBlurDataUrls = await Promise.all(blurImagePromises);

  reducedResults.forEach((r, i) => {
    r.blurDataUrl = imagesWithBlurDataUrls[i];
  });

  return { props: { images: reducedResults } };
}

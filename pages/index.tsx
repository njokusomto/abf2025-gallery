import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import Logo from "../components/Icons/Logo";
import Modal from "../components/Modal";
import cloudinary from "../utils/cloudinary";
import getBase64ImageUrl from "../utils/generateBlurPlaceholder";
import type { ImageProps } from "../utils/types";
import { useLastViewedPhoto } from "../utils/useLastViewedPhoto";

const Home: NextPage = ({ images }: { images: ImageProps[] }) => {
  const router = useRouter();
  const { photoId } = router.query;
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();
  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current?.scrollIntoView({ block: "center" });
      setLastViewedPhoto(null);
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto]);

  return (
    <>
      <Head>
        <title>
          Africa Blockchain Festival 2025 Photos | Relive the Experience! 💫
        </title>
        <meta
          property="og:image"
          content="https://2025.africablockchainfestival.com/ABF-2025-Gallery.jpg"
        />
        <meta
          name="twitter:image"
          content="https://2025.africablockchainfestival.com/ABF-2025-Gallery.jpg"
        />
      </Head>

      <main className="mx-auto max-w-[1960px] p-6 bg-[#143140] min-h-screen">
        {photoId && (
          <Modal
            images={images}
            onClose={() => setLastViewedPhoto(photoId)}
          />
        )}

        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4 [column-fill:_balance]">
          {/* Hero Card */}
          <div className="relative mb-5 flex flex-col items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-b from-[#1b3540] via-[#143140] to-[#122e3a] text-center text-white shadow-[0_12px_40px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-300 hover:shadow-[0_16px_60px_rgba(0,0,0,0.55)] h-[700px]">

            {/* Kigali Skyline (moved higher) */}
            <div className="absolute top-6 left-0 right-0 flex justify-center opacity-25">
              <Image
                src="https://2025.africablockchainfestival.com/rwanda-outline.png"
                alt="Kigali Skyline"
                width={1200}
                height={400}
                unoptimized
                className="object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>

            {/* Centered Content */}
            <div className="relative z-10 flex flex-col items-center justify-center px-6">
              {/* Logo perfectly centered */}
              <div className="flex justify-center items-center scale-125 sm:scale-135 mb-8 mt-20">
                <Logo />
              </div>

              {/* Headline */}
              <h1 className="text-lg font-semibold uppercase tracking-[0.25em] text-[#BEFFDC] mb-4">
                2025 Event Photos
              </h1>

              {/* Subtext */}
              <p className="max-w-[45ch] text-[#BEFFDC]/80 leading-relaxed mb-8">
                Our incredible Africa Blockchain Festival community came together in Rwanda
                for our first ever in-person conference!
              </p>

              {/* CTA Button */}
              <a
                className="inline-block rounded-lg border-2 border-[#FE4600] bg-[#FE4600] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-transparent hover:text-[#FE4600]"
                href="https://africablockchainfestival.com"
                target="_blank"
                rel="noreferrer"
              >
                Learn More at Website
              </a>
            </div>
          </div>

          {/* Gallery Grid */}
          {images.map(({ id, public_id, format, blurDataUrl }) => (
            <Link
              key={id}
              href={`/?photoId=${id}`}
              as={`/p/${id}`}
              ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
              shallow
              className="group relative mb-5 block w-full cursor-zoom-in overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:shadow-2xl"
            >
              <Image
                alt="Africa Blockchain Festival 2025 photo"
                className="rounded-2xl brightness-90 transition-all duration-500 ease-out group-hover:scale-105 group-hover:brightness-110"
                placeholder="blur"
                blurDataURL={blurDataUrl}
                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
                width={720}
                height={480}
                sizes="(max-width: 640px) 100vw,
                       (max-width: 1280px) 50vw,
                       (max-width: 1536px) 33vw,
                       25vw"
              />
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="p-8 text-center text-[#BEFFDC]/80 bg-black border-t border-[#FE4600]/40">
        Africa Blockchain Festival. © 2025. All rights reserved.
      </footer>
    </>
  );
};

export default Home;

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

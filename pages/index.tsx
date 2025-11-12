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
        <title>Africa Blockchain Festival 2025 Photos | Relive the Experience! 💫</title>
        <meta
          property="og:image"
          content="https://2025.africablockchainfestival.com/ABF-2025-Gallery.jpg"
        />
        <meta
          name="twitter:image"
          content="https://2025.africablockchainfestival.com/ABF-2025-Gallery.jpg"
        />
      </Head>

      <main className="mx-auto max-w-[1960px] p-4 bg-[#143140] min-h-screen">
        {photoId && (
          <Modal
            images={images}
            onClose={() => {
              setLastViewedPhoto(photoId);
            }}
          />
        )}

        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
          {/* Hero Card */}
          <div className="relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg px-6 pb-16 pt-64 text-center text-white shadow-xl bg-[#143140]">
            {/* Background Image: Rwanda/Africa element */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <Image
                src="https://2025.africablockchainfestival.com/rwanda-outline.png"
                alt="African Continent Silhouette"
                fill
                className="object-contain"
                priority
              />
              <span className="absolute inset-x-0 bottom-0 h-[400px] bg-gradient-to-b from-transparent via-[#143140]/70 to-[#143140]"></span>
            </div>

            <Logo />
            <h1 className="mt-8 mb-4 text-base font-bold uppercase tracking-widest text-[#BEFFDC]">
              2025 Event Photos
            </h1>
            <p className="max-w-[40ch] text-[#BEFFDC]/80 sm:max-w-[32ch]">
              Our incredible Africa Blockchain Festival got together in Rwanda for
              our first ever in-person conference!
            </p>
            <a
              className="pointer z-10 mt-6 rounded-lg border-2 border-[#FE4600] bg-[#FE4600] px-3 py-2 text-sm font-semibold text-white transition hover:bg-transparent hover:text-[#FE4600] md:mt-4"
              href="https://africablockchainfestival.com"
              target="_blank"
              rel="noreferrer"
            >
              Learn More at Website
            </a>
          </div>

          {/* Gallery */}
          {images.map(({ id, public_id, format, blurDataUrl }) => (
            <Link
              key={id}
              href={`/?photoId=${id}`}
              as={`/p/${id}`}
              ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
              shallow
              className="group relative mb-5 block w-full cursor-zoom-in rounded-lg overflow-hidden"
            >
              <Image
                alt="Africa Blockchain Festival 2025 photo"
                className="transform rounded-lg brightness-90 transition duration-300 group-hover:brightness-110"
                style={{ transform: "translate3d(0, 0, 0)" }}
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

      <footer className="p-6 text-center text-[#BEFFDC]/90 sm:p-12 bg-[#143140] border-t border-[#FE4600]/40">
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

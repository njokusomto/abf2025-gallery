import { useRouter } from "next/router";
import Link from "next/link";
import SharedModal from "../../components/SharedModal";
import type { ImageProps } from "../../utils/types";
import cloudinary from "../../utils/cloudinary";
import getBase64ImageUrl from "../../utils/generateBlurPlaceholder";

export default function PhotoPage({ images }: { images: ImageProps[] }) {
  const router = useRouter();
  const { photoId } = router.query;

  // Convert query param to number
  const index = Number(photoId);
  const valid =
    !isNaN(index) && index >= 0 && index < images.length && images[index];

  // If invalid or missing image
  if (!valid) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#143140] text-white text-center px-6">
        <p className="mb-6 text-lg">Image not found.</p>
        <Link
          href="/"
          className="rounded-lg bg-[#FE4600] px-4 py-2 font-medium text-white border border-[#FE4600] hover:bg-transparent hover:text-[#FE4600] transition-all duration-300"
        >
          Back to Gallery
        </Link>
      </div>
    );
  }

  // Functions to navigate between images safely
  const changePhotoId = (newVal: number) => {
    if (newVal < 0 || newVal >= images.length) return; // guard
    router.push(`/p/${newVal}`, undefined, { shallow: true });
  };

  const closeModal = () => router.push("/", undefined, { shallow: true });

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/80 backdrop-blur-lg">
      <SharedModal
        index={index}
        images={images}
        changePhotoId={changePhotoId}
        closeModal={closeModal}
        navigation={true}
        direction={0}
      />
    </div>
  );
}

/**
 * Server-side static generation using Cloudinary
 * Fetches images, generates blurred placeholders, and exposes IDs
 */
export async function getStaticProps() {
  const results = await cloudinary.v2.search
    .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
    .sort_by("public_id", "desc")
    .max_results(400)
    .execute();

  const images: ImageProps[] = results.resources.map((r, i) => ({
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
  images.forEach((r, i) => (r.blurDataUrl = imagesWithBlurDataUrls[i]));

  return { props: { images } };
}

/**
 * Pre-generate all static routes for better SEO and instant open
 */
export async function getStaticPaths() {
  const results = await cloudinary.v2.search
    .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
    .sort_by("public_id", "desc")
    .max_results(400)
    .execute();

  const paths = results.resources.map((_, i) => ({
    params: { photoId: i.toString() },
  }));

  return {
    paths,
    fallback: "blocking", // ensure new uploads still load dynamically
  };
}

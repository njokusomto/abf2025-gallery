import { useRouter } from "next/router";
import Link from "next/link";
import SharedModal from "../../components/SharedModal";
import type { ImageProps } from "../../utils/types";
import cloudinary from "../../utils/cloudinary";

export default function PhotoPage({ images }: { images: ImageProps[] }) {
  const router = useRouter();
  const { photoId } = router.query;

  // convert query param
  const index = Number(photoId);
  const valid =
    !isNaN(index) && index >= 0 && index < images.length && images[index];

  // fallback if no image or invalid ID
  if (!valid) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0A0A0A] text-white text-center px-6">
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

  // safe navigation handler
  const changePhotoId = (newVal: number) => {
    if (newVal < 0 || newVal >= images.length) return;
    router.push(`/p/${newVal}`, undefined, { shallow: true });
  };

  const closeModal = () => router.push("/", undefined, { shallow: true });

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/90 backdrop-blur-lg">
      <SharedModal
        index={index}
        images={images}
        changePhotoId={changePhotoId}
        closeModal={closeModal}
        navigation={true}
      />
    </div>
  );
}

/**
 * Runtime Cloudinary fetch to avoid build-time ETIMEDOUT errors.
 * Runs server-side for each /p/[photoId] request.
 */
export async function getServerSideProps() {
  try {
    const results = await cloudinary.v2.search
      .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
      .sort_by("public_id", "desc")
      .max_results(400)
      .execute();

    const images: ImageProps[] = results.resources.map((r, i) => ({
      id: i,
      height: r.height?.toString() || "0",
      width: r.width?.toString() || "0",
      public_id: r.public_id,
      format: r.format,
      blurDataUrl: "",
    }));

    return { props: { images } };
  } catch (error) {
    console.error("Cloudinary fetch failed:", error);
    return { props: { images: [] } };
  }
}

"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import type { ImageProps } from "../../utils/types";
import images from "../../utils/images"; // ✅ load statically
import { useEffect, useState } from "react";

// Dynamically import modal only on client-side
const Modal = dynamic(() => import("../../components/Modal"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center text-white">
      Loading...
    </div>
  ),
});

export default function PhotoPage() {
  const router = useRouter();
  const { photoId } = router.query;
  const [mounted, setMounted] = useState(false);

  // ✅ Ensures rendering only happens client-side (no SSR)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const index = Number(photoId);
  const imageExists = images[index];

  if (!imageExists) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#143140] text-white">
        <p className="text-lg mb-4">Image not found.</p>
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-orange-500 rounded-lg hover:bg-orange-600 transition"
        >
          Back to Gallery
        </button>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      <Modal
        images={images}
        onClose={() => {
          router.push("/", undefined, { shallow: true });
        }}
      />
    </div>
  );
}

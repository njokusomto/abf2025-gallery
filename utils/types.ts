/* eslint-disable no-unused-vars */
export type ImageProps = {
  id: number;
  public_id: string;
  format: string;
  blurDataUrl?: string;
  width: number;
  height: number;
  secure_url?: string;
};

export interface SharedModalProps {
  index: number;
  images?: ImageProps[];
  currentPhoto?: ImageProps;
  changePhotoId: (newVal: number) => void;
  closeModal: () => void;
  navigation: boolean;
  direction?: number;
}

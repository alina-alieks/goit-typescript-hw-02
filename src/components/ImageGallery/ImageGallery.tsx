import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { Image } from "../../types";

interface ImageGalleryProps {
  images: Image[];
  onOpenModal: () => void;
  onGetImage: (value: string) => void;
}

export default function ImageGallery({
  images,
  onOpenModal,
  onGetImage,
}: ImageGalleryProps) {
  return (
    <ul className={css.list}>
      {images.map((image) => (
        <li key={image.id}>
          <ImageCard
            image={image}
            onOpenModal={onOpenModal}
            onGetImage={onGetImage}
          />
        </li>
      ))}
    </ul>
  );
}

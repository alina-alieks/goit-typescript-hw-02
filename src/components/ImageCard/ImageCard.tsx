import css from "./ImageCard.module.css";
import { Image } from "../../types";

interface ImageCardProps {
  image: Image;
  onOpenModal: () => void;
  onGetImage: (value: string) => void;
}

export default function ImageCard({
  image: { urls, description },
  onOpenModal,
  onGetImage,
}: ImageCardProps) {
  return (
    <div className={css.imgCard}>
      <img
        className={css.img}
        src={urls.small}
        alt={description}
        onClick={() => {
          onOpenModal();
          onGetImage(urls.regular);
        }}
      />
    </div>
  );
}

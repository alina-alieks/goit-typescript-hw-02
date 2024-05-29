import css from "./ImageModal.module.css";
import Modal from "react-modal";
import { IoCloseCircleOutline } from "react-icons/io5";

interface ImageModalProps {
  isOpen: boolean;
  onCloseModal: () => void;
  src: string;
}

export default function ImageModal({
  isOpen,
  onCloseModal,
  src,
}: ImageModalProps) {
  return (
    <div className={css.wrapper}>
      <Modal
        isOpen={isOpen}
        closeTimeoutMS={500}
        onRequestClose={onCloseModal}
        overlayClassName={css.overlayClassName}
        className={css.modal}
        ariaHideApp={false}
      >
        <button className={css.buttonClose} onClick={onCloseModal}>
          <IoCloseCircleOutline className={css.iconClose} />
        </button>
        <img className={css.img} src={src} alt="Large image" />
      </Modal>
    </div>
  );
}

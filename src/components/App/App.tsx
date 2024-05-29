import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import apiRequest from "../../api";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import { Image } from "../../types";

import css from "./App.module.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [src, setSrc] = useState<string>("");
  const [totalPage, setTotalPage] = useState<number>(0);

  function openModal(): void {
    setIsOpen(true);
  }

  function closeModal(): void {
    setIsOpen(false);
  }

  function getImage(value: string): void {
    setSrc(value);
  }

  const handleSearch = (query: string): void => {
    setError(false);
    setImages([]);
    setPage(1);
    setQuery(query);
  };

  const handleLoadMore = (): void => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (query === "") {
      return;
    }
    async function getImages() {
      try {
        setIsLoading(true);
        const data = await apiRequest(query, page);
        setImages((prevData) => [...prevData, ...data.response]);
        setTotalPage(data.totalPage);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getImages();
  }, [query, page]);

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <ImageGallery
        images={images}
        onOpenModal={openModal}
        onGetImage={getImage}
      />
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {images.length > 0 && !isLoading && page <= totalPage && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {isOpen && (
        <ImageModal onCloseModal={closeModal} isOpen={isOpen} src={src} />
      )}
    </>
  );
}

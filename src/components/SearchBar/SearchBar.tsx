import { FormEvent } from "react";
import css from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";
import { IoIosSearch } from "react-icons/io";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const searchWord = form.elements.namedItem(
      "searchWord"
    ) as HTMLInputElement;
    const searchInput = searchWord.value.trim();
    if (searchInput === "") {
      const notice = () =>
        toast("Please enter your search!", {
          duration: 1000,
          position: "top-center",
          style: {
            backgroundColor: "yellow",
            color: "rgb(44, 44, 199)",
          },
        });
      return notice();
    }
    onSubmit(searchInput);
    return;
  };

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          name="searchWord"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={css.button} type="submit">
          <IoIosSearch className={css.icon} />
        </button>
      </form>
      <Toaster />
    </header>
  );
}

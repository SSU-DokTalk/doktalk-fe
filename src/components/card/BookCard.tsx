import { BookType } from "@/types/data";
import Image from "@/components/base/Image";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { updateGlobalState } from "@/stores/globalStates";
import { useAppDispatch } from "@/stores/hooks";

function BookCard({
  book,
  isInLibrary,
  setIsInLibrary,
}: {
  book: BookType;
  isInLibrary: boolean;
  setIsInLibrary: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const addToLibrary = () => {
    axios.post(`/api/library/${book.isbn}`).then(() => {
      setIsInLibrary((prv) => prv.concat([book.isbn]));
      book.in_library_num++;
      dispatch(updateGlobalState({ isLibraryUpdated: true }));
    });
  };

  const removeFromLibrary = () => {
    axios.delete(`/api/library/${book.isbn}`).then(() => {
      setIsInLibrary((prv) => prv.filter((isbn) => isbn !== book.isbn));
      book.in_library_num--;
      dispatch(updateGlobalState({ isLibraryUpdated: true }));
    });
  };

  return (
    <div id="book-card">
      <div className="image-container">
        <Image src={book.image} width="140px" height="170px" />
      </div>
      <div className="content-container">
        <div className="title">{book.title}</div>
        <div className="info-container">
          <div className="author">
            {book.author.split("^").length > 2
              ? `${book.author.split("^").slice(0, 2).join(", ")} 외 ${
                  book.author.split("^").slice(2).length
                }명`
              : `${book.author.split("^").slice(0, 2)}`}
          </div>
          <div className="publisher">{book.publisher}</div>
          <div className="pubdate">{`${book.pubdate.slice(
            0,
            4
          )}/${book.pubdate.slice(4, 6)}/${book.pubdate.slice(6, 8)}`}</div>
        </div>
        <div className="description">
          {book.description?.replace("\n", " ")}
        </div>
      </div>
      <div className="button-container">
        <button
          className="to-my-book"
          onClick={isInLibrary ? removeFromLibrary : addToLibrary}
        >
          {isInLibrary
            ? t("component.card.book.button.remove-from-library")
            : t("component.card.book.button.add-to-library")}
        </button>
        <button className="look-summary">
          {`${t("component.card.book.button.in-library-num")} ${
            book.in_library_num
          }`}
          {}
        </button>
      </div>
    </div>
  );
}

export default BookCard;

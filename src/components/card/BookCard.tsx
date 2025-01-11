import { BookType } from "@/types/data";
import Image from "@/components/base/Image";
import { useTranslation } from "react-i18next";

function BookCard({ book }: { book: BookType }) {
  const { t } = useTranslation();

  return (
    <div id="book-card">
      <div className="image-container">
        <Image src={book.image} width="140px" height="170px" />
      </div>
      <div className="content-container">
        <div className="title">{book.title}</div>
        <div className="info-container">
          <div className="author">{book.author}</div>
          <div className="publisher">{book.publisher}</div>
        </div>
        <div className="description">{book.description.replace("\n", " ")}</div>
      </div>
      <div className="button-container">
        <button className="to-my-book">
          {t("component.card.book.button.add-to-library")}
        </button>
        <button className="look-summary">
          {t("component.card.book.button.look-summary")}
        </button>
      </div>
    </div>
  );
}

export default BookCard;

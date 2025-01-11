import { BookType } from "@/types/data";
import Image from "@/components/base/Image";

function BookCard({ book }: { book: BookType }) {
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
        <button className="to-my-book">내 서재에 담기</button>
        <button className="look-summary">요약 보기</button>
      </div>
    </div>
  );
}

export default BookCard;

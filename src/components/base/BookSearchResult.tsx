import { BookType } from "@/types/data";
import Image from "@/components/base/Image";

function BookSearchResult({ book }: { book: BookType }) {
  return (
    <div id="book-search-result">
      <Image
        src={book.image}
        width="70px"
        alt={"book thumbnail"}
        className="book-thumbnail"
        style={{
          boxShadow: "0px 6px 6px 0px rgba(0, 0, 0, 0.25)",
        }}
      />
      <div className="book-info">
        <div className="title">{book.title}</div>
        <div className="author">{book.author.split("^").join(", ")}</div>
      </div>
    </div>
  );
}

export default BookSearchResult;

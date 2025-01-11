import { DUMMY_BOOKS } from "@/common/dummy_data";
import BookCard from "@/components/card/BookCard";
import { BookType } from "@/types/data";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const sortBys: {
  name: string;
  value: string;
}[] = [
  {
    name: "최신순",
    value: "latest",
  },
  {
    name: "인기순",
    value: "popular",
  },
];

function Search() {
  const [books, setBooks] = useState<BookType[]>(DUMMY_BOOKS);
  const [search, setSearch] = useState<string>("");

  return (
    <div id="search-page">
      <div className="page-container">
        <div className="page-title">도서 검색</div>
        <div className="search-bar">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            className="search-input"
            type="text"
            placeholder="관심 도서를 검색해보세요!"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="result-container">
          <div className="sort-by-container">
            {sortBys.map((sortBy, index) => (
              <div key={"sortBy" + index} className="sort-by-item">
                {sortBy.name}
              </div>
            ))}
          </div>
          <div className="result-content-container">
            {books.map((book, index) => (
              <BookCard key={"book" + index} book={book} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;

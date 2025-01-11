import { DUMMY_BOOKS } from "@/common/dummy_data";
import BookCard from "@/components/card/BookCard";
import { BookType } from "@/types/data";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const sortBys: {
  name: string;
  value: string;
}[] = [
  {
    name: "page.search.sort.latest",
    value: "latest",
  },
  {
    name: "page.search.sort.popular",
    value: "popular",
  },
];

function Search() {
  const [books, setBooks] = useState<BookType[]>(DUMMY_BOOKS);
  const [search, setSearch] = useState<string>("");

  const { t } = useTranslation();

  useEffect(() => {
    if (books.length == 0) {
      setBooks(DUMMY_BOOKS);
    }
  });

  return (
    <div id="search-page">
      <div className="page-container">
        <div className="page-title">{t("page.search.title.page")}</div>
        <div className="search-bar">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            className="search-input"
            type="text"
            placeholder={t("page.search.search.placeholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="result-container">
          <div className="sort-by-container">
            {sortBys.map((sortBy, index) => (
              <div key={"sortBy" + index} className="sort-by-item">
                {t(sortBy.name)}
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

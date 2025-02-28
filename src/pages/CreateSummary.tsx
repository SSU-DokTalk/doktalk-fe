import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import UploadFiles from "@/components/base/UploadFiles";
import IonIcon from "@reacticons/ionicons";
import { Dropdown } from "react-bootstrap";
import { InitialSummary } from "@/types/initialValue";
import useDebounce from "@/hooks/useDebounce";
import { BookType, SummaryType } from "@/types/data";
import InfiniteScroll from "@/components/base/InfiniteScroll";
import { useTranslation } from "react-i18next";
import BookSearchResult from "@/components/base/BookSearchResult";
import {
  addCategory,
  getCategoryFromNumber,
  removeCategory,
} from "@/functions";
import { ACCEPTABLE, CATEGORY } from "@/common/variables";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateSummary() {
  const [summaryData, setSummaryData] = useState<SummaryType>({
    ...InitialSummary,
  });
  const [bookQuery, setBookQuery] = useState("");

  const debouncedSearch = useDebounce(bookQuery, 500);
  const prevValueRef = useRef<{
    debouncedSearch: string;
  }>({ debouncedSearch: "" });

  const [books, setBooks] = useState<BookType[]>([]);
  const [bookPage, setBookPage] = useState<number>(1);
  const [bookHasMore, setBookHasMore] = useState<boolean>(true);

  const [files, setFiles] = useState<File[]>([]);
  const [show, setShow] = useState({
    book: false,
    category: false,
  });
  const [focused, setFocused] = useState(false);

  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (prevValueRef.current.debouncedSearch === debouncedSearch) return;
    prevValueRef.current = { debouncedSearch };
  }, [debouncedSearch]);

  const doSubmit = async () => {
    const fileRes = await Promise.all(
      files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        return await axios
          .post("/api/file", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            params: {
              directory: "summary",
            },
          })
          .then((res) => res.data);
      })
    );

    await axios
      .post("/api/summary", {
        isbn: summaryData.isbn,
        title: summaryData.title,
        free_content: summaryData.free_content,
        charged_content: summaryData.charged_content,
        price: summaryData.price,
        files: fileRes,
        category: summaryData.category,
      })
      .then(() => {
        navigate("/summary");
      });
  };

  return (
    <div id="create-summary-page">
      <div className="container">
        <h1>요약 작성하기</h1>
        <div className="input-container__title">
          <input
            type="text"
            className="title-input"
            placeholder="제목을 입력해주세요."
            value={summaryData.title}
            onChange={(e) =>
              setSummaryData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>
        <div className="input-container">
          <label htmlFor="book">도서 선택</label>
          <Dropdown
            show={show.book}
            onToggle={(e) => {
              if (focused) return;
              setShow((prev) => ({ ...prev, book: e }));
            }}
            onSelect={(e) => {
              if (e == null) return;
              let [isbn, title] = e.split("^");
              setBookQuery(title);
              setSummaryData((prev) => {
                return { ...prev, isbn: parseInt(isbn) };
              });
              setShow((prev) => ({ ...prev, book: false }));
            }}
          >
            <Dropdown.Menu>
              <InfiniteScroll
                api={`books?search=${debouncedSearch}&sortby=latest`}
                likes_api={"librarys/is_in_library"}
                itemId="isbn"
                setItems={setBooks}
                page={bookPage}
                setPage={setBookPage}
                hasMore={bookHasMore}
                setHasMore={setBookHasMore}
                hasNoItem={books.length === 0}
                hasNoItemMessage={t("page.search.item.no-book-item")}
                refreshCondition={
                  debouncedSearch !== prevValueRef.current.debouncedSearch
                }
                dependency={[prevValueRef]}
              >
                {books.map((book, index) => (
                  <Dropdown.Item
                    key={"book" + index}
                    eventKey={[book.isbn, book.title].join("^")}
                    className="book-thumbnail"
                  >
                    <BookSearchResult book={book} />
                  </Dropdown.Item>
                ))}
              </InfiniteScroll>
            </Dropdown.Menu>
          </Dropdown>
          <div className="input-box">
            <input
              id="book"
              type="text"
              placeholder="토론할 도서를 검색해주세요"
              value={bookQuery}
              onFocus={() => {
                setShow((prev) => ({ ...prev, book: true }));
                setFocused(true);
              }}
              onBlur={() => setFocused(false)}
              onChange={(e) => {
                setBookQuery(e.target.value);
              }}
            />
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
        </div>
        <div className="input-container">
          <label htmlFor="category">카테고리</label>
          <Dropdown
            show={show.category}
            onSelect={(e) => {
              setSummaryData((prev) => {
                return {
                  ...prev,
                  category: addCategory(prev.category, parseInt(e ?? "0")),
                };
              });
              setShow((prev) => ({ ...prev, category: false }));
            }}
            onToggle={(e) => {
              setShow((prev) => ({ ...prev, category: e }));
            }}
          >
            <Dropdown.Menu>
              {Object.keys(CATEGORY).map((category) => {
                return (
                  <Dropdown.Item
                    key={"category" + CATEGORY[category].value}
                    eventKey={CATEGORY[category].value}
                  >
                    {t(CATEGORY[category].name)}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
          <div
            className="input-box category-input"
            onClick={() => setShow((prev) => ({ ...prev, category: true }))}
          >
            <div className="category-container">
              {summaryData.category == 0
                ? "토론 주제의 카테고리를 선택해주세요"
                : getCategoryFromNumber(summaryData.category).map(
                    (category, index) => {
                      return (
                        <div
                          className="selected-category"
                          key={"selected-category" + index}
                        >
                          <span>{t(category.name)}</span>
                          <FontAwesomeIcon
                            icon={faXmark}
                            onClick={() =>
                              setSummaryData((prev) => {
                                return {
                                  ...prev,
                                  category: removeCategory(
                                    prev.category,
                                    category.value
                                  ),
                                };
                              })
                            }
                          />
                        </div>
                      );
                    }
                  )}
            </div>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
        </div>
        <UploadFiles
          setFiles={setFiles}
          accept={ACCEPTABLE.join()}
          buttonText="파일 추가"
          buttonIcon={faImage}
        />
        <textarea
          value={summaryData.free_content}
          placeholder="미리보기로 공유하고 싶은 내용을 작성해주세요."
          onChange={(e) =>
            setSummaryData((prev) => ({
              ...prev,
              free_content: e.target.value,
            }))
          }
        />
        <textarea
          value={summaryData.charged_content}
          placeholder="유료로 공유하고 싶은 내용을 작성해주세요."
          onChange={(e) =>
            setSummaryData((prev) => ({
              ...prev,
              charged_content: e.target.value,
            }))
          }
        />
        <div className="input-container">
          <IonIcon
            name="information-circle-outline"
            className="icon"
            style={{
              height: "30px",
              width: "30px",
            }}
          />
          <label htmlFor="price" className="price-label">
            가격
          </label>
          <input
            id="price"
            type="number"
            className="price-input"
            step={1000}
            min={0}
            placeholder="가격을 입력해주세요"
            value={summaryData.price}
            onChange={(e) => {
              setSummaryData((prev) => {
                return { ...prev, price: parseInt(e.target.value) };
              });
            }}
          />
        </div>
        <div className="button-container">
          <button className="temp">임시 저장</button>
          <button className="submit" onClick={doSubmit}>
            작성 완료
          </button>
        </div>
      </div>
      <div className="offset"></div>
    </div>
  );
}

export default CreateSummary;

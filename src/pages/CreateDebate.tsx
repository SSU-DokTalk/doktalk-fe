import { forwardRef, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import UploadFiles from "@/components/base/UploadFiles";
import { ACCEPTABLE, CATEGORY } from "@/common/variables";
import { Dropdown } from "react-bootstrap";
import { BookType, DebateType } from "@/types/data";
import { InitialDebate } from "@/types/initialValue";
import {
  addCategory,
  getCategoryFromNumber,
  range,
  removeCategory,
} from "@/functions";
import { useTranslation } from "react-i18next";
import useDebounce from "@/hooks/useDebounce";
import InfiniteScroll from "../components/base/InfiniteScroll";
import IonIcon from "@reacticons/ionicons";
import axios from "axios";
import { getMonth, getYear } from "date-fns";
import DatePicker from "react-datepicker";
import BookSearchResult from "@/components/base/BookSearchResult";
import { useNavigate } from "react-router-dom";

const years = range(10 + getYear(new Date()) - 2025, 2025, 1);
const months = [
  "function.time.months.1",
  "function.time.months.2",
  "function.time.months.3",
  "function.time.months.4",
  "function.time.months.5",
  "function.time.months.6",
  "function.time.months.7",
  "function.time.months.8",
  "function.time.months.9",
  "function.time.months.10",
  "function.time.months.11",
  "function.time.months.12",
];

function CreateDebate() {
  const [debateData, setDebateData] = useState<DebateType>({
    ...InitialDebate,
    limit: 2,
    price: 1000,
  });
  const [bookQuery, setBookQuery] = useState("");

  const debouncedSearch = useDebounce(bookQuery, 500);
  const prevValueRef = useRef<{
    debouncedSearch: string;
  }>({ debouncedSearch: "" });

  const [books, setBooks] = useState<BookType[]>([]);
  const [bookPage, setBookPage] = useState<number>(1);
  const [bookHasMore, setBookHasMore] = useState<boolean>(true);
  const [isInLibrary, setIsInLibrary] = useState<boolean[]>([]);

  const [files, setFiles] = useState<File[]>([]);
  const [show, setShow] = useState<{ book: boolean; category: boolean }>({
    book: false,
    category: false,
  });
  const [focused, setFocused] = useState<boolean>(false);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const CustomDatePicker = forwardRef<any, any>(
    ({ value, onClick, className }, ref) => (
      <div className={className} onClick={onClick} ref={ref}>
        <span className="date-text">{value}</span>
        <IonIcon name="calendar-outline" className="sort-by-icon" />
      </div>
    )
  );

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
              directory: "debate",
            },
          })
          .then((res) => res.data);
      })
    );

    await axios
      .post("/api/debate", {
        title: debateData.title,
        location: debateData.location,
        link: debateData.link,
        held_at: debateData.held_at,
        isbn: debateData.isbn,
        category: debateData.category,
        limit: debateData.limit,
        files: fileRes,
        content: debateData.content,
        price: debateData.price,
      })
      .then(() => {
        navigate("/debate");
      });
  };

  return (
    <div id="create-debate-page">
      <div className="container">
        <h1>토론방 생성하기</h1>
        <div className="input-container__title">
          <input
            type="text"
            placeholder="제목을 입력해주세요"
            value={debateData.title}
            onChange={(e) => {
              setDebateData((prev) => {
                return { ...prev, title: e.target.value };
              });
            }}
          />
        </div>
        <div className="input-container">
          <label htmlFor="location">모임 장소</label>
          <div className="input-box">
            <input
              id="location"
              type="text"
              placeholder="모일 장소를 입력해주세요"
              value={debateData.location}
              onChange={(e) => {
                setDebateData((prev) => {
                  return { ...prev, location: e.target.value };
                });
              }}
            />
          </div>
        </div>
        <div className="input-container">
          <label htmlFor="link">온라인 링크</label>
          <div className="input-box">
            <input
              id="link"
              type="text"
              placeholder="온라인 모임일 경우 참여 링크를 입력해주세요"
              value={debateData.link}
              onChange={(e) => {
                setDebateData((prev) => {
                  return { ...prev, link: e.target.value };
                });
              }}
            />
          </div>
        </div>
        <div className="input-container">
          <label htmlFor="held_at">모임 시간</label>
          <div className="input-box">
            <DatePicker
              selected={debateData.held_at}
              onChange={(date) =>
                setDebateData((prev) => {
                  return { ...prev, held_at: date ?? new Date() };
                })
              }
              dateFormat="yyyy/MM/dd hh:mm aa"
              minDate={new Date()}
              maxDate={new Date(`${getYear(new Date()) + 10}-12-31`)}
              customInput={<CustomDatePicker className="custom-input" />}
              showDisabledMonthNavigation
              showTimeSelect
              renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div
                  style={{
                    margin: 10,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <button
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                  >
                    {"<"}
                  </button>
                  <select
                    value={getYear(date)}
                    onChange={({ target: { value } }) =>
                      changeYear(parseInt(value))
                    }
                  >
                    {years.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <select
                    value={months[getMonth(date)]}
                    onChange={({ target: { value } }) =>
                      changeMonth(months.indexOf(value))
                    }
                  >
                    {months.map((option) => (
                      <option key={option} value={option}>
                        {t(option)}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                  >
                    {">"}
                  </button>
                </div>
              )}
            />
          </div>
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
              setDebateData((prev) => {
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
                likes={isInLibrary}
                setLikes={setIsInLibrary}
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
              setDebateData((prev) => {
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
              {debateData.category == 0
                ? "토론 주제의 카테고리를 선택해주세요"
                : getCategoryFromNumber(debateData.category).map(
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
                              setDebateData((prev) => {
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
        <div className="input-container">
          <label htmlFor="limit">인원 제한</label>
          <div className="input-box-short">
            <input
              id="limit"
              type="number"
              placeholder="0"
              value={debateData.limit}
              min={0}
              onChange={(e) => {
                setDebateData((prev) => {
                  return { ...prev, limit: parseInt(e.target.value) };
                });
              }}
            />
          </div>
          <span>명</span>
        </div>
        <UploadFiles
          setFiles={setFiles}
          accept={ACCEPTABLE.join()}
          buttonText="파일 추가"
          buttonIcon={faImage}
        />
        <textarea
          value={debateData.content}
          placeholder="나누고 싶은 이야기를 적어주세요"
          onChange={(e) =>
            setDebateData((prev) => ({ ...prev, content: e.target.value }))
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
            value={debateData.price}
            onChange={(e) => {
              setDebateData((prev) => {
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

export default CreateDebate;

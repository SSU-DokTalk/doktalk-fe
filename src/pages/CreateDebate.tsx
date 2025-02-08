import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faImage,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import UploadFiles from "@/components/base/UploadFiles";
import { ACCEPTABLE, CATEGORY } from "@/common/variables";
import { Dropdown } from "react-bootstrap";
import { BookType, DebateType } from "@/types/data";
import { InitialDebate } from "@/types/initialValue";
import { getDateTime } from "@/functions";
import { useTranslation } from "react-i18next";
import useDebounce from "@/hooks/useDebounce";
import InfiniteScroll from "../components/base/InfiniteScroll";
import BookCard from "@/components/card/BookCard";
import IonIcon from "@reacticons/ionicons";
import axios from "axios";

function CreateDebate() {
  const [debateData, setDebateData] = useState<DebateType>({
    ...InitialDebate,
    limit: 2,
    price: 1000,
  });
  const [bookQuery, setBookQuery] = useState("");
  const [categoryQuery, setCategoryQuery] = useState("");

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

  const { t } = useTranslation();

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
              directory: "post",
            },
          })
          .then(
            (res) => res.data,
            (err) => console.log(err)
          );
      })
    );

    // {
    //   "isbn": 0,
    //   "location": "string",
    //   "held_at": "2025-02-08T03:42:11.581Z",
    //   "title": "string",
    //   "content": "string",
    //   "price": 0,
    //   "files": [
    //     {
    //       "name": "string",
    //       "url": "https://example.com/"
    //     }
    //   ],
    //   "category": 0
    // }
    await axios
      .post("/api/debate", {
        isbn: 9791198863829,
        location: debateData.location,
        held_at: debateData.held_at,
        title: debateData.title,
        content: debateData.content,
        price: debateData.price,
        files: fileRes,
        category: debateData.category,
      })
      .then((res) => {
        console.log(res);
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
            <input
              id="held_at"
              type="text"
              placeholder="모일 시간을 선택해주세요"
              value={getDateTime(debateData.held_at)}
            />
            <FontAwesomeIcon icon={faCalendar} />
          </div>
        </div>
        <div className="input-container">
          <label htmlFor="book">도서 선택</label>
          <Dropdown
            show={show.book}
            onSelect={(eventKey, e) => {
              console.log(eventKey);
              console.log(e);
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
                  <BookCard
                    key={"book" + index}
                    idx={index}
                    book={book}
                    isInLibrary={isInLibrary[index]}
                    setIsInLibrary={setIsInLibrary}
                  />
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
              onFocus={() => setShow((prev) => ({ ...prev, book: true }))}
              onBlur={() => setShow((prev) => ({ ...prev, book: false }))}
              onChange={(e) => {
                setBookQuery(e.target.value);
              }}
            />
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
        </div>
        <div className="input-container">
          <label htmlFor="category">카테고리</label>
          <Dropdown show={show.category}>
            <Dropdown.Menu>
              {Object.keys(CATEGORY).map((category) => {
                return (
                  <Dropdown.Item key={"category" + CATEGORY[category].value}>
                    {t(CATEGORY[category].name)}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
          <div className="input-box">
            <input
              id="category"
              type="text"
              placeholder="토론 주제의 카테고리를 선택해주세요"
              value={categoryQuery}
              onFocus={() => setShow((prev) => ({ ...prev, category: true }))}
              onBlur={() => setShow((prev) => ({ ...prev, category: false }))}
              onChange={(e) => {
                setCategoryQuery(e.target.value);
              }}
            />
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

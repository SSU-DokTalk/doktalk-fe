import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import UploadFiles from "@/components/base/UploadFiles";
import IonIcon from "@reacticons/ionicons";

function CreateSummary() {
  const [title, setTitle] = useState("");
  const [book, setBook] = useState("");
  const [category, setCategory] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [content, setContent] = useState("");
  const [price, setPrice] = useState(5000);

  return (
    <div id="create-summary-page">
      <div className="create-summary-title">요약 작성하기</div>
      <div className="create-summary-content">
        <input
          type="text"
          className="title-input"
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="row">
          <button className="icon">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          <div className="left">도서 선택</div>
          <input
            type="text"
            className="search"
            placeholder="요약할 도서를 선택해주세요."
            value={book}
            onChange={(e) => setBook(e.target.value)}
          />
        </div>
        <div className="row">
          <button className="icon">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          <div className="left">카테고리</div>
          <input
            type="text"
            className="search"
            placeholder="카테고리를 선택해주세요."
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="file-list">
          <UploadFiles setFiles={setFiles} />
        </div>

        <textarea
          className="content-input"
          placeholder="나누고 싶은 이야기를 적어주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <div className="row-price">
          <IonIcon
            name="information-circle-outline"
            className="icon"
            style={{
              height: "30px",
              width: "30px",
            }}
          />
          <div className="left">가격</div>
          <input
            type="number"
            placeholder="가격을 입력해주세요."
            className="price"
            value={price}
            pattern="([0-9]+.{0,1}[0-9]*,{0,1})*[0-9]"
            required
            onChange={(e) => setPrice(parseInt(e.target.value))}
          />
        </div>
      </div>
      <div className="button-container">
        <button className="temp">임시 저장</button>
        <button className="complete">작성 완료</button>
      </div>
    </div>
  );
}

export default CreateSummary;

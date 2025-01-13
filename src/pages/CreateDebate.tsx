import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faImage,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import UploadFiles from "@/components/base/UploadFiles";
import { ACCEPTABLE_IMAGE } from "@/common/variables";
import IonIcon from "@reacticons/ionicons";

function CreateDebate() {
  const [title, setTitle] = useState("");
  const [book, setBook] = useState("");
  const [place, setPlace] = useState("");
  const [link, setLink] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [content, setContent] = useState("");
  const [price, setPrice] = useState(5000);

  return (
    <div id="create-debate-page">
      <div className="create-debate-title">토론방 생성하기</div>
      <div className="create-debate-content">
        <input
          type="text"
          className="title-input"
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="row">
          <div className="left">모임 장소</div>
          <input
            type="text"
            className="search"
            placeholder="모일 장소를 입력해주세요."
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />
        </div>
        <div className="row">
          <div className="left">온라인 링크</div>
          <input
            type="text"
            className="search"
            placeholder="온라인 모임일 경우 참여 링크를 입력해주세요."
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <div className="row">
          <button className="icon">
            <FontAwesomeIcon icon={faCalendar} />
          </button>
          <div className="left">모임 시간</div>
          <input
            type="text"
            className="search"
            placeholder="모일 시간을 선택해주세요."
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <div className="row">
          <button className="icon">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          <div className="left">도서 선택</div>
          <input
            type="text"
            className="search"
            placeholder="토론할 도서를 선택해주세요."
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
            placeholder="토론 주제의 카테고리를 선택해주세요."
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="file-list">
          <UploadFiles
            setFiles={setFiles}
            accept={ACCEPTABLE_IMAGE.join()}
            buttonText="사진 추가"
            buttonIcon={faImage}
          />
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

export default CreateDebate;

import { useState } from "react";
import UploadFiles from "@/components/base/UploadFiles";
import IonIcon from "@reacticons/ionicons";
import { InitialSummary } from "@/types/initialValue";
import { SummaryType } from "@/types/data";
import { ACCEPTABLE } from "@/common/variables";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BookSearchDropdown from "@/components/dropdown/BookSearchDropdown";
import CategoryDropdown from "@/components/dropdown/CategoryChipDropdown";

function CreateSummary() {
  const [summaryData, setSummaryData] = useState<SummaryType>({
    ...InitialSummary,
  });

  const [files, setFiles] = useState<File[]>([]);
  const navigate = useNavigate();

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
        <BookSearchDropdown setBookIsbnData={setSummaryData} />

        <CategoryDropdown data={summaryData} setData={setSummaryData} />

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

import PDFThumbnail from "@/assets/images/pdf-thumbnail.svg";
import { ACCEPTABLE_FILE } from "@/common/variables";
import { getFileTypeFromUrl } from "@/functions";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

function FileCard({
  file,
  ...props
}: {
  file: {
    url: string;
    name: string;
  };
} & React.HTMLProps<HTMLDivElement>) {
  const handleFileDownload = () => {
    axios // AxiosInstance
      .get(`/api/file`, { params: { url: file.url }, responseType: "blob" })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement("a");
        a.href = url;
        a.download = file.name || "download";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
      .catch((error) => {
        console.error("파일 다운로드 오류:", error);
      });
  };

  if (ACCEPTABLE_FILE.includes(`.${getFileTypeFromUrl(file.url)}`)) {
    return (
      <div id="file-card" {...props}>
        <div className="download-file" onClick={handleFileDownload}>
          <img src={PDFThumbnail} alt="" width={18} height={18} />
          <div className="filename">{file.name}</div>
          <div className="file-ext">{`.${getFileTypeFromUrl(file.url)}`}</div>
          <FontAwesomeIcon icon={faDownload} />
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default FileCard;

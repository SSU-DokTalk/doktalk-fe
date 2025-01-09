import { Dispatch, SetStateAction, useState } from "react";
import { Modal } from "react-bootstrap";
import UploadFiles from "@/components/base/UploadFiles";
import { ACCEPTABLE_IMAGE } from "@/common/variables";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";

function WritePostModal({
  showModal,
  setShowModal,
  setDidPost = undefined,
}: {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setDidPost?: Dispatch<SetStateAction<boolean>>;
}) {
  const [postData, setPostData] = useState<{
    title: string;
    content: string;
  }>({
    title: "",
    content: "",
  });
  const [files, setFiles] = useState<File[]>([]);

  const doPost = async () => {
    const imageUrls = await Promise.all(
      files.map(
        async (file) => {
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
        },
        () => null
      )
    );
    await axios
      .post("/api/post", {
        ...postData,
        files: imageUrls,
      })
      .then(
        () => {
          setShowModal(false);
          setPostData({
            title: "",
            content: "",
          });
          setFiles([]);
          setDidPost?.(true);
        },
        (err) => console.log(err)
      );
  };

  return (
    <Modal
      id="write-post-modal"
      show={showModal}
      backdrop="static"
      keyboard={false}
      onHide={() => {
        setShowModal(false);
      }}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <b>게시글 작성</b>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="post-container">
          <div className="post-title-container">
            <input
              type="text"
              placeholder="제목을 입력해주세요."
              onChange={(e) => {
                setPostData({ ...postData, title: e.target.value });
              }}
              value={postData.title}
              className="post-title"
            />
          </div>
          <div className="post-files-container">
            <UploadFiles
              setFiles={setFiles}
              accept={ACCEPTABLE_IMAGE.join()}
              buttonText="사진 추가"
              buttonIcon={faImage}
              previewSize={102}
            />
          </div>
          <div className="post-content-container">
            <textarea
              placeholder="나누고 싶은 이야기를 적어주세요."
              className="post-content"
              value={postData.content}
              onChange={(e) => {
                setPostData({ ...postData, content: e.target.value });
              }}
            />
          </div>
          <div className="button-container">
            <button className="temporary-save-button">임시 저장</button>
            <button className="post-button" onClick={doPost}>
              작성 완료
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default WritePostModal;

import axios from "axios";
import { useEffect, useState } from "react";

import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import usePosts from "@/hooks/usePosts";

function BoardWriteBar() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // const [image1, setImage1] = useState("")
  // const [image2, setImage2] = useState("")

  const [rows, setRows] = useState(1);
  const [writeMode, setWriteMode] = useState(false);

  const { posts, loading, error, update } = usePosts();

  useEffect(() => {
    update();
  }, [posts]);

  // 파일 선택 시 해당 파일을 담을 FormData (매번 필요 시 생성)
  // const [file1, setFile1] = useState<File | null>(null);
  // const [file2, setFile2] = useState<File | null>(null);

  // const uploadImage = async (
  //     file: File | null,
  //     setImage: React.Dispatch<React.SetStateAction<string>>
  // ) => {
  //     if (!file) return;

  //     const formData = new FormData();
  //     formData.append('file', file);

  //     try {
  //         const response = await axios.post<string>("/api/image?directory=post", formData, {
  //             headers: {
  //                 "Content-Type": "multipart/form-data",
  //             },
  //         });
  //         console.log(response.data);
  //         setImage(response.data);
  //     } catch (error) {
  //         console.error(error);
  //     }
  // };

  // const onAttach1 = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const file = e.target.files?.[0] || null;
  //     setFile1(file);
  //     await attachImage1();
  // };

  // const onAttach2 = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const file = e.target.files?.[0] || null;
  //     setFile2(file);
  //     await attachImage2();
  // };

  // const attachImage1 = async () => {
  //     await uploadImage(file1, setImage1);
  // };

  // const attachImage2 = async () => {
  //     await uploadImage(file2, setImage2);
  // };

  const onTempSave = () => {
    // Implement temporary save functionality here
  };

  const onSave = async () => {
    if (!title || !content) {
      alert("필수 항목을 입력해주세요");
      return;
    }

    // if (!image1 || !image2) {
    //     alert("이미지를 업로드해주세요");
    //     return;
    // }

    try {
      await axios.post("/api/post", {
        title,
        content,
        image1: null,
        image2: null,
      });
      setTitle("");
      setContent("");
      // setImage1("");
      // setImage2("");
      alert("게시글이 작성되었습니다");
      await update(); // 새로운 게시글을 가져오기 위해 update 함수 호출
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [writeMode]);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      writeMode &&
      !e
        .composedPath()
        .some((path) =>
          Array.from(document.getElementsByClassName("write")).includes(
            path as Element
          )
        )
    ) {
      setWriteMode(false);
      setRows(1);
    }
  };

  const onClickWrite = () => {
    if (!writeMode) {
      setWriteMode(true);
      setRows(5);
    }
  };

  return (
    <div
      style={{
        // height: "400px",
        backgroundColor: "white",
        textAlign: "left",
        alignContent: "start",
        width: "100%",
      }}
      className="write"
    >
      <div
        style={{
          borderRadius: "20px",
          border: "2px solid #F3F4F7",
          padding: "20px",
          // boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        {writeMode ? (
          <>
            <input
              style={{
                width: "100%",
                border: "none",
                outline: "none",
                // backgroundColor: "#F3F4F7",
                marginLeft: "84px",
                marginBottom: "10px",
                animation: "grow 0.5s",
                transition: "height 0.1s",
                resize: "none",
                fontSize: "20px",
              }}
              placeholder="제목을 입력해주세요"
              value={title}
              onChange={onChangeTitle}
            />
            {/* <input
                            type="file"
                            accept="image/*"
                            onChange={onAttach1}
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={onAttach2}
                        /> */}
            {/* <div
                            style={{
                                display: "flex",
                                gap: "10px",
                            }}
                        >
                            {image1 && <img src={image1} alt="image1" style={{ width: "100px", height: "100px" }} />}
                            {image2 && <img src={image2} alt="image2" style={{ width: "100px", height: "100px" }} />}
                        </div> */}
          </>
        ) : (
          <></>
        )}
        <div
          style={{
            display: "flex",
            // flexDirection: "column",
            width: "100%",
            position: "relative",
            zIndex: 0,
            justifyContent: "center",
            alignItems: "center",
            // gap: "10px",
            fontSize: "20px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              aspectRatio: "1 / 1",
              // marginLeft: "10px",
              marginTop: "8px",
              marginRight: "10px",
              marginBottom: "auto",
              borderRadius: "50%",
              backgroundColor: "gray",
              // boxSizing: "border-box",
            }}
          />
          <textarea
            style={{
              marginLeft: "auto",
              width: "100%",
              borderRadius: "30px",
              height: `${rows * 50}px`,
              border: "none",
              outline: "none",
              paddingTop: "10px",
              animation: "grow 0.5s",
              transition: "height 0.1s",
              paddingLeft: "20px",
              paddingRight: "10%",
              backgroundColor: "#F3F4F7",
              resize: "none",
            }}
            placeholder="게시글을 작성해보세요!"
            onClick={onClickWrite}
            onChange={onChangeContent}
            value={content}
          />
          <button
            onClick={onSave}
            style={{
              // width: "100px",
              padding: "0 10px",
              height: "30px",
              color: "white",
              backgroundColor: "#F3F4F7",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              position: "absolute",
              right: "10px",
              top: "24px",
              transform: "translateY(-50%)",
            }}
          >
            <FontAwesomeIcon
              style={{ color: "#666565" }}
              icon={faPenToSquare}
            />
          </button>
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginLeft: "auto",
          }}
        >
          <button
            style={{
              width: "150px",
              padding: "10px",
              backgroundColor: "white",
              color: "#000080",
              border: "solid 2px #000080",
              borderRadius: "10px",
              cursor: "pointer",
            }}
            onClick={onTempSave}
          >
            임시 저장
          </button>

          <button
            style={{
              width: "150px",
              padding: "10px",
              backgroundColor: "#000080",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
            }}
            onClick={onSave}
          >
            작성 완료
          </button>
        </div>
      </div>
    </div>
  );
}

export default BoardWriteBar;

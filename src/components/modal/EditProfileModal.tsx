import { Modal } from "react-bootstrap";
import userIcon from "@/assets/images/profile.svg";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAppDispatch } from "@/stores/hooks";
import { setUser } from "@/stores/user";
import axios from "axios";

function EditProfileModal({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [userInfo, setUserInfo] = useState<{
    profile: string | null;
    name: string;
    introduction: string;
  }>({
    profile: null,
    name: "",
    introduction: "",
  });
  const imageRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    axios.get(`/api/user/me`).then(
      (res) => {
        let { profile, name, introduction } = res.data;
        setUserInfo({ profile, name, introduction });
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  const updateUserInfo = () => {
    axios.patch(`/api/user/me`, userInfo).then(
      async (res) => {
        let { id, name, profile, role } = res.data;
        await dispatch(setUser({ id, name, profile, role }));
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const clickUploadImageButton = () => {
    if (!imageRef.current) return;
    imageRef.current.click();
  };

  const uploadImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      const formData = new FormData();
      formData.append("file", e.target.files[0]);

      axios
        .post(`/api/image`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: {
            directory: "profile",
          },
        })
        .then(
          async (res) => {
            let { data } = res;
            let updatedUserInfo = { ...userInfo, profile: data };
            await setUserInfo(updatedUserInfo);

            axios.patch(`/api/user/me`, updatedUserInfo).then(
              async (res) => {
                let { id, name, profile, role } = res.data;
                await dispatch(setUser({ id, name, profile, role }));
              },
              (err) => {
                console.log(err);
              }
            );
          },
          (err) => {
            console.log(err);
          }
        );
    },
    [userInfo]
  );

  const deleteImage = () => {
    axios.delete(`/api/user/profile`).then(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  return (
    <Modal
      id="edit-profile-modal"
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
          <b>프로필 편집</b>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="profile-image-container">
          <img
            src={userInfo.profile ?? userIcon}
            alt="user icon"
            className="profile-image"
          />
          <div className="profile-image-button-container">
            <input
              className="profile-image-input"
              type="file"
              accept="image/*"
              name="profile"
              ref={imageRef}
              onChange={uploadImage}
            />
            <button
              className="profile-image-button image-upload"
              onClick={clickUploadImageButton}
            >
              이미지 업로드
            </button>
            <button
              className="profile-image-button image-delete"
              onClick={deleteImage}
            >
              이미지 제거
            </button>
          </div>
        </div>
        <div className="user-info-container">
          <div className="attribute-container">
            <div className="attribute">닉네임</div>
            <input
              className="nickname"
              type="text"
              placeholder="(필수) 닉네임을 입력해주세요."
              value={userInfo.name!}
              onChange={(e) =>
                setUserInfo({ ...userInfo, name: e.target.value })
              }
            />
          </div>
          <div className="attribute-container">
            <div className="attribute">자기소개</div>
            <textarea
              className="introduction"
              placeholder="회원님에 대해 소개해주세요."
              value={userInfo.introduction!}
              onChange={(e) =>
                setUserInfo({ ...userInfo, introduction: e.target.value })
              }
            />
          </div>
        </div>
        <div className="submit-button-container">
          <div className="submit-button-offset" />
          <button className="submit-user-info" onClick={updateUserInfo}>
            편집 완료
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default EditProfileModal;

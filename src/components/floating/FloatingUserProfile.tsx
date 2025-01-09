import Accordion from "react-bootstrap/Accordion";
import ProfileIcon from "@/components/base/ProfileIcon";
import { useAppSelector } from "@/stores/hooks";
import { selectUser } from "@/stores/user";
import { Link } from "react-router-dom";
import Image from "../base/Image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { BookType, UserType } from "@/types/data";

function FloatingUserProfile({
  isUserUpdated,
  setIsUserUpdated,
  isLibraryUpdated,
  setIsLibraryUpdated,
}: {
  isUserUpdated: boolean;
  isLibraryUpdated: boolean;
  setIsUserUpdated: Dispatch<SetStateAction<boolean>>;
  setIsLibraryUpdated: Dispatch<SetStateAction<boolean>>;
}) {
  const user = useAppSelector(selectUser);

  const [userInfo, setUserInfo] = useState<{
    follower_num: number;
    following_num: number;
  }>({
    follower_num: 0,
    following_num: 0,
  });
  const [books, setBooks] = useState<BookType[]>([]);

  useEffect(() => {
    console.log("hi");
    if (isUserUpdated && user && user.id != 0) {
      console.log("hi2");
      axios.get("/api/user/me").then(
        async (res) => {
          let { data }: { data: UserType } = res;
          if (data.id != 0) {
            await setUserInfo({
              follower_num: data.follower_num,
              following_num: data.following_num,
            });
            await setIsUserUpdated(false);
          }
        },
        async () => {
          await setIsUserUpdated(false);
        }
      );
    }
    if (isLibraryUpdated && user && user.id != 0) {
      console.log("hi3");
      axios
        .get(`/api/user/${user.id}/mybooks`, {
          params: {
            page: 1,
            size: 6,
          },
        })
        .then(
          async (res) => {
            let { items }: { items: BookType[] } = res.data;
            await setBooks(items);
            await setIsLibraryUpdated(false);
          },
          async () => {
            await setIsLibraryUpdated(false);
          }
        );
    }
  }, [user, isUserUpdated, isLibraryUpdated]);

  return (
    <div id="floating-user-profile">
      <div className="profile-info-container">
        <div className="profile-info">
          <ProfileIcon src={user.profile} size={50} />
          <div className="user-name">{user.name}</div>
        </div>
      </div>
      <div className="follow-info">
        <div className="follow-container">
          <div className="text">팔로워</div>
          <div className="count">{userInfo.follower_num}</div>
        </div>
        <div className="follow-container">
          <div className="text">팔로잉</div>
          <div className="count">{userInfo.following_num}</div>
        </div>
      </div>
      <Accordion alwaysOpen>
        <Accordion.Item eventKey="0" className="accordion-item">
          <Accordion.Header>내 활동</Accordion.Header>
          <Accordion.Body className="my-activity">
            <Link to={""}>좋아요</Link>
            <Link to={"/mypage/post"}>내 게시글</Link>
            <Link to={"/mypage/summary"}>내 요약</Link>
            <Link to={""}>찜 내역</Link>
            <Link to={"/mypage/debate"}>참여중인 토론방</Link>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>내 서재</Accordion.Header>
          <Accordion.Body className="my-library">
            {books.slice(0, 6).map((book, idx) => {
              return (
                <Image
                  key={"my-library-book" + idx}
                  src={book.image}
                  width="40px"
                  height="55px"
                  noImageFontSize={16}
                  noImageTextFontSize={6}
                />
              );
            })}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default FloatingUserProfile;

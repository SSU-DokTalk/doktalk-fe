import Accordion from "react-bootstrap/Accordion";
import ProfileIcon from "@/components/base/ProfileIcon";
import { useAppSelector } from "@/stores/hooks";
import { selectUser } from "@/stores/user";
import { Link, useNavigate } from "react-router-dom";
import Image from "../base/Image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { BookType, UserType } from "@/types/data";
import { useTranslation } from "react-i18next";

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
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [userInfo, setUserInfo] = useState<{
    follower_num: number;
    following_num: number;
  }>({
    follower_num: 0,
    following_num: 0,
  });
  const [books, setBooks] = useState<BookType[]>([]);

  useEffect(() => {
    if (isUserUpdated && user.id != 0) {
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
    if (isLibraryUpdated && user.id != 0) {
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
      <div
        className="profile-info-container"
        onClick={() => navigate(user.id == 0 ? "/login" : "/mypage")}
      >
        <div className="profile-info">
          <ProfileIcon profile={user.profile} size={50} />
          <div className="user-name">
            {user.name ?? t("component.floating.text.login")}
          </div>
        </div>
      </div>
      <div className="follow-info">
        <div className="follow-container">
          <div className="text">{t("component.floating.text.follower")}</div>
          <div className="count">{userInfo.follower_num}</div>
        </div>
        <div className="follow-container">
          <div className="text">{t("component.floating.text.following")}</div>
          <div className="count">{userInfo.following_num}</div>
        </div>
      </div>
      <Accordion alwaysOpen>
        <Accordion.Item eventKey="0" className="accordion-item">
          <Accordion.Header>
            {t("component.floating.text.my-activity")}
          </Accordion.Header>
          <Accordion.Body className="my-activity">
            <Link to={""}>{t("component.floating.text.likes")}</Link>
            <Link to={"/mypage/post"}>{t("component.floating.text.post")}</Link>
            <Link to={"/mypage/summary"}>
              {t("component.floating.text.summary")}
            </Link>
            <Link to={""}>{t("component.floating.text.shopping-cart")}</Link>
            <Link to={"/mypage/debate"}>
              {t("component.floating.text.debate")}
            </Link>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            {t("component.floating.text.library")}
          </Accordion.Header>
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

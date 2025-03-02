import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import ProfileIcon from "@/components/base/ProfileIcon";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { selectUser } from "@/stores/user";
import { Link, useNavigate } from "react-router-dom";
import Image from "../base/Image";
import { useEffect, useState } from "react";
import axios from "axios";
import { MyBookType, UserType } from "@/types/data";
import { useTranslation } from "react-i18next";
import { selectGlobalState, updateGlobalState } from "@/stores/globalStates";

function FloatingUserProfile() {
  const user = useAppSelector(selectUser);
  const globalState = useAppSelector(selectGlobalState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [userInfo, setUserInfo] = useState<{
    follower_num: number;
    following_num: number;
  }>({
    follower_num: 0,
    following_num: 0,
  });
  const [books, setBooks] = useState<MyBookType[]>([]);

  useEffect(() => {
    if (globalState.isFollowerUpdated && user.id != 0) {
      axios.get("/api/user/me").then(async (res) => {
        let { data }: { data: UserType } = res;
        if (data.id != 0) {
          await setUserInfo({
            follower_num: data.follower_num,
            following_num: data.following_num,
          });
        }
      });
      dispatch(updateGlobalState({ isFollowerUpdated: false }));
    }
  }, [user, globalState.isFollowerUpdated]);

  useEffect(() => {
    if (globalState.isLibraryUpdated && user.id != 0) {
      axios
        .get(`/api/user/${user.id}/mybooks`, {
          params: {
            page: 1,
            size: 6,
          },
        })
        .then(async (res) => {
          let { items }: { items: MyBookType[] } = res.data;
          await setBooks(items);
        });
      dispatch(updateGlobalState({ isLibraryUpdated: false }));
    }
  }, [user, globalState.isLibraryUpdated]);

  return (
    <div id='floating-user-profile'>
      <div
        className='profile-info-container'
        onClick={() => navigate(user.id == 0 ? "/login" : "/mypage")}>
        <div className='profile-info'>
          <ProfileIcon profile={user.profile} size={50} />
          <div className='user-name'>
            {user.name ?? t("component.floating.text.login")}
          </div>
        </div>
      </div>
      <div className='follow-info'>
        <div className='follow-container'>
          <div className='text'>{t("component.floating.text.follower")}</div>
          <div className='count'>{userInfo.follower_num}</div>
        </div>
        <div className='follow-container'>
          <div className='text'>{t("component.floating.text.following")}</div>
          <div className='count'>{userInfo.following_num}</div>
        </div>
      </div>
      <div className='accordion'>
        <Accordion className='accordion-item'>
          <AccordionSummary>
            {t("component.floating.text.my-activity")}
          </AccordionSummary>
          <AccordionDetails className='my-activity'>
            <Link to={""}>{t("component.floating.text.likes")}</Link>
            <Link to={"/mypage/post"}>{t("component.floating.text.post")}</Link>
            <Link to={"/mypage/summary"}>
              {t("component.floating.text.summary")}
            </Link>
            <Link to={""}>{t("component.floating.text.shopping-cart")}</Link>
            <Link to={"/mypage/debate"}>
              {t("component.floating.text.debate")}
            </Link>
          </AccordionDetails>
        </Accordion>

        <Accordion className='accordion-item'>
          <AccordionSummary>
            {t("component.floating.text.library")}
          </AccordionSummary>
          <AccordionDetails className='my-library'>
            <div className='books-container'>
              {books.slice(0, 6).map((mybook, idx) => {
                return (
                  <Image
                    key={"my-library-book" + idx}
                    src={mybook.book.image}
                    width='40px'
                    height='55px'
                    noImageFontSize={16}
                    noImageTextFontSize={6}
                  />
                );
              })}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}

export default FloatingUserProfile;

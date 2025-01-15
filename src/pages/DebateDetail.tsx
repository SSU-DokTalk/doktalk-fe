import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons/faCartPlus";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import ProfileIcon from "@/components/base/ProfileIcon";
import { useEffect, useState } from "react";
import axios from "axios";
import { DebateType } from "@/types/data";
import { InitialDebate } from "@/types/initialValue";
import { getDateTime, getTimeDiff } from "@/functions";
import Image from "@/components/base/Image";

function DebateDetail() {
  const { debate_id } = useParams();
  const [debate, setDebate] = useState<DebateType>(InitialDebate);

  useEffect(() => {
    axios.get(`/api/debate/${debate_id}`).then((res) => {
      let { data }: { data: DebateType } = res;
      setDebate(data);
    });
  }, [debate_id]);

  return (
    <div id="debate-detail">
      <div className="user-header">
        <div className="user-header__info">
          <ProfileIcon
            profile={debate.user.profile}
            size={40}
            className="user-header__avatar"
          />
          <div className="user-header__text">
            <span className="user-header__nickname">{debate.user.name}</span>
            <span className="user-header__time">
              {getTimeDiff(debate.created)}
            </span>
          </div>
        </div>

        <div className="user-header__actions">
          <button>수정</button>
          <button className="delete">삭제</button>
        </div>
      </div>
      <div className="discussion-info">
        <h2 className="discussion-info__title">{debate.title}</h2>

        <div className="discussion-info__grid">
          <div className="discussion-info__item">
            <strong>모임 장소</strong>
            <span>{debate.location}</span>
          </div>
          <div className="discussion-info__item">
            <strong>온라인 링크</strong>
            <span>{debate.link}</span>
          </div>
          <div className="discussion-info__item">
            <strong>시간</strong>
            <span>{getDateTime(new Date(debate.held_at))}</span>
          </div>
          <div className="discussion-info__item">
            <strong>카테고리</strong>
            <span>인문</span>
          </div>
          <div className="discussion-info__item book">
            <strong>지정 도서</strong>
            <div>
              <span>{debate.book.title}</span>
              <Image
                src={debate.book.image}
                width="100px"
                height="140px"
                className="discussion-info__cover"
              />
            </div>
          </div>
        </div>

        <pre className="discussion-info__description">{debate.content}</pre>

        <div className="discussion-info__likes">
          <FontAwesomeIcon icon={faHeart} className="like-icon" />
        </div>
      </div>
      <div className="payment-box">
        <p className="payment-box__title">
          토론방에 참여하시려면 결제가 필요합니다.
        </p>

        <div className="payment-box__info">
          <button className="payment-box__currency">
            <FontAwesomeIcon icon={faCartPlus} />
            {""} 찜
          </button>
          <span className="payment-box__amount">1,000 원</span>
          <button className="payment-box__button">
            결제하기{" "}
            <FontAwesomeIcon
              icon={faChevronRight}
              className="payment-box__button-icon"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default DebateDetail;

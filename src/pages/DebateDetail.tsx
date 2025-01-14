import { useParams } from "react-router-dom";
import "@/assets/css/pages/_debate_detail.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons/faCartPlus";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

function DebateDetail() {
  const { debate_id } = useParams();

  return (
    <div id="debate-detail">
      <div className="user-header">
        <div className="user-header__info">
          <div className="user-header__avatar" />
          <div className="user-header__text">
            <span className="user-header__nickname">닉네임</span>
            <span className="user-header__time">3시간 전</span>
          </div>
        </div>

        <div className="user-header__actions">
          <button>수정</button>
          <button className="delete">삭제</button>
        </div>
      </div>
      <div className="discussion-info">
        <h2 className="discussion-info__title">토론방 제목</h2>

        <div className="discussion-info__grid">
          <div className="discussion-info__item">
            <strong>모임 장소</strong>
            <span>송실대 입구역</span>
          </div>
          <div className="discussion-info__item">
            <strong>온라인 링크</strong>
            <span>링크첨부</span>
          </div>
          <div className="discussion-info__item">
            <strong>시간</strong>
            <span>2024년 11월 23일 15:00</span>
          </div>
          <div className="discussion-info__item">
            <strong>카테고리</strong>
            <span>인문</span>
          </div>
          <div className="discussion-info__item book">
            <strong>지정 도서</strong>
            <div>
              <span>지정도서 제목</span>
              <div className="discussion-info__cover" />
            </div>
          </div>
        </div>

        <p className="discussion-info__description">
          모모모에 대해 토론하실 분 모집합니다~ <br />
          주제는 ㅇㅇㅇㅇㅇ 입니다.
        </p>

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

import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons/faCartPlus";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import ProfileIcon from "@/components/base/ProfileIcon";
import { useEffect, useState } from "react";
import axios from "axios";
import { PaymentType, SummaryType } from "@/types/data";
import { getTimeDiff } from "@/functions";
import Image from "@/components/base/Image";
import { selectUser } from "@/stores/user";
import { useAppSelector } from "@/stores/hooks";
import { InitialSummary } from "@/types/initialValue";
import "@/assets/css/pages/_summary_detail.scss";

function SummaryDetail() {
  const { summary_id } = useParams();
  const [summary, setSummary] = useState<SummaryType>(InitialSummary);
  const [comments, setComments] = useState<any[]>([]);

  const [purchaseId, setPurchaseId] = useState<number>(0);

  const user = useAppSelector(selectUser);

  useEffect(() => {
    axios.get(`/api/summary/${summary_id}`).then((res) => {
      let { data }: { data: SummaryType } = res;
      setSummary(data);
    });

    axios.get(`/api/summary/${summary_id}/comments`).then((res) => {
      let { data }: { data: any[] } = res;
      setComments(data);
    });
  }, [summary_id]);

  const doPurchase = () => {
    // 추후 PG사 연동하여 API 작성
    // 현재는 결제 API가 없으므로 무조건 성공으로 가정
    console.log({
      product_type: "D",
      product_id: summary.id,
      price: summary.price,
      quantity: 1,
    });
    axios
      .post(`/api/purchase`, {
        product_type: "D",
        product_id: summary.id,
        price: summary.price,
        quantity: 1,
      })
      .then((res) => {
        console.log(res);
      });
  };

  const cancelPurchase = () => {
    axios.delete(`/api/purchase/${purchaseId}`).then(
      (res) => {
        console.log(res.data);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const getPurchase = () => {
    axios.get(`/api/purchase/D/${summary.id}`).then(
      (res) => {
        let { data }: { data: PaymentType } = res;
        setPurchaseId(data.id);
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const postComment = async () => {
    await axios.post(`/api/summary/${summary.id}/comment`, {
      upper_comment_id: 0,
      content: "string",
    });
  };

  return (
    <div id="summary-detail">
      <div className="user-header">
        <div className="user-header__info">
          <ProfileIcon
            profile={summary.user.profile}
            size={40}
            className="user-header__avatar"
          />
          <div className="user-header__text">
            <span className="user-header__nickname">{summary.user.name}</span>
            <span className="user-header__time">
              {getTimeDiff(summary.created)}
            </span>
          </div>
        </div>

        <div className="user-header__actions">
          {user.id === summary.user.id && (
            <>
              <button>수정</button>
              <button className="delete">삭제</button>
            </>
          )}
        </div>
      </div>
      <div className="discussion-info">
        <h2 className="discussion-info__title">{summary.title}</h2>

        <div className="discussion-info__grid">
          <div className="discussion-info__item">
            <strong>카테고리</strong>
            <span>인문</span>
          </div>
          <div className="discussion-info__item book">
            <strong>지정 도서</strong>
            <div>
              <span>{summary.book.title}</span>
              <Image
                src={summary.book.image}
                width="100px"
                height="140px"
                className="discussion-info__cover"
              />
            </div>
          </div>
        </div>

        <pre className="discussion-info__description">
          {summary.free_content}
        </pre>

        <div className="discussion-info__likes">
          <FontAwesomeIcon icon={faHeart} className="like-icon" />
          <span className="discussion-info__likes__text">
            {summary.likes_num}
          </span>
        </div>
      </div>
      <div className="payment-box">
        <p className="payment-box__title">
          이어서 읽으시려면 결제가 필요합니다.
        </p>

        <div className="payment-box__info">
          <button
            className="payment-box__currency"
            onClick={() => cancelPurchase()} // 결제 테스트용
          >
            <FontAwesomeIcon icon={faCartPlus} />
            {""} 찜
          </button>
          <span
            className="payment-box__amount"
            onClick={getPurchase} // 결제 테스트용
          >
            {summary.price} 원
          </span>
          <button className="payment-box__button" onClick={doPurchase}>
            결제하기{" "}
            <FontAwesomeIcon
              icon={faChevronRight}
              className="payment-box__button-icon"
            />
          </button>
        </div>
      </div>
      <div className="comment-box">
        <div className="comment-box__title">댓글</div>
        <div className="comment">
          <div className="comment__info">
            <ProfileIcon
              profile={user.profile}
              size={30}
              className="comment__avatar"
            />
          </div>
          <textarea placeholder="댓글을 입력해주세요." />
        </div>
        <div className="comment-box__input">
          <button onClick={postComment}>등록</button>
        </div>
        <div className="comment-box__comments">
          {comments.map((comment) => (
            <div className="comment" key={comment.id}>
              <div className="comment__info">
                <ProfileIcon
                  profile={comment.user.profile}
                  size={30}
                  className="comment__avatar"
                />
              </div>
              <div className="comment__text">
                <span className="comment__nickname">{comment.user.name}</span>
                <span className="comment__time">
                  {/* {getTimeDiff(comment.created)} */}
                </span>
                <span className="comment__content">{comment.content}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SummaryDetail;

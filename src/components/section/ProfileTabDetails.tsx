import { MyTabsCandidate } from "@/types/initialValue";
import WritePostCard from "@/components/card/WritePostCard";
import PostCard from "@/components/card/PostCard";
import WriteSummaryCard from "@/components/card/WriteSummaryCard";
import InfiniteScroll from "@/components/base/InfiniteScroll";
import { useEffect, useState } from "react";
import {
  DebateType,
  MyBookType,
  PostType,
  PaymentType,
  SummaryType,
  UserType,
} from "@/types/data";
import { selectUser } from "@/stores/user";
import { useAppSelector } from "@/stores/hooks";
import SummaryCard from "@/components/card/SummaryCard";
import Book from "@/components/base/Book";
import axios from "axios";
import noImage from "@/assets/images/no-item.svg";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import WriteDebateCard from "@/components/card/WriteDebateCard";
import DebateCard from "@/components/card/DebateCard";
import PaymentCard from "@/components/card/PaymentCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { getDateTime } from "@/functions";
import { DUMMY_PAYMENTS } from "@/common/dummy_data";

function ProfileTabDetails({
  userProfile = undefined,
  currentTab,
}: {
  userProfile?: UserType;
  currentTab: MyTabsCandidate;
}) {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [postPage, setPostPage] = useState<number>(1);
  const [postHasMore, setPostHasMore] = useState<boolean>(true);
  const [didPost, setDidPost] = useState<boolean>(false);
  const [postLikes, setPostLikes] = useState<boolean[]>([]);

  const [summaries, setSummaries] = useState<SummaryType[]>([]);
  const [summaryPage, setSummaryPage] = useState<number>(1);
  const [summaryHasMore, setSummaryHasMore] = useState<boolean>(true);
  const [summaryLikes, setSummaryLikes] = useState<boolean[]>([]);

  const [myBooks, setMyBooks] = useState<MyBookType[]>([]);
  const [totalMyBooks, setTotalMyBooks] = useState<number>(0);
  const [hasLoadedMyBook, setHasLoadedMyBook] = useState<boolean>(false);

  const [purchasedSummaries, setPurchasedSummaries] = useState<SummaryType[]>(
    []
  );
  const [totalPurchasedSummaries, setTotalPurchasedSummaries] =
    useState<number>(0);
  const [hasLoadedPurchaseSummary, setHasLoadedPurchaseSummary] =
    useState<boolean>(false);
  const [purchasedSummaryLikes, setPurchasedSummaryLikes] = useState<boolean[]>(
    []
  );

  const [debates, setDebates] = useState<DebateType[]>([]);
  const [debatePage, setDebatePage] = useState<number>(1);
  const [debateHasMore, setDebateHasMore] = useState<boolean>(true);
  const [debateLikes, setDebateLikes] = useState<boolean[]>([]);

  const [payments, setPayments] = useState<PaymentType[]>(DUMMY_PAYMENTS);
  const [paymentPage, setPaymentPage] = useState<number>(1);
  const [paymentHasMore, setPaymentHasMore] = useState<boolean>(true);
  const [paymentCurTime, setPaymentCurTime] = useState<Date>(new Date());
  const [isPaymentCurTimeChanged, setIsPaymentCurTimeChanged] =
    useState<boolean>(false);

  const user = useAppSelector(selectUser);

  useEffect(() => {
    console.log("isPaymentCurTimeChanged", isPaymentCurTimeChanged);
    if (currentTab === "/library" && userProfile && userProfile.id != 0) {
      if (!hasLoadedMyBook) {
        axios
          .get(`/api/user/${userProfile.id}/mybooks`, {
            params: {
              page: 1,
              size: 4,
            },
          })
          .then((res) => {
            let { items, total }: { items: MyBookType[]; total: number } =
              res.data;
            console.log(items, total);
            setMyBooks(items);
            setTotalMyBooks(total);
            setHasLoadedMyBook(true);
          });
      }
      if (!hasLoadedPurchaseSummary) {
        axios
          // .get(`/api/user/${userProfile.id}/purchased-summaries`)
          .get(`/api/user/${userProfile.id}/summaries`)
          .then((res) => {
            let { items, total }: { items: SummaryType[]; total: number } =
              res.data;
            setPurchasedSummaries(items);
            setTotalPurchasedSummaries(total);
            setHasLoadedPurchaseSummary(true);
          });
      }
    }
  }, [currentTab, userProfile, isPaymentCurTimeChanged]);

  return (
    <div id="profile-tab-details">
      {userProfile && userProfile?.id != 0 ? (
        currentTab === "/post" ? (
          <div className="post-tab">
            {user.id != 0 ? (
              userProfile.id == user.id ? (
                <WritePostCard setDidPost={setDidPost} />
              ) : null
            ) : null}
            <InfiniteScroll
              api={`user/${userProfile.id}/posts`}
              likes_api={`posts/like`}
              setItems={setPosts}
              page={postPage}
              setPage={setPostPage}
              hasMore={postHasMore}
              setHasMore={setPostHasMore}
              likes={postLikes}
              setLikes={setPostLikes}
              hasNoItem={posts.length === 0}
              hasNoItemMessage="아직 작성한 게시글이 없습니다"
              condition={userProfile && userProfile.id != 0}
              refreshCondition={didPost}
              dependency={[didPost]}
              afterFetchSuccess={async () => {
                await setDidPost(false);
              }}
              afterFetchFail={async () => {
                await setDidPost(false);
              }}
            >
              {posts.map((post, idx) => (
                <PostCard
                  idx={idx}
                  key={"post" + post.id}
                  post={post}
                  hasLiked={postLikes[idx]}
                  setHasLiked={setPostLikes}
                />
              ))}
            </InfiniteScroll>
          </div>
        ) : userProfile && currentTab === "/summary" ? (
          <div className="summary-tab">
            {user.id != 0 ? (
              userProfile.id == user.id ? (
                <WriteSummaryCard />
              ) : null
            ) : null}
            <InfiniteScroll
              api={`user/${userProfile.id}/summaries`}
              likes_api={`summarys/like`}
              setItems={setSummaries}
              page={summaryPage}
              setPage={setSummaryPage}
              hasMore={summaryHasMore}
              setHasMore={setSummaryHasMore}
              likes={summaryLikes}
              setLikes={setSummaryLikes}
              hasNoItem={summaries.length === 0}
              hasNoItemMessage="아직 작성한 요약이 없습니다"
              condition={userProfile && userProfile.id != 0}
            >
              {summaries.map((summary, index) => (
                <SummaryCard
                  key={"summary" + index}
                  idx={index}
                  summary={summary}
                  hasLiked={summaryLikes[index]}
                  setHasLiked={setSummaryLikes}
                />
              ))}
            </InfiniteScroll>
          </div>
        ) : userProfile && currentTab === "/library" ? (
          <div className="library-tab">
            <div className="currently-reading-books-container">
              <div className="currently-reading-header">
                <div className="currently-reading-title">
                  내가 읽고 있는 책{" "}
                  <span className="item-count">{totalMyBooks}개</span>
                </div>
                <div className="show-more">{"더보기 >"}</div>
              </div>
              {!hasLoadedMyBook ? (
                <Spinner animation="border" className="loading-spinner">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : myBooks.length === 0 ? (
                <div className="no-item">
                  <img src={noImage} alt="no image" width="122px" />
                  <p className="no-item-message">읽고 있는 책이 없습니다</p>
                  <Link to="/search" className="go-to">
                    {"내 서재에 담을 도서 검색하러 가기 >"}
                  </Link>
                </div>
              ) : (
                <div className="currently-reading-books">
                  {myBooks.slice(0, 4).map((mybook, index) => {
                    return <Book key={"book" + index} book={mybook.book} />;
                  })}
                </div>
              )}
            </div>
            <div className="currently-reading-summaries-container">
              <div className="currently-reading-header">
                <div className="currently-reading-title">
                  내가 읽고 있는 요약{" "}
                  <span className="item-count">
                    {totalPurchasedSummaries}개
                  </span>
                </div>
                <div className="show-more">{"더보기 >"}</div>
              </div>
              {!hasLoadedPurchaseSummary ? (
                <Spinner animation="border" className="loading-spinner">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : purchasedSummaries.length === 0 ? (
                <div className="no-item">
                  <img src={noImage} alt="no image" width="122px" />
                  <p className="no-item-message">읽고 있는 요약이 없습니다</p>
                  <Link to="/summary" className="go-to">
                    {"읽을 요약 보러 가기 >"}
                  </Link>
                </div>
              ) : (
                <div className="currently-reading-summaries">
                  {purchasedSummaries.slice(0, 4).map((summary, index) => {
                    return (
                      <SummaryCard
                        idx={index}
                        key={"purchased_summary" + index}
                        summary={summary}
                        hasLiked={purchasedSummaryLikes[index]}
                        setHasLiked={setPurchasedSummaryLikes}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ) : userProfile && currentTab === "/debate" ? (
          <div className="debate-tab">
            {user.id != 0 ? (
              userProfile.id == user.id ? (
                <WriteDebateCard />
              ) : null
            ) : null}
            <InfiniteScroll
              api={`user/${userProfile.id}/debates`}
              likes_api={`debates/like`}
              setItems={setDebates}
              page={debatePage}
              setPage={setDebatePage}
              hasMore={debateHasMore}
              setHasMore={setDebateHasMore}
              likes={debateLikes}
              setLikes={setDebateLikes}
              hasNoItem={debates.length === 0}
              hasNoItemMessage="아직 참여중인 토론방이 없습니다"
              condition={userProfile && userProfile.id != 0}
            >
              {debates.map((debate, index) => (
                <DebateCard
                  key={"debate" + index}
                  idx={index}
                  hasLiked={debateLikes[index]}
                  setHasLiked={setDebateLikes}
                  debate={debate}
                />
              ))}
            </InfiniteScroll>
          </div>
        ) : userProfile && currentTab === "/payment" ? (
          <div className="payment-tab">
            <div className="select-month-container">
              <div className="month-box">
                <div
                  className="month-button left"
                  onClick={async () => {
                    await setIsPaymentCurTimeChanged(true);
                    await setPaymentCurTime(
                      new Date(
                        paymentCurTime.setMonth(paymentCurTime.getMonth() - 1)
                      )
                    );
                    console.log("left", isPaymentCurTimeChanged);
                  }}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </div>
                <div
                  className="month-button right"
                  onClick={async () => {
                    await setIsPaymentCurTimeChanged(true);
                    await setPaymentCurTime(
                      new Date(
                        paymentCurTime.setMonth(paymentCurTime.getMonth() + 1)
                      )
                    );
                    console.log("right", isPaymentCurTimeChanged);
                  }}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </div>
                <div className="cur-month">
                  {paymentCurTime.getFullYear()}년{" "}
                  {paymentCurTime.getMonth() + 1}월
                </div>
                <div className="total-payment">
                  {payments
                    .filter((payment) => {
                      let time = new Date(getDateTime(payment.created));
                      return (
                        time.getFullYear() === paymentCurTime.getFullYear() &&
                        time.getMonth() === paymentCurTime.getMonth()
                      );
                    })
                    .reduce(
                      (acc, payment) => acc + payment.price * payment.quantity,
                      0
                    )}
                  원
                </div>
              </div>
            </div>
            <InfiniteScroll
              api={`user/${userProfile.id}/payments`}
              setItems={setPayments}
              page={paymentPage}
              setPage={setPaymentPage}
              hasMore={paymentHasMore}
              setHasMore={setPaymentHasMore}
              hasNoItem={payments.length === 0}
              refreshCondition={isPaymentCurTimeChanged}
              hasNoItemComponent={
                <div className="no-item">
                  <p className="no-item-message">
                    해당 날짜의 결제 내역이 없습니다
                  </p>
                </div>
              }
              condition={userProfile && userProfile.id != 0}
              afterFetchSuccess={async () => {
                console.log("success");
                await setIsPaymentCurTimeChanged(false);
              }}
              afterFetchFail={async () => {
                console.log("fail");
                await setIsPaymentCurTimeChanged(false);
              }}
              dependency={[isPaymentCurTimeChanged]}
            >
              {payments.map((payment, index) => (
                <PaymentCard key={"payment" + index} payment={payment} />
              ))}
            </InfiniteScroll>
          </div>
        ) : null
      ) : null}
      <div
        style={{
          height: "100px",
        }}
      />
    </div>
  );
}

export default ProfileTabDetails;

import { MyTabsCandidate } from "@/types/initialValue";
import WritePostCard from "@/components/card/WritePostCard";
import PostCard from "@/components/card/PostCard";
import WriteSummaryCard from "@/components/card/WriteSummaryCard";
import InfiniteScroll from "@/components/base/InfiniteScroll";
import { useEffect, useRef, useState } from "react";
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
import { CircularProgress } from "@mui/material";
import WriteDebateCard from "@/components/card/WriteDebateCard";
import DebateCard from "@/components/card/DebateCard";
import PaymentCard from "@/components/card/PaymentCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { getDateTime } from "@/functions";
import { useTranslation } from "react-i18next";

function ProfileTabDetails({
  userProfile = undefined,
  currentTab,
}: {
  userProfile?: UserType;
  currentTab: MyTabsCandidate;
}) {
  if (userProfile) {
    return (
      <div id='profile-tab-details'>
        {currentTab === "/post" ? (
          <PostTab userProfile={userProfile} />
        ) : currentTab === "/summary" ? (
          <SummaryTab userProfile={userProfile} />
        ) : currentTab === "/library" ? (
          <LibraryTab userProfile={userProfile} />
        ) : currentTab === "/debate" ? (
          <DebateTab userProfile={userProfile} />
        ) : currentTab === "/payment" ? (
          <PaymentTab userProfile={userProfile} />
        ) : undefined}
      </div>
    );
  }

  return undefined;
}

export default ProfileTabDetails;

// let Tabs: {
//   [key: string]: ({
//     userProfile,
//   }: {
//     userProfile: UserType;
//   }) => React.ReactNode;
// } = {
//   "/post": PostTab,
//   "/summary": SummaryTab,
//   "/library": LibraryTab,
//   "/debate": DebateTab,
//   "/payment": PaymentTab,
// };

function PaymentTab({ userProfile }: { userProfile: UserType }) {
  const offset = new Date().getTimezoneOffset();
  let now = new Date();
  var thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const [payments, setPayments] = useState<PaymentType[]>([]);
  const [paymentPage, setPaymentPage] = useState<number>(1);
  const [paymentHasMore, setPaymentHasMore] = useState<boolean>(true);
  const [paymentCurTime, setPaymentCurTime] = useState<Date>(thisMonth);
  const isCurTimeChanged = useRef<boolean>(false);

  const { t } = useTranslation();

  const afterFetch = () => {
    isCurTimeChanged.current = false;
  };

  return (
    <div className='payment-tab'>
      <div className='select-month-container'>
        <div className='month-box'>
          <div
            className='month-button left'
            onClick={async () => {
              isCurTimeChanged.current = true;
              await setPaymentCurTime(
                new Date(paymentCurTime.setMonth(paymentCurTime.getMonth() - 1))
              );
            }}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>
          <div
            className='month-button right'
            onClick={async () => {
              isCurTimeChanged.current = true;
              await setPaymentCurTime(
                new Date(paymentCurTime.setMonth(paymentCurTime.getMonth() + 1))
              );
            }}>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
          <div className='cur-month'>
            {paymentCurTime.getFullYear()}
            {t("component.section.profile-tab-details.time.year")}{" "}
            {t(
              `component.section.profile-tab-details.time.month.${(
                paymentCurTime.getMonth() + 1
              ).toString()}`
            )}
          </div>
          <div className='total-payment'>
            {t("component.section.profile-tab-details.item.currency")}
            {payments
              .filter((payment) => {
                let time = new Date(getDateTime(new Date(payment.created)));
                return (
                  time.getFullYear() === paymentCurTime.getFullYear() &&
                  time.getMonth() === paymentCurTime.getMonth()
                );
              })
              .reduce(
                (acc, payment) => acc + payment.price * payment.quantity,
                0
              )}
          </div>
        </div>
      </div>
      <InfiniteScroll
        api={`user/purchase`}
        api_params={{
          _from: new Date(
            paymentCurTime.getTime() - offset * 60 * 1000
          ).getTime(),
          _to: new Date(
            new Date(
              paymentCurTime.getFullYear(),
              paymentCurTime.getMonth() + 1,
              1
            ).getTime() -
              offset * 60 * 1000
          ).getTime(),
        }}
        setItems={setPayments}
        page={paymentPage}
        setPage={setPaymentPage}
        hasMore={paymentHasMore}
        setHasMore={setPaymentHasMore}
        afterFetchFail={afterFetch}
        afterFetchSuccess={afterFetch}
        hasNoItem={payments.length === 0}
        refreshCondition={isCurTimeChanged.current}
        hasNoItemComponent={
          <div className='no-item'>
            <p className='no-item-message'>해당 날짜의 결제 내역이 없습니다</p>
          </div>
        }
        condition={userProfile && userProfile.id != 0}
        dependency={[isCurTimeChanged.current]}>
        {payments.map((payment, index) => (
          <PaymentCard key={"payment" + index} payment={payment} />
        ))}
      </InfiniteScroll>
    </div>
  );
}

function DebateTab({ userProfile }: { userProfile: UserType }) {
  const [debates, setDebates] = useState<DebateType[]>([]);
  const [debatePage, setDebatePage] = useState<number>(1);
  const [debateHasMore, setDebateHasMore] = useState<boolean>(true);
  const [debateLikes, setDebateLikes] = useState<number[]>([]);

  const user = useAppSelector(selectUser);
  const { t } = useTranslation();

  return (
    <div className='debate-tab'>
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
        hasNoItemMessage={t(
          "component.section.profile-tab-details.item.no-debate-item"
        )}
        condition={userProfile && userProfile.id != 0}>
        {debates.map((debate, index) => (
          <DebateCard
            key={"debate" + index}
            hasLiked={debateLikes.includes(debate.id)}
            setHasLiked={setDebateLikes}
            debate={debate}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}

function LibraryTab({ userProfile }: { userProfile: UserType }) {
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
  const [purchasedSummaryLikes, setPurchasedSummaryLikes] = useState<number[]>(
    []
  );
  const { t } = useTranslation();

  useEffect(() => {
    if (userProfile.id != 0) {
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
            setMyBooks(items);
            setTotalMyBooks(total);
            setHasLoadedMyBook(true);
          });
      }
      if (!hasLoadedPurchaseSummary) {
        axios.get(`/api/user/${userProfile.id}/summaries`).then((res) => {
          let { items, total }: { items: SummaryType[]; total: number } =
            res.data;
          setPurchasedSummaries(items);
          setTotalPurchasedSummaries(total);
          setHasLoadedPurchaseSummary(true);
        });
      }
    }
  }, [userProfile]);

  return (
    <div className='library-tab'>
      <div className='currently-reading-books-container'>
        <div className='currently-reading-header'>
          <div className='currently-reading-title'>
            {t(
              "component.section.profile-tab-details.item.currently-reading-book-prefix"
            ) + " "}
            <span className='item-count'>
              {totalMyBooks}
              {t(
                "component.section.profile-tab-details.item.currently-reading-book-postfix"
              )}
            </span>
          </div>
          <div className='show-more'>
            {t("component.section.profile-tab-details.item.show-more") + " >"}
          </div>
        </div>
        {!hasLoadedMyBook ? (
          <div>
            <CircularProgress className='loading-spinner' />
            <span className='visually-hidden'>Loading...</span>
          </div>
        ) : myBooks.length === 0 ? (
          <div className='no-item'>
            <img src={noImage} alt='no image' width='122px' />
            <p className='no-item-message'>
              {t("component.section.profile-tab-details.item.no-book-item")}
            </p>
            <Link to='/search' className='go-to'>
              {t("component.section.profile-tab-details.go-to.search") + " >"}
            </Link>
          </div>
        ) : (
          <div className='currently-reading-books'>
            {myBooks.slice(0, 4).map((mybook, index) => {
              return <Book key={"book" + index} book={mybook.book} />;
            })}
          </div>
        )}
      </div>
      <div className='currently-reading-summaries-container'>
        <div className='currently-reading-header'>
          <div className='currently-reading-title'>
            {t(
              "component.section.profile-tab-details.item.currently-reading-summary-prefix"
            ) + " "}
            <span className='item-count'>
              {totalPurchasedSummaries}
              {t(
                "component.section.profile-tab-details.item.currently-reading-summary-postfix"
              )}
            </span>
          </div>
          <div className='show-more'>
            {t("component.section.profile-tab-details.item.show-more") + " >"}
          </div>
        </div>
        {!hasLoadedPurchaseSummary ? (
          <div>
            <CircularProgress className='loading-spinner' />
            <span className='visually-hidden'>Loading...</span>
          </div>
        ) : purchasedSummaries.length === 0 ? (
          <div className='no-item'>
            <img src={noImage} alt='no image' width='122px' />
            <p className='no-item-message'>
              {t("component.section.profile-tab-details.item.no-summary-item")}
            </p>
            <Link to='/summary' className='go-to'>
              {t("component.section.profile-tab-details.go-to.summary") + " >"}
            </Link>
          </div>
        ) : (
          <div className='currently-reading-summaries'>
            {purchasedSummaries.slice(0, 4).map((summary, index) => {
              return (
                <SummaryCard
                  key={"purchased_summary" + index}
                  summary={summary}
                  hasLiked={purchasedSummaryLikes.includes(summary.id)}
                  setHasLiked={setPurchasedSummaryLikes}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function SummaryTab({ userProfile }: { userProfile: UserType }) {
  const [summaries, setSummaries] = useState<SummaryType[]>([]);
  const [summaryPage, setSummaryPage] = useState<number>(1);
  const [summaryHasMore, setSummaryHasMore] = useState<boolean>(true);
  const [summaryLikes, setSummaryLikes] = useState<number[]>([]);

  const user = useAppSelector(selectUser);
  const { t } = useTranslation();

  return (
    <div className='summary-tab'>
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
        hasNoItemMessage={t(
          "component.section.profile-tab-details.item.no-summary-item"
        )}
        condition={userProfile && userProfile.id != 0}>
        {summaries.map((summary, index) => (
          <SummaryCard
            key={"summary" + index}
            summary={summary}
            hasLiked={summaryLikes.includes(summary.id)}
            setHasLiked={setSummaryLikes}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}

function PostTab({ userProfile }: { userProfile: UserType }) {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [postPage, setPostPage] = useState<number>(1);
  const [postHasMore, setPostHasMore] = useState<boolean>(true);
  const [didPost, setDidPost] = useState<boolean>(false);
  const [postLikes, setPostLikes] = useState<number[]>([]);

  const user = useAppSelector(selectUser);
  const { t } = useTranslation();

  return (
    <div className='post-tab'>
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
        hasNoItemMessage={t(
          "component.section.profile-tab-details.item.no-post-item"
        )}
        condition={userProfile && userProfile.id != 0}
        refreshCondition={didPost}
        dependency={[didPost]}
        afterFetchSuccess={async () => {
          await setDidPost(false);
        }}
        afterFetchFail={async () => {
          await setDidPost(false);
        }}>
        {posts.map((post) => (
          <PostCard
            key={"post" + post.id}
            post={post}
            hasLiked={postLikes.includes(post.id)}
            setHasLiked={setPostLikes}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}

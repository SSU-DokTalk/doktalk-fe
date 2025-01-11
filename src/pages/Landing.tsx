import { useState } from "react";

import PostCard from "@/components/card/PostCard";
import InfiniteScroll from "@/components/base/InfiniteScroll";
import { PostType, SummaryType } from "@/types/data";
import { useAppSelector } from "@/stores/hooks";
import { selectUser } from "@/stores/user";
import WritePostCard from "@/components/card/WritePostCard";
import PopularSummaryCard from "../components/card/PopularSummaryCard";
import { useTranslation } from "react-i18next";

function Landing() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [postPage, setPostPage] = useState<number>(1);
  const [postHasMore, setPostHasMore] = useState<boolean>(true);
  const [didPost, setDidPost] = useState<boolean>(false);
  const [postLikes, setPostLikes] = useState<boolean[]>([]);

  const [summaries, setSummaries] = useState<SummaryType[]>([]);
  const [summaryPage, setSummaryPage] = useState<number>(1);
  const [summaryHasMore, setSummaryHasMore] = useState<boolean>(true);
  const [summaryLikes, setSummaryLikes] = useState<boolean[]>([]);

  const user = useAppSelector(selectUser);
  const { t } = useTranslation();

  return (
    <div id="landing-page">
      <div className="post-container">
        <div className="post-title">{t("page.landing.title.post")}</div>
        {user.id != 0 ? <WritePostCard setDidPost={setDidPost} /> : null}
        <InfiniteScroll
          api={`post/recent`}
          likes_api={`posts/like`}
          setItems={setPosts}
          page={postPage}
          setPage={setPostPage}
          hasMore={postHasMore}
          setHasMore={setPostHasMore}
          likes={postLikes}
          setLikes={setPostLikes}
          hasNoItem={posts.length === 0}
          hasNoItemMessage={t("page.landing.item.no-post-item")}
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
      <div className="summary-container">
        <div className="summary-section-title">
          {t("page.landing.title.popular-summary")}
        </div>
        <InfiniteScroll
          api={`summary/recent`}
          likes_api={`summarys/like`}
          setItems={setSummaries}
          page={summaryPage}
          setPage={setSummaryPage}
          hasMore={summaryHasMore}
          setHasMore={setSummaryHasMore}
          likes={summaryLikes}
          setLikes={setSummaryLikes}
          hasNoItem={summaries.length === 0}
          hasNoItemMessage={t("page.landing.item.no-summary-item")}
        >
          {summaries.map((summary, index) => (
            <PopularSummaryCard
              key={"popular-summary" + index}
              idx={index}
              summary={summary}
              hasLiked={summaryLikes[index]}
              setHasLiked={setSummaryLikes}
            />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default Landing;

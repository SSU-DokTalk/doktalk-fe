import { useState } from "react";

import PostCard from "@/components/card/PostCard";
import InfiniteScroll from "@/components/base/InfiniteScroll";
import { PostType, SummaryType } from "@/types/data";
import { useAppSelector } from "@/stores/hooks";
import { selectUser } from "@/stores/user";
import WritePostCard from "@/components/card/WritePostCard";
import PopularSummaryCard from "../components/card/PopularSummaryCard";

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

  return (
    <div id="landing-page">
      <div className="post-container">
        <div className="post-title">게시글</div>
        {user && user.id != 0 ? (
          user.id == user.id ? (
            <WritePostCard setDidPost={setDidPost} />
          ) : null
        ) : null}
        <InfiniteScroll
          api={`user/${user.id}/posts`}
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
          condition={user && user.id != 0}
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
        <div className="summary-section-title">인기 요약</div>
        <InfiniteScroll
          api={`user/${user.id}/summaries`}
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
          condition={user && user.id != 0}
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

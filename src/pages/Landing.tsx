import { useEffect, useState } from "react";

import PostCard from "@/components/card/PostCard";
import InfiniteScroll from "@/components/base/InfiniteScroll";
import { PostType, SummaryType } from "@/types/data";
import { useAppSelector } from "@/stores/hooks";
import { selectUser } from "@/stores/user";
import WritePostCard from "@/components/card/WritePostCard";
import PopularSummaryCard from "../components/card/PopularSummaryCard";
import { useTranslation } from "react-i18next";
import axios from "axios";

function Landing() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [postPage, setPostPage] = useState<number>(1);
  const [postHasMore, setPostHasMore] = useState<boolean>(true);
  const [didPost, setDidPost] = useState<boolean>(false);
  const [postLikes, setPostLikes] = useState<boolean[]>([]);

  const [popularSummaries, setPopularSummaries] = useState<SummaryType[]>([]);
  const [popularSummaryLikes, setPopularSummaryLikes] = useState<boolean[]>([]);
  const [isPopularSummaryLoaded, setIsPopularSummaryLoaded] =
    useState<boolean>(false);

  const { t } = useTranslation();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (popularSummaries.length === 0 && !isPopularSummaryLoaded) {
      axios
        .get(`/api/summary/popular`)
        .then(async (res) => {
          let { data: items }: { data: SummaryType[] } = res;
          setPopularSummaries(items);

          if (user.id == 0) return;

          await axios
            .get(
              `/api/summarys/like?${items
                .map((item) => "ids=" + item.id)
                .join("&")}`
            )
            .then(
              (res) => {
                let { data: itemLikes }: { data: boolean[] } = res;
                setPopularSummaryLikes((prev) => [...prev, ...itemLikes]);
              },
              () => {
                setPopularSummaryLikes(new Array(items.length).fill(false));
              }
            );
        })
        .finally(() => {
          setIsPopularSummaryLoaded(true);
        });
    }
  });

  return (
    <div id='landing-page'>
      <div className='post-container'>
        <div className='post-title hidden md:block'>
          {t("page.landing.title.post")}
        </div>
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
          }}>
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
      <div className='summary-container hidden md:block'>
        <div className='summary-section-title'>
          {t("page.landing.title.popular-summary")}
        </div>
        {popularSummaries.map((summary, index) => (
          <PopularSummaryCard
            key={"popular-summary" + index}
            idx={index}
            summary={summary}
            hasLiked={popularSummaryLikes[index]}
            setHasLiked={setPopularSummaryLikes}
          />
        ))}
      </div>
    </div>
  );
}

export default Landing;

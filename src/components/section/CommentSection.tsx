import ProfileIcon from "@/components/base/ProfileIcon";
import CommentCard from "../card/CommentCard";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CommentType } from "@/types/data";
import axios from "axios";
import { useAppSelector } from "@/stores/hooks";
import { selectUser } from "@/stores/user";
import InfiniteScroll from "@/components/base/InfiniteScroll";

function CommentSection({
  isItemExist,
  itemType,
  itemId,
  total,
  setItem,
  api,
  commentsApi,
  commentLikesApi,
}: {
  isItemExist: boolean;
  itemType: "post" | "summary" | "debate";
  itemId: number;
  total: number;
  setItem: Dispatch<SetStateAction<any>>;
  api: string;
  commentsApi: string;
  commentLikesApi: string;
}) {
  const [commentData, setCommentData] = useState<string>("");
  const [upperComment, setUpperComment] = useState<number | undefined>(
    undefined
  );

  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentPage, setCommentPage] = useState<number>(1);
  const [commentHasMore, setCommentHasMore] = useState<boolean>(true);
  const [commentLikes, setCommentLikes] = useState<boolean[]>([]);

  const [didComment, setDidComment] = useState<boolean>(false);

  const user = useAppSelector(selectUser);

  const doComment = () => {
    axios
      .post(`/api/${api}`, {
        upper_comment_id: upperComment,
        content: commentData,
      })
      .then((res) => {
        setItem((prev: any) => {
          return {
            ...prev,
            comments_num: prev.comments_num + 1,
          };
        });
        setDidComment(true);
        setCommentData("");
        setUpperComment(undefined);
        console.log(res);
      });
  };

  useEffect(() => {}, [itemId, total]);

  return (
    <div id="comment-section">
      <p className="title">댓글 {total}</p>
      <div className="comment-box">
        <div className="comment-box__upper">
          <ProfileIcon profile={user.profile} size={34} />
          <textarea
            value={commentData}
            onChange={(e) => setCommentData(e.target.value)}
            className="comment-box__input"
            placeholder="댓글을 입력해주세요"
          />
        </div>
        <div className="comment-box__lower">
          <button onClick={doComment}>등록</button>
        </div>
      </div>
      <InfiniteScroll
        api={commentsApi}
        likes_api={commentLikesApi}
        setItems={setComments}
        page={commentPage}
        setPage={setCommentPage}
        hasMore={commentHasMore}
        setHasMore={setCommentHasMore}
        likes={commentLikes}
        setLikes={setCommentLikes}
        hasNoItem={comments.length === 0}
        condition={isItemExist}
        refreshCondition={didComment}
        dependency={[itemId, didComment]}
        afterFetchSuccess={async () => {
          await setDidComment(false);
        }}
        afterFetchFail={async () => {
          await setDidComment(false);
        }}
        hasNoItemComponent={<div></div>}
      >
        {comments.map((comment, idx) => (
          <CommentCard
            key={"comment" + idx}
            idx={idx}
            itemType={itemType}
            comment={comment}
            hasLiked={commentLikes[idx]}
            setHasLiked={setCommentLikes}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default CommentSection;

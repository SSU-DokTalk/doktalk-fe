import { useEffect } from "react";
import PostList, { PostDetail, } from "@/components/Post";
import BoardWriteBar from "@/components/BoardWriteBar";
import HotPostList from "@/components/HotPost";
import SideBar from "@/components/SideBar";

import { MOCK_BOOKS } from "@/types/data";
import usePosts from "@/hooks/usePosts";
import useUserRedux from "@/hooks/useUserRedux";
import useSelectPost from "@/hooks/useSelectPost";
import HotDebates from "@/components/HotDebates";

function Landing() {
  const { posts, update } = usePosts();
  const { user } = useUserRedux();
  const { handleCloseDetail, handlePostClick, selectedPost } = useSelectPost();

  useEffect(() => {
    update();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "30px",
        alignItems: "center",
        flexWrap: "wrap",
        width: "100%",
      }}
    >
      <div
        style={{
          // height: "400px",
          backgroundColor: "#F3F4F7",
          textAlign: "center",
          fontSize: "20px",
          alignContent: "center",
          width: "100%",
          paddingTop: "20px",
          paddingBottom: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      // onClick={test}
      >
        <div style={{ textAlign: "left", fontSize: "24px", width: "100%" }}>
          {user && user.id ? (
            <div style={{ width: "100%" }}>
              <div style={{ width: "50%", margin: "auto" }}>
                <span style={{ fontWeight: "bold", color: "#000080" }}>
                  {user.name}
                </span>
                {" 님을 위한 추천 토론방"}
              </div>
              <HotDebates />
            </div>
          ) : (
            <div style={{ width: "50%", margin: "auto" }}>
              {"로그인하여 추천 토론방을 확인하세요"}
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          gap: "40px",
          alignItems: "start",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <SideBar
          books={MOCK_BOOKS}
        />
        <div
          style={{
            width: "40%",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            alignItems: "start",
          }}
        >
          <h1
            style={{
              fontSize: "30px",
              fontWeight: "bold",
              color: "#000080",
            }}
          >
            게시글
          </h1>
          {selectedPost ? (
            <PostDetail
              post={selectedPost}
              onClose={handleCloseDetail}
            />
          ) : (
            <>
              <BoardWriteBar />
              {/* <Suspense
                  fallback={<PostSkeleton />}
                > */}
              <PostList
                posts={posts}
                onPostClick={handlePostClick}
              />
              {/* </Suspense> */}
            </>
          )}
        </div>
        <HotPostList posts={posts} />
      </div>
    </div>
  );
}

export default Landing;

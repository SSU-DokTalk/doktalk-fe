import axios from "axios";
import { useEffect, useState } from "react";
import ArticleList, { ArticleDetail } from "@/components/Article";
import BoardWriteBar from "@/components/BoardWriteBar";
import BookList from "@/components/Book";
import HotArticleList from "@/components/HotArticle";
import SideBar from "@/components/SideBar";

import { ArticleType, BookType, UserType } from "@/types/components";
import { MOCK_BOOKS } from "@/types/data";

function Landing() {
  const [user, setUser] = useState<UserType | null>(null);
  const [articles, setArticles] = useState<ArticleType[]>([]);
  // const [writeMode, setWriteMode] = useState(false);
  const [books] = useState<BookType[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<ArticleType | null>(
    null
  );

  const handleArticleClick = (article: ArticleType) => {
    setSelectedArticle(article);
  };

  const handleCloseDetail = () => {
    setSelectedArticle(null);
  };

  useEffect(() => {
    fetchUser();
    fetchArticles();
  }, []);

  const fetchArticles = () => {
    axios
      .get("/api/post/recent")
      .then((res) => {
        setArticles(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchUser = () => {
    axios
      .get("/api/user/me")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        <div style={{ textAlign: "left", fontSize: "24px", width: "50%" }}>
          {user ? (
            <>
              <span style={{ fontWeight: "bold", color: "#000080" }}>
                {user.name}
              </span>
              {" 님을 위한 추천도서"}
            </>
          ) : (
            "로그인하여 추천도서를 확인하세요"
          )}
        </div>
        <BookList books={books} />
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
        {user ? (
          <SideBar
            books={MOCK_BOOKS}
            following={user?.following_num}
            follwers={user?.follower_num}
            user={user}
          />
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontSize: "20px",
              width: "15%",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                alignItems: "center",
                fontSize: "20px",
                background: "#F3F4F7",
                width: "100%",
                padding: "16px",
                borderTopRightRadius: "10px",
                borderTopLeftRadius: "10px",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  backgroundColor: "gray",
                }}
              />
              <span style={{ fontSize: "14px" }}>로그인하세요</span>
            </div>
          </div>
        )}
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
          {selectedArticle ? (
            <ArticleDetail
              user={user}
              article={selectedArticle}
              onClose={handleCloseDetail}
            />
          ) : (
            <>
              <BoardWriteBar />
              <ArticleList
                articles={articles}
                onArticleClick={handleArticleClick}
              />
            </>
          )}
        </div>
        <HotArticleList articles={articles} />
      </div>
    </div>
  );
}

export default Landing;

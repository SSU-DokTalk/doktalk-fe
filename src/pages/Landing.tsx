import BookList from "@/components/Book";
import { ArticleType, BookType, UserType } from "@/types/components";
import axios from "axios";
import BoardWriteBar from "@/components/BoardWriteBar";
import ArticleList, { ArticleDetail } from "@/components/Article";
import SideBar from "@/components/SideBar";
import HotArticleList from "@/components/HotArticle";
import { useEffect, useState } from "react";
import mockBook1 from "@/assets/images/mock.png";
import mockBook2 from "@/assets/images/mock2.png";

// const MOCK_USER = {
//   name: "사용자1",
//   profile: "https://picsum.photos/200/300",
//   role: "USER",
//   is_deleted: false,
//   id: 1,
// }

// const MOCK_ARTICLES = [
//   {
//     title: "제목1",
//     content: "말라파르테 문학상, 만해문학상 수상작우리 시대의 소설 『소년이 온다』2014년 만해문학상, 2017년 이탈리아 말라파르테 문학상을 수상하고 전세계 20여개국에 번역 출간되며 세계를 사로잡은 우리 시대의 소설 『소년이 온다 ----ㅇㅇㅇㅇㅇㅇㅇㅇ",
//     createdAt: "2021-10-10",
//     like: 10,
//     commentCount: 5,
//     user: MOCK_USER,
//     image: "https://picsum.photos/200/300",
//   },
//   {
//     title: "제목2",
//     content: "말라파르테 문학상, 만해문학상 수상작우리 시대의 소설 『소년이 온다』2014년 만해문학상, 2017년 이탈리아 말라파르테 문학상을 수상하고 전세계 20여개국에 번역 출간되며 세계를 사로잡은 우리 시대의 소설 『소년이 온다 ----ㅇㅇㅇㅇㅇㅇㅇㅇ",
//     createdAt: "2021-10-11",
//     like: 20,
//     commentCount: 10,
//     user: MOCK_USER,
//     image: "https://picsum.photos/200/300",
//   },
//   {
//     title: "제목3",
//     content: "말라파르테 문학상, 만해문학상 수상작우리 시대의 소설 『소년이 온다』2014년 만해문학상, 2017년 이탈리아 말라파르테 문학상을 수상하고 전세계 20여개국에 번역 출간되며 세계를 사로잡은 우리 시대의 소설 『소년이 온다 ----ㅇㅇㅇㅇㅇㅇㅇㅇ",
//     createdAt: "2021-10-12",
//     like: 30,
//     commentCount: 15,
//     user: MOCK_USER,
//     image: "https://picsum.photos/200/300",
//   },
// ]

const MOCK_BOOKS: BookType[] = [
  {
    title: "책1",
    imgSrc: mockBook1,
    author: "작가1",
    href: "https://www.naver.com",
  },
  {
    title: "책2",
    imgSrc: mockBook2,
    author: "작가2",
    href: "https://www.naver.com",
  },
  {
    title: "책1",
    imgSrc: mockBook1,
    author: "작가1",
    href: "https://www.naver.com",
  },
  {
    title: "책2",
    imgSrc: mockBook2,
    author: "작가2",
    href: "https://www.naver.com",
  },
  {
    title: "책1",
    imgSrc: mockBook1,
    author: "작가1",
    href: "https://www.naver.com",
  },
  {
    title: "책2",
    imgSrc: mockBook2,
    author: "작가2",
    href: "https://www.naver.com",
  },
]

// const MOCK_SIDEBAR = {
//   user: MOCK_USER,
//   books: MOCK_BOOKS,
//   follwers: 100,
//   following: 200,
// }

function Landing() {

  const [user, setUser] = useState<UserType | null>(null);
  const [articles, setArticles] = useState<ArticleType[]>([]);
  // const [writeMode, setWriteMode] = useState(false);
  const [books,] = useState<BookType[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<ArticleType | null>(null);

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
  }

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
          {user ? <><span style={{ fontWeight: "bold", color: "#000080" }}>{user.name}</span>{" 님을 위한 추천도서"}</> : "로그인하여 추천도서를 확인하세요"}
        </div>
        <BookList books={books} />
      </div>
      <div style={{
        width: "100%", display: "flex", gap: "40px", alignItems: "start", justifyContent: "center", padding: "20px",
      }}>
        {user ?
          <SideBar books={MOCK_BOOKS} following={user?.following_num} follwers={user?.follower_num} user={user} /> :
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", fontSize: "20px", width: "15%", borderRadius: "10px", }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center", fontSize: "20px", background: "#F3F4F7", width: "100%", padding: "16px", borderTopRightRadius: "10px", borderTopLeftRadius: "10px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "gray" }} />
              <span style={{ fontSize: "14px" }}>로그인하세요</span>
            </div>
          </div>
        }
        <div style={{ width: "40%", display: "flex", flexDirection: "column", gap: "30px", alignItems: "start", }}>
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
            <ArticleDetail user={user} article={selectedArticle} onClose={handleCloseDetail} />
          ) : (
            <>
              <BoardWriteBar />
              <ArticleList articles={articles} onArticleClick={handleArticleClick} />
            </>
          )}
        </div>
        <HotArticleList articles={articles} />
      </div>
    </div >
  );
}

export default Landing;

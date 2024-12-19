import BookCategory from "@/components/BookCategory"
import BookList from "@/components/BookListSearch"
import SideBar from "@/components/SideBar"
import { UserType } from "@/types/components"
import { MOCK_BOOKS } from "@/types/data"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { useEffect, useState } from "react"

function Search() {

    const [user, setUser] = useState<UserType | null>(null);

    useEffect(() => {
        fetchUser();
    }, []);
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
                        // height: "400px",
                        textAlign: "center",
                        fontSize: "20px",
                        alignContent: "center",
                        width: "80%",
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
                    <div
                        style={{
                            width: "100%",
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
                            도서 검색
                        </h1>
                    </div>
                    <BookCategory />
                    <div
                        style={{
                            display: "flex",
                            // flexDirection: "column",
                            width: "100%",
                            position: "relative",
                            zIndex: 0,
                            justifyContent: "center",
                            alignItems: "center",
                            // gap: "10px",
                            fontSize: "20px",
                            border: "2px solid #000080",
                            borderRadius: "30px",
                        }}
                    >
                        <textarea
                            style={{
                                marginLeft: "auto",
                                width: "100%",
                                borderRadius: "30px",
                                height: `50px`,
                                border: "none",
                                outline: "none",
                                paddingTop: "10px",
                                animation: "grow 0.5s",
                                transition: "height 0.1s",
                                paddingLeft: "10%",
                                paddingRight: "20px",
                                backgroundColor: "white",
                                resize: "none",
                            }}
                            placeholder="게시글을 작성해보세요!"
                        />
                        <button
                            style={{
                                // width: "100px",
                                padding: "0 10px",
                                height: "30px",
                                color: "white",
                                backgroundColor: "#F3F4F7",
                                border: "none",
                                borderRadius: "10px",
                                cursor: "pointer",
                                position: "absolute",
                                left: "10px",
                                top: "24px",
                                transform: "translateY(-50%)",
                            }}
                        >
                            <FontAwesomeIcon
                                style={{ color: "#000080" }}
                                color="white"
                                icon={faMagnifyingGlass}
                            />
                        </button>
                    </div>
                    <BookList />
                </div>
            </div>
        </div>
    )
}

export default Search
import BookList from "@/components/BookListSearch"
import Header from "@/components/Header"
import SearchBar from "@/components/SearchBar"
import SideBar from "@/components/SideBar"
import { MOCK_BOOKS } from "@/types/data"

function Search() {

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
                <SideBar
                    books={MOCK_BOOKS}
                />
                <div
                    style={{
                        textAlign: "center",
                        fontSize: "20px",
                        alignContent: "center",
                        width: "60%",
                        paddingTop: "20px",
                        paddingBottom: "20px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "30px",
                        alignItems: "center",
                        flexWrap: "wrap",
                    }}
                >
                    <Header text="도서 검색" />
                    {/* <BookCategory /> */}
                    <SearchBar placeholder="관심 도서를 검색해보세요!" />
                    <BookList />
                </div>
            </div>
        </div>
    )
}

export default Search
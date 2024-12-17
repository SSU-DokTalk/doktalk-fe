import { Book } from "@/components/Book"

const MOCK_BOOKS = [
    {
        title: "책 제목",
        imgSrc: "https://via.placeholder.com/150",
        author: "작가",
        href: "https://www.google.com",
    },
    {
        title: "책 제목",
        imgSrc: "https://via.placeholder.com/150",
        author: "작가",
        href: "https://www.naver.com",
    },
]

function Search() {
    return (
        <div>
            <h1>도서 검색</h1>
            <div>
                <div>

                </div>
                <div>
                </div>
            </div>
            <input type="text" />
            <div>
                {MOCK_BOOKS.map((book) => (
                    <Book key={book.title} {...book} />
                ))}
            </div>
        </div>
    )
}

export default Search
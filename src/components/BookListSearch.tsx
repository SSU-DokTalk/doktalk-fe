const mockBooks = [
    {
        title: "도서이름",
        author: "저자 이름",
        publisher: "출판사",
        desc: `밀라파르테 문학상, 만해문학상 수상작
우리 시대의 소설 "소년이 온다"
2014년 만해문학상, 2017년 이탈리아 말라파르테 문학상 수상
전 20여개국에 번역 출간되며 세계를 사로잡은 우리 시대의 소설`
    },
    {
        title: "도서이름",
        author: "저자 이름",
        publisher: "출판사",
        desc: `밀라파르테 문학상, 만해문학상 수상작
우리 시대의 소설 "소년이 온다"
2014년 만해문학상, 2017년 이탈리아 말라파르테 문학상 수상
전 20여개국에 번역 출간되며 세계를 사로잡은 우리 시대의 소설`
    },
    {
        title: "도서이름",
        author: "저자 이름",
        publisher: "출판사",
        desc: `밀라파르테 문학상, 만해문학상 수상작
우리 시대의 소설 "소년이 온다"
2014년 만해문학상, 2017년 이탈리아 말라파르테 문학상 수상
전 20여개국에 번역 출간되며 세계를 사로잡은 우리 시대의 소설`
    }
];

const BookList = () => {
    return (
        <div style={{
            fontFamily: 'sans-serif',
            padding: '20px',
            width: '100%'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginBottom: '20px',
                gap: '20px'
            }}>
                <a href="#" style={{ textDecoration: 'none', color: 'black' }}>최신순</a>
                <a href="#" style={{ textDecoration: 'none', color: 'black' }}>인기순</a>
            </div>

            <div>
                {mockBooks.map((book, idx) => (
                    <div key={idx} style={{
                        display: 'flex',
                        borderBottom: '1px solid #ccc',
                        paddingBottom: '20px',
                        marginBottom: '20px',
                    }}>
                        {/* 이미지 영역(가상의 사각형으로 대체) */}
                        <div style={{
                            width: '100px',
                            height: '120px',
                            backgroundColor: '#ddd',
                            marginRight: '20px'
                        }}></div>

                        {/* 텍스트와 버튼 영역 */}
                        <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', textAlign: "left" }}>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ color: '#003399', margin: '0 0 5px 0' }}>{book.title}</h3>
                                <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                                    {book.author} | {book.publisher}
                                </div>
                                <div style={{ fontSize: '14px', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>
                                    {book.desc}
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                                <button style={{
                                    backgroundColor: '#003399',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '10px 20px',
                                    borderRadius: '4px',
                                    marginBottom: '10px',
                                    cursor: 'pointer'
                                }}>내 서재에 담기</button>

                                <button style={{
                                    backgroundColor: '#fff',
                                    color: '#003399',
                                    border: '2px solid #003399',
                                    padding: '8px 20px',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}>요약 보기</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookList;

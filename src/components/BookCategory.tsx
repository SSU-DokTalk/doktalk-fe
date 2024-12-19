const categories = [
    ["소설", "시/에세이", "인문", "역사", "종교", "예술"],
    ["사회", "과학", "경제/경영", "자기계발", "정치", "여행"],
    ["청소년", "어린이", "건강", "취미/실용/스포츠", "만화"]
];

const Sidebar = () => {
    return (
        <div style={{
            borderRight: '1px solid #ccc',
            padding: '20px',
            width: '150px'
        }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '10px', fontWeight: 'bold', color: 'white', background: '#003399', padding: '5px' }}>
                    국내 도서
                </li>
                <li style={{ marginBottom: '10px' }}>
                    외국 도서
                </li>
            </ul>
        </div>
    );
};

const CategoryList = () => {
    return (
        <div style={{ padding: '20px', flex: 1 }}>
            <h3 style={{ marginBottom: '20px', color: '#003399' }}>국내도서 전체</h3>
            <div style={{ display: 'flex', gap: '40px' }}>
                {categories.map((col, colIdx) => (
                    <ul key={colIdx} style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {col.map((item, idx) => (
                            <li key={idx} style={{ marginBottom: '10px' }}>{item}</li>
                        ))}
                    </ul>
                ))}
            </div>
        </div>
    );
};

const BookCategory = () => {
    return (
        <div style={{
            display: 'flex',
            border: '1px solid #ccc',
            borderRadius: '4px',
            overflow: 'hidden',
            fontFamily: 'sans-serif',
            width: '100%',
        }}>
            <Sidebar />
            <CategoryList />
        </div>
    );
};

export default BookCategory;

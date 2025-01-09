import { createSummary } from "@/api/summary";
import { useState } from "react";

function SummaryCreate() {
    // State hooks (you can expand these as needed)
    const [title, setTitle] = useState("");
    const [selectedBook, setSelectedBook] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [content, setContent] = useState("");
    const [price, setPrice] = useState("");

    // Inline CSS styles
    // const containerStyle = {
    //     width: "450px",
    //     margin: "0 auto",
    //     fontFamily: "sans-serif",
    //     display: "flex",
    //     flexDirection: "column",
    //     gap: "12px",
    //     border: "1px solid #ccc",
    //     padding: "20px",
    //     borderRadius: "8px",
    // };

    const titleStyle: any = {
        fontSize: "16px",
        fontWeight: "bold",
        marginBottom: "4px",
    };

    const inputStyle: any = {
        width: "100%",
        padding: "8px",
        fontSize: "14px",
        boxSizing: "border-box",
        border: "1px solid #ccc",
        borderRadius: "4px",
    };

    const selectStyle: any = {
        ...inputStyle,
        height: "36px",
    };

    const fileSectionStyle: any = {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        flexWrap: "wrap",
    };

    const filePreviewContainerStyle: any = {
        display: "flex",
        gap: "6px",
    };

    const filePreviewStyle: any = {
        width: "60px",
        height: "60px",
        backgroundColor: "#eee",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "4px",
        fontSize: "12px",
        color: "#666",
    };

    const pdfPreviewStyle: any = {
        ...filePreviewStyle,
        backgroundColor: "#f0f0f0",
        fontWeight: "bold",
    };

    const textareaStyle: any = {
        ...inputStyle,
        height: "80px",
        resize: "vertical",
    };

    const priceContainerStyle: any = {
        display: "flex",
        flexDirection: "column",
    };

    const buttonContainerStyle: any = {
        display: "flex",
        gap: "8px",
    };

    const buttonStyle: any = {
        flex: "1",
        padding: "10px",
        borderRadius: "4px",
        fontSize: "14px",
        cursor: "pointer",
        border: "none",
    };

    const handleTemporarySave = () => {
        alert("임시 저장 되었습니다!");
    };

    const handleSubmit = () => {
        createSummary({
            title: title,
            charged_content: [content],
            free_content: ["free content"],
            isbn: selectedBook,
            price: parseInt(price),
        });
        
        alert("작성 완료!");
    };

    return (
        <div>
            {/* 제목 입력 */}
            <div>
                <div style={titleStyle}>제목을 입력해주세요.</div>
                <input
                    type="text"
                    style={inputStyle}
                    placeholder="제목을 입력해주세요."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            {/* 도서 선택 */}
            <div>
                <div style={titleStyle}>도서 선택</div>
                <select
                    style={selectStyle}
                    value={selectedBook}
                    onChange={(e) => setSelectedBook(e.target.value)}
                >
                    <option value="">요약할 도서를 선택해주세요.</option>
                    <option value="book1">도서 1</option>
                    <option value="book2">도서 2</option>
                </select>
            </div>

            {/* 카테고리 선택 */}
            <div>
                <div style={titleStyle}>카테고리</div>
                <select
                    style={selectStyle}
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">카테고리를 선택해주세요.</option>
                    <option value="category1">카테고리 1</option>
                    <option value="category2">카테고리 2</option>
                </select>
            </div>

            {/* 파일 첨부 + 미리보기 */}
            <div>
                <div style={titleStyle}>파일 첨부</div>
                <div style={fileSectionStyle}>
                    <button style={{ ...buttonStyle, width: "auto" }}>파일 첨부</button>
                    <div style={filePreviewContainerStyle}>
                        <div style={filePreviewStyle}>미리보기</div>
                        <div style={filePreviewStyle}>미리보기</div>
                        <div style={pdfPreviewStyle}>파일.pdf</div>
                    </div>
                </div>
            </div>

            {/* 텍스트 영역 */}
            <div>
                <div style={titleStyle}>나누고 싶은 이야기를 채워주세요.</div>
                <textarea
                    style={textareaStyle}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>

            {/* 가격 선택 */}
            <div style={priceContainerStyle}>
                <div style={titleStyle}>가격</div>
                <select
                    style={selectStyle}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                >
                    <option value="">가격을 선택해 주세요.</option>
                    <option value="0">무료</option>
                    <option value="100">100원</option>
                    <option value="200">200원</option>
                </select>
            </div>

            {/* 버튼들 */}
            <div style={buttonContainerStyle}>
                <button style={{ ...buttonStyle, backgroundColor: "#d3d3d3" }} onClick={handleTemporarySave}>
                    임시 저장
                </button>
                <button style={{ ...buttonStyle, backgroundColor: "#4285f4", color: "#fff" }} onClick={handleSubmit}>
                    작성 완료
                </button>
            </div>
        </div>
    );
}

export default SummaryCreate;

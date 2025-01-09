import { useState } from "react";
import "@/assets/css/PaymentPage.css";

export default function PaymentPage() {
    // For simplicity, here's hardcoded product and user data
    const product = {
        title: "독서요약 제목",
        author: "글쓴이 이름",
        price: 1000,
        id: 1,
    };

    // State to track if the product is selected or not
    const [isChecked, setIsChecked] = useState(false);

    // Calculate total price based on whether the product is selected
    const totalPrice = isChecked ? product.price : 0;

    const handleCheckbox = () => {
        setIsChecked((prev) => !prev);
    };

    return (
        <div className="payment-container">
            {/* Left: Product list */}
            <div className="payment-products">
                <div className="product-header">
                    <input
                        type="checkbox"
                        // You can implement "select all" logic if there are multiple items
                        disabled
                    />
                    <span>전체 선택 0/2</span>
                </div>

                <div className="product-item">
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckbox}
                    />
                    <div className="product-image">썸네일</div>
                    <div className="product-title">
                        <div>{product.title}</div>
                        <div className="product-author">{product.author}</div>
                    </div>
                    <div className="product-price">
                        {product.price.toLocaleString()} 원
                    </div>
                    {/* "X" (삭제) 버튼 모양 예시 */}
                    <button className="delete-btn">✕</button>
                </div>
            </div>

            {/* Right: Payment details */}
            <div className="payment-details">
                <div className="buyer-info">
                    <h4>구매자 정보</h4>
                    <p>이름: 이름</p>
                    <p>이메일: abcd@naver.com</p>
                    <p>전화번호: 010-0000-0000</p>
                </div>

                <div className="total-price-section">
                    <p>총 결제 금액</p>
                    <h2>{totalPrice.toLocaleString()} 원</h2>
                </div>

                <button className="pay-btn">결제하기</button>
            </div>
        </div>
    );
}

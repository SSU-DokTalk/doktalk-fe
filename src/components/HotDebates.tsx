import { MOCK_DEBATES } from '@/types/data';
import '@/assets/css/components/_debate.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function HotDebates() {
    return (
        <div
            style={{
                display: "flex",
                gap: "10px",
                width: "100%",
                justifyContent: "center",
            }}
        >
            {MOCK_DEBATES.slice(0, 3).map((book, idx) => {
                return (
                    <div key={"debate" + idx} className="debate-card">
                        <div className="debate-card__image-wrapper">
                            <img
                                src={book.imgSrc}
                                alt="토론방 대표 이미지"
                                className="debate-card__image"
                            />
                        </div>
                        <div className="debate-card__content">
                            <h3 className="debate-card__title">{book.title}</h3>
                            <p className="debate-card__preview">
                                {book.content}
                            </p>
                            <div className="debate-card__author">
                                <div className="debate-card__author-icon"><FontAwesomeIcon icon={faUser} /></div>
                                <div className="debate-card__nickname">{book.author}</div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default HotDebates;
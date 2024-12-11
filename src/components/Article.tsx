import { ArticleType } from '@/types/components'
import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function Article({ comments_num, content, created_at, image1, likes_num, title, user }: ArticleType) {
    return (
        <div
            style={{
                // height: "400px",
                backgroundColor: "white",
                textAlign: "left",
                fontSize: "20px",
                alignContent: "start",
                width: "100%",
                borderRadius: "20px",
                border: "2px solid #F3F4F7",
                padding: "20px",
                // margin: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
            }}
        >
            <div style={{ display: "flex", gap: "10px", alignItems: "center", fontSize: "20px", }}>
                {user?.profile ? <img src={user.profile} alt={user.name} style={{ width: "32px", height: "32px", borderRadius: "50%" }} /> : <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "gray" }} />}
                <span style={{ fontSize: "14px" }}>{user.name}</span>
                <span style={{ fontSize: "14px", color: "#666565" }}>{new Date().getHours() - new Date(created_at).getHours()} 시간 전</span>
            </div>
            <div>
                <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>{title}</h1>
                <p style={{ fontSize: "15px" }}>{content}</p>
            </div>
            <img src={image1} alt={title} style={{ width: "auto", height: "500px", borderRadius: "20px", objectFit: "cover" }} />
            <div style={{ display: "flex", gap: "12px", alignItems: "end", color: "#666565" }}>
                <div style={{ fontSize: "16px", }}>
                    <FontAwesomeIcon icon={faHeart} style={{ marginRight: "4px" }} /><span>{likes_num}</span>
                </div>
                <div style={{ fontSize: "16px", }}>
                    <FontAwesomeIcon icon={faComment} style={{ marginRight: "4px" }} /><span>{comments_num}</span>
                </div>
                <div style={{ fontSize: "14px", cursor: "pointer", }}>
                    댓글더보기
                </div>
            </div>
        </div >
    )
}

function ArticleList({ articles }: { articles: ArticleType[] }) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                alignItems: "center",
                flexWrap: "wrap",
                width: "100%",
            }}
        >
            {articles.map((article, index) => (
                <Article key={`${article.title}-${index}`} {...article} />
            ))}
        </div>
    )
}

export default ArticleList
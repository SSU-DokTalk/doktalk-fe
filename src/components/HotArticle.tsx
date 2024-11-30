import { ArticleType } from '@/types/components'
import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function HotArticle({ commentCount, content, like, title, user, }: ArticleType) {
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
            <div>
                <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>{title}</h1>
                <p style={{ fontSize: "15px" }}>{content}</p>
            </div>
            <div style={{ display: "flex", gap: "12px", alignItems: "center", color: "#666565" }}>
                <div style={{ display: "flex", gap: "10px", alignItems: "center", fontSize: "20px", }}>
                    {user?.image ? <img src={user.image} alt={user.name} style={{ width: "32px", height: "32px", borderRadius: "50%" }} /> : <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "gray" }} />}
                    <span style={{ fontSize: "14px" }}>{user.name}</span>
                </div>
                <div style={{ fontSize: "16px", marginLeft: "auto" }}>
                    <FontAwesomeIcon icon={faHeart} style={{ marginRight: "4px" }} /><span>{like}</span>
                </div>
                <div style={{ fontSize: "16px", }}>
                    <FontAwesomeIcon icon={faComment} style={{ marginRight: "4px" }} /><span>{commentCount}</span>
                </div>
            </div>
        </div >

    )
}

function HotArticleList({ articles }: { articles: ArticleType[] }) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                alignItems: "center",
                flexWrap: "wrap",
                width: "20%",
            }}
        >
            <h1
                style={{
                    width: "100%",
                    fontSize: "30px",
                    textAlign: "start",
                    fontWeight: "bold",
                    color: "#000080",
                }}
            >
                인기 게시글
            </h1>
            {articles.map((article, index) => (
                <HotArticle key={`${article.title}-${index}`} {...article} />
            ))}
        </div>
    )
}

export default HotArticleList
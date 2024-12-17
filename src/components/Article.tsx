import { heartUp } from '@/api/article'
import { ArticleType, CommentType, UserType } from '@/types/components'
import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import Comment from './Comment'
import axios from 'axios'


export function ArticleDetail({ user, article, onClose }: { user: UserType | null, article: ArticleType, onClose: () => void }) {

    const [comments, setComments] = useState<CommentType[]>([]);
    const [text, setText] = useState("");

    useEffect(() => {
        const handlePopState = () => {
            onClose();
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [])

    useEffect(() => {
        fetchComments();
    }, [])

    const fetchComments = () => {
        axios.get(`/api/post/${article.id}/comments`).then((response) => {
            setComments(response.data);
        }).catch((error) => {
            console.error(error);
        });
    }

    const handleCommentSubmit = () => {
        axios.post(`/api/post/${article.id}/comments`, { content: text }).then(() => {
            fetchComments();
        }).catch((error) => {
            console.error(error);
        });
    }

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "start", gap: "24px", fontSize: "20px", width: "100%" }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "center", fontSize: "20px", width: "100%" }}>
                {article.user ? <img src={article.user.profile} alt={article.user.name} style={{ width: "32px", height: "32px", borderRadius: "50%" }} /> : <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "gray" }} />}
                <span style={{ fontSize: "14px" }}>{article.user?.name}</span>
                <span style={{ fontSize: "14px", color: "#666565" }}>{new Date().getHours() - new Date(article.created_at).getHours()} 시간 전</span>
                {article.user.id == user?.id ?
                    <div style={{ display: "flex", gap: "10px", alignItems: "center", fontSize: "20px", marginLeft: "auto" }}>
                        <button
                            onClick={() => console.log("수정")}
                            style={{ fontSize: "16px", background: "none", border: "2px gray solid", borderRadius: "8px", color: "gray" }}
                        >
                            수정
                        </button>
                        <button
                            onClick={() => console.log("삭제")}
                            style={{ fontSize: "16px", background: "none", border: "2px #DD2033 solid", borderRadius: "8px", color: "#DD2033" }}
                        >
                            삭제
                        </button>
                    </div>
                    : null}
            </div>
            <div
                style={{ cursor: "pointer" }}
            // onClick={onClick}
            >
                <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>{article.title}</h1>
                <p style={{ fontSize: "15px" }}>{article.content}</p>
            </div>
            <img src={article.image1} alt={article.title} style={{ width: "auto", height: "500px", borderRadius: "20px", objectFit: "cover" }} />
            <button
                onClick={() => heartUp(article.id)}
                style={{ fontSize: "16px", background: "none", border: "none" }}
            >
                <FontAwesomeIcon icon={faHeart} style={{ marginRight: "4px" }} /><span>{article.likes_num}</span>
            </button>

            <div style={{ display: "flex", borderRadius: "16px", flexDirection: "column", gap: "16px", width: "100%", padding: "16px", backgroundColor: "#F3F4F7" }}>
                <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>댓글 {article.comments_num}</h2>
                <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                    <img src={user?.profile} alt={user?.name} style={{ width: "32px", height: "32px", borderRadius: "50%" }} />
                    <input onChange={handleTextChange} type="text" style={{ width: "100%", padding: "8px", borderRadius: "16px", border: "2px solid #F3F4F7" }} />
                    <button onClick={handleCommentSubmit} style={{ fontSize: "16px", background: "none", border: "none" }}>등록</button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px", }}>
                    {comments.map((comment, index) => (
                        <Comment key={`${comment.user.name}-${index}`} {...comment} />
                    ))}
                </div>
            </div>
        </div>
    );
}


function Article({ id, comments_num, content, created_at, image1, likes_num, title, user, onClick }: ArticleType & { onClick?: () => void }) {

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
            <div
                style={{ cursor: "pointer" }}
                onClick={onClick}
            >
                <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>{title}</h1>
                <p style={{ fontSize: "15px" }}>{content}</p>
            </div>
            <img src={image1} alt={title} style={{ width: "auto", height: "500px", borderRadius: "20px", objectFit: "cover" }} />
            <div style={{ display: "flex", gap: "12px", alignItems: "end", color: "#666565" }}>
                <button
                    onClick={() => heartUp(id)}
                    style={{ fontSize: "16px", background: "none", border: "none" }}
                >
                    <FontAwesomeIcon icon={faHeart} style={{ marginRight: "4px" }} /><span>{likes_num}</span>
                </button>
                <button
                    onClick={onClick}
                    style={{ fontSize: "16px", background: "none", border: "none" }}
                >
                    <FontAwesomeIcon icon={faComment} style={{ marginRight: "4px" }} /><span>{comments_num}</span>
                </button>
                <button onClick={onClick} style={{ fontSize: "14px", cursor: "pointer", background: "none", border: "none" }}>
                    댓글더보기
                </button>
            </div>
        </div >
    )
}

function ArticleList({ articles, onArticleClick }: { articles: ArticleType[], onArticleClick: (article: ArticleType) => void }) {
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
                <Article
                    key={`${article.title}-${index}`}
                    {...article}
                    onClick={() => onArticleClick(article)}
                />
            ))}
        </div>
    );
}

export default ArticleList;

import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { heartUp } from "@/api/post";

import { CommentType } from "@/types/components";
import Comment from "@/components/Comment";
import useUserRedux from "@/hooks/useUserRedux";
import { useEffect, useState } from "react";
import { BasicSummaryRes } from "@/types/data";

export function SummaryDetail({
    post: summary,
    onClose,
}: {
    post: any;
    onClose: () => void;
}) {
    const { user, } = useUserRedux();
    const [comments, ] = useState<CommentType[]>([]);
    const [text, setText] = useState("");

    useEffect(() => {
        const handlePopState = () => {
            onClose();
        };

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, []);

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    const handleCommentSubmit = () => {
        console.log("댓글 등록", text);
        setText("");
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                gap: "24px",
                fontSize: "20px",
                width: "100%",
            }}
        >
            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    fontSize: "20px",
                    width: "100%",
                }}
            >
                {summary.user ? (
                    <img
                        src={summary.user.profile || ""}
                        alt={summary.user.name || ""}
                        style={{ width: "32px", height: "32px", borderRadius: "50%" }}
                    />
                ) : (
                    <div
                        style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            backgroundColor: "gray",
                        }}
                    />
                )}
                <span style={{ fontSize: "14px" }}>{summary.user?.name}</span>
                <span style={{ fontSize: "14px", color: "#666565" }}>
                    {new Date().getHours() - new Date(summary.created_at).getHours()} 시간
                    전
                </span>
                {summary.user.id == user?.id ? (
                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            alignItems: "center",
                            fontSize: "20px",
                            marginLeft: "auto",
                        }}
                    >
                        <button
                            onClick={() => console.log("수정")}
                            style={{
                                fontSize: "16px",
                                background: "none",
                                border: "2px gray solid",
                                borderRadius: "8px",
                                color: "gray",
                            }}
                        >
                            수정
                        </button>
                        <button
                            onClick={() => console.log("삭제")}
                            style={{
                                fontSize: "16px",
                                background: "none",
                                border: "2px #DD2033 solid",
                                borderRadius: "8px",
                                color: "#DD2033",
                            }}
                        >
                            삭제
                        </button>
                    </div>
                ) : null}
            </div>
            <div
                style={{ cursor: "pointer" }}
            // onClick={onClick}
            >
                <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>
                    {summary.title}
                </h1>
                <p style={{ fontSize: "15px" }}>{summary.content}</p>
            </div>
            <img
                src={summary.image1}
                alt={summary.title}
                style={{
                    width: "auto",
                    height: "500px",
                    borderRadius: "20px",
                    objectFit: "cover",
                }}
            />
            <button
                onClick={() => heartUp(summary.id)}
                style={{ fontSize: "16px", background: "none", border: "none" }}
            >
                <FontAwesomeIcon icon={faHeart} style={{ marginRight: "4px" }} />
                <span>{summary.likes_num}</span>
            </button>

            <div
                style={{
                    display: "flex",
                    borderRadius: "16px",
                    flexDirection: "column",
                    gap: "16px",
                    width: "100%",
                    padding: "16px",
                    backgroundColor: "#F3F4F7",
                }}
            >
                <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>
                    댓글 {summary.comments_num}
                </h2>
                <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                    <img
                        src={user?.profile || ""}
                        alt={user?.name || ""}
                        style={{ width: "32px", height: "32px", borderRadius: "50%" }}
                    />
                    <input
                        onChange={handleTextChange}
                        value={text}
                        type="text"
                        style={{
                            width: "100%",
                            padding: "8px",
                            borderRadius: "16px",
                            border: "2px solid #F3F4F7",
                        }}
                    />
                    <button
                        onClick={handleCommentSubmit}
                        style={{ fontSize: "16px", background: "none", border: "none", width: "100px" }}
                    >
                        등록
                    </button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {comments.map((comment, index) => (
                        <Comment key={`${comment.user.name}-${index}`} {...comment} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function Summary({
    id,
    title,
    free_content,
    image1,
    likes_num,
    comments_num,
    created_at,
    user,
    onClick,
}: BasicSummaryRes & { onClick: () => void }) {
    return (
        <div
            style={{
                backgroundColor: "white",
                textAlign: "left",
                fontSize: "20px",
                alignContent: "start",
                width: "100%",
                borderRadius: "20px",
                border: "2px solid #F3F4F7",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    fontSize: "20px",
                }}
            >
                {user?.profile ? (
                    <img
                        src={user.profile}
                        alt={user.name || ""}
                        style={{ width: "32px", height: "32px", borderRadius: "50%" }}
                    />
                ) : (
                    <div
                        style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            backgroundColor: "gray",
                        }}
                    />
                )}
                <div>
                    <span style={{ fontSize: "14px" }}>{user.name}</span>
                    <span style={{ fontSize: "14px", color: "#666565" }}>
                        {new Date().getHours() - new Date(created_at).getHours()} 시간 전
                    </span>
                </div>
            </div>
            {image1 && (
                <img
                    src={image1}
                    alt={title}
                    style={{
                        width: "auto",
                        height: "500px",
                        borderRadius: "20px",
                        objectFit: "cover",
                    }}
                />
            )}
            <div style={{ cursor: "pointer" }} onClick={onClick}>
                <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>{title}</h1>
                <p style={{ fontSize: "15px" }}>{free_content}</p>
            </div>
            <div
                style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "end",
                    color: "#666565",
                }}
            >
                <button
                    onClick={() => heartUp(id)}
                    style={{ fontSize: "16px", background: "none", border: "none" }}
                >
                    <FontAwesomeIcon icon={faHeart} style={{ marginRight: "4px" }} />
                    <span>{likes_num}</span>
                </button>
                <button
                    onClick={onClick}
                    style={{ fontSize: "16px", background: "none", border: "none" }}
                >
                    <FontAwesomeIcon icon={faComment} style={{ marginRight: "4px" }} />
                    <span>{comments_num}</span>
                </button>
                <button
                    onClick={onClick}
                    style={{
                        fontSize: "14px",
                        cursor: "pointer",
                        background: "none",
                        border: "none",
                    }}
                >
                    댓글더보기
                </button>
            </div>
        </div>
    );
}

function SummaryList({
    summaries,
    onSummaryClick,
}: {
    summaries: BasicSummaryRes[];
    onSummaryClick: (post: BasicSummaryRes) => void;
}) {
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
            {summaries.map((summary, index) => (
                // <Suspense
                //   key={`${post.title}-${index}`}
                //   fallback={<PostSkeleton />}
                // >
                <Summary
                    key={`${summary.title}-${index}`}
                    {...summary}
                    onClick={() => onSummaryClick(summary)}
                />
                // </Suspense>
            ))}
        </div>
    );
}

export default SummaryList;

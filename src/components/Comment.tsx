import { CommentType } from "@/types/components";

function Comment({ content, createdAt, user }: CommentType) {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        alignItems: "center",
        fontSize: "20px",
        width: "100%",
      }}
    >
      {user ? (
        <img
          src={user.profile}
          alt={user.name}
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
      <span style={{ fontSize: "14px" }}>{user?.name}</span>
      <span style={{ fontSize: "14px", color: "#666565" }}>
        {new Date().getHours() - new Date(createdAt).getHours()} 시간 전
      </span>
      <p style={{ fontSize: "15px", marginTop: "auto", marginBottom: "auto" }}>
        {content}
      </p>
      {/* <div
                style={{ cursor: "pointer" }}
            >
            </div> */}
      {/* <div style={{ display: "flex", gap: "10px", alignItems: "center", fontSize: "20px", marginLeft: "auto" }}>
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
            </div> */}
    </div>
  );
}

export default Comment;

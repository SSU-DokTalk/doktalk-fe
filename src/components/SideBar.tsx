import useUserRedux from '@/hooks/useUserRedux'
import { SidebarType } from '@/types/components'

function SideBar({
    // user,
    books,
    // follwers,
    // following
}: SidebarType) {

    const {user, } = useUserRedux()
    const follwers = user.follower_num
    const following = user.following_num

    return user && user.id ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", fontSize: "20px", width: "15%", borderRadius: "10px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center", fontSize: "20px", background: "#F3F4F7", width: "100%", padding: "16px", borderTopRightRadius: "10px", borderTopLeftRadius: "10px" }}>
                {user?.profile ? <img src={user.profile} alt={user.name || "이미지 없음"} style={{ width: "32px", height: "32px", borderRadius: "50%" }} /> : <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "gray" }} />}
                <span style={{ fontSize: "14px" }}>{user.name}</span>
            </div>
            <div style={{ border: "2px solid #F3F4F7", width: "100%", display: "flex", flexDirection: "column", gap: "20px", alignItems: "start", flexWrap: "wrap", padding: "16px", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }}>
                <div style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "14px", width: "100%", justifyContent: "center", textAlign: "center" }}>
                    <div style={{ width: "100%", }}>
                        <span style={{ color: "#666565" }}>팔로워</span><span style={{ marginLeft: "4px" }}>{follwers}</span>
                    </div>
                    <div style={{ width: "100%" }}>
                        <span style={{ color: "#666565" }}>팔로잉</span><span style={{ marginLeft: "4px" }}>{following}</span>
                    </div>
                </div>
                <div style={{ width: "100%", borderBottom: "2px solid #F3F4F7" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "start" }}>
                    <span style={{ fontSize: "16px", color: "#000080", fontWeight: "bold" }}>내 활동</span>
                    <span style={{ fontSize: "13px" }}>좋아요</span>
                    <span style={{ fontSize: "13px" }}>내 게시글</span>
                    <span style={{ fontSize: "13px" }}>내 요약</span>
                    <span style={{ fontSize: "13px" }}>찜 내역</span>
                    <span style={{ fontSize: "13px" }}>참여중인 토론방</span>
                </div>
                <div style={{ width: "100%", borderBottom: "2px solid #F3F4F7" }} />
                <div style={{ fontSize: "16px", color: "#000080", fontWeight: "bold" }}>
                    내 서재
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "2px", alignItems: "center", flexWrap: "wrap" }}>
                    {books?.map((book, index) => (
                        <div
                            key={`${book.title}-${index}`}
                            style={{
                                // backgroundColor: "#F3F4F7",
                                textAlign: "center",
                                fontSize: "16px",
                                alignContent: "center",
                            }}
                        >
                            <a
                                href={book.href}
                                style={{
                                    textDecoration: "none",
                                    color: "black",
                                }}
                            >
                                <img src={book.imgSrc} alt={book.title} style={{
                                    height: "80px",
                                }} />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ) : (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontSize: "20px",
                width: "15%",
                borderRadius: "10px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    alignItems: "center",
                    fontSize: "20px",
                    background: "#F3F4F7",
                    width: "100%",
                    padding: "16px",
                    borderTopRightRadius: "10px",
                    borderTopLeftRadius: "10px",
                }}
            >
                <div
                    style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        backgroundColor: "gray",
                    }}
                />
                <span style={{ fontSize: "14px" }}>로그인하세요</span>
            </div>
        </div>
    )
}

export default SideBar
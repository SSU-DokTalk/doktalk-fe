import { SidebarType } from '@/types/components'

function SideBar({
    user,
    books,
    follwers,
    following
}: SidebarType) {
    return (
        <div style={{ width: "20%", display: "flex", flexDirection: "column", gap: "16px", alignItems: "center", flexWrap: "wrap", }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center", fontSize: "20px", }}>
                {user?.image ? <img src={user.image} alt={user.name} style={{ width: "32px", height: "32px", borderRadius: "50%" }} /> : <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "gray" }} />}
                <span style={{ fontSize: "14px" }}>{user.name}</span>
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center", fontSize: "20px", }}>
                <span style={{ fontSize: "14px" }}>팔로워 {follwers}</span>
                <span style={{ fontSize: "14px" }}>팔로잉 {following}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", alignItems: "center", flexWrap: "wrap", }}>
                {books.map((book, index) => (
                    <div
                        key={`${book.title}-${index}`}
                        style={{
                            // backgroundColor: "#F3F4F7",
                            textAlign: "center",
                            fontSize: "20px",
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
                                height: "120px",
                            }} />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SideBar
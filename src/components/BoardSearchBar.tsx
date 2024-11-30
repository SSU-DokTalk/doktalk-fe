import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function BoardSearchBar() {
    return (
        <div
            style={{
                // height: "400px",
                backgroundColor: "white",
                textAlign: "left",
                fontSize: "20px",
                alignContent: "start",
                width: "100%",
            }}
        >
            <h1
                style={{
                    fontSize: "30px",
                    fontWeight: "bold",
                    color: "#000080",
                }}
            >
                게시글
            </h1>
            <div
                style={{
                    borderRadius: "20px",
                    border: "2px solid #F3F4F7",
                    padding: "20px",
                    // boxSizing: "border-box",
                    display: "flex",
                    marginTop: "20px",
                    alignItems: "center",
                    gap: "10px",
                }}
            >
                <div
                    style={{
                        width: "32px",
                        height: "32px",
                        marginLeft: "10px",
                        marginRight: "10px",
                        borderRadius: "50%",
                        backgroundColor: "gray",
                        // boxSizing: "border-box",
                    }}
                />
                <div
                    style={{
                        display: "flex",
                        // flexDirection: "column",
                        width: "100%",
                        position: "relative",
                        zIndex: 0,
                        // gap: "10px",
                    }}
                >
                    <input
                        type="text"
                        style={{
                            marginLeft: "auto",
                            width: "100%",
                            borderRadius: "30px",
                            height: "50px",
                            border: "none",
                            outline: "none",
                            // marginLeft: "10px",
                            paddingLeft: "20px",
                            backgroundColor: "#F3F4F7",
                        }}
                        placeholder="게시글을 작성해보세요!"
                    />
                    <button
                        style={{
                            // width: "100px",
                            padding: "0 10px",
                            height: "30px",
                            color: "white",
                            border: "none",
                            borderRadius: "10px",
                            cursor: "pointer",
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                        }}
                    >
                        <FontAwesomeIcon style={{ color: "#666565" }} icon={faPenToSquare} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BoardSearchBar
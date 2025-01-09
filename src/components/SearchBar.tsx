import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
    placeholder: string
}

function SearchBar({ placeholder }: Props) {
    return (
        <div
            style={{
                display: "flex",
                // flexDirection: "column",
                width: "100%",
                position: "relative",
                zIndex: 0,
                justifyContent: "center",
                alignItems: "center",
                // gap: "10px",
                fontSize: "20px",
                border: "2px solid #000080",
                borderRadius: "30px",
            }}
        >
            <textarea
                style={{
                    marginLeft: "auto",
                    width: "100%",
                    borderRadius: "30px",
                    height: `50px`,
                    border: "none",
                    outline: "none",
                    paddingTop: "10px",
                    animation: "grow 0.5s",
                    transition: "height 0.1s",
                    paddingLeft: "10%",
                    paddingRight: "20px",
                    backgroundColor: "white",
                    resize: "none",
                }}
                placeholder={placeholder}
            />
            <button
                style={{
                    // width: "100px",
                    padding: "0 10px",
                    height: "30px",
                    color: "white",
                    backgroundColor: "#F3F4F7",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    position: "absolute",
                    left: "10px",
                    top: "24px",
                    transform: "translateY(-50%)",
                }}
            >
                <FontAwesomeIcon
                    style={{ color: "#000080" }}
                    color="white"
                    icon={faMagnifyingGlass}
                />
            </button>
        </div>
    )
}

export default SearchBar
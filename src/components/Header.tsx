import React from 'react'

type Props = {
    text: string
}

function Header({ text }: Props) {
    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "30px",
                alignItems: "start",
            }}
        >
            <h1
                style={{
                    fontSize: "30px",
                    fontWeight: "bold",
                    color: "#000080",
                }}
            >
                {text}
            </h1>
        </div>
    )
}

export default Header
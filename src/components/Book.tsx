import { BookType } from '@/types/components'
import React from 'react'

function Book({ author, imgSrc, title, href }: BookType) {
    return (
        <div
            style={{
                // height: "200px",
                backgroundColor: "#F3F4F7",
                textAlign: "center",
                fontSize: "20px",
                alignContent: "center",
            }}
        >
            <a
                href={href}
                style={{
                    textDecoration: "none",
                    color: "black",
                }}
            >
                <img src={imgSrc} alt={title} />
                <h1
                    style={{
                        color: "#000080",
                        fontSize: "19px",
                    }}
                >
                    {title}</h1>
                <h2
                    style={{
                        color: "#666565",
                        fontSize: "15px",
                    }}
                >
                    {author}
                </h2>
            </a>
        </div>
    )
}

function BookList({ books }: { books: BookType[] }) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "16px",
                alignItems: "center",
                flexWrap: "wrap",
                width: "50%",
            }}
        >
            {books.map((book, index) => (
                <Book key={`${book.title}-${index}`} {...book} />
            ))}
        </div>
    )
}

export default BookList
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { HTMLAttributes, ReactNode, useState } from 'react'

function Carousel({
    children,
    items,
    size = 3,
    ...props
}: {
    children: ReactNode[]
    items: any[]
    size: number
} & HTMLAttributes<HTMLDivElement>) {
    const [currentIdx, setCurrentIdx] = useState<number>(0)
    return (
        <div id='carousel' {...props}>
            {items.length < size ? null : (
                <div
                    className='carousel-button left'
                    onClick={() =>
                        setCurrentIdx(
                            (prev) => (prev + items.length - 1) % items.length
                        )
                    }
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </div>
            )}
            {items.length < size ? null : (
                <div
                    className='carousel-button right'
                    onClick={() =>
                        setCurrentIdx((prev) => (prev + 1) % items.length)
                    }
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </div>
            )}
            {currentIdx + size < items.length
                ? children
                      .slice(currentIdx, currentIdx + size)
                      .map((child, idx) => {
                          return (
                              <div
                                  key={'carousel-item' + idx}
                                  className={`carousel-items`}
                              >
                                  {child}
                              </div>
                          )
                      })
                : children
                      .slice(currentIdx, currentIdx + size)
                      .concat(
                          children.slice(0, size - (items.length - currentIdx))
                      )
                      .map((child, idx) => {
                          return (
                              <div
                                  key={'carousel-item' + idx}
                                  className={`carousel-items`}
                              >
                                  {child}
                              </div>
                          )
                      })}
        </div>
    )
}

export default Carousel

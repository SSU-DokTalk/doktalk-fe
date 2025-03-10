import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HTMLAttributes, ReactNode, useState } from 'react';

function Carousel({
  children,
  size = 3,
  ...props
}: {
  children: ReactNode[];
  size: number;
} & HTMLAttributes<HTMLDivElement>) {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  return (
    <div id='carousel' {...props}>
      {children.length < size ? null : (
        <div
          className='carousel-button left'
          onClick={() =>
            setCurrentIdx(
              (prev) => (prev + children.length - 1) % children.length
            )
          }
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
      )}
      {children.length < size ? null : (
        <div
          className='carousel-button right'
          onClick={() => setCurrentIdx((prev) => (prev + 1) % children.length)}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      )}
      {currentIdx + size < children.length
        ? children.slice(currentIdx, currentIdx + size).map((child, idx) => {
            return (
              <div key={'carousel-item' + idx} className={`carousel-items`}>
                {child}
              </div>
            );
          })
        : children
            .slice(currentIdx, currentIdx + size)
            .concat(children.slice(0, size - (children.length - currentIdx)))
            .map((child, idx) => {
              return (
                <div key={'carousel-item' + idx} className={`carousel-items`}>
                  {child}
                </div>
              );
            })}
    </div>
  );
}

export default Carousel;

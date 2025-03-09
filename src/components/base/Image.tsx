import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

function Image({
  src,
  alt,
  width,
  height,
  maxWidth,
  maxHeight = '350px',
  objectFit = 'cover',
  noImageFontSize = '50px',
  noImageTextFontSize = '16px',
  onError = undefined,
  ...props
}: {
  src?: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
  maxWidth?: string | number;
  maxHeight?: string | number;
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  noImageFontSize?: string | number;
  noImageTextFontSize?: string | number;
  onError?: () => void;
} & React.HTMLProps<HTMLImageElement>) {
  const [isError, setIsError] = useState<boolean>(false);

  const inherentOnError = () => {
    setIsError(true);
    onError?.();
  };

  return isError || !src ? (
    <div
      className={'no-image ' + props.className}
      style={{
        width: width,
        height: height ?? '200px',
        border: '1px solid #e9ecef',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        ...props.style,
      }}
    >
      <FontAwesomeIcon
        icon={faTriangleExclamation}
        className='no-image-icon'
        style={{
          fontSize: noImageFontSize,
        }}
      />
      <span
        className='no-image-text'
        style={{
          fontSize: noImageTextFontSize,
        }}
      >
        No Image
      </span>
    </div>
  ) : (
    <img
      src={src}
      onError={inherentOnError}
      alt={alt}
      width={width}
      height={height}
      className={props.className}
      style={{
        objectFit: objectFit,
        maxWidth: maxWidth,
        maxHeight: maxHeight,
        ...props.style,
      }}
    />
  );
}

export default Image;

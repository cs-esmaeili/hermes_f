import React from 'react';
import Image from 'next/image';

const CustomImage = ({
  src,
  alt,
  width,
  height,
  objectFit = 'cover',
  priority = false,
  fill = false,
  ...props
}) => {
  return (
    <Image
      src={src}
      alt={alt || "basic"}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      fill={fill}
      style={{ objectFit }}
      priority={priority}
      {...props}
    />
  );
};

export default CustomImage;
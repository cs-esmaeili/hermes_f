import React from 'react';
import Image from 'next/image';

const CustomImage = ({
  src,
  alt,
  width,
  height,
  layout = 'intrinsic',
  objectFit = 'cover',
  priority = false,
  ...props
}) => {
  const globalConfig = {
    layout,
    objectFit,
    priority,
  };

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      {...globalConfig}
      {...props}
    />
  );
};

export default CustomImage;

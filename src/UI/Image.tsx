import React from 'react';

type ImageProps = {
    src: string;
    alt: string;
    className?: string;
}
const Image: React.FC<ImageProps> = ({ src, alt, className }) => {
    return (
        <img
            className={className}
            src={src}
            alt={alt}
        />
    )
}

export default Image;
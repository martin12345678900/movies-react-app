import React from 'react';

type ImageProps = {
    imageSrc: string;
    alt: string;
    className?: string;
}

const Image: React.FC<ImageProps> = ({ imageSrc, alt, className }) => {
    return (
        <img
            src={imageSrc}
            alt={alt}
            className={className}
        />
    )
}

export default Image;

import Image from 'next/image';

const ImageComponent = ({ src, alt }) => (
  <Image src={src} alt={alt} layout="responsive" loading="lazy" />
);

export default ImageComponent;
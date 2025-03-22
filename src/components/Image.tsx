interface Iprops {
  imageUrl: string;
  alt: string;
  className: string;
}

function Image({ imageUrl, alt, className }: Iprops) {
  return <img src={imageUrl} alt={alt} className={className} />;
}

export default Image;

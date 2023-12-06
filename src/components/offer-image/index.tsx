type OfferImgProps = {
  image: string;
}


function OfferImage({image} : OfferImgProps) {
  return (
    <div className="offer__image-wrapper" data-testid ='offer image'>
      <img className="offer__image" src={image} alt="Photo studio" />
    </div>
  );
}

export default OfferImage;

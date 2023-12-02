import { OfferApi } from '../../types/offer';
import classNames from 'classnames';
type OfferProps = {
  currentOffer: OfferApi;
};
function Host({ currentOffer }: OfferProps) {
  const offerAvatarWrapperClass = classNames(
    'offer__avatar-wrapper',
    'user__avatar-wrapper',
    {
      'offer__avatar-wrapper--pro ': currentOffer.host.isPro,
    }
  );

  return (
    <div className="offer__host">
      <h2 className="offer__host-title">Meet the host</h2>
      <div className="offer__host-user user">
        <div className={offerAvatarWrapperClass}>
          <img
            className="offer__avatar user__avatar"
            src={currentOffer.host.avatarUrl}
            width={74}
            height={74}
            alt="Host avatar"
          />
        </div>
        <span className="offer__user-name">{currentOffer.host.name}</span>
        {currentOffer.host.isPro && (
          <span className="offer__user-status">Pro</span>
        )}
      </div>
      <div className="offer__description">
        <p className="offer__text">{currentOffer.title}</p>
        <p className="offer__text">{currentOffer.description}</p>
      </div>
    </div>
  );
}

export default Host;

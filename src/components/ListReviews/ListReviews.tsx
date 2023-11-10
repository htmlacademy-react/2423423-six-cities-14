import { useParams } from 'react-router-dom';
import { IReviewsMock } from '../../interfaces/IReviews';

type IReviewsProps = {
  reviewsMock: IReviewsMock[];
};

function ListReviews({ reviewsMock }: IReviewsProps) {
  const offerId = useParams().id;
  const list = reviewsMock.filter(
    (review) => review.idPlace === Number(offerId)
  );
  return (
    <>
      <h2 className="reviews__title">
        Reviews &middot;
        <span className="reviews__amount">{list.length}</span>
      </h2>
      <ul className="reviews__list">
        {list.map((item) => (
          <li className="reviews__item" key={item.id}>
            <div className="reviews__user user">
              <div className="reviews__avatar-wrapper user__avatar-wrapper">
                <img
                  className="reviews__avatar user__avatar"
                  src={item.avatar}
                  width="54"
                  height="54"
                  alt="Reviews avatar"
                />
              </div>
              <span className="reviews__user-name">{item.user}</span>
            </div>
            <div className="reviews__info">
              <div className="reviews__rating rating">
                <div className="reviews__stars rating__stars">
                  <span style={{ width: item.rating }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
              </div>
              <p className="reviews__text">{item.text}</p>
              <time className="reviews__time" dateTime="2019-04-24">
                {item.time}
              </time>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListReviews;

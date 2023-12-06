import { MONTH_NAMES } from '../../consts/consts';
import { Comment } from '../../types/comment';

type ReviewProps = {
  item: Comment;
};

export default function OfferReview({ item }: ReviewProps) {
  const getRating = (rating: number) => Math.round((rating * 100) / 5);
  const inputDate = item.date;
  const date = new Date(inputDate);
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  const formattedDate = `${month} ${year}`;
  return (
    <li className="reviews__item" data-testid='review'>
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={item.user.avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{item.user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${getRating(item.rating)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{item.comment}</p>
        <time className="reviews__time" dateTime={item.date}>
          {formattedDate}
        </time>
      </div>
    </li>
  );
}

import { AuthorizationStatus, MAX_COMMENT_COUNT} from '../../consts/consts';
import { useAppSelector } from '../../types/store';
import { Comment } from '../../types/comment';
import { dateSorting } from '../../util';
import ReviewForm from '../offer-review-form';
import * as dayjs from 'dayjs';

type RewievsListProps = {
  comments: Comment[];
  id: string | undefined;
}

export default function OfferReviewList({comments, id} : RewievsListProps) {
  const getRating = (rating: number) => Math.round((rating * 100) / 5);
  const authStatus = useAppSelector((state) => state.user.authorizationStatus);
  const sortedComments = [...comments].sort(dateSorting).slice(0, MAX_COMMENT_COUNT);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot;
        <span className="reviews__amount">{comments.length}</span>
      </h2>
      <ul className="reviews__list">
        {sortedComments.map((item) => (
          <li className="reviews__item" key={item.id}>
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
                  <span style={{ width: `${getRating(item.rating)}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
              </div>
              <p className="reviews__text">{item.comment}</p>
              <time className="reviews__time" dateTime={dayjs(item.date).format('YYYY-MM-DD')}>
                {dayjs(item.date).format('MMMM YYYY')}
              </time>
            </div>
          </li>
        ))}
      </ul>

      {authStatus === AuthorizationStatus.Auth && <ReviewForm id={id}/>}
    </section>
  );
}

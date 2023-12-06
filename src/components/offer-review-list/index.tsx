import { AuthorizationStatus, MAX_COMMENT_COUNT} from '../../consts/consts';
import { useAppSelector } from '../../types/store';
import { Comment } from '../../types/comment';
import { dateSorting } from '../../util';
import ReviewForm from '../offer-review-form';
import OfferReview from '../offer-review';

type RewievsListProps = {
  comments: Comment[];
  id: string | undefined;
}

export default function OfferReviewList({comments, id} : RewievsListProps) {

  const authStatus = useAppSelector((state) => state.user.authorizationStatus);
  const sortedComments = [...comments].sort(dateSorting).slice(0, MAX_COMMENT_COUNT);

  return (
    <section className="offer__reviews reviews" data-testid ='review list'>
      <h2 className="reviews__title">
        Reviews &middot;
        <span className="reviews__amount">{comments.length}</span>
      </h2>
      <ul className="reviews__list">
        {sortedComments.map((item) => (
          <OfferReview item={item} key={item.id}/>
        ))}
      </ul>

      {authStatus === AuthorizationStatus.Auth && <ReviewForm id={id}/>}
    </section>
  );
}

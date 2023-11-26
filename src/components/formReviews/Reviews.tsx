import { RATING_NUMBERS } from '../../consts/consts';
import ListReviews from '../ListReviews/ListReviews';
import { Fragment, useState, FormEvent } from 'react';
import { fetchComments, postComment } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../types/store';

export default function Reviews() {
  const id = useAppSelector((state) => state.offers.activeOffer)?.id;
  const dispatch = useAppDispatch();

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const ratingChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setRating(+event.target.value);
  };
  const textareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setComment(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const commentData = {
      id,
      comment,
      rating,
    };
    dispatch(postComment(commentData)).unwrap().then(() => {
      setComment('');
      setRating(0);
    });
    dispatch(fetchComments(id));
    setComment(comment);
    setRating(rating);
  };

  const isSubmit = (): boolean => comment.length < 80 || rating === 0 || comment.length > 300;

  return (
    <section className="offer__reviews reviews">
      <ListReviews />

      <form
        onSubmit={handleSubmit}
        className="reviews__form form"
        action="#"
        method="post"
      >
        <label className="reviews__label form__label" htmlFor="review">
          Your review
        </label>
        <div className="reviews__rating-form form__rating">
          {RATING_NUMBERS.map((item) => (
            <Fragment key={item.id}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={item.number}
                id={`${item.number}-stars`}
                onChange={ratingChange}
                checked={rating === item.number}
                type="radio"
              />
              <label
                htmlFor={`${item.number}-stars`}
                className="reviews__rating-label form__rating-label"
                title={item.title}
              >
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>
          ))}
        </div>
        <textarea
          className="reviews__textarea form__textarea"
          id="review"
          name="review"
          placeholder="Tell how was your stay, what you like and what can be improved"
          value={comment}
          onChange={textareaChange}
        />
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set{' '}
            <span className="reviews__star">rating</span> and describe your stay
            with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button
            className="reviews__submit form__submit button"
            type="submit"
            disabled={isSubmit()}
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}

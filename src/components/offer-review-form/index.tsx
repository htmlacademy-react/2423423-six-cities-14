/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ChangeEvent, FormEvent, Fragment, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../types/store';
import { addComment } from '../../store/api-actions';
import { toast } from 'react-toastify';
import { LoadingStatus, MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH, RATING_NUMBERS } from '../../consts/consts';

type ReviewFormProps = {
  id: string | undefined;
};

export default function ReviewForm({ id }: ReviewFormProps) {
  const dispatch = useAppDispatch();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const isValid =
    comment.length >= MIN_COMMENT_LENGTH &&
    comment.length <= MAX_COMMENT_LENGTH &&
    rating;
  const commentLoadStatus = useAppSelector((state) => state.offers.isCommentLoading);
  const handleTextareaChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  };
  const formRef = useRef<HTMLFormElement>(null);

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(evt.target.value));
  };

  const handleFormSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    const userComment = {
      offerId: id,
      comment,
      rating,
    };
    dispatch(addComment(userComment))
      .unwrap()
      .then(() => {
        setComment('');
        setRating(0);
      })
      .catch(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        toast.error('Failed to send a review. Please try again');
      });
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleFormSubmit}
      ref={formRef}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div
        className="reviews__rating-form form__rating"
        key={'reviews__rating'}
      >
        {Object.entries(RATING_NUMBERS)
          .reverse()
          .map(([key, value]: string[]) => (
            <Fragment key={key}>
              <input
                key={`${key}Input`}
                onChange={handleRatingChange}
                className="form__rating-input visually-hidden"
                name="rating"
                value={key}
                checked={key === rating.toString()}
                id={`${key}-stars`}
                type="radio"
                disabled={commentLoadStatus === LoadingStatus.Pending}
              />
              <label
                key={`${key}Label`}
                htmlFor={`${key}-stars`}
                className="reviews__rating-label form__rating-label"
                title={value}
              >
                <svg
                  className="form__star-image"
                  width={37}
                  height={33}
                  key={`${key}-icon`}
                >
                  <use xlinkHref="#icon-star" />
                </svg>
              </label>
            </Fragment>
          ))}
      </div>
      <textarea
        onChange={handleTextareaChange}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        disabled={commentLoadStatus === LoadingStatus.Pending}
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
          disabled={!isValid || commentLoadStatus === LoadingStatus.Pending}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

import { useAppSelector } from '../../types/store';
import { MAX_REVIEW_COUNT } from '../../consts/consts';
import { fetchComments } from '../../store/api-actions';
import {useEffect} from 'react';
import { store } from '../../store';
import { useParams } from 'react-router-dom';

function ListReviews() {
  const params = useParams();
  const offerId = params.id;
  //отзывы
  const reviews = useAppSelector((state) => state.reviews);
  const list = reviews.slice().sort((a, b)=> (new Date(b.date)).getTime() - (new Date(a.date)).getTime()).slice(0, MAX_REVIEW_COUNT);

  useEffect(() => {
    if (offerId) {
      store.dispatch(fetchComments(offerId));
    }
  }, [offerId]);

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
                  <span style={{ width: (item.rating * 100 / 5) }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
              </div>
              <p className="reviews__text">{item.comment}</p>
              <time className="reviews__time" dateTime="2019-04-24">
                {item.date}
              </time>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListReviews;

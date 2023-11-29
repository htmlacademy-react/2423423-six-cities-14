import { createSlice } from '@reduxjs/toolkit';
import { OfferApi } from '../../types/offer';
import { LoadingStatus, NameSpace } from '../../consts/consts';
import { fetchFavorites, postFavoriteOffer } from '../api-actions';

export type FavoriteProps = {
  isFavoriteOffersLoading: LoadingStatus;
  isFavoriteOfferPosting: LoadingStatus;
  favoriteOffers: OfferApi[] | [];
  favoriteOffer: OfferApi | null;
};

const initialState: FavoriteProps = {
  isFavoriteOffersLoading: LoadingStatus.Idle,
  isFavoriteOfferPosting: LoadingStatus.Idle,
  favoriteOffers: [],
  favoriteOffer: null,
};

export const favoriteSlice = createSlice({
  name: NameSpace.Favorites,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      //все фаворитные предложения
      .addCase(fetchFavorites.pending, (state) => {
        state.isFavoriteOffersLoading = LoadingStatus.Loading;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.isFavoriteOffersLoading = LoadingStatus.Success;
      })
      .addCase(fetchFavorites.rejected, (state) => {
        state.isFavoriteOffersLoading = LoadingStatus.Error;
      })
      //добавление в избранное
      .addCase(postFavoriteOffer.pending, (state) => {
        state.isFavoriteOfferPosting = LoadingStatus.Loading;
      })
      .addCase(postFavoriteOffer.fulfilled, (state, action) => {
        state.favoriteOffer = action.payload;
        state.isFavoriteOfferPosting = LoadingStatus.Success;
        if (action.payload !== null) {
          const currentOffer = action.payload;
          if (currentOffer.isFavorite) {
            state.favoriteOffers = [...state.favoriteOffers, currentOffer];
          } else {
            state.favoriteOffers = state.favoriteOffers.filter(
              (offer) => offer.id !== currentOffer.id
            );
          }
        }
      })
      .addCase(postFavoriteOffer.rejected, (state) => {
        state.isFavoriteOfferPosting = LoadingStatus.Error;
      });
  },
});

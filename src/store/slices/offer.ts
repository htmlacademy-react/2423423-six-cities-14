import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OfferApi } from '../../types/offer';
import {
  DEFAULT_SORTING,
  LoadingStatus,
  NameSpace,
} from '../../consts/consts';
import {
  addComment,
  fetchCurrenfOffer,
  fetchFavorites,
  fetchOfferComments,
  fetchOffers,
  fetchOffersNearby,
  setIsFavorite,
} from '../api-actions';
import { Comment } from '../../types/comment';

interface IInitialState {
  offers: OfferApi[];
  currentOffer: OfferApi | null;
  currentOfferComments: Comment[];
  nearbyOffers: OfferApi[];
  favoriteOffers: OfferApi[];
  isOffersDataLoading: LoadingStatus;
  isOfferDataLoading: LoadingStatus;
  isCurrentOfferDataLoading: LoadingStatus;
  isCommentLoading: LoadingStatus;
  isFavoriteDataLoading: LoadingStatus;
  error: null | string;
  sortingOption: string;
}

const initialState: IInitialState = {
  offers: [],
  currentOffer: null,
  nearbyOffers: [],
  favoriteOffers: [],
  currentOfferComments: [],
  isOffersDataLoading: LoadingStatus.Idle,
  isOfferDataLoading: LoadingStatus.Idle,
  isCurrentOfferDataLoading: LoadingStatus.Idle,
  isCommentLoading: LoadingStatus.Idle,
  isFavoriteDataLoading: LoadingStatus.Idle,
  error: null,
  sortingOption: DEFAULT_SORTING,
};

export const offerSlice = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: { changeSortOption(state, action: PayloadAction<string>) {
    state.sortingOption = action.payload;
  },
  dropOffer(state, action: PayloadAction<null | OfferApi>) {
    state.currentOffer = action.payload;
  }},
  extraReducers(builder) {
    builder
      // ********** все предложения **********
      .addCase(fetchOffers.pending, (state) => {
        state.isOffersDataLoading = LoadingStatus.Pending;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = LoadingStatus.Fulfilled;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.isOffersDataLoading = LoadingStatus.Rejected;
      })
      // ********** текущее предложение **********
      .addCase(fetchCurrenfOffer.pending, (state) => {
        state.isCurrentOfferDataLoading = LoadingStatus.Pending;
      })
      .addCase(fetchCurrenfOffer.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
        state.isCurrentOfferDataLoading = LoadingStatus.Fulfilled;
      })
      .addCase(fetchCurrenfOffer.rejected, (state) => {
        state.error = 'Error';
        state.currentOffer = null;
        state.isCurrentOfferDataLoading = LoadingStatus.Rejected;
      })
      // ********** предложения рядом **********
      .addCase(fetchOffersNearby.pending, (state) => {
        state.isCurrentOfferDataLoading = LoadingStatus.Pending;
      })
      .addCase(fetchOffersNearby.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
        state.isCurrentOfferDataLoading = LoadingStatus.Fulfilled;
      })
      .addCase(fetchOffersNearby.rejected, (state) => {
        state.error = 'Error';
        state.nearbyOffers = [];
        state.isCurrentOfferDataLoading = LoadingStatus.Rejected;
      })
      // ********** комменты **********
      .addCase(fetchOfferComments.pending, (state) => {
        state.isCurrentOfferDataLoading = LoadingStatus.Pending;
      })
      .addCase(fetchOfferComments.fulfilled, (state, action) => {
        state.isCurrentOfferDataLoading = LoadingStatus.Fulfilled;
        state.currentOfferComments = action.payload;
      })
      .addCase(fetchOfferComments.rejected, (state) => {
        state.error = 'Error';
        state.currentOfferComments = [];
      })
      .addCase(addComment.pending, (state) => {
        state.isCommentLoading = LoadingStatus.Pending;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.isCommentLoading = LoadingStatus.Fulfilled;
        state.currentOfferComments.push(action.payload);
      })
      .addCase(addComment.rejected, (state) => {
        state.error = 'Error';
        state.isCommentLoading = LoadingStatus.Rejected;
      })
      // ********** фаворитные предложения **********
      .addCase(fetchFavorites.pending, (state) => {
        state.isFavoriteDataLoading = LoadingStatus.Pending;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.isFavoriteDataLoading = LoadingStatus.Fulfilled;
      })
      .addCase(fetchFavorites.rejected, (state) => {
        state.isFavoriteDataLoading = LoadingStatus.Rejected;
        state.error = 'Error';
      })
      .addCase(setIsFavorite.pending, (state) => {
        state.isFavoriteDataLoading = LoadingStatus.Pending;
      })
      .addCase(setIsFavorite.fulfilled, (state, action) => {
        state.isFavoriteDataLoading = LoadingStatus.Fulfilled;

        if (action.payload.isFavorite) {
          state.favoriteOffers.push(action.payload);
        } else {
          state.favoriteOffers = state.favoriteOffers.filter(
            (offer) => offer.id !== action.payload.id
          );
        }

        if (action.payload.id === state.currentOffer?.id) {
          state.currentOffer = action.payload;
        }
        state.offers = state.offers.map((offer) =>
          offer.id === action.payload.id ? action.payload : offer
        );
        state.nearbyOffers = state.nearbyOffers.map((offer) =>
          offer.id === action.payload.id ? action.payload : offer
        );
      })
      .addCase(setIsFavorite.rejected, (state) => {
        state.isFavoriteDataLoading = LoadingStatus.Rejected;
      });
  },
});

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { OfferApi } from '../../types/offer';
import { DEFAULT_LOCATION, LoadingStatus, NameSpace } from '../../consts/consts';
import { fetchOfferAction, fetchOffersAction, fetchOffersNearby } from '../api-actions';

interface IInitialState {
  city: string;
  filter: {
    id: string;
    title: string;
  };
  offers: OfferApi[];
  activeOffer: OfferApi | null;
  offerNearby: OfferApi[];
  isOffersDataLoading: LoadingStatus;
  isOfferDataLoading: LoadingStatus;
  isOffersNearbyDataLoading : LoadingStatus;
}

const initialState: IInitialState = {
  city: DEFAULT_LOCATION,
  filter: { id: 'pop', title: 'Popular' },
  offers: [],
  activeOffer: null,
  offerNearby: [],
  isOffersDataLoading: LoadingStatus.Idle,
  isOfferDataLoading:LoadingStatus.Idle,
  isOffersNearbyDataLoading:LoadingStatus.Idle,
};

export const offerSlice = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    changedCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    changedFilter: (state, action: PayloadAction<{id:string;title:string}>) => {
      state.filter = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      //все предложения
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = LoadingStatus.Loading;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = LoadingStatus.Success;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = LoadingStatus.Error;
      })
      //текущее предложение
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOfferDataLoading = LoadingStatus.Loading;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.activeOffer = action.payload;
        state.isOfferDataLoading = LoadingStatus.Success;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isOfferDataLoading = LoadingStatus.Error;
      })
      //предложения рядом
      .addCase(fetchOffersNearby.pending, (state) => {
        state.isOffersNearbyDataLoading = LoadingStatus.Loading;
      })
      .addCase(fetchOffersNearby.fulfilled, (state, action) => {
        state.offerNearby = action.payload;
        state.isOffersNearbyDataLoading = LoadingStatus.Success;
      })
      .addCase(fetchOffersNearby.rejected, (state) => {
        state.isOffersNearbyDataLoading = LoadingStatus.Error;
      });
  },
});

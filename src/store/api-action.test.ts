import { Action } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { State } from '../types/store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { commentMock, mockComments } from '../mock/comments';
import { APIRoute } from '../consts/route';
import {
  addComment,
  checkAuthAction,
  fetchCurrenfOffer,
  fetchFavorites,
  fetchOfferComments,
  fetchOffers,
  fetchOffersNearby,
  loginAction,
  logoutAction,
  setIsFavorite,
} from './api-actions';
import { requireAuthStatus } from './slices/user';
import { offersMock } from '../mock/offers';
import { offer } from '../mock/offer';
import { DEFAULT_VALUE_NULL } from '../consts/consts';
import { AuthData } from '../types/api-data';
import * as tokenStorage from '../services/token';
import { redirectToRoute } from './action';

type AppThunkDispatch = ThunkDispatch<
  State,
  ReturnType<typeof createAPI>,
  Action
>;

const extractActionsTypes = (actions: Action<string>[]) =>
  actions.map(({ type }) => type);

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  let store: ReturnType<typeof mockStoreCreator>;
  const comment = commentMock;

  beforeEach(() => {
    store = mockStoreCreator({});
  });

  it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" with thunk "checkAuthAction', async () => {
    mockAxiosAdapter.onGet(APIRoute.Login).reply(200);

    await store.dispatch(checkAuthAction());
    const actions = extractActionsTypes(store.getActions());

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      requireAuthStatus.type,
      checkAuthAction.fulfilled.type,
    ]);
  });

  describe('fetchOffers', () => {
    it('should dispatch "fetchOffersAction.pending", when server response 200', async () => {
      const mockOffers = [offersMock];

      mockAxiosAdapter.onGet(APIRoute.Offer).reply(200, mockOffers);

      await store.dispatch(fetchOffers());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOffersActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchOffers.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchOffers.pending.type,
        fetchOffers.fulfilled.type,
      ]);

      expect(fetchOffersActionFulfilled.payload).toEqual(mockOffers);
    });

    it('should dispatch "fetchOffersAction.pending", "fetchOffersAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Offer).reply(400, []);

      await store.dispatch(fetchOffers());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffers.pending.type,
        fetchOffers.rejected.type,
      ]);
    });
  });

  describe('fetchCurrenfOffer', () => {
    it('should dispatch "fetchCurrenfOffer.pending", when server response 200', async () => {
      const mockOffer = offer;

      mockAxiosAdapter
        .onGet(`${APIRoute.Offer}/${mockOffer.id}`)
        .reply(200, mockOffer);

      await store.dispatch(fetchCurrenfOffer(mockOffer.id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOfferActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchCurrenfOffer.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchCurrenfOffer.pending.type,
        fetchCurrenfOffer.fulfilled.type,
      ]);

      expect(fetchOfferActionFulfilled.payload).toEqual(mockOffer);
    });

    it('should dispatch "fetchCurrenfOffer.pending", "fetchCurrenfOffer.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Offer}/${offer.id}`).reply(400, []);

      await store.dispatch(fetchCurrenfOffer());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchCurrenfOffer.pending.type,
        fetchCurrenfOffer.rejected.type,
      ]);
    });
  });

  describe('fetchOffersNearby', () => {
    it('should dispatch "fetchOffersNearby.pending", when server response 200', async () => {
      const mockOffers = offersMock;

      mockAxiosAdapter
        .onGet(`${APIRoute.Offer}/${offer.id}/nearby`)
        .reply(200, mockOffers);

      await store.dispatch(fetchOffersNearby(offer.id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOffersNearActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchOffersNearby.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchOffersNearby.pending.type,
        fetchOffersNearby.fulfilled.type,
      ]);

      expect(fetchOffersNearActionFulfilled.payload).toEqual(mockOffers);
    });

    it('should dispatch "fetchOffersNearby.pending", "fetchOffersNearby.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Offer).reply(400, []);

      await store.dispatch(fetchOffersNearby());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersNearby.pending.type,
        fetchOffersNearby.rejected.type,
      ]);
    });
  });

  describe('fetchOfferComments', () => {
    it('should dispatch "fetchOfferComments.pending", when server response 200', async () => {
      const comments = mockComments;

      mockAxiosAdapter
        .onGet(`${APIRoute.Comments}/${offer.id}`)
        .reply(200, comments);

      await store.dispatch(fetchOfferComments(offer.id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchCommentsActionFulfilled = emittedActions[1] as ReturnType<
        typeof fetchOfferComments.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchOfferComments.pending.type,
        fetchOfferComments.fulfilled.type,
      ]);

      expect(fetchCommentsActionFulfilled.payload).toEqual(comments);
    });

    it('should dispatch "fetchOfferComments.pending", "fetchOfferComments.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${offer.id}`).reply(400, []);

      await store.dispatch(fetchOfferComments(offer.id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOfferComments.pending.type,
        fetchOfferComments.rejected.type,
      ]);
    });
  });

  describe('addComment', () => {
    it('should dispatch "addComment.pending", when server response 200', async () => {
      mockAxiosAdapter
        .onPost(`${APIRoute.Comments}/${offer.id}`, {
          comment: comment.comment,
          rating: comment.rating,
        })
        .reply(200, comment);

      await store.dispatch(
        addComment({
          offerId: offer.id,
          comment: comment.comment,
          rating: comment.rating,
        })
      );

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const sendCommentActionFulfilled = emittedActions[1] as ReturnType<
        typeof addComment.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        addComment.pending.type,
        addComment.fulfilled.type,
      ]);

      expect(sendCommentActionFulfilled.payload).toEqual(comment);
    });

    it('should dispatch "addComment.pending", "addComment.rejected" when server response 400', async () => {
      mockAxiosAdapter
        .onPost(`${APIRoute.Comments}/${offer.id}`, {
          comment: comment.comment,
          rating: comment.rating,
        })
        .reply(400, []);

      await store.dispatch(
        addComment({
          offerId: offer.id,
          comment: comment.comment,
          rating: comment.rating,
        })
      );

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        addComment.pending.type,
        addComment.rejected.type,
      ]);
    });
  });

  describe('fetchFavorites', () => {
    it('should dispatch "fetchFavorites.pending", when server response 200', async () => {
      const mockOffers = [offersMock];

      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, mockOffers);

      await store.dispatch(fetchFavorites());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOffersFavoriteActionFulfilled = emittedActions.at(
        1
      ) as ReturnType<typeof fetchFavorites.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFavorites.pending.type,
        fetchFavorites.fulfilled.type,
      ]);

      expect(fetchOffersFavoriteActionFulfilled.payload).toEqual(mockOffers);
    });

    it('should dispatch "fetchFavorites.pending", "fetchFavorites.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(400, []);

      await store.dispatch(fetchFavorites());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavorites.pending.type,
        fetchFavorites.rejected.type,
      ]);
    });
  });

  describe('setIsFavorite', () => {
    it('should dispatch "setIsFavorite.pending", when server response 201', async () => {
      mockAxiosAdapter
        .onPost(
          `${APIRoute.Favorite}/${offersMock[DEFAULT_VALUE_NULL].id}/${DEFAULT_VALUE_NULL}`
        )
        .reply(201, offersMock);

      await store.dispatch(
        setIsFavorite({
          offerId: offersMock[DEFAULT_VALUE_NULL].id,
          status: DEFAULT_VALUE_NULL,
        })
      );

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const send = emittedActions[1] as ReturnType<
        typeof setIsFavorite.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        setIsFavorite.pending.type,
        setIsFavorite.fulfilled.type,
      ]);

      expect(send.payload).toEqual(offersMock);
    });

    it('should dispatch "setIsFavorite.pending", "setIsFavorite.rejected" when server response 400', async () => {
      mockAxiosAdapter
        .onPost(`${APIRoute.Favorite}/${offer.id}/${1}`)
        .reply(400, []);

      await store.dispatch(
        setIsFavorite({ offerId: offersMock[0].id, status: 1 })
      );

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        setIsFavorite.pending.type,
        setIsFavorite.rejected.type,
      ]);
    });
  });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending", "loginAction.fulfilled", and addUserData when server response 200', async () => {
      const fakeUser: AuthData = {
        login: 'academy@academy.ru',
        password: 'aa123456',
      };
      const fakeServerReplay = { token: 'token' };

      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);

      await store.dispatch(loginAction(fakeUser));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        redirectToRoute.type,
        loginAction.fulfilled.type,
      ]);
    });

    it('should call "saveToken" once with the received token', async () => {
      const fakeUser: AuthData = {
        login: 'academy@academy.ru',
        password: 'aa123456',
      };
      const fakeServerReplay = { token: 'token' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);
      const mockSaveToken = vi.spyOn(tokenStorage, 'addToken');

      await store.dispatch(loginAction(fakeUser));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(fakeServerReplay.token);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending", "logoutAction.fulfilled" when server response 204', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('should one call "deleteToken" with "logoutAction"', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'deleteToken');

      await store.dispatch(logoutAction());

      expect(mockDropToken).toBeCalledTimes(1);
    });
  });
});

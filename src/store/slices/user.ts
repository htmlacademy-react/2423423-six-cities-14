import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../consts/consts';
import { User } from '../../types/user';
import { PostComment, Comment } from '../../types/comment';
import { fetchComments, fetchUserData, postComment } from '../api-actions';

interface IInitialState {
  authorizationStatus: AuthorizationStatus;
  userData: User | null;
  error: string | null;
  comments: Comment[] | [];
  comment: PostComment | null;
  isUserDataLoading: boolean;
  isCommentsDataLoading: boolean;
  hasLoadCommentsError: boolean;
  isCommentDataPosting: boolean;
  hasSendCommentsError: boolean;
}

const initialState: IInitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
  error: null,
  comments: [],
  comment: null,
  isUserDataLoading: false,
  isCommentsDataLoading: false,
  hasLoadCommentsError: false,
  isCommentDataPosting: false,
  hasSendCommentsError: false,
};

export const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    setAuthorizationStatus: (
      state,
      action: PayloadAction<AuthorizationStatus>
    ) => {
      state.authorizationStatus = action.payload;
    },
    addUserData: (state, action: PayloadAction<User | null>) => {
      state.userData = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      //user
      .addCase(fetchUserData.pending, (state) => {
        state.isUserDataLoading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.isUserDataLoading = false;
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.isUserDataLoading = false;
      })
      //comments in active offer
      .addCase(fetchComments.pending, (state) => {
        state.isCommentsDataLoading = true;
        state.hasLoadCommentsError = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isCommentsDataLoading = false;
        state.hasLoadCommentsError = false;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.isCommentsDataLoading = false;
        state.hasLoadCommentsError = true;
      })
      // postComment
      .addCase(postComment.pending, (state) => {
        state.isCommentDataPosting = true;
        state.hasSendCommentsError = false;
      })
      .addCase(
        postComment.fulfilled,
        (state, action: PayloadAction<PostComment | null>) => {
          state.comment = action.payload;
          state.isCommentDataPosting = false;
          state.hasSendCommentsError = false;
        }
      )
      .addCase(postComment.rejected, (state) => {
        state.isCommentDataPosting = false;
        state.hasSendCommentsError = true;
      });
  },
});
export const { setAuthorizationStatus, addUserData } = userSlice.actions;

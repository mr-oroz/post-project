import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/auth/authSlice';
import commentSilce from './features/comment/commentSlice';
import postSlice from './features/post/postSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    post: postSlice,
    comment: commentSilce
  },
})
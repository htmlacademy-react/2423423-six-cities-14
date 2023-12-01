import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../consts/route';

export const redirectToRoute = createAction<AppRoute>('redirectToRoute');

import { store } from '../store';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';

export type State = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
export const useAppDispatch = useDispatch<AppDispatch>;
export type AppDispatch = typeof store.dispatch;

import { store } from '../store';
import { useSelector, TypedUseSelectorHook } from 'react-redux';

export type State = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

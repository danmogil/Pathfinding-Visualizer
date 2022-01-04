import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import { Ref } from '../helpers/types';
import storeReducer from './storeReducer';

const store = configureStore({
  reducer: storeReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ['payload.current'],
      },
    }),
});

export async function initGrid(navRef: Ref) {
  store.dispatch({
    type: 'grid/initGridDimensions',
    payload: navRef,
  });
  return Promise.resolve().then(() =>
    store.dispatch({ type: 'grid/initCells' })
  );
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;

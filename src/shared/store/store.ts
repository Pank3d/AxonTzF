
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import productReducer from "./productSlce"

export const store = configureStore({
  reducer: {
    product: productReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
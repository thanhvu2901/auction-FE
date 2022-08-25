import { ActionReducerMapBuilder, AsyncThunk } from '@reduxjs/toolkit';
import { TState } from 'models';

export interface ThunkOption {
  state?: unknown;
  extra?: unknown;
  rejectValue: string;
  serializedErrorType?: unknown;
  pendingMeta?: unknown;
  fulfilledMeta?: unknown;
  rejectedMeta?: unknown;
}

export function addThunkBuilderCases<
  T extends TState<any>,
  R,
  P,
  O extends ThunkOption
>(builder: ActionReducerMapBuilder<T>, thunk: AsyncThunk<R, P, O>) {
  builder
    .addCase(thunk.pending, (state, action) => {
      state.errorMsg = undefined;
      state.status = 'pending';
    })
    .addCase(thunk.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'success';
    })
    .addCase(thunk.rejected, (state, action) => {
      state.errorMsg = action.payload;
      state.status = 'reject';
    });
}

import { rootReducer } from '../store';
import { expect, test } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';

test('Редьюсер должен вернуть начальное состояние при неизвестном экшене', () => {
  const store = configureStore({
    reducer: rootReducer
  });

  const initialState = store.getState();
  expect(rootReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
    initialState
  );
});

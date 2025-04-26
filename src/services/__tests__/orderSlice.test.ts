import {
  placeNewOrder,
  resetOrder,
  initialState,
  orderReducer as reducer
} from '../slices/orderSlice';
import { TOrder } from '../../utils/types';
import { expect, test, describe } from '@jest/globals';

describe('Проверка экшенов и редьюсера заказов', () => {
  test('Проверка начального состояния заказов', () => {
    //Должен вернуть начальное состояние, если передан неизвестный экшен
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });
});

describe('Обработка создания нового заказа', () => {
  test('При отправке запроса статус loading должен стать true', () => {
    const action = { type: placeNewOrder.pending.type };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.order).toBe(null);
    expect(state.error).toBeUndefined();
  });

  test('При успешном заказе должны заполниться данные заказа', () => {
    const mockOrder: TOrder = {
      _id: '643d69a5c3f7b9001cfa093c',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный био-марсианский бургер',
      createdAt: '2025-04-25T12:00:00.000Z',
      updatedAt: '2025-04-25T12:00:00.000Z',
      number: 11111
    };

    const action = {
      type: placeNewOrder.fulfilled.type,
      payload: { order: mockOrder }
    };
    const state = reducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.order).toEqual(mockOrder);
    expect(state.error).toBeUndefined();
  });

  test('При ошибке создания заказа должно сохраниться сообщение об ошибке', () => {
    const errorMessage = 'Ошибка при создании заказа';
    const action = {
      type: placeNewOrder.rejected.type,
      error: { message: errorMessage }
    };
    const state = reducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.order).toBe(null);
    expect(state.error).toBe(errorMessage);
  });
});

describe('Сброс состояния заказа', () => {
  test('Возврат начального состояния', () => {
    const previousState = {
      loading: true,
      order: {
        _id: '643d69a5c3f7b9001cfa093c',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Краторный био-марсианский бургер',
        createdAt: '2024-03-15T12:00:00.000Z',
        updatedAt: '2024-03-15T12:00:00.000Z',
        number: 12345
      },
      error: 'Error'
    };

    const state = reducer(previousState, resetOrder());

    expect(state).toEqual(initialState);
  });
});

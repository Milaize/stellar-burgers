import {
  constructorSlice,
  initialState,
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from '../slices/constructorSlice';
import { describe, expect, test } from '@jest/globals';

const mockBun = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

const mockTopping = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

describe('Проверка конструктора бургеров', () => {
  test('Проверка начального состояния конструктора', () => {
      // Проверяем, что начальное состояние конструктора соответствует ожидаемому
    const state = constructorSlice.reducer(undefined, { type: 'unknown' });
    expect(state).toEqual(initialState);
  });

  describe('Проверка функционала булочек', () => {
    test('Установка булочки в конструктор', () => {
      // Проверяем, что булочка правильно устанавливается в конструктор
      const action = setBun(mockBun);
      const state = constructorSlice.reducer(initialState, action);
      expect(state.bun).toEqual(mockBun);
    });

    test('Сброс булочки', () => {
      // Проверяем, что булочка сбрасывается, если передаем null
      const initialStateWithBun = { ...initialState, bun: mockBun };
      const action = setBun(null);
      const state = constructorSlice.reducer(initialStateWithBun, action);
      expect(state.bun).toBeNull();
    });
  });

  describe('Проверка функционала ингредиентов', () => {
    test('Добавление начинки в конструктор', () => {
      // Проверяем, что начинка добавляется в список ингредиентов
      const action = addIngredient(mockTopping);
      const state = constructorSlice.reducer(initialState, action);

      expect(state.ingredients.length).toBe(1);
      expect(state.ingredients[0]).toEqual(
        expect.objectContaining({
          ...mockTopping,
          id: expect.any(String)
        })
      );
    });

    test('Добавляем булочку как ингредиент', () => {
       // Проверяем, что если добавить булочку как ингредиент, то она окажется в поле bun, а не ingredients
      const action = addIngredient(mockBun);
      const state = constructorSlice.reducer(initialState, action);

      expect(state.bun).toEqual(
        expect.objectContaining({
          ...mockBun,
          id: expect.any(String)
        })
      );
      expect(state.ingredients.length).toBe(0);
    });
  });

  describe('Проверка функционала удаления ингредиента', () => {
    test('Удаление ингредиента по ID', () => {
       // Проверяем, что ингредиент удаляется по его ID
      const initialStateWithIngredients = {
        ...initialState,
        ingredients: [
          { ...mockTopping, id: 'unique-id-1' },
          { ...mockTopping, id: 'unique-id-2' }
        ]
      };

      const action = removeIngredient('unique-id-1');
      const state = constructorSlice.reducer(
        initialStateWithIngredients,
        action
      );

      expect(state.ingredients.length).toBe(1);
      expect(state.ingredients[0].id).toBe('unique-id-2');
    });
  });

  describe('Проверка функционала перемещения ингредиента', () => {
    test('Перемещение ингредиента вверх', () => {
       // Проверяем, что ингредиент можно переместить вверх в списке
      const initialStateWithIngredients = {
        ...initialState,
        ingredients: [
          { ...mockTopping, id: 'unique-id-1' },
          { ...mockTopping, id: 'unique-id-2' }
        ]
      };

      const action = moveIngredient({ index: 1, upwards: true });
      const state = constructorSlice.reducer(
        initialStateWithIngredients,
        action
      );

      expect(state.ingredients[0].id).toBe('unique-id-2');
      expect(state.ingredients[1].id).toBe('unique-id-1');
    });

    test('Перемещение ингредиента вниз', () => {
      // Проверяем, что ингредиент можно переместить вниз в списке
      const initialStateWithIngredients = {
        ...initialState,
        ingredients: [
          { ...mockTopping, id: 'unique-id-1' },
          { ...mockTopping, id: 'unique-id-2' }
        ]
      };

      const action = moveIngredient({ index: 0, upwards: false });
      const state = constructorSlice.reducer(
        initialStateWithIngredients,
        action
      );

      expect(state.ingredients[0].id).toBe('unique-id-2');
      expect(state.ingredients[1].id).toBe('unique-id-1');
    });
  });

  describe('Проверка функционала очистки конструктора', () => {
    test('Очистка конструктора бургеров', () => {
      // Проверяем, что при очистке конструктора все данные сбрасываются
      const initialStateWithData = {
        bun: mockBun,
        ingredients: [
          { ...mockTopping, id: 'unique-id-1' },
          { ...mockTopping, id: 'unique-id-2' }
        ]
      };

      const action = clearConstructor();
      const state = constructorSlice.reducer(initialStateWithData, action);

      expect(state).toEqual(initialState);
    });
  });
});

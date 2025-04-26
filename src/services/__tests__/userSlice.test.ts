import {
  register,
  login,
  apiGetUser,
  updateUser,
  logout,
  initialState,
  userReducer as reducer
} from '../slices/userSlice';
import { describe, expect, test, beforeEach } from '@jest/globals';
import { TUser } from '../../utils/types';

describe('Проверка экшенов и редьюсера пользователя', () => {
  let state: typeof initialState;
  const mockUser: TUser = {
    email: 'user@gmail.com',
    name: 'User'
  };

  beforeEach(() => {
    state = { ...initialState };
  });

  const createAction = (type: string, payload?: any, error?: { message: string }) => ({
    type,
    ...(payload && { payload }),
    ...(error && { error })
  });

  test('Проверка начального состояния пользователя', () => {
    const action = createAction('unknown');
    expect(reducer(undefined, action)).toEqual(initialState);
  });
});

describe('Авторизация пользователя', () => {
  let state: typeof initialState;
  const mockUser: TUser = {
    email: 'user@gmail.com',
    name: 'User'
  };

  beforeEach(() => {
    state = { ...initialState };
  });

  const createAction = (type: string, payload?: any, error?: { message: string }) => ({
    type,
    ...(payload && { payload }),
    ...(error && { error })
  });

  test('Загрузка при попытке входа', () => {
    const action = createAction(login.pending.type);
    state = reducer(state, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe('');
    expect(state.isAuthChecked).toBe(true);
  });

  test('Ошибка входа должна сохраниться', () => {
    const errorMessage = 'Ошибка загрузки';
    const action = createAction(login.rejected.type, undefined, { message: errorMessage });
    state = reducer(state, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.isAuthChecked).toBe(true);
  });

  test('Успешный вход должен сохранить данные пользователя', () => {
    const action = createAction(login.fulfilled.type, { user: mockUser });
    state = reducer(state, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('');
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
  });
});

describe('Регистрация пользователя', () => {
  let state: typeof initialState;
  const mockUser: TUser = {
    email: 'user@gmail.com',
    name: 'User'
  };

  beforeEach(() => {
    state = { ...initialState };
  });

  const createAction = (type: string, payload?: any, error?: { message: string }) => ({
    type,
    ...(payload && { payload }),
    ...(error && { error })
  });

  test('Загрузка при регистрации', () => {
    const action = createAction(register.pending.type);
    state = reducer(state, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe('');
    expect(state.isAuthChecked).toBe(true);
  });

  test('Ошибка регистрации должна сохраниться', () => {
    const errorMessage = 'Ошибка загрузки';
    const action = createAction(register.rejected.type, undefined, { message: errorMessage });
    state = reducer(state, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.isAuthChecked).toBe(true);
  });

  test('Успешная регистрация должна сохранить данные пользователя', () => {
    const action = createAction(register.fulfilled.type, { user: mockUser });
    state = reducer(state, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('');
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
  });
});

describe('Выход пользователя', () => {
  let state: typeof initialState;

  beforeEach(() => {
    state = { ...initialState };
  });

  const createAction = (type: string, payload?: any, error?: { message: string }) => ({
    type,
    ...(payload && { payload }),
    ...(error && { error })
  });

  test('Загрузка при выходе', () => {
    const action = createAction(logout.pending.type);
    state = reducer(state, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe('');
  });

  test('Успешный выход должен очистить данные пользователя', () => {
    const action = createAction(logout.fulfilled.type);
    state = reducer(state, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('');
    expect(state.user).toEqual({ email: '', name: '' });
    expect(state.isAuthChecked).toBe(false);
  });
});

describe('Обновление данных пользователя', () => {
  let state: typeof initialState;
  const mockUser: TUser = {
    email: 'user@gmail.com',
    name: 'User'
  };

  beforeEach(() => {
    state = { ...initialState };
  });

  const createAction = (type: string, payload?: any, error?: { message: string }) => ({
    type,
    ...(payload && { payload }),
    ...(error && { error })
  });

  test('Загрузка при обновлении данных', () => {
    const action = createAction(updateUser.pending.type);
    state = reducer(state, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe('');
  });

  test('Ошибка при обновлении данных', () => {
    const errorMessage = 'Ошибка загрузки';
    const action = createAction(updateUser.rejected.type, undefined, { message: errorMessage });
    state = reducer(state, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  test('Успешное обновление данных пользователя', () => {
    const action = createAction(updateUser.fulfilled.type, { user: mockUser });
    state = reducer(state, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('');
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
  });
});

describe('Получение информации о пользователе', () => {
  let state: typeof initialState;
  const mockUser: TUser = {
    email: 'user@gmail.com',
    name: 'User'
  };

  beforeEach(() => {
    state = { ...initialState };
  });

  const createAction = (type: string, payload?: any, error?: { message: string }) => ({
    type,
    ...(payload && { payload }),
    ...(error && { error })
  });

  test('Загрузка при запросе данных пользователя', () => {
    const action = createAction(apiGetUser.pending.type);
    state = reducer(state, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe('');
  });

  test('Ошибка при получении данных', () => {
    const errorMessage = 'Ошибка загрузки';
    const action = createAction(apiGetUser.rejected.type, undefined, { message: errorMessage });
    state = reducer(state, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  test('Успешное получение данных пользователя', () => {
    const action = createAction(apiGetUser.fulfilled.type, { user: mockUser });
    state = reducer(state, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('');
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
  });
});

describe('Обработка некорректных данных в экшенах', () => {
  let state: typeof initialState;

  beforeEach(() => {
    state = { ...initialState };
  });

  const createAction = (type: string, payload?: any, error?: { message: string }) => ({
    type,
    ...(payload && { payload }),
    ...(error && { error })
  });

  test('login.fulfilled без user', () => {
    const action = createAction(login.fulfilled.type, {});
    state = reducer(state, action);
    expect(state.user).toBeUndefined();
    expect(state.loading).toBe(false);
    expect(state.error).toBe('');
    expect(state.isAuthChecked).toBe(true);
  });

  test('register.fulfilled без user', () => {
    const action = createAction(register.fulfilled.type, {});
    state = reducer(state, action);
    expect(state.user).toBeUndefined();
    expect(state.loading).toBe(false);
    expect(state.error).toBe('');
    expect(state.isAuthChecked).toBe(true);
  });

  test('apiGetUser.fulfilled без user', () => {
    const action = createAction(apiGetUser.fulfilled.type, {});
    state = reducer(state, action);
    expect(state.user).toBeUndefined();
    expect(state.loading).toBe(false);
    expect(state.error).toBe('');
    expect(state.isAuthChecked).toBe(true);
  });
});

import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useCallback, useEffect } from 'react';
import { getUserOrders, listOfOrders } from '../../services/slices/ordersSlice';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const saveResult = useCallback(() => {
    dispatch(getUserOrders());
  }, [dispatch]);
  useEffect(() => {
    saveResult();
  }, [saveResult]);
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(listOfOrders);

  return <ProfileOrdersUI orders={orders} />;
};
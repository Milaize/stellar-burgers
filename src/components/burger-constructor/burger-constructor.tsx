import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import {
  clearConstructor,
  constructorSelector
} from '../../services/slices/constructorSlice';
import { useDispatch, useSelector } from '../../services/store';
import {
  placeNewOrder,
  getOrderData,
  getOrderLoad,
  resetOrder
} from '../../services/slices/orderSlice';
import { isAuthCheckedSelector } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const constructorItems = useSelector(constructorSelector.selectItems);
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const orderRequest = useSelector(getOrderLoad);
  const orderModalData = useSelector(getOrderData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!isAuthChecked) {
      return navigate('/login');
    }
    const orderData = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun._id
    ];

    dispatch(placeNewOrder(orderData));
  };

  const closeOrderModal = () => {
    dispatch(resetOrder());
    dispatch(clearConstructor());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};

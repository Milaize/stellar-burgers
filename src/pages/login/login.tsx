import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '../../components/ui/pages/login';
import { useDispatch, useSelector } from '../../services/store';
import { login } from '../../services/slices/userSlice';
import { getError } from '../../services/slices/userSlice';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const error = useSelector(getError);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <LoginUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
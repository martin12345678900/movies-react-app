import { FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../../../store';
import { handleSign } from '../../../../store/auth-slice';
import { signUser } from '../../../../services/requests';

import useForm from '../../../hooks/useForm';
import Input from '../../../../UI/Input';
import Button from '../../../../UI/Button';

import '../_auth.scss';
import { UserAuth, } from '../../../../store/auth-slice.types';
import { authThunk } from '../../../../store/auth-slice';

type LoginAuthType = {
    email: string;
    password: string;
}

function Login() {
    const [loginFormData, onInputChangeHandler] = useForm<LoginAuthType>({} as LoginAuthType);
    const dispatch = useAppDispatch();
    const history = useHistory();

    const isDisabled = loginFormData.email === undefined && loginFormData.password === undefined;

    const onLoginSubmitHandler = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        dispatch(authThunk({ user: { email: loginFormData.email, password: loginFormData.password}, endpoint: 'LOGIN'}));
    }

    return (
        <section className="Auth">
            <div className="Main">
                <div className="AuthCreate">
                    <form onSubmit={onLoginSubmitHandler}>
                        <h2 className="AuthCreate__title">SIGN UP</h2>
                        <Input
                            type="email"
                            placeholder="&#128231; YOUR EMAIL"
                            onChange={onInputChangeHandler}
                            name="email"
                            value={loginFormData.email}
                            className="AuthCreate__email"
                        />
                        <Input
                            type="password"
                            placeholder="&#128274; PASSWORD"
                            onChange={onInputChangeHandler}
                            name="password"
                            value={loginFormData.password}
                            className="AuthCreate__pass"
                        />
                        <Button
                            type="submit"
                            className="AuthCreate__btn"
                            textContent="LOG IN"
                            isDisabled={isDisabled}
                        />
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Login;

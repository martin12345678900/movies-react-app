import { FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../store';

import useForm from '../../hooks/useForm';
import Input from '../../UI/Input';
import Button from '../../UI/Button';

import { authThunk } from '../../store/auth-slice';
import Form from '../../UI/Form';

type LoginAuthType = {
    email: string;
    password: string;
}

function Login() {
    const [loginFormData, onInputChangeHandler] = useForm<LoginAuthType>({} as LoginAuthType);
    const dispatch = useAppDispatch();
    const history = useHistory();

    const isDisabled = (loginFormData.email === undefined || loginFormData.email === "") && (loginFormData.password === undefined || loginFormData.password === "");

    const onLoginSubmitHandler = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        const { email, password } = loginFormData;

        dispatch(authThunk({
            user: {
                email,
                password
            },
            endpoint: 'LOGIN'
        }));
        history.push("/");
    }

    return (
        <Form formTitle="Sign In" onSubmitHandler={onLoginSubmitHandler}>
            <Input
                type="email"
                placeholder="&#128231; YOUR EMAIL"
                onChange={onInputChangeHandler}
                name="email"
                value={loginFormData.email}
            />
            <Input
                type="password"
                placeholder="&#128274; PASSWORD"
                onChange={onInputChangeHandler}
                name="password"
                value={loginFormData.password}
            />
            <Button
                type="submit"
                textContent="LOG IN"
                disabled={isDisabled}
            />
        </Form>
    );
};

export default Login;

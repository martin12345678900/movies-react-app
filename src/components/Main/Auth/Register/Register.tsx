import { useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';

import { authThunk } from '../../../../store/auth-slice';
import { signUser } from '../../../../services/requests';

import { registerValidationSchema } from '../../../../schema/registerSchema';
import useForm from '../../../hooks/useForm';
import Input from '../../../../UI/Input';
import Button from '../../../../UI/Button';

import '../_auth.scss';
import { useAppDispatch } from '../../../../store';
import { UserAuth } from '../../../../store/auth-slice.types';

type RegisterAuthType = {
    email: string;
    password: string;
    username: string;
    repassword: string;
}

function Register() {
    const [registerFormData, onInputChangeHandler, validateSchemaHandler] = useForm<RegisterAuthType>({} as RegisterAuthType);
    const [error, setError] = useState<string | null>(null);

    const dispatch = useAppDispatch();
    const history = useHistory();


    const onRegisterSubmitHandler = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        const result: typeof registerFormData | string = await validateSchemaHandler(registerValidationSchema);

        if (typeof result !== 'object') {
            setError(result);
        } else {
            dispatch(authThunk({ user: { email: result.email, password: result.password, username: result.username}, endpoint: 'REGISTER'}));
            history.push('/');
        }
    }

    return (
        <section className="Auth">
            <div className="Main">
                <div className="AuthCreate">
                    <form onSubmit={onRegisterSubmitHandler}>
                        <h2 className="AuthCreate__title">CREATE ACCOUNT</h2>
                        {error && <div className="error">{error}</div>}
                        <Input
                            type="text"
                            placeholder="&#128273;  YOUR USERNAME"
                            onChange={onInputChangeHandler}
                            name="username"
                            value={registerFormData.username}
                            className="AuthCreate__user"
                        />
                        <Input
                            type="email"
                            placeholder="&#128231; YOUR EMAIL"
                            onChange={onInputChangeHandler}
                            name="email"
                            value={registerFormData.email}
                            className="AuthCreate__email"
                        />
                        <Input
                            type="password"
                            placeholder="&#128274; PASSWORD"
                            onChange={onInputChangeHandler}
                            name="password"
                            value={registerFormData.password}
                            className="AuthCreate__pass"
                        />
                        <Input
                            type="password"
                            placeholder="&#128275; CONFIRM PASSWORD"
                            onChange={onInputChangeHandler}
                            name="repassword"
                            value={registerFormData.repassword}
                            className="AuthCreate__pass"
                        />
                        <Button
                            type="submit"
                            className="AuthCreate__btn"
                            textContent="Create Account"
                        />
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Register;

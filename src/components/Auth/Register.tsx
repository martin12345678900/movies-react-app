import { useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';

import { authThunk } from '../../store/auth-slice';

import { registerValidationSchema } from '../../schema/registerSchema';
import useForm from '../../hooks/useForm';
import Input from '../../UI/Input';
import Button from '../../UI/Button';
import Form from '../../UI/Form';

import { useAppDispatch } from '../../store';

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
            dispatch(authThunk({
                user: {
                    email: result.email,
                    username: result.username,
                    password: result.password
                },
                endpoint: 'REGISTER'
            }));
                
            history.push('/');
        }
    }

    return (
        <Form formTitle="Create Account" onSubmitHandler={onRegisterSubmitHandler}>
            {error && <div className="error">{error}</div>}
            <Input
                type="text"
                placeholder="&#128273;  YOUR USERNAME"
                onChange={onInputChangeHandler}
                name="username"
                value={registerFormData.username}
            />
            <Input
                type="email"
                placeholder="&#128231; YOUR EMAIL"
                onChange={onInputChangeHandler}
                name="email"
                value={registerFormData.email}
            />
            <Input
                type="password"
                placeholder="&#128274; PASSWORD"
                onChange={onInputChangeHandler}
                name="password"
                value={registerFormData.password}
            />
            <Input
                type="password"
                placeholder="&#128275; CONFIRM PASSWORD"
                onChange={onInputChangeHandler}
                name="repassword"
                value={registerFormData.repassword}
            />
            <Button
                type="submit"
                textContent="Create Account"
            />
        </Form>
    );
}

export default Register;

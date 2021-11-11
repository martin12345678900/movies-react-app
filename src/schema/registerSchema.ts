import * as yup from 'yup';

export const registerValidationSchema = yup.object().shape({
    email: yup.string()
        .email('Invalid email format!')
        .max(25, 'Your email must not be longer than 25 charackters!')
        .min(10, 'Your email should be at least 10 charackters!')
        .required('Required email field!'),
    password: yup.string()
        .min(6, 'Password must be at least 6 charcakters!')
        .max(15, 'Password should not be longer than 15 charackters!')
        .matches(/[A-Za-z0-9]+/, 'Password should contain uppercase,lowercase charackters and digits!')
        .required('Required password field!'),
    repassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match!')
        .required('Required repassword field!'),
    username: yup.string()
        .matches(/[A-Z][A-Za-z0-9]+/, 'Username have to start with uppercase letter and continue with lowercase or digits!')
        .required('Required username field!')
});
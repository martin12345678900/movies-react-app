import * as yup from 'yup';

export const createValidationSchema = yup.object().shape({
    title: yup
        .string()
        .max(20, 'Title must not be longer than 20 symbols!')
        .required('Required title field!'),
    description: yup
        .string()
        .max(100, 'Description must not be longer than 100 symbols!')
        .required('Required description field!'),
    img: yup
        .string()
        .required('Required image field!'),
    price: yup
        .number()
        .required('Required price field!')
});
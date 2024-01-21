import * as yup from 'yup';

export const productFormSchema = yup.object({
    title: yup.string().required("Поле обов'язкове"),
    description: yup.string().optional(),
    amount: yup.string().optional(),
    order: yup.string().optional(),
    categoryId: yup.string().required("Поле обов'язкове"),
})

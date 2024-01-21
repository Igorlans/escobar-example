import * as yup from 'yup';

export const sectionFormSchema = yup.object({
    title: yup.string().required("Поле обов'язкове"),
    order: yup.string().optional(),
})

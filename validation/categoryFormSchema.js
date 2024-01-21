import * as yup from 'yup';

export const categoryFormSchema = yup.object({
    title: yup.string().required("Поле обов'язкове"),
    order: yup.string().optional(),
    view: yup.string().required("Поле обов'язкове"),
    sectionId: yup.string().required("Поле обов'язкове"),
})

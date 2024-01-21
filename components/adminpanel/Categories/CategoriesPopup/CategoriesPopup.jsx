import classes from '../../Products/ProductsPopup/productsPopup.module.scss';
import {useEffect} from 'react';
import {TfiClose} from "react-icons/tfi";
import Button from "@/components/UI/Button/Button";
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Input from "@/components/UI/Input/Input";
import MySelect from "@/components/UI/Select/MySelect";
import {useLoading} from "@/context/useLoading";
import {createCategory, updateCategory} from "@/components/adminpanel/Categories/requests";
import {categoryFormSchema} from "@/validation/categoryFormSchema";

const CategoriesPopup = ({category, setCategory, refreshCategories, sections, isShow, setIsShow}) => {
    const {setLoading} = useLoading()
    const methods = useForm({
        resolver: yupResolver(categoryFormSchema),
        defaultValues: {
            title: category?.title || '',
            order: category?.order ? String(category.order) : '',
            view: category?.view || 'list',
            sectionId: category?.sectionId || sections[0]?.id,
        }
    })
    const sectionOptions = sections?.map(section => ({label: section.title, value: section.id}))

    useEffect(() => {
        console.log('reset')
        console.log(category)
        if (category) {
            methods.setValue('title', category?.title)
            methods.setValue('order',  category?.order ? String(category.order) : '')
            methods.setValue('view', category?.view || 'list')
            methods.setValue('sectionId', category?.sectionId || sections[0]?.id)
        }
    }, [isShow])
    console.log(methods.watch())
    // const fileUploadHandler = (e) => {
    //     setProductPicture(e.target.files[0]);
    // }
    const handleClose = () => {
        setCategory(null);
        setIsShow(false)
        methods.reset()
    }
    const submitHandler = async (data) => {
        try {
            setLoading(true)
            // UPDATE PRODUCT
            if (category) {
                const updatedCategory = await updateCategory(data, category.id);
                refreshCategories(updatedCategory, 'update')
                handleClose()
                setLoading(false)
                return;
            }

            // CREATE PRODUCT
            const createdCategory = await createCategory(data);
            refreshCategories(createdCategory, 'create')
            setLoading(false)
            handleClose()
        } catch (e) {
            setLoading(false)
            alert(e.message)
            console.error(e.message);
        } finally {
            setLoading(false)
        }
    }

    return (
        isShow
            ?
            <div className={classes.productsPopup} onClick={handleClose}>
                <div className={classes.body} onClick={e => e.stopPropagation()}>
                    <div className={classes.header}>
                        <div className={classes.close} onClick={handleClose}>
                            <TfiClose size="1em"/>
                        </div>
                    </div>
                    <form className={classes.form} onSubmit={methods.handleSubmit(submitHandler)}>
                        <FormProvider {...methods}>
                            <Input label={'Ім\'я'} name={'title'} />
                            <Input label={'Порядок'} name={'order'} type={'number'} style={{maxWidth: 100}} />
                            <MySelect label={'Розділ'} name={'sectionId'} options={sectionOptions} />
                            <MySelect
                                label={'Вигляд'}
                                name={'view'}
                                options={[
                                    {label: 'Слайдер', value: 'list'},
                                    {label: 'Список', value: 'listing'},
                                    {label: 'Блок', value: 'block'},
                                ]}
                            />
                            <Button onClick={methods.handleSubmit(submitHandler)} style={{alignSelf: 'flex-end', marginTop: 15}} text={category ? 'Змінити категорію' : 'Створити категорію'} />
                        </FormProvider>
                    </form>

                </div>
            </div>
            : null
    );
};

export default CategoriesPopup;
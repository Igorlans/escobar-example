import classes from '../../Products/ProductsPopup/productsPopup.module.scss';
import {useEffect} from 'react';
import {TfiClose} from "react-icons/tfi";
import Button from "@/components/UI/Button/Button";
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Input from "@/components/UI/Input/Input";
import {useLoading} from "@/context/useLoading";
import {sectionFormSchema} from "@/validation/sectionFormSchema";
import {createSection, updateSection} from "@/components/adminpanel/Sections/requests";

const SectionsPopup = ({section, setSection, refreshSections, isShow, setIsShow}) => {
    const {setLoading} = useLoading()
    const methods = useForm({
        resolver: yupResolver(sectionFormSchema),
        defaultValues: {
            title: section?.title || '',
            order: section?.order ? String(section.order) : '',
        }
    })

    useEffect(() => {
        console.log('reset')
        console.log(section)
        if (section) {
            methods.setValue('title', section?.title)
            methods.setValue('order', section?.order ? String(section.order) : '')
        }
    }, [isShow])
    console.log(methods.watch())
    // const fileUploadHandler = (e) => {
    //     setProductPicture(e.target.files[0]);
    // }
    const handleClose = () => {
        setSection(null);
        setIsShow(false)
        methods.reset()
    }
    const submitHandler = async (data) => {
        try {
            setLoading(true)
            // UPDATE PRODUCT
            if (section) {
                const updatedSection = await updateSection(data, section.id);
                refreshSections(updatedSection, 'update')
                handleClose()
                setLoading(false)
                return;
            }

            // CREATE PRODUCT
            const createdSection = await createSection(data);
            refreshSections(createdSection, 'create')
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
                            <Button onClick={methods.handleSubmit(submitHandler)} style={{alignSelf: 'flex-end', marginTop: 15}} text={section ? 'Змінити розділ' : 'Створити розділ'} />
                        </FormProvider>
                    </form>

                </div>
            </div>
            : null
    );
};

export default SectionsPopup;
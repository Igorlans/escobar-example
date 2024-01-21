import classes from './productsPopup.module.scss';
import {useEffect, useState} from 'react';
import {TfiClose} from "react-icons/tfi";
import truncate from "@/utils/truncate";
import Button from "@/components/UI/Button/Button";
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {productFormSchema} from "@/validation/productFormSchema";
import Input from "@/components/UI/Input/Input";
import MySelect from "@/components/UI/Select/MySelect";
import Textarea from "@/components/UI/Textarea/Textarea";
import {createProduct, updateProduct} from "@/components/adminpanel/Products/requests";
import {useRouter} from "next/navigation";
import {useLoading} from "@/context/useLoading";
import SupabaseFileService from "@/services/SupabaseFileService";
import {v4 as uuidv4} from "uuid";
import {PHOTO_STORAGE_URL} from "@/config";
import Cropper from "@/components/UI/Cropper/Cropper";

const ProductsPopup = ({product, setProduct, refreshProducts, categories, isShow, setIsShow}) => {
    const {setLoading} = useLoading()
    const methods = useForm({
        resolver: yupResolver(productFormSchema),
        defaultValues: {
            title: product?.title || '',
            price: product?.price || '',
            amount: product?.amount || '',
            order: product?.order ? String(product.order) : '',
            description: product?.description || '',
            categoryId: product?.categoryId || categories[0]?.id,
        }
    })
    const [productPicture, setProductPicture] = useState(null);
    console.log(productPicture)
    const categoryOptions = categories?.map(cat => ({label: cat.title, value: cat.id}))

    const fileUploadHandler = (e) => {
        const file = e.target.files[0]
        console.log(file)
        setProductPicture(file);
    }

    useEffect(() => {
        console.log('reset')
        console.log(product)
        if (product) {
            methods.setValue('title', product?.title)
            methods.setValue('price', product?.price || '')
            methods.setValue('order', product?.order ? String(product.order) : '')
            methods.setValue('amount', product?.amount)
            methods.setValue('description', product?.description)
            methods.setValue('categoryId', product?.categoryId || categories[0]?.id)
        }
    }, [isShow])
    console.log(methods.watch())
    // const fileUploadHandler = (e) => {
    //     setProductPicture(e.target.files[0]);
    // }
    const handleClose = () => {
        setProduct(null);
        setProductPicture(null)
        setIsShow(false)
        methods.reset()
    }
    const submitHandler = async (data) => {
        try {
            setLoading(true)
            // UPDATE PRODUCT
            if (product) {
                let fileName;
                if (productPicture) {
                    const fileExtenstion = productPicture.type.split('/').pop();
                    fileName = `${uuidv4()}.${fileExtenstion}`
                    if (product.imageUrl) {
                        await SupabaseFileService.removeFile('images', `productImages/${product.imageName}`)
                        await SupabaseFileService.uploadFile(productPicture, 'images', productPicture.name, 'productImages')
                    } else {
                        await SupabaseFileService.uploadFile(productPicture, 'images', productPicture.name, 'productImages')
                    }
                }
                const updatedProduct = await updateProduct({...data, imageName: productPicture?.name || product.imageName || null, imageUrl:  productPicture?.name ? `${PHOTO_STORAGE_URL}/productImages/${productPicture.name}` : (product.imageUrl || null)}, product.id);
                refreshProducts(updatedProduct, 'update')
                handleClose()
                setLoading(false)
                return;
            }

            // CREATE PRODUCT
            // let fileName;
            let imageUrl;
            if (productPicture) {
                // const fileExtenstion = productPicture.type.split('/').pop();
                // fileName = `${uuidv4()}.${fileExtenstion}`
                await SupabaseFileService.uploadFile(productPicture, 'images', productPicture.name, 'productImages');
                imageUrl = `${PHOTO_STORAGE_URL}/productImages/${productPicture.name}`;
            }
            const createdProduct = await createProduct({...data, imageName: productPicture?.name, imageUrl: imageUrl});
            refreshProducts(createdProduct, 'create')
            setLoading(false)
            handleClose()
        } catch (e) {
            setLoading(false)
            alert(e.message)
            console.error(e.message);
        } finally {
            setLoading(false)
        }


        //
        // if (product) {
        //     dispatch(editProduct(body, productPicture, product._id))
        //     setIsShow(false);
        // } else {
        //     dispatch(addProduct(body, productPicture));
        //     setProductName('');
        //     setProductDescription('');
        //     setProductPrice('');
        //     setProductAmount('');
        //     setProductCategory('');
        //     setProductPicture(null);
        //     setIsShow(false);
        // }

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
                            <Input label={'Ціна'} name={'price'} type={'number'} style={{maxWidth: 100}}/>
                            <Input label={'Кількість'} name={'amount'} style={{maxWidth: 100}} />
                            <Input label={'Порядок'} name={'order'} type={'number'} style={{maxWidth: 100}} />
                            <Textarea label={'Опис'} name={'description'} />
                            <MySelect label={'Категорія'} name={'categoryId'} options={categoryOptions} />
                            <Cropper placeholder={product?.imageUrl || undefined} file={productPicture} setFile={setProductPicture} width={150} height={120}/>

                            <Button onClick={methods.handleSubmit(submitHandler)} style={{alignSelf: 'flex-end', marginTop: 15}} text={product ? 'Змінити продукт' : 'Створити продукт'} />
                        </FormProvider>
                    </form>

                </div>
            </div>
            : null
    );
};

export default ProductsPopup;
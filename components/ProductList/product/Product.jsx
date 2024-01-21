import {useState} from 'react';
import Popup from "../../Popup/Popup";
import ProductSliderItem from "@/components/ProductList/product/ProductSliderItem/ProductSliderItem";
import ProductListItem from "@/components/ProductList/product/ProductListItem/ProductListItem";
import ProductBlockItem from "@/components/ProductList/product/ProductBlockItem/ProductBlockItem";

const Product = ({product, view}) => {
    const [isShow, setIsShow] = useState(false);
    const renderProduct = () => {
        switch (view) {
            case 'listing':
                return <ProductListItem product={product} setIsShow={setIsShow} />
            case 'list':
                return <ProductSliderItem product={product} setIsShow={setIsShow} />
            case 'block':
                return <ProductBlockItem product={product} setIsShow={setIsShow} />
            default:
                return <ProductSliderItem product={product} setIsShow={setIsShow} />
    }
}

    return (
        <>
            {renderProduct()}
            <Popup isShow={isShow} setIsShow={setIsShow} product={product} />
        </>
    )
};

export default Product;
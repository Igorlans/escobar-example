import classes from "@/components/ProductList/product/product.module.scss";
import {AiOutlineInfoCircle} from "react-icons/ai";

const ProductListItem = ({product, setIsShow}) => {
    return (
        <>
            <div className={classes["product--listing"]} onClick={product.description ? () => setIsShow(true) : null}>
                <div className={classes["product-content__left"]}>
                    <h3
                        className={[classes['product-content__title'], classes['product-content__title--listing']].join(' ')}
                    >
                        {product.title}
                    </h3>
                    <div className={classes["product-content__amount"]}>{product.amount}</div>
                    {product.description
                        ?
                        <>
                            <div className={[classes['product__info'], classes['product__info--listing']].join(' ')} onClick={() => setIsShow(true)}><AiOutlineInfoCircle size="1em"/></div>
                        </>
                        : null
                    }
                </div>
                <div className={classes["product-content__right"]}>
                    <div className={classes["product-content__price"]}>{product.price ? product.price + ' грн.' : null}</div>
                </div>
            </div>
        </>
    );
};

export default ProductListItem;
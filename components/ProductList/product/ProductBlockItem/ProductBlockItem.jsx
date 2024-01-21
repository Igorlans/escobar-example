import classes from "@/components/ProductList/product/product.module.scss";
import {AiOutlineInfoCircle} from "react-icons/ai";
const ProductBlockItem = ({product, setIsShow}) => {
    return (
        <div className={classes["product--block"]} onClick={product.description ? () => setIsShow(true) : null}>
           {product.imageUrl
                ? (
                    <div className={classes["product__img"]}>
                        <img src={product.imageUrl} alt={product.title}/>
                    </div>
                )
                : <div className={classes["product__emptyimg"]}>
                    <span>{product.title}</span>
                </div>
            }
            <div className={[classes['product-content'], classes.product__content].join(' ')}>
                {product.imageUrl ? <h3 className={classes["product-content__title"]}>{product.title}</h3> : null}
                <div className={classes["product-content__bottom"]}>
                    <div className={classes["product-content__amount"]}>{product.amount}</div>
                    <div className={classes["product-content__price"]}>{product.price ? product.price + ' грн.' : null}</div>
                </div>
            </div>
            {product.description
                ?
                <>
                    <div className={classes.product__info} onClick={() => setIsShow(true)}><AiOutlineInfoCircle
                        size="1.5em"/></div>
                </>
                : null
            }
        </div>
    );
};

export default ProductBlockItem;
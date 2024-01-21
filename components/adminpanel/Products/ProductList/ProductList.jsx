import classes from './productList.module.scss';
import ProductItem from "@/components/adminpanel/Products/ProductList/ProductItem";
const ProductList = ({products,refreshProducts, setActiveProduct, setIsShow}) => {
    return (
        <div className={classes.productList}>
            {products.map(product =>
                <ProductItem  key={product.id} refreshProducts={refreshProducts} product={product} setActiveProduct={setActiveProduct} setIsShow={setIsShow}/>
            )}
        </div>
    );
};

export default ProductList;
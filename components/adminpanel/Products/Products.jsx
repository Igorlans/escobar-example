import {useMemo, useState} from "react";
import classes from './products.module.scss';
import ProductList from "@/components/adminpanel/Products/ProductList/ProductList";
import Button from "@/components/UI/Button/Button";
import ProductsPopup from "@/components/adminpanel/Products/ProductsPopup/ProductsPopup";
const Products = ({productsData, categoriesData}) => {
    const [products, setProducts] = useState(productsData)
    const [isShow, setIsShow] = useState(false);
    const [activeProduct, setActiveProduct] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const searchedProducts = useMemo(() => {
        return products?.filter(product =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product?.category?.title?.toLowerCase()?.includes(searchQuery.toLowerCase())
        )
    }, [products, searchQuery])
    const refreshProducts = (newProduct, mode) => {
        switch (mode) {
            case 'create':
                setProducts([newProduct, ...products])
                break;
            case 'update':
                const newProducts = products?.map(product => product.id === newProduct.id ? newProduct : product);
                setProducts(newProducts);
                break;
            case 'delete':
                const filteredProducts = products?.filter(product => product.id !== newProduct.id);
                setProducts(filteredProducts);
                break;
        }
    }
    return (
        <div className={classes.products}>
            <ProductsPopup
                product={activeProduct}
                setProduct={setActiveProduct}
                refreshProducts={refreshProducts}
                isShow={isShow}
                setIsShow={setIsShow}
                categories={categoriesData}
            />
            <div className={classes.header}>
                <input placeholder="Пошук..." onChange={event => setSearchQuery(event.target.value)} type="text" className={classes.search} />
                <Button style={{background: '#2a2a2a', fontSize: 12}} onClick={() => setIsShow(true)} text="Створити продукт" />
            </div>
            <ProductList refreshProducts={refreshProducts} products={searchedProducts} setActiveProduct={setActiveProduct} setIsShow={setIsShow}/>
        </div>
    );
};

export default Products;
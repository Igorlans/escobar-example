import React from 'react';
import classes from './category.module.scss';
import Product from "../product/Product";
import {switchClasses} from "./switchClasses";

const Category = ({products, category}) => {
    if (!products?.length) {
        return;
    }
    return (
        <div className={switchClasses(category.view).category}>
            <h2 className={classes.category__title}>{category.title}</h2>
            {products?.length
                ? (
                    <div className={switchClasses(category.view).products}>
                        {products?.map(product =>
                            <Product key={product.id} product={product} view={category.view}/>
                        )}
                    </div>
                )
                : <p>Не знайдено</p>
            }
        </div>
    )
}
export default Category;
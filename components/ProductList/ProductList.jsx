import React from 'react';
import Category from "./category/Category";

const ProductList = ({categories}) => {

    return (
        <div style={{paddingTop: 50}}>
            {categories?.map(category =>
            {
                return <Category key={category.id} products={category.products} category={category} />
            }
            )}
        </div>
    );
};

export default ProductList;
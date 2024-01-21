import classes from '../../Products/ProductList/productList.module.scss';
import CategoryItem from "@/components/adminpanel/Categories/CategoryList/CategoryItem";
const CategoryList = ({categories,refreshCategories, setActiveCategory, setIsShow}) => {
    return (
        <div className={classes.productList}>
            {categories.map(cat =>
                <CategoryItem  key={cat.id} refreshCategories={refreshCategories} category={cat} setActiveCategory={setActiveCategory} setIsShow={setIsShow}/>
            )}
        </div>
    );
};

export default CategoryList;
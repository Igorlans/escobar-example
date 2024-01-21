import {useMemo, useState} from "react";
import classes from '../Products/products.module.scss';
import Button from "@/components/UI/Button/Button";
import CategoriesPopup from "@/components/adminpanel/Categories/CategoriesPopup/CategoriesPopup";
import CategoryList from "@/components/adminpanel/Categories/CategoryList/CategoryList";
const Categories = ({categoriesData, sectionsData}) => {
    const [categories, setCategories] = useState(categoriesData)
    const [isShow, setIsShow] = useState(false);
    const [activeCategory, setActiveCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const searchedCategories = useMemo(() => {
        return categories?.filter(cat =>
            cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cat?.section?.title?.toLowerCase()?.includes(searchQuery.toLowerCase())

        )
    }, [categories, searchQuery])
    const refreshCategories = (newCategory, mode) => {
        switch (mode) {
            case 'create':
                setCategories([newCategory, ...categories])
                break;
            case 'update':
                const newProducts = categories?.map(cat => cat.id === newCategory.id ? newCategory : cat);
                setCategories(newProducts);
                break;
            case 'delete':
                const filteredProducts = categories?.filter(cat => cat.id !== newCategory.id);
                setCategories(filteredProducts);
                break;
        }
    }
    return (
        <div className={classes.products}>
            <CategoriesPopup
                category={activeCategory}
                setCategory={setActiveCategory}
                refreshCategories={refreshCategories}
                isShow={isShow}
                setIsShow={setIsShow}
                sections={sectionsData}
            />
            <div className={classes.header}>
                <input placeholder="Пошук..." onChange={event => setSearchQuery(event.target.value)} type="text" className={classes.search} />
                <Button style={{background: '#2a2a2a', fontSize: 12}} onClick={() => setIsShow(true)} text="Створити продукт" />
            </div>
            <CategoryList refreshCategories={refreshCategories} categories={searchedCategories} setActiveCategory={setActiveCategory} setIsShow={setIsShow}/>
        </div>
    );
};

export default Categories;
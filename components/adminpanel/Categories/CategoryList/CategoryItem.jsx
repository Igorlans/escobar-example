import classes from '../../Products/ProductList/productList.module.scss';
import {AiFillEdit} from "react-icons/ai";
import {RiDeleteBinLine} from "react-icons/ri";
import {useLoading} from "@/context/useLoading";
import {deleteCategory} from "@/components/adminpanel/Categories/requests";
const CategoryItem = ({category, refreshCategories, setActiveCategory, setIsShow}) => {
    const {setLoading} = useLoading();
    const handleEdit = () => {
        setActiveCategory(category)
        setIsShow(true)
    }

    const handleDelete = async () => {
        if (!window.confirm('Ви дійсно хочете видалити?')) return;
        try {
            setLoading(true)
            const deletedCategory = await deleteCategory(category.id);
            refreshCategories(deletedCategory, 'delete')
            setLoading(false)
        } catch (e) {
            setLoading(false)
            console.error(e.message)
            alert(e.message)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className={classes.item}>
            <div className={classes.text}>
                <div className={classes.title}>{category?.title}</div>
                <div className={classes.category}>{category?.section?.title}</div>
            </div>

            <div className={classes.btns}>
                <div className={classes.btn} onClick={handleEdit}><AiFillEdit size="1.5em" /></div>
                <div onClick={handleDelete} className={classes.btn}><RiDeleteBinLine size="1.5em" /></div>
            </div>
            {/*<ProductsPopup product={product} isShow={isShow} setIsShow={setIsShow} />*/}
        </div>
    );
};

export default CategoryItem;
import classes from '../../Products/ProductList/productList.module.scss';
import SectionItem from "@/components/adminpanel/Sections/SectionList/SectionItem";
const SectionList = ({sections,refreshSections, setActiveSection, setIsShow}) => {
    return (
        <div className={classes.productList}>
            {sections?.map(section =>
                <SectionItem  key={section.id} refreshSections={refreshSections} section={section} setActiveSection={setActiveSection} setIsShow={setIsShow}/>
            )}
        </div>
    );
};

export default SectionList;
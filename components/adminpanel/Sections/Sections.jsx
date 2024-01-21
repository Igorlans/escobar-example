import {useMemo, useState} from "react";
import classes from '../Products/products.module.scss';
import Button from "@/components/UI/Button/Button";
import SectionsPopup from "@/components/adminpanel/Sections/SectionsPopup/SectionsPopup";
import SectionList from "@/components/adminpanel/Sections/SectionList/SectionList";
const Sections = ({sectionsData}) => {
    const [sections, setSections] = useState(sectionsData)
    const [isShow, setIsShow] = useState(false);
    const [activeSection, setActiveSection] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const searchedSections = useMemo(() => {
        return sections?.filter(section => section.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }, [sections, searchQuery])
    const refreshSections = (newSection, mode) => {
        switch (mode) {
            case 'create':
                setSections([newSection, ...sections])
                break;
            case 'update':
                const newSections = sections?.map(section => section.id === newSection.id ? newSection : section);
                setSections(newSections);
                break;
            case 'delete':
                const filteredSections = sections?.filter(cat => cat.id !== newSection.id);
                setSections(filteredSections);
                break;
        }
    }
    return (
        <div className={classes.products}>
            <SectionsPopup
                section={activeSection}
                setSection={setActiveSection}
                refreshSections={refreshSections}
                isShow={isShow}
                setIsShow={setIsShow}
            />
            <div className={classes.header}>
                <input placeholder="Пошук..." onChange={event => setSearchQuery(event.target.value)} type="text" className={classes.search} />
                <Button style={{background: '#2a2a2a', fontSize: 12}} onClick={() => setIsShow(true)} text="Створити продукт" />
            </div>
            <SectionList refreshSections={refreshSections} sections={searchedSections} setActiveSection={setActiveSection} setIsShow={setIsShow}/>
        </div>
    );
};

export default Sections;
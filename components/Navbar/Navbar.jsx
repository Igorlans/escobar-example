import classes from './navbar.module.scss';
import Link from "next/link";
import {useActiveLink} from "@/components/Navbar/useActiveLink";
import {useEffect, useState} from "react";
import Skeleton from '@mui/material/Skeleton';

const activeLinkStyles = [classes.navbar__item, classes.navbar__item_active].join(' ');
const Navbar = ({sections}) => {
    const [links, setLinks] = useState(sections || null)

    useEffect(() => {
        if (!sections) {
            (async () => {
                try {
                    const response = await fetch('/api/sections', {
                        method: 'GET'
                    })
                    const json = await response.json()
                    if (!response.ok) throw new Error(json.message)
                    setLinks(json.data)
                } catch (e) {
                    console.error(e)
                    alert('ERROR')
                }
            })()
        }
    }, [])
    return (
        <div className={classes.navbar}>
            {links
                ?
                <>
                    {links?.map(section =>
                        <Link
                            className={useActiveLink(section.title_eng) ? activeLinkStyles : classes.navbar__item}
                            key={section.title_eng}
                            href={section.title_eng}
                        >
                            {section.title}
                        </Link>
                    )}
                </>
                :
                <div style={{display: 'flex', gap: 20}}>
                    <Skeleton height={30} width={100} variant={'rounded'} sx={{ bgcolor: "#323232" }} />
                    <Skeleton height={30} width={100} variant={'rounded'} sx={{ bgcolor: "#323232" }} />
                    <Skeleton height={30} width={100} variant={'rounded'} sx={{ bgcolor: "#323232" }} />
                    <Skeleton height={30} width={100} variant={'rounded'} sx={{ bgcolor: "#323232" }} />
                </div>
            }

        </div>
    );
};

export default Navbar;
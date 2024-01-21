import {usePathname} from "next/navigation";

export const useActiveLink = (href) => {
    const pathname = usePathname();
    const lastLinkPathItem = href.split('/').pop();
    const lastPathItem = pathname.split('/').pop();

    return lastLinkPathItem === lastPathItem;
}
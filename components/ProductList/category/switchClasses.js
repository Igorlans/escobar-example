import classes from "./category.module.scss";

export const switchClasses = (view) => {
    switch (view) {
        case 'list':
            return {
                products: classes['category__products'],
                category: classes.category
            }
        case 'listing':
            return {
                products: classes['category__products--list'],
                category: [classes.category, classes['category--list']].join(' ')
            }
        case 'block':
            return {
                products: classes['category__products--block'],
                category: [classes.category, classes['category--block']]
            }
        default:
            return {
                products: classes['category__products--list'],
                category: [classes.category, classes['category--list']].join(' ')
            }
    }
}
import classes from "./product.module.scss";

export const switchClasses = (view) => {
    switch (view) {
        case 'list':
            return {
                products: classes['category__products'],
                category: classes.category
            }
        case 'listing':
            return {
                product: classes['category__products--list'],
                title: [classes['product-content__title'], classes['product-content__title--listing']].join(' '),
                info: [classes['product__info'], classes['product__info--listing']].join(' ')
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
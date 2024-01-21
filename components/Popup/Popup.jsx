import React from 'react';
import classes from './popup.module.scss';
import {TfiClose} from 'react-icons/tfi'

const Popup = ({isShow, setIsShow, product}) => {

    return (
        isShow
            ? (
                <div className={classes.popup} onClick={() => setIsShow(false)}>
                    <div className={classes.popup__body} onClick={e => e.stopPropagation()}>
                        <div className={classes.popup__header}>
                            <div className={classes.popup__title}>{product.title}</div>
                            <div className={classes.popup__close} onClick={() => setIsShow(false)}>
                                <TfiClose size="1em"/>
                            </div>
                        </div>
                        <div className={classes.popup__text}>
                            {product.description}
                        </div>
                        <div className={classes.popup__info}>
                            <div className={classes.popup__amount}>{product.amount}</div>
                            <div className={classes.popup__price}>{product.price ? (product.price + ' грн.') : null}</div>
                        </div>
                    </div>
                </div>
            )
            : null
    );
};

export default Popup;
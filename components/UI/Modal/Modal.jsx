"use client"
import React from 'react';
import classes from './modal.module.scss';
import Backdrop from "../Backdrop/Backdrop.jsx";
import {AnimatePresence, motion} from "framer-motion";

const dropIn = {
    hidden: {
        y: '-100vh',
        opacity: 0,
    },
    visible: {
        y: '0',
        opacity: 1,
        transition: {
            duration: 0.1,
            type: 'spring',
            damping: 25,
            stiffness: 500,
        }
    },
    exit: {
        y: '100vh',
        opacity: 0
    }
}

const Modal = ({children, isVisible, handleClose}) => {

    return (
        <AnimatePresence
            initial={false}
            mode={'wait'}
        >
            {isVisible && (
                <Backdrop onClick={handleClose}>
                    <motion.div
                        onClick={e => e.stopPropagation()}
                        className={classes.modal}
                        variants={dropIn}
                        initial={'hidden'}
                        animate={'visible'}
                        exit={'exit'}
                    >
                        {children}
                    </motion.div>
                </Backdrop>
            )}
        </AnimatePresence>
    );
};

export default Modal;
import React from 'react';
import { motion } from 'framer-motion';
import { toastVariant } from '../variants/motionVariants';
import '../styles/Toast.css';

const Toast = ({ message }) => {
    return (
        <motion.div initial="hidden" animate="visible" exit="exit" variants={toastVariant} className='toast card-glassify'><p>{message}</p></motion.div>
    )
}

export default Toast;
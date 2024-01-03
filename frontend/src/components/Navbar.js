import React from 'react';
import '../styles/Navbar.css';
import { motion } from 'framer-motion';
import { riseUpVariant, slideInFromLeftVariant } from '../variants/motionVariants';

const Navbar = () => {
    return (
        <motion.nav key="navbar-main" id='navbar' className='primary-glassify' initial="hidden" animate="visible" exit="exit" variants={slideInFromLeftVariant}>
            <motion.span variants={riseUpVariant}>Priority&nbsp;</motion.span>
            <motion.span variants={riseUpVariant}>Pilot</motion.span>
        </motion.nav>
    )
}

export default Navbar;
import React, { useContext } from 'react';
import taskContext from '../context/taskContext';
import { motion } from 'framer-motion';
import { fadeInVariant, modalVariant } from '../variants/motionVariants';
import '../styles/ViewModal.css';

const ViewModal = () => {
    const { viewModalData, setShowViewModal } = useContext(taskContext);
    const { title, description, startDate, endDate, status } = viewModalData;
    return (
        <>
            <motion.div initial="hidden" animate="visible" exit="exit" variants={fadeInVariant} className='backdrop' onClick={() => setShowViewModal(false)}></motion.div>
            <motion.div initial="hidden" animate="visible" exit="exit" variants={modalVariant} className='view-modal secondary-glassify'>
                <h1>{title}</h1>
                <pre>{description}</pre>
                <div>
                    <span>Start Date: {new Date(startDate).toDateString()}</span>
                    <span>End Date: {new Date(endDate).toDateString()}</span>
                </div>
                <p>Current Status: {status}</p>
            </motion.div>
        </>
    )
}

export default ViewModal;
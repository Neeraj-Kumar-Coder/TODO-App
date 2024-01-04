import React, { useContext } from 'react';
import '../styles/TaskCard.css';
import { formatISOToCustomString, getRelativeDateString, getStatusColumn, getStatusColumnButtonText, isDateLessThanToday } from '../methods/helperMethods';
import taskContext from '../context/taskContext';
import { motion } from 'framer-motion';
import { riseUpVariant } from '../variants/motionVariants';

const TaskCard = ({ task, index }) => {
    const { title, startDate, endDate, status } = task;
    const { deleteATask, changeTaskStatus, triggerToast, setModalIndex, toggleEditModal, changeInitialTask, setViewModalData, setShowViewModal } = useContext(taskContext);

    const statusColumn = getStatusColumn(status)
    const buttonText = getStatusColumnButtonText(statusColumn);
    const fromDate = formatISOToCustomString(startDate);
    const relativeDate = getRelativeDateString(endDate);

    const editATask = () => {
        changeInitialTask(task)
        setModalIndex(index);
        toggleEditModal(false);
    }

    const viewHandler = () => {
        setViewModalData(task);
        setShowViewModal(true);
    }

    const deadLineExtendNotification = () => {
        triggerToast("Deadline has Passed! Please Extend Your Due Date First", 5000);
    }

    return (
        <motion.div layout className='task-card card-glassify' variants={riseUpVariant} style={{ gridColumn: statusColumn }}>
            <motion.div>
                <motion.p variants={riseUpVariant} style={{ color: statusColumn === 4 ? "lightgreen" : (isDateLessThanToday(endDate) ? "red" : "white") }}>{statusColumn === 4 ? "Achieved" : `Due: ${relativeDate}`}</motion.p>
                <div>
                    <motion.img variants={riseUpVariant} src="https://img.icons8.com/ios-glyphs/30/visible--v1.png" alt="view--v1" onClick={viewHandler} />
                    {statusColumn < 4 && <motion.img variants={riseUpVariant} src="https://img.icons8.com/ios-glyphs/30/edit--v1.png" alt="edit--v1" onClick={() => editATask()} />}
                    <motion.img variants={riseUpVariant} src="https://img.icons8.com/material-rounded/24/filled-trash.png" alt="filled-trash" onClick={() => deleteATask(task)} />
                </div>
            </motion.div>
            <motion.p variants={riseUpVariant}>{title}</motion.p>
            <div>
                <motion.span variants={riseUpVariant}>Created On: {fromDate}</motion.span>
                <motion.span variants={riseUpVariant} className='status-change-button' onClick={() => { statusColumn !== 4 && isDateLessThanToday(endDate) ? deadLineExtendNotification() : changeTaskStatus(task, status) }}>{buttonText}</motion.span>
            </div>
        </motion.div>
    )
}

export default TaskCard;
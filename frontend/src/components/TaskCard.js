import React, { useContext } from 'react';
import '../styles/TaskCard.css';
import { formatISOToCustomString, getRelativeDateString, getStatusColumn, getStatusColumnButtonText } from '../methods/helperMethods';
import taskContext from '../context/taskContext';
import { motion } from 'framer-motion';
import { riseUpVariant } from '../variants/motionVariants';

const TaskCard = ({ task, index }) => {
    const { title, startDate, endDate, status } = task;
    const { deleteATask, changeTaskStatus, setModalIndex, toggleEditModal, changeInitialTask, setViewModalData, setShowViewModal } = useContext(taskContext);

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

    return (
        <motion.div layout className='task-card card-glassify' variants={riseUpVariant} style={{ gridColumn: statusColumn }}>
            <div>
                <p>Due: {relativeDate}</p>
                <div>
                    <img src="https://img.icons8.com/ios-glyphs/30/visible--v1.png" alt="view--v1" onClick={viewHandler} />
                    <img src="https://img.icons8.com/ios-glyphs/30/edit--v1.png" alt="edit--v1" onClick={() => editATask()} />
                    <img src="https://img.icons8.com/material-rounded/24/filled-trash.png" alt="filled-trash" onClick={() => deleteATask(task)} />
                </div>
            </div>
            <p>{title}</p>
            <div>
                <span>Created On: {fromDate}</span>
                <span className='status-change-button' onClick={() => { changeTaskStatus(task, status) }}>{buttonText}</span>
            </div>
        </motion.div>
    )
}

export default TaskCard;
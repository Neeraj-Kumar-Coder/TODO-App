import React from 'react';
import '../styles/TaskCard.css';
import { formatISOToCustomString, getRelativeDateString, getStatusColumn, getStatusColumnButtonText } from '../methods/helperMethods';

const TaskCard = ({ task, methods, index }) => {
    const { title, description, startDate, endDate, status } = task;
    const { deleteATask, changeTaskStatus, changeModalIndex, toggleModal, changeInitialTask } = methods;

    const statusColumn = getStatusColumn(status)
    const buttonText = getStatusColumnButtonText(statusColumn);
    const fromDate = formatISOToCustomString(startDate);
    const relativeDate = getRelativeDateString(endDate);

    const editATask = () => {
        changeInitialTask(task)
        changeModalIndex(index);
        toggleModal(false);
    }

    return (
        <div className='task-card' style={{ gridColumn: statusColumn }}>
            <div>
                <p>{relativeDate}</p>
                <div>
                    <img src="https://img.icons8.com/ios-glyphs/30/edit--v1.png" alt="edit--v1" onClick={() => editATask()} />
                    <img src="https://img.icons8.com/material-rounded/24/filled-trash.png" alt="filled-trash" onClick={() => deleteATask(task)} />
                </div>
            </div>
            <p>{title}</p>
            <div>
                <span>Created On: {fromDate}</span>
                <span className='status-change-button' onClick={() => { changeTaskStatus(task, status) }}>{buttonText}</span>
            </div>
        </div>
    )
}

export default TaskCard;
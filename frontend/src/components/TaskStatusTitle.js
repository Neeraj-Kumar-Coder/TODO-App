import React from 'react';
import '../styles/TaskStatusTitle.css';

const TaskStatusTitle = ({ title, statusColumn }) => {
    let statusImageLink = "";
    switch (statusColumn) {
        case 2:
            statusImageLink = "https://img.icons8.com/ios/100/todo-list--v1.png"
            break;
        case 3:
            statusImageLink = "https://img.icons8.com/ios/100/in-progress.png"
            break;
        case 4:
            statusImageLink = "https://img.icons8.com/windows/512/checkmark--v1.png"
            break;
        default:
            statusImageLink = "https://img.icons8.com/ios/100/no-image.png"
            break;
    }
    return (
        <div className='task-status-title' style={{ gridColumn: statusColumn }}><span>{title}</span> <img src={statusImageLink} alt="status-icon" /></div>
    )
}

export default TaskStatusTitle;
import React from 'react'
import TaskContext from './taskContext';

const TaskState = (props) => {
    return (
        <TaskContext.Provider value={{}}>
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState;
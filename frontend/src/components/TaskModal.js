import React, { useContext, useEffect, useRef } from 'react';
import '../styles/TaskModal.css';
import taskContext from '../context/taskContext';
import { motion } from 'framer-motion';
import { fadeInVariant, modalVariant } from '../variants/motionVariants';

const TaskModal = ({ forCreation }) => {
    const { createTask, toggleEditModal, triggerToast, updateTask, modalIndex, initialTaskConfig, setInitialTaskConfig, tasks } = useContext(taskContext);
    const titleRef = useRef();
    const descriptionRef = useRef();
    const startDateRef = useRef();
    const endDateRef = useRef();

    useEffect(() => {
        titleRef.current.value = initialTaskConfig.initialTitle;
        descriptionRef.current.value = initialTaskConfig.initialDescription;
        startDateRef.current.value = initialTaskConfig.initialStartDate;
        endDateRef.current.value = initialTaskConfig.initialEndDate;
    }, []);

    const clearAndCloseModal = () => {
        setInitialTaskConfig({
            initialTitle: "",
            initialDescription: "",
            initialStartDate: "",
            initialEndDate: ""
        });
        toggleEditModal();
    }

    const createNewTask = () => {
        if (!titleRef.current.value || !descriptionRef.current.value || !startDateRef.current.value || !endDateRef.current.value) {
            triggerToast("Please fill all the fields!");
            return;
        }

        const title = titleRef.current.value;
        const description = descriptionRef.current.value;
        const startDate = new Date(startDateRef.current.value).toISOString();
        const endDate = new Date(endDateRef.current.value).toISOString();

        const task = { title, description, startDate, endDate };
        createTask(task);
        clearAndCloseModal();
    }

    const updateTheTask = () => {
        console.log(tasks, modalIndex);
        if (!titleRef.current.value || !descriptionRef.current.value || !startDateRef.current.value || !endDateRef.current.value) {
            triggerToast("Please fill all the fields!");
            return;
        }

        const title = titleRef.current.value;
        const description = descriptionRef.current.value;
        const startDate = new Date(startDateRef.current.value).toISOString();
        const endDate = new Date(endDateRef.current.value).toISOString();

        const task = { ...tasks[modalIndex], title, description, startDate, endDate };
        updateTask(modalIndex, task);
        clearAndCloseModal();
    }

    return (
        <>
            <motion.div initial="hidden" animate="visible" exit="exit" variants={fadeInVariant} className='task-modal-backdrop' onClick={clearAndCloseModal}></motion.div>
            <motion.div initial="hidden" animate="visible" exit="exit" variants={modalVariant} className='task-modal secondary-glassify'>
                <h1>{forCreation ? "Create A New Task" : "Edit Task"}</h1>

                <div className='task-modal-item-wrapper'>
                    <label htmlFor='title'>Title *</label>
                    <input ref={titleRef} type='text' name='title' id='title' />
                </div>

                <div className='task-modal-item-wrapper'>
                    <label htmlFor='description'>Description *</label>
                    <textarea ref={descriptionRef} type='text' rows="7" name='description' id='description' />
                </div>

                <div className='task-modal-item-wrapper'>
                    <label htmlFor='startDate'>Start Date *</label>
                    <input ref={startDateRef} type='date' name='startDate' id='startDate' />
                </div>

                <div className='task-modal-item-wrapper'>
                    <label htmlFor='endDate'>End Date *</label>
                    <input ref={endDateRef} type='date' name='endDate' id='endDate' />
                </div>

                <div className='task-modal-item-wrapper task-modal-button-wrapper'>
                    <span className='task-modal-button' onClick={clearAndCloseModal}>Cancel</span>
                    {
                        forCreation ?
                            <span className='task-modal-button' onClick={createNewTask}>Create</span> :
                            <span className='task-modal-button' onClick={updateTheTask}>Update</span>
                    }
                </div>
            </motion.div>
        </>
    )
}

export default TaskModal;
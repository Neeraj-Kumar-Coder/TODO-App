import React, { useEffect, useRef } from 'react';
import '../styles/TaskModal.css';

const TaskModal = ({ forCreation, methods, index, initialTitle = "", initialDescription = "", initialStartDate = "", initialEndDate = "" }) => {
    const { createTask, toggleModal, showToast, updateTask } = methods;
    const titleRef = useRef();
    const descriptionRef = useRef();
    const startDateRef = useRef();
    const endDateRef = useRef();

    useEffect(() => {
        titleRef.current.value = initialTitle;
        descriptionRef.current.value = initialDescription;
        startDateRef.current.value = initialStartDate;
        endDateRef.current.value = initialEndDate;
    }, []);

    const clearAndCloseModal = () => {
        titleRef.current.value = descriptionRef.current.value = "";
        startDateRef.current.value = endDateRef.current.value = new Date().toISOString().slice(0, 10);
        toggleModal();
    }

    const createNewTask = () => {
        if (!titleRef.current.value || !descriptionRef.current.value || !startDateRef.current.value || !endDateRef.current.value) {
            showToast("Please fill all the fields!");
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
        if (!titleRef.current.value || !descriptionRef.current.value || !startDateRef.current.value || !endDateRef.current.value) {
            showToast("Please fill all the fields!");
            return;
        }

        const title = titleRef.current.value;
        const description = descriptionRef.current.value;
        const startDate = new Date(startDateRef.current.value).toISOString();
        const endDate = new Date(endDateRef.current.value).toISOString();


        const task = { title, description, startDate, endDate };
        updateTask(index, task);
        clearAndCloseModal();
    }

    return (
        <>
            <div className='task-modal-backdrop' onClick={clearAndCloseModal}></div>
            <div className='task-modal'>
                <h1>{forCreation ? "Create A New Task" : "Edit Task"}</h1>

                <div className='task-modal-item-wrapper'>
                    <label htmlFor='title'>Title</label>
                    <input ref={titleRef} type='text' name='title' id='title' />
                </div>

                <div className='task-modal-item-wrapper'>
                    <label htmlFor='description'>Description</label>
                    <textarea ref={descriptionRef} type='text' rows="7" name='description' id='description' />
                </div>

                <div className='task-modal-item-wrapper'>
                    <label htmlFor='startDate'>Start Date</label>
                    <input ref={startDateRef} type='date' name='startDate' id='startDate' />
                </div>

                <div className='task-modal-item-wrapper'>
                    <label htmlFor='endDate'>End Date</label>
                    <input ref={endDateRef} type='date' name='endDate' id='endDate' />
                </div>

                <div className='task-modal-item-wrapper task-modal-button-wrapper'>
                    {forCreation ?
                        <span className='task-modal-button' onClick={createNewTask}>Create</span> :
                        <span className='task-modal-button' onClick={updateTheTask}>Update</span>}
                    <span className='task-modal-button' onClick={clearAndCloseModal}>Cancel</span>
                </div>
            </div>
        </>
    )
}

export default TaskModal;
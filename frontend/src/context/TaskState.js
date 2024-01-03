import React, { useState } from 'react'
import TaskContext from './taskContext';
import axios from 'axios';
import { changeStatus, removeATask } from '../methods/helperMethods';

const TaskState = (props) => {
    const [tasks, setTasks] = useState();
    const [message, setMessage] = useState("");
    const [showCreateAndEditModal, setShowCreateAndEditModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [forCreation, setForCreation] = useState(true);
    const [showLoader, setShowLoader] = useState(true);
    const [modalIndex, setModalIndex] = useState(-1);
    const [initialTaskConfig, setInitialTaskConfig] = useState({ initialTitle: "", initialDescription: "", initialStartDate: "", initialEndDate: "" });
    const [viewModalData, setViewModalData] = useState({ title: "", description: "", startDate: "", endDate: "", status: "" });

    const BASE_URL = "http://localhost:8080/api";

    const fetchAllTasks = async () => {
        const response = await axios.get(`${BASE_URL}/fetch_all_tasks`);
        return response.data;
    }

    const createNewTask = async (task) => {
        return (await axios.post(`${BASE_URL}/create_task`, task)).data;
    }

    const deleteTaskById = async (task) => {
        await axios.delete(`${BASE_URL}/delete_task/${task.id}`);
    }

    const updateTaskById = async (task) => {
        await axios.put(`${BASE_URL}/update_task/${task.id}`, task);
    }

    const changeTaskStatus = (task, currentStatus) => {
        const newTask = changeStatus(task, currentStatus);
        updateTaskById(newTask);

        const tasksCopy = JSON.parse(JSON.stringify(tasks));
        const index = tasksCopy.indexOf(task);
        tasksCopy[index] = newTask;
        setTasks(tasksCopy);
    }

    const deleteATask = (task) => {
        deleteTaskById(task);
        setTasks(removeATask(tasks, task));
    }

    const createTask = async (task) => {
        const newTask = await createNewTask(task);
        const tasksCopy = JSON.parse(JSON.stringify(tasks));
        tasksCopy.push(newTask);
        setTasks(tasksCopy);
    }

    const updateTask = (index, newTask) => {
        updateTaskById(newTask);
        const tasksCopy = JSON.parse(JSON.stringify(tasks));
        tasksCopy[index] = newTask;
        setTasks(tasksCopy);
    }

    const toggleEditModal = (creation) => {
        setForCreation(creation);
        setShowCreateAndEditModal(!showCreateAndEditModal);
    }

    const triggerToast = (msg, duration = 3000) => {
        setMessage(msg);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, duration);
    }

    const changeInitialTask = (task) => {
        setInitialTaskConfig({
            initialTitle: task.title,
            initialDescription: task.description,
            initialStartDate: task.startDate?.slice(0, 10),
            initialEndDate: task.endDate?.slice(0, 10)
        });
    }

    return (
        <TaskContext.Provider value={{
            tasks,
            setTasks,
            message,
            setMessage,
            showCreateAndEditModal,
            setShowCreateAndEditModal,
            showToast,
            setShowToast,
            forCreation,
            setForCreation,
            modalIndex,
            setModalIndex,
            initialTaskConfig,
            setInitialTaskConfig,
            fetchAllTasks,
            deleteTaskById,
            updateTaskById,
            changeTaskStatus,
            deleteATask,
            createTask,
            updateTask,
            toggleEditModal,
            triggerToast,
            changeInitialTask,
            showViewModal,
            setShowViewModal,
            viewModalData,
            setViewModalData,
            showLoader,
            setShowLoader
        }}>
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState;
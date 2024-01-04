import React, { useState } from 'react'
import TaskContext from './taskContext';
import axios from 'axios';
import { changeStatus } from '../methods/helperMethods';

const TaskState = (props) => {
    const [tasks, setTasks] = useState();
    const [message, setMessage] = useState("");
    const [showCreateAndEditModal, setShowCreateAndEditModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [forCreation, setForCreation] = useState(true);
    const [showLoader, setShowLoader] = useState(false);
    const [modalIndex, setModalIndex] = useState(-1);
    const [initialTaskConfig, setInitialTaskConfig] = useState({ initialTitle: "", initialDescription: "", initialStartDate: "", initialEndDate: "" });
    const [viewModalData, setViewModalData] = useState({ title: "", description: "", startDate: "", endDate: "", status: "" });

    const BASE_URL = "http://localhost:8080/api";

    const fetchAllTasks = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/fetch_all_tasks`);
            setShowLoader(false);
            return response.data;
        }
        catch (e) {
            throw new Error(`Unable to fetch tasks: ${e.message}`);
        }
    }

    const createNewTask = async (task) => {
        try {
            const data = (await axios.post(`${BASE_URL}/create_task`, task)).data;
            setShowLoader(false);
            return data;
        }
        catch (e) {
            throw new Error(`Unable to create task: ${e.message}`);
        }
    }

    const deleteTaskById = async (task) => {
        try {
            await axios.delete(`${BASE_URL}/delete_task/${task.id}`);
            setShowLoader(false);
        }
        catch (e) {
            throw new Error(`Unable to delete the task: ${e.message}`)
        }
    }

    const updateTaskById = async (task) => {
        try {
            await axios.put(`${BASE_URL}/update_task/${task.id}`, task);
            setShowLoader(false);
        }
        catch (e) {
            throw new Error(`Unable to update the task: ${e.message}`)
        }
    }

    const changeTaskStatus = async (task, currentStatus) => {
        const newTask = changeStatus(task, currentStatus);
        try {
            await updateTaskById(newTask);
            const tasksCopy = JSON.parse(JSON.stringify(tasks));
            const index = tasksCopy.indexOf(task);
            tasksCopy[index] = newTask;
            setTasks(tasksCopy);
        }
        catch (e) {
            console.error(e);
        }
    }

    const deleteATask = async (task) => {
        setShowLoader(true);
        try {
            await deleteTaskById(task);
            setTasks((prev) => prev.filter((current) => current !== task));
        }
        catch (e) {
            console.error(e);
        }
    }

    const createTask = async (task) => {
        try {
            const newTask = await createNewTask(task);
            const tasksCopy = JSON.parse(JSON.stringify(tasks));
            tasksCopy.push(newTask);
            setTasks(tasksCopy);
        }
        catch (e) {
            console.error(e);
        }
    }

    const updateTask = async (index, newTask) => {
        try {
            await updateTaskById(newTask);
            const tasksCopy = JSON.parse(JSON.stringify(tasks));
            tasksCopy[index] = newTask;
            setTasks(tasksCopy);
        }
        catch (e) {
            console.error(e);
        }
    }

    const configureTaskModal = (creation = true, showModal = false) => {
        setForCreation(creation);
        setShowCreateAndEditModal(showModal);
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
            configureTaskModal,
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
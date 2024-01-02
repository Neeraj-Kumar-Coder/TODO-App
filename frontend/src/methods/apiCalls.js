import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

export const fetchAllTasks = async () => {
    const response = await axios.get(`${BASE_URL}/fetch_all_tasks`);
    return response.data;
}

export const createNewTask = async (task) => {
    return (await axios.post(`${BASE_URL}/create_task`, task)).data;
}

export const deleteTaskById = async (task) => {
    await axios.delete(`${BASE_URL}/delete_task/${task.id}`);
}

export const updateTaskById = async (task) => {
    await axios.put(`${BASE_URL}/update_task/${task.id}`, task);
}
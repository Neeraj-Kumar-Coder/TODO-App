import Navbar from './components/Navbar';
import './App.css';
import './styles/Base.css';
import TaskStatusTitle from './components/TaskStatusTitle';
import TaskCard from './components/TaskCard';
import { useEffect, useState } from 'react';
import { createNewTask, deleteTaskById, fetchAllTasks, updateTaskById } from './methods/apiCalls';
import { changeStatus, removeATask } from './methods/helperMethods';
import TaskModal from './components/TaskModal';
import Toast from './components/Toast';

function App() {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [forCreation, setForCreation] = useState(true);
  const [modalIndex, setModalIndex] = useState(-1);
  const [initialTaskConfig, setInitialTaskConfig] = useState({ initialTitle: "", initialDescription: "", initialStartDate: "", initialEndDate: "" });

  useEffect(() => {
    async function init() {
      const data = await fetchAllTasks();
      setTasks(data);
    }

    init();
  }, []);

  const methods = {
    createTask: async (task) => {
      const newTask = await createNewTask(task);

      const tasksCopy = JSON.parse(JSON.stringify(tasks));
      tasksCopy.push(newTask);
      setTasks(tasksCopy);
    },

    updateTask: (index, newTask) => {
      updateTaskById(newTask);
      const tasksCopy = JSON.parse(JSON.stringify(tasks));
      tasksCopy[index] = newTask;
      setTasks(tasksCopy);
    },

    deleteATask: (task) => {
      deleteTaskById(task);
      setTasks(removeATask(tasks, task));
    },

    changeTaskStatus: (task, currentStatus) => {
      const newTask = changeStatus(task, currentStatus);
      updateTaskById(newTask);

      const tasksCopy = JSON.parse(JSON.stringify(tasks));
      const index = tasksCopy.indexOf(task);
      tasksCopy[index] = newTask;
      setTasks(tasksCopy);
    },

    toggleModal: (creation) => {
      setForCreation(creation);
      setShowModal(!showModal);
    },

    showToast: (msg, duration = 3000) => {
      setMessage(msg);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, duration);
    },

    changeModalIndex: (index) => {
      setModalIndex(index);
    },

    changeInitialTask: (task) => {
      setInitialTaskConfig({
        initialTitle: task.title,
        initialDescription: task.description,
        initialStartDate: task.startDate?.slice(0, 10),
        initialEndDate: task.endDate?.slice(0, 10)
      });
    }
  }

  return (
    <>
      <Navbar />
      {showToast && <Toast message={message} />}
      {showModal &&
        <TaskModal forCreation={forCreation}
          methods={methods}
          index={modalIndex}
          initialTitle={initialTaskConfig.initialTitle}
          initialDescription={initialTaskConfig.initialDescription}
          initialStartDate={initialTaskConfig.initialStartDate}
          initialEndDate={initialTaskConfig.initialEndDate}
        />}

      <div className='task-content'>
        <TaskStatusTitle title={"Todo"} statusColumn={2} />
        <TaskStatusTitle title={"In progress"} statusColumn={3} />
        <TaskStatusTitle title={"Completed"} statusColumn={4} />

        {
          tasks.map((task, index) => <TaskCard key={task.startDate + index} task={task} methods={methods} index={index} />)
        }
      </div>
      <span className='create-task-button' onClick={() => methods.toggleModal(true)}>+ Create Task</span>
    </>
  );
}

export default App;

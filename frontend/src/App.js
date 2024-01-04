import Navbar from './components/Navbar';
import './App.css';
import './styles/Base.css';
import TaskStatusTitle from './components/TaskStatusTitle';
import TaskCard from './components/TaskCard';
import { useContext, useEffect } from 'react';
import TaskModal from './components/TaskModal';
import Loader from './components/Loader';
import Toast from './components/Toast';
import taskContext from './context/taskContext';
import ViewModal from './components/ViewModal';
import { AnimatePresence, motion } from 'framer-motion';
import { containerVariant, fadeSlideInFromLeftVariant, sinkDownVariant } from './variants/motionVariants';

function App() {
  const { tasks, setTasks, showToast, message, showCreateAndEditModal, forCreation, modalIndex, initialTaskConfig, fetchAllTasks, toggleEditModal, showViewModal } = useContext(taskContext);

  useEffect(() => {
    async function init() {
      setTasks(await fetchAllTasks());
    }

    try {
      init();
    } catch (e) {
      console.error(e);
    }

  }, []);

  return (
    <>
      {!tasks ? <Loader /> : <>
        <Navbar />
        <AnimatePresence mode='wait'>
          {showToast && <Toast key="toast-main" message={message} />}
          {showCreateAndEditModal &&
            <TaskModal key="task-modal-main" forCreation={forCreation}
              index={modalIndex}
              initialTitle={initialTaskConfig.initialTitle}
              initialDescription={initialTaskConfig.initialDescription}
              initialStartDate={initialTaskConfig.initialStartDate}
              initialEndDate={initialTaskConfig.initialEndDate}
            />}
          {showViewModal && <ViewModal key="view-modal-main" />}
        </AnimatePresence>

        <motion.div key="task-content-main" className='task-content' initial="hidden" animate="visible" exit="exit" variants={containerVariant}>
          <motion.h1 variants={sinkDownVariant} className='task-area-title secondary-glassify'>Track Your Project Progress Here</motion.h1>

          <TaskStatusTitle title={"Todo"} statusColumn={2} />
          <TaskStatusTitle title={"In progress"} statusColumn={3} />
          <TaskStatusTitle title={"Completed"} statusColumn={4} />

          <AnimatePresence>
            {
              tasks?.map((task, index) => <TaskCard key={task.id} task={task} index={index} />)
            }
          </AnimatePresence>

          <motion.span key="create-task-button-main" className='create-task-button secondary-glassify' variants={fadeSlideInFromLeftVariant} onClick={() => toggleEditModal(true)}>+ Create Task</motion.span>
        </motion.div>
      </>}
    </>
  );
}

export default App;

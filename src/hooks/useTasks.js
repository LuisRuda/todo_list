import { useEffect, useState } from 'react';

import {
  getTasks,
  saveTask,
  ToggleTask,
  updateTask,
  deleteTask,
} from '../services/Tasks';

const useEntries = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function loadTasks() {
      const data = await getTasks();
      setTasks(data);
    }

    loadTasks();
  }, []);

  return [tasks, saveTask, ToggleTask, updateTask, deleteTask];
};

export default useEntries;

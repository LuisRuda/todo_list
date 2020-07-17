import { useEffect, useState } from 'react';

import {
  getTasks,
  saveTask,
  ToggleTask,
  updateTask,
  deleteTask,
} from '../services/Tasks';

const useEntries = (refresh = false) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function loadTasks() {
      const data = await getTasks();
      setTasks(data);
    }

    loadTasks();
  }, [refresh]);

  return [tasks, saveTask, ToggleTask, updateTask, deleteTask];
};

export default useEntries;

export function handleNewTask(task) {
  return {
    type: '@task/HANDLE_NEW_TASK',
    payload: { task },
  };
}

export function handleRemoveTask(taskId) {
  return {
    type: '@task/HANDLE_REMOVE_TASK',
    payload: { taskId },
  };
}

export function handleCheckTask(taskId) {
  return {
    type: '@task/HANDLE_CHECK_TASK',
    payload: { taskId },
  };
}

export function handleUpdateTask(taskId, body) {
  return {
    type: '@task/HANDLE_UPDATE_TASK',
    payload: { taskId, body },
  };
}

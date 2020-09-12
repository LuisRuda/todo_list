import produce from 'immer';

const INITIAL_STATE = {
  tasks: [],
};

export default function Task(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@task/HANDLE_NEW_TASK': {
        const { task } = action.payload;

        draft.tasks.unshift(task);
        break;
      }
      case '@task/HANDLE_REMOVE_TASK': {
        const { taskId } = action.payload;

        const index = draft.tasks.findIndex((task) => task.id === taskId);

        if (index !== -1) draft.tasks.splice(index, 1);
        break;
      }
      case '@task/HANDLE_CHECK_TASK': {
        const { taskId } = action.payload;

        const index = draft.tasks.findIndex((task) => task.id === taskId);

        if (index !== -1) draft.tasks[index].done = !draft.tasks[index].done;
        break;
      }
      case '@task/HANDLE_UPDATE_TASK': {
        const { taskId, body } = action.payload;

        const index = draft.tasks.findIndex((task) => task.id === taskId);

        if (index !== -1) draft.tasks[index].body = body;
        break;
      }
      default:
    }
  });
}

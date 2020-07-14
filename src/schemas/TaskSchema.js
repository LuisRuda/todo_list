const TaskSchema = {
  name: 'Task',
  primaryKey: 'id',
  properties: {
    id: 'string',
    description: 'string',
    completed: 'bool',
    createdAt: 'date',
  },
};

export default TaskSchema;

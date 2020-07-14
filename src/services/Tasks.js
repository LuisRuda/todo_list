import { v4 as uuidv4 } from 'uuid';

import { getRealm } from '../config/RealmDB';

export const getTasks = async () => {
  const realm = await getRealm();

  const tasks = realm.objects('Task').sorted('createdAt', true);

  return tasks;
};

export const saveTask = async (value) => {
  const realm = await getRealm();
  let data = {};

  try {
    realm.write(() => {
      data = {
        id: value.id || uuidv4(),
        description: value.description,
        completed: value.completed,
        createdAt: new Date(),
      };

      realm.create('Task', data, true);
    });
  } catch (err) {
    console.log('Erro ao salvar nova tarefa');
  }

  return data;
};

export const ToggleTask = async (taskId, completed) => {
  const realm = await getRealm();

  try {
    realm.write(() => {
      realm.create('Task', { id: taskId, completed }, 'modified');
    });
  } catch (err) {
    console.log('Erro ao editar esta tarefa');
  }
};

export const updateTask = async (taskId, text) => {
  const realm = await getRealm();

  try {
    realm.write(() => {
      realm.create('Task', { id: taskId, description: text }, 'modified');
    });
  } catch (err) {
    console.log('Erro ao editar esta tarefa');
  }
};

export const deleteTask = async (task) => {
  const realm = await getRealm();

  try {
    realm.write(() => {
      realm.delete(task);
    });
  } catch (err) {
    console.log('Erro ao excluir esta tarefa');
  }
};

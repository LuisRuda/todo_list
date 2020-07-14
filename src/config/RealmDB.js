import Realm from 'realm';

import TaskSchema from '../schemas/TaskSchema';

export const getRealm = async () => {
  const realm = await Realm.open({
    schema: [TaskSchema],
    schemaVersion: 1,
  });

  return realm;
};

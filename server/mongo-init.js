print('##################################');

db = db.getSiblingDB('taskmanager');
db.createUser({
  user: 'admin',
  pwd: 'admin',
  roles: [
    {
      role: 'readWrite',
      db: 'taskmanager',
    },
  ],
});

import User from './models/userModel.js';
import Group from './models/groupModel.js';


const insertInitialUserData = async () => {

  const userData = [
    {
      email: 'ismael.academy@gmail.com',
      password: '$2b$10$tXrqo7VdSPCLAsIUhrVsYejYeMt9FLo9J4OchgCKwuDvpeDK6Xf1q', //pass: ismael123
      name: 'Ismael',
      role: ['musician']
    }, 
    {
      email: 'laura@hotmail.com',
      password: '$2b$10$tXrqo7VdSPCLAsIUhrVsYejYeMt9FLo9J4OchgCKwuDvpeDK6Xf1q', //pass: ismael123
      name: 'Laura',
      role: ['venue']
    },
    {
      email: 'maria@hotmail.com',
      password: '$2b$10$tXrqo7VdSPCLAsIUhrVsYejYeMt9FLo9J4OchgCKwuDvpeDK6Xf1q', //pass: ismael123
      name: 'Maria',
      surname: 'kale',
      role: ['musician']
    },
    {
      email: 'mod@hotmail.com',
      password: '$2b$10$tXrqo7VdSPCLAsIUhrVsYejYeMt9FLo9J4OchgCKwuDvpeDK6Xf1q', //pass: ismael123
      name: 'John',
      role: ['venue']
    },
    {
      email: 'admin@hotmail.com',
      password: '$2b$10$tXrqo7VdSPCLAsIUhrVsYejYeMt9FLo9J4OchgCKwuDvpeDK6Xf1q', //pass: ismael123
      name: 'Admin',
      role: ['admin']
    }
  ];
  // Insertar datos con opción ignoreDuplicates
  // Para actualizar todas las filas: updateOnDuplicate: Object.keys(User.rawAttributes)
  await User.bulkCreate(userData, { ignoreDuplicates: true });
  
  const groupData = [
    { name: 'Rock Band', id_user: 1 },
    { name: 'Jazz Ensemble', id_user: 2 },
    { name: 'Folk Band', id_user: 3 },  
  ];
  // Insertar datos con opción ignoreDuplicates
  await Group.bulkCreate(groupData, { ignoreDuplicates: true });
}

export { insertInitialUserData };

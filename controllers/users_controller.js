const yup = require('yup');
const fs = require('fs');
const path = require('path');
const users = require('../date/users.json');

const dateFolderPath = path.join('.', 'date');
const filePath = path.join(dateFolderPath, 'users.json');

let newUserList = users;

function getUsers() {
  // тут перевірка на ендпоінт не потрібна була, бо ти ж сам руками вішаєш
  // цю функцію на той url - він завжди буде таким :)
  return {
    status: 200,
    message: users, // краще повертати не строкою, а як раз джсоном
  };
}

async function getUserById(id) {
  const idCheck = yup.number().min(0).integer();

  try {
    const userId = await idCheck.validate(id);
    const foundUser = newUserList.find((item) => item.userId === userId);
    if (foundUser) {
      return {
        status: 200,
        message: foundUser,
      };
    } else {
      return {
        status: 404,
        message: 'Not found user',
      };
    }
  } catch(err) {
    return {
      status: 400,
      message: 'Error. The id must be an integer.',
    }
  }
}

async function createUser(newUser) {
  const userCheck = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
  });

  try {
    await userCheck.validate(newUser, { abortEarly: false });

    let maxId = Math.max(
      ...newUserList.map((user) => user.userId)
    );

    newUser.userId = maxId + 1;
    newUserList.push(newUser);

    console.log(newUserList);
    return {
      status: 201, // краще 201, бо це як раз статус CREATED, а 200 це просто ОК
      message: newUser, // треба повернути створеного юзера з його новим айді!
    };
  } catch (error) {
    return {
      status: 400,
      message: error.errors.join(', '),
    };
  }
}

async function deleteUser(id) {
  // в нас вже є вся логіка пошуку юзера, давай просто перевикористаємо
  const { message, status } = await getUserById(id);
  if (status !== 200) {
    return {
      status,
      message
    }
  }

  const user = message;
  newUserList = newUserList.filter((item) => item.userId !== user.userId);
  console.log(newUserList);

  return {
    status: 200,
    message: `Delete userID: ${id}`,
  };
}

function writeJsonUser() {
  fs.writeFileSync(filePath, JSON.stringify(newUserList));
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  newUserList,
  writeJsonUser,
};

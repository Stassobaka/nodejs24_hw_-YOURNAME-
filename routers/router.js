const router = require('express').Router();

// const { validateUserGet: validateUserGet } = require('../validate/validate_users');
// const { validateUserGetId: validateUserGetId } = require('../validate/validate_users');
// const { validateUserPost: validateUserPost } = require('../validate/validate_users');
// const { validateUserDelete: validateUserDelete } = require('../validate/validate_users');

// 0. const { validateUserDelete: validateUserDelete } = require(...) - отак робимо тільки якщо
// нам потрібно імпортувати функцію і використовувати ПІД іншим іменем.
// це ж по факту оць що: const { nameInFile: newNameToUseHere } = require('file')

// 1. якщо в тебе багато експортів із одного файла - можна їх дістати всі із одного реквайраЖ
// const { a, b, c } = require('file');

// 2. по назві. Ти назвав validate_users, а по суті всередині і валідація, і доступ до даних
// і основна логіка програми. Назвою ти заплутуєш і себе, і тих хто це потім буде дивитись
// Буде правильніше назвати якось типу users_controller

// З врахуванням коментів вище, я роблю перейменування (в тому числі і самих функцій)
// і спрощую імпорт:
const {getUsers, getUserById, createUser, deleteUser } = require('../controllers/users_controller');

router.get('/', (req, resp) => {
  resp.status(400).send('Checking');
});

router.get('/users', async (req, resp) => {
  try{
    const { status, message } = await getUsers();
    resp.status(status).send(message);
  }catch (error) {
    resp.status(500).send('Internal Server Error');
  }
 
});

router.get('/users/:userId', async (req, resp) => {
  const { status, message } = await getUserById(req.params.userId);
  resp.status(status).send(message);
});

router.post('/users', async (req, resp) => {
  try {
    const { status, message } = await createUser(req.body);
    resp.status(status).send(message);
  } catch (error) {
    resp.status(500).send('Internal Server Error');
  }
});

router.delete('/users/:userId', async (req, resp) => {
  const { status, message } = await deleteUser(req.params.userId);
  resp.status(status).send(message);
});

module.exports = {
  router,
};

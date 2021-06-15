let remove = 'remove';
let add = 'add';
let set = 'set';
let update = 'update';
let login = 'login';

const loginUser = user => {
  console.log('afjabijf', user);
  return {
    type: login,
    payload: user,
  };
};
const addTodo = todos => {
  return {
    type: add,
    payload: todos,
  };
};
const updateTodo = todos => {
  return {
    type: update,
    payload: todos,
  };
};
const setTodo = todo => {
  return {
    type: set,
    payload: todo,
  };
};

export {
  addTodo,
  updateTodo,
  setTodo,
  loginUser,
  add,
  remove,
  update,
  set,
  login,
};

let remove = 'remove';
let add = 'add';
let set = 'set';
let update = 'update';
let login = 'login';
let screenColor = 'screenColor';

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

const setScreenColor = value => {
  console.log("setScreenColor", value)
  return {
    type: screenColor,
    payload: value,
  };
};

export {
  addTodo,
  updateTodo,
  setTodo,
  loginUser,
  setScreenColor,
  screenColor,
  add,
  remove,
  update,
  set,
  login,
};

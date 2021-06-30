import { remove, add, set, update, login, screenColor } from '../actions/actions';

const InitialState = {
  name: 'Hassan abdullah',
  email: 'Hassan@yahoo.com',
  loginUser: {},
  dark: false,
  editTodo: {},
};

export default function TodoReducer(state = InitialState, action) {
  switch (action.type) {
    case login:
      return { ...state, loginUser: action.payload };
    case remove:
      return { ...state, todos: action.payload };
    case screenColor:
      // console.log(action);
      return { ...state, dark: action.payload };
    default:
      return state;
  }
}

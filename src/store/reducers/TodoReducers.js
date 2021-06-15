import {remove, add, set, update, login} from '../actions/actions';

const InitialState = {
  name: 'Hassan',
  email: 'Hassan@yahoo.com',
  loginUser: {},
  editTodo: {},
};

export default function TodoReducer(state = InitialState, action) {
  switch (action.type) {
    case login:
      console.log(action);
      return {...state, loginUser: action.payload};
    case remove:
      return {...state, todos: action.payload};
    default:
      return state;
  }
}

import { Todo } from '../types/Todo';

type SetTodos = {
  type: 'todos/SET',
  payload: Todo[],
}

const setTodos = (todos: Todo[]): SetTodos => {
  return {
    type: 'todos/SET',
    payload: todos,
  }
}

type Action = SetTodos;

const todosReducer = (state: Todo[] = [], action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;

    default:
      return state;
  }
};

export const actions = { setTodos };
export default todosReducer;

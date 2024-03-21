import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export function getFilteredTodos(
  todos: Todo[],
  { status, query }: { status: Status, query: string },
) {
  let preparedTodos = [...todos];

  if (status === 'active') {
    preparedTodos = todos.filter(todo => !todo.completed);
  }

  if (status === 'completed') {
    preparedTodos = todos.filter(todo => todo.completed);
  }

  if (query) {
    return preparedTodos.filter(todo => todo.title
      .toLowerCase()
      .includes(query.toLowerCase()));
  }

  return preparedTodos;
}

/* eslint-disable */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getFilteredTodos } from '../../utils/filter';
import classNames from 'classnames';
import { actions } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const { status, query } = useAppSelector(state => state.filter);
  const todos = useAppSelector(state => state.todos);
  const filteredTodos = getFilteredTodos(todos, { status, query });
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  return (
    <>
      <table className="table is-narrow is-fullwidth">
        <thead>
          <tr>
            <th>#</th>
            <th>
              <span className="icon">
                <i className="fas fa-check" />
              </span>
            </th>
            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
        {filteredTodos.map(todo => (
          <tr
            data-cy="todo"
            className=""
            key={todo.id}
          >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed
                && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
            </td>
            <td className="is-vcentered is-expanded">
              <p className={classNames(
                {
                  'has-text-success': todo.completed,
                  'has-text-danger': !todo.completed,
                },
              )}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => {
                  dispatch(actions.setTodo(todo));
                }}
              >
                <span className="icon">
                  <i
                    className={classNames({
                      'far fa-eye': currentTodo?.id !== todo.id,
                      'far fa-eye-slash': currentTodo?.id === todo.id,
                    })}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      </table>
    </>
  );
};

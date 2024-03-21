import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { useAppDispatch } from '../../app/hooks';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { actions } from '../../features/currentTodo';
import classNames from 'classnames';

type Props = {
  todo: Todo;
}


export const TodoModal: React.FC<Props> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);
    if (todo !== null) {
      getUser(todo.userId).then(setUser)
        .finally(() => setLoading(false));
    }
  }, [todo]);


  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading
        ? <Loader />
        : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${todo.id}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => dispatch(actions.removeTodo())}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todo?.title}
              </p>

              <p className="block" data-cy="modal-user">
                {/* <strong className="has-text-success">Done</strong> */}
                <strong className={classNames({
                  'has-text-danger': !todo?.completed,
                  'has-text-success': todo?.completed,
                })}
                >
                  {todo?.completed
                    ? 'Done'
                    : 'Planned'}
                </strong>

                {' by '}

                <a href={`mailto:Sincere${user?.email}`}>
                  {user?.name}
                </a>
              </p>
            </div>
          </div>
      )}
    </div>
  );
};

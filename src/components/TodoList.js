import TodoListItem from './TodoListItem';
import styles from './TodoList.module.css';

//               props.todos -> { todos }
const TodoList = ({ todos, onRemove, onToggle }) => {
  return (
    <div className={styles.TodoList}>
      {
        todos.map(
          todo =>
            <TodoListItem todo={todo} key={todo.id}
              onRemove={onRemove}
              onToggle={onToggle} />
        )
        // todos.map((todo) => {
        //   return (
        //     <TodoListItem />
        //   )
        // })
      }
    </div>
  );
};
export default TodoList;
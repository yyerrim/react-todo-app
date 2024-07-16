import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import TodoListItem from './components/TodoListItem';
import TodoTemplate from './components/TodoTemplate';

function App() {
  // 처음에 보여줄 항목 3개
  // const [todos, setTodos] = useState([
  //   { id: 1, text: '리액트의 기초 알아보기', checked: true },
  //   { id: 2, text: '컴포넌트 스타일링해 보기', checked: true },
  //   { id: 3, text: '일정 관리 앱 만들어 보기', checked: false }
  // ]);
  const [todos, setTodos] = useState([]);

  const [change, setChange] = useState(false);

  useEffect(() => {
    async function get() {
      const url = 'http://127.0.0.1:8080/read';
      const res = await fetch(url);
      const data = await res.json();
      setTodos(data);
    }
    get();
  }, [change]);

  // 다음 항목 추가했을때 그 항목의 id
  // const nextId = useRef(todos.length + 1);
  // 버그 가능성 : 1, 2, 3, 4 항목 중에 1번을 지우면 그 다음에 추가되는 항목의 id는 4
  // const nextId = useRef(1); // 처음에는 데이터가 없을테니 1로 시작
  // const nextId = useRef(4); // 처음부터 데이터 3개가 있을 경우 4로 시작

  const onInsert = (text) => {
    // const todo = { id: nextId.current, text: text, checked: false };
    const todo = { text: text, checked: false };

    async function send(todo) {
      const url = 'http://127.0.0.1:8080/add';
      const res = await fetch(url, {
        method: 'post',
        headers: {
          'content-type': "application/json"
        },
        body: JSON.stringify(todo)
      });
      const data = await res.json();
      setChange(prev => !prev);
    }
    send(todo);
  };

  const onRemove = useCallback(
    (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [todos]
  );

  const onToggle = useCallback(
    (id) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo
        ),
      );
    }, [todos]
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove}
        onToggle={onToggle} />
    </TodoTemplate>

  );
}
export default App;
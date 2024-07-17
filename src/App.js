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

  // 컴포넌트가 렌더링 될 때마다 작성되어있는 함수가 다시 호출됨
  // useCallback : 함수가 매번 정의되는것을 막기 위해 사용
  const onRemove = useCallback(
    (id) => {
      // setTodos(todos.filter((todo) => todo.id !== id));
      async function send() {
        const url = `http://127.0.0.1:8080/remove?id=${id}`;
        const res = await fetch(url);
        const data = await res.json();
        // await res.text(); // "삭제 완료"를 넘겨주려면 json이 아닌 text 사용
        setChange(prev => !prev);
      }
      send();
    },
    [todos]
  );

  const onToggle = useCallback(
    (id) => {
      // setTodos(
      //   todos.map((todo) =>
      //     todo.id === id ? { ...todo, checked: !todo.checked } : todo
      //   ),
      // );
      async function send() {
        const url = `http://127.0.0.1:8080/modify?id=${id}`;
        const res = await fetch(url);
        const data = await res.json();
        setChange(prev => !prev);
      }
      send();
    }, [todos]
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos}
        onRemove={onRemove}
        onToggle={onToggle} />
    </TodoTemplate>

  );
}
export default App;
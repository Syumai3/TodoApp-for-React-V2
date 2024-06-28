import React, { useState } from "react";
import { Todotype } from "../type/Todotype";

const mockTodos: Todotype[] = [
  {
    id: 1,
    title: "サブスクリプションを解約する",
    status: "進行中",
  },
  {
    id: 2,
    title: "夕ご飯の食材をスーパーに買いに行く",
    status: "未着手",
  },
];

function App() {
  const [todos, setTodos] = useState(mockTodos);
  return (
    <div style={{ paddingLeft: "10px" }}>
      <h1>Todoリスト</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <AddTodo />
        <FilterTodo />
      </div>
      <div>
        <TodoList todos={todos} />
      </div>
    </div>
  );
}

// Todoリストを表示するコンポーネント
function TodoList({ todos }: { todos: Todotype[] }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li
          key={todo.id}
          style={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <span style={{ marginRight: "10px" }}>{todo.status}</span>
          <span style={{ marginRight: "10px" }}>{todo.title}</span>
          <button>編集</button>
          <button>削除</button>
        </li>
      ))}
    </ul>
  );
}

// Todoを追加するコンポーネント
function AddTodo() {
  return (
    <>
      <div>
        <input type="text" style={{ marginRight: "5px" }} />
        <button>追加</button>
      </div>
    </>
  );
}

// Todoをフィルタリングするコンポーネント
function FilterTodo() {
  return (
    <>
      <input type="checkbox" id="未着手" />
      <label htmlFor="未着手">未着手</label>
      <input type="checkbox" id="進行中" />
      <label htmlFor="未着手">進行中</label>
      <input type="checkbox" id="完了" />
      <label htmlFor="未着手">完了</label>
    </>
  );
}

// Todoを編集するコンポーネント(編集ボタンを押下した後に開く)
function EditTodo() {
  return (
    <>
      <div>
        <input type="text" style={{ marginRight: "5px" }} />
        <button>保存</button>
        <button>キャンセル</button>
      </div>
    </>
  );
}

export default App;

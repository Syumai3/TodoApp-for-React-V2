import React, { useEffect, useState } from "react";
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
  // Todoリストに表示される todo の状態
  const [todos, setTodos] = useState<Todotype[]>(mockTodos);
  // 新しく追加する todo の状態
  const [newTodoTitle, setNewTodoTitle] = useState("");
  // 新しく追加する todo の id の状態
  const [todoId, setTodoId] = useState(3);

  // Todo の追加フィールドの入力をする関数
  const handleAddTodoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(e.target.value);
  };

  // Todoリストに 入力した Todoを追加する関数
  const handleAddTodo = () => {
    setTodos([{ id: todoId, title: newTodoTitle, status: "未着手" }, ...todos]);
    setTodoId(todoId + 1);
    setNewTodoTitle("");
  };

  // Todoリストを削除する関数
  const handleDeleteTodo = (id: number) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  };

  return (
    <div style={{ paddingLeft: "10px" }}>
      <h1>Todoリスト</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <AddTodo
          addTodoInput={handleAddTodoInput}
          newTodoTitle={newTodoTitle}
          addTodo={handleAddTodo}
        />
        <FilterTodo />
      </div>
      <div>
        <TodoList todos={todos} deleteTodo={handleDeleteTodo} />
      </div>
    </div>
  );
}

type TodoListProps = {
  todos: Todotype[];
  deleteTodo: (id: number) => void;
};
// Todoリストを表示するコンポーネント
function TodoList({ todos, deleteTodo }: TodoListProps) {
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
          <button onClick={() => deleteTodo(todo.id)}>削除</button>
        </li>
      ))}
    </ul>
  );
}

// Todoを追加するコンポーネントの型情報
type AddTodoProps = {
  addTodoInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  newTodoTitle: string;
  addTodo: () => void;
};

// Todoを追加するコンポーネント
function AddTodo({ addTodoInput, newTodoTitle, addTodo }: AddTodoProps) {
  return (
    <>
      <div>
        <input
          type="text"
          style={{ marginRight: "5px" }}
          value={newTodoTitle}
          onChange={addTodoInput}
        />
        <button onClick={addTodo}>追加</button>
      </div>
    </>
  );
}

const filterOptions = [
  { value: "all", label: "すべて" },
  { value: "notStarted", label: "未着手" },
  { value: "inProgress", label: "作業中" },
  { value: "done", label: "完了" },
];

// Todoをフィルタリングするコンポーネント
function FilterTodo() {
  return (
    <>
      <select>
        {filterOptions.map(({ value, label }) => (
          <option value={value}>{label}</option>
        ))}
      </select>
    </>
  );
}

export default App;

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
  // 編集中の todo の id の状態
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  // 編集する todo のタイトルの状態
  const [editTodoTitle, setEditTodoTitle] = useState("");

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

  // 編集するtodoのtitleを入力する関数
  const handleEditTodoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTodoTitle(e.target.value);
  };

  // 編集したtodoを todoリストに反映させる処理
  const handleEditTodo = (id: number) => {
    setTodos(
      // 既存のtodosをmapし、引数の id と一致した todo の title を、editTodoTitleに変更する処理
      todos.map((todo) =>
        todo.id === id ? { ...todo, title: editTodoTitle } : todo
      )
    );
    // 編集中のidをnullにする
    setEditingTodoId(null);
    // 編集中の title　も　空にする
    setEditTodoTitle("");
  };

  // 編集ボタンを押下した時に、編集フォームを表示させる関数 (id と title を受け取って、editingTodoId と　editTodoTitle　の状態を変更する)
  const handleOpenEditForm = (id: number, title: string) => {
    setEditingTodoId(id);
    setEditTodoTitle(title);
  };

  // キャンセルボタンを押下した時に、編集フォームを閉じる関数
  const handleCloseEditForm = () => {
    setEditingTodoId(null);
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
        <TodoList
          todos={todos}
          deleteTodo={handleDeleteTodo}
          editingTodoId={editingTodoId}
          editTodoTitle={editTodoTitle}
          editTodoInput={handleEditTodoInput}
          openEditForm={handleOpenEditForm}
          closeEditForm={handleCloseEditForm}
          editTodo={handleEditTodo}
        />
      </div>
    </div>
  );
}

type TodoListProps = {
  todos: Todotype[];
  deleteTodo: (id: number) => void;
  editingTodoId: number | null;
  editTodoTitle: string;
  editTodoInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  openEditForm: (id: number, title: string) => void;
  closeEditForm: () => void;
  editTodo: (id: number) => void;
};
// Todoリストを表示するコンポーネント
function TodoList({
  todos,
  deleteTodo,
  editingTodoId,
  editTodoTitle,
  editTodoInput,
  openEditForm,
  closeEditForm,
  editTodo,
}: TodoListProps) {
  return (
    <ul>
      {todos.map((todo) =>
        // editingTodoId が存在する (todo の idと一致する)場合に、以下の 編集用のフォームを表示させる処理
        editingTodoId === todo.id ? (
          <li>
            <input type="text" value={editTodoTitle} onChange={editTodoInput} />
            {/* handleEditTodo関数の処理を実行 */}
            <button onClick={() => editTodo(todo.id)}>完了</button>
            <button onClick={closeEditForm}>キャンセル</button>
          </li>
        ) : (
          <li
            key={todo.id}
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <span style={{ marginRight: "10px" }}>{todo.status}</span>
            <span style={{ marginRight: "10px" }}>{todo.title}</span>
            {/* handleOpenEditForm の処理を実行 */}
            <button onClick={() => openEditForm(todo.id, todo.title)}>
              編集
            </button>
            <button onClick={() => deleteTodo(todo.id)}>削除</button>
          </li>
        )
      )}
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

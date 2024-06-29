import React, { useEffect, useState } from "react";
import { FilterStatusType, StatusType, Todotype } from "../type/Todotype";

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
  // フィルターされた todoの状態
  const [filteredTodos, setFilteredTodos] = useState<Todotype[]>(mockTodos);
  // フィルターの状態
  const [filterStatus, setFilterStatus] = useState("全て");

  // todos, filterStatus　が変更するたびに、処理を走らせることで、最新のTodoリストの状態を表示する
  useEffect(() => {
    if (filterStatus === "全て") {
      setFilteredTodos(todos);
    } else {
      setFilteredTodos(todos.filter((todo) => todo.status === filterStatus));
    }
  }, [todos, filterStatus]);

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

  // Todo のステータスを変更する関数
  const handleEditStatus = (id: number, status: StatusType) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, status: status } : todo))
    );
  };

  // 選択されたステータスになるように、filterStatusを更新する関数
  const handleFilterTodo = (status: FilterStatusType) => {
    setFilterStatus(status);
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
        <span>絞り込み：</span>
        <FilterTodo filterTodo={handleFilterTodo} />
      </div>
      <div>
        <TodoList
          todos={filteredTodos} // フィルタリングされたtodoリストを渡す
          deleteTodo={handleDeleteTodo}
          editingTodoId={editingTodoId}
          editTodoTitle={editTodoTitle}
          editTodoInput={handleEditTodoInput}
          openEditForm={handleOpenEditForm}
          closeEditForm={handleCloseEditForm}
          editTodo={handleEditTodo}
          editStatus={handleEditStatus}
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
  editStatus: (id: number, status: StatusType) => void;
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
  editStatus,
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
            <select
              value={todo.status}
              onChange={(e) =>
                editStatus(todo.id, e.target.value as StatusType)
              }
              style={{ marginRight: "10px" }}
            >
              <option value="未着手">未着手</option>
              <option value="進行中">進行中</option>
              <option value="完了">完了</option>
            </select>
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

type FilterTodoProps = {
  filterTodo: (status: FilterStatusType) => void;
};
// Todoをフィルタリングするコンポーネント
function FilterTodo({ filterTodo }: FilterTodoProps) {
  return (
    <>
      <select onChange={(e) => filterTodo(e.target.value as FilterStatusType)}>
        <option value="全て">全て</option>
        <option value="未着手">未着手</option>
        <option value="進行中">進行中</option>
        <option value="完了">完了</option>
      </select>
    </>
  );
}

export default App;

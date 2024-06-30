import React from "react";
import { StatusType, Todotype } from "../../type/Todotype";

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
export function TodoList({
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

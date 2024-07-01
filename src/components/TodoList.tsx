import React from "react";
import { StatusType, Todotype } from "../../type/Todotype";

type TodoListProps = {
  todos: Todotype[];
  deleteTodo: (id: string) => void;
  editingTodoId: string | null;
  editTodoTitle: string;
  editTodoInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  openEditForm: (id: string, title: string) => void;
  closeEditForm: () => void;
  editTodo: (id: string) => void;
  editStatus: (id: string, status: StatusType) => void;
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
          <li className="pb-1">
            <input type="text" value={editTodoTitle} onChange={editTodoInput} />
            {/* handleEditTodo関数の処理を実行 */}
            <button
              onClick={() => editTodo(todo.id)}
              className="bg-blue-500 text-white hover:bg-blue-700 mr-1 py-1 px-1 rounded"
            >
              完了
            </button>
            <button
              onClick={closeEditForm}
              className="bg-blue-500 text-white hover:bg-blue-700 py-1 px-1 rounded"
            >
              キャンセル
            </button>
          </li>
        ) : (
          <li key={todo.id} className="pb-1">
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
            <button
              onClick={() => openEditForm(todo.id, todo.title)}
              className="bg-blue-500 text-white hover:bg-blue-700 mr-1 py-1 px-1 rounded"
            >
              編集
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="bg-blue-500 text-white hover:bg-blue-700 br-1 py-1 px-1 rounded"
            >
              削除
            </button>
          </li>
        )
      )}
    </ul>
  );
}

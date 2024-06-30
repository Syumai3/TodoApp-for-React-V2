import React from "react";

// Todoを追加するコンポーネントの型情報
type AddTodoProps = {
  addTodoInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  newTodoTitle: string;
  addTodo: () => void;
};

// Todoを追加するコンポーネント
export function AddTodo({ addTodoInput, newTodoTitle, addTodo }: AddTodoProps) {
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

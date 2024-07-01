import React from "react";
import { useRecoilState } from "recoil";
import { addTodoState } from "../states/addTodoState";
import { v4 as uuidv4 } from "uuid";
import { newTodoTitleState } from "../states/newTodoTitleState";

// Todoを追加するコンポーネント
export function AddTodo() {
  const [todos, setTodos] = useRecoilState(addTodoState);
  const [newTodoTitle, setNewTodoTitle] = useRecoilState(newTodoTitleState);

  // Todo の追加フィールドの入力をする関数
  const handleAddTodoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(e.target.value);
  };

  // Todoリストに 入力した Todoを追加する関数
  const handleAddTodo = () => {
    // 空欄の場合は Todoを追加できないようにする
    if (newTodoTitle === "") {
      return;
    } else {
      setTodos([
        { id: uuidv4(), title: newTodoTitle, status: "未着手" },
        ...todos,
      ]);
      setNewTodoTitle("");
    }
  };

  return (
    <>
      <div>
        <input
          type="text"
          value={newTodoTitle}
          onChange={handleAddTodoInput}
          className="py-1 px-3 mr-2 rounded border focus:outline-none"
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white hover:bg-blue-700 py-1 px-3 font-bold rounded"
        >
          追加
        </button>
      </div>
    </>
  );
}

import React from "react";
import { FilterStatusType } from "../../type/Todotype";

type FilterTodoProps = {
  filterTodo: (status: FilterStatusType) => void;
};

// Todoをフィルタリングするコンポーネント
export function FilterTodo({ filterTodo }: FilterTodoProps) {
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

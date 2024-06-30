import { atom } from "recoil";

// todosの状態を管理する atom
export const newTodoTitleState = atom<string>({
  key: "newTodoTitleState",
  default: "",
});

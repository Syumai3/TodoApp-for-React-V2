import { atom } from "recoil";
import { Todotype } from "../../type/Todotype";

// todosの状態を管理する atom
export const addTodoState = atom<Todotype[]>({
  key: "addTodoState",
  default: [],
});

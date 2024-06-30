import { selector } from "recoil";
import { Todotype } from "../../type/Todotype";
import { addTodoState } from "./addTodoState";

export const todoStateLength = selector<number>({
  key: "todoStateLength",
  get: ({ get }) => {
    const todoTitleNumber: Todotype[] = get(addTodoState);
    return todoTitleNumber?.length || 0;
  },
});

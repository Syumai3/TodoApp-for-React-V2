import React, { useEffect, useState } from "react";
import { FilterStatusType, StatusType, Todotype } from "../type/Todotype";
import { TodoList } from "./components/TodoList";
import { AddTodo } from "./components/AddTodo";
import { FilterTodo } from "./components/FilterTodo";
import { addTodoState } from "./states/addTodoState";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { todoStateLength } from "./states/todoStateLength";

function App() {
  // Todoリストに表示される todo の状態
  const [todos, setTodos] = useRecoilState(addTodoState);
  // 編集中の todo の id の状態
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  // 編集する todo のタイトルの状態
  const [editTodoTitle, setEditTodoTitle] = useState("");
  // フィルターされた todoの状態
  const [filteredTodos, setFilteredTodos] = useState<Todotype[]>([]);
  // フィルターの状態
  const [filterStatus, setFilterStatus] = useState("全て");

  // recoilでタスクリストにあるタスクの数を取得
  const todoLength = useRecoilValue(todoStateLength);

  // todos, filterStatus　が変更するたびに、処理を走らせることで、最新のTodoリストの状態を表示する
  useEffect(() => {
    if (filterStatus === "全て") {
      setFilteredTodos(todos);
    } else {
      setFilteredTodos(todos.filter((todo) => todo.status === filterStatus));
    }
  }, [todos, filterStatus]);

  // // Todo の追加フィールドの入力をする関数
  // const handleAddTodoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setNewTodoTitle(e.target.value);
  // };

  // // Todoリストに 入力した Todoを追加する関数
  // const handleAddTodo = () => {
  //   // 空欄の場合は Todoを追加できないようにする
  //   if (newTodoTitle === "") {
  //     return;
  //   } else {
  //     setTodos([
  //       { id: uuidv4(), title: newTodoTitle, status: "未着手" },
  //       ...todos,
  //     ]);
  //     setNewTodoTitle("");
  //   }
  // };

  // Todoリストを削除する関数
  const handleDeleteTodo = (id: string) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  };

  // 編集するtodoのtitleを入力する関数
  const handleEditTodoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTodoTitle(e.target.value);
  };

  // 編集したtodoを todoリストに反映させる処理
  const handleEditTodo = (id: string) => {
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
  const handleOpenEditForm = (id: string, title: string) => {
    setEditingTodoId(id);
    setEditTodoTitle(title);
  };

  // キャンセルボタンを押下した時に、編集フォームを閉じる関数
  const handleCloseEditForm = () => {
    setEditingTodoId(null);
  };

  // Todo のステータスを変更する関数
  const handleEditStatus = (id: string, status: StatusType) => {
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
      <span>Todoリストにあるタスク数 : {todoLength}</span>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <AddTodo />
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

export default App;
